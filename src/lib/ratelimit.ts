import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

/**
 * IP-based rate limiting using Upstash Redis.
 * Three sliding window tiers prevent abuse at different time scales:
 *   - 3 requests per minute  (blocks rapid-fire spam)
 *   - 10 requests per hour   (blocks sustained abuse)
 *   - 20 requests per day    (prevents quota exhaustion)
 */

// Lazy-initialize Redis to avoid errors when env vars are missing during build
function getRedis() {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

// Each limiter uses a separate prefix to track its own window independently
const createMinuteLimiter = () =>
  new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(3, "1 m"),
    prefix: "contact:min",
  });

const createHourLimiter = () =>
  new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    prefix: "contact:hr",
  });

const createDayLimiter = () =>
  new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(20, "1 d"),
    prefix: "contact:day",
  });

interface RateLimitResult {
  allowed: boolean;
  message?: string;
}

/**
 * Check all three rate limit tiers for a given IP.
 * Returns { allowed: false, message } if any tier is exceeded.
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  // If Redis is not configured, allow the request (graceful degradation)
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn("Upstash Redis not configured — rate limiting is disabled");
    return { allowed: true };
  }

  try {
    // Check all tiers in parallel for performance
    const [minuteResult, hourResult, dayResult] = await Promise.all([
      createMinuteLimiter().limit(ip),
      createHourLimiter().limit(ip),
      createDayLimiter().limit(ip),
    ]);

    if (!minuteResult.success) {
      return {
        allowed: false,
        message: "Too many submissions. Please wait a minute before trying again.",
      };
    }

    if (!hourResult.success) {
      return {
        allowed: false,
        message: "You've reached the hourly submission limit. Please try again later.",
      };
    }

    if (!dayResult.success) {
      return {
        allowed: false,
        message: "You've reached the daily submission limit. Please try again tomorrow.",
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error("Rate limit check error:", error);
    // Fail open — allow the request if Redis is unreachable
    return { allowed: true };
  }
}

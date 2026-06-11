/**
 * Server-side Cloudflare Turnstile token verification.
 * Calls Cloudflare's siteverify endpoint to validate that the user
 * passed the challenge. Never trust the token from the client alone.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileResult {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstile(token: string): Promise<{ success: boolean; errorCodes?: string[] }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("Missing TURNSTILE_SECRET_KEY environment variable");
    return { success: false, errorCodes: ["missing-secret-key"] };
  }

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const result: TurnstileResult = await response.json();

    if (!result.success) {
      console.warn("Turnstile verification failed:", result["error-codes"]);
    }

    return { success: result.success, errorCodes: result["error-codes"] };
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return { success: false, errorCodes: ["fetch-error"] };
  }
}

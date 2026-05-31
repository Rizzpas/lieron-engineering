import { z } from "zod";

/**
 * Zod schema for contact form submissions.
 * Validates all fields including security-related ones (honeypot, turnstile, timing).
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be 100 characters or fewer."),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address."),

  concern: z
    .string()
    .trim()
    .min(1, "Please select a concern type.")
    .max(200, "Concern must be 200 characters or fewer."),

  brief: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be 2000 characters or fewer."),

  // Honeypot field — must be empty for legitimate submissions
  trap_field: z.string().optional(),

  // Cloudflare Turnstile verification token
  turnstileToken: z.string().min(1, "Please complete the verification."),

});

export type ContactFormData = z.infer<typeof contactSchema>;

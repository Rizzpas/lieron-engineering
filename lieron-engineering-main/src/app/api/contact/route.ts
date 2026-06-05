import { Resend } from "resend";
import { headers } from "next/headers";
import { contactSchema } from "@/lib/contactSchema";
import { verifyTurnstile } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/ratelimit";
import { ContactEmail } from "@/emails/ContactEmail";

// Where contact form submissions are sent (change to noriel@lieron.co.nz for production)
const RECIPIENT_EMAIL = "jonathan.ripas14@gmail.com";



function getConcernBadge(concern: string): { bg: string; text: string } {
  const c = concern.toLowerCase();
  if (c.includes("new project")) return { bg: "#fff7ed", text: "#c2410c" };
  if (c.includes("ongoing")) return { bg: "#eff6ff", text: "#1d4ed8" };
  if (c.includes("staff")) return { bg: "#fef2f2", text: "#b91c1c" };
  if (c.includes("billing")) return { bg: "#ecfdf5", text: "#047857" };
  return { bg: "#f3f4f6", text: "#374151" };
}

export async function POST(request: Request) {
  try {
    // --- 1. RATE LIMITING (check before parsing body to save resources) ---
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "unknown";

    const rateLimitResult = await checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return Response.json(
        { success: false, message: rateLimitResult.message },
        { status: 429 }
      );
    }

    // --- 2. ZOD VALIDATION ---
    const rawBody = await request.json();
    const parsed = contactSchema.safeParse(rawBody);

    if (!parsed.success) {
      // Return the first validation error for a clean user-facing message
      const firstError = parsed.error.issues[0]?.message || "Invalid form data.";
      return Response.json(
        { success: false, message: firstError },
        { status: 400 }
      );
    }

    const { name, email, concern, brief, trap_field, turnstileToken } = parsed.data;

    // --- 3. HONEYPOT CHECK ---
    // Bots fill hidden fields; real users never see this input.
    // Return a fake success so bots think submission worked.
    if (trap_field) {
      console.warn("⚠️ Honeypot triggered! 'trap_field' was filled with:", trap_field);
      return Response.json(
        { success: true, message: "Message sent successfully." },
        { status: 200 }
      );
    }



    // --- 5. TURNSTILE VERIFICATION ---
    const turnstileResult = await verifyTurnstile(turnstileToken);
    if (!turnstileResult.success) {
      return Response.json(
        { success: false, message: "Verification failed. Please try again." },
        { status: 400 }
      );
    }

    // --- 6. SEND EMAIL VIA RESEND (only after ALL checks pass) ---
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return Response.json(
        { success: false, message: "Email service is currently unavailable. Please try again later." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const badge = getConcernBadge(concern);

    const { error } = await resend.emails.send({
      from: "Lieron Engineering <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `[Lieron] ${concern} — ${name}`,
      react: ContactEmail({
        name,
        email,
        concern: concern || "General Enquiry",
        brief,
        badgeBg: badge.bg,
        badgeText: badge.text,
      }),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return Response.json(
        { success: false, message: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json(
      { success: false, message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

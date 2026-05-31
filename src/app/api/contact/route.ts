import { Resend } from "resend";
import { headers } from "next/headers";
import { contactSchema } from "@/lib/contactSchema";
import { verifyTurnstile } from "@/lib/turnstile";
import { checkRateLimit } from "@/lib/ratelimit";

// Where contact form submissions are sent (change to noriel@lieron.co.nz for production)
const RECIPIENT_EMAIL = "jonathan.ripas14@gmail.com";

// Minimum time (ms) between form load and submission to reject instant bot submissions
const MIN_SUBMISSION_TIME_MS = 3000;

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

    const { name, email, concern, brief, trap_field, turnstileToken, formLoadedAt } = parsed.data;

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

    // --- 4. MINIMUM SUBMISSION TIME CHECK ---
    // Rejects submissions faster than a human could reasonably fill the form.
    const elapsedMs = Date.now() - formLoadedAt;
    if (elapsedMs < MIN_SUBMISSION_TIME_MS) {
      return Response.json(
        { success: false, message: "Submission was too fast. Please take a moment and try again." },
        { status: 400 }
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
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeConcern = escapeHtml(concern || "General Enquiry");
    const safeBrief = escapeHtml(brief);

    const { error } = await resend.emails.send({
      from: "Lieron Engineering <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `[Lieron] ${concern} — ${name}`,
      html: buildEmailHtml({
        name: safeName,
        email: safeEmail,
        concern: safeConcern,
        brief: safeBrief,
        badge,
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

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

interface EmailParams {
  name: string;
  email: string;
  concern: string;
  brief: string;
  badge: { bg: string; text: string };
}

function buildEmailHtml({ name, email, concern, brief, badge }: EmailParams): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @media only screen and (max-width: 600px) {
      .main-card {
        width: 100% !important;
        border-radius: 0 !important;
        border: none !important;
      }
      .content-pad {
        padding: 24px 20px !important;
      }
      .responsive-td {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .spacer {
        display: none !important;
      }
      .mobile-spacing {
        margin-bottom: 16px !important;
      }
      .header-left, .header-right {
        display: block !important;
        width: 100% !important;
        text-align: center !important;
      }
      .header-right {
        margin-top: 16px !important;
      }
      .footer-left, .footer-right {
        display: block !important;
        width: 100% !important;
        text-align: center !important;
      }
      .footer-right {
        margin-top: 8px !important;
      }
      .title-text {
        font-size: 24px !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#09090b;">
    <tr>
      <td align="center" style="padding:40px 16px;" class="content-pad">

        <!-- Main Card -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" class="main-card" style="background-color:#18181b;border-radius:16px;overflow:hidden;border:1px solid #27272a;max-width:600px;">

          <!-- Orange Accent Line -->
          <tr><td style="height:4px;background:linear-gradient(90deg,#ea580c 0%,#f97316 50%,#ea580c 100%);"></td></tr>

          <!-- Logo Header -->
          <tr>
            <td class="content-pad" style="padding:40px;border-bottom:1px solid #27272a;background-color:#131316;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="header-left">
                    <div style="font-size:18px;font-weight:800;color:#ffffff;letter-spacing:0.1em;text-transform:uppercase;">LIERON</div>
                    <div style="font-size:11px;font-weight:600;color:#a1a1aa;letter-spacing:0.15em;text-transform:uppercase;margin-top:4px;">Engineering Limited</div>
                  </td>
                  <td align="right" valign="top" class="header-right">
                    <span style="display:inline-block;background-color:${badge.bg};color:${badge.text};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:6px 14px;border-radius:24px;border:1px solid ${badge.text}20;">${concern}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td class="content-pad" style="padding:40px;">

              <!-- Title -->
              <p style="color:#ea580c;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 12px 0;">New Contact Submission</p>
              <h1 class="title-text" style="color:#ffffff;font-size:28px;font-weight:800;margin:0 0 32px 0;letter-spacing:-0.02em;line-height:1.2;">A message has been received through the website contact form.</h1>

              <!-- Info Grid -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:32px;">
                <tr>
                  <td width="48%" class="responsive-td mobile-spacing" style="background-color:#1f1f22;border-radius:12px;padding:20px;border:1px solid #333338;vertical-align:top;">
                    <div style="color:#a1a1aa;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">From</div>
                    <div style="color:#ffffff;font-size:16px;font-weight:600;line-height:1.4;">${name}</div>
                  </td>
                  <td width="4%" class="spacer"></td>
                  <td width="48%" class="responsive-td" style="background-color:#1f1f22;border-radius:12px;padding:20px;border:1px solid #333338;vertical-align:top;">
                    <div style="color:#a1a1aa;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Reply To</div>
                    <a href="mailto:${email}" style="color:#ea580c;font-size:15px;font-weight:600;text-decoration:none;word-break:break-all;line-height:1.4;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Message Box -->
              <div style="color:#a1a1aa;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;">Message</div>
              <div style="background-color:#1f1f22;border-radius:12px;padding:24px;border:1px solid #333338;color:#e4e4e7;font-size:15px;line-height:1.8;white-space:pre-wrap;word-break:break-word;">${brief}</div>

              <!-- Reply Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:40px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: ${concern}" style="display:inline-block;background-color:#ea580c;color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;padding:16px 36px;border-radius:8px;box-shadow:0 4px 14px rgba(234,88,12,0.3);">Reply to ${name}</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="content-pad" style="padding:24px 40px;border-top:1px solid #27272a;background-color:#09090b;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="footer-left">
                    <p style="color:#52525b;font-size:12px;margin:0;line-height:1.5;">Lieron Engineering Limited &middot; Auckland, NZ</p>
                  </td>
                  <td align="right" class="footer-right">
                    <p style="color:#52525b;font-size:12px;margin:0;">Auto-generated notification</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

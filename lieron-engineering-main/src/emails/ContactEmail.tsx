import * as React from "react";
import { Html, Head, Body, Preview } from "@react-email/components";

export interface ContactEmailProps {
  name: string;
  email: string;
  concern: string;
  brief: string;
  badgeBg: string;
  badgeText: string;
}

export const ContactEmail = ({
  name = "John Doe",
  email = "john@example.com",
  concern = "General Enquiry",
  brief = "This is a test message.",
  badgeBg = "#f3f4f6",
  badgeText = "#374151",
}: ContactEmailProps) => {
  return (
    <Html lang="en">
      <Head>
        <style>
          {`
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
          `}
        </style>
      </Head>
      <Preview>New Contact Submission from {name}</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#09090b",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <table width="100%" border={0} cellSpacing="0" cellPadding="0" style={{ backgroundColor: "#09090b" }}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: "40px 16px" }} className="content-pad">
                <table
                  width="600"
                  border={0}
                  cellSpacing="0"
                  cellPadding="0"
                  className="main-card"
                  style={{
                    backgroundColor: "#18181b",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #27272a",
                    maxWidth: "600px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ height: "4px", background: "linear-gradient(90deg,#ea580c 0%,#f97316 50%,#ea580c 100%)" }} />
                    </tr>
                    <tr>
                      <td className="content-pad" style={{ padding: "40px", borderBottom: "1px solid #27272a", backgroundColor: "#131316" }}>
                        <table width="100%" border={0} cellSpacing="0" cellPadding="0">
                          <tbody>
                            <tr>
                              <td className="header-left">
                                <div style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff", letterSpacing: "0.1em", textTransform: "uppercase" }}>LIERON</div>
                                <div style={{ fontSize: "11px", fontWeight: 600, color: "#a1a1aa", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "4px" }}>Engineering Limited</div>
                              </td>
                              <td align="right" valign="top" className="header-right">
                                <span
                                  style={{
                                    display: "inline-block",
                                    backgroundColor: badgeBg,
                                    color: badgeText,
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    padding: "6px 14px",
                                    borderRadius: "24px",
                                    border: `1px solid ${badgeText}20`,
                                  }}
                                >
                                  {concern}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td className="content-pad" style={{ padding: "40px" }}>
                        <p style={{ color: "#ea580c", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 12px 0" }}>New Contact Submission</p>
                        <h1 className="title-text" style={{ color: "#ffffff", fontSize: "28px", fontWeight: 800, margin: "0 0 32px 0", letterSpacing: "-0.02em", lineHeight: 1.2 }}>A message has been received through the website contact form.</h1>
                        
                        <table width="100%" border={0} cellSpacing="0" cellPadding="0" style={{ marginBottom: "32px" }}>
                          <tbody>
                            <tr>
                              <td width="48%" className="responsive-td mobile-spacing" style={{ backgroundColor: "#1f1f22", borderRadius: "12px", padding: "20px", border: "1px solid #333338", verticalAlign: "top" }}>
                                <div style={{ color: "#a1a1aa", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>From</div>
                                <div style={{ color: "#ffffff", fontSize: "16px", fontWeight: 600, lineHeight: 1.4 }}>{name}</div>
                              </td>
                              <td width="4%" className="spacer" />
                              <td width="48%" className="responsive-td" style={{ backgroundColor: "#1f1f22", borderRadius: "12px", padding: "20px", border: "1px solid #333338", verticalAlign: "top" }}>
                                <div style={{ color: "#a1a1aa", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Reply To</div>
                                <a href={`mailto:${email}`} style={{ color: "#ea580c", fontSize: "15px", fontWeight: 600, textDecoration: "none", wordBreak: "break-all", lineHeight: 1.4 }}>{email}</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div style={{ color: "#a1a1aa", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Message</div>
                        <div style={{ backgroundColor: "#1f1f22", borderRadius: "12px", padding: "24px", border: "1px solid #333338", color: "#e4e4e7", fontSize: "15px", lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{brief}</div>

                        <table width="100%" border={0} cellSpacing="0" cellPadding="0" style={{ marginTop: "40px" }}>
                          <tbody>
                            <tr>
                              <td align="center">
                                <a href={`mailto:${email}?subject=Re: ${concern}`} style={{ display: "inline-block", backgroundColor: "#ea580c", color: "#ffffff", textDecoration: "none", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", padding: "16px 36px", borderRadius: "8px", boxShadow: "0 4px 14px rgba(234,88,12,0.3)" }}>Reply to {name}</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td className="content-pad" style={{ padding: "24px 40px", borderTop: "1px solid #27272a", backgroundColor: "#09090b" }}>
                        <table width="100%" border={0} cellSpacing="0" cellPadding="0">
                          <tbody>
                            <tr>
                              <td className="footer-left">
                                <p style={{ color: "#52525b", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>Lieron Engineering Limited &middot; Auckland, NZ</p>
                              </td>
                              <td align="right" className="footer-right">
                                <p style={{ color: "#52525b", fontSize: "12px", margin: 0 }}>Auto-generated notification</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Body>
    </Html>
  );
};

export default ContactEmail;

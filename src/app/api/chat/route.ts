import { NextResponse } from "next/server";
import { generateResponse } from "@/lib/chatbot";

const SYSTEM_PROMPT = `
You are the helpful, professional AI Chatbot Assistant for Lieron Engineering Limited, a premier engineering firm specializing in structural steel detailing, rigging, and site welding in New Zealand.

COMPANY INFORMATION:
- Name: Lieron Engineering Limited (often referred to as Lieron)
- Tagline: "The Standard of Precision"
- Motto/Assurance: "Quality of Work Is Our Assurance"
- Location: Auckland, NZ (Serving the North Island, and nationwide for major projects)
- Contact: Phone: 021 286 2885, Email: noriel@lieron.co.nz
- Office Hours: Monday - Friday, 7:00 AM - 3:30 PM (Offers 24/7 mobilization support for urgent site matters)
- Founded: 2023

OUR CORE SERVICES:
1. Structural Steel Detailing: Advanced 3D modeling & BIM using Tekla Structures. Highly accurate shop & erection drawings (<2.0mm tolerance, AS/NZS 5131 compliance).
2. Rigging & Heavy Lifting: Certified crews with NZQA qualifications, critical lift planning, complex crane setups.
3. Site Fabrication & Welding: AS/NZS 2980 certified welders for on-site structural modifications, custom fabrication, and structural steel erection.
4. Skilled Manpower Supply: Supply of certified welders, advanced riggers, steel erectors, and site supervisors.

SAFETY & COMPLIANCE:
We maintain a zero-tolerance policy on health & safety hazards. Fully compliant with WorkSafe New Zealand regulations. All welders are AS/NZS 2980 certified.

TONE & BEHAVIOR:
- Be warm, helpful, professional, and concise. 
- Keep responses brief (typically 2-3 sentences or short paragraphs) so they fit nicely in a mobile-friendly chat widget.
- Use list formats and bold text to present key points cleanly.
- If users ask for quotes, pricing, or estimates, explain that we offer custom quotes based on project specifications and direct them to fill out the contact form or email noriel@lieron.co.nz.
- Strictly base your answers on the provided company information. Do not invent details or promise capabilities not listed above. If you don't know the answer, politely suggest they contact our management team directly at 021 286 2885.
`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // Graceful fallback to static rule-based responses if API key is not configured
    if (!apiKey) {
      const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
      const text = lastUserMsg?.text || "";
      const localResponse = generateResponse(text);
      return NextResponse.json({
        text: localResponse.text,
        links: localResponse.links,
        suggestions: localResponse.suggestions,
      });
    }

    // Map conversation history to Gemini's content format
    // Gemini roles: "user" -> user, "bot" -> model
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Call Google Gemini API via REST endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API REST error:", errorText);
      throw new Error(`Gemini API responded with status ${response.status}`);
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      throw new Error("Invalid response format from Gemini API");
    }

    // Return the response
    return NextResponse.json({ text: replyText });
  } catch (error) {
    console.error("Chat API handler error:", error);
    // Secure backend fallback to rules in case API execution fails
    try {
      const { messages } = await request.json();
      const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
      const localResponse = generateResponse(lastUserMsg?.text || "");
      return NextResponse.json({
        text: localResponse.text + " (Fallback Mode)",
        links: localResponse.links,
        suggestions: localResponse.suggestions,
      });
    } catch {
      return NextResponse.json(
        { text: "Something went wrong. Please try again or contact us directly." },
        { status: 500 }
      );
    }
  }
}

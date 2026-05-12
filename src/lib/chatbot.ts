import { COMPANY, FOOTER_LINKS } from "@/lib/constants";
import { PROJECTS } from "@/lib/projects";

/* ===== KNOWLEDGE BASE ===== */

const SERVICES_INFO = {
  detailing: {
    name: "Structural Steel Detailing",
    desc: "Advanced 3D modeling & BIM using Tekla Structures. We produce accurate fabrication and shop drawings with AS/NZS 5131 compliance and <2.0mm tolerance.",
  },
  rigging: {
    name: "Rigging & Heavy Lifting",
    desc: "Certified crews with NZQA qualifications for critical lift planning, heavy placement, and specialist gear maintenance.",
  },
  fabrication: {
    name: "Site Fabrication & Welding",
    desc: "AS/NZS 2980 certified welders for on-site structural modifications, custom steel fabrication, and precision alignment with 24/7 mobilization.",
  },
  manpower: {
    name: "Skilled Manpower Supply",
    desc: "Structural welders, advanced riggers, steel erectors, and site supervisors ready for immediate deployment across NZ.",
  },
};

/* ===== INTENT DETECTION ===== */

interface ChatResponse {
  text: string;
  links?: { label: string; href: string }[];
  suggestions?: string[];
}

function detectIntent(msg: string): string {
  const lower = msg.toLowerCase().trim();

  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|greetings)/i.test(lower)) return "greeting";
  if (/service|what (do|can) you (do|offer)|capabilities|what you provide/i.test(lower)) return "services";
  if (/steel\s*detail|detailing|3d|bim|tekla|drawing/i.test(lower)) return "detailing";
  if (/rig|heavy\s*lift|crane|lifting/i.test(lower)) return "rigging";
  if (/weld|fabricat|site\s*fab/i.test(lower)) return "fabrication";
  if (/manpower|worker|crew|team|staff|personnel|hire/i.test(lower)) return "manpower";
  if (/project|portfolio|work|built|construct/i.test(lower)) return "projects";
  if (/contact|reach|email|phone|call|get\s*in\s*touch|talk/i.test(lower)) return "contact";
  if (/locat|address|where|office|auckland|visit|find\s*you/i.test(lower)) return "location";
  if (/hour|time|open|close|schedule|when\s*(are|is|do|open|close)/i.test(lower)) return "hours";
  if (/about|who|company|history|story|found|develop|creat|start|background/i.test(lower)) return "about";
  if (/safe|health|zero\s*harm|compliance|worksafe/i.test(lower)) return "safety";
  if (/pric|cost|quote|estimat|budget|how\s*much/i.test(lower)) return "pricing";
  if (/certif|standard|iso|nzs|as\/nzs|qualif/i.test(lower)) return "certifications";
  if (/thank|thanks|cheers|appreciate/i.test(lower)) return "thanks";
  if (/bye|goodbye|see\s*you|later/i.test(lower)) return "bye";
  if (/area|coverage|where\s*do\s*you\s*work|north\s*island|south\s*island|nationwide|region/i.test(lower)) return "service_area";
  if (/residential|house|home|private|domestic|renovat/i.test(lower)) return "residential";

  return "fallback";
}

/* ===== RESPONSE GENERATOR ===== */

export function generateResponse(userMessage: string): ChatResponse {
  const intent = detectIntent(userMessage);

  switch (intent) {
    case "greeting":
      return {
        text: `Welcome to ${COMPANY.shortName} Engineering! 👋 I'm here to help you learn about our services, explore our projects, or get in touch with our team. What would you like to know?`,
        suggestions: ["Our Services", "View Projects", "Contact Us"],
      };

    case "services":
      return {
        text: `We offer four core engineering services:\n\n🔩 **Structural Steel Detailing** — 3D modeling & BIM with Tekla\n🏗️ **Rigging & Heavy Lifting** — Certified crews for critical lifts\n⚡ **Site Fabrication & Welding** — AS/NZS 2980 certified\n👷 **Skilled Manpower Supply** — Immediate deployment NZ-wide\n\nWant details on any specific service?`,
        links: [{ label: "View All Services", href: "/services" }],
        suggestions: ["Steel Detailing", "Rigging", "Welding", "Manpower"],
      };

    case "detailing":
      return {
        text: `**${SERVICES_INFO.detailing.name}**\n\n${SERVICES_INFO.detailing.desc}\n\nWe produce shop drawings, erection plans, and material lists — all integrated with your project timeline.`,
        links: [{ label: "Learn More", href: "/services#detailing" }],
        suggestions: ["Other Services", "Contact Us", "View Projects"],
      };

    case "rigging":
      return {
        text: `**${SERVICES_INFO.rigging.name}**\n\n${SERVICES_INFO.rigging.desc}\n\nOur riggers are equipped for complex multi-crane lifts and tight urban environments.`,
        links: [{ label: "Learn More", href: "/services#rigging" }],
        suggestions: ["Other Services", "Contact Us"],
      };

    case "fabrication":
      return {
        text: `**${SERVICES_INFO.fabrication.name}**\n\n${SERVICES_INFO.fabrication.desc}\n\nFrom remedial works to bespoke architectural steelwork — we deliver on site.`,
        links: [{ label: "Learn More", href: "/services#fabrication" }],
        suggestions: ["Other Services", "Contact Us"],
      };

    case "manpower":
      return {
        text: `**${SERVICES_INFO.manpower.name}**\n\n${SERVICES_INFO.manpower.desc}\n\nScale your project capacity with our experienced technical teams.`,
        links: [{ label: "Learn More", href: "/services#manpower" }],
        suggestions: ["Other Services", "Contact Us"],
      };

    case "projects": {
      const projectList = PROJECTS.slice(0, 4)
        .map((p) => `• **${p.title}** — ${p.location} (${p.year})`)
        .join("\n");
      return {
        text: `Here are some of our recent projects:\n\n${projectList}\n\nWe've completed work across commercial, industrial, and infrastructure sectors.`,
        links: [{ label: "View All Projects", href: "/projects" }],
        suggestions: ["Our Services", "Contact Us"],
      };
    }

    case "contact":
      return {
        text: `You can reach us through:\n\n📞 **Phone:** ${COMPANY.phone}\n📧 **Email:** ${COMPANY.email}\n🌐 **Website:** ${COMPANY.domain}\n\nOr fill out our consultation form and we'll get back to you promptly!`,
        links: [{ label: "Contact Form", href: "/contact" }],
        suggestions: ["Office Hours", "Our Location"],
      };

    case "location":
      return {
        text: `We're based in **${COMPANY.location}** 📍\n\nOur headquarters is in the Auckland Central Business District. We service projects across the North Island.`,
        links: [{ label: "Visit Contact Page", href: "/contact" }],
        suggestions: ["Office Hours", "Contact Us"],
      };

    case "hours":
      return {
        text: `Our office hours are:\n\n🕐 **${COMPANY.hours.days}**\n⏰ **${COMPANY.hours.time}**\n\nFor urgent site matters, we offer 24/7 mobilization support.`,
        suggestions: ["Contact Us", "Our Services"],
      };

    case "about":
      return {
        text: `**${COMPANY.name}** was established in ${COMPANY.established} in Auckland, NZ.\n\nWe specialize in structural steel engineering — from precision detailing to on-site fabrication and rigging. Our mission is to pioneer progress through specialized expertise and high-spec structural fabrication.\n\n"${COMPANY.tagline}" isn't just our motto — it's our operational baseline.`,
        links: [{ label: "About Us", href: "/about" }],
        suggestions: ["Our Services", "View Projects", "Contact Us"],
      };

    case "safety":
      return {
        text: `Safety is our top priority at Lerion Engineering:\n\n🛡️ **Zero Tolerance** — No exceptions to safety protocols\n📋 **Continuous Training** — Weekly crew training & hazard assessments\n✅ **Full Compliance** — Meeting all NZ WorkSafe standards\n\nWe maintain a relentless commitment to the health, safety, and wellbeing of everyone on our sites.`,
        links: [{ label: "Learn More", href: "/about" }],
        suggestions: ["Our Services", "Contact Us"],
      };

    case "pricing":
      return {
        text: `We provide customized quotes based on project scope, complexity, and timeline. Every project is unique, so we recommend getting in touch for a detailed consultation.\n\n📞 **Call:** ${COMPANY.phone}\n📧 **Email:** ${COMPANY.email}`,
        links: [{ label: "Request Quote", href: "/contact" }],
        suggestions: ["Our Services", "View Projects"],
      };

    case "certifications":
      return {
        text: `We maintain the highest industry standards:\n\n✅ **AS/NZS 5131** — Structural Steelwork Fabrication\n✅ **AS/NZS 2980** — Welding Qualification\n✅ **NZ WorkSafe** — Full Compliance\n✅ **NZQA** — Certified Riggers\n✅ **CPEng / NZ Chartered** — Engineering Standards\n\nQuality assurance is built into every stage of our process.`,
        suggestions: ["Our Services", "Contact Us"],
      };

    case "thanks":
      return {
        text: `You're welcome! 😊 Happy to help. Is there anything else you'd like to know about ${COMPANY.shortName} Engineering?`,
        suggestions: ["Our Services", "View Projects", "Contact Us"],
      };

    case "bye":
      return {
        text: `Thanks for visiting ${COMPANY.shortName} Engineering! Feel free to come back anytime. Have a great day! 👋`,
      };

    case "service_area":
      return {
        text: `While we are based in **${COMPANY.location}**, we provide engineering services throughout the **North Island**. For large-scale infrastructure or industrial projects, we can mobilize our teams further afield.\n\nAre you inquiring about a project outside of Auckland?`,
        suggestions: ["Contact Us", "Our Services"],
      };

    case "residential":
      return {
        text: `Our primary focus is on **Commercial, Industrial, and Infrastructure** sectors. However, we do provide structural steel detailing and precision welding for high-end residential developments that require industrial-grade engineering.\n\nIs your project for a commercial build or a private residence?`,
        suggestions: ["Commercial Projects", "Contact for Quote"],
      };

    default:
      return {
        text: `I appreciate your question! While I may not have a specific answer for that, I can help you with:\n\n• Our engineering services\n• Project portfolio\n• Contact information\n• Company details\n\nWhat would you like to explore?`,
        suggestions: ["Our Services", "View Projects", "Contact Us", "About Lerion"],
      };
  }
}

/* ===== QUICK SUGGESTIONS ===== */

export const QUICK_SUGGESTIONS = [
  "Our Services",
  "View Projects",
  "Contact Us",
  "Office Hours",
  "About Lerion",
];

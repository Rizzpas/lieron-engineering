import { generatePageMetadata } from "@/lib/metadata";
import ContactPageClient from "@/components/sections/contact/ContactPageClient";

export const metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Get in touch with Lieron Engineering Limited. Start your structural steel project consultation today. Auckland, New Zealand headquarters.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}

import { generatePageMetadata } from "@/lib/metadata";
import ContactPageClient from "@/components/sections/contact/ContactPageClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Contact Lieron Engineering — Auckland structural steel specialists. Get a quote for steel detailing, rigging, or site fabrication services in New Zealand.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: "" },
          { name: "Contact", item: "/contact" },
        ]}
      />
      <JsonLd type="ContactPage" />
      <ContactPageClient />
    </>
  );
}

import { COMPANY, SEO } from "@/lib/constants";

type JsonLdProps = {
  type: "LocalBusiness" | "Organization" | "Service" | "BreadcrumbList" | "WebSite" | "ContactPage";
  data?: Record<string, unknown>;
  breadcrumbs?: Array<{ name: string; item: string }>;
  services?: Array<{ name: string; description: string }>;
};

export default function JsonLd({ type, data, breadcrumbs, services }: JsonLdProps) {
  let schema: Record<string, unknown> | Array<Record<string, unknown>> = {
    "@context": "https://schema.org",
  };

  switch (type) {
    case "LocalBusiness":
      schema = {
        ...schema,
        "@type": "LocalBusiness",
        name: COMPANY.name,
        image: `${COMPANY.domain}/images/hero-img.jpg`,
        "@id": COMPANY.domain,
        url: COMPANY.domain,
        telephone: COMPANY.phone,
        email: COMPANY.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Auckland",
          addressRegion: "Auckland",
          addressCountry: "NZ",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SEO.geo.latitude,
          longitude: SEO.geo.longitude,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "07:00",
          closes: "15:30",
        },
        sameAs: [
          "https://www.facebook.com/lieronengineeringlimited",
        ],
        ...data,
      };
      break;

    case "Organization":
      schema = {
        ...schema,
        "@type": "Organization",
        name: COMPANY.name,
        alternateName: COMPANY.brandName,
        url: COMPANY.domain,
        logo: `${COMPANY.domain}/icons/lieron-logo.svg`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: COMPANY.phone,
          contactType: "customer service",
          areaServed: "NZ",
          availableLanguage: "English",
        },
        sameAs: [
          "https://www.facebook.com/lieronengineeringlimited",
        ],
        ...data,
      };
      break;

    case "WebSite":
      schema = {
        ...schema,
        "@type": "WebSite",
        name: COMPANY.brandName,
        url: COMPANY.domain,
        ...data,
      };
      break;

    case "BreadcrumbList":
      if (!breadcrumbs) return null;
      schema = {
        ...schema,
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: crumb.name,
          item: `${COMPANY.domain}${crumb.item}`,
        })),
      };
      break;

    case "Service":
      if (!services) return null;
      // When rendering multiple services, it's better to render an array of Service schemas or an ItemList
      schema = services.map(service => ({
        "@context": "https://schema.org",
        "@type": "Service",
        provider: {
          "@type": "LocalBusiness",
          name: COMPANY.brandName,
        },
        name: service.name,
        description: service.description,
        areaServed: {
          "@type": "Country",
          name: "New Zealand",
        },
      }));
      break;

    case "ContactPage":
      schema = {
        ...schema,
        "@type": "ContactPage",
        url: `${COMPANY.domain}/contact`,
        name: `Contact ${COMPANY.brandName}`,
        description: "Get in touch with Lieron Engineering for structural steel detailing, rigging, and site fabrication.",
        ...data,
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

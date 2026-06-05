import { COMPANY } from "./constants";
import type { Metadata } from "next";

/**
 * Generate page-specific metadata with consistent defaults.
 */
export function generatePageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${COMPANY.domain}${path}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${COMPANY.name}`,
      description,
      url,
      siteName: COMPANY.name,
      locale: "en_NZ",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${COMPANY.name}`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

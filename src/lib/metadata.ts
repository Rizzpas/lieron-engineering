import { COMPANY } from "./constants";
import type { Metadata } from "next";

/**
 * Generate page-specific metadata with consistent defaults.
 */
export function generatePageMetadata({
  title,
  description,
  path = "",
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${COMPANY.domain}${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    openGraph: {
      title: `${title} | ${COMPANY.brandName}`,
      description,
      url,
      siteName: COMPANY.brandName,
      locale: "en_NZ",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${COMPANY.brandName}`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

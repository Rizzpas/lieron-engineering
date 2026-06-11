import { COMPANY, SEO } from "./constants";
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
    robots: {
      index: true,
      follow: true,
    },
    keywords: [...SEO.keywords],
    other: {
      "geo.region": SEO.geo.region,
      "geo.placename": SEO.geo.placeName,
      "geo.position": `${SEO.geo.latitude};${SEO.geo.longitude}`,
      "ICBM": `${SEO.geo.latitude}, ${SEO.geo.longitude}`,
    },
    alternates: {
      canonical: url,
    },
  };
}

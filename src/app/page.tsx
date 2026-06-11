import { generatePageMetadata } from "@/lib/metadata";
import HeroSection from "@/components/sections/home/HeroSection";
import PartnersBar from "@/components/sections/home/PartnersBar";
import CapabilitiesGrid from "@/components/sections/home/CapabilitiesGrid";
import ExcellenceSection from "@/components/sections/home/ExcellenceSection";
import CTASection from "@/components/sections/home/CTASection";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generatePageMetadata({
  title: "Lieron Engineering | Structural Steel Auckland",
  description:
    "Lieron Engineering Limited — Specializing in Structural Steel Detailing, Rigging, and Site Fabrication Welding across New Zealand. Quality of work is our assurance.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd type="LocalBusiness" />
      <HeroSection />
      <PartnersBar />
      <CapabilitiesGrid />
      <ExcellenceSection />
      <CTASection />
    </>
  );
}

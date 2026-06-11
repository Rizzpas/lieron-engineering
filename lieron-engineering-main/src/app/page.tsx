import { generatePageMetadata } from "@/lib/metadata";
import HeroSection from "@/components/sections/home/HeroSection";
import PartnersBar from "@/components/sections/home/PartnersBar";
import CapabilitiesGrid from "@/components/sections/home/CapabilitiesGrid";
import ExcellenceSection from "@/components/sections/home/ExcellenceSection";
import CTASection from "@/components/sections/home/CTASection";

export const metadata = generatePageMetadata({
  title: "Lieron Engineering Limited",
  description:
    "Your Trusted Partner for Structural Steel Engineering Excellence in New Zealand. From Precision Detailing to On-Site Fabrication and Rigging, We Deliver Quality You Can Depend On.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersBar />
      <CapabilitiesGrid />
      <ExcellenceSection />
      <CTASection />
    </>
  );
}

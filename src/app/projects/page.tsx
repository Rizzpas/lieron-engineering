import { generatePageMetadata } from "@/lib/metadata";
import ProjectsPageClient from "@/components/sections/projects/ProjectsPageClient";

export const metadata = generatePageMetadata({
  title: "Projects",
  description:
    "Explore Lieron Engineering's portfolio of structural steel projects across New Zealand. From commercial developments to industrial infrastructure, built to last.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}

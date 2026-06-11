import { generatePageMetadata } from "@/lib/metadata";
import ProjectsPageClient from "@/components/sections/projects/ProjectsPageClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generatePageMetadata({
  title: "Projects",
  description:
    "Structural steel projects across Auckland and New Zealand — commercial, industrial, and infrastructure builds by Lieron Engineering. View our portfolio.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        breadcrumbs={[
          { name: "Home", item: "" },
          { name: "Projects", item: "/projects" },
        ]}
      />
      <ProjectsPageClient />
    </>
  );
}

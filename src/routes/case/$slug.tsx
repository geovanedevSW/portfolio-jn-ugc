import { createFileRoute, notFound } from "@tanstack/react-router";
import { CaseGallery } from "@/components/site/CaseGallery";
import { getCaseBySlug } from "@/lib/cases";

export const Route = createFileRoute("/case/$slug")({
  beforeLoad: ({ params }) => {
    const project = getCaseBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params }) => {
    const project = getCaseBySlug(params.slug);
    if (!project) return {};
    return {
      meta: [
        { title: project.metaTitle },
        { name: "description", content: project.metaDescription },
        { property: "og:title", content: project.metaTitle },
        { property: "og:description", content: project.ogDescription },
      ],
    };
  },
  component: CaseSlugPage,
});

function CaseSlugPage() {
  const { project } = Route.useRouteContext();
  return <CaseGallery project={project} />;
}

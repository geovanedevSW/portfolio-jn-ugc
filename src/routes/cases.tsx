import { createFileRoute, redirect } from "@tanstack/react-router";
import { defaultCaseSlug } from "@/lib/cases";

export const Route = createFileRoute("/cases")({
  beforeLoad: ({ search }) => {
    // If there is a brand query param, use it. Otherwise, use the default.
    // We cast search as any here because /cases doesn't have a formal validateSearch defined
    const brand = (search as any)?.brand;
    const slug = brand || defaultCaseSlug;

    throw redirect({
      to: "/case/$slug",
      params: { slug },
    });
  },
});

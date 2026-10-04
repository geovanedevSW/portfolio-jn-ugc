import { createFileRoute, redirect } from "@tanstack/react-router";
import { defaultCaseSlug } from "@/lib/cases";

export const Route = createFileRoute("/case/")({
  beforeLoad: () => {
    throw redirect({
      to: "/case/$slug",
      params: { slug: defaultCaseSlug },
    });
  },
});

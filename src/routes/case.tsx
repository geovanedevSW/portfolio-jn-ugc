import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/case")({
  component: CaseLayout,
});

function CaseLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Reveal>
        <Outlet />
      </Reveal>
    </div>
  );
}

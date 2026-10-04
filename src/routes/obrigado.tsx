import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CheckCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Obrigado! — Jhenifer Nogueira" },
      { name: "description", content: "Seu briefing foi enviado com sucesso. Retornaremos em breve!" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-24">
      <Reveal>
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
            <CheckCircle className="h-10 w-10" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Obrigado!
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            Recebi seu briefing com sucesso. Analisarei as informações e retornarei com a proposta estratégica em até 24 horas úteis.
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink)] transition-all hover:scale-[1.02] hover:shadow-[0_10px_20px_-10px_rgba(255,255,255,0.3)]"
            >
              Voltar para o Início
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

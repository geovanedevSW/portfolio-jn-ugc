import { Reveal } from "./Reveal";
import usePedrosoLogo from "@/assets/usepedroso-logo.webp";

const testimonial = {
  logo: usePedrosoLogo,
  quote: [
    "Começamos a trabalhar juntas em 2025 e, desde então, a Jheni se tornou uma profissional em quem confio muito para traduzir a Use Pedroso em vídeo.",
    "Ela é extremamente criteriosa em cada detalhe, desde a produção até a entrega final. Tem um olhar cuidadoso, entende a proposta da marca e não se limita ao que foi pedido: sempre busca entregar além, baseando nas referências e em trocas.",
    "A qualidade dos vídeos, o cuidado com a estética e, principalmente, o comprometimento com cada entrega fazem toda a diferença. É o tipo de profissional que supera as expectativas e faz a gente ter ainda mais certeza de que escolheu a pessoa certa para caminhar junto com a marca.",
  ],
  name: "Use Pedroso",
  role: "Marca parceira",
};

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1360px] px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <div className="eyebrow inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">Depoimentos</div>
            <h2 className="font-display text-[42px] leading-[1.05] tracking-[-0.03em] sm:text-[52px] md:text-[64px] text-[var(--ink)]">
              O que dizem sobre <br />
              <span className="text-[var(--ink)]">
                meu trabalho
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <div className="card-elevated relative mt-12 overflow-hidden rounded-[28px] border border-white/10 p-7 md:p-12">
            <span className="pointer-events-none absolute right-8 top-2 select-none font-serif text-[120px] leading-none text-[var(--ink)]/5 md:right-12 md:top-4 md:text-[160px]">
              ”
            </span>
            <blockquote className="relative grid gap-8 md:grid-cols-12 md:gap-12">
                <div className="flex items-center gap-4 md:col-span-3 md:flex-col md:items-start">
                  <img
                    src={testimonial.logo}
                    alt=""
                    className="h-12 w-12 rounded-full bg-white object-contain p-1 md:h-18 md:w-18"
                  />
                  <div className="h-px w-10 bg-[var(--accent)]" />
                </div>

                <div className="md:col-span-9">
                  <div className="space-y-4 text-[15px] leading-relaxed text-[var(--ink)] md:text-[17px]">
                    {testimonial.quote.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <footer className="mt-7 flex flex-col gap-1 border-t border-[var(--border)] pt-5">
                    <cite className="not-italic text-sm font-semibold text-[var(--ink)]">
                      {testimonial.name}
                    </cite>
                    <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                      {testimonial.role}
                    </span>
                  </footer>
                </div>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { CursorGlow } from "./CursorGlow";
import { motion } from "framer-motion";

const differentials = [
  "Roteiros que conectam",
  "Gravação natural e profissional",
  "Edição para Reels e Ads",
  "Conteúdo alinhado à marca",
]

export function About() {
  return (
    <section id="sobre" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background element for "Impeccable" feel */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-16 px-6 lg:grid-cols-12 md:px-10 relative z-10 lg:items-center">
        <div className="order-1 lg:col-span-7 lg:order-2">
          <Reveal direction="left">
            <div className="mb-10 relative">
              {/* Decorative Quote Mark */}
              <span className="absolute -top-12 -left-6 text-8xl font-serif text-white/5 select-none pointer-events-none">“</span>
              <h2 className="font-display text-[42px] leading-[1.05] tracking-[-0.03em] sm:text-[52px] md:text-[64px] text-[var(--ink)]">
                Conteúdo autêntico, <br />
                <span className="text-[var(--ink)]">
                  natural e que
                </span> <br />
                <em className="font-normal italic text-[var(--ink)]/80">gera conexão.</em>
              </h2>
            </div>
            <CursorGlow className="card-elevated rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl" intensity={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-[var(--ink)]/30" />
                <div className="eyebrow uppercase tracking-widest text-[10px] font-bold text-[var(--ink)]/60">Diferenciais Estratégicos</div>
              </div>
              <ul className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
                {differentials.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex items-start gap-4 transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="mt-1 grid h-5 w-5 flex-none place-items-center rounded-full bg-[var(--accent)] text-white transition-transform duration-300 group-hover:scale-110">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] leading-snug text-[var(--ink)] font-medium group-hover:text-black transition-colors">
                      {d}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </CursorGlow>
          </Reveal>
        </div>
        <div className="order-2 lg:col-span-5 lg:order-1">
          <Reveal>
            <div className="relative">
              <div className="eyebrow mb-6 inline-block pl-1 border-l-2 border-[var(--accent)]">Sobre mim</div>
              <div className="mt-4 max-w-lg space-y-6 text-[16px] leading-relaxed text-[var(--muted-foreground)]">
                <p>
                  Oi! Me chamo Jhenifer Nogueira, tenho 21 anos e atualmente curso Marketing Digital.
                  Sou Creator e amo criar conteúdos leves, autênticos e que geram conexão com as
                  pessoas, sempre trazendo bom humor, carisma e naturalidade.
                </p>
                <p>
                  Atualmente, trabalho como rosto de uma marca e também como Creator, produzindo
                  conteúdos UGC para diferentes projetos. Gosto de transformar ideias em vídeos com
                  personalidade, buscando aproximar marcas e público de forma espontânea e verdadeira.
                </p>
              </div>
              <div className="mt-12">
                <a href="#contato" className="btn-outline group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-white/10">
                  <span className="relative z-10 flex items-center gap-3 font-bold uppercase tracking-widest text-[11px]">
                    Quero trabalhar com você
                    <ArrowRight className="arrow h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

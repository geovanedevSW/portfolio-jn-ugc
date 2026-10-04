import {
  Smartphone,
  Lightbulb,
  Package,
  Sparkles,
  Camera,
  Megaphone,
  Heart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { CursorGlow } from "./CursorGlow";
import { motion } from "framer-motion";

const services = [
  {
    icon: Smartphone,
    title: "UGC para Redes Sociais",
    desc: "Vídeos nativos para Reels, Shorts e TikTok.",
  },
  {
    icon: Lightbulb,
    title: "Conteúdo Estratégico",
    desc: "Roteiros pensados para conversão e conexão real.",
  },
  {
    icon: Package,
    title: "Unboxing & Review",
    desc: "Apresentação natural do produto, com foco em benefícios.",
  },
  {
    icon: Sparkles,
    title: "Lifestyle",
    desc: "Conteúdo humanizado utilizando o produto no dia a dia.",
  },
  {
    icon: Camera,
    title: "Fotos para Redes Sociais",
    desc: "Fotos lifestyle e comerciais alinhadas à identidade.",
  },
  {
    icon: Megaphone,
    title: "Conteúdo para Anúncios",
    desc: "Vídeos pensados para campanhas pagas de alta performance.",
  },
];

const benefits = [
  { icon: Heart, label: "Gera conexão real com o público" },
  { icon: TrendingUp, label: "Aumenta conversão em Ads" },
  { icon: Zap, label: "Produção rápida e escalável" },
];

export function Services() {
  return (
    <section id="servicos" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background atmospheric elements */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1360px] px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <div className="eyebrow inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">Serviços</div>
            <h2 className="font-display text-[42px] leading-[1.05] tracking-[-0.03em] sm:text-[52px] md:text-[64px] text-[var(--ink)]">
              Como posso <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ink)] to-[var(--ink)]/60">
                 ajudar sua marca
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} direction="up" delay={i * 0.1}>
              <CursorGlow className="card-elevated h-full rounded-[32px] p-8 border border-white/10 transition-all duration-500 hover:border-[var(--accent)]/30 group" intensity={0.08}>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--ink)]/5 text-[var(--ink)] transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                  <s.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-8 text-[14px] font-bold tracking-[0.1em] uppercase text-[var(--ink)]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted-foreground)] group-hover:text-[var(--ink)]/80 transition-colors">
                  {s.desc}
                </p>
              </CursorGlow>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.3}>
          <div className="mt-20 rounded-[40px] border border-[var(--border)] bg-white/[0.02] backdrop-blur-sm p-8 md:p-12">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[auto_1fr]">
              <div className="relative">
                <div className="eyebrow uppercase tracking-widest font-bold text-[var(--ink)] text-center md:text-left">
                  Por que UGC
                </div>
                <div className="h-1 w-full bg-[var(--accent)] mt-2 rounded-full" />
              </div>
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {benefits.map((b) => (
                  <motion.li
                    key={b.label}
                    whileHover={{ y: -5 }}
                    className="flex items-center gap-4 text-[15px] font-medium text-[var(--ink)]"
                  >
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20">
                      <b.icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    {b.label}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

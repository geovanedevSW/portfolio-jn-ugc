import { ArrowRight, Instagram } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { StaggerLines, Reveal } from "./Reveal";
import jn from "@/assets/jhenifer.webp";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const tx = useTransform(sx, (v) => v * 10);
  const ty = useTransform(sy, (v) => v * 10);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="top" className="relative pt-28 md:pt-32">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
        <div className="order-2 md:order-1 md:col-span-6 md:pt-6 lg:pt-10">
          <h1 className="font-display text-[44px] leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-[56px] md:text-[56px] lg:text-[76px]">
            <StaggerLines
              lines={["Conteúdos que", "conectam.", "Marcas que", "vendem."]}
              italicWord="conectam"
              italicWordColor="#C9A86A"
            />
          </h1>

          <Reveal direction="up" delay={0.35}>
            <p className="mt-8 max-w-md text-[16px] leading-relaxed text-[var(--muted-foreground)] opacity-90">
              Crio vídeos autênticos e estratégicos que aproximam marcas de pessoas e geram
              resultados reais nas redes sociais.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.5}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contato-form" className="btn-primary">
                Quero meu vídeo estratégico
                <ArrowRight className="arrow h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal direction="fade" delay={0.7}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-[var(--muted-foreground)]">
              <a
                href="https://instagram.com/jhenifer.nogueira_"
                className="flex items-center gap-3 tracking-wide transition-colors hover:text-[var(--ink)]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[var(--ink)] hover:scale-110">
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                </span>
                @jhenifer.nogueira_
              </a>
              <span className="h-4 w-px bg-[var(--border)]" />
              <a href="#projeto" className="btn-ghost">
                Ver cases
                <ArrowRight className="arrow h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="hidden md:col-span-6 md:block">
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--muted)]"
            style={{ boxShadow: "0 30px 80px -40px rgba(0,0,0,0.35)" }}
          >
            <motion.img
              src={jn}
              alt="Jhenifer Nogueira, UGC Creator"
              style={{ x: tx, y: ty, scale: 1.04, objectPosition: "center 22%" }}
              className="h-[420px] w-full object-cover md:h-[560px] lg:h-[640px]"
              fetchPriority="high"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

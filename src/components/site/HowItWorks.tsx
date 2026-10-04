import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    n: "01",
    title: "Briefing",
    desc: "Você envia o briefing e alinhamos objetivos, tom e formatos.",
  },
  {
    n: "02",
    title: "Planejamento",
    desc: "Defino roteiros, referências e cronograma de gravação.",
  },
  {
    n: "03",
    title: "Captação",
    desc: "Gravação em alta qualidade, com atenção à luz, som e enquadramento.",
  },
  {
    n: "04",
    title: "Edição",
    desc: "Cortes, legendas e ritmo pensados para cada plataforma.",
  },
  {
    n: "05",
    title: "Entrega",
    desc: "Conteúdos prontos para publicar, adaptados a Reels, Shorts e Ads.",
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsListRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const finalRevealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    let cleanupLineResize = () => {}

    const ctx = gsap.context(() => {
      const updateLineGeometry = () => {
        const list = stepsListRef.current
        const firstCircle = stepsRef.current[0]?.querySelector<HTMLElement>(".step-circle")
        const lastCircle =
          stepsRef.current[stepsRef.current.length - 1]?.querySelector<HTMLElement>(".step-circle")
        if (!list || !firstCircle || !lastCircle || !progressLineRef.current) return

        const listRect = list.getBoundingClientRect()
        const firstRect = firstCircle.getBoundingClientRect()
        const lastRect = lastCircle.getBoundingClientRect()
        const firstCenter = firstRect.top - listRect.top + firstRect.height / 2
        const lastCenter = lastRect.top - listRect.top + lastRect.height / 2
        gsap.set(progressLineRef.current, {
          top: firstCenter,
          bottom: "auto",
          height: lastCenter - firstCenter,
        })
      }

      stepsRef.current.forEach((step, i) => {
        if (!step) return

        const numberEl = step.querySelector(".step-number")
        const checkEl = step.querySelector(".step-check")
        const textEl = step.querySelector(".step-text")
        const circleEl = step.querySelector(".step-circle")

        gsap.set(step, { opacity: 1, y: 0 })
        if (textEl) gsap.set(textEl, { opacity: 1, y: 0 })
        if (checkEl) {
          gsap.set(checkEl, { opacity: 0, scale: 0.9 })
          const path = checkEl.querySelector("polyline")
          if (path) {
            const length = path.getTotalLength()
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
          }
        }
      })

      updateLineGeometry()
      window.addEventListener("resize", updateLineGeometry)
      cleanupLineResize = () => window.removeEventListener("resize", updateLineGeometry)

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduceMotion) {
        gsap.set(progressLineRef.current, { scaleY: 1 })
        gsap.set(finalRevealRef.current, { opacity: 1, y: 0 })
        return
      }

      gsap.set(progressLineRef.current, {
        transformOrigin: "top center",
        scaleY: 0,
      })

      gsap.to(progressLineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: stepsListRef.current,
          start: "top 62%",
          endTrigger: stepsRef.current[stepsRef.current.length - 1],
          end: "top 75%",
          scrub: 0.5,
        },
      })

      stepsRef.current.forEach((step) => {
        if (!step) return
        const circleEl = step.querySelector(".step-circle")
        const numberEl = step.querySelector(".step-number")
        const checkEl = step.querySelector(".step-check")
        const path = checkEl?.querySelector("polyline")
        const trigger = {
          trigger: step,
          start: "top 58%",
          toggleActions: "play none none reverse",
        }

        gsap.to(circleEl, {
          scale: 1.08,
          borderColor: "var(--accent)",
          duration: 0.25,
          scrollTrigger: {
            ...trigger,
            start: "top 68%",
            end: "bottom 42%",
            toggleActions: "play reverse play reverse",
          },
        })
        gsap.to(numberEl, { opacity: 0, scale: 0.9, duration: 0.2, scrollTrigger: trigger })
        gsap.to(checkEl, { opacity: 1, scale: 1, duration: 0.25, scrollTrigger: trigger })
        if (path) {
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: trigger,
          })
        }
      })

      gsap.fromTo(
        finalRevealRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: finalRevealRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef.current)

    return () => {
      cleanupLineResize()
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="processo"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[var(--background)]"
    >
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1360px] px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-32 lg:self-start lg:h-fit">
              <div className="eyebrow inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                COMO FUNCIONA
              </div>
                <h2 className="font-display text-[42px] leading-[1.05] tracking-[-0.03em] sm:text-[52px] md:text-[64px] text-[var(--ink)]">
                  Um processo simples, <br />
                  <span className="text-[var(--muted-foreground)]">do briefing à entrega.</span>
                </h2>
              <p className="text-[16px] leading-relaxed text-[var(--muted-foreground)] max-w-md">
                Do primeiro briefing ao conteúdo pronto para publicar, cada etapa é pensada para
                tornar o processo simples, claro e estratégico.
              </p>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative max-w-xl mx-auto lg:mx-0">
              <div ref={stepsListRef} className="relative space-y-24 py-12 md:space-y-28">
                <div className="absolute left-[23px] top-12 bottom-12 w-px bg-[var(--border)] opacity-10" />
                <div
                  ref={progressLineRef}
                  className="absolute left-[23px] top-12 bottom-12 w-px bg-[var(--ink)] origin-top z-0"
                  style={{ transform: "scaleY(0)", transformOrigin: "top center", opacity: 0.8 }}
                />

                {steps.map((s, i) => (
                  <div
                    key={s.n}
                    ref={(el) => {
                      stepsRef.current[i] = el
                    }}
                    className="relative pl-16 group"
                  >
                    <div className="step-circle absolute left-0 top-0 h-12 w-12 rounded-full border border-[var(--border)] bg-[var(--background)] z-10 flex items-center justify-center transition-colors duration-300 group-hover:border-[var(--accent)]">
                      <span className="step-number font-display text-sm font-medium text-[var(--ink)]">
                        {s.n}
                      </span>
                      <div className="step-check absolute inset-0 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-6 w-6 text-[var(--ink)]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>

                    <div className="step-text">
                      <h3 className="font-display text-[22px] leading-tight tracking-[-0.02em] md:text-[26px] text-[var(--ink)]">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted-foreground)]">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                ref={finalRevealRef}
                className="mt-16 border-t border-[var(--border)] pt-12 opacity-0 translate-y-10 text-center md:mt-20 md:pt-14 md:text-left"
              >
                <h3 className="font-display text-[32px] md:text-[42px] text-[var(--ink)] mb-4">
                  Pronto para criar.
                </h3>
                <p className="text-[16px] text-[var(--muted-foreground)] mb-8">
                  Agora é só transformar sua ideia em conteúdo.
                </p>
                <a
                  href="#contato-form"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--ink)] text-white text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 group"
                >
                  QUERO TRABALHAR COM VOCÊ
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

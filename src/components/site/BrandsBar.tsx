import { Reveal } from "./Reveal"
import usePedrosoLogo from "@/assets/usepedroso-logo.webp"
import blendee from "@/assets/logo-blendee.webp"

export function BrandsBar() {
  return (
    <section className="relative mt-10 md:mt-14 bg-[var(--ink)] text-white">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-6 px-6 py-8 md:flex-row md:gap-12 md:px-10">
        <Reveal direction="left" eager>
          <div className="text-center text-[11px] leading-[1.5] tracking-[0.22em] uppercase text-white/80 md:text-left">
            Marcas com
            <br />
            quem já trabalhei
          </div>
        </Reveal>
        <div className="hidden h-10 w-px bg-white/15 md:block" />
        <Reveal direction="up" delay={0.1} eager>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-white p-3 transition-transform duration-300 hover:scale-105 md:h-20 md:w-20">
              <img
                src={usePedrosoLogo}
                alt="Use Pedroso"
                className="h-10 w-auto object-contain md:h-12"
              />
            </div>
            <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-[#f5e6f0] p-2 transition-transform duration-300 hover:scale-105 md:h-20 md:w-20">
              <span className="text-center text-[9px] font-bold leading-tight tracking-wide text-[#8b3a6b] md:text-[10px]">
                RAFA LOU
                <br />
                BEAUTY
              </span>
            </div>
            <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-[#23322a] p-2 transition-transform duration-300 hover:scale-105 md:h-20 md:w-20">
              <img src={blendee} alt="Blendee" className="h-12 w-12 object-contain md:h-16 md:w-16" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

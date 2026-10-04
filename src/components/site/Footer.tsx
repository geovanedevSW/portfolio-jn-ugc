import { Instagram, Mail, Smartphone, Heart } from "lucide-react"
import { Reveal } from "./Reveal"
import { ContactForm } from "./ContactForm"
import {
  studioEmail,
  studioInstagramHandle,
  studioInstagramUrl,
  studioMailto,
  studioWhatsappLabel,
  studioWhatsappUrl,
} from "@/lib/studio"

export function Footer() {
  return (
    <footer id="contato" className="relative mt-16 bg-[var(--ink)] text-white">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <Reveal className="md:col-span-12 lg:col-span-5" direction="up">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center lg:grid-cols-1 lg:gap-0">
            <div className="md:col-span-7 lg:col-span-1">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-white/30" />
                <div className="eyebrow text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium">Briefing rápido</div>
              </div>
              <h3 className="mt-6 font-display text-[42px] leading-[1.05] tracking-[-0.03em] text-white md:text-[60px]">
                Pronto para o <br />
                <em className="font-normal italic text-white/90">próximo vídeo?</em>
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">
                Preencha o formulário e volto com um plano de conteúdo pensado para o objetivo da
                sua marca, sem enrolação.
              </p>
            </div>

            <div className="space-y-4 md:col-span-5 lg:col-span-1 lg:mt-10">
              <a
                href={studioMailto}
                className="group flex items-center gap-4 text-[14px] text-white/85 transition-all duration-300 hover:text-white"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10 group-hover:scale-110">
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                </span>
                {studioEmail}
              </a>
              <a
                href={studioInstagramUrl}
                className="group flex items-center gap-4 text-[14px] text-white/85 transition-all duration-300 hover:text-white"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10 group-hover:scale-110">
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                </span>
                {studioInstagramHandle}
              </a>
              <a
                href={studioWhatsappUrl}
                className="group flex items-center gap-4 text-[14px] text-white/85 transition-all duration-300 hover:text-white"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10 group-hover:scale-110">
                  <Smartphone className="h-4 w-4" strokeWidth={1.5} />
                </span>
                {studioWhatsappLabel}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-12 lg:col-span-7" direction="up" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] tracking-wider text-white/40 md:flex-row md:px-10">
          <span>© {new Date().getFullYear()} Jhenifer Nogueira · UGC Creator</span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            Desenvolvido com
            <Heart className="h-3 w-3" strokeWidth={3} />
            por
            <a
              href="https://github.com/geovanedevSW"
              target="_blank"
              rel="noopener noreferrer"
            >
              geovanedevSW
            </a>
          </span>        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link as RouterLink, useRouterState } from "@tanstack/react-router";

const links = [
  { label: "Sobre", href: "#sobre", id: "sobre" },
  { label: "Serviços", href: "#servicos", id: "servicos" },
  { label: "Cases", href: "#projeto", id: "projeto" },
  { label: "Processo", href: "#processo", id: "processo" },
  { label: "Depoimentos", href: "#depoimentos", id: "depoimentos" },
  { label: "Contato", href: "#contato", id: "contato" },
] as const;

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const targetId = href.replace("#", "");
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setActive("");
    if (pathname !== "/") return;

    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`site-navbar fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled ? "nav-glass py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between px-6 md:px-10">
        {pathname === "/" ? (
          <a href="#top" className="leading-tight group" onClick={(e) => handleSmoothScroll(e, "#top")}>
            <div className="font-display text-[18px] tracking-[0.3em] text-[var(--ink)] font-medium uppercase transition-all duration-500 group-hover:tracking-[0.35em]">
              Jhenifer Nogueira
            </div>
          </a>
        ) : (
          <RouterLink to="/" className="leading-tight group">
            <div className="font-display text-[18px] tracking-[0.3em] text-[var(--ink)] font-medium uppercase transition-all duration-500 group-hover:tracking-[0.35em]">
              Jhenifer Nogueira
            </div>
          </RouterLink>
        )}
        {pathname === "/" && (
          <nav className="hidden items-center gap-10 xl:flex">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleSmoothScroll(e, l.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-[11px] tracking-[0.25em] uppercase transition-all duration-500 ease-out ${
                    isActive ? "text-[var(--ink)] font-medium" : "text-[var(--ink)]/40 hover:text-[var(--ink)]"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[1px] bg-[var(--ink)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        )}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#contato-form"
          onClick={(e) => handleSmoothScroll(e, "#contato-form")}
          className="btn-primary hidden xl:inline-flex items-center gap-2 px-6 py-3 transition-all duration-500 group relative overflow-hidden"
        >
          <span className="text-[10px] uppercase tracking-[0.15em] relative z-10">Vamos trabalhar juntos</span>
          <ArrowRight className="arrow h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 relative z-10" strokeWidth={2} />
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        </motion.a>
        <a href="#contato-form" onClick={(e) => handleSmoothScroll(e, "#contato-form")} className="btn-primary xl:hidden px-4 py-3 text-[10px] uppercase tracking-widest">
          Contato
          <ArrowRight className="arrow h-3 w-3" strokeWidth={2} />
        </a>
      </div >
    </motion.header>
  );
}

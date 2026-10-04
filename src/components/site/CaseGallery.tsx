import { ArrowDown, ArrowLeft, ArrowUp, Image as ImageIcon, Play } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ReelsViewer, type ReelClip } from "@/components/site/ReelsViewer";
import { cases, type CaseProject } from "@/lib/cases";

const initialClipCount = 8;
const previewClipCount = 4;

function ClipTile({
  clip,
  index,
  onOpen,
  isInitialClip,
  onVisualReady,
  className = "",
}: {
  clip: ReelClip;
  index: number;
  onOpen: () => void;
  isInitialClip: boolean;
  onVisualReady: (src: string) => void;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const visualRef = useRef<HTMLImageElement>(null);
  const [playing, setPlaying] = useState(false);
  const isVideo = clip.kind === "video" || /\.(mp4|webm|mov)(\?|$)/i.test(clip.src);
  const revealIndex = index < initialClipCount ? index : index - initialClipCount;

  useEffect(() => {
    const image = visualRef.current;
    if (image?.complete && image.naturalWidth > 0) onVisualReady(clip.src);
  }, [clip.src, onVisualReady]);

  const onEnter = () => {
    videoRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  };
  const onLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <Reveal direction="up" delay={revealIndex * 0.05}>
      <button
        type="button"
        aria-label={`Abrir ${clip.kind === "video" ? "vídeo" : "foto"} ${index + 1}`}
        onClick={() => {
          onLeave();
          onOpen();
        }}
        onMouseEnter={isVideo ? onEnter : undefined}
        onMouseLeave={isVideo ? onLeave : undefined}
        className={`group relative block aspect-[9/12] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--muted)] text-left transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-[var(--accent)]/40 hover:shadow-2xl hover:shadow-[var(--accent)]/10 ${className}`}
      >
        {isVideo ? (
          <>
            {clip.poster && (
              <img
                ref={visualRef}
                src={clip.poster}
                alt=""
                aria-hidden="true"
                loading={isInitialClip ? "eager" : "lazy"}
                onLoad={() => onVisualReady(clip.src)}
                onError={() => onVisualReady(clip.src)}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  playing ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
            <video
              ref={videoRef}
              src={clip.src}
              poster={clip.poster}
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => onVisualReady(clip.src)}
              onError={() => onVisualReady(clip.src)}
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <img
            ref={visualRef}
            src={clip.src}
            alt={clip.title}
            loading={isInitialClip ? "eager" : "lazy"}
            onLoad={() => onVisualReady(clip.src)}
            onError={() => onVisualReady(clip.src)}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
        {isVideo ? (
          <div
            className={`pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-300 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)] text-white shadow-lg backdrop-blur">
              <Play className="h-4 w-4 translate-x-[1px] fill-current" />
            </span>
          </div>
        ) : (
          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            <ImageIcon className="h-3 w-3" strokeWidth={1.8} />
            Foto
          </span>
        )}
      </button>
    </Reveal>
  );
}

export function CaseGallery({ project }: { project: CaseProject }) {
  const clips = project.clips;
  const [activeClipIndex, setActiveClipIndex] = useState<number | null>(null);
  const [showAllClips, setShowAllClips] = useState(false);
  const [loadedClipSources, setLoadedClipSources] = useState<Set<string>>(() => new Set());
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 0.24,
        ease: [0.23, 1, 0.32, 1]
      };
  const visibleClips = showAllClips ? clips : clips.slice(0, initialClipCount);
  const previewClips = clips.slice(initialClipCount, initialClipCount + previewClipCount);
  const teaserSources = clips.slice(0, initialClipCount);
  const isTeaserReady = teaserSources.every((clip) => loadedClipSources.has(clip.src));

  useEffect(() => {
    setShowAllClips(false);
    setActiveClipIndex(null);
    setLoadedClipSources(new Set());
  }, [project.slug]);

  const markClipVisualReady = useCallback((src: string) => {
    setLoadedClipSources((current) => {
      if (current.has(src)) return current;
      const next = new Set(current);
      next.add(src);
      return next;
    });
  }, []);

  return (
    <main className="bg-noise relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--ink)]">
      <Navbar />

      <section className="pt-32 pb-10 md:pt-36">
        <div className="mx-auto max-w-[1360px] px-6 md:px-10">
          <Link
            to="/"
            hash="projeto"
            className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.18em] uppercase text-[var(--muted-foreground)] transition-colors hover:text-[var(--ink)]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
            Voltar
          </Link>

          <Reveal>
            <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <nav aria-label="Cases" className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {cases.map((item) => {
                    const isCurrent = item.slug === project.slug;
                    return (
                      <Link
                        key={item.slug}
                        to="/case/$slug"
                        params={{ slug: item.slug }}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`relative pb-1 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                          isCurrent
                            ? "text-[var(--ink)]"
                            : "text-[var(--muted-foreground)] hover:text-[var(--ink)]"
                        }`}
                      >
                        {item.brandName}
                        {isCurrent && (
                          <span className="absolute inset-x-0 -bottom-px h-px bg-[var(--accent)]" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
                <div className="eyebrow">Case</div>
                <h1 className="mt-4 font-display text-[42px] leading-[1.02] tracking-[-0.02em] md:text-[64px]">
                  {project.brandName}, <em className="font-normal italic">por dentro.</em>
                </h1>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--muted-foreground)]">
                  {project.detailLead}
                </p>
              </div>
              <div className="md:col-span-5 md:text-right">
                {project.logo ? (
                  <img
                    src={project.logo}
                    alt={project.brandName}
                    className="ml-auto h-20 w-auto object-contain md:h-28"
                  />
                ) : (
                  <span className="inline-block font-display text-[36px] leading-tight tracking-[-0.02em] text-[var(--ink)] md:text-[48px]">
                    {project.brandName}
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-[1360px] px-6 md:px-10">
          {clips.length > 0 ? (
            <motion.div layout transition={{ layout: transition }} className="space-y-4">
              <motion.div
                layout
                transition={{ layout: transition }}
                className="grid grid-cols-2 gap-4 md:grid-cols-4"
              >
                <AnimatePresence initial={false}>
                  {visibleClips.map((clip, i) => (
                    <motion.div
                      key={clip.src}
                      layout
                      exit={{ opacity: 0, transform: "translateY(-8px)" }}
                      transition={transition}
                    >
                      <ClipTile
                        clip={clip}
                        index={i}
                        isInitialClip={i < initialClipCount}
                        onVisualReady={markClipVisualReady}
                        onOpen={() => setActiveClipIndex(i)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <AnimatePresence initial={false}>
                {!showAllClips && previewClips.length > 0 && isTeaserReady && (
                  <motion.div
                    key="clip-preview"
                    layout
                    initial={prefersReducedMotion ? false : { opacity: 0, transform: "translateY(8px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(-8px)" }}
                    transition={transition}
                    className="relative overflow-hidden"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none grid grid-cols-2 gap-4 md:grid-cols-4"
                    >
                      {previewClips.map((clip) => (
                        <div
                          key={clip.src}
                          className="relative aspect-[9/6] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--muted)]"
                        >
                          <img
                            src={clip.kind === "video" ? clip.poster : clip.src}
                            alt=""
                            loading="eager"
                            onLoad={() => markClipVisualReady(clip.src)}
                            onError={() => markClipVisualReady(clip.src)}
                            className="h-full w-full scale-105 object-cover object-top blur-[3px] transition-transform duration-700 group-hover:scale-100"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-[var(--background)]/15 via-[var(--background)]/65 to-[var(--background)] backdrop-blur-[3px]">
                      <button
                        type="button"
                        onClick={() => setShowAllClips(true)}
                        className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide"
                      >
                        Ver mais
                        <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence initial={false}>
                {showAllClips && clips.length > initialClipCount && (
                  <motion.div
                    key="show-less"
                    initial={prefersReducedMotion ? false : { opacity: 0, transform: "translateY(-8px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(-8px)" }}
                    transition={transition}
                    className="flex justify-center pt-6"
                  >
                    <button
                      type="button"
                      onClick={() => setShowAllClips(false)}
                      className="btn-outline inline-flex items-center gap-2 px-6 py-3"
                    >
                      Ver menos
                      <ArrowUp className="size-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <p className="py-12 text-center text-sm text-[var(--muted-foreground)]">
              Novos conteúdos em breve.
            </p>
          )}
        </div>
      </section>

      <ReelsViewer
        clips={clips}
        activeIndex={activeClipIndex}
        onActiveIndexChange={setActiveClipIndex}
        brandName={project.brandName}
        brandLogo={project.logo}
      />

      <Footer />
    </main>
  );
}

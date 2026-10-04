import {
  ArrowUpRight,
  Image as ImageIcon,
  Play,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { getOptimizedUrl, getCloudinaryThumbnail } from "@/lib/cloudinary";
import usePedrosoLogo from "@/assets/usepedroso-logo.webp";
import { usePedrosoClips } from "@/lib/use-pedroso-clips";
import { rafalouClips } from "@/lib/rafalou-clips";
import { ReelsViewer, type ReelClip } from "./ReelsViewer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CaseProject = {
  slug: string;
  logo: string | null;
  brandName: string;
  eyebrow: string;
  description: string;
  clips: ReelClip[];
  featuredClipFiles: string[];
};

const cases: CaseProject[] = [
  {
    slug: "use-pedroso",
    logo: usePedrosoLogo,
    brandName: "Use Pedroso",
    eyebrow: "Acessórios em prata 925",
    description:
      "A Use Pedroso é uma marca de acessórios em prata 925 que combina curadoria contemporânea, estética minimalista e peças pensadas para acompanhar diferentes momentos da rotina.",
    clips: usePedrosoClips,
    featuredClipFiles: [
      "IMG_1993.mp4",
      "IMG_2240.HEIC.webp",
      "IMG_2273.mp4",
      "IMG_2231.HEIC.webp",
    ],
  },
  {
    slug: "rafalou-beauty",
    logo: null,
    brandName: "Rafa Lou Beauty",
    eyebrow: "Maquiadora & Lash Designer",
    description:
      "A Rafa Lou Beauty é uma profissional de beleza especializada em maquiagem e design de cílios, com estética clean e conteúdos que conectam com o público de forma autêntica.",
    clips: rafalouClips,
    featuredClipFiles: [
      "IMG_2407.mp4",
      "IMG_2371.HEIC.webp",
      "IMG_2408.mp4",
      "IMG_2373.mp4",
    ],
  },
];

function ClipCard({
  clip,
  index,
  onOpen,
  brandName,
}: {
  clip: ReelClip;
  index: number;
  onOpen: () => void;
  brandName: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo =
    clip.kind === "video" || /\.(mp4|webm|mov)(\?|$)/i.test(clip.src);

  useEffect(() => {
    const video = videoRef.current;

    if (!isVideo || !video || window.matchMedia("(hover: hover)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [isVideo]);

  const startPreview = () => {
    videoRef.current?.play().catch(() => { });
  };

  const stopPreview = () => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  return (
    <Reveal direction="up" delay={index * 0.08}>
      <button
        type="button"
        aria-label={`Abrir ${isVideo ? "vídeo" : "foto"} ${index + 1} — ${brandName}`}
        onClick={() => {
          stopPreview();
          onOpen();
        }}
        onMouseEnter={isVideo ? startPreview : undefined}
        onMouseLeave={isVideo ? stopPreview : undefined}
        className="group relative block aspect-[0.76] w-full overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--muted)] text-left"
      >
        {isVideo ? (
          <video
            ref={videoRef}
            src={clip.src}
            poster={clip.poster}
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        ) : (
          <img
            src={clip.src}
            alt={`${brandName}, foto ${index + 1}`}
            style={{
              objectPosition: clip.objectPosition ?? "center",
            }}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            loading="lazy"
          />
        )}

        <span className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100">
          {isVideo ? (
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] text-white shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-4 w-4 translate-x-[1px] fill-current" />
            </span>
          ) : (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              <ImageIcon className="h-3 w-3" strokeWidth={1.8} />
              Foto
            </span>
          )}
        </span>
      </button>
    </Reveal>
  );
}

export function FeaturedProject() {
  const [activeClipIndex, setActiveClipIndex] = useState<number | null>(null);
  const [activeCaseSlug, setActiveCaseSlug] = useState<string | null>(null);

  return (
    <section
      id="projeto"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="eyebrow">Projetos em destaque</div>

              <h2 className="mt-4 font-display text-[36px] leading-tight tracking-[-0.02em] md:text-[48px]">
                Cases, contados{" "}
                <em className="font-normal italic">por dentro.</em>
              </h2>
            </div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <div className="relative mt-14 group/carousel">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-5 md:-ml-8">
                {cases.map((project) => {
                  const featuredClips: ReelClip[] =
                    project.featuredClipFiles.flatMap((fileName) =>
                      project.clips.filter((clip) =>
                        clip.src.endsWith(fileName),
                      ),
                    );

                  return (
                    <CarouselItem
                      key={project.slug}
                      className="flex basis-[88%] pl-5 md:basis-[82%] md:pl-8 lg:basis-[80%] xl:basis-[78%] group/case"
                    >
                      <div className="flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-[var(--card)] p-7 md:p-10 xl:p-12">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                          <div className="min-w-0 lg:col-span-5">
                            <div className="flex h-20 items-start md:h-28">
                              {project.logo ? (
                                <img
                                  src={project.logo}
                                  alt={project.brandName}
                                  className="h-full w-auto object-contain object-left"
                                />
                              ) : (
                                <span className="font-display text-[32px] leading-tight tracking-[-0.02em] text-[var(--ink)] md:text-[40px]">
                                  {project.brandName}
                                </span>
                              )}
                            </div>

                            <div className="eyebrow mt-6">
                              {project.eyebrow}
                            </div>
                          </div>

                          <div className="flex min-w-0 flex-col lg:col-span-7">
                            <p className="text-[15px] leading-relaxed text-[var(--muted-foreground)]">
                              {project.description}
                            </p>

                            <Link
                              to="/case/$slug"
                              params={{ slug: project.slug }}
                              className="mt-6 inline-flex w-fit items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--ink)] transition-transform hover:-translate-y-0.5"
                            >
                              Ver conteúdos do case
                              <ArrowUpRight
                                className="h-4 w-4"
                                strokeWidth={1.6}
                              />
                            </Link>
                          </div>
                        </div>

                        {featuredClips.length > 0 && (
                          <div className="mt-10 grid grid-cols-2 items-start gap-4 md:grid-cols-4">
                            {featuredClips.map((clip, index) => (
                              <ClipCard
                                key={clip.src}
                                clip={clip}
                                index={index}
                                brandName={project.brandName}
                                onOpen={() => {
                                  setActiveCaseSlug(project.slug);
                                  setActiveClipIndex(index);
                                }}
                              />
                            ))}
                          </div>
                        )}

                        <div className="mt-auto flex justify-center pt-10">
                          <Link
                            to="/case/$slug"
                            params={{ slug: project.slug }}
                            className="btn-primary"
                          >
                            Ver mais de {project.brandName}
                            <ArrowUpRight
                              className="arrow h-3.5 w-3.5"
                              strokeWidth={2}
                            />
                          </Link>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <div className="mt-8 flex justify-center gap-3 md:absolute md:-top-[116px] md:right-0 md:mt-0">
                <CarouselPrevious className="static size-12 transform-none rounded-full border-[var(--border)] bg-transparent text-[var(--ink)] transition-colors hover:bg-[var(--accent)] hover:text-white" />

                <CarouselNext className="static size-12 transform-none rounded-full border-[var(--border)] bg-transparent text-[var(--ink)] transition-colors hover:bg-[var(--accent)] hover:text-white" />
              </div>
            </Carousel>
          </div>
        </Reveal>
      </div>

      {cases.map((project) => (
        <ReelsViewer
          key={`viewer-${project.slug}`}
          clips={project.featuredClipFiles.flatMap((fileName) =>
            project.clips.filter((clip) => clip.src.endsWith(fileName)),
          )}
          activeIndex={
            activeCaseSlug === project.slug ? activeClipIndex : null
          }
          onActiveIndexChange={(idx) => {
            if (idx === null) {
              setActiveCaseSlug(null);
            }

            setActiveClipIndex(idx);
          }}
          brandName={project.brandName}
          brandLogo={project.logo}
        />
      ))}
    </section>
  );
}

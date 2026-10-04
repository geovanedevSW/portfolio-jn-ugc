import usePedrosoLogo from "@/assets/usepedroso-logo.webp"
import type { ReelClip } from "@/components/site/ReelsViewer"
import { rafalouClips } from "@/lib/rafalou-clips"
import { usePedrosoClips } from "@/lib/use-pedroso-clips"

export type CaseSlug = "use-pedroso" | "rafalou-beauty"

export type CaseProject = {
  slug: CaseSlug
  logo: string | null
  brandName: string
  category: string
  description: string
  detailLead: string
  clips: ReelClip[]
  featuredClipFiles: string[]
  metaTitle: string
  metaDescription: string
  ogDescription: string
}

export const cases: CaseProject[] = [
  {
    slug: "use-pedroso",
    logo: usePedrosoLogo,
    brandName: "Use Pedroso",
    category: "Acessórios em prata 925",
    description:
      "A Use Pedroso é uma marca de acessórios em prata 925 que combina curadoria contemporânea, estética minimalista e peças pensadas para acompanhar diferentes momentos da rotina.",
    detailLead:
      "Conteúdos UGC criados para apresentar as coleções de prata 925 da Use Pedroso, com peças minimalistas, contemporâneas e pensadas para diferentes momentos da rotina.",
    clips: usePedrosoClips,
    featuredClipFiles: ["IMG_1993.mp4", "IMG_2240.HEIC.webp", "IMG_2273.mp4", "IMG_2231.HEIC.webp"],
    metaTitle: "Case Use Pedroso — Jhenifer Nogueira",
    metaDescription: "Bastidores e conteúdos produzidos para a Use Pedroso, marca de acessórios em prata 925.",
    ogDescription: "Conteúdos UGC autênticos criados para a Use Pedroso.",
  },
  {
    slug: "rafalou-beauty",
    logo: null,
    brandName: "Rafa Lou Beauty",
    category: "Maquiadora · Lash & Brow Designer",
    description:
      "A Rafa Lou Beauty trabalha com maquiagem, cílios e sobrancelhas, unindo uma estética clean a resultados que valorizam a beleza de cada cliente.",
    detailLead:
      "Conteúdos UGC criados para a Rafa Lou Beauty, com foco em maquiagem, design de cílios, sobrancelhas e beleza autêntica que conecta com o público.",
    clips: rafalouClips,
    featuredClipFiles: ["IMG_2371.HEIC.webp", "IMG_2408.mp4", "IMG_2407.mp4", "IMG_2373.mp4"],
    metaTitle: "Case Rafa Lou Beauty — Jhenifer Nogueira",
    metaDescription:
      "Bastidores e conteúdos produzidos para a Rafa Lou Beauty — maquiagem, lash design e beleza autêntica.",
    ogDescription: "Conteúdos UGC autênticos criados para a Rafa Lou Beauty.",
  },
]

export const defaultCaseSlug: CaseSlug = "use-pedroso"

export function getCaseBySlug(slug: string | undefined): CaseProject | undefined {
  return cases.find((project) => project.slug === slug)
}

export function getFeaturedClips(project: CaseProject): ReelClip[] {
  return project.featuredClipFiles.flatMap((fileName) =>
    project.clips.filter((clip) => clip.src.endsWith(fileName)),
  )
}

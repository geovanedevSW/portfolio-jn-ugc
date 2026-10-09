import emailjs from "@emailjs/browser"
import { z } from "zod"

export const contentTypes = [
  "Reels / Shorts",
  "Unboxing",
  "Lifestyle",
  "Anúncios (Ads)",
  "Fotos",
  "Outro",
] as const

export type ContentType = (typeof contentTypes)[number]

export const deadlines = [
  "Urgente (até 7 dias)",
  "Em até 15 dias",
  "Em até 30 dias",
  "Flexível",
] as const

export type Deadline = (typeof deadlines)[number]

export type PackageOffer = {
  id: "starter" | "standard" | "professional"
  videoRange: string
  photoCount: number
  price: string
  featured?: boolean
}

export const packageOffers: PackageOffer[] = [
  {
    id: "starter",
    videoRange: "1 a 2",
    photoCount: 2,
    price: "R$ 150,00",
  },
  {
    id: "standard",
    videoRange: "3 a 4",
    photoCount: 4,
    price: "R$ 130,00",
    featured: true,
  },
  {
    id: "professional",
    videoRange: "5 a 6",
    photoCount: 6,
    price: "R$ 100,00",
  },
]

export function packageLabel(pkg: PackageOffer) {
  return `${pkg.videoRange} vídeos + ${pkg.photoCount} fotos — ${pkg.price} por vídeo`
}

export const briefingDraftSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório").max(120),
  marca: z.string().trim().min(1, "Marca é obrigatória").max(120),
  email: z
    .string()
    .trim()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido")
    .max(254),
  tipo: z.enum(contentTypes),
  prazo: z.enum(deadlines),
  mensagem: z.string().max(2000),
  pacote: z.string().min(1, "Selecione um pacote"),
})

export type BriefingDraft = z.input<typeof briefingDraftSchema>
export type ValidatedBriefing = z.output<typeof briefingDraftSchema>
export type BriefingFieldErrors = Partial<Record<keyof BriefingDraft, string>>

export function emptyBriefingDraft(): BriefingDraft {
  return {
    nome: "",
    marca: "",
    email: "",
    tipo: "",
    prazo: "",
    mensagem: "",
    pacote: "",
  }
}

export function validateBriefing(draft: BriefingDraft) {
  const parsed = briefingDraftSchema.safeParse(draft)

  if (parsed.success) {
    return { ok: true as const, briefing: parsed.data }
  }

  const errors: BriefingFieldErrors = {}
  for (const issue of parsed.error.issues) {
    const key = issue.path[0]
    if (typeof key === "string" && errors[key as keyof BriefingDraft] === undefined) {
      errors[key as keyof BriefingDraft] = issue.message
    }
  }

  return { ok: false as const, errors }
}

export type EmailJsConfig = {
  serviceId: string
  templateId: string
  publicKey: string
}

export function readEmailJsConfig(): EmailJsConfig | null {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) return null
  return { serviceId, templateId, publicKey }
}

export type BriefingMailer = {
  send: (briefing: ValidatedBriefing) => Promise<void>
}

export function createEmailJsMailer(config: EmailJsConfig): BriefingMailer {
  return {
    async send(briefing) {
      await emailjs.send(
        config.serviceId,
        config.templateId,
        {
          from_name: briefing.nome,
          from_email: briefing.email,
          marca: briefing.marca,
          tipo_conteudo: briefing.tipo || "(não especificado)",
          pacote: briefing.pacote,
          prazo: briefing.prazo || "(não especificado)",
          mensagem: briefing.mensagem,
        },
        {
          publicKey: config.publicKey,
          limitRate: { id: "contact-briefing", throttle: 60_000 },
        },
      )
    },
  }
}

export type SubmitBriefingResult =
  | { status: "honeypot" }
  | { status: "invalid"; errors: BriefingFieldErrors }
  | { status: "unavailable" }
  | { status: "sent" }
  | { status: "failed" }

export async function submitBriefing(
  draft: BriefingDraft,
  options: {
    honeypot?: string | null
    mailer: BriefingMailer | null
  },
): Promise<SubmitBriefingResult> {
  if (options.honeypot) return { status: "honeypot" }

  const validated = validateBriefing(draft)
  if (!validated.ok) return { status: "invalid", errors: validated.errors }
  if (!options.mailer) return { status: "unavailable" }

  try {
    await options.mailer.send(validated.briefing)
    return { status: "sent" }
  } catch {
    return { status: "failed" }
  }
}

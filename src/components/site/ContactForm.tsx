import { useState, type FormEvent } from "react"
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  User,
  Building2,
  Film,
  Calendar,
  Mail,
  MessageSquare,
  Clock,
  type LucideIcon,
} from "lucide-react"
import { PackagesModal } from "./PackagesModal"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  contentTypes,
  createEmailJsMailer,
  deadlines,
  emptyBriefingDraft,
  readEmailJsConfig,
  submitBriefing,
  type BriefingDraft,
  type BriefingFieldErrors,
} from "@/lib/briefing"
import { studioMailto } from "@/lib/studio"

const emailJsConfig = readEmailJsConfig()
const briefingMailer = emailJsConfig ? createEmailJsMailer(emailJsConfig) : null

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus:border-white/30 focus:bg-white/[0.07] focus:ring-4 focus:ring-white/5"
const selectInputCls =
  "h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-left text-[14px] text-white outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/30 focus:border-white/40 focus:bg-white/20 focus:ring-4 focus:ring-white/10 data-[placeholder]:text-white/40"
const labelCls = "text-[10px] tracking-[0.2em] uppercase font-semibold text-white/50"
const errorCls = "text-[12px] text-red-400 mt-1.5 flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in fade-in slide-in-from-top-1"

function BriefingSelect({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
}: {
  id: string
  label: string
  options: readonly string[]
  value: string
  onChange: (val: string) => void
  placeholder: string
  icon: LucideIcon
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-white/50" strokeWidth={2} />
        <span className={labelCls}>{label}</span>
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className={selectInputCls}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-[100] rounded-xl border-white/10 bg-[var(--purple-900)] p-1.5 text-white shadow-xl">
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="rounded-lg px-3 py-2.5 text-[14px] text-white/75 focus:bg-white/10 focus:text-white"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function clearFieldError(errors: BriefingFieldErrors, field: keyof BriefingFieldErrors) {
  if (!(field in errors)) return errors
  const next = { ...errors }
  delete next[field]
  return next
}

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [isPackagesModalOpen, setIsPackagesModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<BriefingFieldErrors>({})
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState<BriefingDraft>(emptyBriefingDraft)

  const updateField = <K extends keyof BriefingDraft>(field: K, value: BriefingDraft[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setFormErrors((prev) => clearFieldError(prev, field))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError("")

    const formDataRaw = new FormData(e.currentTarget)
    const honeypot = formDataRaw.get("website")

    if (typeof honeypot === "string" && honeypot.length > 0) {
      // Silent failure for bots
      setSent(true)
      return
    }

    const result = await submitBriefing(formData, {
      honeypot: typeof honeypot === "string" ? honeypot : null,
      mailer: briefingMailer,
    })

    if (result.status === "invalid") {
      setFormErrors(result.errors)
      return
    }

    if (result.status === "honeypot" || result.status === "sent") {
      window.location.href = "/obrigado";
      return;
    }

    if (result.status === "unavailable") {
      setSubmitError("O formulário está temporariamente indisponível.")
      return
    }

    setSubmitError("Não foi possível enviar seu briefing. Tente novamente ou fale por e-mail.")
  }

  return (
    <>
      <form
        id="contato-form"
        onSubmit={(event) => {
          setIsLoading(true)
          void onSubmit(event).finally(() => setIsLoading(false))
        }}
        aria-busy={isLoading}
        className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm"
      >
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label>
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="mb-6 border-b border-white/5 pb-6">
          <h2 className="font-display text-[28px] md:text-[32px] font-semibold tracking-tight text-white">
            Solicitar Briefing
          </h2>
          <p className="mt-1 text-sm text-white/50 leading-relaxed">
            Preencha os dados abaixo para iniciarmos seu projeto. Retornaremos em até 24h úteis.
          </p>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-white/50" strokeWidth={2} />
                <span className={labelCls}>Nome *</span>
                {formErrors.nome && <span aria-hidden="true" className="text-red-400">●</span>}
              </div>
              <input
                id="briefing-nome"
                type="text"
                name="nome"
                maxLength={120}
                value={formData.nome}
                onChange={(e) => updateField("nome", e.target.value)}
                required
                aria-invalid={Boolean(formErrors.nome)}
                aria-describedby={formErrors.nome ? "briefing-nome-error" : undefined}
                className={`${inputCls} ${formErrors.nome ? "border-red-400/50 focus:ring-red-400/20" : ""}`}
                placeholder="Ex: Maria Silva"
              />
              {formErrors.nome && (
                <span id="briefing-nome-error" role="alert" className={errorCls}>
                  <AlertCircle className="h-3.5 w-3.5" />
                  {formErrors.nome}
                </span>
              )}
            </label>

            <label className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-white/50" strokeWidth={2} />
                <span className={labelCls}>Marca *</span>
                {formErrors.marca && <span aria-hidden="true" className="text-red-400">●</span>}
              </div>
              <input
                id="briefing-marca"
                type="text"
                name="marca"
                maxLength={120}
                value={formData.marca}
                onChange={(e) => updateField("marca", e.target.value)}
                required
                aria-invalid={Boolean(formErrors.marca)}
                aria-describedby={formErrors.marca ? "briefing-marca-error" : undefined}
                className={`${inputCls} ${formErrors.marca ? "border-red-400/50 focus:ring-red-400/20" : ""}`}
                placeholder="Ex: Maria Studio"
              />
              {formErrors.marca && (
                <span id="briefing-marca-error" role="alert" className={errorCls}>
                  <AlertCircle className="h-3.5 w-3.5" />
                  {formErrors.marca}
                </span>
              )}
            </label>

            <label className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-white/50" strokeWidth={2} />
                <span className={labelCls}>E-mail *</span>
                {formErrors.email && <span aria-hidden="true" className="text-red-400">●</span>}
              </div>
              <input
                id="briefing-email"
                type="email"
                name="email"
                maxLength={254}
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
                aria-invalid={Boolean(formErrors.email)}
                aria-describedby={formErrors.email ? "briefing-email-error" : undefined}
                className={`${inputCls} ${formErrors.email ? "border-red-400/50 focus:ring-red-400/20" : ""}`}
                placeholder="Ex: maria@email.com"
              />
              {formErrors.email && (
                <span id="briefing-email-error" role="alert" className={errorCls}>
                  <AlertCircle className="h-3.5 w-3.5" />
                  {formErrors.email}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-gradient-to-b from-white to-white/30"></div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Escopo do Projeto
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <BriefingSelect
              id="briefing-content"
              label="Conteúdo"
              icon={Film}
              options={contentTypes}
              value={formData.tipo}
              onChange={(val) => updateField("tipo", val)}
              placeholder="Escolha o conteúdo"
            />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Pacote *
                </span>
                {formErrors.pacote && <span aria-hidden="true" className="text-red-400">●</span>}
              </div>
              <button
                type="button"
                onClick={() => setIsPackagesModalOpen(true)}
                aria-required="true"
                aria-invalid={Boolean(formErrors.pacote)}
                aria-describedby={formErrors.pacote ? "briefing-package-error" : undefined}
                className={`${inputCls} inline-flex w-full items-center justify-between hover:border-white/30 transition-all duration-300 ${
                  formData.pacote
                    ? "border-emerald-400/60 bg-emerald-400/[0.08] animate-in fade-in zoom-in duration-500"
                    : formErrors.pacote
                      ? "border-red-400/50"
                      : ""
                }`}
              >
                <span className={`${formData.pacote ? "text-white font-medium text-center" : "text-white/40"}`}>
                  {formData.pacote || "Consultar pacotes →"}
                </span>
                {formData.pacote && (
                  <CheckCircle className="h-4 w-4 text-emerald-400 animate-in zoom-in duration-300" strokeWidth={2} />
                )}
              </button>
              {formErrors.pacote && (
                <span id="briefing-package-error" role="alert" className={errorCls}>
                  <AlertCircle className="h-3.5 w-3.5" />
                  {formErrors.pacote}
                </span>
              )}
            </div>

            <BriefingSelect
              id="briefing-deadline"
              label="Prazo"
              icon={Calendar}
              options={deadlines}
              value={formData.prazo}
              onChange={(val) => updateField("prazo", val)}
              placeholder="Escolha o prazo"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-white/50" strokeWidth={2} />
              <span className={labelCls}>Detalhes do Projeto</span>
            </div>
            <textarea
              name="mensagem"
              rows={3}
              maxLength={2000}
              value={formData.mensagem}
              onChange={(e) => updateField("mensagem", e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder="Descreva brevemente o projeto, objetivos, referências ou qualquer detalhe importante."
            />
            <p className="text-[10px] text-white/30">
              Quanto mais detalhes, melhor nossa proposta estratégica.
            </p>
          </label>
        </div>

        {submitError && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-2 rounded-xl border border-red-400/25 bg-red-400/[0.06] p-4 text-sm text-red-200"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              {submitError}{" "}
              <a href={studioMailto} className="font-medium underline underline-offset-2 hover:text-white">
                Falar por e-mail
              </a>
            </p>
          </div>
        )}

        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/10">
              <Clock className="h-5 w-5 text-emerald-400" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Resposta Rápida</p>
              <p className="text-xs text-white/50">Retorno em até 24h úteis</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || sent}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--primary)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:bg-[var(--purple-700)] hover:shadow-[0_10px_20px_-10px_rgba(139,76,199,0.45)] disabled:scale-100 disabled:opacity-75 md:w-auto group"
          >
            {isLoading ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--ink)] border-t-transparent"></div>
                Enviando...
              </>
            ) : sent ? (
              <>
                Briefing enviado
                <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
              </>
            ) : (
              <>
                Solicitar Briefing
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>

        {sent && (
          <div role="status" aria-live="polite" className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-400" strokeWidth={2} />
              <div>
                <p className="font-medium text-emerald-300">Briefing enviado com sucesso!</p>
                <p className="mt-1 text-sm text-emerald-200/80">
                  Recebi seu briefing e retornarei em até 24 horas úteis. Se preferir, fale diretamente por e-mail:{" "}
                  <a href={studioMailto} className="font-medium underline hover:text-emerald-100">
                    {studioMailto.replace("mailto:", "")}
                  </a>
                  . Retornaremos com sua proposta em até 24 horas!
                </p>
              </div>
            </div>
          </div>
        )}
      </form>

      <PackagesModal
        isOpen={isPackagesModalOpen}
        onClose={() => setIsPackagesModalOpen(false)}
        onSelectPackage={(packageName) => updateField("pacote", packageName)}
      />
    </>
  )
}

import { useState } from "react"
import { ArrowRight, Check, QrCode, CreditCard, Wallet } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { packageLabel, packageOffers, type PackageOffer } from "@/lib/briefing"

interface PackagesModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectPackage: (packageName: string) => void
}

export function PackagesModal({ isOpen, onClose, onSelectPackage }: PackagesModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelectPackage = (pkg: PackageOffer) => {
    setSelectedId(pkg.id)
    onSelectPackage(packageLabel(pkg))
    setTimeout(onClose, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[var(--purple-900)]/95 p-0 shadow-2xl backdrop-blur-xl sm:rounded-3xl">
        <div className="max-h-[90vh] space-y-8 overflow-y-auto overscroll-contain p-6 md:space-y-10 md:p-10">
          <div className="text-center max-w-2xl mx-auto">
            <DialogTitle className="font-display text-3xl font-semibold tracking-tight text-white md:text-[42px]">
              Pacotes
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-white/50">
              Cada vídeo é feito com total cuidado e dedicação. Escolha o pacote que melhor se
              adequa ao seu projeto.
            </DialogDescription>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {packageOffers.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                aria-pressed={selectedId === pkg.id}
                onClick={() => handleSelectPackage(pkg)}
                className={`group relative flex flex-col rounded-3xl p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  selectedId === pkg.id
                    ? "border-2 border-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_20px_rgba(139,76,199,0.15)]"
                    : pkg.featured
                      ? "border-2 border-[var(--accent)]/40 bg-white/[0.02] shadow-sm"
                      : "border-2 border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03] hover:shadow-lg"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Mais Popular
                  </span>
                )}

                {selectedId === pkg.id && (
                  <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-lg">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                )}

                <div className="mb-3 min-h-10 px-2 text-center">
                  <h3 className="font-display text-lg font-semibold leading-tight text-white">
                    {pkg.videoRange} vídeos
                  </h3>
                  <p className="mt-1 text-sm text-white/40">
                    {pkg.photoCount} fotos inclusas
                  </p>
                </div>

                <div className="mt-auto flex flex-col items-center text-center">
                  <span className="text-[11px] uppercase tracking-wider text-white/30">
                    Por vídeo
                  </span>
                  <span className="mt-1 font-display text-xl font-bold text-white">
                    {pkg.price}
                  </span>
                </div>

                <div
                  className={`mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-medium transition-colors duration-300 ${
                    selectedId === pkg.id
                      ? "text-white"
                      : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  {selectedId === pkg.id ? "Selecionado" : "Selecionar pacote"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 text-center">
              Formas de pagamento aceitas
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 transition-all duration-300 hover:bg-white/10">
                <QrCode className="h-4 w-4 text-white/60" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-white/80">Pix</span>
              </div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 transition-all duration-300 hover:bg-white/10">
                <Wallet className="h-4 w-4 text-white/60" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-white/80">Débito</span>
              </div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 transition-all duration-300 hover:bg-white/10">
                <CreditCard className="h-4 w-4 text-white/60" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-white/80">Crédito</span>
              </div>
            </div>
            <p className="text-center text-[10px] text-white/30 italic mt-2">
              Os valores podem variar conforme o formato e o uso do conteúdo, como anúncios com
              tráfego pago, publicações, collabs com meu perfil e inclusão de Stories.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur-sm">
            <p className="text-[13px] text-white/50 leading-relaxed max-w-2xl mx-auto">
              Selecione um pacote para que ele apareça no seu briefing. Você poderá discutir ajustes
              e customizações conforme necessário após o envio.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

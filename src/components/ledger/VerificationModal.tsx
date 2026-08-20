import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, MinusCircle, XCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { DetailedPrediction } from "@/lib/mock-data"

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
  prediction: DetailedPrediction | null
  onConfirm: (outcome: "yes" | "partial" | "no", note?: string, evidenceName?: string) => void
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function VerificationModal({ isOpen, onClose, prediction, onConfirm }: VerificationModalProps) {
  const [selected, setSelected] = useState<"yes" | "partial" | "no" | null>(null)
  const [note, setNote] = useState("")
  const [evidenceName, setEvidenceName] = useState("")

  if (!isOpen || !prediction) return null

  const handleConfirm = () => {
    if (!selected) return
    onConfirm(selected, note || undefined, evidenceName || undefined)
    setSelected(null)
    setNote("")
    setEvidenceName("")
  }

  const options = [
    {
      id: "yes" as const,
      label: "Yes, it happened",
      hint: "We will issue a proof card you can keep or share.",
      icon: CheckCircle2,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      id: "partial" as const,
      label: "It only partly happened",
      hint: "The receipt closes with a mixed ending.",
      icon: MinusCircle,
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    {
      id: "no" as const,
      label: "No, it did not happen",
      hint: "We still keep the record. Honesty is the product.",
      icon: XCircle,
      color: "text-zinc-300 border-zinc-700 bg-zinc-900",
    },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="relative w-full max-w-md bg-[#090A0F] border border-white/10 p-6 space-y-5 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-1">Give this an ending</p>
              <h3 className="text-xl text-white font-display leading-snug">
                {/[.!?]$/.test(prediction.title.trim()) ? prediction.title.trim() : `${prediction.title.trim()}.`}
              </h3>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                {prediction.astrologer.name} said this and was {prediction.confidence}% sure. The date to check was{" "}
                {formatDay(prediction.targetDate)}.
              </p>
            </div>
            <button type="button" onClick={onClose} className="p-1.5 text-zinc-500 hover:text-white shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed">
            Your answer becomes a dated proof card. If it landed, you can share it. If it did not, it stays honest.
          </p>

          <div className="space-y-2">
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected(opt.id)}
                className={`w-full flex items-start gap-3 p-3.5 border text-left transition-colors duration-200 ${
                  selected === opt.id ? opt.color + " ring-1 ring-white/10" : "border-zinc-800 hover:border-zinc-600 bg-zinc-950"
                }`}
              >
                <opt.icon className={`w-5 h-5 shrink-0 mt-0.5 ${selected === opt.id ? "" : "text-zinc-500"}`} />
                <span>
                  <span className="block text-sm font-medium text-white">{opt.label}</span>
                  <span className="block text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{opt.hint}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-[11px] text-zinc-500">What actually happened? This line is printed on the card.</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Offer letter arrived on 14 August."
              className="w-full h-9 bg-zinc-950 border border-zinc-800 px-3 text-xs text-white focus-visible:outline-none focus-visible:border-zinc-500"
            />
            <label className="flex items-center gap-2 text-[11px] text-zinc-500 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>{evidenceName || "Attach a photo or letter if you have one."}</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setEvidenceName(e.target.files?.[0]?.name || "")}
              />
            </label>
          </div>

          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Not now
            </Button>
            <Button className="flex-1" disabled={!selected} onClick={handleConfirm}>
              Save this ending
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

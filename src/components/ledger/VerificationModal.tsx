import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, MinusCircle, XCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { DetailedPrediction } from "@/lib/mock-data"

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
  prediction: DetailedPrediction | null
  onConfirm: (outcome: "yes" | "partial" | "no", note?: string) => void
}

export function VerificationModal({ isOpen, onClose, prediction, onConfirm }: VerificationModalProps) {
  const [selected, setSelected] = useState<"yes" | "partial" | "no" | null>(null)
  const [note, setNote] = useState("")

  if (!isOpen || !prediction) return null

  const handleConfirm = () => {
    if (!selected) return
    onConfirm(selected, note || undefined)
    setSelected(null)
    setNote("")
    onClose()
  }

  const options = [
    { id: "yes" as const, label: "Yes, it happened", icon: CheckCircle2, color: "text-success border-success/30 bg-success/10" },
    { id: "partial" as const, label: "Partially", icon: MinusCircle, color: "text-warning border-warning/30 bg-warning/10" },
    { id: "no" as const, label: "No, it didn't", icon: XCircle, color: "text-ink-secondary border-line bg-surface-2" },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-md bg-[#090A0F] border border-white/10 rounded-2xl p-6 space-y-5 shadow-2xl font-sans"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand mb-1">Verify Outcome</p>
              <h3 className="font-display text-xl text-ink font-bold">{prediction.title}</h3>
              <p className="text-xs text-ink-secondary mt-1 font-mono">
                Predicted by {prediction.astrologer.name} · {prediction.confidence}% confidence
              </p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-surface-2 text-ink-tertiary">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-ink-secondary">
            Did this prediction come true? Your answer updates {prediction.astrologer.name}'s verified accuracy score.
          </p>

          <div className="space-y-2">
            {options.map(opt => (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-md border transition-all text-left ${
                  selected === opt.id ? opt.color + " ring-1 ring-brand/20" : "border-line hover:border-line-strong bg-surface-2/40"
                }`}
              >
                <opt.icon className={`w-5 h-5 shrink-0 ${selected === opt.id ? "" : "text-ink-tertiary"}`} />
                <span className="text-sm font-medium text-ink">{opt.label}</span>
              </button>
            ))}
          </div>

          {selected === "yes" && (
            <div className="p-4 rounded-md border border-dashed border-brand/30 bg-brand-tint space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-brand">
                <Upload className="w-3.5 h-3.5" />
                Attach evidence (optional)
              </div>
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="e.g. Offer letter received Oct 14"
                className="w-full h-9 rounded-md bg-surface border border-line px-3 text-xs text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
              />
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1 rounded-md" onClick={onClose}>Cancel</Button>
            <Button className="flex-1 rounded-md font-mono" disabled={!selected} onClick={handleConfirm}>
              Confirm & Update Ledger
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

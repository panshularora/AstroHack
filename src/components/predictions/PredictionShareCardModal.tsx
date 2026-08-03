import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Share2, Check, Download, Copy, Sparkles, ShieldCheck, QrCode } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

interface PredictionShareCardModalProps {
  isOpen: boolean
  onClose: () => void
  prediction?: {
    id: string
    title: string
    category: string
    targetDate: string
    confidence: number
    astrologerName: string
    verifiedDate?: string
  }
}

export function PredictionShareCardModal({ isOpen, onClose, prediction }: PredictionShareCardModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const data = prediction || {
    id: "p1",
    title: "Executive Tech Offer (88% Confidence)",
    category: "CAREER",
    targetDate: "2026-08-22",
    confidence: 88,
    astrologerName: "Acharya Ananya Sharma",
    verifiedDate: "2026-08-20"
  }

  const shareUrl = `https://astrolive.ai/proof/${data.id}?ref=arjun_viral`

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-surface border border-line rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line/60 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-gold/10 border border-gold/30 flex items-center justify-center text-gold-bright">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink">Viral Prediction Share Card</h3>
                <p className="text-caption font-mono text-ink-tertiary">Organic User Acquisition & Verification Proof</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-surface-2 text-ink-tertiary hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Preview (The shareable asset) */}
          <div className="cosmic-hero p-6 rounded-lg border border-brand/40 shadow-xl space-y-5 text-center relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-brand font-bold">
                <Sparkles className="w-3.5 h-3.5" /> ASTROLIVE VERIFIED PROOF
              </div>
              <Badge variant="gold" size="sm" className="font-mono">Immutable Outcome</Badge>
            </div>

            <div className="space-y-2 py-2">
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-ink-tertiary">Verified Astrological Milestone</p>
              <h4 className="font-display text-2xl text-ink font-bold tracking-tight text-balance">
                "{data.title}"
              </h4>
              <p className="text-xs text-brand font-mono">
                Predicted by <span className="font-bold text-ink">{data.astrologerName}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-md bg-surface/80 border border-line/60 font-mono text-xs text-left">
              <div>
                <span className="text-[9px] text-ink-tertiary uppercase block">Target Window</span>
                <span className="font-bold text-ink">{data.targetDate}</span>
              </div>
              <div>
                <span className="text-[9px] text-ink-tertiary uppercase block">Confidence Rating</span>
                <span className="font-bold text-gold-bright">{data.confidence}% Verified</span>
              </div>
            </div>

            {/* Bottom Proof Tag */}
            <div className="flex items-center justify-between pt-2 border-t border-line/40 text-[10px] font-mono text-ink-tertiary">
              <div className="flex items-center gap-1.5 text-success font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Outcome Confirmed
              </div>
              <div className="flex items-center gap-1 text-ink-secondary">
                <QrCode className="w-3.5 h-3.5 text-brand" /> Scan to Verify
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 h-9 rounded-md bg-surface-2 border border-line px-3 text-xs font-mono text-ink-secondary"
              />
              <Button size="sm" variant="outline" className="rounded-md font-mono shrink-0" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Link"}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono">
              <Button size="sm" className="rounded-md w-full gap-2" onClick={handleCopy}>
                <Share2 className="w-3.5 h-3.5" /> Share to WhatsApp / X
              </Button>
              <Button size="sm" variant="outline" className="rounded-md w-full gap-2" onClick={onClose}>
                <Download className="w-3.5 h-3.5" /> Save Image Card
              </Button>
            </div>
          </div>

          <p className="text-[11px] font-mono text-center text-ink-tertiary">
            Every share card brings new users organically through real verified proof instead of fear-based ads.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

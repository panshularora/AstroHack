import { Calendar, ShieldCheck, AlertCircle, Clock, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import type { DetailedPrediction } from "@/lib/mock-data"

interface PredictionReceiptCardProps {
  prediction: DetailedPrediction
  onVerify?: () => void
  onShare?: () => void
  highlight?: boolean
}

function statusConfig(status: DetailedPrediction["status"], targetDate: string) {
  const isPast = new Date(targetDate) <= new Date()
  if (status === "completed") {
    return { label: "Verified", variant: "success" as const, border: "border-success/30", accent: "border-l-success" }
  }
  if (status === "failed") {
    return { label: "Not Verified", variant: "default" as const, border: "border-line", accent: "border-l-ink-tertiary" }
  }
  if (status === "in_progress") {
    return { label: "Window Active", variant: "brand" as const, border: "border-brand/30", accent: "border-l-brand" }
  }
  if (isPast) {
    return { label: "Confirm Outcome", variant: "gold" as const, border: "border-warning/40", accent: "border-l-warning" }
  }
  return { label: "Awaiting Window", variant: "default" as const, border: "border-line", accent: "border-l-brand/40" }
}

export function PredictionReceiptCard({ prediction, onVerify, onShare, highlight }: PredictionReceiptCardProps) {
  const cfg = statusConfig(prediction.status, prediction.targetDate)
  const needsAction = cfg.label === "Confirm Outcome"

  return (
    <div
      className={`p-5 rounded-lg bg-surface border ${cfg.border} border-l-[3px] ${cfg.accent} transition-all duration-150 ${
        highlight ? "ring-1 ring-warning/30 shadow-md" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-tertiary mb-1">
            Receipt · {prediction.category}
          </p>
          <h3 className="text-body font-bold text-ink leading-snug">{prediction.title}</h3>
          <p className="text-caption mt-1 font-mono">
            {prediction.astrologer.name} · {prediction.confidence}% confidence
          </p>
        </div>
        <Badge variant={cfg.variant} size="sm">{cfg.label}</Badge>
      </div>

      {prediction.notes && prediction.status === "completed" && (
        <div className="p-3 rounded-md bg-success/10 border border-success/20 text-xs text-ink-secondary flex items-start gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-success shrink-0 mt-0.5" />
          <span>{prediction.notes}</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-line/60">
        <div className="flex items-center gap-1.5 text-xs font-mono text-ink-tertiary">
          {needsAction ? (
            <AlertCircle className="w-3.5 h-3.5 text-warning" />
          ) : prediction.status === "in_progress" ? (
            <Clock className="w-3.5 h-3.5 text-brand" />
          ) : (
            <Calendar className="w-3.5 h-3.5" />
          )}
          <span>
            Window closes{" "}
            {new Date(prediction.targetDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {prediction.status === "completed" && onShare && (
            <button
              onClick={onShare}
              className="flex items-center gap-1 text-[11px] text-brand hover:text-brand-hover font-mono font-bold transition-colors"
            >
              <Share2 className="w-3 h-3" /> Share
            </button>
          )}
          {needsAction && onVerify && (
            <Button size="sm" className="rounded-md font-mono text-xs h-8" onClick={onVerify}>
              Verify Outcome
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

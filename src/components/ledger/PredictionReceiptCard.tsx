import { Button } from "@/components/ui/Button"
import type { DetailedPrediction } from "@/lib/mock-data"

interface PredictionReceiptCardProps {
  prediction: DetailedPrediction
  onVerify?: () => void
  onShare?: () => void
  onSecond?: () => void
}

const CATEGORY: Record<DetailedPrediction["category"], string> = {
  career: "Career",
  relationship: "Relationship",
  finance: "Money",
  health: "Health",
  education: "Studies",
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function isPast(iso: string) {
  return new Date(iso) <= new Date()
}

function status(p: DetailedPrediction): { key: "needs" | "waiting" | "yes" | "partial" | "no"; label: string } {
  if (p.status === "failed" || p.outcome === "no") return { key: "no", label: "Did not happen" }
  if (p.outcome === "partial") return { key: "partial", label: "Partly true" }
  if (p.status === "completed" || p.outcome === "yes") return { key: "yes", label: "Came true" }
  if (isPast(p.targetDate)) return { key: "needs", label: "Needs your answer" }
  return { key: "waiting", label: `Waiting until ${formatDay(p.targetDate)}` }
}

export function PredictionReceiptCard({ prediction, onVerify, onShare, onSecond }: PredictionReceiptCardProps) {
  const s = status(prediction)
  const title = prediction.title.trim() || "An unnamed prediction"

  return (
    <article className="py-6 border-b border-white/10 last:border-b-0">
      <p
        className={
          s.key === "needs"
            ? "text-[11px] uppercase tracking-[0.16em] text-emerald-400"
            : s.key === "yes"
              ? "text-[11px] uppercase tracking-[0.16em] text-zinc-300"
              : "text-[11px] uppercase tracking-[0.16em] text-zinc-500"
        }
      >
        {s.label}
      </p>
      <h3 className="mt-2 font-display text-2xl text-zinc-50 leading-snug">{title}</h3>
      <p className="mt-2 text-sm text-zinc-500">
        {CATEGORY[prediction.category] || prediction.category} · {prediction.astrologer.name} · check by{" "}
        {formatDay(prediction.targetDate)}
      </p>
      {prediction.notes && <p className="mt-2 text-sm text-zinc-400 max-w-lg">{prediction.notes}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {s.key === "needs" && onVerify && (
          <Button size="sm" onClick={onVerify}>
            Did this happen?
          </Button>
        )}
        {s.key === "waiting" && onVerify && (
          <Button size="sm" variant="ghost" onClick={onVerify}>
            It already happened
          </Button>
        )}
        {(s.key === "yes" || s.key === "partial" || s.key === "no") && onShare && (
          <Button size="sm" variant="outline" onClick={onShare}>
            Open proof
          </Button>
        )}
        {(s.key === "needs" || s.key === "waiting") && onSecond && (
          <Button size="sm" variant="ghost" onClick={onSecond}>
            Ask a second expert
          </Button>
        )}
      </div>
    </article>
  )
}

import { motion } from "framer-motion"
import { ShieldCheck, MessageCircle, Phone, Video, Calendar, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import type { Astrologer } from "@/lib/mock-data"

interface StepResultsProps {
  results: Astrologer[]
  onReset: () => void
}

export function StepResults({ results, onReset }: StepResultsProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      key="step-results"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2 className="font-display text-h1 text-ink tracking-tight">Your Verified Matches</h2>
        <p className="text-sm text-ink-secondary mt-1">
          Matched to your birth chart transits, Dasha cycle, and consultation focus.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {results.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`p-6 rounded-lg border bg-surface transition-all duration-150 hover:border-brand/40 hover:shadow-md ${
              i === 0 ? "border-brand/50 bg-surface-2/50" : "border-line"
            }`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-brand/20 to-brand-hover/10 border border-brand/30 flex items-center justify-center font-mono font-bold text-base text-gold-bright shrink-0">
                  {a.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-bold text-ink">{a.name}</h3>
                    {i === 0 && (
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 bg-brand-light text-brand border border-brand/20 rounded-[2px]">
                        #1 Match
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-ink-tertiary">
                    {a.specialties.join(" · ")} · {a.yearsExperience}y exp
                  </p>
                </div>
              </div>

              {/* Price + availability */}
              <div className="text-right shrink-0">
                <p className="font-metric text-lg font-bold text-ink">₹{a.pricePerMinute}<span className="text-xs font-sans text-ink-tertiary font-normal">/min</span></p>
                <div className="flex items-center gap-1.5 justify-end mt-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${a.availability === "online" ? "bg-success" : "bg-warning"}`} />
                  <span className="font-mono text-[10px] text-ink-tertiary capitalize">{a.availability}</span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 mb-4 font-mono text-xs">
              <span className="flex items-center gap-1.5 text-gold-bright">
                <Star className="w-3.5 h-3.5 fill-gold-bright" />
                <span className="font-bold">{a.rating}</span>
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>{a.verifiedAccuracy}% accuracy</span>
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <Users className="w-3.5 h-3.5" />
                <span>{a.consultationCount}+ sessions</span>
              </span>
              <span className="text-ink-tertiary">
                {a.languages.join(", ")}
              </span>
            </div>

            {/* Why this match */}
            {a.recommendationReason && (
              <div className="p-4 mb-5 bg-brand-tint border border-brand/15 rounded-md">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand mb-1.5 font-bold">
                  Why this match
                </p>
                <p className="text-xs text-ink-secondary leading-relaxed">{a.recommendationReason}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2.5">
              <Button
                size="sm"
                className="rounded-md font-mono"
                onClick={() => navigate(`/app/room/${a.id}`)}
              >
                <MessageCircle className="w-3.5 h-3.5" /> Chat Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md font-mono"
                onClick={() => navigate(`/app/room/${a.id}`)}
              >
                <Phone className="w-3.5 h-3.5" /> Voice
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md font-mono"
                onClick={() => navigate(`/app/room/${a.id}`)}
              >
                <Video className="w-3.5 h-3.5" /> Video
              </Button>
              <Button variant="ghost" size="sm" className="rounded-md font-mono text-ink-secondary">
                <Calendar className="w-3.5 h-3.5" /> Schedule
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="font-mono text-xs text-ink-tertiary hover:text-ink underline underline-offset-2 transition-colors"
      >
        ← Start over
      </button>
    </motion.div>
  )
}

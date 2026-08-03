import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { MessageCircle, ShieldCheck, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockAstrologers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const focusAreas = [
  { id: "career", label: "Career & Promotions" },
  { id: "relationships", label: "Marriage & Synastry" },
  { id: "finance", label: "Wealth & Investment" },
  { id: "health", label: "Health & Vitality" },
]

export function Consult() {
  const navigate = useNavigate()
  const [focus, setFocus] = useState("career")

  const sorted = [...mockAstrologers].sort((a, b) => b.verifiedAccuracy - a.verifiedAccuracy)

  return (
    <div className="page-container max-w-3xl pb-28">
      <div className="space-y-8">
        <div className="border-b border-line/60 pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand mb-2">Consult</p>
          <h1 className="font-display text-h1 text-ink tracking-tight">Book a Verified Session</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Every session produces dated Prediction Receipts — automatically extracted and added to your ledger.
          </p>
        </div>

        {/* Focus selector */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-tertiary mb-3">
            What do you need guidance on?
          </p>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map(f => (
              <button
                key={f.id}
                onClick={() => setFocus(f.id)}
                className={cn(
                  "px-3 py-1.5 rounded-md font-mono text-xs border transition-all",
                  focus === f.id
                    ? "border-brand bg-brand-light text-brand font-bold"
                    : "border-line text-ink-secondary hover:border-line-strong"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Astrologers ranked by verified accuracy */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-tertiary mb-4">
            Best verified record for {focusAreas.find(f => f.id === focus)?.label.toLowerCase()}
          </p>

          <div className="space-y-3">
            {sorted.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={cn(
                  "p-5 rounded-lg border bg-surface transition-all",
                  i === 0 ? "border-brand/40 bg-surface-2/50" : "border-line hover:border-brand/30"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand/25 to-surface-3 border border-brand/30 flex items-center justify-center font-mono font-bold text-sm text-gold-bright shrink-0">
                      {a.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-ink">{a.name}</p>
                        {i === 0 && (
                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 bg-brand-light text-brand border border-brand/20 rounded-[2px]">
                            Top Match
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-ink-tertiary mt-0.5 truncate">
                        {a.specialties.slice(0, 2).join(" · ")}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                        <span className="text-success font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {a.verifiedAccuracy}% verified
                        </span>
                        <span className="text-ink-tertiary">of {a.consultationCount} tracked</span>
                        <span className="text-gold-bright flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-gold-bright" /> {a.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-2">
                    <p className="font-metric text-lg font-bold text-ink">
                      ₹{a.pricePerMinute}<span className="text-xs font-sans text-ink-tertiary font-normal">/min</span>
                    </p>
                    <Badge variant={a.availability === "online" ? "success" : "default"} size="sm">
                      {a.availability}
                    </Badge>
                  </div>
                </div>

                {a.recommendationReason && i === 0 && (
                  <p className="text-xs text-ink-secondary mt-3 p-3 rounded-md bg-brand-tint border border-brand/15">
                    {a.recommendationReason}
                  </p>
                )}

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="rounded-md font-mono flex-1"
                    onClick={() => navigate(`/app/room/${a.id}`)}
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Start Live Session
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-md font-mono"
                    onClick={() => navigate(`/app/astrologer/${a.id}`)}
                  >
                    Portfolio <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

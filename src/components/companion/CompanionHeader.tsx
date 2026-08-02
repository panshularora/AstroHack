import { Sparkles } from "lucide-react"
import { mockDailyCheckIn } from "@/lib/mock-data"

export function CompanionHeader() {
  return (
    <div className="flex items-center justify-between gap-6 mb-8 pb-6 border-b border-line/60">
      <div className="flex items-center gap-3.5">
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-brand" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-canvas" />
        </div>
        <div>
          <h1 className="font-display text-h1 text-ink tracking-tight">{mockDailyCheckIn.greeting}</h1>
          <p className="font-mono text-[10px] text-brand uppercase tracking-[0.14em] mt-0.5">
            Memory Active · Leo Sun · Rahu Dasha
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 bg-surface-2 border border-line rounded-lg px-5 py-3 shrink-0 font-mono">
        <div>
          <p className="text-[9px] text-ink-tertiary uppercase tracking-[0.12em] mb-0.5">Cosmic Streak</p>
          <p className="text-sm font-bold text-ink">{mockDailyCheckIn.streak} Days</p>
        </div>
        <div className="w-px h-8 bg-line" />
        <div>
          <p className="text-[9px] text-ink-tertiary uppercase tracking-[0.12em] mb-0.5">Remedy Due</p>
          <p className="text-sm font-bold text-gold-bright">{mockDailyCheckIn.pendingRemedies} Active</p>
        </div>
      </div>
    </div>
  )
}

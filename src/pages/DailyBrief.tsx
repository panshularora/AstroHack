import { motion } from "framer-motion"
import { Star, Zap, Target, Calendar, TrendingUp, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { mockDailyBriefData, mockSmartPriorities, mockHabitProgress } from "@/lib/mock-data"

export function DailyBrief() {
  const d = mockDailyBriefData

  return (
    <div className="page-container max-w-5xl pb-28">
      <div className="space-y-10">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="border-b border-line/60 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
              <Star className="w-4 h-4 text-brand" />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <h1 className="text-h1 font-display text-ink tracking-tight">{d.greeting}</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Live Panchang & transit synthesis personalized to your Leo Sun & Scorpio Ascendant birth chart.
          </p>
        </div>

        {/* ── Energy Score + Summary ─────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-surface border border-line flex flex-col items-center justify-center text-center font-mono">
            <p className="text-xs text-ink-tertiary uppercase font-bold tracking-wider mb-4">Panchang Energy Alignment</p>
            <div className="w-24 h-24 rounded-full border-2 border-brand/40 flex flex-col items-center justify-center bg-surface-2/60 shadow-lg">
              <span className="text-3xl font-bold text-ink tabular-nums">{d.energyScore}</span>
              <span className="text-[10px] text-gold-light uppercase">Optimal</span>
            </div>
          </div>
          <div className="lg:col-span-2 p-6 rounded-lg bg-surface border border-line space-y-4">
            <div className="flex items-center gap-3 border-b border-line/60 pb-3">
              <Star className="w-4 h-4 text-gold-bright" />
              <h3 className="text-body font-bold text-ink">Today's Transit Summary</h3>
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed font-sans">{d.summary}</p>
          </div>
        </div>

        {/* ── Smart Priorities ───────────────────────────────────── */}
        <div className="space-y-4">
          <div>
            <h2 className="text-h2 font-display text-ink">Action Priorities</h2>
            <p className="text-caption mt-0.5">High-impact tasks aligned with active planetary hours</p>
          </div>
          <div className="space-y-3 font-mono">
            {mockSmartPriorities.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="p-4 rounded-lg bg-surface border border-line flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand shrink-0">
                      {p.type === "remedy" && <Zap className="w-4 h-4 text-brand" />}
                      {p.type === "prediction" && <Target className="w-4 h-4 text-brand" />}
                      {p.type === "journal" && <BookOpen className="w-4 h-4 text-brand" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink">{p.title}</p>
                      <p className="text-[11px] text-ink-tertiary font-sans mt-0.5">{p.reason}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-md shrink-0 font-mono text-xs">{p.actionText}</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Opportunities + Cautions ───────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
            <div className="flex items-center gap-2.5 border-b border-line/60 pb-3">
              <TrendingUp className="w-4 h-4 text-success" />
              <h3 className="text-body font-bold text-ink">Celestial Opportunities</h3>
            </div>
            <ul className="space-y-3 font-sans text-xs">
              {d.opportunities.map((o, i) => (
                <li key={i} className="text-ink-secondary flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
            <div className="flex items-center gap-2.5 border-b border-line/60 pb-3">
              <Calendar className="w-4 h-4 text-warning" />
              <h3 className="text-body font-bold text-ink">Transit Cautions</h3>
            </div>
            <ul className="space-y-3 font-sans text-xs">
              {d.cautions.map((c, i) => (
                <li key={i} className="text-ink-secondary flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Habit Progress ─────────────────────────────────────── */}
        <div className="p-6 rounded-lg bg-surface border border-line space-y-5">
          <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Spiritual Habit Progress</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
            {[
              { label: "Remedy Streak", value: mockHabitProgress.remedyStreak, suffix: "days" },
              { label: "Journal Streak", value: mockHabitProgress.journalStreak, suffix: "days" },
              { label: "AI Check-ins", value: mockHabitProgress.aiCheckIns, suffix: "total" },
              { label: "Predictions Tracked", value: mockHabitProgress.predictionsTracked, suffix: "total" },
            ].map(h => (
              <div key={h.label} className="p-4 rounded-md bg-surface-2/60 border border-line/60 space-y-1">
                <p className="text-2xl font-bold text-ink tabular-nums">{h.value}</p>
                <p className="text-[10px] text-ink-tertiary uppercase font-bold">{h.label} ({h.suffix})</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
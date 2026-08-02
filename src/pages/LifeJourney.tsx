import { motion } from "framer-motion"
import { Compass, BookOpen, Target, CheckCircle2, FileText, Sparkles, Zap } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { mockJourneyMilestones } from "@/lib/mock-data"

const eventIcons: Record<string, typeof BookOpen> = {
  "Consultation": BookOpen,
  "Prediction": Target,
  "Verified Outcome": CheckCircle2,
  "Remedy": Zap,
  "Journal Entry": FileText,
  "AI Reflection": Sparkles,
}

export function LifeJourney() {
  return (
    <div className="page-container max-w-4xl pb-28">
      <div className="space-y-10">
        {/* Header */}
        <div className="border-b border-line/60 pb-6 flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
                <Compass className="w-4 h-4 text-brand" />
              </div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">Life Journey Map</p>
            </div>
            <h1 className="text-h1 font-display text-ink tracking-tight">Cosmic Milestones & Chapters</h1>
            <p className="text-sm text-ink-secondary mt-1">Every major decision, transit breakthrough, and verified outcome structured into your life story.</p>
          </div>
        </div>

        {/* Milestones List */}
        <div className="space-y-6">
          {mockJourneyMilestones.map((milestone, i) => (
            <motion.div key={milestone.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="p-6 rounded-lg bg-surface border border-line space-y-5">
                {/* Milestone Header */}
                <div className="flex items-start justify-between border-b border-line/60 pb-3">
                  <div>
                    <h2 className="text-body font-bold text-ink">{milestone.title}</h2>
                    <p className="text-xs font-mono text-ink-tertiary mt-0.5">{milestone.date}</p>
                  </div>
                  <Badge variant="gold" size="sm">{milestone.category}</Badge>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed font-sans">{milestone.description}</p>

                {/* Events */}
                <div className="space-y-2 font-mono">
                  {milestone.events.map((event) => {
                    const Icon = eventIcons[event.type] || BookOpen
                    return (
                      <div key={event.id} className="flex items-center gap-3.5 p-3 rounded-md bg-surface-2/60 border border-line/60 text-xs">
                        <div className="w-7 h-7 rounded-md bg-surface-2 border border-brand/20 flex items-center justify-center text-brand shrink-0">
                          <Icon className="w-3.5 h-3.5 text-brand" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-ink truncate">{event.title}</p>
                          <p className="text-[10px] text-ink-tertiary">{event.date}</p>
                        </div>
                        {event.status === "verified" && <Badge variant="success" size="sm">Verified</Badge>}
                        {event.status === "active" && <Badge variant="brand" size="sm">Active</Badge>}
                        {event.status === "completed" && <Badge variant="default" size="sm">Done</Badge>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
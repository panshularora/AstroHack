import { useState } from "react"
import { Settings2, Database, Check } from "lucide-react"

export function ContextPanel() {
  const [toggles, setToggles] = useState({
    consultations: true,
    predictions: true,
    remedies: true,
    journal: false,
    mood: true,
    timeline: true,
  })

  const toggle = (key: keyof typeof toggles) =>
    setToggles(prev => ({ ...prev, [key]: !prev[key] }))

  const items = [
    { key: "consultations", label: "Consultation History", desc: "Past transcripts and summaries" },
    { key: "predictions",   label: "Active Predictions",   desc: "Upcoming and verified outcomes" },
    { key: "remedies",      label: "Remedies & Habits",    desc: "Streaks and daily practices" },
    { key: "journal",       label: "Private Journal",      desc: "Personal notes and reflections" },
    { key: "mood",          label: "Mood History",         desc: "Emotional tracking data" },
    { key: "timeline",      label: "Life Timeline",        desc: "Major milestones and events" },
  ] as const

  return (
    <div className="p-5 rounded-lg bg-surface border border-line h-full space-y-5">
      <div className="flex items-center justify-between border-b border-line/60 pb-4">
        <div className="flex items-center gap-2.5">
          <Settings2 className="w-4 h-4 text-brand" />
          <h3 className="text-sm font-bold text-ink">AI Context Controls</h3>
        </div>
        <Database className="w-3.5 h-3.5 text-ink-tertiary" />
      </div>

      <p className="text-xs text-ink-secondary leading-relaxed">
        Toggle which memory sources the AI uses to reason. Your data is never shared without permission.
      </p>

      <div className="space-y-1">
        {items.map(({ key, label, desc }) => (
          <div
            key={key}
            onClick={() => toggle(key)}
            className="flex items-center justify-between py-2.5 px-3 rounded-md hover:bg-surface-2/60 cursor-pointer transition-soft group"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink group-hover:text-ink truncate">{label}</p>
              <p className="text-[11px] text-ink-tertiary font-mono mt-0.5 truncate">{desc}</p>
            </div>
            <div className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors shrink-0 ml-3 ${
              toggles[key] ? "bg-brand justify-end" : "bg-surface-3 justify-start"
            }`}>
              <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-line/60">
        <div className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-success" />
          <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-[0.12em]">
            {Object.values(toggles).filter(Boolean).length} of {items.length} sources active
          </span>
        </div>
      </div>
    </div>
  )
}

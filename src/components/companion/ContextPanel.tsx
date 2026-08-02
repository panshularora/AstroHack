import { useState } from "react"
import { Settings2, Database, ToggleLeft, ToggleRight } from "lucide-react"

export function ContextPanel() {
  const [toggles, setToggles] = useState({
    consultations: true,
    predictions: true,
    remedies: true,
    journal: false,
    mood: true,
    timeline: true
  })

  const toggleState = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const items = [
    { key: "consultations", label: "Consultation History", desc: "Past transcripts and summaries" },
    { key: "predictions", label: "Active Predictions", desc: "Upcoming and verified outcomes" },
    { key: "remedies", label: "Remedies & Habits", desc: "Streaks and daily practices" },
    { key: "journal", label: "Private Journal", desc: "Personal notes and reflections" },
    { key: "mood", label: "Mood History", desc: "Emotional tracking data" },
    { key: "timeline", label: "Life Timeline", desc: "Major milestones and events" },
  ] as const

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-white">AI Context Controls</h3>
        </div>
        <Database className="w-4 h-4 text-[#9CA3AF]" />
      </div>
      
      <p className="text-sm text-[#9CA3AF] mb-8 leading-relaxed">
        Toggle which memory sources the AI uses to reason. AstroLive never uses your private data without permission.
      </p>

      <div className="space-y-5">
        {items.map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between group cursor-pointer" onClick={() => toggleState(key)}>
            <div>
              <div className="text-sm font-bold text-white mb-0.5">{label}</div>
              <div className="text-xs text-[#9CA3AF]">{desc}</div>
            </div>
            {toggles[key] ? (
              <ToggleRight className="w-6 h-6 text-primary transition-colors" />
            ) : (
              <ToggleLeft className="w-6 h-6 text-[#9CA3AF] transition-colors" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

import { useState } from "react"
import { CalendarClock, ArrowRight } from "lucide-react"

const options = [
  { id: "1w", label: "In 1 Week", subtext: "Quick check-in" },
  { id: "1m", label: "In 1 Month", subtext: "Next lunar cycle" },
  { id: "3m", label: "In 3 Months", subtext: "Quarterly review" },
  { id: "window", label: "When Prediction Starts", subtext: "Late August" },
]

export function FollowUpScheduler() {
  const [selected, setSelected] = useState<string>("window")

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <CalendarClock className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-white">Schedule Follow-Up</h2>
      </div>

      <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selected === opt.id 
                  ? "bg-primary/20 border-primary" 
                  : "bg-white/5 border-transparent hover:bg-white/10"
              }`}
            >
              <div className={`font-bold mb-1 ${selected === opt.id ? 'text-white' : 'text-white/80'}`}>{opt.label}</div>
              <div className={`text-xs ${selected === opt.id ? 'text-lavender' : 'text-[#9CA3AF]'}`}>{opt.subtext}</div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 bg-navy/50 p-4 rounded-2xl border border-white/5">
          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
          <div className="text-sm text-[#9CA3AF] flex-1">
            We will automatically remind you to book a session <strong className="text-white">when your career prediction window opens in late August.</strong>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] shrink-0 hidden md:block" />
        </div>
      </div>
    </div>
  )
}

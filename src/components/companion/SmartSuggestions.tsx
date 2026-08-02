import { Zap, MessageSquare, Target, Activity } from "lucide-react"

export function SmartSuggestions() {
  const suggestions = [
    { icon: <MessageSquare className="w-4 h-4 text-primary" />, text: "Summarize my last consultation" },
    { icon: <Target className="w-4 h-4 text-blue-400" />, text: "Show predictions due this month" },
    { icon: <Zap className="w-4 h-4 text-gold" />, text: "Review unfinished remedies" },
    { icon: <Activity className="w-4 h-4 text-green-400" />, text: "Show my emotional progress" },
  ]

  return (
    <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {suggestions.map((s, i) => (
        <button 
          key={i}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all shrink-0 group cursor-pointer"
        >
          <div className="group-hover:scale-110 transition-transform">{s.icon}</div>
          <span className="text-xs font-bold text-white/80">{s.text}</span>
        </button>
      ))}
    </div>
  )
}

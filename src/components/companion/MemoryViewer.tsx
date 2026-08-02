import { Brain, FileText, Target, HeartPulse, Trash2 } from "lucide-react"

export function MemoryViewer() {
  const memories = [
    { id: 1, type: 'consultation', icon: <FileText className="w-4 h-4 text-blue-400" />, title: "Career Growth with Dr. Sarah", date: "July 15, 2026", summary: "Advised to wait until late August for tech transition." },
    { id: 2, type: 'prediction', icon: <Target className="w-4 h-4 text-primary" />, title: "Job Offer in Tech", date: "Late Aug 2026", summary: "88% confidence of new offer. Status: Pending." },
    { id: 3, type: 'remedy', icon: <HeartPulse className="w-4 h-4 text-green-400" />, title: "Morning Sun Meditation", date: "Daily", summary: "Currently on a 3-day streak." },
  ]

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-secondary" />
        <h3 className="text-lg font-bold text-white">Active Working Memory</h3>
      </div>
      <p className="text-sm text-[#9CA3AF] mb-8 leading-relaxed">
        The AI is currently holding these specific memories in context for this conversation.
      </p>

      <div className="space-y-3">
        {memories.map(mem => (
          <div key={mem.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-black/50 border border-white/5 shadow-inner">
                  {mem.icon}
                </div>
                <h4 className="text-sm font-bold text-white">{mem.title}</h4>
              </div>
              <button className="text-[#9CA3AF] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-primary mb-2">{mem.date}</div>
            <p className="text-sm text-white/80 leading-relaxed">{mem.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

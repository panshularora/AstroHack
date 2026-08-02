import { Brain, Search, LineChart, Sparkles } from "lucide-react"

export function CapabilitiesSection() {
  const capabilities = [
    { icon: <Brain className="w-5 h-5 text-brand" />, title: "Memory Retrieval", desc: "Recall exact details from past consultations." },
    { icon: <Search className="w-5 h-5 text-blue-400" />, title: "Prediction Tracking", desc: "Check if timelines have shifted or completed." },
    { icon: <LineChart className="w-5 h-5 text-green-400" />, title: "Emotional Reflection", desc: "Analyze mood trends from your journal." },
    { icon: <Sparkles className="w-5 h-5 text-gold" />, title: "Smart Recommendations", desc: "Get matched with the perfect astrologer based on history." },
  ]

  return (
    <div className="mb-16 py-12 border-t border-line/60">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-white mb-2">What Can I Do?</h2>
        <p className="text-[#9CA3AF]">The AstroLive AI is your personal cosmic operating system.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {capabilities.map((cap, i) => (
          <div key={i} className="text-center group">
            <div className="w-14 h-14 mx-auto bg-white/5 rounded-lg flex items-center justify-center mb-5 border border-line shadow-inner group-hover:bg-surface-3 transition-colors">
              {cap.icon}
            </div>
            <h3 className="text-sm font-bold text-white mb-2">{cap.title}</h3>
            <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-[200px] mx-auto">{cap.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

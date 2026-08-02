import { ArrowDown, MessageSquare, BookOpen, Target, Sparkles } from "lucide-react"

export function InteractiveJourney() {
  const steps = [
    { icon: <MessageSquare className="w-5 h-5 text-white" />, title: "First Consultation", desc: "Your journey begins." },
    { icon: <BookOpen className="w-5 h-5 text-blue-400" />, title: "Cosmic Memory Built", desc: "Insights are permanently stored." },
    { icon: <Target className="w-5 h-5 text-gold" />, title: "Predictions Tracked", desc: "Active timelines are monitored." },
    { icon: <Sparkles className="w-5 h-5 text-primary" />, title: "Daily AI Check-ins", desc: "Proactive guidance based on your history." }
  ]

  return (
    <div className="mb-24 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">How Premium Compounds Value</h2>
      <p className="text-[#9CA3AF] mb-12 max-w-2xl mx-auto">
        Every interaction makes AstroLive+ smarter, creating an ever-evolving map of your life.
      </p>

      <div className="flex flex-col items-center gap-4">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-64 bg-card border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg hover:border-white/20 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 shadow-inner">
                {step.icon}
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
              <p className="text-xs text-[#9CA3AF]">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="h-12 border-l-2 border-dashed border-white/20 my-2 relative">
                <ArrowDown className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 text-white/20" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

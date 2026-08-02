import { Brain, History, Bell, FileText, Users, Target } from "lucide-react"

export function FeatureShowcase() {
  const features = [
    { icon: <Brain className="w-6 h-6 text-brand" />, title: "Unlimited AI Companion", desc: "Your personal guide with complete context of every past session." },
    { icon: <History className="w-6 h-6 text-blue-400" />, title: "Infinite Cosmic Memory", desc: "Securely store and retrieve insights from a lifetime of consultations." },
    { icon: <Target className="w-6 h-6 text-gold" />, title: "Advanced Prediction Intelligence", desc: "Automated tracking for active timelines and remedy streaks." },
    { icon: <Bell className="w-6 h-6 text-green-400" />, title: "Personalized Daily Briefs", desc: "Start your day with highly specific cosmic priorities." },
    { icon: <FileText className="w-6 h-6 text-ink-secondary" />, title: "Premium Life Reports", desc: "Generate beautifully crafted PDF summaries of your emotional growth." },
    { icon: <Users className="w-6 h-6 text-orange-400" />, title: "Family Profiles", desc: "Manage separate memories and daily briefs for up to 4 loved ones." }
  ]

  return (
    <div className="mb-24 relative">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div key={i} className="bg-surface/80 backdrop-blur-sm border border-line rounded-lg p-8 hover:bg-white/5 hover:border-line-strong transition-all group shadow-xl hover:shadow-2xl hover:shadow-primary/5">
            <div className="w-12 h-12 rounded-lg bg-surface-2 border border-line flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

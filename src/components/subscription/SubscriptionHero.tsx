import { Star } from "lucide-react"

export function SubscriptionHero() {
  return (
    <div className="relative pt-20 pb-16 text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/20 via-blue-500/10 to-transparent rounded-full blur-[100px] -z-10" />
      
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
        <Star className="w-4 h-4 text-gold" />
        <span className="text-xs font-bold text-white uppercase tracking-wider">AstroLive+ Premium</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
        Unlock Your Complete <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender via-primary to-blue-400">
          Cosmic Journey
        </span>
      </h1>

      <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed mb-10">
        Transform one-time consultations into an intelligent lifelong companion powered by AI, infinite memory, proactive prediction tracking, and personalized daily guidance.
      </p>
    </div>
  )
}

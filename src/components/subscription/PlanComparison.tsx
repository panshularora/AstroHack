import { Check, Minus } from "lucide-react"

export function PlanComparison() {
  const features = [
    { name: "Cosmic Memory Retention", free: "Last 3 sessions", premium: "Unlimited" },
    { name: "AI Companion Queries", free: "5 per consultation", premium: "Unlimited Daily" },
    { name: "Prediction Tracking", free: "Basic manual tracking", premium: "Proactive automated tracking" },
    { name: "Daily Brief Personalization", free: "Generic transits", premium: "Deep memory integration" },
    { name: "Premium PDF Reports", free: false, premium: true },
    { name: "Family Profiles", free: false, premium: "Up to 4 members" },
    { name: "AstroVerified Deep Insights", free: false, premium: true }
  ]

  return (
    <div className="mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">The Value of Premium</h2>
        <p className="text-[#9CA3AF]">See how AstroLive+ supercharges your experience.</p>
      </div>

      <div className="bg-surface border border-line rounded-lg overflow-hidden shadow-2xl">
        <div className="grid grid-cols-3 p-6 border-b border-line/60 bg-white/5 backdrop-blur-sm">
          <div className="font-bold text-white uppercase tracking-wider text-xs">Capability</div>
          <div className="font-bold text-white text-center uppercase tracking-wider text-xs">Free Plan</div>
          <div className="font-bold text-brand text-center uppercase tracking-wider text-xs flex items-center justify-center gap-1">AstroLive+</div>
        </div>
        
        {features.map((feat, i) => (
          <div key={i} className="grid grid-cols-3 p-6 border-b border-line-subtle hover:bg-white/5 transition-colors">
            <div className="text-sm font-medium text-white/90">{feat.name}</div>
            <div className="text-sm font-medium text-[#9CA3AF] text-center flex justify-center items-center">
              {typeof feat.free === 'boolean' ? (feat.free ? <Check className="w-4 h-4 text-[#9CA3AF]" /> : <Minus className="w-4 h-4 text-[#9CA3AF]/50" />) : feat.free}
            </div>
            <div className="text-sm font-bold text-brand text-center flex justify-center items-center">
              {typeof feat.premium === 'boolean' ? (feat.premium ? <Check className="w-5 h-5 text-brand drop-shadow-md" /> : <Minus className="w-4 h-4 text-brand" />) : feat.premium}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

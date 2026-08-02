import { Scale } from "lucide-react"

export function TransparencyScore() {
  const metrics = [
    { label: "Verified Prediction Accuracy", weight: "40%", score: 94 },
    { label: "Long-Term Consistency", weight: "25%", score: 98 },
    { label: "User Satisfaction", weight: "15%", score: 96 },
    { label: "Response Reliability", weight: "10%", score: 99 },
    { label: "Repeat Consultations", weight: "10%", score: 85 },
  ]

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <Scale className="w-6 h-6 text-blue-400" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">How Trust is Calculated</h2>
          <p className="text-[#9CA3AF] text-sm">AstroVerified scores cannot be purchased. They are strictly data-driven.</p>
        </div>
      </div>

      <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-10">
        <div className="space-y-6 max-w-3xl">
          {metrics.map((metric, i) => (
            <div key={i}>
              <div className="flex justify-between items-end mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">{metric.label}</span>
                  <span className="text-[10px] font-bold text-[#9CA3AF] bg-white/5 px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/5">{metric.weight} Weight</span>
                </div>
                <span className="text-sm font-bold text-blue-400">{metric.score}/100</span>
              </div>
              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-400 rounded-full"
                  style={{ width: `${metric.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

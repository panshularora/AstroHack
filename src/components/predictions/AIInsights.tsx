import { Sparkles, TrendingUp, Compass, Award } from "lucide-react"
import { mockAstrologers, mockMemoryStats } from "@/lib/mock-data"

export function AIInsights() {
  const topAstro = mockAstrologers[0] // Dr. Sarah Chen

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">AI Insights</h2>
          <p className="text-[#9CA3AF] text-sm">Automated observations generated from your prediction history.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6 md:p-8 hover:bg-primary/20 transition-colors shadow-inner">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <h4 className="text-lg font-bold text-white mb-3">Most Accurate Guide</h4>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            <strong className="text-white">{topAstro.name}</strong> has correctly predicted {topAstro.verifiedAccuracy}% of events related to your career and financial transitions across your {mockMemoryStats.totalConsultations} sessions.
          </p>
        </div>

        <div className="bg-gold/10 border border-gold/20 rounded-3xl p-6 md:p-8 hover:bg-gold/20 transition-colors shadow-inner">
          <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center mb-6 border border-gold/30">
            <TrendingUp className="w-6 h-6 text-gold" />
          </div>
          <h4 className="text-lg font-bold text-white mb-3">Highest Success Rate</h4>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            Predictions in the <strong className="text-white">Career</strong> category have an {mockMemoryStats.verifiedAccurate ? Math.round((mockMemoryStats.verifiedAccurate / mockMemoryStats.completedPredictions) * 100) : 80}% manifestation rate, the highest across all your life areas.
          </p>
        </div>

        <div className="bg-secondary/10 border border-secondary/20 rounded-3xl p-6 md:p-8 hover:bg-secondary/20 transition-colors shadow-inner">
          <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 border border-secondary/30">
            <Compass className="w-6 h-6 text-secondary" />
          </div>
          <h4 className="text-lg font-bold text-white mb-3">Pattern Detected</h4>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            Predictions made during your <strong className="text-white">Saturn transits</strong> tend to manifest 2-3 weeks later than forecasted. Keep this buffer in mind.
          </p>
        </div>
      </div>
    </div>
  )
}

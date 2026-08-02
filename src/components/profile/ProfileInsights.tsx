import { Sparkles, TrendingUp, Users } from "lucide-react"

export function ProfileInsights() {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-6 h-6 text-brand" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">AI Analyst Insights</h2>
          <p className="text-[#9CA3AF] text-sm">Automated observations on this astrologer's performance.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-brand-light border border-brand/20 rounded-lg p-6 md:p-8 hover:bg-brand/20 transition-colors shadow-inner">
          <TrendingUp className="w-8 h-8 text-brand mb-6" />
          <h4 className="text-lg font-bold text-white mb-3">Exceptional Career Guidance</h4>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            Data shows this astrologer is in the top 1% for <strong className="text-white">Career</strong> predictions, with a highly consistent 94% accuracy over the last 2 years.
          </p>
        </div>

        <div className="bg-gold/10 border border-gold/20 rounded-lg p-6 md:p-8 hover:bg-gold/20 transition-colors shadow-inner">
          <Users className="w-8 h-8 text-gold mb-6" />
          <h4 className="text-lg font-bold text-white mb-3">High Retention Rate</h4>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            78% of users return for follow-up consultations, indicating strong long-term relationship building and trustworthy ongoing guidance.
          </p>
        </div>
      </div>
    </div>
  )
}

import { Sparkles, Users, Video } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function BriefRecommendations() {
  return (
    <div className="mb-16">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-gold" /> Proactive Recommendations
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-start hover:border-white/20 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-white mb-3">Explore Dr. Alara Vance</h3>
          <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
            Since your focus is on a major career pivot, Dr. Vance's 98 Trust Score in Career predictions makes her an ideal expert for your next consultation.
          </p>
          <Button variant="outline" className="mt-auto h-10 text-xs font-bold border-white/20 hover:bg-white/5 w-full md:w-auto px-6">
            View AstroVerified Profile
          </Button>
        </div>

        <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-start hover:border-white/20 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5">
            <Video className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-3">Follow-up with Dr. Sarah</h3>
          <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
            Your prediction window for the Tech Job Offer opens in 2 weeks. A quick follow-up consultation could help you prepare for negotiations.
          </p>
          <Button variant="outline" className="mt-auto h-10 text-xs font-bold border-white/20 hover:bg-white/5 w-full md:w-auto px-6">
            Book Follow-up
          </Button>
        </div>
      </div>
    </div>
  )
}

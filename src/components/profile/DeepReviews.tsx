import { Star, ShieldCheck, ArrowRight, Quote } from "lucide-react"
import { mockDeepReviews } from "@/lib/mock-data"

export function DeepReviews() {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Reviews & Experiences</h2>
        <p className="text-[#9CA3AF]">Detailed stories from users who followed the guidance over time.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockDeepReviews.map(review => (
          <div key={review.id} className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-colors relative">
            <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}
                </div>
                <div className="text-sm font-bold text-white mb-1">{review.userType}</div>
                <div className="text-xs text-[#9CA3AF]">{new Date(review.date).toLocaleDateString(undefined, {month: 'long', year: 'numeric'})}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {review.badges.map(badge => (
                  <span key={badge} className="px-2 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider mb-2 block">Original Concern</span>
                <p className="text-sm text-white/90 leading-relaxed">"{review.concern}"</p>
              </div>
              
              <div className="pl-4 border-l-2 border-white/10">
                <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-wider mb-2 block">The Experience</span>
                <p className="text-sm text-white/90 leading-relaxed">"{review.experience}"</p>
              </div>

              <div className="bg-green-400/5 border border-green-400/10 rounded-2xl p-4">
                <span className="text-[10px] text-green-400 uppercase font-bold tracking-wider mb-2 block">Verified Outcome</span>
                <p className="text-sm text-white leading-relaxed font-medium">"{review.outcome}"</p>
              </div>

              {review.followUp && (
                <div className="flex items-start gap-3 pt-3">
                  <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-[#9CA3AF] italic leading-relaxed">"{review.followUp}"</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

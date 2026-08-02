import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ShieldCheck, Star, Users, ArrowRight, TrendingUp, MessageSquare } from "lucide-react"

const spotlightAstrologers = [
  {
    id: "a3",
    name: "Elena Rostova",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
    title: "Numerology & Life Path · 22 Yrs",
    rating: 4.95,
    accuracy: 96,
    sessions: "2.1k+",
    tag: "Trending This Week",
    tagColor: "text-gold bg-gold/10 border-gold/30",
    reason: "Her Saturn & Rahu analysis is highly relevant to your current transit window.",
  },
  {
    id: "a1",
    name: "Dr. Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "Vedic Astrology · Career · 15 Yrs",
    rating: 4.9,
    accuracy: 94,
    sessions: "1.25k+",
    tag: "Your Trusted Expert",
    tagColor: "text-brand bg-brand-light border-brand/30",
    reason: "Consulted 3× · 94% accuracy on your career predictions. Overdue for a check-in.",
  },
]

export function AstroVerifiedSpotlight() {
  const navigate = useNavigate()

  return (
    <div className="bg-surface border border-line rounded-lg p-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-white">AstroVerified Spotlight</h2>
          <p className="text-xs text-[#9CA3AF]">Recommended based on your journey</p>
        </div>
        <button
          onClick={() => navigate("/app/verified")}
          className="text-xs font-bold text-brand hover:text-ink-secondary transition-colors flex items-center gap-1"
        >
          Browse All <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {spotlightAstrologers.map((ast, i) => (
          <motion.div
            key={ast.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative bg-surface-2 hover:bg-surface-2 border border-line/60 hover:border-white/15 rounded-lg p-4 transition-all group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-brand/5 rounded-full blur-2xl pointer-events-none" />

            {/* Tag */}
            <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-3 ${ast.tagColor}`}>
              {ast.tag}
            </span>

            <div className="flex items-center gap-3 mb-3">
              <img src={ast.avatar} alt={ast.name} className="w-11 h-11 rounded-full border border-line object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm">{ast.name}</p>
                <p className="text-[11px] text-[#9CA3AF]">{ast.title}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="flex items-center gap-1 text-gold text-xs font-bold">
                  <Star className="w-3 h-3 fill-gold" /> {ast.rating}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              {[
                { icon: ShieldCheck, val: `${ast.accuracy}% Accuracy`, color: "text-teal-400" },
                { icon: Users, val: `${ast.sessions} Sessions`, color: "text-blue-400" },
                { icon: TrendingUp, val: "Online", color: "text-green-400" },
              ].map(s => (
                <div key={s.val} className={`flex items-center gap-1 text-[10px] font-medium ${s.color} bg-surface-2 px-2 py-1 rounded-full border border-line/60`}>
                  <s.icon className="w-2.5 h-2.5" /> {s.val}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#9CA3AF] mb-3 italic">"{ast.reason}"</p>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/app/astrologer/${ast.id}`)}
                className="flex-1 py-2 text-[11px] font-bold bg-white/5 hover:bg-surface-3 border border-line text-white rounded-xl transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={() => navigate("/app/match")}
                className="flex-1 py-2 text-[11px] font-bold bg-brand/15 hover:bg-brand/25 border border-brand/30 text-brand rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3 h-3" /> Book Session
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => navigate("/app/verified")}
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-surface-2 hover:bg-surface-2 border border-line/60 rounded-xl text-xs font-bold text-[#9CA3AF] hover:text-white transition-all"
      >
        <ShieldCheck className="w-3.5 h-3.5" /> Explore All Verified Astrologers
      </button>
    </div>
  )
}

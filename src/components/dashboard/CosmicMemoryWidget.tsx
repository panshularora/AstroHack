import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { BookOpen, ArrowRight, Star, MessageCircle, Lightbulb } from "lucide-react"

const memories = [
  {
    id: 1,
    type: "consultation",
    icon: MessageCircle,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10 border-blue-400/20",
    title: "Career & Jupiter Transit",
    with: "Dr. Sarah Chen",
    date: "Jul 15",
    snippet: "Saturn causing friction. Rahu period favors tech. Network by late August.",
    tags: ["Career", "Transits"]
  },
  {
    id: 2,
    type: "prediction-verified",
    icon: Star,
    iconColor: "text-gold",
    iconBg: "bg-gold/10 border-gold/20",
    title: "Romantic Partner Prediction",
    with: "Elena Rostova",
    date: "Feb 14",
    snippet: "Met Meera at the networking event — exactly as predicted. Verified ✓",
    tags: ["Relationships", "Verified"]
  },
  {
    id: 3,
    type: "insight",
    icon: Lightbulb,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10 border-emerald-400/20",
    title: "AI Life Pattern Detected",
    with: "AI Companion",
    date: "Jun 3",
    snippet: "Jupiter transits consistently bring career breakthroughs in your 10th house.",
    tags: ["Pattern", "AI Insight"]
  },
]

export function CosmicMemoryWidget() {
  const navigate = useNavigate()

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Cosmic Memory</p>
            <p className="text-[11px] text-[#9CA3AF]">47 memories · Your entire journey</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/app/memory")}
          className="text-xs font-bold text-primary hover:text-lavender transition-colors flex items-center gap-1"
        >
          View All <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-3">
        {memories.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex gap-3 p-3 bg-white/3 hover:bg-white/6 border border-white/6 hover:border-white/12 rounded-2xl cursor-pointer transition-all group"
            onClick={() => navigate("/app/memory")}
          >
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${m.iconBg}`}>
              <m.icon className={`w-4 h-4 ${m.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-white text-xs font-bold leading-tight">{m.title}</p>
                <span className="text-[10px] text-[#9CA3AF] shrink-0">{m.date}</span>
              </div>
              <p className="text-[11px] text-[#9CA3AF] mb-1">{m.with}</p>
              <p className="text-[11px] text-white/60 line-clamp-1">{m.snippet}</p>
              <div className="flex gap-1 mt-1.5">
                {m.tags.map(t => (
                  <span key={t} className="text-[9px] font-bold px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[#9CA3AF]">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => navigate("/app/memory")}
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-white/4 hover:bg-white/8 border border-white/8 rounded-xl text-xs font-bold text-[#9CA3AF] hover:text-white transition-all"
      >
        <BookOpen className="w-3.5 h-3.5" /> Explore Full Memory Archive
      </button>
    </div>
  )
}

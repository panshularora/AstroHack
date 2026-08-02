import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Star, ArrowRight, Zap, ShieldAlert, Sun, CheckCircle2 } from "lucide-react"
import type { CosmicBrief } from "@/lib/mock-data"

export function CosmicHero({ brief }: { brief: CosmicBrief }) {
  const navigate = useNavigate()

  // Daily planetary influences (static for demo)
  const planets = [
    { name: "Jupiter", house: "10th", energy: "Career", impact: "high", color: "text-gold bg-gold/10 border-gold/30" },
    { name: "Venus", house: "7th", energy: "Relations", impact: "medium", color: "text-pink-400 bg-pink-400/10 border-pink-400/30" },
    { name: "Mercury", house: "3rd", energy: "Direct ✓", impact: "positive", color: "text-blue-400 bg-blue-400/10 border-blue-400/30" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8 bg-gradient-to-br from-card via-card to-primary/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-secondary/6 rounded-full blur-[80px] pointer-events-none translate-y-1/2" />

      <div className="relative z-10 grid lg:grid-cols-3 gap-8">
        {/* Left: Brief content */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
              <Star className="w-4 h-4 text-gold" />
            </div>
            <span className="text-sm font-bold text-gold uppercase tracking-wider">Today's Daily Brief</span>
            <span className="ml-auto text-xs text-[#9CA3AF] bg-white/5 px-2 py-1 rounded-md">
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>

          <p className="text-white/90 text-base leading-relaxed mb-6">{brief.summary}</p>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 group hover:bg-primary/15 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Today's Opportunity</span>
              </div>
              <p className="text-sm text-white">Assert your leadership. The Jupiter trine favors bold, decisive action in career meetings.</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 group hover:bg-amber-500/15 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Watch Out</span>
              </div>
              <p className="text-sm text-white">Avoid financial impulsiveness. Wait until after Mercury's direct station (Aug 4) for investments.</p>
            </div>
          </div>

          {/* Active remedy tracker */}
          <div
            onClick={() => navigate("/app/memory")}
            className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/8 border border-white/10 rounded-2xl cursor-pointer group transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
              <Sun className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#9CA3AF] font-medium mb-1">Active Remedy · Day 11 of 21</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "52%" }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                  />
                </div>
                <span className="text-xs text-green-400 font-bold shrink-0">52%</span>
              </div>
              <p className="text-xs text-white/70 mt-1">Venus Beej Mantra · 108 repetitions daily</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Right: Planet widgets + energy score */}
        <div className="flex flex-col gap-4">
          {/* Cosmic energy score */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-3">Cosmic Energy Score</p>
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                <motion.circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="url(#energyGrad)" strokeWidth="2.5"
                  strokeDasharray="100" strokeLinecap="round"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 16 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">84</span>
                <span className="text-[9px] text-[#9CA3AF] uppercase tracking-wider">/ 100</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-green-400 font-medium">High Energy Day</span>
            </div>
          </div>

          {/* Active transits */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-3">Active Transits</p>
            <div className="space-y-2">
              {planets.map(p => (
                <div key={p.name} className="flex items-center justify-between">
                  <div>
                    <span className="text-white text-xs font-bold">{p.name}</span>
                    <span className="text-[#9CA3AF] text-xs"> in {p.house}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.color}`}>{p.energy}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/app/brief")}
            className="flex items-center justify-center gap-2 py-3 bg-primary/10 border border-primary/30 text-primary rounded-2xl text-sm font-bold hover:bg-primary/20 transition-colors"
          >
            Read Full Brief <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

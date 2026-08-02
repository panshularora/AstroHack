import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, TrendingUp, Brain, Sun } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { CelestialToolsModal } from "@/components/astrology/CelestialToolsModal"

export function DashboardHeader({ userName }: { userName: string }) {
  const navigate = useNavigate()
  const [toolsOpen, setToolsOpen] = useState(false)
  const [initialTab, setInitialTab] = useState<"panchang" | "kundli" | "match" | "pooja">("panchang")

  const openTools = (tab: "panchang" | "kundli" | "match" | "pooja") => {
    setInitialTab(tab)
    setToolsOpen(true)
  }

  const hour = new Date().getHours()
  let greeting = "Good Evening"
  let subGreeting = "The stars are quiet tonight. A good time to reflect."
  if (hour < 5) { greeting = "Still Awake,"; subGreeting = "Late nights under a Scorpio moon carry deep insight." }
  else if (hour < 12) { greeting = "Good Morning,"; subGreeting = "Jupiter is active in your chart today. Make bold moves." }
  else if (hour < 17) { greeting = "Good Afternoon,"; subGreeting = "A productive Mercury window is open right now." }
  else if (hour < 21) { greeting = "Good Evening,"; subGreeting = "Venus trine is elevating your social energy this evening." }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              ✨
            </motion.div>
            <span className="text-[#9CA3AF] text-sm font-medium">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {greeting} <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-lavender">{userName}</span>
          </h1>
          <p className="text-[#9CA3AF] mt-1 text-sm">{subGreeting}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => openTools("panchang")}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-sm font-bold hover:bg-amber-500/20 transition-colors"
          >
            <Sun className="w-4 h-4 text-amber-400" /> Today's Panchang
          </button>
          <button
            onClick={() => navigate("/app/companion")}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/30 text-primary rounded-xl text-sm font-bold hover:bg-primary/20 transition-colors"
          >
            <Brain className="w-4 h-4" /> Ask AI
          </button>
          <button
            onClick={() => navigate("/app/match")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Book Session
          </button>
          <button
            onClick={() => navigate("/app/journey")}
            className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-colors"
          >
            <TrendingUp className="w-4 h-4" /> Life Journey <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </motion.div>

      <CelestialToolsModal
        isOpen={toolsOpen}
        onClose={() => setToolsOpen(false)}
        initialTab={initialTab}
      />
    </>
  )
}

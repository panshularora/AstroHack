import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Shield, Sparkles, ArrowLeft, CheckCircle2, Flame, Play, Pause, Share2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useUser } from "@/context/UserContext"

export function EmergencyGuidance() {
  const navigate = useNavigate()
  const { user } = useUser()

  const [mantraActive, setMantraActive] = useState(false)
  
  // Persistence logic
  const mantraCountKey = `astrolive_mantra_${user.id}`
  const mantraDaysKey = `astrolive_mantra_days_${user.id}`
  const lastMantraDateKey = `astrolive_last_mantra_date_${user.id}`
  
  const [mantraCount, setMantraCount] = useState(() => parseInt(localStorage.getItem(mantraCountKey) || "14", 10))
  const [completedDays, setCompletedDays] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(mantraDaysKey) || "[]")
    } catch {
      return []
    }
  })
  
  const todayStr = new Date().toISOString().split("T")[0]
  const [lastDate, setLastDate] = useState(localStorage.getItem(lastMantraDateKey) || "")

  useEffect(() => {
    localStorage.setItem(mantraCountKey, mantraCount.toString())
  }, [mantraCount, mantraCountKey])

  useEffect(() => {
    localStorage.setItem(mantraDaysKey, JSON.stringify(completedDays))
  }, [completedDays, mantraDaysKey])

  const isCompletedToday = completedDays.includes(todayStr)

  const handleMantraIncrement = () => {
    setMantraActive(!mantraActive)
    if (!mantraActive) {
      setMantraCount(prev => prev + 1)
      if (!isCompletedToday) {
        const newDays = [...completedDays, todayStr]
        setCompletedDays(newDays)
        setLastDate(todayStr)
        localStorage.setItem(lastMantraDateKey, todayStr)
      }
    }
  }

  // Calculate Streak
  let streak = 0
  const sortedDays = [...completedDays].sort((a, b) => b.localeCompare(a))
  
  if (sortedDays.length > 0) {
    const today = new Date(todayStr)
    const firstDate = new Date(sortedDays[0])
    
    // Calculate diff in days between today and the most recent entry
    const diffDays = Math.floor((today.getTime() - firstDate.getTime()) / (1000 * 3600 * 24))
    
    if (diffDays <= 1) {
      // Valid streak active
      let currentDate = firstDate
      streak = 1
      for (let i = 1; i < sortedDays.length; i++) {
        const prevDate = new Date(sortedDays[i])
        const gap = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24))
        if (gap === 1) {
          streak++
          currentDate = prevDate
        } else {
          break
        }
      }
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Astrological Streak",
          text: `I'm on day ${streak} of my Venus Beej Mantra 21-day practice on AstroLive!`
        })
      } catch (err) {
        console.error("Share failed", err)
      }
    } else {
      alert(`I'm on day ${streak} of my Venus Beej Mantra 21-day practice on AstroLive!`)
    }
  }

  const activeRemedies = [
    {
      id: "r1",
      planet: "Venus (12th House)",
      name: "Venus Beej Mantra (Om Shum Shukraya Namaha)",
      instructions: "Recite 108 times at sunrise for 21 consecutive days.",
      benefit: "Balances 12th House expenditure & restores emotional harmony",
      streak: `${streak} / 21 Days Active`,
      status: "Active Practice",
      color: "text-amber-400"
    },
    {
      id: "r2",
      planet: `${user.transitPlanet || "Jupiter"} (${user.transitHouse || "10th House"})`,
      name: "Brihaspati Transit Stotra",
      instructions: "Recite 21 times on Thursday mornings after bath.",
      benefit: "Unlocks 10th House career advancement & executive recognition",
      streak: "Every Thursday",
      status: "Recommended",
      color: "text-cyan-300"
    },
    {
      id: "r3",
      planet: `${user.activeDasha}`,
      name: "Rahu-Jupiter Dasha Counter-Measure",
      instructions: "Light a mustard oil lamp under a Peepal tree on Saturdays at dusk.",
      benefit: "Neutralizes Rahu illusion spikes & maintains financial clarity",
      streak: "Weekly Remedy",
      status: "Recommended",
      color: "text-emerald-400"
    }
  ]

  const gemstoneGuidance = [
    { name: "Yellow Sapphire (Pukhraj)", planet: "Jupiter", suitability: "98% Suitable", desc: "Strengthens 10th house career lord for your Leo Sun chart." },
    { name: "Emerald (Panna)", planet: "Mercury", suitability: "92% Suitable", desc: "Accelerates decision clarity & contract negotiations." }
  ]

  // Generate 21 days ending today
  const last21Days = Array.from({ length: 21 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (20 - i))
    return d.toISOString().split("T")[0]
  })

  return (
    <div className="page-container max-w-4xl pb-28 font-sans text-white">
      <div className="space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 font-mono text-xs text-[#9CA3AF] hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-display text-white">Vedic Astrology Remedies & Graha Shanti</h1>
              <Badge variant="gold" size="sm" className="font-mono">Vedic Remedies</Badge>
            </div>
            <p className="text-xs font-mono text-[#9CA3AF] mt-1">
              Counter-measures, Beej Mantras, & Dasha remedies for {user.name} ({user.sunSign} Sun · {user.ascendant} Ascendant)
            </p>
          </div>

          <Button
            size="sm"
            className="bg-amber-500 text-black font-bold hover:bg-amber-400 font-mono text-xs rounded-xl cursor-pointer"
            onClick={() => navigate("/app/match")}
          >
            Consult Priest for Graha Shanti
          </Button>
        </div>

        {/* Interactive Mantra Chanting Counter */}
        <div className="p-6 rounded-2xl bg-[#090A0F] border border-white/10 text-center space-y-6 shadow-xl relative">
          <div className="absolute top-4 right-4">
             {isCompletedToday ? (
                <Badge variant="success" size="sm" className="font-mono">Completed Today</Badge>
             ) : (
                streak > 0 && <Badge variant="gold" size="sm" className="font-mono">{streak} Day Streak</Badge>
             )}
          </div>
          
          <motion.div
            animate={mantraActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={mantraActive ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
            className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-lg"
          >
            <Flame className="w-8 h-8 text-amber-400" />
          </motion.div>

          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block mb-1">
              Active Daily Vedic Counter-Measure
            </span>
            <p className="text-lg font-bold text-white">
              Venus Beej Mantra: <span className="text-amber-300">"Om Shum Shukraya Namaha"</span>
            </p>
            <p className="text-xs font-mono text-[#9CA3AF] mt-1">
              {mantraActive ? `Recitation in progress · ${mantraCount} / 108 chants completed` : "108 Sunrise Chants for 12th House Venus Balance"}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              size="sm"
              className="bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl font-mono text-xs px-6 cursor-pointer"
              onClick={handleMantraIncrement}
            >
              {mantraActive ? <><Pause className="w-3.5 h-3.5 mr-1" /> Pause Counter</> : <><Play className="w-3.5 h-3.5 mr-1" /> Begin 108 Chants</>}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl font-mono text-xs px-4 cursor-pointer text-white border-white/20 hover:bg-white/10"
              onClick={handleShare}
            >
              <Share2 className="w-3.5 h-3.5 mr-1" /> Share My Streak
            </Button>
          </div>
          
          {/* Streak Calendar Heatmap */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs font-mono text-[#9CA3AF] mb-3 text-left">21-Day Practice Heatmap</p>
            <div className="grid grid-cols-7 gap-2">
              {last21Days.map((day) => {
                const isCompleted = completedDays.includes(day)
                const isToday = day === todayStr
                return (
                  <div 
                    key={day}
                    title={day}
                    className={`h-8 rounded-md border flex items-center justify-center text-[10px] font-mono transition-colors
                      ${isCompleted ? "bg-amber-500/20 border-amber-500/50 text-amber-400" : "bg-white/5 border-white/10 text-white/30"}
                      ${isToday && !isCompleted ? "animate-pulse border-amber-500/50 bg-amber-500/10" : ""}
                    `}
                  >
                    {new Date(day).getDate()}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Personalized Active Astrological Remedies */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" /> Prescribed Astrological Counter-Measures ({activeRemedies.length})
          </h2>

          <div className="space-y-3">
            {activeRemedies.map(r => (
              <div key={r.id} className="p-5 rounded-2xl bg-[#090A0F] border border-white/10 space-y-3 shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block mb-1">
                      {r.planet}
                    </span>
                    <h3 className="text-sm font-bold text-white">{r.name}</h3>
                  </div>
                  <Badge variant="gold" size="sm" className="font-mono">{r.streak}</Badge>
                </div>

                <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">{r.instructions}</p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {r.benefit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gemstone Suitability */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Natal Gemstone Suitability
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {gemstoneGuidance.map((g, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{g.name}</span>
                  <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20 text-[10px] font-mono">
                    {g.suitability}
                  </Badge>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
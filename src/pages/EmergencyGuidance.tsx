import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Sun, Shield, Sparkles, BookOpen, ArrowLeft, CheckCircle2, Flame, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useUser } from "@/context/UserContext"

export function EmergencyGuidance() {
  const navigate = useNavigate()
  const { user } = useUser()

  const [mantraActive, setMantraActive] = useState(false)
  const [mantraCount, setMantraCount] = useState(14)

  const activeRemedies = [
    {
      id: "r1",
      planet: "Venus (12th House)",
      name: "Venus Beej Mantra (Om Shum Shukraya Namaha)",
      instructions: "Recite 108 times at sunrise for 21 consecutive days.",
      benefit: "Balances 12th House expenditure & restores emotional harmony",
      streak: "14 / 21 Days Active",
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
        <div className="p-6 rounded-2xl bg-[#090A0F] border border-white/10 text-center space-y-4 shadow-xl">
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
              onClick={() => {
                setMantraActive(!mantraActive)
                if (!mantraActive) setMantraCount(prev => prev + 1)
              }}
            >
              {mantraActive ? <><Pause className="w-3.5 h-3.5 mr-1" /> Pause Counter</> : <><Play className="w-3.5 h-3.5 mr-1" /> Begin 108 Chants</>}
            </Button>
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
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Target, Sun, Compass, Sparkles, Activity } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { useUser } from "@/context/UserContext"

interface Planet {
  id: string
  name: string
  sign: string
  house: string
  status: string
  color: string
  angle: number
  radius: number
  details: string
  transitStrength: number
}

export function CelestialOrbitHero() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [centerMode, setCenterMode] = useState<"sun" | "lagna" | "moon">("sun")

  const PLANETS: Planet[] = [
    {
      id: "sun",
      name: "Sun",
      sign: `${user.sunSign} 14°`,
      house: "1st House",
      status: "Natal Ruler",
      color: "#F59E0B",
      angle: 45,
      radius: 75,
      details: `Natal Sun at 14° ${user.sunSign} forms a 120° trine alignment during ${user.activeDasha}.`,
      transitStrength: 94
    },
    {
      id: "jupiter",
      name: user.transitPlanet || "Jupiter",
      sign: `${user.sunSign} Trine`,
      house: user.transitHouse || "10th House",
      status: "Active Transit Window",
      color: "#F59E0B",
      angle: 165,
      radius: 115,
      details: `Transiting ${user.transitPlanet || "Jupiter"} in your ${user.transitHouse || "10th House"} opens a high-momentum career aperture (92% Verified Confidence).`,
      transitStrength: 92
    },
    {
      id: "venus",
      name: "Venus",
      sign: "Cancer 08°",
      house: "12th House",
      status: "Remedy Active",
      color: "#EC4899",
      angle: 255,
      radius: 145,
      details: "12th House placement balanced via daily Venus Beej Mantra recitations at sunrise.",
      transitStrength: 86
    },
    {
      id: "mercury",
      name: "Mercury",
      sign: `${user.sunSign} 02°`,
      house: "1st House",
      status: "Direct Motion",
      color: "#38BDF8",
      angle: 330,
      radius: 175,
      details: "Stationary direct motion accelerates negotiations and personal decision clarity.",
      transitStrength: 90
    }
  ]

  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(PLANETS[1])

  const getCenterLabel = () => {
    switch (centerMode) {
      case "lagna": return { label: "LAGNA", val: `${user.ascendant} 04°` }
      case "moon": return { label: "MOON", val: `Taurus 18°` }
      default: return { label: "SUN", val: `${user.sunSign} 14°` }
    }
  }

  const centerInfo = getCenterLabel()

  return (
    <div className="relative rounded-2xl bg-[#090A0F] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl font-sans">
      
      {/* Background Starlight Ambient Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Contextual Overview & Dynamic Planet State */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Active Transit Focus
            </span>

            {/* Focal Core Selector Switcher */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-0.5 rounded-full font-mono text-[10px]">
              {(["sun", "lagna", "moon"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setCenterMode(mode)}
                  className={`px-2.5 py-0.5 rounded-full font-bold uppercase transition-all cursor-pointer ${
                    centerMode === mode ? "bg-amber-500 text-black shadow-sm" : "text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPlanet.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight leading-tight flex items-center gap-2">
                  {selectedPlanet.name} in {selectedPlanet.sign}
                  <span className="text-amber-400 text-lg font-mono font-normal">({selectedPlanet.transitStrength}% Confidence)</span>
                </h1>
                <p className="text-xs font-mono text-[#9CA3AF] mt-1 uppercase tracking-wider">
                  Natal Chart Focal: {user.sunSign} Sun · {user.ascendant} Ascendant · {user.activeDasha}
                </p>
              </div>

              {/* Selected Planet Details Panel */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">{selectedPlanet.name} ({selectedPlanet.status})</span>
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/20 text-[10px] font-mono font-bold">
                    {selectedPlanet.house}
                  </Badge>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">{selectedPlanet.details}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button 
              size="sm" 
              className="bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl px-4 text-xs font-mono cursor-pointer"
              onClick={() => navigate("/app/predictions")}
            >
              <Target className="w-3.5 h-3.5 mr-1.5" /> View Predictions
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/15 text-white rounded-xl text-xs font-mono cursor-pointer"
              onClick={() => navigate("/app/companion")}
            >
              AI Astrology Companion <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        {/* Right Column: Interactive SVG Orbital System */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[340px]">
          <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] flex items-center justify-center">
            
            {/* SVG Orbit Lines & Rays */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              {PLANETS.map((p, idx) => (
                <circle
                  key={idx}
                  cx="200"
                  cy="200"
                  r={p.radius}
                  fill="none"
                  stroke={selectedPlanet.id === p.id ? "#F59E0B" : "rgba(255, 255, 255, 0.1)"}
                  strokeWidth={selectedPlanet.id === p.id ? "2" : "1"}
                  strokeDasharray={selectedPlanet.id === p.id ? "6 6" : idx % 2 === 0 ? "4 4" : undefined}
                />
              ))}

              {/* Connecting Ray from Center Core to Selected Planet */}
              {(() => {
                const rad = (selectedPlanet.angle * Math.PI) / 180
                const px = 200 + selectedPlanet.radius * Math.cos(rad)
                const py = 200 + selectedPlanet.radius * Math.sin(rad)
                return (
                  <line
                    x1="200"
                    y1="200"
                    x2={px}
                    y2={py}
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )
              })()}
            </svg>

            {/* Central Focal Core (Switchable between SUN, LAGNA, MOON) */}
            <motion.div
              onClick={() => {
                const nextMode = centerMode === "sun" ? "lagna" : centerMode === "lagna" ? "moon" : "sun"
                setCenterMode(nextMode)
              }}
              whileHover={{ scale: 1.08 }}
              className="relative z-10 w-22 h-22 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-200/50 shadow-[0_0_50px_rgba(245,158,11,0.5)] flex flex-col items-center justify-center text-black select-none cursor-pointer transition-all"
              title="Click to switch Central Focal Core (Sun / Lagna / Moon)"
            >
              <span className="text-[10px] font-mono uppercase font-extrabold tracking-widest text-black/70">CENTER CORE</span>
              <span className="text-xs font-black tracking-wider">{centerInfo.label}</span>
              <span className="text-[9px] font-mono font-bold">{centerInfo.val}</span>
            </motion.div>

            {/* Orbiting Planet Badges */}
            {PLANETS.map((p) => {
              const rad = (p.angle * Math.PI) / 180
              const x = 200 + p.radius * Math.cos(rad) - 200
              const y = 200 + p.radius * Math.sin(rad) - 200

              const isSelected = selectedPlanet.id === p.id

              return (
                <motion.button
                  key={p.id}
                  onClick={() => setSelectedPlanet(p)}
                  whileHover={{ scale: 1.15 }}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className={`absolute z-20 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer shadow-lg flex items-center gap-1.5 ${
                    isSelected 
                      ? "border-amber-300 bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-110" 
                      : "border-white/10 bg-[#090A0F]/90 text-white hover:border-white/30"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-black animate-ping" : "bg-amber-400"}`} />
                  <span>{p.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Target } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { useUser } from "@/context/UserContext"

interface Planet {
  id: string
  name: string
  symbol: string
  sign: string
  house: string
  status: string
  color: string
  angle: number
  radius: number
  details: string
}

export function CelestialOrbitHero() {
  const navigate = useNavigate()
  const { user } = useUser()

  const PLANETS: Planet[] = [
    {
      id: "sun",
      name: "Sun",
      symbol: "☀️",
      sign: `${user.sunSign} 14°`,
      house: "1st House",
      status: "Natal Ruler",
      color: "#F59E0B",
      angle: 45,
      radius: 75,
      details: `Natal Sun at 14° ${user.sunSign} forms a 120° trine alignment during ${user.activeDasha}.`
    },
    {
      id: "jupiter",
      name: user.transitPlanet || "Jupiter",
      symbol: "♃",
      sign: `${user.sunSign} Trine`,
      house: user.transitHouse || "10th House",
      status: "Active Transit Window",
      color: "#F59E0B",
      angle: 165,
      radius: 115,
      details: `Transiting ${user.transitPlanet || "Jupiter"} in your ${user.transitHouse || "10th House"} opens a high-momentum career aperture.`
    },
    {
      id: "venus",
      name: "Venus",
      symbol: "♀",
      sign: "Cancer 08°",
      house: "12th House",
      status: "Remedy Active",
      color: "#EC4899",
      angle: 255,
      radius: 145,
      details: "12th House placement balanced via daily Venus Beej Mantra recitations at sunrise."
    },
    {
      id: "mercury",
      name: "Mercury",
      symbol: "☿",
      sign: `${user.sunSign} 02°`,
      house: "1st House",
      status: "Direct Motion",
      color: "#38BDF8",
      angle: 330,
      radius: 175,
      details: "Stationary direct motion accelerates negotiations and personal decision clarity."
    }
  ]

  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(PLANETS[1])

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#090A0F] via-[#0B101D] to-[#080C14] border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden backdrop-blur-2xl font-sans">
      
      {/* Background Starlight Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Contextual Overview & Controls */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>Live Planetary Transit Engine</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
              {user.transitPlanet || "Jupiter"} {user.transitHouse || "10th House"} <span className="text-amber-400">Trine Alignment</span>
            </h1>
            <p className="text-xs font-mono text-[#9CA3AF] mt-2 uppercase tracking-widest">
              Natal Kundli: {user.sunSign} Sun · {user.ascendant} Ascendant · {user.activeDasha}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
            Transiting {user.transitPlanet || "Jupiter"} in your {user.transitHouse || "10th House"} forms a 120° trine with your natal {user.sunSign} Sun for <span className="text-white font-bold">{user.name}</span> over the next <span className="text-amber-300 font-bold font-mono">72 hours</span>.
          </p>

          {/* Interactive Selected Planet Card */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-md shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-base">{selectedPlanet.symbol}</span>
                <span className="text-sm font-bold text-white">{selectedPlanet.name} in {selectedPlanet.sign}</span>
              </div>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] font-mono">
                {selectedPlanet.house}
              </Badge>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">{selectedPlanet.details}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button 
              size="sm" 
              className="bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl px-5 text-xs shadow-lg"
              onClick={() => navigate("/app/predictions")}
            >
              <Target className="w-4 h-4 mr-1.5" /> View Prediction Receipts
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/20 text-white rounded-xl text-xs"
              onClick={() => navigate("/app/companion")}
            >
              Ask AI Companion <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        {/* Right Column: High-Precision Interactive SVG Orbital Planetary System */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[360px]">
          <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
            
            {/* SVG Orbit Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              {PLANETS.map((p, idx) => (
                <circle
                  key={idx}
                  cx="200"
                  cy="200"
                  r={p.radius}
                  fill="none"
                  stroke={selectedPlanet.id === p.id ? "#F59E0B" : "rgba(255, 255, 255, 0.12)"}
                  strokeWidth={selectedPlanet.id === p.id ? "2" : "1"}
                  strokeDasharray={idx % 2 === 0 ? "4 4" : undefined}
                  className="transition-colors duration-300"
                />
              ))}
            </svg>

            {/* Central Sun Core - FIXED ORIENTATION */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 border-4 border-amber-200/50 shadow-[0_0_60px_rgba(245,158,11,0.6)] flex flex-col items-center justify-center text-black select-none pointer-events-none">
              <span className="text-xs font-bold tracking-wider">☀️ SUN</span>
              <span className="text-[10px] font-mono uppercase font-bold text-black/80">{user.sunSign} 14°</span>
            </div>

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
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  whileHover={{ scale: 1.15 }}
                  className={`absolute z-20 px-3 py-1.5 rounded-full border flex items-center gap-1.5 text-xs font-mono font-bold transition-all cursor-pointer shadow-xl ${
                    isSelected 
                      ? "border-white bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.7)] scale-110" 
                      : "border-white/20 bg-[#090A0F]/90 text-white hover:border-amber-400 backdrop-blur-md"
                  }`}
                >
                  <span className="text-sm">{p.symbol}</span>
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

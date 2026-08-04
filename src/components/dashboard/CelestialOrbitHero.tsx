import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Target, Sun, Compass, Activity, ShieldCheck, Zap } from "lucide-react"
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
}

export function CelestialOrbitHero() {
  const navigate = useNavigate()
  const { user } = useUser()

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
      details: `Natal Sun at 14° ${user.sunSign} forms a 120° trine alignment during ${user.activeDasha}.`
    },
    {
      id: "jupiter",
      name: user.transitPlanet || "Jupiter",
      sign: `${user.sunSign} Trine`,
      house: user.transitHouse || "10th House",
      status: "Active Transit",
      color: "#F59E0B",
      angle: 165,
      radius: 115,
      details: `Transiting ${user.transitPlanet || "Jupiter"} in your ${user.transitHouse || "10th House"} opens a high-momentum career phase.`
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
      details: "12th House placement balanced via daily Venus Beej Mantra recitations at sunrise."
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
      details: "Stationary direct motion accelerates negotiations and personal decision clarity."
    }
  ]

  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(PLANETS[1])

  return (
    <div className="relative rounded-2xl bg-[#090A0F] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl font-sans">
      
      {/* Background Starlight Ambient Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Contextual Overview & Controls */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#9CA3AF] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Planetary Transit Position</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight leading-tight">
              {user.transitPlanet || "Jupiter"} {user.transitHouse || "10th House"} <span className="text-amber-400">Trine Alignment</span>
            </h1>
            <p className="text-xs font-mono text-[#9CA3AF] mt-1.5 uppercase tracking-wider">
              Birth Chart: {user.sunSign} Sun · {user.ascendant} Ascendant · {user.activeDasha}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
            Transiting {user.transitPlanet || "Jupiter"} in your {user.transitHouse || "10th House"} forms a 120° trine with your natal {user.sunSign} Sun for <span className="text-white font-bold">{user.name}</span> over the next <span className="text-amber-300 font-bold font-mono">72 hours</span>.
          </p>

          {/* Selected Planet Details Panel */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">{selectedPlanet.name} in {selectedPlanet.sign}</span>
              </div>
              <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/20 text-[10px] font-mono">
                {selectedPlanet.house}
              </Badge>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">{selectedPlanet.details}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button 
              size="sm" 
              className="bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl px-4 text-xs font-mono"
              onClick={() => navigate("/app/predictions")}
            >
              <Target className="w-3.5 h-3.5 mr-1.5" /> View Predictions
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/15 text-white rounded-xl text-xs font-mono"
              onClick={() => navigate("/app/companion")}
            >
              AI Assistant <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        {/* Right Column: Clean SVG Orbital System */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[340px]">
          <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] flex items-center justify-center">
            
            {/* SVG Orbit Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              {PLANETS.map((p, idx) => (
                <circle
                  key={idx}
                  cx="200"
                  cy="200"
                  r={p.radius}
                  fill="none"
                  stroke={selectedPlanet.id === p.id ? "#F59E0B" : "rgba(255, 255, 255, 0.1)"}
                  strokeWidth={selectedPlanet.id === p.id ? "1.5" : "1"}
                  strokeDasharray={idx % 2 === 0 ? "4 4" : undefined}
                />
              ))}
            </svg>

            {/* Central Sun Sphere - NO EMOJIS */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-300/40 shadow-[0_0_40px_rgba(245,158,11,0.4)] flex flex-col items-center justify-center text-black select-none">
              <span className="text-xs font-extrabold tracking-wider">SUN</span>
              <span className="text-[9px] font-mono font-bold uppercase">{user.sunSign} 14°</span>
            </div>

            {/* Orbiting Planet Node Badges - NO EMOJIS */}
            {PLANETS.map((p) => {
              const rad = (p.angle * Math.PI) / 180
              const x = 200 + p.radius * Math.cos(rad) - 200
              const y = 200 + p.radius * Math.sin(rad) - 200

              const isSelected = selectedPlanet.id === p.id

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlanet(p)}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className={`absolute z-20 px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer shadow-md ${
                    isSelected 
                      ? "border-amber-400 bg-amber-500 text-black shadow-amber-500/20" 
                      : "border-white/10 bg-[#090A0F]/90 text-white hover:border-white/30"
                  }`}
                >
                  {p.name}
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

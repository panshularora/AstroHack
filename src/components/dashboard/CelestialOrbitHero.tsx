import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Target, Sun, Sparkles, Activity } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { useNatalChart, useUser } from "@/context/UserContext"
import { grahasInNatalHouses, houseEffect, type GrahaId } from "@/lib/vedic"

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
  icon: typeof Sun
}

export function CelestialOrbitHero() {
  const navigate = useNavigate()
  const { user } = useUser()
  const natal = useNatalChart()
  const [centerMode, setCenterMode] = useState<"sun" | "lagna" | "moon">("sun")
  const live = useMemo(() => grahasInNatalHouses(natal), [natal])

  const ICONS: Record<string, typeof Sun> = { sun: Sun, jupiter: Target, venus: Sparkles, mercury: Activity, moon: Sparkles }
  const COLORS: Record<string, string> = { sun: "#E4E4E7", jupiter: "#E4E4E7", venus: "#EC4899", mercury: "#38BDF8", moon: "#A1A1AA" }

  const PLANETS: Planet[] = useMemo(() => {
    const focusIds: GrahaId[] = ["sun", "moon", "jupiter", "venus", "mercury"]
    return focusIds.map((id, i) => {
      const b = live.bodies.find((x) => x.id === id)!
      return {
        id,
        name: b.name,
        sign: `${b.sign} ${b.degreeLabel}`,
        house: `${b.house} · ${b.houseArea}`,
        status: b.dignity,
        color: COLORS[id] || "#E4E4E7",
        angle: (b.sidereal + (centerMode === "moon" ? 40 : centerMode === "lagna" ? natal.lagna : 0)) % 360,
        radius: 95 + i * 28,
        details: houseEffect(id, b.house, b.dignity),
        icon: ICONS[id] || Sun,
      }
    })
  }, [centerMode, live, natal.lagna])

  const [selectedId, setSelectedId] = useState<string>("sun")

  const selectedPlanet = useMemo(() => {
    return PLANETS.find(p => p.id === selectedId) || PLANETS[0]
  }, [PLANETS, selectedId])

  const getCenterLabel = () => {
    switch (centerMode) {
      case "lagna": return { label: "LAGNA", val: `${user.ascendant}` }
      case "moon": return { label: "MOON", val: `${user.moonSign}` }
      default: return { label: "SUN", val: `${user.sunSign}` }
    }
  }

  const centerInfo = getCenterLabel()
  const SelectedIcon = selectedPlanet.icon

  return (
    <div className="relative rounded-none bg-[#090A0F] border border-neutral-800 p-6 sm:p-8 shadow-none font-sans">
      <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-none bg-zinc-100/5 border border-zinc-700 text-zinc-300 text-xs font-mono font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-none bg-zinc-200 animate-pulse" />
              Planetary Transits
            </span>

            {/* Core Selector */}
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-0.5 rounded-none font-mono text-[10px]">
              {(["sun", "lagna", "moon"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setCenterMode(mode)}
                  className={`px-3 py-1 rounded-none font-semibold uppercase transition-colors cursor-pointer ${
                    centerMode === mode ? "bg-zinc-100 text-black shadow" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${centerMode}-${selectedPlanet.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  {selectedPlanet.name} in {selectedPlanet.sign}
                </h1>
                <p className="text-xs font-mono text-neutral-400 mt-1 uppercase">
                  {user.sunSign} Sun · {user.moonSign} Moon · {user.ascendant} Lagna · {user.activeDasha}
                </p>
              </div>

              {/* Selected Planet Details */}
              <div className="p-4 rounded-none bg-neutral-900/60 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SelectedIcon className="w-4 h-4 text-zinc-300" />
                    <span className="text-xs font-bold text-white">{selectedPlanet.name} ({selectedPlanet.status})</span>
                  </div>
                  <Badge className="bg-zinc-100/5 text-zinc-200 border-zinc-700 text-[10px] font-mono">
                    {selectedPlanet.house}
                  </Badge>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">{selectedPlanet.details}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button 
              size="sm" 
              className="bg-zinc-100 text-black font-semibold hover:bg-zinc-200 rounded-none px-4 text-xs font-mono cursor-pointer"
              onClick={() => navigate("/app/predictions")}
            >
              <Target className="w-3.5 h-3.5 mr-1.5" /> View Predictions
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-neutral-800 text-white rounded-none text-xs font-mono cursor-pointer"
              onClick={() => navigate("/app/companion")}
            >
              AI Astrology Companion <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        {/* Right Column: Orbit System */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[350px]">
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
                  stroke={selectedPlanet.id === p.id ? "#E4E4E7" : "rgba(255, 255, 255, 0.1)"}
                  strokeWidth={selectedPlanet.id === p.id ? "2" : "1"}
                  strokeDasharray={selectedPlanet.id === p.id ? "6 6" : undefined}
                />
              ))}

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
                    stroke="#E4E4E7"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )
              })()}
            </svg>

            {/* Central Core */}
            <div
              onClick={() => {
                const nextMode = centerMode === "sun" ? "lagna" : centerMode === "lagna" ? "moon" : "sun"
                setCenterMode(nextMode)
              }}
              className="relative z-10 w-20 h-20 rounded-none bg-zinc-100 text-black flex flex-col items-center justify-center select-none cursor-pointer transition-transform hover:scale-105 shadow-none"
              title="Click to switch Focal Point"
            >
              <span className="text-[9px] font-mono uppercase font-bold text-black/70">CORE</span>
              <span className="text-xs font-extrabold">{centerInfo.label}</span>
              <span className="text-[9px] font-mono font-bold">{centerInfo.val}</span>
            </div>

            {/* Orbiting Planets */}
            {PLANETS.map((p) => {
              const rad = (p.angle * Math.PI) / 180
              const x = 200 + p.radius * Math.cos(rad) - 200
              const y = 200 + p.radius * Math.sin(rad) - 200

              const isSelected = selectedPlanet.id === p.id

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className={`absolute z-20 px-3 py-1.5 rounded-none border text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected 
                      ? "border-zinc-400 bg-zinc-100 text-black shadow-none scale-105" 
                      : "border-neutral-800 bg-[#090A0F] text-white hover:border-neutral-700"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-none ${isSelected ? "bg-black" : "bg-zinc-200"}`} />
                  <span>{p.name}</span>
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

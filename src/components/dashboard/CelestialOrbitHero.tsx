import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Target, Sun, Sparkles, Activity } from "lucide-react"
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
  icon: typeof Sun
}

export function CelestialOrbitHero() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [centerMode, setCenterMode] = useState<"sun" | "lagna" | "moon">("sun")

  // Zodiac signs array for dynamic planetary offset calculations
  const ZODIAC_SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]

  // Dynamically compute planetary placements based on user's entered birth details
  const PLANETS: Planet[] = useMemo(() => {
    const sunIndex = Math.max(0, ZODIAC_SIGNS.indexOf(user.sunSign))
    const ascIndex = Math.max(0, ZODIAC_SIGNS.indexOf(user.ascendant))

    const mercurySign = ZODIAC_SIGNS[(sunIndex + 1) % 12]
    const venusSign = ZODIAC_SIGNS[(sunIndex + 2) % 12]
    const jupiterSign = ZODIAC_SIGNS[(ascIndex + 4) % 12]

    if (centerMode === "lagna") {
      return [
        {
          id: "sun",
          name: "Sun",
          sign: `${user.sunSign} 14°`,
          house: "10th House",
          status: "Ascendant Ruler",
          color: "#F59E0B",
          angle: 45,
          radius: 100,
          details: `In Lagna Kundli (${user.ascendant} Ascendant), Sun in 10th House activates professional standing & clarity.`,
          icon: Sun
        },
        {
          id: "jupiter",
          name: user.transitPlanet || "Jupiter",
          sign: `${jupiterSign} 12°`,
          house: user.transitHouse || "7th House",
          status: "Active Transit",
          color: "#F59E0B",
          angle: 210,
          radius: 135,
          details: `Transiting ${user.transitPlanet || "Jupiter"} in ${jupiterSign} strengthens key partnerships and long-term goals.`,
          icon: Target
        },
        {
          id: "venus",
          name: "Venus",
          sign: `${venusSign} 08°`,
          house: "9th House",
          status: "Harmonious Transit",
          color: "#EC4899",
          angle: 300,
          radius: 165,
          details: `Venus in ${venusSign} brings balance, creativity, and spiritual peace.`,
          icon: Sparkles
        },
        {
          id: "mercury",
          name: "Mercury",
          sign: `${mercurySign} 02°`,
          house: "1st House",
          status: "Direct Motion",
          color: "#38BDF8",
          angle: 120,
          radius: 190,
          details: `Mercury in ${mercurySign} enhances communication clarity and strategic planning.`,
          icon: Activity
        }
      ]
    }

    if (centerMode === "moon") {
      return [
        {
          id: "sun",
          name: "Sun",
          sign: `${user.sunSign} 14°`,
          house: "4th House",
          status: "Inner Strength",
          color: "#F59E0B",
          angle: 285,
          radius: 100,
          details: `In Chandra Kundli, Sun grounds emotional resilience & personal vitality.`,
          icon: Sun
        },
        {
          id: "jupiter",
          name: user.transitPlanet || "Jupiter",
          sign: `${jupiterSign} 12°`,
          house: "1st House",
          status: "Favorable Alignment",
          color: "#F59E0B",
          angle: 15,
          radius: 135,
          details: `Jupiter alignment enhances intuition, optimism, and focus.`,
          icon: Target
        },
        {
          id: "venus",
          name: "Venus",
          sign: `${venusSign} 08°`,
          house: "3rd House",
          status: "Creative Transit",
          color: "#EC4899",
          angle: 195,
          radius: 165,
          details: `Venus in ${venusSign} supports artistic projects and peer collaboration.`,
          icon: Sparkles
        },
        {
          id: "mercury",
          name: "Mercury",
          sign: `${mercurySign} 02°`,
          house: "4th House",
          status: "Mental Peace",
          color: "#38BDF8",
          angle: 75,
          radius: 190,
          details: `Mercury in ${mercurySign} brings mental clarity for personal choices.`,
          icon: Activity
        }
      ]
    }

    // Default: SUN Mode (Surya Kundli)
    return [
      {
        id: "sun",
        name: "Sun",
        sign: `${user.sunSign} 14°`,
        house: "1st House",
        status: "Natal Sun",
        color: "#F59E0B",
        angle: 35,
        radius: 100,
        details: `Natal Sun at 14° ${user.sunSign} forms your core identity during ${user.activeDasha}.`,
        icon: Sun
      },
      {
        id: "jupiter",
        name: user.transitPlanet || "Jupiter",
        sign: `${jupiterSign} 12°`,
        house: user.transitHouse || "10th House",
        status: "Active Transit",
        color: "#F59E0B",
        angle: 160,
        radius: 135,
        details: `Transiting ${user.transitPlanet || "Jupiter"} in ${jupiterSign} (${user.transitHouse || "10th House"}) supports growth and focus.`,
        icon: Target
      },
      {
        id: "venus",
        name: "Venus",
        sign: `${venusSign} 08°`,
        house: "12th House",
        status: "Balanced Placement",
        color: "#EC4899",
        angle: 265,
        radius: 165,
        details: `Venus in ${venusSign} brings inner harmony and personal balance.`,
        icon: Sparkles
      },
      {
        id: "mercury",
        name: "Mercury",
        sign: `${mercurySign} 02°`,
        house: "1st House",
        status: "Direct Motion",
        color: "#38BDF8",
        angle: 330,
        radius: 190,
        details: `Mercury in ${mercurySign} aids swift decision-making and clear expression.`,
        icon: Activity
      }
    ]
  }, [centerMode, user])

  const [selectedId, setSelectedId] = useState<string>("sun")

  const selectedPlanet = useMemo(() => {
    return PLANETS.find(p => p.id === selectedId) || PLANETS[0]
  }, [PLANETS, selectedId])

  const getCenterLabel = () => {
    switch (centerMode) {
      case "lagna": return { label: "LAGNA", val: `${user.ascendant}` }
      case "moon": return { label: "MOON", val: `${user.sunSign}` }
      default: return { label: "SUN", val: `${user.sunSign}` }
    }
  }

  const centerInfo = getCenterLabel()
  const SelectedIcon = selectedPlanet.icon

  return (
    <div className="relative rounded-2xl bg-[#090A0F] border border-neutral-800 p-6 sm:p-8 shadow-xl font-sans">
      <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Planetary Transits
            </span>

            {/* Core Selector */}
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-0.5 rounded-full font-mono text-[10px]">
              {(["sun", "lagna", "moon"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setCenterMode(mode)}
                  className={`px-3 py-1 rounded-full font-semibold uppercase transition-colors cursor-pointer ${
                    centerMode === mode ? "bg-amber-500 text-black shadow" : "text-neutral-400 hover:text-white"
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
                  {user.sunSign} Sun · {user.ascendant} Ascendant · {user.activeDasha}
                </p>
              </div>

              {/* Selected Planet Details */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SelectedIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">{selectedPlanet.name} ({selectedPlanet.status})</span>
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/20 text-[10px] font-mono">
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
              className="bg-amber-500 text-black font-semibold hover:bg-amber-400 rounded-xl px-4 text-xs font-mono cursor-pointer"
              onClick={() => navigate("/app/predictions")}
            >
              <Target className="w-3.5 h-3.5 mr-1.5" /> View Predictions
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-neutral-800 text-white rounded-xl text-xs font-mono cursor-pointer"
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
                  stroke={selectedPlanet.id === p.id ? "#F59E0B" : "rgba(255, 255, 255, 0.1)"}
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
                    stroke="#F59E0B"
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
              className="relative z-10 w-20 h-20 rounded-full bg-amber-500 text-black flex flex-col items-center justify-center select-none cursor-pointer transition-transform hover:scale-105 shadow-lg"
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
                  className={`absolute z-20 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected 
                      ? "border-amber-400 bg-amber-500 text-black shadow-md scale-105" 
                      : "border-neutral-800 bg-[#090A0F] text-white hover:border-neutral-700"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-black" : "bg-amber-400"}`} />
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

import { motion } from "framer-motion"
import { Globe, RefreshCw, ArrowLeft, TrendingUp, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useUser } from "@/context/UserContext"

export function NavagrahaLive() {
  const navigate = useNavigate()
  const { user } = useUser()
  const currentTime = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })

  const planets = [
    { id: 'sun', name: 'Sun', sanskrit: 'Surya', symbol: '☉', currentSign: 'Cancer', house: 12, houseArea: 'Isolation & Spirituality', dignity: 'neutral', degreePos: '22°14\'', effect: 'Introspective period. Focus on hidden strengths and spiritual growth.' },
    { id: 'moon', name: 'Moon', sanskrit: 'Chandra', symbol: '☽', currentSign: 'Scorpio', house: 4, houseArea: 'Home & Mother', dignity: 'debilitated', degreePos: '8°33\'', effect: 'Emotional intensity at home. Avoid confrontations with family today.' },
    { id: 'mars', name: 'Mars', sanskrit: 'Mangal', symbol: '♂', currentSign: 'Taurus', house: 10, houseArea: 'Career & Reputation', dignity: 'neutral', degreePos: '15°51\'', effect: 'Strong drive for career advancement. Excellent for leadership decisions.' },
    { id: 'mercury', name: 'Mercury', sanskrit: 'Budha', symbol: '☿', currentSign: 'Leo', house: 1, houseArea: 'Self & Personality', dignity: 'neutral', degreePos: '3°22\'', effect: 'Sharp intellect and communication. Ideal for presentations and negotiations.' },
    { id: 'jupiter', name: 'Jupiter', sanskrit: 'Brihaspati', symbol: '♃', currentSign: 'Taurus', house: 10, houseArea: 'Career & Reputation', dignity: 'neutral', degreePos: '21°07\'', effect: 'Career blessings and wisdom. Excellent period for professional growth.' },
    { id: 'venus', name: 'Venus', sanskrit: 'Shukra', symbol: '♀', currentSign: 'Virgo', house: 2, houseArea: 'Wealth & Speech', dignity: 'debilitated', degreePos: '12°44\'', effect: 'Watch finances carefully. Avoid luxury spending for the next 18 days.' },
    { id: 'saturn', name: 'Saturn', sanskrit: 'Shani', symbol: '♄', currentSign: 'Aquarius', house: 7, houseArea: 'Partnership & Marriage', dignity: 'own sign', degreePos: '29°51\'', effect: 'Serious and disciplined partnerships. Long-term commitments strengthened.' },
    { id: 'rahu', name: 'Rahu', sanskrit: 'Rahu', symbol: '☊', currentSign: 'Pisces', house: 8, houseArea: 'Transformation & Secrets', dignity: 'neutral', degreePos: '16°20\'', effect: 'Hidden opportunities in research, inheritance matters, and occult knowledge.' },
    { id: 'ketu', name: 'Ketu', sanskrit: 'Ketu', symbol: '☋', currentSign: 'Virgo', house: 2, houseArea: 'Wealth & Speech', dignity: 'neutral', degreePos: '16°20\'', effect: 'Detachment from material wealth. Spiritual clarity around possessions.' },
  ]

  const getDignityClasses = (dignity: string) => {
    switch (dignity) {
      case 'exalted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'own sign': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'debilitated': return 'bg-red-500/10 text-red-400 border-red-500/20'
      default: return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'
    }
  }

  return (
    <div className="page-container max-w-5xl pb-28 font-sans">
      <div className="space-y-10">
        {/* Header */}
        <div className="border-b border-line/60 pb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-mono text-[11px] text-ink-tertiary hover:text-ink transition-colors mb-5 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
              <Globe className="w-4 h-4" />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">
              Navagraha Live Positions
            </p>
          </div>
          <h1 className="text-h1 font-display text-ink tracking-tight">Planetary Command</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Current positions of all 9 Grahas in your birth chart — updated as the sky moves.
          </p>
        </div>

        {/* Last Updated Bar */}
        <div className="p-3 rounded-lg bg-surface-2 border border-line/60 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-ink">
            <RefreshCw className="w-3.5 h-3.5" />
            Live Planetary Data
          </div>
          <div className="text-ink-tertiary">
            Last updated: {currentTime}
          </div>
        </div>

        {/* 9-Planet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planets.map((p) => (
            <motion.div key={p.id} whileHover={{ y: -2 }} className="p-5 rounded-lg bg-surface border border-line space-y-3 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest">{p.sanskrit}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${getDignityClasses(p.dignity)} capitalize`}>
                  {p.dignity}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-display text-lg">{p.symbol}</span>
                <span className="text-sm font-bold text-ink">{p.name}</span>
              </div>
              
              <div className="text-[11px] font-mono text-ink-secondary">
                {p.currentSign} · {p.degreePos} · House {p.house}
              </div>
              
              <div className="text-[10px] text-amber-400 font-mono font-bold uppercase">
                {p.houseArea}
              </div>
              
              <div className="border-t border-line/60 pt-3 mt-auto">
                <p className="text-xs text-ink-secondary leading-relaxed">{p.effect}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Transits Summary */}
        <div className="p-5 rounded-lg bg-surface border border-brand/30 space-y-3">
          <h2 className="text-body font-bold text-ink">Most Significant Active Transit</h2>
          <p className="text-sm text-ink-secondary leading-relaxed">
            Jupiter + Mars conjunct in your 10th House of Career — this transit activates your Leo Ascendant's Raj Yoga. Career recognition and authority peaks over the next 23 days.
          </p>
          <Button variant="outline" className="mt-2 w-full sm:w-auto font-mono text-xs" onClick={() => navigate('/app/transits')}>
            View Full Transit Timeline →
          </Button>
        </div>
      </div>
    </div>
  )
}

import { motion } from "framer-motion"
import { Sparkles, Star, ArrowLeft, Zap, Crown, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useUser } from "@/context/UserContext"

export function YogaReport() {
  const navigate = useNavigate()
  const { user } = useUser()

  const yogas = [
    {
      name: 'Gaja Kesari Yoga',
      sanskrit: 'Gaja Kesari Yoga',
      planets: 'Jupiter + Moon',
      houses: '4th & 10th House',
      strength: 'Powerful',
      isActive: true,
      dashaActivated: true,
      meaning: 'Named after the elephant (Gaja) and lion (Kesari), this combination produces a person of great intelligence, fame, and noble character. Your Moon in the 4th and Jupiter in the 10th create a natural leader.',
      manifestation: 'Career recognition, public respect, property gains, and the natural ability to command authority in professional settings.',
      color: 'amber'
    },
    {
      name: 'Budhaditya Yoga',
      sanskrit: 'Budhaditya Yoga',
      planets: 'Sun + Mercury',
      houses: '1st House Conjunction',
      strength: 'Strong',
      isActive: true,
      dashaActivated: false,
      meaning: 'Sun and Mercury united in the Ascendant house creates exceptional intelligence, analytical ability, and eloquent communication. You possess the sharp mind of a natural strategist.',
      manifestation: 'Success in intellectual pursuits, business negotiations, writing, and advisory roles.',
      color: 'cyan'
    },
    {
      name: 'Dhana Yoga',
      sanskrit: 'Dhana Yoga',
      planets: 'Jupiter + Venus',
      houses: '2nd & 11th House',
      strength: 'Moderate',
      isActive: true,
      dashaActivated: false,
      meaning: 'Lords of the wealth houses (2nd and 11th) connected through aspect creates consistent financial growth over the lifetime. Wealth comes through knowledge, relationships, and creative work.',
      manifestation: 'Steady financial accumulation, gains through investments, and prosperity after age 35.',
      color: 'emerald'
    },
    {
      name: 'Viparita Raja Yoga',
      sanskrit: 'Viparita Raja Yoga',
      planets: 'Saturn (8th lord)',
      houses: '12th House',
      strength: 'Latent',
      isActive: false,
      dashaActivated: false,
      meaning: 'A hidden Yoga that activates during Dasha periods. Saturn as 8th lord placed in the 12th creates sudden rise from unexpected circumstances — often after periods of hardship.',
      manifestation: 'Will activate during Saturn Dasha (after 2031). Sudden reversal of fortune in a positive direction.',
      color: 'purple'
    },
  ]

  return (
    <div className="page-container max-w-5xl pb-28 font-sans">
      <div className="space-y-10">
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
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">
              Kundli Yoga Analysis
            </p>
          </div>
          <h1 className="text-h1 font-display text-ink tracking-tight">Your Chart Yogas</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Planetary combinations forming in your natal Kundli. These are the configurations that define your life's core strengths and destiny.
          </p>
        </div>

        <div className="space-y-4">
          {yogas.map((yoga, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-lg bg-surface ${yoga.isActive ? (yoga.dashaActivated ? 'border border-amber-500/50' : 'border border-line') : 'border border-line opacity-60'} space-y-4`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-body font-bold text-ink">{yoga.name}</h3>
                  <Badge variant="outline" className="text-[10px] font-mono">{yoga.strength}</Badge>
                </div>
                {yoga.isActive && yoga.dashaActivated && (
                  <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] font-mono uppercase tracking-wider">
                    Active in Current Dasha
                  </span>
                )}
                {!yoga.isActive && (
                  <span className="text-[10px] font-mono text-ink-tertiary">
                    Activates in Saturn Dasha (2031)
                  </span>
                )}
              </div>
              
              <div className="font-mono text-xs text-ink-secondary flex items-center gap-2">
                <span>{yoga.planets}</span>
                <span className="text-ink-tertiary">•</span>
                <span>{yoga.houses}</span>
              </div>
              
              <p className="text-xs text-ink-secondary leading-relaxed">
                {yoga.meaning}
              </p>
              
              <div className="border-t border-line/60 pt-4">
                <div className="p-3 rounded-md bg-surface-2/60 border border-line/60 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-brand">Current Manifestation</div>
                  <p className="text-xs text-ink-secondary">{yoga.manifestation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-5 rounded-lg bg-surface border border-brand/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-ink-secondary flex-1">
            Your Kundli contains 3 active Yogas. Consult a verified astrologer to understand which Dasha periods activate each Yoga fully.
          </p>
          <Button onClick={() => navigate('/app/verified')} className="font-mono text-xs shrink-0">
            Consult Astrologer
          </Button>
        </div>
      </div>
    </div>
  )
}

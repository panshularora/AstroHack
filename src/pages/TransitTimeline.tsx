import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation, Moon, Star, Zap, RotateCcw, ChevronDown, ChevronUp, ArrowLeft, TrendingUp, Shield } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Tabs } from "@/components/ui/Tabs"
import { useUser } from "@/context/UserContext"

const transitEvents = [
  { id: 1, daysOut: 3, planet: 'Moon', transitType: 'Enters 10th House', house: 10, houseArea: 'Career', intensity: 'medium', icon: Moon, summary: 'Emotional focus shifts to professional matters. Good period for public presentations and connecting with senior colleagues.', opportunity: 'Career conversations, team leadership', caution: 'Avoid impulsive decisions in meetings', category: 'Career' },
  { id: 2, daysOut: 8, planet: 'Mercury', transitType: 'Trines Natal Jupiter', house: 1, houseArea: 'Self', intensity: 'high', icon: Star, summary: 'Mercury trine natal Jupiter creates a window of exceptional mental clarity. Contracts signed now carry fortune.', opportunity: 'Signing agreements, negotiations, publishing', caution: 'Do not overcommit', category: 'Career' },
  { id: 3, daysOut: 12, planet: 'Jupiter', transitType: 'Crosses Natal Moon', house: 4, houseArea: 'Home', intensity: 'high', icon: Star, summary: 'Jupiter crossing your natal Moon is one of the most emotionally expansive transits in 12 years. Expect blessings in family life, property, and inner peace.', opportunity: 'Property decisions, family harmony, emotional healing', caution: 'Guard against overindulgence', category: 'Relationships' },
  { id: 4, daysOut: 15, planet: 'Venus', transitType: 'Enters 2nd House', house: 2, houseArea: 'Finance', intensity: 'medium', icon: Star, summary: 'Venus in the 2nd house of wealth brings financial pleasures. Good period for earning and aesthetic purchases — but avoid debt.', opportunity: 'Income opportunities, luxury purchases', caution: 'Debt and overspending', category: 'Finance' },
  { id: 5, daysOut: 18, planet: 'Saturn', transitType: 'Aspects Natal Venus', house: 7, houseArea: 'Relationships', intensity: 'challenging', icon: Star, summary: 'Saturn aspecting natal Venus brings discipline into relationships. This is a testing period for partnerships — shallow connections fall away, deep ones strengthen.', opportunity: 'Strengthening committed relationships', caution: 'Relationship strain, avoid new romantic commitments', category: 'Relationships' },
  { id: 6, daysOut: 22, planet: 'Mars', transitType: 'Conjuncts Natal Sun', house: 1, houseArea: 'Self', intensity: 'high', icon: Zap, summary: 'Mars conjunct natal Sun energizes your willpower and ambition to a peak. Take bold action on delayed goals. Energy and courage are at their highest.', opportunity: 'Starting bold ventures, physical vitality, leadership', caution: 'Anger management, avoid conflicts', category: 'Career' },
  { id: 7, daysOut: 27, planet: 'Mercury', transitType: 'Goes Retrograde', house: 1, houseArea: 'Communication', intensity: 'challenging', icon: RotateCcw, summary: 'Mercury retrograde in your 1st house. Review, revise, and reflect — do not sign new contracts or launch new projects during this 3-week period.', opportunity: 'Review, revision, reconnecting with past contacts', caution: 'New contracts, technology purchases, major decisions', category: 'Career' },
]

const categories = ['All', 'Career', 'Relationships', 'Finance', 'Health']

export function TransitTimeline() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredEvents = transitEvents
    .filter(e => activeFilter === 'All' || e.category === activeFilter)
    .sort((a, b) => a.daysOut - b.daysOut)

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
              <Navigation className="w-4 h-4 text-brand" />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">
              Personal Transit Forecast
            </p>
          </div>
          
          <h1 className="text-h1 font-display text-ink tracking-tight">Your Upcoming Transits</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Planetary crossings over your natal positions in the next 30 days. These are not generic horoscopes — they are mapped to your {user.sunSign} Sun & {user.ascendant} Ascendant.
          </p>
        </div>

        {/* Filter Tabs */}
        <div>
          <Tabs 
            items={categories.map(c => ({ value: c, label: c }))}
            value={activeFilter}
            onChange={setActiveFilter}
            layoutId="transit-filter"
          />
        </div>

        {/* Transit Timeline */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map(event => {
              const Icon = event.icon
              const isExpanded = expandedId === event.id
              
              let leftBorder = 'border-l-blue-500/50'
              if (event.intensity === 'high') leftBorder = 'border-l-amber-500/50'
              else if (event.intensity === 'challenging') leftBorder = 'border-l-red-500/50'

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-5 rounded-r-lg bg-surface border border-line border-l-4 ${leftBorder} shadow-sm`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono">{`in ${event.daysOut} days`}</Badge>
                        <Badge variant="default">{event.houseArea}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-ink" />
                        <h3 className="text-base font-bold text-ink">
                          {event.planet} {event.transitType}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-ink-secondary leading-relaxed">
                        {event.summary}
                      </p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-2 border-t border-line/60 grid sm:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-bold text-emerald-500 mb-2 flex items-center gap-1.5">
                                  <TrendingUp className="w-3.5 h-3.5" /> Opportunities
                                </p>
                                <p className="text-xs text-ink-secondary">{event.opportunity}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-red-500 mb-2 flex items-center gap-1.5">
                                  <Shield className="w-3.5 h-3.5" /> Cautions
                                </p>
                                <p className="text-xs text-ink-secondary">{event.caution}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : event.id)}
                      className="p-2 rounded-full hover:bg-surface-2 text-ink-tertiary hover:text-ink transition-colors cursor-pointer shrink-0"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          {filteredEvents.length === 0 && (
            <div className="p-8 text-center bg-surface border border-line rounded-lg">
              <p className="text-ink-secondary font-mono text-sm">No major transits found for this category in the next 30 days.</p>
            </div>
          )}
        </div>

        {/* 6 Month Outlook Panel */}
        <div className="p-6 rounded-lg bg-surface border border-brand/30 space-y-4 mt-12">
          <h2 className="text-h2 font-display text-ink border-b border-line/60 pb-3">Major Chart Events &mdash; Next 6 Months</h2>
          <ul className="space-y-3 font-sans text-sm">
            <li className="flex items-center gap-3 text-ink-secondary">
              <Star className="w-4 h-4 text-brand shrink-0" />
              <span><strong className="text-ink">Jupiter enters 11th House</strong> (Oct 2026)</span>
            </li>
            <li className="flex items-center gap-3 text-ink-secondary">
              <RotateCcw className="w-4 h-4 text-brand shrink-0" />
              <span><strong className="text-ink">Saturn Station Retrograde</strong> (Nov 2026)</span>
            </li>
            <li className="flex items-center gap-3 text-ink-secondary">
              <Zap className="w-4 h-4 text-brand shrink-0" />
              <span><strong className="text-ink">Rahu-Ketu axis shift</strong> (Dec 2026 &mdash; major life change indicator)</span>
            </li>
          </ul>
          <div className="pt-2">
            <Button onClick={() => navigate('/app/verified')} className="w-full sm:w-auto">Book Consultation</Button>
          </div>
        </div>

      </div>
    </div>
  )
}

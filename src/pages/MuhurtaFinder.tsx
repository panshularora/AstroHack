import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Plane, Home, User, TrendingUp, Heart, Sparkles, Clock, FileText, ArrowLeft, Calendar, CheckCircle2, Star, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useUser } from "@/context/UserContext"

const purposes = [
  { id: 'business', icon: Briefcase, label: 'Start a Business', desc: 'Inauguration & launch dates' },
  { id: 'contract', icon: FileText, label: 'Sign a Contract', desc: 'Agreement & legal documents' },
  { id: 'travel', icon: Plane, label: 'Travel & Journey', desc: 'Departure timing' },
  { id: 'property', icon: Home, label: 'Property Purchase', desc: 'Real estate & registration' },
  { id: 'interview', icon: User, label: 'Job Interview', desc: 'Career opportunities' },
  { id: 'investment', icon: TrendingUp, label: 'Investment', desc: 'Stocks, mutual funds, gold' },
  { id: 'medical', icon: Heart, label: 'Medical Procedure', desc: 'Surgery & treatment dates' },
  { id: 'marriage', icon: Sparkles, label: 'Vivaha Muhurta', desc: 'Wedding & engagement' },
]

export function MuhurtaFinder() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null)
  const [queriesLeft, setQueriesLeft] = useState(3)

  const handleSelectPurpose = (id: string) => {
    if (queriesLeft > 0) {
      setSelectedPurpose(id)
      setQueriesLeft(prev => prev - 1)
    }
  }

  // Generate 7 days from today
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    let status = 'neutral'
    if ([0, 2, 5].includes(i)) status = 'auspicious'
    else if ([3, 6].includes(i)) status = 'avoid'
    return {
      index: i,
      date: d,
      status
    }
  })

  const firstAuspiciousDay = days.find(d => d.status === 'auspicious')?.date

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
              <Clock className="w-4 h-4 text-brand" />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">
              Muhurta Auspicious Timing
            </p>
          </div>
          
          <h1 className="text-h1 font-display text-ink tracking-tight">Muhurta Finder</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Planetary-aligned auspicious windows for your important events. Based on Panchang data, your natal chart, and classical Muhurta shastra.
          </p>
        </div>

        {/* Free Query Counter */}
        <div className="flex justify-between items-center">
          <p className="font-mono text-xs text-ink-tertiary">
            {queriesLeft} free Muhurta queries remaining this month
          </p>
        </div>

        {queriesLeft === 0 && !selectedPurpose && (
          <div className="p-6 rounded-lg bg-surface border border-line flex flex-col items-center justify-center text-center">
             <Star className="w-8 h-8 text-brand mb-3" />
             <h3 className="text-body font-bold text-ink">Upgrade to Unlock More Queries</h3>
             <p className="text-sm text-ink-secondary mt-2 mb-4">You have used all your free queries for this month.</p>
             <Button onClick={() => navigate('/app/verified')}>Upgrade Now</Button>
          </div>
        )}

        {/* Purpose Selector */}
        {(queriesLeft > 0 || selectedPurpose) && (
          <div className="space-y-4">
            {!selectedPurpose ? (
               <p className="text-sm font-bold text-ink">Select an event type to find your auspicious window:</p>
            ) : (
               <div className="flex items-center justify-between">
                 <p className="text-sm font-bold text-ink">Selected Event Type:</p>
                 <button onClick={() => setSelectedPurpose(null)} className="text-xs font-mono text-ink-tertiary hover:text-ink flex items-center gap-1 cursor-pointer">
                   <X className="w-3 h-3" /> Clear Selection
                 </button>
               </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {purposes.map((p) => {
                const isSelected = selectedPurpose === p.id
                return (
                  <button
                    key={p.id}
                    disabled={!!selectedPurpose && !isSelected}
                    onClick={() => handleSelectPurpose(p.id)}
                    className={`p-4 rounded-lg bg-surface border text-left transition-all cursor-pointer ${
                      isSelected ? 'border-brand ring-1 ring-brand' : 'border-line hover:border-line/80'
                    } ${!!selectedPurpose && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                        isSelected ? 'bg-brand/20 text-brand' : 'bg-surface-2 text-ink-tertiary'
                      }`}>
                        <p.icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-ink">{p.label}</h3>
                    </div>
                    <p className="text-xs text-ink-secondary">{p.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Results */}
        {selectedPurpose && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 mt-8"
          >
            {/* 7-Day Calendar */}
            <div className="space-y-4">
              <h2 className="text-h2 font-display text-ink">7-Day Muhurta Outlook</h2>
              <div className="flex overflow-x-auto pb-4 gap-4 snap-x">
                {days.map((day) => {
                  let bgColor = "bg-surface"
                  let borderColor = "border-line"
                  let textColor = "text-ink-secondary"
                  let labelColor = "text-ink-tertiary"
                  let icon = null

                  if (day.status === 'auspicious') {
                    bgColor = "bg-emerald-500/10"
                    borderColor = "border-emerald-500/50"
                    textColor = "text-emerald-500"
                    labelColor = "text-emerald-600"
                    icon = <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                  } else if (day.status === 'neutral') {
                    bgColor = "bg-amber-500/5"
                    borderColor = "border-amber-500/30"
                    textColor = "text-amber-500"
                    labelColor = "text-amber-600"
                  } else if (day.status === 'avoid') {
                    bgColor = "bg-red-500/5"
                    borderColor = "border-red-500/20"
                    textColor = "text-red-500/70"
                    labelColor = "text-red-500/80"
                  }

                  return (
                    <div key={day.index} className={`shrink-0 w-24 p-3 rounded-lg border flex flex-col items-center justify-center snap-center ${bgColor} ${borderColor}`}>
                      {icon}
                      <p className="text-xs font-mono uppercase tracking-widest text-ink-tertiary mb-1">
                        {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <p className={`text-2xl font-bold font-display ${textColor}`}>
                        {day.date.getDate()}
                      </p>
                      <p className={`text-[10px] font-mono uppercase tracking-wider mt-2 ${labelColor}`}>
                        {day.status}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Best Window */}
            {firstAuspiciousDay && (
              <div className="p-6 rounded-lg bg-surface border border-emerald-500/30 space-y-4">
                <Badge variant="success">Optimal Muhurta Window</Badge>
                <div>
                  <h3 className="text-h2 font-display text-ink">
                    {firstAuspiciousDay.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h3>
                  <p className="text-brand font-mono font-bold mt-1 text-sm">
                    10:22 AM – 12:44 PM (Abhijit Muhurta)
                  </p>
                </div>
                
                <p className="text-xs font-mono text-ink-secondary border-t border-line/60 pt-4 pb-2">
                  Tithi: Chaturdashi &middot; Nakshatra: Rohini &middot; Yoga: Shiva
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-bold text-ink">Why it's auspicious for you:</p>
                  <ul className="space-y-2 font-sans text-xs">
                    <li className="text-ink-secondary flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      Jupiter aspects your Ascendant lord during this window
                    </li>
                    <li className="text-ink-secondary flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      Moon is in Rohini, highly favorable for this specific event type
                    </li>
                    <li className="text-ink-secondary flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      No malefic transit interference in the key event houses
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
          </motion.div>
        )}
      </div>
    </div>
  )
}

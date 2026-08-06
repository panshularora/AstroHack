import { motion, AnimatePresence } from "framer-motion"
import { CalendarCheck, Target, ChevronDown, MessageSquare, Moon, Calendar } from "lucide-react"
import { mockTimelineEvents } from "@/lib/mock-data"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { useNavigate } from "react-router-dom"

export function LifeTimeline() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [expandedId, setExpandedId] = useState<string | null>(mockTimelineEvents[0]?.id || null)

  const isDemo = user.id === "u1" || user.email?.toLowerCase() === "arjun.sharma@example.com"

  if (!isDemo && (!user.consultations || user.consultations.length === 0)) {
    return (
      <div className="p-12 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center space-y-4 mb-16 font-sans">
        <Calendar className="w-10 h-10 text-neutral-600 mx-auto" />
        <h3 className="text-lg font-bold text-white">No Timeline Milestones Yet</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          As a new user, your life journey timeline will automatically build as you book consultations, verify predictions, and log remedies.
        </p>
        <Button
          onClick={() => navigate("/app/match")}
          className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs px-5 py-2 cursor-pointer mt-2"
        >
          Book First Session
        </Button>
      </div>
    )
  }

  return (
    <div className="mb-16 font-sans">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Life Timeline</h2>
        <p className="text-xs text-neutral-400">Your journey mapped in reverse chronological order.</p>
      </div>

      <div className="relative pl-8 md:pl-10 space-y-10">
        <div className="absolute left-[11px] md:left-[19px] top-4 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-neutral-800 to-transparent" />

        {mockTimelineEvents.map((event, i) => {
          const isExpanded = expandedId === event.id

          if (event.type === "milestone") {
            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <div className="absolute left-[-2rem] md:left-[-2.5rem] w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                  <Target className="w-3 h-3 text-amber-400" />
                </div>
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 flex items-center justify-between ml-2">
                  <div>
                    <p className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider mb-1">
                      {new Date(event.date).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}
                    </p>
                    <h3 className="text-base font-bold text-white">{event.title}</h3>
                  </div>
                </div>
              </motion.div>
            )
          }

          return (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative group"
            >
              <div className="absolute left-[-2rem] md:left-[-2.5rem] w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                <CalendarCheck className="w-3 h-3 text-amber-400" />
              </div>
              
              <div 
                className={`bg-neutral-900/60 border ${isExpanded ? 'border-amber-500/50' : 'border-neutral-800 hover:border-neutral-700'} rounded-xl p-6 ml-2 transition-all cursor-pointer`}
                onClick={() => setExpandedId(isExpanded ? null : event.id)}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img src={event.astrologer?.avatar} alt={event.astrologer?.name} className="w-10 h-10 rounded-full border border-neutral-700 object-cover shrink-0" />
                    <div>
                      <p className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider mb-1">
                        {new Date(event.date).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})} • {event.duration} mins
                      </p>
                      <h3 className="text-lg font-bold text-white mb-0.5 leading-tight">{event.title}</h3>
                      <p className="text-xs text-amber-400 font-medium">with {event.astrologer?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800 shrink-0 self-end md:self-start">
                    <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isExpanded ? 'rotate-180 text-white' : ''}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden border-t border-neutral-800"
                    >
                      <div className="pt-4 grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-black/40 rounded-xl p-3 text-center border border-neutral-800">
                          <Target className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                          <div className="text-lg font-bold text-white">{event.predictionsCount}</div>
                          <div className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider">Predictions</div>
                        </div>
                        <div className="bg-black/40 rounded-xl p-3 text-center border border-neutral-800">
                          <Moon className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                          <div className="text-lg font-bold text-white">{event.remediesCount}</div>
                          <div className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider">Remedies</div>
                        </div>
                        <div className="bg-black/40 rounded-xl p-3 text-center border border-neutral-800">
                          <MessageSquare className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                          <div className="text-lg font-bold text-white">{event.notesCount}</div>
                          <div className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider">Notes</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

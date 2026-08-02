import { motion, AnimatePresence } from "framer-motion"
import { CalendarCheck, Target, ChevronDown, MessageSquare, Moon } from "lucide-react"
import { mockTimelineEvents } from "@/lib/mock-data"
import { useState } from "react"
import { Button } from "@/components/ui/Button"

export function LifeTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(mockTimelineEvents[0].id)

  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Life Timeline</h2>
        <p className="text-[#9CA3AF]">Your journey mapped in reverse chronological order.</p>
      </div>

      <div className="relative pl-8 md:pl-10 space-y-10">
        {/* Continuous Line */}
        <div className="absolute left-[11px] md:left-[19px] top-4 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent" />

        {mockTimelineEvents.map((event, i) => {
          const isExpanded = expandedId === event.id

          if (event.type === "milestone") {
            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute left-[-2rem] md:left-[-2.5rem] w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center border border-gold/30 shadow-[0_0_10px_rgba(250,204,21,0.2)]">
                  <Target className="w-3 h-3 text-gold" />
                </div>
                <div className="bg-gold/5 border border-gold/10 rounded-3xl p-5 md:p-6 flex items-center justify-between ml-2">
                  <div>
                    <p className="text-xs text-gold font-bold uppercase tracking-wider mb-1">{new Date(event.date).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}</p>
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
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="absolute left-[-2rem] md:left-[-2.5rem] w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 group-hover:bg-primary/40 transition-colors shadow-[0_0_10px_rgba(124,58,237,0.2)]">
                <CalendarCheck className="w-3 h-3 text-primary" />
              </div>
              
              <div 
                className={`bg-card border ${isExpanded ? 'border-primary/50 shadow-[0_0_20px_rgba(124,58,237,0.1)]' : 'border-white/10 hover:border-white/20'} rounded-3xl p-6 md:p-8 ml-2 transition-all cursor-pointer`}
                onClick={() => setExpandedId(isExpanded ? null : event.id)}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img src={event.astrologer?.avatar} alt={event.astrologer?.name} className="w-12 h-12 rounded-full border-2 border-white/10 object-cover shrink-0" />
                    <div>
                      <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1">
                        {new Date(event.date).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})} • {event.duration} mins
                      </p>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-tight">{event.title}</h3>
                      <p className="text-sm text-primary font-medium">with {event.astrologer?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 shrink-0 self-end md:self-start">
                    <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform ${isExpanded ? 'rotate-180 text-white' : ''}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <div className="pt-6 grid grid-cols-3 gap-3 md:gap-4 mb-6">
                        <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                          <Target className="w-5 h-5 text-secondary mx-auto mb-2" />
                          <div className="text-xl font-bold text-white">{event.predictionsCount}</div>
                          <div className="text-[10px] md:text-xs text-[#9CA3AF] uppercase font-bold tracking-wider mt-1">Predictions</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                          <Moon className="w-5 h-5 text-lavender mx-auto mb-2" />
                          <div className="text-xl font-bold text-white">{event.remediesCount}</div>
                          <div className="text-[10px] md:text-xs text-[#9CA3AF] uppercase font-bold tracking-wider mt-1">Remedies</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                          <MessageSquare className="w-5 h-5 text-primary mx-auto mb-2" />
                          <div className="text-xl font-bold text-white">{event.notesCount}</div>
                          <div className="text-[10px] md:text-xs text-[#9CA3AF] uppercase font-bold tracking-wider mt-1">Notes</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button className="flex-1 h-12 text-sm font-bold shadow-lg">View Full Details</Button>
                        <Button variant="outline" className="flex-1 h-12 text-sm font-bold border-white/20 text-white hover:bg-white/5">Replay Audio</Button>
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

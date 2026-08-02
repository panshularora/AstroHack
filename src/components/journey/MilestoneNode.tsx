import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Flag } from 'lucide-react'
import type { Milestone } from '@/lib/mock-data'
import { EventCard } from './EventCard'

export function MilestoneNode({ milestone, index }: { milestone: Milestone, index: number }) {
  const [expanded, setExpanded] = useState(false)
  const isEven = index % 2 === 0

  return (
    <div className={`relative flex flex-col md:flex-row items-start gap-8 w-full group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      
      {/* Node Dot (Visible on Desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-background bg-card items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)] z-10 transition-transform group-hover:scale-125 top-8">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>

      {/* Node Dot (Visible on Mobile) */}
      <div className="md:hidden absolute left-0 w-6 h-6 -translate-x-[11px] rounded-full border-4 border-background bg-card flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)] z-10 top-8">
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      </div>

      {/* Spacer for empty side on desktop */}
      <div className="w-1/2 hidden md:block" />

      {/* Content Card */}
      <motion.div 
        layout
        onClick={() => setExpanded(!expanded)}
        className="w-full pl-6 md:pl-0 md:w-[calc(50%-2rem)] bg-card border border-white/10 hover:border-primary/50 rounded-3xl p-6 cursor-pointer relative overflow-hidden transition-colors shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
              <Flag className="w-3 h-3" /> {milestone.category}
            </div>
            <span className="text-xs text-[#9CA3AF]">{milestone.date}</span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
          <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{milestone.description}</p>
          
          <div className="flex items-center justify-between text-xs text-[#9CA3AF] border-t border-white/5 pt-4">
            <span>{milestone.events.length} Connected Events</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="relative z-10 mt-4 space-y-3 pt-4 border-t border-white/5"
            >
              {milestone.events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

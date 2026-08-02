import { useState } from "react"
import { motion } from "framer-motion"
import { Moon, Bell, Edit3 } from "lucide-react"
import { mockLatestSession } from "@/lib/mock-data"

export function RemediesManager() {
  const [remedies, setRemedies] = useState(mockLatestSession.remedies)

  const toggleReminder = (id: string) => {
    setRemedies(rs => rs.map(r => r.id === id ? { ...r, recurring: !r.recurring } : r))
  }

  return (
    <div className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Moon className="w-5 h-5 text-ink-secondary" /> Recommended Remedies
        </h2>
        <p className="text-[#9CA3AF]">Turn advice into action. We will seamlessly add these to your Daily Cosmic Brief.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {remedies.map((r, i) => (
          <motion.div 
            key={r.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-line rounded-lg p-6 md:p-8 flex flex-col hover:border-line-strong transition-colors"
          >
            <h3 className="text-xl font-bold text-white mb-3">{r.title}</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed mb-8 flex-1">
              {r.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-line-subtle">
                <div className="flex items-center gap-3 text-sm text-white/90 font-medium">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${r.recurring ? 'bg-brand/20 text-brand' : 'bg-white/5 text-[#9CA3AF]'}`}>
                    <Bell className="w-4 h-4" />
                  </div>
                  Daily Reminder
                </div>
                <button 
                  onClick={() => toggleReminder(r.id)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 cursor-pointer ${r.recurring ? 'bg-brand' : 'bg-white/10'}`}
                >
                  <motion.div 
                    layout
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ x: r.recurring ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute top-3.5 left-4 text-[#9CA3AF]"><Edit3 className="w-4 h-4" /></div>
                <input 
                  type="text" 
                  placeholder="Add a personal note..." 
                  className="w-full bg-navy/50 border border-line rounded-lg py-3 pl-12 pr-4 text-sm text-white placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-brand/50 transition-colors"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

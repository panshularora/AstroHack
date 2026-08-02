import { motion } from "framer-motion"
import { BookOpen, Mic, Play, MoreVertical } from "lucide-react"
import { mockJournalEntries } from "@/lib/mock-data"

export function PersonalJournal() {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Personal Journal</h2>
        <p className="text-[#9CA3AF]">Your private reflections and emotional check-ins.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockJournalEntries.map((j, i) => (
          <motion.div
            key={j.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 relative group hover:border-white/20 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${j.type === 'voice' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                  {j.type === 'voice' ? <Mic className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-0.5">
                    {new Date(j.date).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}
                  </p>
                  <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Mood: {j.mood}</p>
                </div>
              </div>
              <button className="text-[#9CA3AF] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {j.type === 'voice' ? (
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 mt-6">
                <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 hover:bg-primary/80 transition-colors shadow-lg cursor-pointer">
                  <Play className="w-4 h-4 ml-0.5" />
                </button>
                <div className="flex-1 w-full h-8 flex items-center gap-1 opacity-60">
                  {Array.from({ length: 30 }).map((_, idx) => (
                    <div key={idx} className="flex-1 bg-white rounded-full" style={{ height: `${Math.max(10, Math.random() * 100)}%` }} />
                  ))}
                </div>
                <span className="text-xs text-[#9CA3AF] font-medium shrink-0">{j.duration}</span>
              </div>
            ) : (
              <p className="text-sm text-white/90 leading-relaxed italic mt-6">
                "{j.content}"
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

import { useState } from "react"
import { motion } from "framer-motion"
import { Smile, Zap, Coffee, CloudRain, Wind, Sun } from "lucide-react"

const moods = [
  { id: "calm", label: "Calm", icon: Coffee, color: "text-blue-400" },
  { id: "hopeful", label: "Hopeful", icon: Sun, color: "text-yellow-400" },
  { id: "motivated", label: "Motivated", icon: Zap, color: "text-gold" },
  { id: "happy", label: "Happy", icon: Smile, color: "text-green-400" },
  { id: "confused", label: "Confused", icon: Wind, color: "text-purple-400" },
  { id: "stressed", label: "Stressed", icon: CloudRain, color: "text-red-400" },
]

export function MoodCheckIn() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">How are you feeling right now?</h2>
        <p className="text-[#9CA3AF]">Tracking your mood helps us personalize your future Daily Briefs.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {moods.map((m, i) => {
          const isSelected = selected === m.id
          return (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(m.id)}
              className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                isSelected 
                  ? "bg-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.05)] scale-105" 
                  : "bg-surface border-line-subtle hover:border-line-strong hover:bg-white/5"
              }`}
            >
              <m.icon className={`w-8 h-8 ${m.color} ${!isSelected && 'opacity-70'}`} />
              <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-[#9CA3AF]'}`}>{m.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

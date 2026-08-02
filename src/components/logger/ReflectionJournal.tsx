import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Mic, Square, Play } from "lucide-react"

export function ReflectionJournal() {
  const [isRecording, setIsRecording] = useState(false)
  const [recorded, setRecorded] = useState(false)
  
  return (
    <div className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-secondary" /> Personal Reflection
        </h2>
        <p className="text-[#9CA3AF]">Record how you felt about the session. This will be securely saved to your Cosmic Memory.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8">
        <textarea 
          placeholder="I felt really relieved after Dr. Vance explained the Saturn transit..."
          className="w-full h-32 bg-navy/30 border border-white/5 rounded-2xl p-5 text-white placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-secondary/50 resize-none transition-colors mb-6"
        />

        <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/5">
          <button 
            onClick={() => {
              if (isRecording) {
                setIsRecording(false)
                setRecorded(true)
              } else {
                setIsRecording(true)
                setRecorded(false)
              }
            }}
            className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
              isRecording 
                ? 'bg-red-500/20 text-red-500 animate-pulse border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : recorded
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isRecording ? <Square className="w-5 h-5 fill-current" /> : recorded ? <Play className="w-6 h-6 fill-current ml-1" /> : <Mic className="w-6 h-6" />}
          </button>

          <div className="flex-1 w-full">
            <div className="flex justify-between text-xs font-bold text-[#9CA3AF] mb-3 uppercase tracking-wider">
              <span className={isRecording ? 'text-red-400' : recorded ? 'text-primary' : ''}>
                {isRecording ? "Recording..." : recorded ? "Voice Note Saved" : "Add a Voice Note"}
              </span>
              <span>{isRecording ? "00:12" : recorded ? "01:45" : "00:00"}</span>
            </div>
            
            <div className="h-10 flex items-center gap-1 w-full opacity-60">
              {/* Simulated Waveform */}
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-full ${isRecording ? 'bg-red-500' : recorded ? 'bg-primary' : 'bg-white/20'}`}
                  animate={isRecording ? { height: Math.random() * 30 + 10 } : { height: recorded ? [10, 25, 15, 30, 20][i % 5] : 4 }}
                  transition={isRecording ? { repeat: Infinity, duration: 0.2, repeatType: "reverse" } : {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

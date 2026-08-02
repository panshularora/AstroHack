import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { useState } from "react"

interface StepPreferencesProps {
  onNext: () => void
  onBack: () => void
}

export function StepPreferences({ onNext, onBack }: StepPreferencesProps) {
  const [mode, setMode] = useState("video")
  const [budget, setBudget] = useState(5)
  const languages = ["English", "Spanish", "Hindi", "Mandarin", "French"]
  const [selectedLang, setSelectedLang] = useState("English")

  return (
    <motion.div
      key="step-prefs"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Customize your experience</h2>
      
      <div className="space-y-8 mb-10">
        
        {/* Consultation Mode */}
        <div className="bg-card border border-white/10 p-6 md:p-8 rounded-3xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Consultation Mode</h3>
          <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/5">
            {['chat', 'voice', 'video'].map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-3 rounded-lg text-sm font-bold capitalize transition-all cursor-pointer ${
                  mode === m ? "bg-white/10 text-white shadow-sm" : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="bg-card border border-white/10 p-6 md:p-8 rounded-3xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Preferred Language</h3>
          <div className="flex flex-wrap gap-3">
            {languages.map(l => (
              <button
                key={l}
                onClick={() => setSelectedLang(l)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                  selectedLang === l 
                    ? "bg-primary/20 border-primary text-white" 
                    : "bg-transparent border-white/10 text-[#9CA3AF] hover:border-white/30 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Slider */}
        <div className="bg-card border border-white/10 p-6 md:p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Budget per minute</h3>
            <span className="text-primary font-bold text-xl">${budget}</span>
          </div>
          <input 
            type="range" 
            min="1" max="10" step="1"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-primary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer outline-none"
          />
          <div className="flex justify-between text-xs text-[#9CA3AF] mt-3 font-medium">
            <span>$1</span>
            <span>$10+</span>
          </div>
        </div>

      </div>

      <div className="flex justify-between items-center">
        <button onClick={onBack} className="px-6 py-3 font-medium text-[#9CA3AF] hover:text-white transition-colors cursor-pointer">
          Back
        </button>
        <Button
          onClick={onNext}
          className="px-10 h-14 text-base font-bold shadow-[0_0_15px_rgba(107,33,168,0.4)]"
        >
          Find My Match
        </Button>
      </div>
    </motion.div>
  )
}

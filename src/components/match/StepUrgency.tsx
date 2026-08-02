import { motion } from "framer-motion"
import { Zap, CalendarClock, MessageSquareText, Search } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface StepUrgencyProps {
  urgency: string | null
  onSelect: (u: string) => void
  onNext: () => void
  onBack: () => void
}

const urgencies = [
  { id: "now", label: "Connect Now", subtext: "Instantly speak to an available expert.", icon: Zap },
  { id: "schedule", label: "Schedule for Later", subtext: "Book a dedicated time slot.", icon: CalendarClock },
  { id: "async", label: "Ask an Async Question", subtext: "Send a question and get a detailed audio/text reply within 24h.", icon: MessageSquareText },
  { id: "browse", label: "Browse Experts", subtext: "Just looking around for the perfect match.", icon: Search },
]

export function StepUrgency({ urgency, onSelect, onNext, onBack }: StepUrgencyProps) {
  return (
    <motion.div
      key="step-urgency"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">How urgently do you need guidance?</h2>
      
      <div className="flex flex-col gap-4 mb-10">
        {urgencies.map((u, i) => {
          const isSelected = urgency === u.id
          return (
            <motion.button
              key={u.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(u.id)}
              className={`p-6 rounded-2xl border flex items-center text-left transition-all cursor-pointer ${
                isSelected 
                  ? "bg-primary/20 border-primary shadow-[0_0_20px_rgba(107,33,168,0.3)]" 
                  : "bg-card border-white/10 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-6 shrink-0 transition-colors ${isSelected ? "bg-primary text-white" : "bg-white/5 text-white/50"}`}>
                <u.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-1 transition-colors ${isSelected ? "text-white" : "text-white/80"}`}>{u.label}</h3>
                <p className={`text-sm transition-colors ${isSelected ? "text-lavender/80" : "text-[#9CA3AF]"}`}>{u.subtext}</p>
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="flex justify-between items-center">
        <button onClick={onBack} className="px-6 py-3 font-medium text-[#9CA3AF] hover:text-white transition-colors cursor-pointer">
          Back
        </button>
        <Button
          disabled={!urgency}
          onClick={onNext}
          className="px-10 h-14 text-base font-bold"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  )
}

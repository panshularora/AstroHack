import { motion } from "framer-motion"
import { Briefcase, Heart, Users, TrendingUp, Activity, GraduationCap, Sparkles, Compass } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface StepTopicProps {
  selectedTopic: string | null
  onSelect: (topic: string) => void
  onNext: () => void
}

const topics = [
  { id: "career", label: "Career & Work", icon: Briefcase },
  { id: "love", label: "Love & Relationships", icon: Heart },
  { id: "family", label: "Marriage & Family", icon: Users },
  { id: "finance", label: "Finance & Business", icon: TrendingUp },
  { id: "health", label: "Health & Wellness", icon: Activity },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "spiritual", label: "Spiritual Guidance", icon: Sparkles },
  { id: "general", label: "General Life Advice", icon: Compass },
]

export function StepTopic({ selectedTopic, onSelect, onNext }: StepTopicProps) {
  return (
    <motion.div
      key="step-topic"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">What do you need guidance about today?</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {topics.map((topic, i) => {
          const isSelected = selectedTopic === topic.id
          return (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(topic.id)}
              className={`p-6 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected 
                  ? "bg-primary/20 border-primary shadow-[0_0_20px_rgba(107,33,168,0.3)]" 
                  : "bg-card border-white/10 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <topic.icon className={`w-8 h-8 mb-4 transition-colors ${isSelected ? "text-primary" : "text-white/50"}`} />
              <span className={`font-semibold text-sm transition-colors ${isSelected ? "text-white" : "text-[#9CA3AF]"}`}>{topic.label}</span>
            </motion.button>
          )
        })}
      </div>

      <div className="flex justify-center">
        <Button
          disabled={!selectedTopic}
          onClick={onNext}
          className="px-10 h-14 text-base font-bold"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  )
}

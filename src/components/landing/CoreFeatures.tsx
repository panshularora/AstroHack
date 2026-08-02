import { motion } from "framer-motion"
import { Brain, ShieldCheck, Target, BookOpen, Sparkles, Calendar } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Companion",
    description: "Your AI remembers every consultation, prediction, and remedy. Ask anything, anytime — it knows your full cosmic history.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Astrologers",
    description: "Every astrologer is vetted with verified accuracy scores. No more guesswork — see real outcomes before you book.",
  },
  {
    icon: Target,
    title: "Prediction Tracking",
    description: "Log predictions with target dates and confidence levels. We track them to completion and hold astrologers accountable.",
  },
  {
    icon: BookOpen,
    title: "Cosmic Memory",
    description: "Your entire astrological journey in one place. Every reading, remedy, and milestone — permanently archived.",
  },
  {
    icon: Calendar,
    title: "Daily Briefs",
    description: "Wake up to a personalized cosmic brief. Energy scores, opportunities, cautions, and smart priorities — every morning.",
  },
  {
    icon: Sparkles,
    title: "Smart Match",
    description: "Tell us your concern. Our AI matches you with the right astrologer based on specialty, accuracy, and your chart.",
  },
]

export function CoreFeatures() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-[13px] font-medium text-brand uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink mb-4 text-balance">
            Everything astrology should have been.
          </h2>
          <p className="text-lg text-ink-secondary leading-relaxed">
            A complete platform that turns scattered readings into a continuous, intelligent system for your life.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line rounded-xl overflow-hidden border border-line">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-surface p-8 hover:bg-surface-2/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-2 border border-line flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5 text-brand" />
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">{feature.title}</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
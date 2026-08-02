import { motion } from "framer-motion"
import { BrainCircuit, History, Sparkles, ShieldCheck, ArrowRight } from "lucide-react"

const features = [
  {
    title: "Cosmic Memory",
    description: "Every consultation is remembered forever. We build a lifelong context of your cosmic journey.",
    icon: BrainCircuit,
    color: "text-lavender",
    bg: "bg-lavender/10",
  },
  {
    title: "Prediction Tracking",
    description: "Track every prediction until it comes true. Hold astrologers accountable with transparent timelines.",
    icon: History,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Daily Cosmic Brief",
    description: "Personalized guidance generated from your own journey, not generic horoscopes.",
    icon: Sparkles,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    title: "AstroVerified",
    description: "Transparent astrologer profiles with verified prediction accuracy and real trust metrics.",
    icon: ShieldCheck,
    color: "text-secondary",
    bg: "bg-secondary/10",
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why AstroLive 2.0?</h2>
          <p className="text-[#9CA3AF] text-lg">
            We've reimagined astrology from the ground up to focus on long-term value, trust, and personalized AI memory.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-card border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-[#9CA3AF] leading-relaxed mb-6">
                {feature.description}
              </p>
              <button className="flex items-center text-sm font-semibold text-white/70 group-hover:text-primary transition-colors cursor-pointer">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

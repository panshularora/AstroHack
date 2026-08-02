import { motion } from "framer-motion"

const steps = [
  "Book Consultation",
  "AI Extracts Predictions",
  "Saved to Cosmic Memory",
  "Personalized Daily Guidance",
  "Smart Follow-Ups",
  "Stronger Trust",
  "Lifelong Companion",
]

export function TimelineSection() {
  return (
    <section className="py-24 bg-navy relative border-y border-white/5">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-[#9CA3AF] text-lg">The continuous loop of your cosmic journey.</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-row md:flex-col items-center md:text-center group w-full md:w-[120px]"
              >
                <div className="w-8 h-8 rounded-full bg-card border border-primary/50 flex-shrink-0 md:mb-6 relative group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-[0_0_15px_rgba(107,33,168,0.3)] flex items-center justify-center mr-4 md:mr-0 z-10">
                   <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-sm font-medium text-[#9CA3AF] group-hover:text-white transition-colors">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

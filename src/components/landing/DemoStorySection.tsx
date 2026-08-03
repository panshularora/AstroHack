import { motion } from "framer-motion"
import { MessageCircle, FileText, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Consult",
    description: "Talk to a verified astrologer about career, marriage, finance — anything with a date attached.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Extract",
    description: "When the session ends, AI pulls dated predictions into receipts. You confirm what to track.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Verify",
    description: "When the window closes, we ask: did it happen? Your answer updates the astrologer's verified score.",
  },
]

export function DemoStorySection() {
  return (
    <section id="features" className="ivory-content py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-overline text-brand mb-3">How it works</p>
          <h2 className="font-display text-4xl text-ink-ivory mb-4 text-balance">
            One loop. Three steps. Years of trust.
          </h2>
          <p className="text-lg text-ink-ivory-secondary leading-relaxed">
            Not another horoscope app. Not another chatbot. A system that holds astrologers accountable over time.
          </p>
        </div>

        <div className="space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 py-8 border-b border-ivory-border last:border-b-0"
            >
              <div className="w-12 h-12 rounded-md bg-brand-light border border-brand/20 flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand mb-1">{s.step} · {s.title}</p>
                <p className="text-base text-ink-ivory-secondary leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

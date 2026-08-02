import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { mockSuccessStories } from "@/lib/mock-data"

export function TestimonialsSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-surface-2/50 border-y border-line">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-[13px] font-medium text-brand uppercase tracking-wider mb-3">
            Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink mb-4 text-balance">
            Real outcomes, tracked over time.
          </h2>
          <p className="text-lg text-ink-secondary leading-relaxed">
            Not just readings — verified results. Here's what happens when astrology becomes a continuous practice.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {mockSuccessStories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-line bg-surface p-8 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold-bright text-gold-bright" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base text-ink leading-relaxed mb-6">
                "{story.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-line">
                <div className="w-10 h-10 rounded-full bg-brand-light text-brand flex items-center justify-center text-sm font-semibold ring-1 ring-line">
                  {story.image}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{story.name}</p>
                  <p className="text-[13px] text-ink-tertiary">{story.role}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-success-light text-success">
                    {story.milestone}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
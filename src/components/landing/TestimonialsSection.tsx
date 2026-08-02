import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Madhav predicted my company switch would happen before Diwali. I got the offer October 14th. I logged it in Cosmic Memory the same night.",
    name: "Priya S.",
    location: "Mumbai",
    sign: "Scorpio ♏",
    consultations: "4 consultations",
  },
  {
    quote: "I was sceptical about the accuracy tracking. Then Pandit Rajesh's relationship prediction came true in 6 weeks exactly. The proof is right there in my timeline.",
    name: "Arjun K.",
    location: "Bangalore",
    sign: "Leo ♌",
    consultations: "7 consultations",
  },
  {
    quote: "No other app remembered what my last astrologer told me. AstroLive 2.0 literally nudged me 3 days before my predicted career window opened.",
    name: "Sneha R.",
    location: "Delhi",
    sign: "Libra ♎",
    consultations: "2 consultations",
  },
]

export function TestimonialsSection() {
  return (
    <section id="about" className="ivory-content py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-overline text-brand mb-3">
            Stories
          </p>
          <h2 className="font-display text-4xl text-ink-ivory mb-4 text-balance">
            Real outcomes, tracked over time.
          </h2>
          <p className="text-lg text-ink-ivory-secondary leading-relaxed">
            Not just readings — verified results. Here's what happens when astrology becomes a continuous practice.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-md bg-ivory-card border border-ivory-border shadow-sm p-8 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold-bright text-gold-bright" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base text-ink-ivory leading-relaxed mb-6 flex-1">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-ivory-border">
                <div className="w-10 h-10 rounded-md bg-brand-light text-brand flex items-center justify-center text-sm font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-ivory">{t.name}, {t.location}</p>
                  <p className="text-[13px] text-ink-ivory-tertiary font-mono">{t.sign} — {t.consultations}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
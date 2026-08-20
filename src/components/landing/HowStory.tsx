import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useI18n } from "@/lib/i18n"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const STEPS = {
  en: [
    { t: "Talk live", d: "Chat, call, or video. Your chart is already open when they pick up." },
    { t: "Date the claim", d: "What they said, with a window. A receipt you can reopen tomorrow." },
    { t: "Mark the result", d: "Yes, partly, or no. Honesty is the product." },
    { t: "Keep the card", d: "A public page anyone can open. No login." },
    { t: "They come with you", d: "Your invite is on the link. You both get ₹50 of talk time." },
  ],
  hi: [
    { t: "लाइव बात", d: "चैट, कॉल या वीडियो। जब वे उठाते हैं, कुंडली पहले से खुली होती है।" },
    { t: "तारीख लगाएँ", d: "जो कहा, एक खिड़की के साथ। कल फिर खोल सकें।" },
    { t: "नतीजा लिखें", d: "हाँ, आधा, या नहीं। ईमानदारी ही उत्पाद है।" },
    { t: "कार्ड रखें", d: "एक सार्वजनिक पन्ना। लॉगिन नहीं चाहिए।" },
    { t: "वे साथ आते हैं", d: "लिंक पर आपका आमंत्रण है। दोनों को ₹50 बात का समय।" },
  ],
}

export function HowStory() {
  const { t, locale } = useI18n()
  const steps = STEPS[locale]
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const steps = gsap.utils.toArray<HTMLElement>(".how-step")
      steps.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
        if (!reduce) {
          gsap.from(el, {
            opacity: 0,
            y: 36,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          })
        }
      })
    },
    { scope: root, dependencies: [locale] }
  )

  return (
    <section id="how" ref={root} className="max-w-6xl mx-auto px-5 py-28 lg:py-40">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="how-pin lg:col-span-5 lg:sticky lg:top-0 lg:h-[100dvh] lg:flex lg:flex-col lg:justify-center">
          <p className="text-[12px] tracking-[0.18em] uppercase text-zinc-500">{t("afterCall")}</p>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl text-zinc-50 leading-[1.02]">
            {t("sessionStay")}
          </h2>
          <p className="mt-6 font-display text-3xl text-zinc-200 italic leading-snug">{steps[active].t}</p>
          <p className="mt-3 text-[15px] text-zinc-500 max-w-sm leading-relaxed">{steps[active].d}</p>
          <div className="mt-8 h-px bg-white/10 overflow-hidden">
            <div
              className="h-full bg-zinc-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `scaleX(${(active + 1) / steps.length})` }}
            />
          </div>
        </div>
        <ol className="lg:col-span-7 space-y-28 lg:space-y-40 lg:py-[30vh]">
          {steps.map((s) => (
            <li key={s.t} className="how-step">
              <p className="font-display text-5xl sm:text-6xl text-zinc-50 leading-[1.02]">{s.t}</p>
              <p className="mt-4 text-[17px] text-zinc-400 leading-relaxed max-w-md">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Crown, Check, ArrowRight, Sparkles, Brain, Target, BookOpen, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockFAQs } from "@/lib/mock-data"

const features = [
  { icon: Brain, title: "Unlimited AI Twin", desc: "Ask anything, anytime. Full memory integration across all sessions." },
  { icon: Target, title: "Prediction Proof Engine", desc: "Log and track predictions to completion with verified outcome proofs." },
  { icon: BookOpen, title: "Permanent Cosmic Memory", desc: "Every consultation, remedy, and milestone — permanently archived." },
  { icon: Sparkles, title: "Advanced Panchang Briefs", desc: "Energy scores, transit opportunities, cautions, and smart priorities." },
]

export function Subscription() {
  const navigate = useNavigate()
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Free Member",
      priceMonthly: "₹0",
      priceAnnual: "₹0",
      period: "forever",
      description: "Start your Kundli journey",
      features: ["5 AI queries per month", "Basic daily brief", "1 consultation log/month", "7-day memory history"],
      cta: "Current Active Plan",
      highlighted: false,
    },
    {
      name: "AstroLive+ PRO",
      priceMonthly: "₹499",
      priceAnnual: "₹399",
      period: "per month",
      annualSubtext: "Billed ₹4,788/year (Save ₹1,200)",
      description: "For serious Vedic practitioners",
      features: ["Unlimited AI Twin queries", "Full Panchang daily briefs", "Unlimited consultation logs", "Permanent Cosmic Memory", "Prediction Proof Engine", "Family Kundli (up to 4)"],
      cta: "Upgrade to PRO",
      highlighted: true,
      trialText: "7-day free trial"
    },
    {
      name: "Family Vault",
      priceMonthly: "₹899",
      priceAnnual: "₹749",
      period: "per month",
      annualSubtext: "Billed ₹8,988/year (Save ₹1,800)",
      description: "4 independent family profiles",
      features: ["Everything in PRO", "4 Cosmic Memory Vaults", "Shared Kundli Synastry", "Priority Astrologer Matching"],
      cta: "Get Family Plan",
      highlighted: false,
    },
  ]

  const comparisonFeatures = [
    { name: "Daily Panchang", free: "✓", pro: "✓", family: "✓" },
    { name: "Astro Assistant queries", free: "5/mo", pro: "Unlimited", family: "Unlimited" },
    { name: "Consultation archive", free: "1/mo", pro: "Unlimited", family: "4 profiles" },
    { name: "Remedy streak tracker", free: "✗", pro: "✓", family: "✓" },
    { name: "Kundli matching reports", free: "✗", pro: "3/mo", family: "Unlimited" },
    { name: "PDF download", free: "✗", pro: "✓", family: "✓" },
  ]

  const testimonials = [
    { name: "Rajesh Kumar", quote: "The Remedy streak tracker completely transformed my morning routine. I haven't missed my mantra chanting in 45 days!" },
    { name: "Priya Sharma", quote: "AstroLive+ PRO's unlimited assistant queries help me plan my entire week based on the Panchang. Worth every rupee." },
    { name: "Anjali Gupta", quote: "The Family Vault lets me keep track of my husband's and children's charts all in one place. Highly recommended." }
  ]

  return (
    <div className="page-container max-w-5xl pb-28">
      <div className="space-y-10">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto border-b border-line/60 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-brand/30 bg-surface-2 mb-4 font-mono text-xs text-gold-bright font-bold">
            <Crown className="w-4 h-4 text-gold-bright" />
            <span>AstroLive+ Membership</span>
          </div>
          <h1 className="text-h1 font-display text-ink tracking-tight mb-2">
            Unlock your full cosmic potential.
          </h1>
          <p className="text-sm text-ink-secondary">
            Continuous Vedic intelligence, prediction proof tracking, and permanent memory vault.
          </p>
        </div>

        {/* ── Features ───────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 font-sans">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="p-5 rounded-lg bg-surface border border-line flex items-start gap-4">
                <div className="w-9 h-9 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center shrink-0 text-brand">
                  <f.icon className="w-4 h-4 text-brand" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink">{f.title}</h3>
                  <p className="text-caption mt-1 font-sans">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Pricing Toggle ─────────────────────────────────────────────── */}
        <div className="flex justify-center pt-4">
          <div className="inline-flex items-center p-1 rounded-lg bg-surface border border-line">
            <button 
              className={`px-4 py-2 rounded-md text-xs font-bold font-mono transition-colors ${!isAnnual ? 'bg-brand text-brand-foreground' : 'text-ink-secondary hover:text-ink'}`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-xs font-bold font-mono transition-colors ${isAnnual ? 'bg-brand text-brand-foreground' : 'text-ink-secondary hover:text-ink'}`}
              onClick={() => setIsAnnual(true)}
            >
              Annually (Save 20%)
            </button>
          </div>
        </div>

        {/* ── Pricing ─────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-6 font-mono">
          {plans.map(plan => (
            <div key={plan.name} className={`p-6 rounded-lg bg-surface border flex flex-col justify-between space-y-6 ${plan.highlighted ? "border-brand shadow-lg" : "border-line"}`}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  {plan.highlighted && <Badge variant="gold" size="sm">Most Popular</Badge>}
                  {!isAnnual && plan.trialText && <Badge variant="outline" size="sm" className="text-brand border-brand/50">{plan.trialText}</Badge>}
                </div>
                <div>
                  <h3 className="text-body font-bold text-ink">{plan.name}</h3>
                  <p className="text-caption font-sans text-ink-tertiary mt-0.5">{plan.description}</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-ink">{isAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
                    <span className="text-caption text-ink-tertiary">/{plan.period}</span>
                  </div>
                  {isAnnual && plan.annualSubtext && (
                    <p className="text-[10px] text-success mt-1">{plan.annualSubtext}</p>
                  )}
                </div>
                <ul className="space-y-2.5 font-sans text-xs pt-2 border-t border-line/60">
                  {plan.features.map(f => (
                    <li key={f} className="text-ink-secondary flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-success mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant={plan.highlighted ? "primary" : "outline"} className="w-full rounded-md font-mono text-xs" onClick={() => navigate("/app/dashboard")}>
                {plan.cta}
                {plan.highlighted && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          ))}
        </div>

        {/* ── Comparison Table ─────────────────────────────────────────── */}
        <div className="pt-8">
          <h2 className="text-h2 font-display text-ink mb-6 text-center">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-sm">
              <thead>
                <tr className="border-b border-line/60">
                  <th className="py-4 px-4 font-bold text-ink">Feature</th>
                  <th className="py-4 px-4 font-bold text-ink text-center">Free</th>
                  <th className="py-4 px-4 font-bold text-ink text-center">PRO</th>
                  <th className="py-4 px-4 font-bold text-ink text-center">Family</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {comparisonFeatures.map((f, i) => (
                  <tr key={i} className="hover:bg-surface-2/50 transition-colors">
                    <td className="py-4 px-4 text-ink-secondary">{f.name}</td>
                    <td className="py-4 px-4 text-center font-mono">
                      {f.free === '✓' ? <Check className="w-4 h-4 text-success mx-auto" /> : f.free === '✗' ? <X className="w-4 h-4 text-ink-tertiary mx-auto" /> : f.free}
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-brand">
                      {f.pro === '✓' ? <Check className="w-4 h-4 text-success mx-auto" /> : f.pro === '✗' ? <X className="w-4 h-4 text-ink-tertiary mx-auto" /> : f.pro}
                    </td>
                    <td className="py-4 px-4 text-center font-mono">
                      {f.family === '✓' ? <Check className="w-4 h-4 text-success mx-auto" /> : f.family === '✗' ? <X className="w-4 h-4 text-ink-tertiary mx-auto" /> : f.family}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Testimonials ─────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-line/60">
          <h2 className="text-h2 font-display text-ink mb-6 text-center">What our members say</h2>
          <div className="grid md:grid-cols-3 gap-6 font-sans">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-lg bg-surface border border-line space-y-4">
                <div className="flex text-brand">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-sm text-ink-secondary italic leading-relaxed">"{t.quote}"</p>
                <p className="text-xs font-bold text-ink">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <div className="space-y-4 pt-10 border-t border-line/60">
          <div>
            <h2 className="text-h2 font-display text-ink">Frequently Asked Questions</h2>
            <p className="text-caption mt-0.5">Everything you need to know about AstroLive+ membership</p>
          </div>
          <div className="space-y-3 font-sans">
            {mockFAQs.map(faq => (
              <div key={faq.question} className="p-5 rounded-lg bg-surface border border-line space-y-2">
                <h3 className="text-xs font-bold text-ink">{faq.question}</h3>
                <p className="text-xs text-ink-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
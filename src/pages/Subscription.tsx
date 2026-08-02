import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Crown, Check, ArrowRight, Sparkles, Brain, Target, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockFAQs } from "@/lib/mock-data"

const plans = [
  {
    name: "Free Member",
    price: "₹0",
    period: "forever",
    description: "Start your Kundli journey",
    features: ["5 AI queries per month", "Basic daily brief", "1 consultation log/month", "7-day memory history"],
    cta: "Current Active Plan",
    highlighted: false,
  },
  {
    name: "AstroLive+ PRO",
    price: "₹499",
    period: "per month",
    description: "For serious Vedic practitioners",
    features: ["Unlimited AI Twin queries", "Full Panchang daily briefs", "Unlimited consultation logs", "Permanent Cosmic Memory", "Prediction Proof Engine", "Family Kundli (up to 4)"],
    cta: "Upgrade to PRO",
    highlighted: true,
  },
  {
    name: "Family Vault",
    price: "₹899",
    period: "per month",
    description: "4 independent family profiles",
    features: ["Everything in PRO", "4 Cosmic Memory Vaults", "Shared Kundli Synastry", "Priority Astrologer Matching"],
    cta: "Get Family Plan",
    highlighted: false,
  },
]

const features = [
  { icon: Brain, title: "Unlimited AI Twin", desc: "Ask anything, anytime. Full memory integration across all sessions." },
  { icon: Target, title: "Prediction Proof Engine", desc: "Log and track predictions to completion with verified outcome proofs." },
  { icon: BookOpen, title: "Permanent Cosmic Memory", desc: "Every consultation, remedy, and milestone — permanently archived." },
  { icon: Sparkles, title: "Advanced Panchang Briefs", desc: "Energy scores, transit opportunities, cautions, and smart priorities." },
]

export function Subscription() {
  const navigate = useNavigate()

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

        {/* ── Pricing ─────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-6 font-mono">
          {plans.map(plan => (
            <div key={plan.name} className={`p-6 rounded-lg bg-surface border flex flex-col justify-between space-y-6 ${plan.highlighted ? "border-brand shadow-lg" : "border-line"}`}>
              <div className="space-y-4">
                {plan.highlighted && <Badge variant="gold" size="sm">Most Popular</Badge>}
                <div>
                  <h3 className="text-body font-bold text-ink">{plan.name}</h3>
                  <p className="text-caption font-sans text-ink-tertiary mt-0.5">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-ink">{plan.price}</span>
                  <span className="text-caption text-ink-tertiary">/{plan.period}</span>
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

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <div className="space-y-4 pt-4 border-t border-line/60">
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
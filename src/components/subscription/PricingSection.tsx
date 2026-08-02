import { Check, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"

export function PricingSection() {
  const navigate = useNavigate()
  const plans = [
    { name: "Monthly", price: "₹499", period: "/mo", desc: "Perfect for exploring the premium experience.", features: ["Unlimited Cosmic Memory", "Daily AI Briefs", "Cancel anytime"], popular: false },
    { name: "Yearly", price: "₹399", period: "/mo", desc: "Billed ₹4,788 yearly. Save 33%.", features: ["Everything in Monthly", "Premium PDF Reports", "Priority Astrologer Matching"], popular: true },
    { name: "Family", price: "₹899", period: "/mo", desc: "Up to 4 independent family profiles.", features: ["Everything in Yearly", "4 Independent Cosmic Memories", "Shared Billing"], popular: false }
  ]

  return (
    <div className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">Invest in Your Journey</h2>
        <p className="text-[#9CA3AF]">Choose the plan that fits your cosmic growth.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
        {plans.map((plan, i) => (
          <div key={i} className={`bg-surface border rounded-lg p-8 relative flex flex-col h-full ${plan.popular ? 'border-brand shadow-2xl shadow-primary/20 scale-105 z-10' : 'border-line/60 hover:border-line-strong transition-colors'}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-current" /> Most Popular
              </div>
            )}
            
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-sm text-[#9CA3AF] mb-6 h-10">{plan.desc}</p>
            
            <div className="flex items-end gap-1 mb-8">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-[#9CA3AF] mb-1">{plan.period}</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm text-white/90">
                  <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            
            <Button
              onClick={() => navigate("/app/dashboard")}
              variant={plan.popular ? 'primary' : 'outline'}
              className={`w-full py-6 font-bold ${!plan.popular && 'border-line-strong'}`}
            >
              Start 7-Day Free Trial
            </Button>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-[#9CA3AF] mt-8">You can always continue using the free version indefinitely.</p>
    </div>
  )
}

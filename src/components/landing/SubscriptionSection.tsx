import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function SubscriptionSection() {
  const navigate = useNavigate()
  return (
    <section id="premium" className="py-24 relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 blur-[150px] pointer-events-none" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Upgrade to AstroLive+</h2>
          <p className="text-[#9CA3AF] text-lg">Unlock the full power of your cosmic memory and AI guidance.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-card border border-white/10 flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-2">Basic</h3>
            <div className="text-4xl font-bold mb-6">Free</div>
            <ul className="space-y-4 mb-8 flex-1 text-[#9CA3AF]">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/50" /> Single Consultations</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-white/50" /> Verified Astrologers</li>
              <li className="flex items-center gap-3"><X className="w-5 h-5 text-red-500/50" /> No Cosmic Memory</li>
              <li className="flex items-center gap-3"><X className="w-5 h-5 text-red-500/50" /> No Daily Briefs</li>
              <li className="flex items-center gap-3"><X className="w-5 h-5 text-red-500/50" /> No Prediction Tracking</li>
            </ul>
            <Button variant="outline" className="w-full h-12 text-white border-white/20 hover:bg-white/10" onClick={() => navigate('/signup')}>Get Started Free</Button>
          </motion.div>

          {/* AstroLive+ Tier */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-3xl bg-gradient-to-b from-card to-card/50 border border-primary/50 shadow-[0_0_30px_rgba(107,33,168,0.2)] flex flex-col"
          >
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2 text-lavender">AstroLive+</h3>
            <div className="text-4xl font-bold mb-6">$12<span className="text-lg text-[#9CA3AF] font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Unlimited Cosmic Memory</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Automated Prediction Tracking</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Personalized Daily Briefs</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Joint Relationship Mode</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Priority Booking Discounts</li>
            </ul>
            <Button className="w-full h-12 shadow-[0_0_15px_rgba(107,33,168,0.5)]" onClick={() => navigate('/signup')}>Get Started — It's Free</Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

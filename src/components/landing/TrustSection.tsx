import { motion } from "framer-motion"
import { ShieldCheck, Star, Target, Users } from "lucide-react"

export function TrustSection() {
  return (
    <section id="astrologers" className="py-24 bg-navy relative border-y border-line-subtle">
      <div className="container px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Built Around Trust</h2>
            <p className="text-[#9CA3AF] text-lg mb-8 leading-relaxed">
              In AstroLive 2.0, astrologers aren't just rated by generic reviews. Our AstroVerified system tracks their actual prediction accuracy over time, providing you with transparent, data-driven trust metrics.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Verified Accuracy Score</h4>
                  <p className="text-sm text-[#9CA3AF]">Predictions are logged and checked against reality.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Credential Verification</h4>
                  <p className="text-sm text-[#9CA3AF]">Rigorous vetting process for all practitioners.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-secondary/10 blur-[80px] rounded-full" />
            <div className="relative bg-surface border border-line rounded-lg p-6 shadow-2xl">
              <div className="flex items-start justify-between border-b border-line-subtle pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Astrologer" className="w-16 h-16 rounded-full border-2 border-line/60 object-cover" />
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                      Dr. Sarah Chen
                      <ShieldCheck className="w-5 h-5 text-secondary" />
                    </h3>
                    <p className="text-[#9CA3AF] text-sm">Vedic Astrology • Numerology</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-gold/10 text-gold px-2 py-1 rounded-md text-sm font-bold">
                  <Star className="w-4 h-4 fill-gold" />
                  4.9
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-navy p-4 rounded-xl border border-line-subtle">
                  <div className="text-[#9CA3AF] text-xs mb-1">Prediction Accuracy</div>
                  <div className="text-2xl font-bold text-secondary">94%</div>
                </div>
                <div className="bg-navy p-4 rounded-xl border border-line-subtle">
                  <div className="text-[#9CA3AF] text-xs mb-1 flex items-center gap-2">
                    <Users className="w-3 h-3" /> Consultations
                  </div>
                  <div className="text-2xl font-bold text-white">1.2k+</div>
                </div>
              </div>

              <div className="bg-secondary/5 border border-secondary/20 p-4 rounded-xl">
                <p className="text-sm text-ink-secondary/90 italic">
                  "Sarah predicted my career shift down to the exact month. The AstroLive memory tracker proved she was 100% right."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

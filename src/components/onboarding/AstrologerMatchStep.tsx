import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ShieldCheck, Star } from 'lucide-react'
import { mockOnboardingAstrologers } from '@/lib/mock-data'
import type { OnboardingData } from './OnboardingOrchestrator'

export function AstrologerMatchStep({ onNext }: { onNext: () => void, data?: OnboardingData }) {
  return (
    <div className="flex-1 flex flex-col p-6 max-w-5xl mx-auto w-full relative min-h-screen pt-12 md:pt-24">
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Your Verified Matches</h2>
        <p className="text-[#9CA3AF]">Based on your goals, we've found the perfect experts for you.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {mockOnboardingAstrologers.map((astrologer, i) => (
          <motion.div
            key={astrologer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-line rounded-[32px] p-6 hover:border-line-strong transition-colors flex flex-col relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-lg bg-brand/20 flex items-center justify-center text-xl font-bold text-white shadow-inner">
                {astrologer.image}
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-gold fill-gold" />
                <span className="text-xs font-bold text-white">{astrologer.rating}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              {astrologer.name} <ShieldCheck className="w-4 h-4 text-green-400" />
            </h3>
            <p className="text-xs text-brand font-medium mb-4">{astrologer.specialty}</p>
            
            <div className="bg-black/40 rounded-xl p-3 mb-6 mt-auto border border-line-subtle">
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                "{astrologer.matchReason}"
              </p>
            </div>
            
            <Button variant="outline" className="w-full border-line/60 hover:bg-surface-3">
              View Profile
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="pt-12 pb-8 flex justify-center relative z-10 mt-auto">
        <Button onClick={onNext} className="px-8 w-full max-w-md">
          Continue to Dashboard
        </Button>
      </div>
    </div>
  )
}

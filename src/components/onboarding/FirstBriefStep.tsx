import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Sun, Sparkles, Target, AlertCircle } from 'lucide-react'
import type { OnboardingData } from './OnboardingOrchestrator'

export function FirstBriefStep({ onNext, data }: { onNext: () => void, data: OnboardingData }) {
  const firstName = data.name ? data.name.split(' ')[0] : 'there'
  
  return (
    <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full relative min-h-screen pt-12 md:pt-24">
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Your First Daily Brief</h2>
        <p className="text-[#9CA3AF]">A personalized snapshot generated just for you.</p>
      </div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-white/10 rounded-[32px] p-6 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-primary/10 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30">
              <Sun className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Good Morning, {firstName}</h3>
              <p className="text-xs text-gold">Sun entering your 10th House</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                <Sparkles className="w-4 h-4" /> Today's Focus
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                With your recent selections around {data.goals[0] || 'your goals'}, today is an excellent day to lay groundwork. The cosmic energy supports structural planning.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                <div className="flex items-center gap-2 text-green-400 font-bold text-xs mb-1 uppercase tracking-wider">
                  <Target className="w-3 h-3" /> Opportunity
                </div>
                <p className="text-sm text-white font-medium">Clear communication around 2 PM.</p>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1 uppercase tracking-wider">
                  <AlertCircle className="w-3 h-3" /> Reminder
                </div>
                <p className="text-sm text-white font-medium">Avoid rushing decisions tonight.</p>
              </div>
            </div>
            
            <p className="text-xs text-[#9CA3AF] text-center pt-2 italic">
              "Tomorrow's brief will be even smarter after your first consultation."
            </p>
          </div>
        </div>
      </motion.div>

      <div className="pt-12 pb-8 flex justify-center relative z-10 mt-auto">
        <Button onClick={onNext} className="px-8 w-full">
          Find My Experts
        </Button>
      </div>
    </div>
  )
}

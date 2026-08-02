import { Brain } from 'lucide-react'
import { mockOnboardingAstrologers } from '@/lib/mock-data'

export function ActionableSupport() {
  const trustedAstrologer = mockOnboardingAstrologers[0] // Dr. Sarah Jenkins

  return (
    <div className="space-y-4 w-full mt-12">
      <h3 className="text-teal-100 font-bold mb-4 text-center text-lg">Immediate Support</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <button className="bg-white/5 hover:bg-surface-3 border border-teal-500/20 rounded-lg p-6 text-left transition-colors flex items-start gap-4 group">
          <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 text-teal-300" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-1 group-hover:text-teal-300 transition-colors">Urgent AI Chat</h4>
            <p className="text-sm text-teal-100/70 leading-relaxed">
              Instantly chat with an AI Companion aware of your current crisis and past history.
            </p>
          </div>
        </button>

        <button className="bg-white/5 hover:bg-surface-3 border border-teal-500/20 rounded-lg p-6 text-left transition-colors flex items-start gap-4 group">
          <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 font-bold text-lg text-teal-300 border border-teal-400/30">
            {trustedAstrologer.image}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-white font-bold group-hover:text-teal-300 transition-colors">Call {trustedAstrologer.name.split(' ')[1]}</h4>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="Online Now" />
            </div>
            <p className="text-sm text-teal-100/70 leading-relaxed">
              Your highest-rated trusted astrologer is currently online and available to talk.
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

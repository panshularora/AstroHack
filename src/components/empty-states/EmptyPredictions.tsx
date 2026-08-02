import { Target, Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function EmptyPredictions() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px]">
      <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center mb-6 relative rotate-3 hover:rotate-0 transition-transform duration-500">
        <Target className="w-10 h-10 text-primary" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-card border border-white/10 rounded-full flex items-center justify-center">
          <Search className="w-4 h-4 text-[#9CA3AF]" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3">Track Your Future</h3>
      <p className="text-[#9CA3AF] max-w-md mx-auto mb-8 leading-relaxed">
        When an astrologer makes a prediction, it appears here as a living object. We'll track it, remind you when the window opens, and ask you to verify the outcome.
      </p>
      
      <Button variant="outline" className="border-white/20 gap-2">
        Learn About Verified Predictions <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  )
}

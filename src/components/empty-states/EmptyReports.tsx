import { FileText, Lock, ChartPie } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function EmptyReports() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px]">
      <div className="relative mb-8">
        <div className="w-20 h-24 bg-surface-2 border border-line rounded-xl absolute -left-12 top-4 -rotate-12 blur-[2px] flex items-center justify-center opacity-50">
          <ChartPie className="w-6 h-6 text-[#9CA3AF]" />
        </div>
        <div className="w-20 h-24 bg-surface-2 border border-line rounded-xl absolute -right-12 top-4 rotate-12 blur-[2px] opacity-50" />
        
        <div className="w-24 h-32 bg-surface border-2 border-brand/20 rounded-xl relative z-10 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.15)]">
          <FileText className="w-8 h-8 text-brand mb-2" />
          <Lock className="w-4 h-4 text-[#9CA3AF] absolute bottom-3 right-3" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3">Insights Are Brewing</h3>
      <p className="text-[#9CA3AF] max-w-sm mx-auto mb-8 leading-relaxed">
        Deep-dive reports unlock automatically as the AI Companion learns more about your life through consultations and journal entries.
      </p>
      
      <Button className="bg-white/10 text-white hover:bg-white/20 border border-line">
        Start Journaling
      </Button>
    </div>
  )
}

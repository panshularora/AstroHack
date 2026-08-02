import { Database, Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function EmptyCosmicMemory() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px]">
      <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 relative group">
        <div className="absolute inset-0 border border-blue-500/20 rounded-full group-hover:scale-110 transition-transform duration-700" />
        <Database className="w-10 h-10 text-blue-400" />
        <Sparkles className="w-4 h-4 text-brand absolute top-2 right-2 animate-pulse" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3">Your Journey Starts Here</h3>
      <p className="text-[#9CA3AF] max-w-md mx-auto mb-8 leading-relaxed">
        This space will automatically transform into a living timeline of your life. Every consultation, prediction, and journal entry will be securely saved here forever.
      </p>
      
      <Button className="gap-2">
        <Plus className="w-4 h-4" /> Book First Consultation
      </Button>
    </div>
  )
}

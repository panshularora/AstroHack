import { Database } from 'lucide-react'

export function MemoryReassurance() {
  return (
    <div className="w-full bg-black/40 border border-teal-500/20 rounded-3xl p-6 md:p-8 relative overflow-hidden mt-8 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-4 h-4 text-teal-400" />
          <h4 className="text-sm font-bold text-teal-400 uppercase tracking-wider">From Your Cosmic Memory</h4>
        </div>
        
        <p className="text-lg md:text-xl text-teal-50 leading-relaxed font-medium italic">
          "Last August, you faced a similarly overwhelming period of anxiety during a heavy Mars transit regarding your health. You completed the suggested remedies, leaned on your support system, and emerged significantly stronger by September. You have survived difficult transits before, and you will navigate this one successfully too."
        </p>
      </div>
    </div>
  )
}

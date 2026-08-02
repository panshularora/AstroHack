import { Users, Lock } from "lucide-react"

export function FamilyProfiles() {
  return (
    <div className="mb-24 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10" />
      
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-6">
            <Users className="w-4 h-4" /> Family Plan Exclusive
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Manage Your Loved Ones</h2>
          <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">
            Add up to 4 family members under a single AstroLive+ account. Each member receives their own private Cosmic Memory, Daily Briefs, and AI Companion.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white/90 font-medium">
              <Lock className="w-5 h-5 text-green-400" /> 100% Private & Segmented Memories
            </li>
            <li className="flex items-center gap-3 text-white/90 font-medium">
              <Lock className="w-5 h-5 text-green-400" /> Individual Daily Briefs & AI Check-ins
            </li>
          </ul>
        </div>
        
        <div className="flex-1 flex justify-center gap-4 py-8">
          <div className="w-32 aspect-[3/4] bg-card border border-white/10 rounded-3xl flex flex-col items-center justify-center -rotate-6 shadow-xl hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3 border-4 border-background shadow-inner">D</div>
            <span className="text-sm font-bold text-white">David</span>
          </div>
          <div className="w-32 aspect-[3/4] bg-card border border-primary/40 rounded-3xl flex flex-col items-center justify-center rotate-3 shadow-2xl z-10 scale-110 hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3 border-4 border-background shadow-inner">P</div>
            <span className="text-sm font-bold text-white">Priya</span>
          </div>
          <div className="w-32 aspect-[3/4] bg-card border border-white/10 rounded-3xl flex flex-col items-center justify-center rotate-12 shadow-xl hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3 border-4 border-background shadow-inner">M</div>
            <span className="text-sm font-bold text-white">Maya</span>
          </div>
        </div>
      </div>
    </div>
  )
}

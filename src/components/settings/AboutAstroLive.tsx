import { Info, ExternalLink, MessageCircle, Heart, ShieldCheck } from "lucide-react"

export function AboutAstroLive() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">About AstroLive</h2>
        <p className="text-[#9CA3AF]">Version and support information.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        
        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-4 relative shadow-inner">
          <Heart className="w-8 h-8 text-primary absolute" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">AstroLive 2.0</h3>
        <p className="text-sm text-[#9CA3AF] mb-6">Version 2.0.4 (Build 4920)</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-400/10 text-green-400 text-xs font-bold rounded-full border border-green-400/20">
          Up to date
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <button className="flex items-center justify-between p-4 bg-card border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-white">Terms of Service</span>
          </div>
          <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />
        </button>
        <button className="flex items-center justify-between p-4 bg-card border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="font-bold text-white">Privacy Policy</span>
          </div>
          <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />
        </button>
        <button className="flex items-center justify-between p-4 bg-card border border-white/10 rounded-2xl hover:bg-white/5 transition-colors md:col-span-2">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="font-bold text-white">Help Center & Support</span>
          </div>
          <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />
        </button>
      </div>
    </div>
  )
}

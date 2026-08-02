import { Users, CheckCircle2 } from "lucide-react"
import { mockAstrologers } from "@/lib/mock-data"

export function PredictionComparison() {
  const sarah = mockAstrologers.find(a => a.id === "a1") || mockAstrologers[0]
  const alara = mockAstrologers.find(a => a.id === "a4") || mockAstrologers[3]

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-6 h-6 text-secondary" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Compare Perspectives</h2>
          <p className="text-[#9CA3AF] text-sm">See how different astrologers predicted the same life event.</p>
        </div>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-3xl p-2 relative overflow-hidden">
        {/* VS Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#1a1b26] border border-white/10 rounded-full flex items-center justify-center text-sm font-bold text-white z-10 shadow-2xl">
          VS
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          {/* Perspective 1 */}
          <div className="bg-card border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <img src={alara.avatar} alt={alara.name} className="w-14 h-14 rounded-full border-2 border-white/10 object-cover" />
              <div>
                <h4 className="text-lg font-bold text-white leading-tight">{alara.name}</h4>
                <p className="text-xs text-[#9CA3AF]">Consulted Jun 15, 2026</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-[10px] text-primary uppercase font-bold tracking-wider mb-2 block">Prediction</span>
                <p className="text-base text-white/90 leading-relaxed">"You will receive a major job offer in the tech sector around late August, initiated by a former colleague."</p>
              </div>
              
              <div className="flex items-center justify-between py-4 border-y border-white/5">
                <span className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">Confidence</span>
                <span className="text-base font-bold text-white">88%</span>
              </div>

              <div>
                <span className="text-[10px] text-green-400 uppercase font-bold tracking-wider mb-2 block">Outcome</span>
                <div className="flex items-start gap-3 bg-green-400/10 border border-green-400/20 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80">Active Window: Window opens in 3 days. Preparation & talking points ready.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Perspective 2 */}
          <div className="bg-card border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <img src={sarah.avatar} alt={sarah.name} className="w-14 h-14 rounded-full border-2 border-white/10 object-cover" />
              <div>
                <h4 className="text-lg font-bold text-white leading-tight">{sarah.name}</h4>
                <p className="text-xs text-[#9CA3AF]">Consulted Jul 15, 2026</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-[10px] text-gold uppercase font-bold tracking-wider mb-2 block">Prediction</span>
                <p className="text-base text-white/90 leading-relaxed">"Jupiter's 10th house transit creates a peak career window between late August and early September."</p>
              </div>
              
              <div className="flex items-center justify-between py-4 border-y border-white/5">
                <span className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">Confidence</span>
                <span className="text-base font-bold text-white">94%</span>
              </div>

              <div>
                <span className="text-[10px] text-green-400 uppercase font-bold tracking-wider mb-2 block">Outcome</span>
                <div className="flex items-start gap-3 bg-green-400/10 border border-green-400/20 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80">Confirmed: Advice to maintain current role & upskill aligns 100% with Alara's timeline.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

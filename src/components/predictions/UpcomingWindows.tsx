import { Hourglass, AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { mockPredictions, mockAstrologers } from "@/lib/mock-data"

export function UpcomingWindows() {
  const navigate = useNavigate()
  const activePred = mockPredictions[0] // Tech job offer prediction
  const astrologer = mockAstrologers.find(a => a.id === activePred.astrologerId) || mockAstrologers[0]

  // Calculate days remaining dynamically from targetDate
  const targetDate = new Date(activePred.targetDate).getTime()
  const now = new Date().getTime()
  const daysRemaining = Math.max(Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24)), 3)

  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-6">
        <Hourglass className="w-5 h-5 text-gold" />
        <h2 className="text-2xl font-bold text-white">Upcoming Windows</h2>
      </div>

      <div className="bg-gradient-to-br from-gold/20 via-[#1a1b26] to-[#1a1b26] border border-gold/30 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-[0_0_40px_rgba(250,204,21,0.05)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-gold font-bold uppercase tracking-wider text-[10px] mb-4 bg-gold/10 w-fit px-3 py-1.5 rounded-full border border-gold/20">
              <AlertTriangle className="w-3 h-3" /> Action Recommended · {activePred.confidenceLevel}% Confidence
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{activePred.content}</h3>
            <p className="text-[#9CA3AF] mb-8 text-sm md:text-base max-w-xl">
              The predicted window for your career transition opens in {daysRemaining} days. Consulted with <strong className="text-white">{astrologer.name}</strong> during your Jupiter 10th house transit session.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => navigate("/app/logger")}
                className="bg-gold text-[#1a1b26] hover:bg-gold/90 font-bold border-none h-12 px-8"
              >
                Prepare & Add Notes
              </Button>
              <Button
                onClick={() => navigate("/app/logger")}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 h-12 px-8 font-bold"
              >
                Review Session Notes
              </Button>
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-3xl p-8 flex items-center justify-center gap-6 min-w-[280px] w-full lg:w-auto shadow-inner">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2 font-mono">{String(daysRemaining).padStart(2, '0')}</div>
              <div className="text-xs text-gold uppercase font-bold tracking-wider">Days</div>
            </div>
            <div className="text-4xl font-light text-white/20 mb-6">:</div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2 font-mono">14</div>
              <div className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">Hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

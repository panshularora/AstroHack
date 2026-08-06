import { motion } from "framer-motion"
import { Target } from "lucide-react"
import { mockPredictions } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { useNavigate } from "react-router-dom"

export function ActivePredictionsCards() {
  const { user } = useUser()
  const navigate = useNavigate()

  const isDemo = user.id === "u1" || user.email?.toLowerCase() === "arjun.sharma@example.com"
  const active = isDemo ? mockPredictions.filter(p => p.status === 'pending') : user.predictions

  if (!isDemo && active.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center space-y-3 mb-12 font-sans">
        <Target className="w-8 h-8 text-neutral-600 mx-auto" />
        <p className="text-sm text-neutral-300 font-semibold">No active predictions yet</p>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Your active predictions will be tracked here in real-time.
        </p>
        <Button
          size="sm"
          onClick={() => navigate("/app/match")}
          className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs cursor-pointer mt-1"
        >
          Book Consultation
        </Button>
      </div>
    )
  }

  return (
    <div className="mb-16 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Active Predictions</h2>
          <p className="text-xs text-neutral-400">Tracking your forecasts in real-time.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {active.map((p: any, i: number) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded-md uppercase tracking-wider">
                    {p.astrologerName || p.astrologer?.name || "Verified Astrologer"}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <Target className="w-3 h-3" /> {p.confidence || p.confidenceLevel || 90}% Alignment
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1 leading-tight">{p.title || p.content}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Clock, AlertCircle, CalendarClock, XCircle, MoreVertical, Edit3, Upload, ShieldCheck, Target } from "lucide-react"
import { mockDetailedPredictions, type DetailedPrediction } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { PredictionProofModal } from "./PredictionProofModal"
import { useUser } from "@/context/UserContext"

export function PredictionBoard() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [selectedPredId, setSelectedPredId] = useState<string | undefined>(undefined)
  const [proofModalOpen, setProofModalOpen] = useState(false)

  const isDemo = user.id === "u1" || user.email?.toLowerCase() === "arjun.sharma@example.com"

  const predictionsToDisplay = isDemo ? mockDetailedPredictions : user.predictions

  const handleOpenProof = (id: string) => {
    setSelectedPredId(id)
    setProofModalOpen(true)
  }

  if (!isDemo && (!predictionsToDisplay || predictionsToDisplay.length === 0)) {
    return (
      <div className="p-12 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center space-y-4 mb-16 font-sans">
        <Target className="w-10 h-10 text-neutral-600 mx-auto" />
        <h3 className="text-lg font-bold text-white">No Predictions Logged Yet</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          As a new user, your verified predictions will appear here once generated or booked with an astrologer.
        </p>
        <Button
          onClick={() => navigate("/app/match")}
          className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs px-5 py-2 cursor-pointer mt-2"
        >
          Consult Astrologer
        </Button>
      </div>
    )
  }

  return (
    <div className="mb-16 font-sans">
      <div className="grid lg:grid-cols-2 gap-6">
        {predictionsToDisplay.map((prediction: any, i: number) => (
          <PredictionCard key={prediction.id} prediction={prediction} index={i} onOpenProof={handleOpenProof} />
        ))}
      </div>

      <PredictionProofModal
        isOpen={proofModalOpen}
        onClose={() => setProofModalOpen(false)}
        predictionId={selectedPredId}
      />
    </div>
  )
}

function PredictionCard({
  prediction,
  index,
  onOpenProof
}: {
  prediction: any
  index: number
  onOpenProof: (id: string) => void
}) {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const start = new Date(prediction.consultationDate || Date.now()).getTime()
  const end = new Date(prediction.targetDate || Date.now() + 864000000).getTime()
  const now = new Date().getTime()
  const progress = Math.min(Math.max(((now - start) / (end - start)) * 100, 5), 100)

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'completed':
      case 'Verified': return { color: 'text-green-400', bg: 'bg-green-400/20', border: 'border-green-400/30', icon: CheckCircle2, label: 'Verified' }
      case 'pending':
      case 'Active Window': return { color: 'text-amber-400', bg: 'bg-amber-400/20', border: 'border-amber-400/30', icon: Clock, label: 'Active Window' }
      default: return { color: 'text-neutral-400', bg: 'bg-neutral-800', border: 'border-neutral-700', icon: Clock, label: status || 'Active' }
    }
  }

  const config = getStatusConfig(prediction.status)
  const StatusIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`bg-neutral-900/60 border ${config.border} rounded-2xl p-6 relative group transition-all`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 ${config.bg} ${config.color} rounded-md uppercase tracking-wider flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" /> {config.label}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded-md uppercase tracking-wider">
              {prediction.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white leading-tight mb-1.5">{prediction.title}</h3>
          
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>{prediction.astrologerName || prediction.astrologer?.name || "Verified Astrologer"}</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">{prediction.confidence}% Alignment</span>
          </div>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-10 w-52 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl z-20 overflow-hidden"
              >
                <div className="py-1">
                  <button onClick={() => { setShowMenu(false); onOpenProof(prediction.id); }} className="w-full text-left px-4 py-2 text-xs font-medium text-white hover:bg-neutral-800 flex items-center gap-2 transition-colors cursor-pointer">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verify Outcome
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

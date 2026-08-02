import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Clock, AlertCircle, CalendarClock, XCircle, MoreVertical, Edit3, Upload, ShieldCheck } from "lucide-react"
import { mockDetailedPredictions, type DetailedPrediction } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { PredictionProofModal } from "./PredictionProofModal"

export function PredictionBoard() {
  const [selectedPredId, setSelectedPredId] = useState<string | undefined>(undefined)
  const [proofModalOpen, setProofModalOpen] = useState(false)

  const handleOpenProof = (id: string) => {
    setSelectedPredId(id)
    setProofModalOpen(true)
  }

  return (
    <div className="mb-16">
      <div className="grid lg:grid-cols-2 gap-6">
        {mockDetailedPredictions.map((prediction, i) => (
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
  prediction: DetailedPrediction
  index: number
  onOpenProof: (id: string) => void
}) {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const start = new Date(prediction.consultationDate).getTime()
  const end = new Date(prediction.targetDate).getTime()
  const now = new Date().getTime()
  const progress = Math.min(Math.max(((now - start) / (end - start)) * 100, 5), 100)

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'completed': return { color: 'text-green-400', bg: 'bg-green-400/20', border: 'border-green-400/30', icon: CheckCircle2, label: 'Completed & Verified' }
      case 'pending': return { color: 'text-brand', bg: 'bg-brand/20', border: 'border-brand/30', icon: Clock, label: 'Pending Window' }
      case 'delayed': return { color: 'text-gold', bg: 'bg-gold/20', border: 'border-gold/30', icon: AlertCircle, label: 'Delayed Window' }
      case 'extended': return { color: 'text-blue-400', bg: 'bg-blue-400/20', border: 'border-blue-400/30', icon: CalendarClock, label: 'Extended Timeline' }
      case 'failed': return { color: 'text-red-400', bg: 'bg-red-400/20', border: 'border-red-400/30', icon: XCircle, label: 'Did Not Happen' }
      default: return { color: 'text-[#9CA3AF]', bg: 'bg-white/10', border: 'border-line-strong', icon: Clock, label: 'Unknown' }
    }
  }

  const config = getStatusConfig(prediction.status)
  const StatusIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-surface border ${config.border} rounded-lg p-6 md:p-8 relative group hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-[10px] font-bold px-2 py-1 ${config.bg} ${config.color} rounded-md uppercase tracking-wider flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" /> {config.label}
            </span>
            <span className="text-[10px] font-bold px-2 py-1 bg-white/5 text-[#9CA3AF] rounded-md uppercase tracking-wider">{prediction.category}</span>
          </div>
          <h3 className="text-xl font-bold text-white leading-tight mb-2">{prediction.title}</h3>
          
          <div className="flex items-center gap-2 text-sm">
            <img src={prediction.astrologer.avatar} alt={prediction.astrologer.name} className="w-5 h-5 rounded-full object-cover" />
            <span className="text-[#9CA3AF] font-medium">{prediction.astrologer.name}</span>
            <span className="text-white/20">•</span>
            <span className="text-brand font-bold">{prediction.confidence}% Confidence</span>
          </div>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-[#9CA3AF] hover:bg-surface-3 hover:text-white transition-colors cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, transformOrigin: "top right" }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-10 w-56 bg-[#1F2937] border border-line rounded-xl shadow-xl z-20 overflow-hidden"
              >
                <div className="py-2">
                  <button onClick={() => { setShowMenu(false); onOpenProof(prediction.id); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 flex items-center gap-3 transition-colors cursor-pointer">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verify with Evidence
                  </button>
                  <button onClick={() => { setShowMenu(false); onOpenProof(prediction.id); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 flex items-center gap-3 transition-colors cursor-pointer">
                    <Edit3 className="w-4 h-4 text-[#9CA3AF]" /> Update Outcome
                  </button>
                  <button onClick={() => { setShowMenu(false); onOpenProof(prediction.id); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 flex items-center gap-3 transition-colors cursor-pointer">
                    <Upload className="w-4 h-4 text-[#9CA3AF]" /> Upload Proof Document
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mb-6 bg-white/5 rounded-lg p-4">
        <div className="flex justify-between text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">
          <span>Target Window</span>
          <span>{new Date(prediction.targetDate).toLocaleDateString(undefined, {month: 'long', year: 'numeric'})}</span>
        </div>
        
        {prediction.status !== 'completed' && prediction.status !== 'failed' && (
          <div className="mt-4">
            <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${prediction.status === 'delayed' ? 'bg-gold' : 'bg-brand'}`}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#9CA3AF] font-medium mt-1">
              <span>Given: {new Date(prediction.consultationDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
              <span>{100 - Math.round(progress)}% of window remaining</span>
            </div>
          </div>
        )}

        {(prediction.status === 'completed' || prediction.status === 'delayed') && prediction.notes && (
          <div className="mt-4 pt-4 border-t border-line-subtle">
            <p className="text-sm text-white/80 italic">"{prediction.notes}"</p>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button
          onClick={() => onOpenProof(prediction.id)}
          className={`flex-1 h-10 text-xs font-bold gap-2 ${prediction.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30' : 'bg-brand'}`}
        >
          <ShieldCheck className="w-4 h-4" />
          {prediction.status === 'completed' ? 'View Proof & Evidence' : 'Verify with Evidence'}
        </Button>
        <Button
          onClick={() => navigate("/app/match")}
          variant="outline"
          className="flex-1 h-10 text-xs font-bold gap-2 border-line-strong text-white"
        >
          Book Follow-up
        </Button>
      </div>
    </motion.div>
  )
}

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, ShieldCheck, CheckCircle2, FileText, ArrowRight, Paperclip, Award
} from "lucide-react"
import { mockVerifiedAstrologers, mockPredictions } from "@/lib/mock-data"

interface PredictionProofModalProps {
  isOpen: boolean
  onClose: () => void
  predictionId?: string
}

export function PredictionProofModal({ isOpen, onClose, predictionId }: PredictionProofModalProps) {
  const [selectedPrediction, setSelectedPrediction] = useState(
    mockPredictions.find(p => p.id === predictionId) || mockPredictions[0]
  )
  const [outcome, setOutcome] = useState<"accurate" | "inaccurate">("accurate")
  const [proofNote, setProofNote] = useState("Accepted formal VP Tech Lead offer letter with salary increase on Aug 14!")
  const [attachedProof, setAttachedProof] = useState<string[]>(["offer_letter_confirmation.pdf"])
  const [isVerifying, setIsVerifying] = useState(false)
  const [verifiedSuccess, setVerifiedSuccess] = useState(false)

  const astrologer = mockVerifiedAstrologers.find(a => a.id === selectedPrediction.astrologerId) || mockVerifiedAstrologers[0]

  if (!isOpen) return null

  const handleFileUpload = () => {
    const filename = `proof_document_${Date.now().toString().slice(-4)}.pdf`
    setAttachedProof(prev => [...prev, filename])
  }

  const handleSubmitProof = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setVerifiedSuccess(true)
      if (astrologer) {
        astrologer.accuracy = Math.min(99, astrologer.accuracy + 1)
        astrologer.trustScore = Math.min(100, astrologer.trustScore + 1)
      }
      selectedPrediction.status = outcome
    }, 1200)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-card border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-emerald-500 border border-emerald-500/30 flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Prediction Proof Engine <Award className="w-4 h-4 text-gold" />
                </h2>
                <p className="text-xs text-[#9CA3AF]">
                  Attach verifiable evidence to confirm outcomes & update AstroVerified Trust Scores
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!verifiedSuccess ? (
            <div className="space-y-6 overflow-y-auto pr-1 flex-1">
              {/* Select Prediction */}
              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 block">1. Select Target Prediction</label>
                <select
                  value={selectedPrediction.id}
                  onChange={e => {
                    const p = mockPredictions.find(x => x.id === e.target.value)
                    if (p) setSelectedPrediction(p)
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none"
                >
                  {mockPredictions.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.content} ({p.astrologerName} · {p.confidenceLevel}% confidence)
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Details Card */}
              <div className="p-4 bg-white/4 border border-white/8 rounded-2xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-primary bg-primary/15 px-2.5 py-0.5 rounded-full border border-primary/30 uppercase">
                      Given on {selectedPrediction.dateGiven}
                    </span>
                    <h3 className="text-base font-bold text-white mt-2">{selectedPrediction.content}</h3>
                    <p className="text-xs text-[#9CA3AF]">Predicted by {selectedPrediction.astrologerName} · Target Window: {selectedPrediction.targetDate}</p>
                  </div>
                  <span className="text-sm font-bold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                    {selectedPrediction.confidenceLevel}% Confidence
                  </span>
                </div>
              </div>

              {/* Verification Outcome */}
              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 block">2. Verified Outcome Status</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "accurate", label: "Verified Accurate (True)", color: "border-green-500 bg-green-500/15 text-green-400" },
                    { id: "delayed", label: "Delayed Window", color: "border-gold bg-gold/15 text-gold" },
                    { id: "inaccurate", label: "Did Not Happen", color: "border-red-500 bg-red-500/15 text-red-400" },
                  ].map(o => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setOutcome(o.id as any)}
                      className={`p-3.5 rounded-xl border text-xs font-bold text-center transition-all ${
                        outcome === o.id ? o.color : "bg-white/5 border-white/10 text-[#9CA3AF]"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evidence Note */}
              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 block">3. Verification Note & Evidence Details</label>
                <textarea
                  value={proofNote}
                  onChange={e => setProofNote(e.target.value)}
                  placeholder="Describe what happened, exact dates, and outcome details..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-[#6B7280] outline-none min-h-[90px]"
                />
              </div>

              {/* Attach Proof Files */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">4. Attach Proof Documents / Screenshots</label>
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="text-xs text-primary font-bold hover:text-lavender flex items-center gap-1 cursor-pointer"
                  >
                    <Paperclip className="w-3.5 h-3.5" /> Attach File
                  </button>
                </div>

                <div className="space-y-2">
                  {attachedProof.map((file, idx) => (
                    <div key={idx} className="p-3 bg-white/4 border border-white/8 rounded-xl flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono">{file}</span>
                      </div>
                      <span className="text-[10px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">
                        Attached Proof
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-white/10">
                <span className="text-xs text-[#9CA3AF]">Updates {astrologer.name}'s AstroVerified Trust Score</span>
                <button
                  onClick={handleSubmitProof}
                  disabled={isVerifying}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-xs transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  {isVerifying ? "Verifying Evidence..." : "Submit Verification Proof"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Verified Success Impact View */
            <div className="py-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>

              <div>
                <span className="px-3 py-1 bg-green-500/15 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider border border-green-500/30">
                  Verified Outcome Recorded
                </span>
                <h3 className="text-2xl font-bold text-white mt-3">Prediction Confirmed True!</h3>
                <p className="text-xs text-[#9CA3AF] mt-1 max-w-md mx-auto">
                  Your evidence has been attached to the Cosmic Memory timeline and updated the astrologer's verified trust metrics.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left">
                <div className="p-4 bg-white/4 border border-white/8 rounded-2xl">
                  <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">Updated Astrologer Accuracy</p>
                  <p className="text-2xl font-bold text-green-400 mt-1">{astrologer.accuracy}%</p>
                  <p className="text-[10px] text-green-400 mt-0.5">+1% Increased</p>
                </div>
                <div className="p-4 bg-white/4 border border-white/8 rounded-2xl">
                  <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">Updated Trust Score</p>
                  <p className="text-2xl font-bold text-gold mt-1">{astrologer.trustScore} / 100</p>
                  <p className="text-[10px] text-gold mt-0.5">+1 Trust Point</p>
                </div>
              </div>

              <button
                onClick={() => { setVerifiedSuccess(false); onClose(); }}
                className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-xs transition-colors shadow-lg"
              >
                Return to Prediction Center
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

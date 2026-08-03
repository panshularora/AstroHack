import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mic, Send, Sparkles, Clock, CheckCircle2, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockAstrologers } from "@/lib/mock-data"

interface AsyncConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AsyncConsultationModal({ isOpen, onClose }: AsyncConsultationModalProps) {
  const [question, setQuestion] = useState("")
  const [selectedAstrologer, setSelectedAstrologer] = useState(mockAstrologers[0].id)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  if (!isOpen) return null

  const astrologer = mockAstrologers.find(a => a.id === selectedAstrologer) || mockAstrologers[0]

  const handleSubmit = () => {
    if (!question.trim()) return
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
    }, 2400)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-surface border border-line rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line/60 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-ink">Async Audio Consultation</h3>
                  <Badge variant="gold" size="sm" className="font-mono">₹49 Flat Fee</Badge>
                </div>
                <p className="text-caption font-mono text-ink-tertiary">5x Supply Efficiency · Guaranteed Audio Answer in 6h</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-surface-2 text-ink-tertiary hover:text-ink transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {isSubmitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-success/20 border border-success/40 flex items-center justify-center text-success mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold font-display text-ink">Async Question Submitted!</h4>
              <p className="text-xs text-ink-secondary max-w-sm mx-auto font-sans">
                {astrologer.name} has received your audio prompt & chart transits. You will get a detailed 3-minute voice answer in your Cosmic Memory within 6 hours.
              </p>
              <Badge variant="brand" size="sm" className="font-mono">Order ID: ASYNC-{Date.now().toString().slice(-4)}</Badge>
            </motion.div>
          ) : (
            <div className="space-y-5">
              {/* Select Astrologer */}
              <div className="space-y-2 font-mono">
                <label className="text-xs text-ink-secondary block font-bold">1. Select Verified Expert</label>
                <div className="grid grid-cols-2 gap-2">
                  {mockAstrologers.slice(0, 4).map(a => (
                    <div
                      key={a.id}
                      onClick={() => setSelectedAstrologer(a.id)}
                      className={`p-2.5 rounded-md border cursor-pointer transition-all flex items-center gap-2.5 ${
                        selectedAstrologer === a.id
                          ? "border-brand bg-surface-2 text-ink shadow-xs"
                          : "border-line bg-surface/50 text-ink-tertiary hover:border-line-strong"
                      }`}
                    >
                      <div className="w-7 h-7 rounded bg-brand/20 text-brand flex items-center justify-center font-bold text-xs shrink-0">
                        {a.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-ink truncate">{a.name}</p>
                        <p className="text-[10px] text-ink-tertiary truncate">{a.verifiedAccuracy}% Acc</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question / Audio Prompt Input */}
              <div className="space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-ink-secondary font-bold">2. Type your pressing question or record voice</label>
                  <span className="text-[10px] text-brand">Max 500 chars</span>
                </div>
                <textarea
                  rows={3}
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder="e.g. Will my tech executive job offer materialize before August 25?"
                  className="w-full rounded-md bg-surface-2 border border-line p-3 text-xs text-ink placeholder:text-ink-tertiary focus:outline-none focus:ring-1 focus:ring-brand font-sans"
                />
                
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      setIsRecording(!isRecording)
                      if (!isRecording && !question) setQuestion("Audio message recorded: 0:42 sec preview")
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border transition-colors ${
                      isRecording ? "border-danger bg-danger-light text-danger" : "border-line bg-surface-2 text-ink-secondary hover:text-ink"
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    {isRecording ? "Recording... (Click to stop)" : "Attach Voice Note"}
                  </button>

                  <span className="text-[10px] text-ink-tertiary flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gold-bright" /> Guarantee &lt; 6h response
                  </span>
                </div>
              </div>

              {/* Price & Submit */}
              <div className="p-4 rounded-md bg-surface-2/60 border border-line flex items-center justify-between font-mono">
                <div>
                  <span className="text-[10px] text-ink-tertiary block uppercase">Async Pricing</span>
                  <span className="text-lg font-bold text-ink">₹49 <span className="text-xs font-normal text-ink-tertiary">flat rate</span></span>
                </div>
                <Button size="sm" className="rounded-md font-mono font-bold gap-2" onClick={handleSubmit} disabled={!question.trim()}>
                  <Send className="w-3.5 h-3.5" /> Pay ₹49 & Send Question
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-ink-tertiary pt-1">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-success" /> No live queue wait</span>
                <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-brand" /> Saved to Memory Vault</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

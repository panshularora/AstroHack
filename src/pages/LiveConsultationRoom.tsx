import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { Video, Mic, MicOff, VideoOff, PhoneOff, Sparkles, Shield, CheckCircle2, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockAstrologers } from "@/lib/mock-data"
import { useLedger, type ExtractedReceipt } from "@/context/LedgerContext"
import { cn } from "@/lib/utils"

const EXTRACTED_RECEIPTS: Omit<ExtractedReceipt, "id" | "astrologerName">[] = [
  {
    title: "Tech Sector Executive Offer",
    category: "career",
    windowStart: "2026-08-20",
    windowEnd: "2026-08-25",
    confidence: 88,
    type: "prediction",
  },
  {
    title: "Venus Beej Mantra — 21 Days",
    category: "health",
    windowStart: "2026-08-03",
    windowEnd: "2026-08-24",
    confidence: 0,
    type: "remedy",
  },
  {
    title: "Avoid Major Financial Decisions",
    category: "finance",
    windowStart: "2026-08-03",
    windowEnd: "2026-10-28",
    confidence: 75,
    type: "prediction",
  },
]

export function LiveConsultationRoom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addPredictions } = useLedger()
  const astrologer = mockAstrologers.find(a => a.id === id) || mockAstrologers[0]

  const [phase, setPhase] = useState<"waiting" | "in_call" | "ended" | "extracted" | "confirmed">("waiting")
  const [callType, setCallType] = useState<"chat" | "audio" | "video">("video")
  const [timer, setTimer] = useState(0)
  const [micActive, setMicActive] = useState(true)
  const [videoActive, setVideoActive] = useState(true)
  const [selectedReceipts, setSelectedReceipts] = useState<Set<number>>(new Set([0, 2]))
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: astrologer.name, text: "Namaste Arjun! I have opened your Kundli. Your 10th House Jupiter transit is active today.", time: "10:00 AM" }
  ])
  const [chatInput, setChatInput] = useState("")

  const userVideoRef = useRef<HTMLVideoElement>(null)

  const receipts: ExtractedReceipt[] = EXTRACTED_RECEIPTS.map((r, i) => ({
    ...r,
    id: `new-${Date.now()}-${i}`,
    astrologerName: astrologer.name,
  }))

  useEffect(() => {
    let stream: MediaStream | null = null
    if (phase === "in_call" && callType === "video" && videoActive) {
      navigator.mediaDevices?.getUserMedia({ video: true })
        .then(s => {
          stream = s
          if (userVideoRef.current) userVideoRef.current.srcObject = s
        })
        .catch(() => {})
    }
    return () => { stream?.getTracks().forEach(t => t.stop()) }
  }, [phase, callType, videoActive])

  useEffect(() => {
    if (phase !== "in_call") return
    const interval = setInterval(() => setTimer(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [phase])

  const formatTimer = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`

  const endCall = () => {
    setPhase("ended")
    setTimeout(() => setPhase("extracted"), 2200)
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    setChatMessages(prev => [...prev, { sender: "You", text: chatInput, time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) }])
    setChatInput("")
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        sender: astrologer.name,
        text: "I see a strong promotion window opening between August 20-25 with 88% confidence. I recommend daily Venus Beej Mantra repetitions.",
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      }])
    }, 1200)
  }

  const toggleReceipt = (idx: number) => {
    setSelectedReceipts(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const confirmReceipts = () => {
    const toAdd = receipts.filter((_, i) => selectedReceipts.has(i))
    addPredictions(toAdd)
    setPhase("confirmed")
  }

  return (
    <div className="page-container max-w-4xl pb-28">
      {phase === "waiting" && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="border-b border-line/60 pb-6 text-center max-w-xl mx-auto relative">
            <button onClick={() => navigate("/app/consult")} className="absolute left-0 top-0 font-mono text-[11px] text-ink-tertiary hover:text-ink">
              ← Back
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand mb-2 mt-8">Live Session</p>
            <h1 className="font-display text-h1 text-ink">{astrologer.name}</h1>
            <p className="text-sm text-ink-secondary mt-1">Your Kundli has been shared. Predictions will become receipts when the session ends.</p>
          </div>

          <div className="p-8 rounded-lg bg-surface border border-line max-w-xl mx-auto space-y-6 text-center">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand/25 to-surface-3 border-2 border-brand/30 flex items-center justify-center font-mono font-bold text-2xl text-gold-bright mx-auto">
              {astrologer.name.slice(0, 2).toUpperCase()}
            </div>
            <Badge variant="gold" size="sm" className="font-mono">₹{astrologer.pricePerMinute}/min · {astrologer.verifiedAccuracy}% verified</Badge>
            <div className="flex items-center justify-center gap-2 font-mono text-xs">
              {(["video", "audio", "chat"] as const).map(mode => (
                <button key={mode} onClick={() => setCallType(mode)} className={cn(
                  "px-4 py-2 rounded-md border transition-all capitalize",
                  callType === mode ? "border-brand bg-surface-2 font-bold" : "border-line text-ink-tertiary"
                )}>{mode}</button>
              ))}
            </div>
            <Button size="lg" className="w-full rounded-md font-mono" onClick={() => setPhase("in_call")}>
              Enter Session
            </Button>
          </div>
        </motion.div>
      )}

      {phase === "in_call" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 rounded-lg bg-surface border border-line flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              <span className="font-bold">Live with {astrologer.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gold-bright font-bold tabular-nums">{formatTimer(timer)}</span>
              <span className="text-ink-tertiary">₹{Math.max(1, Math.ceil(timer / 60)) * astrologer.pricePerMinute}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 relative rounded-lg bg-surface-2 border border-line h-[380px] flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-surface border-2 border-brand flex items-center justify-center font-mono font-bold text-xl text-gold-bright mx-auto">
                  {astrologer.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="font-bold text-ink">{astrologer.name}</p>
                <p className="text-xs font-mono text-gold-light">10th House Jupiter Transit Active</p>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-surface/90 border border-line px-3 py-2 rounded-md">
                <button onClick={() => setMicActive(!micActive)} className={cn("p-2 rounded-md border", micActive ? "border-line" : "border-danger text-danger")}>
                  {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                {callType === "video" && (
                  <button onClick={() => setVideoActive(!videoActive)} className={cn("p-2 rounded-md border", videoActive ? "border-line" : "border-danger text-danger")}>
                    {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </button>
                )}
                <Button variant="danger" size="sm" className="rounded-md font-mono" onClick={endCall}>
                  <PhoneOff className="w-4 h-4" /> End Session
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-lg bg-surface border border-line flex flex-col h-[380px]">
              <div className="p-3 border-b border-line/60 font-mono text-xs font-bold flex justify-between">
                <span>Live Transcript</span>
                <Badge variant="brand" size="sm">AI Sync</Badge>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={msg.sender === "You" ? "text-right" : ""}>
                    <span className="font-mono text-[10px] text-ink-tertiary">{msg.sender}</span>
                    <div className={cn("p-2 rounded-md inline-block max-w-[90%] mt-0.5", msg.sender === "You" ? "bg-brand text-white" : "bg-surface-2 border border-line")}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-line/60 flex gap-2">
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                  placeholder="Message..." className="flex-1 h-8 rounded-md bg-surface-2 border border-line px-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand" />
                <Button size="sm" className="h-8 rounded-md" onClick={handleSendMessage}>Send</Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {phase === "ended" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 space-y-4">
          <div className="w-14 h-14 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-7 h-7 text-brand" />
          </div>
          <h2 className="font-display text-h2 text-ink">Extracting Prediction Receipts</h2>
          <p className="text-xs font-mono text-ink-secondary">Parsing session transcript for dated, verifiable claims...</p>
        </motion.div>
      )}

      {(phase === "extracted" || phase === "confirmed") && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {phase === "confirmed" ? (
            <div className="text-center py-12 space-y-6">
              <CheckCircle2 className="w-14 h-14 text-success mx-auto" />
              <h2 className="font-display text-h2 text-ink">Receipts Added to Your Ledger</h2>
              <p className="text-sm text-ink-secondary max-w-md mx-auto">
                {selectedReceipts.size} item{selectedReceipts.size !== 1 ? "s" : ""} tracked. We'll notify you when each window opens and closes.
              </p>
              <Button className="rounded-md font-mono" onClick={() => navigate("/app/ledger")}>
                View Ledger <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="border-b border-line/60 pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-5 h-5 text-brand" />
                  <h1 className="font-display text-h1 text-ink">Confirm Prediction Receipts</h1>
                </div>
                <p className="text-sm text-ink-secondary">
                  Session with {astrologer.name} · ₹{Math.max(1, Math.ceil(timer / 60)) * astrologer.pricePerMinute} · Select what to track in your ledger
                </p>
              </div>

              <div className="space-y-3">
                {receipts.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => toggleReceipt(i)}
                    className={cn(
                      "w-full p-5 rounded-lg border text-left transition-all",
                      selectedReceipts.has(i) ? "border-brand bg-brand-tint" : "border-line bg-surface opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary mb-1">
                          {r.type === "remedy" ? "Remedy Receipt" : "Prediction Receipt"}
                        </p>
                        <p className="text-sm font-bold text-ink">{r.title}</p>
                        {r.type === "prediction" && (
                          <p className="text-xs font-mono text-ink-secondary mt-1">
                            Window: {r.windowStart} → {r.windowEnd} · {r.confidence}% confidence
                          </p>
                        )}
                        {r.type === "remedy" && (
                          <p className="text-xs font-mono text-ink-secondary mt-1">21-day practice · starts today</p>
                        )}
                      </div>
                      <div className={cn(
                        "w-6 h-6 rounded-md border flex items-center justify-center shrink-0",
                        selectedReceipts.has(i) ? "bg-brand border-brand text-white" : "border-line"
                      )}>
                        {selectedReceipts.has(i) && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="rounded-md flex-1" onClick={() => navigate("/app/ledger")}>Skip</Button>
                <Button className="rounded-md flex-1 font-mono" disabled={selectedReceipts.size === 0} onClick={confirmReceipts}>
                  Add {selectedReceipts.size} to Ledger
                </Button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  )
}

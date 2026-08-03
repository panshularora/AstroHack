import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { Video, Mic, MicOff, VideoOff, PhoneOff, Sparkles, Shield, CheckCircle2, ArrowRight, Check, MessageSquare, Camera } from "lucide-react"
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
  const [cameraError, setCameraError] = useState(false)
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

  // Connect real webcam feed
  useEffect(() => {
    let stream: MediaStream | null = null
    if (phase === "in_call" && callType === "video" && videoActive) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then(s => {
          stream = s
          setCameraError(false)
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = s
          }
        })
        .catch((err) => {
          console.warn("Camera access warning:", err)
          setCameraError(true)
        })
    }
    return () => { 
      if (stream) {
        stream.getTracks().forEach(t => t.stop()) 
      }
    }
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
    <div className="page-container max-w-5xl pb-28">
      {phase === "waiting" && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="border-b border-white/10 pb-6 text-center max-w-xl mx-auto relative">
            <button onClick={() => navigate("/app/match")} className="absolute left-0 top-0 font-mono text-[11px] text-[#9CA3AF] hover:text-white transition-colors">
              ← Back to Match
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber-400 mb-2 mt-8">Live Consultation Room</p>
            <h1 className="font-display text-4xl font-bold text-white">{astrologer.name}</h1>
            <p className="text-sm text-[#9CA3AF] mt-1">Your Kundli chart transits have been securely transmitted to {astrologer.name}.</p>
          </div>

          <div className="p-8 rounded-2xl bg-[#090A0F]/90 border border-white/10 max-w-xl mx-auto space-y-6 text-center shadow-2xl backdrop-blur-xl">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 border-2 border-amber-400/50 flex items-center justify-center font-mono font-bold text-2xl text-white shadow-xl">
                {astrologer.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#090A0F]" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{astrologer.name}</h3>
              <p className="text-xs text-amber-400 font-mono mt-0.5">{astrologer.expertise.join(", ")} · {astrologer.experience} Years Exp</p>
            </div>

            <Badge variant="gold" size="sm" className="font-mono">₹{astrologer.pricePerMinute}/min · {astrologer.verifiedAccuracy}% Verified Track Record</Badge>
            
            <div className="flex items-center justify-center gap-3 font-mono text-xs">
              {(["video", "audio", "chat"] as const).map(mode => (
                <button 
                  key={mode} 
                  onClick={() => setCallType(mode)} 
                  className={cn(
                    "px-4 py-2 rounded-xl border transition-all capitalize font-bold cursor-pointer",
                    callType === mode ? "border-amber-400 bg-amber-500/20 text-amber-300 shadow-md shadow-amber-500/10" : "border-white/10 text-[#9CA3AF] hover:text-white"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>

            <Button size="lg" className="w-full rounded-xl font-mono text-sm font-bold bg-amber-500 hover:bg-amber-600 text-black shadow-xl" onClick={() => setPhase("in_call")}>
              Connect Live Session Now
            </Button>
          </div>
        </motion.div>
      )}

      {phase === "in_call" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Live Call Header */}
          <div className="p-4 rounded-xl bg-[#090A0F]/90 border border-white/10 flex items-center justify-between font-mono text-xs shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold text-white">Live Call with {astrologer.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">HD Encrypted</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-amber-400 font-bold text-sm tabular-nums">{formatTimer(timer)}</span>
              <span className="text-[#9CA3AF]">₹{Math.max(1, Math.ceil(timer / 60)) * astrologer.pricePerMinute} total</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Main Video Viewport */}
            <div className="lg:col-span-8 relative rounded-2xl bg-[#080C14] border border-white/10 h-[440px] flex items-center justify-center overflow-hidden shadow-2xl">
              
              {/* Astrologer Live Video Simulation Container */}
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-purple-950/30 via-slate-900/60 to-black">
                {/* Celestial Animated Ring */}
                <div className="absolute w-[280px] h-[280px] rounded-full border border-amber-500/20 animate-spin opacity-40 pointer-events-none" style={{ animationDuration: '30s' }} />
                
                <div className="relative z-10 text-center space-y-3 p-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 border-2 border-amber-400 flex items-center justify-center font-mono font-bold text-3xl text-white mx-auto shadow-2xl ring-4 ring-amber-500/20 animate-pulse">
                    {astrologer.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white">{astrologer.name}</p>
                    <p className="text-xs font-mono text-amber-300">Live Astrologer Video Stream</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 font-mono text-[10px]">
                    Transit Sync: Jupiter 10th House Trine Active
                  </Badge>
                </div>

                {/* Real User Webcam PIP Window */}
                {callType === "video" && (
                  <div className="absolute bottom-16 right-4 w-36 h-28 rounded-xl bg-black/80 border border-white/20 overflow-hidden shadow-2xl group">
                    {videoActive && !cameraError ? (
                      <video
                        ref={userVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform -scale-x-100"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 bg-surface-2 text-[#9CA3AF]">
                        <Camera className="w-5 h-5 mb-1 text-white/50" />
                        <span className="text-[9px] font-mono">Camera Off</span>
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-white">
                      You (Self PIP)
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Bottom Control Bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#090A0F]/90 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-2xl shadow-2xl z-20">
                <button 
                  onClick={() => setMicActive(!micActive)} 
                  className={cn(
                    "p-2.5 rounded-xl border transition-all cursor-pointer", 
                    micActive ? "border-white/10 text-white hover:bg-white/10" : "border-red-500/50 bg-red-500/20 text-red-400"
                  )}
                >
                  {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>

                {callType === "video" && (
                  <button 
                    onClick={() => setVideoActive(!videoActive)} 
                    className={cn(
                      "p-2.5 rounded-xl border transition-all cursor-pointer", 
                      videoActive ? "border-white/10 text-white hover:bg-white/10" : "border-red-500/50 bg-red-500/20 text-red-400"
                    )}
                  >
                    {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </button>
                )}

                <Button variant="danger" size="sm" className="rounded-xl font-mono text-xs px-4" onClick={endCall}>
                  <PhoneOff className="w-4 h-4 mr-1" /> End Session
                </Button>
              </div>
            </div>

            {/* Right Live Transcript & Chat */}
            <div className="lg:col-span-4 rounded-2xl bg-[#090A0F]/90 border border-white/10 flex flex-col h-[440px] shadow-2xl backdrop-blur-xl">
              <div className="p-3.5 border-b border-white/10 font-mono text-xs font-bold flex justify-between items-center">
                <span className="text-white flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Live AI Transcript
                </span>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[9px] uppercase font-mono">
                  Extracting Proof
                </Badge>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={msg.sender === "You" ? "text-right" : ""}>
                    <span className="font-mono text-[9px] text-[#9CA3AF] block mb-0.5">{msg.sender} · {msg.time}</span>
                    <div className={cn(
                      "p-3 rounded-xl inline-block max-w-[90%] text-left leading-relaxed", 
                      msg.sender === "You" 
                        ? "bg-amber-500 text-black font-semibold shadow-md" 
                        : "bg-white/5 border border-white/10 text-white"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-white/10 flex gap-2">
                <input 
                  value={chatInput} 
                  onChange={e => setChatInput(e.target.value)} 
                  onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask a follow-up question..." 
                  className="flex-1 h-9 rounded-xl bg-white/5 border border-white/10 px-3 text-xs text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 placeholder:text-[#9CA3AF]" 
                />
                <Button size="sm" className="h-9 rounded-xl bg-amber-500 text-black hover:bg-amber-600 font-bold text-xs" onClick={handleSendMessage}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {phase === "ended" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto animate-pulse shadow-xl shadow-amber-500/10">
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white">Extracting Prediction Receipts</h2>
          <p className="text-xs font-mono text-[#9CA3AF]">Parsing session transcript for dated, verifiable claims...</p>
        </motion.div>
      )}

      {(phase === "extracted" || phase === "confirmed") && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {phase === "confirmed" ? (
            <div className="text-center py-12 space-y-6">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              <h2 className="font-display text-3xl font-bold text-white">Receipts Added to Your Ledger</h2>
              <p className="text-sm text-[#9CA3AF] max-w-md mx-auto">
                {selectedReceipts.size} item{selectedReceipts.size !== 1 ? "s" : ""} tracked. We'll notify you when each window opens and closes.
              </p>
              <Button className="rounded-xl font-mono text-sm bg-amber-500 text-black font-bold hover:bg-amber-600" onClick={() => navigate("/app/predictions")}>
                View Prediction Ledger <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          ) : (
            <>
              <div className="border-b border-white/10 pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <h1 className="font-display text-3xl font-bold text-white">Confirm Prediction Receipts</h1>
                </div>
                <p className="text-sm text-[#9CA3AF]">
                  Session with {astrologer.name} · ₹{Math.max(1, Math.ceil(timer / 60)) * astrologer.pricePerMinute} · Select what to track in your ledger
                </p>
              </div>

              <div className="space-y-3">
                {receipts.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => toggleReceipt(i)}
                    className={cn(
                      "w-full p-5 rounded-2xl border text-left transition-all cursor-pointer",
                      selectedReceipts.has(i) ? "border-amber-500/50 bg-amber-500/10 shadow-lg" : "border-white/10 bg-white/5 opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF] mb-1">
                          {r.type === "remedy" ? "Remedy Receipt" : "Prediction Receipt"}
                        </p>
                        <p className="text-sm font-bold text-white">{r.title}</p>
                        {r.type === "prediction" && (
                          <p className="text-xs font-mono text-amber-300 mt-1">
                            Window: {r.windowStart} → {r.windowEnd} · {r.confidence}% confidence
                          </p>
                        )}
                        {r.type === "remedy" && (
                          <p className="text-xs font-mono text-emerald-300 mt-1">21-day practice · starts today</p>
                        )}
                      </div>
                      <div className={cn(
                        "w-6 h-6 rounded-lg border flex items-center justify-center shrink-0",
                        selectedReceipts.has(i) ? "bg-amber-500 border-amber-500 text-black font-bold" : "border-white/20"
                      )}>
                        {selectedReceipts.has(i) && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="rounded-xl flex-1 border-white/20 text-white" onClick={() => navigate("/app/predictions")}>Skip</Button>
                <Button className="rounded-xl flex-1 font-mono bg-amber-500 text-black font-bold hover:bg-amber-600" disabled={selectedReceipts.size === 0} onClick={confirmReceipts}>
                  Add {selectedReceipts.size} to Prediction Ledger
                </Button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  )
}

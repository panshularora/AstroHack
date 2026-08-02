import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import { Video, Mic, MicOff, VideoOff, PhoneOff, Sparkles, Shield, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockAstrologers } from "@/lib/mock-data"

export function LiveConsultationRoom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const astrologer = mockAstrologers.find(a => a.id === id) || mockAstrologers[0]

  const [phase, setPhase] = useState<"waiting" | "in_call" | "ended" | "extracted">("waiting")
  const [callType, setCallType] = useState<"chat" | "audio" | "video">("video")
  const [timer, setTimer] = useState(0)
  const [micActive, setMicActive] = useState(true)
  const [videoActive, setVideoActive] = useState(true)
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: astrologer.name, text: "Namaste Arjun! I have opened your Kundli. Your 10th House Jupiter transit is active today.", time: "10:00 AM" }
  ])
  const [chatInput, setChatInput] = useState("")

  // Timer tick for in_call phase
  useEffect(() => {
    if (phase !== "in_call") return
    const interval = setInterval(() => setTimer(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [phase])

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startCall = () => {
    setPhase("in_call")
  }

  const endCall = () => {
    setPhase("ended")
    setTimeout(() => {
      setPhase("extracted")
    }, 2000)
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    setChatMessages(prev => [...prev, { sender: "You", text: chatInput, time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) }])
    setChatInput("")

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: astrologer.name,
          text: "I see a strong promotion window opening between August 20-25 with 88% confidence. I recommend daily Venus Beej Mantra repetitions.",
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
        }
      ])
    }, 1200)
  }

  return (
    <div className="page-container max-w-5xl pb-28">
      {/* ── Waiting Room Phase ─────────────────────────────────── */}
      {phase === "waiting" && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="border-b border-line/60 pb-6 text-center max-w-xl mx-auto relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 top-0 flex items-center gap-1.5 font-mono text-[11px] text-ink-tertiary hover:text-ink transition-colors group"
            >
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <div className="w-12 h-12 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand mx-auto mb-3 mt-8">
              <Sparkles className="w-6 h-6 text-brand" />
            </div>
            <h1 className="text-h1 font-display text-ink tracking-tight">Live Consultation Room</h1>
            <p className="text-sm text-ink-secondary mt-1">
              Joining live session with <span className="font-bold text-ink">{astrologer.name}</span>. Your birth details & Kundli transits have been securely transmitted.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-surface border border-line max-w-xl mx-auto space-y-6 text-center">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand/25 to-surface-3 border-2 border-brand/30 flex items-center justify-center font-mono font-bold text-2xl text-gold-bright mx-auto shadow-glow">
              {astrologer.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-body font-bold text-ink">{astrologer.name}</p>
              <p className="text-xs font-mono text-ink-tertiary mt-0.5">{astrologer.specialties.join(" · ")}</p>
              <Badge variant="gold" size="sm" className="mt-2 font-mono">₹{astrologer.pricePerMinute}/min · Verified Expert</Badge>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 font-mono text-xs">
              {(["video", "audio", "chat"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCallType(mode)}
                  className={`px-4 py-2 rounded-md border transition-all ${
                    callType === mode ? "border-brand bg-surface-2 text-ink font-bold" : "border-line text-ink-tertiary hover:text-ink"
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>

            <Button size="lg" className="w-full rounded-md font-mono font-bold" onClick={startCall}>
              Enter Consultation ({callType.toUpperCase()} MODE)
            </Button>
          </div>
        </motion.div>
      )}

      {/* ── Active In-Call Phase ───────────────────────────────── */}
      {phase === "in_call" && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Header Bar */}
          <div className="p-4 rounded-lg bg-surface border border-line flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse" />
              <span className="font-bold text-ink">Live Session with {astrologer.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gold-bright font-bold tabular-nums text-sm">{formatTimer(timer)}</span>
              <span className="text-ink-tertiary">Est. Cost: ₹{Math.max(1, Math.ceil(timer / 60)) * astrologer.pricePerMinute}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Video / Call Container */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative rounded-lg bg-surface-2 border border-line h-[420px] flex items-center justify-center overflow-hidden">
                {callType === "video" && videoActive ? (
                  <div className="relative w-full h-full bg-gradient-to-b from-surface-2 to-canvas flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="w-24 h-24 rounded-full bg-surface border-2 border-brand text-brand flex items-center justify-center font-mono font-bold text-2xl mx-auto shadow-2xl">
                        {astrologer.name.slice(0, 2).toUpperCase()}
                      </div>
                      <p className="text-body font-bold text-ink">{astrologer.name}</p>
                      <p className="text-xs font-mono text-gold-light">Kundli 10th House Transit Stream Active</p>
                    </div>

                    {/* Self Video PIP */}
                    <div className="absolute bottom-4 right-4 w-28 h-20 bg-canvas border border-line rounded-md p-2 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-ink-tertiary">Arjun (You)</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 rounded-full bg-surface border border-line text-ink-tertiary flex items-center justify-center font-mono font-bold text-xl mx-auto">
                      {astrologer.name.slice(0, 2).toUpperCase()}
                    </div>
                    <p className="text-body font-bold text-ink">{astrologer.name}</p>
                    <p className="text-xs font-mono text-ink-tertiary">Audio Stream Active</p>
                  </div>
                )}

                {/* Call Control Floating Bar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-surface/90 backdrop-blur-md border border-line px-4 py-2 rounded-md">
                  <button onClick={() => setMicActive(!micActive)} className={`p-2 rounded-md border ${micActive ? "border-line text-ink" : "border-danger text-danger bg-danger-light"}`}>
                    {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>
                  {callType === "video" && (
                    <button onClick={() => setVideoActive(!videoActive)} className={`p-2 rounded-md border ${videoActive ? "border-line text-ink" : "border-danger text-danger bg-danger-light"}`}>
                      {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </button>
                  )}
                  <Button variant="danger" size="sm" className="rounded-md font-mono font-bold" onClick={endCall}>
                    <PhoneOff className="w-4 h-4" /> End Session
                  </Button>
                </div>
              </div>
            </div>

            {/* In-Call Chat & Live AI Transcript Panel */}
            <div className="lg:col-span-4 rounded-lg bg-surface border border-line flex flex-col h-[420px]">
              <div className="p-3.5 border-b border-line/60 font-mono text-xs font-bold text-ink flex items-center justify-between">
                <span>Live Chat & Transcript</span>
                <Badge variant="brand" size="sm">AI Live Sync</Badge>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`space-y-1 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
                    <span className="font-mono text-[10px] text-ink-tertiary">{msg.sender} · {msg.time}</span>
                    <div className={`p-2.5 rounded-md text-xs inline-block max-w-[85%] ${msg.sender === "You" ? "bg-brand text-white" : "bg-surface-2 text-ink border border-line"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-line/60 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type message to astrologer..."
                  className="flex-1 h-9 rounded-md bg-surface-2 border border-line px-3 text-xs text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand font-sans"
                />
                <Button size="sm" className="rounded-md h-9" onClick={handleSendMessage}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Processing & Ended Phase ───────────────────────────── */}
      {phase === "ended" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 space-y-4">
          <div className="w-16 h-16 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand mx-auto animate-spin">
            <Sparkles className="w-8 h-8 text-brand" />
          </div>
          <h2 className="text-h2 font-display text-ink">Analyzing Consultation & Extracting Insights</h2>
          <p className="text-xs font-mono text-ink-secondary">AstroLive AI is transcribing audio, parsing predictions, and generating remedy tasks...</p>
        </motion.div>
      )}

      {/* ── Extracted AI Summary & Predictions Phase ───────────── */}
      {phase === "extracted" && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="border-b border-line/60 pb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <h1 className="text-h1 font-display text-ink tracking-tight">Session Summary & Extracted Intelligence</h1>
              </div>
              <p className="text-sm text-ink-secondary font-sans">
                Consultation with <span className="font-bold text-ink">{astrologer.name}</span> completed · Total Cost: ₹{Math.max(1, Math.ceil(timer / 60)) * astrologer.pricePerMinute}
              </p>
            </div>
            <Button size="sm" className="rounded-md font-mono" onClick={() => navigate("/app/predictions")}>
              View Prediction Proof Engine <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Extracted Predictions */}
            <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
              <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand" /> Extracted Predictions (Auto-Tracked)
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-md bg-surface-2/60 border border-line/60 space-y-1">
                  <div className="flex justify-between font-bold text-ink">
                    <span>Tech Sector Executive Offer</span>
                    <Badge variant="gold" size="sm">88% Conf.</Badge>
                  </div>
                  <p className="text-[11px] font-sans text-ink-secondary">Target Window: Aug 20 – Aug 25, 2026</p>
                </div>
              </div>
            </div>

            {/* Extracted Remedies */}
            <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
              <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-bright" /> Extracted Remedies & Action Items
              </h3>
              <div className="space-y-3 font-sans text-xs">
                <div className="p-3.5 rounded-md bg-surface-2/60 border border-line/60 space-y-1">
                  <p className="font-bold text-ink">Venus Beej Mantra (108 Recitations Daily)</p>
                  <p className="text-[11px] text-ink-secondary">Added to Daily Smart Priorities (Day 1 of 21)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, MessageSquare, Phone, Video, CreditCard,
  CheckCircle2, Sparkles, Send, Brain, ShieldCheck, ArrowRight, Sun,
  Mic, MicOff, Volume2, VolumeX, Camera, CameraOff, Paperclip, FileText, Edit3
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { type VerifiedAstrologer, mockConsultations } from "@/lib/mock-data"

interface ConsultationFlowProps {
  isOpen: boolean
  onClose: () => void
  astrologer: VerifiedAstrologer
  initialMode?: "chat" | "voice" | "video"
}

type Step = "select" | "payment" | "waiting" | "session" | "processing" | "complete"

export function ConsultationFlowModal({ isOpen, onClose, astrologer, initialMode = "chat" }: ConsultationFlowProps) {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>("select")
  const [mode, setMode] = useState<"chat" | "voice" | "video">(initialMode)
  const [duration, setDuration] = useState<number>(30)
  const [slot, setSlot] = useState<string>("Today, 2:30 PM")
  const [topic, setTopic] = useState<string>("Career Growth & Transits")
  const [paymentMethod, setPaymentMethod] = useState<string>("wallet")

  // Call & media controls
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaker, setIsSpeaker] = useState(true)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [userNotes, setUserNotes] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<string[]>([])

  // Live session chat state
  const [messages, setMessages] = useState<Array<{ sender: "astro" | "user", text: string, time: string, attachment?: string }>>([
    {
      sender: "astro",
      text: `Namaste Arjun! Welcome to our session. I'm reviewing your birth chart (Aug 15, 1994 · New Delhi) with the active Jupiter 10th house transit. How can I guide you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputText, setInputText] = useState("")
  const [sessionTime, setSessionTime] = useState(duration * 60)
  const [processingProgress, setProcessingProgress] = useState(0)

  // Session timer
  useEffect(() => {
    if (step !== "session") return
    const timer = setInterval(() => setSessionTime(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(timer)
  }, [step])

  // Processing progress simulation
  useEffect(() => {
    if (step !== "processing") return
    setProcessingProgress(0)
    const interval = setInterval(() => {
      setProcessingProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setStep("complete")
          return 100
        }
        return p + 25
      })
    }, 800)
    return () => clearInterval(interval)
  }, [step])

  if (!isOpen) return null

  const cost = Math.round(duration * astrologer.pricing)

  const handleSendMessage = () => {
    if (!inputText.trim() && attachedFiles.length === 0) return
    const userMsg = inputText
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: userMsg || "Shared document for review.",
        time: nowTime,
        attachment: attachedFiles.length > 0 ? attachedFiles[attachedFiles.length - 1] : undefined
      }
    ])
    setInputText("")
    setAttachedFiles([])
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [
        ...prev,
        {
          sender: "astro",
          text: `I've analyzed that point in your chart. The upcoming Rahu period starting next month creates ideal momentum for tech leadership. I predict a formal offer window between late August and early September.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    }, 1800)
  }

  const handleFileUpload = () => {
    const filename = `birth_chart_supplement_${Date.now().toString().slice(-4)}.pdf`
    setAttachedFiles(prev => [...prev, filename])
  }

  const handleEndSession = () => {
    // Inject new consultation into mock dataset
    const newConsultation = {
      id: `c_${Date.now()}`,
      astrologerId: astrologer.id,
      astrologerName: astrologer.name,
      astrologerAvatar: astrologer.avatar,
      topic: topic,
      durationMinutes: duration,
      date: new Date().toISOString(),
      cost: cost,
      rating: 5
    }
    mockConsultations.unshift(newConsultation)

    setStep("processing")
  }

  const handleFinish = () => {
    onClose()
    navigate("/app/logger")
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-surface border border-line rounded-lg p-6 md:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <img src={astrologer.avatar} alt={astrologer.name} className="w-10 h-10 rounded-full border border-line object-cover" />
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                  {astrologer.name} <ShieldCheck className="w-4 h-4 text-brand" />
                </h2>
                <p className="text-xs text-[#9CA3AF]">{astrologer.specialization.join(" · ")}</p>
              </div>
            </div>

            {step !== "session" && step !== "processing" && (
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-surface-3 flex items-center justify-center text-[#9CA3AF] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ── STEP 1: Select Mode & Slot ──────────────────────────────── */}
          {step === "select" && (
            <div className="space-y-6 overflow-y-auto pr-1">
              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 block">1. Select Mode</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "chat", label: "Live Chat", icon: MessageSquare, price: `₹${astrologer.pricing}/min`, color: "border-brand bg-brand/15 text-brand" },
                    { id: "voice", label: "Voice Call", icon: Phone, price: `₹${astrologer.pricing}/min`, color: "border-blue-500 bg-blue-500/15 text-blue-400" },
                    { id: "video", label: "Video Call", icon: Video, price: `₹${Math.round(astrologer.pricing * 1.2)}/min`, color: "border-green-500 bg-green-500/15 text-green-400" },
                  ].map(m => {
                    const Icon = m.icon
                    const isActive = mode === m.id
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMode(m.id as any)}
                        className={`p-4 rounded-lg border text-center transition-all ${isActive ? m.color : "bg-white/5 border-line/60 text-[#9CA3AF]"}`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <span className="font-bold text-xs block text-white">{m.label}</span>
                        <span className="text-[10px] text-[#9CA3AF]">{m.price}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 block">2. Select Duration</label>
                <div className="grid grid-cols-3 gap-3">
                  {[15, 30, 45].map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        duration === d ? "bg-brand/20 border-brand text-white font-bold" : "bg-white/5 border-line/60 text-[#9CA3AF]"
                      }`}
                    >
                      <span className="text-base font-bold text-white block">{d} min</span>
                      <span className="text-xs text-[#9CA3AF]">₹{Math.round(d * astrologer.pricing)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 block">3. Available Time Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Today, 2:30 PM (Instant)", "Today, 5:00 PM", "Tomorrow, 10:00 AM", "Tomorrow, 3:30 PM"].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                        slot === s ? "bg-brand/20 border-brand text-white" : "bg-white/5 border-line/60 text-[#9CA3AF]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 block">4. Primary Consultation Focus</label>
                <select
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="w-full bg-surface-2 border border-line rounded-xl p-3 text-sm text-white outline-none"
                >
                  <option value="Career Growth & Transits">Career Growth & Jupiter Transit</option>
                  <option value="Solar Return & Synastry">Solar Return & Synastry Reading</option>
                  <option value="Financial Life Path">Financial Life Path & Saturn Analysis</option>
                  <option value="Rahu Mahadasha Overview">Rahu Mahadasha Overview</option>
                </select>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-line/60">
                <div>
                  <p className="text-xs text-[#9CA3AF]">Total Order</p>
                  <p className="text-xl font-bold text-white">₹{cost}</p>
                </div>
                <button
                  onClick={() => setStep("payment")}
                  className="px-6 py-3 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(107,33,168,0.4)] flex items-center gap-2"
                >
                  Proceed to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Payment ─────────────────────────────────────────── */}
          {step === "payment" && (
            <div className="space-y-6 overflow-y-auto pr-1">
              <div className="p-4 bg-surface-2 border border-line rounded-lg">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Order Summary</p>
                <div className="flex justify-between text-sm py-1 border-b border-line-subtle">
                  <span className="text-white">{astrologer.name} ({duration} min {mode})</span>
                  <span className="text-white font-bold">₹{cost}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-line-subtle">
                  <span className="text-[#9CA3AF]">Scheduled Slot</span>
                  <span className="text-white">{slot}</span>
                </div>
                <div className="flex justify-between text-sm py-1 pt-2">
                  <span className="font-bold text-white">Total Due</span>
                  <span className="font-bold text-gold text-base">₹{cost}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3 block">Payment Method</label>
                <div className="space-y-2">
                  {[
                    { id: "wallet", label: "AstroLive Wallet", sub: "Balance: ₹3,400.00 Available", icon: CreditCard },
                    { id: "card", label: "Credit Card (•••• 8920)", sub: "Visa / Mastercard", icon: CreditCard },
                  ].map(p => (
                    <div
                      key={p.id}
                      onClick={() => setPaymentMethod(p.id)}
                      className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        paymentMethod === p.id ? "bg-brand/15 border-brand text-white" : "bg-white/5 border-line/60 text-[#9CA3AF]"
                      }`}
                    >
                      <div>
                        <p className="font-bold text-sm text-white">{p.label}</p>
                        <p className="text-xs text-[#9CA3AF]">{p.sub}</p>
                      </div>
                      <input type="radio" checked={paymentMethod === p.id} onChange={() => {}} className="accent-primary" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-line/60">
                <button onClick={() => setStep("select")} className="text-xs text-[#9CA3AF] hover:text-white">← Back</button>
                <button
                  onClick={() => setStep("waiting")}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center gap-2"
                >
                  Confirm & Join Waiting Room <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Waiting Room ────────────────────────────────────── */}
          {step === "waiting" && (
            <div className="text-center py-10 space-y-6">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-brand/30 blur-xl"
                />
                <img src={astrologer.avatar} alt={astrologer.name} className="w-24 h-24 rounded-full border-4 border-brand object-cover relative z-10 shadow-2xl" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-xs font-bold text-green-400 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Astrologer Online & Ready
                </span>
                <h3 className="text-2xl font-bold text-white">{astrologer.name} is connecting...</h3>
                <p className="text-xs text-[#9CA3AF] mt-1 max-w-sm mx-auto">
                  Your birth chart (Aug 15, 1994 · New Delhi) and Cosmic Memory have been loaded for the astrologer.
                </p>
              </div>

              <button
                onClick={() => setStep("session")}
                className="px-8 py-4 bg-brand hover:bg-brand/90 text-white font-bold rounded-lg text-base transition-all shadow-[0_0_30px_rgba(107,33,168,0.6)] animate-pulse"
              >
                Enter Live {mode === "chat" ? "Chat" : mode === "voice" ? "Call" : "Video"} Room
              </button>
            </div>
          )}

          {/* ── STEP 4: Live Session (Chat, Voice, or Video) ─────────────── */}
          {step === "session" && (
            <div className="flex flex-col h-[520px]">
              {/* Session Control Bar */}
              <div className="flex items-center justify-between p-3 bg-surface-2 border border-line rounded-lg mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Live {mode.toUpperCase()} Session</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-bold text-gold bg-gold/10 px-3 py-1 rounded-lg border border-gold/20">
                    ⏱ {Math.floor(sessionTime / 60)}:{String(sessionTime % 60).padStart(2, "0")}
                  </span>
                  
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      showNotes ? "bg-brand text-white" : "bg-white/10 text-[#9CA3AF] hover:text-white"
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Notes
                  </button>
                </div>

                <button
                  onClick={handleEndSession}
                  className="px-3.5 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  End & Save Session
                </button>
              </div>

              {/* Main Session Content Grid */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 min-h-0">
                {/* Mode Media Area */}
                <div className={`${showNotes ? "md:col-span-8" : "md:col-span-12"} flex flex-col min-h-0 bg-surface-2 border border-line/60 rounded-lg p-4 relative`}>
                  
                  {/* CHAT MODE */}
                  {mode === "chat" && (
                    <div className="flex flex-col h-full min-h-0">
                      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                        {messages.map((m, i) => (
                          <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] p-3.5 rounded-lg text-xs leading-relaxed ${
                              m.sender === "user" ? "bg-brand text-white rounded-tr-none shadow-md" : "bg-surface-2 text-white/90 border border-line rounded-tl-none"
                            }`}>
                              <p>{m.text}</p>
                              {m.attachment && (
                                <div className="mt-2 p-2 bg-black/30 rounded-lg flex items-center gap-2 border border-line text-[10px] text-ink-secondary">
                                  <FileText className="w-3.5 h-3.5 text-brand" /> {m.attachment}
                                </div>
                              )}
                              <p className="text-[9px] opacity-60 text-right mt-1">{m.time}</p>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex items-center gap-2 text-xs text-[#9CA3AF] p-2 bg-white/5 rounded-xl w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce" />
                            <span>{astrologer.name} is typing...</span>
                          </div>
                        )}
                      </div>

                      {/* Chat Input Controls */}
                      <div className="pt-3 flex gap-2 shrink-0 border-t border-line/60">
                        <button
                          type="button"
                          onClick={handleFileUpload}
                          title="Attach Document/Chart"
                          className="p-2.5 bg-white/5 hover:bg-surface-3 border border-line rounded-xl text-[#9CA3AF] hover:text-white transition-colors"
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>
                        <input
                          type="text"
                          value={inputText}
                          onChange={e => setInputText(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                          placeholder="Type your question or reflection..."
                          className="flex-1 bg-surface-2 border border-line rounded-xl px-4 py-2 text-xs text-white placeholder:text-[#6B7280] outline-none"
                        />
                        <button onClick={handleSendMessage} className="px-4 py-2 bg-brand rounded-xl text-white font-bold text-xs flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5" /> Send
                        </button>
                      </div>

                      {attachedFiles.length > 0 && (
                        <div className="mt-2 text-[10px] text-green-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Attached: {attachedFiles[attachedFiles.length - 1]}
                        </div>
                      )}
                    </div>
                  )}

                  {/* VOICE CALL MODE */}
                  {mode === "voice" && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: isMuted ? 1 : [1, 1.25, 1], opacity: isMuted ? 0.2 : [0.3, 0.7, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-blue-500/30 blur-2xl"
                        />
                        <img src={astrologer.avatar} alt={astrologer.name} className="w-28 h-28 rounded-full border-4 border-blue-400 object-cover relative z-10 shadow-2xl" />
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-white">{astrologer.name}</h4>
                        <p className="text-xs text-blue-400 font-semibold mt-1">
                          {isMuted ? "Microphone Muted" : "Voice Stream Connected · HD Audio"}
                        </p>
                      </div>

                      {/* Call Action Controls */}
                      <div className="flex items-center gap-4 pt-4">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className={`p-4 rounded-full border transition-all ${
                            isMuted ? "bg-red-500/20 border-red-500 text-red-400" : "bg-white/10 border-line-strong text-white hover:bg-white/20"
                          }`}
                        >
                          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>

                        <button
                          onClick={() => setIsSpeaker(!isSpeaker)}
                          className={`p-4 rounded-full border transition-all ${
                            isSpeaker ? "bg-brand/20 border-brand text-brand" : "bg-white/10 border-line-strong text-white"
                          }`}
                        >
                          {isSpeaker ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* VIDEO CALL MODE */}
                  {mode === "video" && (
                    <div className="flex flex-col h-full justify-between">
                      {/* Video Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
                        {/* Astrologer Stream */}
                        <div className="relative bg-black/60 rounded-xl overflow-hidden border border-line flex items-center justify-center">
                          <img src={astrologer.avatar} alt={astrologer.name} className="w-full h-full object-cover opacity-90" />
                          <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg text-xs font-bold text-white backdrop-blur-md">
                            {astrologer.name} (Live)
                          </div>
                        </div>

                        {/* User Selfie Stream */}
                        <div className="relative bg-black/60 rounded-xl overflow-hidden border border-line flex items-center justify-center">
                          {isCameraOff ? (
                            <div className="text-center p-4">
                              <CameraOff className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
                              <p className="text-xs text-[#9CA3AF]">Camera Turned Off</p>
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-brand/30 to-surface flex items-center justify-center text-center p-4">
                              <div>
                                <div className="w-16 h-16 rounded-full bg-brand/40 flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                                  A
                                </div>
                                <p className="text-xs font-bold text-white">Arjun Sharma (You)</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg text-xs font-bold text-white backdrop-blur-md">
                            You
                          </div>
                        </div>
                      </div>

                      {/* Video Controls Bar */}
                      <div className="flex items-center justify-center gap-4 pt-3 shrink-0">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className={`p-3.5 rounded-full border transition-all ${
                            isMuted ? "bg-red-500/20 border-red-500 text-red-400" : "bg-white/10 border-line-strong text-white"
                          }`}
                        >
                          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>

                        <button
                          onClick={() => setIsCameraOff(!isCameraOff)}
                          className={`p-3.5 rounded-full border transition-all ${
                            isCameraOff ? "bg-red-500/20 border-red-500 text-red-400" : "bg-white/10 border-line-strong text-white"
                          }`}
                        >
                          {isCameraOff ? <CameraOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Notes Panel Sideover */}
                {showNotes && (
                  <div className="md:col-span-4 flex flex-col bg-surface-2 border border-line rounded-lg p-4 min-h-0">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-gold" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live Session Notes</h4>
                    </div>
                    <textarea
                      value={userNotes}
                      onChange={e => setUserNotes(e.target.value)}
                      placeholder="Jot down key points during the consultation. These will be saved into Cosmic Memory..."
                      className="flex-1 bg-black/40 border border-line rounded-xl p-3 text-xs text-white placeholder:text-[#6B7280] outline-none resize-none"
                    />
                    <p className="text-[10px] text-[#9CA3AF] mt-2 italic">Notes automatically sync to your session log.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── STEP 5: AI Processing ───────────────────────────────────── */}
          {step === "processing" && (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(107,33,168,0.5)]">
                <Brain className="w-8 h-8 text-brand animate-pulse" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">AI Synthesis & Memory Extraction</h3>
                <p className="text-xs text-[#9CA3AF]">Analyzing transcript with {astrologer.name}...</p>
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand via-gold to-green-400 rounded-full"
                    animate={{ width: `${processingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-[11px] text-brand font-mono">{processingProgress}% Completed</p>
              </div>
            </div>
          )}

          {/* ── STEP 6: Complete ────────────────────────────────────────── */}
          {step === "complete" && (
            <div className="space-y-6 py-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Session Saved to Cosmic Memory!</h3>
                <p className="text-xs text-[#9CA3AF]">AI has extracted predictions and remedies from your consultation.</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-brand-light border border-brand/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-brand" />
                    <span className="text-xs font-bold text-brand uppercase">Extracted Prediction</span>
                  </div>
                  <p className="text-xs text-white font-medium">Job Offer in Tech Sector (88% confidence) · Window: Late August</p>
                </div>

                <div className="p-4 bg-gold/10 border border-gold/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-4 h-4 text-gold" />
                    <span className="text-xs font-bold text-gold uppercase">Active Remedy Assigned</span>
                  </div>
                  <p className="text-xs text-white font-medium">Venus Beej Mantra · 108 repetitions daily for 21 days</p>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(107,33,168,0.4)] flex items-center justify-center gap-2"
              >
                View Session Log & Memory Archive <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

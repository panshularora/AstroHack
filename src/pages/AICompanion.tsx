import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Sparkles, Send, Brain, ArrowRight, MessageSquare, Upload, Folder, ShieldCheck, FileText, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { mockChatHistory, mockLatestSession, type ChatMessage } from "@/lib/mock-data"
import { CosmicVaultModal } from "@/components/vault/CosmicVaultModal"
import { cn } from "@/lib/utils"
import { useUser } from "@/context/UserContext"

const suggestions = [
  "What did Acharya Vikram Shastri say about my transits?",
  "Show my active Venus Beej Mantra streak and remedies",
  "When is my next Jupiter 10th House prediction window?",
  "Attach my offer letter PDF to verify my career prediction",
]

function generateDynamicResponse(prompt: string, userName: string): { content: string; citations: Array<{ type: "consultation" | "prediction" | "remedy"; title: string; id: string }> } {
  const p = prompt.toLowerCase()

  if (p.includes("career") || p.includes("offer") || p.includes("vikram") || p.includes("job") || p.includes("tech")) {
    return {
      content: `**Acharya Vikram Shastri** analyzed your natal Kundli during your recent session. Your 10th House Jupiter transit forms an exact 120° trine with your natal Sun.\n\nKey prediction: **Senior Executive Opportunity** arriving between **August 20–25, 2026** with **88% verified confidence**. Upload your document PDF to the Cosmic Vault as soon as it arrives to confirm prediction accuracy.`,
      citations: [
        { type: "consultation", title: "Acharya Vikram Shastri · Career Transits", id: "c1" },
        { type: "prediction", title: "Career Window (Aug 20–25, 88% Conf.)", id: "p1" },
      ],
    }
  }

  if (p.includes("remedy") || p.includes("streak") || p.includes("mantra") || p.includes("venus")) {
    return {
      content: `Hello ${userName}! You are currently tracking your planetary remedies (*Om Draam Dreem Droum Sah Shukraya Namah* — 108 recitations at sunrise). This balances your Venus placement.\n\nKeep logging your daily meditation to build your active streak!`,
      citations: [
        { type: "remedy", title: "Venus Beej Mantra (Active)", id: "r1" },
        { type: "remedy", title: "Surya Arghya Morning Remedy", id: "r2" },
      ],
    }
  }

  if (p.includes("prediction") || p.includes("window") || p.includes("when")) {
    return {
      content: `Your next primary prediction window opens on **August 20, 2026**. Secondary financial breakthrough window is calculated for **September 15, 2026** under Jupiter's direct motion in your 10th House.`,
      citations: [
        { type: "prediction", title: "Career Opportunity Window (Aug 20–25)", id: "p1" },
        { type: "prediction", title: "Financial Investment Window (Sept 15)", id: "p2" },
      ],
    }
  }

  if (p.includes("attach") || p.includes("pdf") || p.includes("document") || p.includes("vault") || p.includes("visa")) {
    return {
      content: `You can attach your PDF offer letters, H1B visa stamps, or Kundli certificates directly to your predictions using the **Cosmic Vault**. Uploaded documents link directly to astrologer prediction receipts.`,
      citations: [
        { type: "consultation", title: "Cosmic Document Vault Active", id: "vault" },
      ],
    }
  }

  return {
    content: `Analyzed your **natal Kundli** transits regarding "${prompt}". Current celestial alignment indicates positive momentum under your active planetary Dasha. Your next major decision aperture opens in **17 days**.`,
    citations: [
      { type: "consultation", title: "Natal Kundli Transit Engine", id: "nk" },
    ],
  }
}

export function AICompanion() {
  const navigate = useNavigate()
  const { user } = useUser()
  const isDemoUser = user.email === "arjun.sharma@example.com" || user.id === "u1"

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (isDemoUser) return mockChatHistory
    return [
      {
        id: "msg-welcome",
        role: "assistant",
        content: `Welcome ${user.name}! I am your AI Cosmic Twin. Ask me anything about your natal Kundli (${user.sunSign || 'Sun'} / ${user.ascendant || 'Ascendant'}), active planetary Dasha transits, remedies, or prediction proofs.`,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      },
    ]
  })

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [vaultOpen, setVaultOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (text?: string) => {
    const content = text || input.trim()
    if (!content) return

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    }

    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const responseData = generateDynamicResponse(content, user.name)
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: responseData.content,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        citations: responseData.citations,
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="page-container max-w-6xl pb-28 font-sans">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Brain className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">Vedic Astrology Assistant</p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">Astro Assistant</h1>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
              Ask about your Kundli transits, active Dasha periods, daily remedies, and past consultation notes.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              className="bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl font-mono text-xs gap-1.5 cursor-pointer shadow-md"
              onClick={() => setVaultOpen(true)}
            >
              <Upload className="w-3.5 h-3.5" /> Attach Document
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Chat Feed */}
          <div className="lg:col-span-8 flex flex-col bg-[#090A0F]/90 border border-white/10 rounded-2xl h-[620px] shadow-2xl backdrop-blur-xl overflow-hidden">
            
            {/* Messages Scroll Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-4 max-w-[88%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-md",
                      msg.role === "user"
                        ? "bg-amber-500 text-black"
                        : "bg-gradient-to-br from-amber-600 to-amber-800 text-white"
                    )}
                  >
                    {msg.role === "user" ? "YOU" : "ASTRO"}
                  </div>

                  <div className="space-y-2">
                    <div
                      className={cn(
                        "p-4 rounded-2xl text-xs leading-relaxed shadow-md",
                        msg.role === "user"
                          ? "bg-amber-500 text-black font-semibold"
                          : "bg-white/5 border border-white/10 text-white"
                      )}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>

                    {msg.citations && msg.citations.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.citations.map((c, i) => (
                          <div
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 font-mono text-[10px] flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3 h-3 text-amber-400" />
                            <span>{c.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <span className="text-[9px] font-mono text-[#9CA3AF] block px-1">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Sparkles className="w-4 h-4 animate-spin" /> Calculating planetary transits...
                </div>
              )}
            </div>

            {/* Suggestions Chips */}
            <div className="p-3 border-t border-white/10 bg-white/[0.02] flex flex-wrap gap-2">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#9CA3AF] hover:text-white transition-all text-left cursor-pointer font-mono"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-4 border-t border-white/10 flex items-center gap-3 bg-[#090A0F]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about your Kundli, Dasha, remedies, or transits..."
                className="flex-1 h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs text-white placeholder:text-[#9CA3AF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              />
              <Button
                onClick={() => handleSend()}
                className="h-11 px-5 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-600 font-mono text-xs shrink-0 shadow-lg cursor-pointer"
              >
                <Send className="w-4 h-4 mr-1" /> Send
              </Button>
            </div>

          </div>

          {/* Right Context & Vault Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Document Vault Quick Trigger Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-surface to-black border border-blue-500/30 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 text-blue-400">
                <Folder className="w-5 h-5" />
                <h3 className="font-bold text-sm text-white">Cosmic Document Vault</h3>
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Predictions require proof. Upload offer letters, visas, marriage certificates, or Kundlis to verify astrologer accuracy.
              </p>
              <Button
                variant="ivory"
                size="sm"
                className="w-full rounded-xl text-xs font-bold gap-2 cursor-pointer"
                onClick={() => setVaultOpen(true)}
              >
                <FileText className="w-4 h-4" /> Open Life Vault & Upload PDF
              </Button>
            </div>

            {/* Latest Session Details */}
            {isDemoUser ? (
              <div className="p-6 rounded-2xl bg-[#090A0F]/90 border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" /> Latest Consultation
                  </span>
                  <span className="text-[10px] font-mono text-amber-400">July 15, 2026</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{mockLatestSession.astrologer.name}</p>
                  <p className="text-[11px] text-[#9CA3AF] font-mono mt-0.5">{mockLatestSession.topic}</p>
                </div>
                <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-2">
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                    "{mockLatestSession.summary.advice}"
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl text-xs font-mono border-white/20 text-white cursor-pointer"
                  onClick={() => navigate("/app/memory")}
                >
                  View Full Memory Log <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#090A0F]/90 border border-white/10 space-y-4 shadow-xl text-center">
                <UserCheck className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">No Consultations Logged Yet</h4>
                <p className="text-xs text-[#9CA3AF] font-mono">
                  Consult with a verified astrologer to automatically record transcripts and remedies.
                </p>
                <Button
                  size="sm"
                  className="w-full rounded-xl text-xs font-mono bg-amber-500 text-black font-bold cursor-pointer"
                  onClick={() => navigate("/app/verified")}
                >
                  Consult Astrologer Now
                </Button>
              </div>
            )}

          </div>

        </div>
      </div>

      <CosmicVaultModal
        isOpen={vaultOpen}
        onClose={() => setVaultOpen(false)}
      />
    </div>
  )
}
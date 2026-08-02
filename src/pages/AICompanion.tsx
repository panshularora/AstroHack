import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Sparkles, Send, Brain, BookOpen, ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { mockChatHistory, mockLatestSession, type ChatMessage } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const suggestions = [
  "What did Dr. Sarah say about my career?",
  "Show my active remedies and streaks",
  "When is my next prediction window?",
  "Recommend an astrologer for relationship synastry",
]

function generateDynamicResponse(prompt: string): { content: string; citations: Array<{ type: "consultation" | "prediction" | "remedy"; title: string; id: string }> } {
  const p = prompt.toLowerCase()

  if (p.includes("career") || p.includes("job") || p.includes("sarah") || p.includes("work")) {
    return {
      content: "Dr. Sarah Chen noted during your July 15 session that your 10th House Jupiter transit forms a 120° trine with your Leo Sun. An executive job offer in the tech sector is predicted between August 20–25 with 88% confidence. She advised finalizing portfolio updates by this Friday.",
      citations: [
        { type: "consultation", title: "Dr. Sarah Chen · Career & Transits", id: "c1" },
        { type: "prediction", title: "Tech Sector Offer (88% Conf.)", id: "p1" },
      ],
    }
  }

  if (p.includes("remedy") || p.includes("streak") || p.includes("mantra")) {
    return {
      content: "You are currently on Day 11 of your 21-day Venus Beej Mantra remedy (108 recitations daily at sunrise). This balances your 12th House Venus placement. You also have Morning Sun Salutations active with a 14-day streak.",
      citations: [
        { type: "remedy", title: "Venus Beej Mantra (Day 11/21)", id: "r1" },
        { type: "remedy", title: "Sun Salutations (14-Day Streak)", id: "r2" },
      ],
    }
  }

  if (p.includes("prediction") || p.includes("window") || p.includes("when")) {
    return {
      content: "Your next major prediction window opens on August 20, 2026 (Tech Sector Job Offer). A secondary financial breakthrough window is calculated for September 15 under Jupiter's direct movement.",
      citations: [
        { type: "prediction", title: "Tech Offer Window (Aug 20–25)", id: "p1" },
        { type: "prediction", title: "Financial Investment Window (Sept 15)", id: "p2" },
      ],
    }
  }

  if (p.includes("astrologer") || p.includes("relationship") || p.includes("match")) {
    return {
      content: "For relationship synastry, Pandit Rajesh Kumar (31/36 Gunas Ashtakoot Specialist, 97.4% Verified Accuracy, ₹15/min) is online right now. Would you like me to open your Live Consultation Room?",
      citations: [
        { type: "consultation", title: "Pandit Rajesh Kumar (Verified Expert)", id: "a1" },
      ],
    }
  }

  return {
    content: `Analyzed your Leo Sun, Scorpio Ascendant, and Rahu Mahadasha transits regarding "${prompt}". Current celestial alignment indicates positive momentum under Jupiter's 10th House transit. Your next major action window opens in 18 days.`,
    citations: [
      { type: "consultation", title: "Natal Kundli Transit Map", id: "nk" },
    ],
  }
}

export function AICompanion() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
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
      const responseData = generateDynamicResponse(content)
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: responseData.content,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        citations: responseData.citations,
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1100)
  }

  return (
    <div className="page-container max-w-5xl pb-28">
      {/* Header */}
      <div className="mb-8 border-b border-line/60 pb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
            <Sparkles className="w-4 h-4 text-brand" />
          </div>
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">AstroAI Twin Engine</p>
        </div>
        <h1 className="text-h1 font-display text-ink tracking-tight">Interactive AI Companion</h1>
        <p className="text-sm text-ink-secondary mt-1">
          Proactive intelligence with full access to Arjun's birth chart, active transits, predictions, and verified consultation memory.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-8">
          <div className="rounded-lg bg-surface border border-line flex flex-col h-[600px] overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-3.5 px-5 py-3.5 border-b border-line/60 bg-surface-2/40">
              <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
                <Brain className="w-4 h-4 text-brand" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink">AstroLive AI Twin</p>
                <p className="text-caption mt-0.5 font-mono">Leo Sun · Scorpio Ascendant · Rahu Dasha</p>
              </div>
              <div className="ml-auto flex items-center gap-2 font-mono text-xs">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-ink-tertiary">Real-Time Sync</span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={cn("flex flex-col", msg.role === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-md px-4 py-3 text-xs leading-relaxed font-sans",
                      msg.role === "user"
                        ? "bg-brand text-white border border-brand font-medium"
                        : "bg-surface-2/80 border border-line text-ink"
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="flex items-center flex-wrap gap-2 mt-2 font-mono">
                      {msg.citations.map(c => (
                        <span key={c.id} className="text-[10px] bg-surface-2 border border-brand/30 px-2 py-0.5 rounded text-gold-bright">
                          {c.title}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="text-[10px] font-mono text-ink-tertiary mt-1">{msg.timestamp}</span>
                </div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start"
                  >
                    <div className="bg-surface-2 border border-line rounded-md px-4 py-3 flex items-center gap-1.5 font-mono text-xs text-ink-secondary">
                      <Sparkles className="w-3.5 h-3.5 text-brand animate-spin" />
                      <span>Analyzing Kundli transits...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggestions */}
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-xs font-mono bg-surface-2 border border-line hover:border-brand/40 text-ink-secondary hover:text-ink rounded-md px-3 py-1.5 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-5 py-3.5 border-t border-line/60 bg-surface-2/30">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Ask about your transits, remedies, or past sessions..."
                  className="flex-1 h-10 rounded-md border border-line bg-surface-2 px-3.5 text-xs text-ink placeholder:text-ink-tertiary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand font-sans"
                />
                <Button
                  size="sm"
                  className="rounded-md font-mono"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar — ivory editorial split */}
        <div className="lg:col-span-4 space-y-5 ivory-content">
          {/* Memory Context */}
          <div className="bg-ivory border-l border-ivory-border p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-ivory-border pb-3">
              <BookOpen className="w-4 h-4 text-brand" />
              <h3 className="font-mono text-[10px] tracking-[0.16em] uppercase text-brand">Memory Context</h3>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-ink-ivory-tertiary">Consultations</span>
                <span className="font-bold text-ink-ivory">{mockLatestSession.duration} min last</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-ivory-tertiary">Active Predictions</span>
                <span className="font-bold text-ink-ivory">{mockLatestSession.predictions.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-ivory-tertiary">Active Remedies</span>
                <span className="font-bold text-ink-ivory">{mockLatestSession.remedies.length}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full rounded-md mt-2 font-mono" onClick={() => navigate("/app/memory")}>
              View Cosmic Memory <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Latest Session */}
          <div className="bg-ivory border-l border-ivory-border p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-ivory-border pb-3">
              <MessageSquare className="w-4 h-4 text-brand" />
              <h3 className="font-mono text-[10px] tracking-[0.16em] uppercase text-brand">Latest Session Notes</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-caption font-mono uppercase text-ink-ivory-tertiary">Topic</p>
                <p className="text-xs font-bold text-ink-ivory mt-0.5">{mockLatestSession.topic}</p>
              </div>
              <div>
                <p className="text-caption font-mono uppercase text-ink-ivory-tertiary">Astrologer</p>
                <p className="text-xs font-bold text-ink-ivory mt-0.5">{mockLatestSession.astrologer.name}</p>
              </div>
              <div>
                <p className="text-caption font-mono uppercase text-ink-ivory-tertiary mb-2">Key Guidance</p>
                <ul className="space-y-2">
                  {mockLatestSession.summary.points.map((point, i) => (
                    <li key={i} className="text-xs text-ink-ivory-secondary flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
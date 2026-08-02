import { useState } from "react"
import { Send, User, Sparkles, BookOpen, Target, HeartPulse } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { mockChatHistory, type ChatMessage } from "@/lib/mock-data"

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const getCitationIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <BookOpen className="w-3 h-3 text-blue-400" />
      case 'prediction': return <Target className="w-3 h-3 text-gold" />
      case 'remedy': return <HeartPulse className="w-3 h-3 text-emerald-400" />
      default: return <Sparkles className="w-3 h-3 text-primary" />
    }
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userText = input
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, newMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const aiMsg: ChatMessage = {
        id: `msg_ai_${Date.now()}`,
        role: "assistant",
        content: `Based on your Cosmic Memory and birth chart (Aug 15, 1994), today's Jupiter transit in your 10th house directly supports your career query.

In your July 15 session, **Dr. Sarah Chen** predicted a tech offer window opening between late August and early September (88% confidence). Your active **Venus Beej Mantra** remedy (Day 11 of 21) is currently maintaining high mental clarity.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: [
          { type: "consultation", title: "Career Growth & Transits", id: "c1" },
          { type: "prediction", title: "Job Offer in Tech Sector", id: "ep1" },
          { type: "remedy", title: "Venus Beej Mantra Cycle", id: "er1" }
        ]
      }
      setMessages(prev => [...prev, aiMsg])
    }, 1400)
  }

  return (
    <div className="flex flex-col h-[600px] bg-card/50 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl">
      {/* Proactive Alert Banner */}
      <div className="p-3 bg-primary/10 border-b border-primary/20 flex items-center justify-between text-xs px-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-white font-medium">Proactive Memory Alert: Career prediction window opens in 3 days.</span>
        </div>
        <span className="text-primary font-bold">100% Synced</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className="shrink-0 mt-1">
                {msg.role === 'assistant' ? (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/5">
                    <User className="w-4 h-4 text-white/70" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white shadow-md rounded-tr-sm' 
                    : 'bg-black/40 text-white/90 border border-white/10 rounded-tl-sm backdrop-blur-sm'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>

                {msg.citations && (
                  <div className="flex flex-wrap gap-2">
                    {msg.citations.map((cite, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] cursor-pointer hover:bg-white/10 transition-colors">
                        {getCitationIcon(cite.type)}
                        {cite.title}
                      </div>
                    ))}
                  </div>
                )}
                <span className={`text-[10px] text-[#9CA3AF] font-bold ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF] p-3 bg-white/5 rounded-2xl w-fit border border-white/10">
            <Sparkles className="w-4 h-4 text-primary animate-spin" />
            <span>AI Companion is reading your Cosmic Memory...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-black/40 border-t border-white/10 backdrop-blur-xl">
        <div className="relative flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your career window, Dr. Sarah's reading, or active remedies..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm text-white placeholder:text-[#9CA3AF]/70 focus:outline-none focus:border-primary/50 transition-colors resize-none overflow-hidden min-h-[56px] max-h-[150px]"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <button
            onClick={handleSend}
            className="absolute right-2 bottom-2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 text-center">
          <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">AstroLive AI remembers your complete cosmic journey</span>
        </div>
      </div>
    </div>
  )
}

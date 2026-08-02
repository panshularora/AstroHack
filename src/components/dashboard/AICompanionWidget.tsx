import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Brain, Send, ArrowRight, Sparkles } from "lucide-react"

const suggestedPrompts = [
  "What should I focus on this week?",
  "How is my career prediction progressing?",
  "Should I sign the contract now?",
]

const aiResponse = "Based on today's Jupiter transit through your 10th house and the completion of your Venus remedy cycle, this week is exceptionally strong for career negotiations. Your prediction from Dr. Sarah (85% confidence) enters its active window in 3 days — I'd recommend finalizing your talking points by Thursday."

export function AICompanionWidget() {
  const navigate = useNavigate()
  const [input, setInput] = useState("")
  const [showResponse, setShowResponse] = useState(false)
  const [typing, setTyping] = useState(false)

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setShowResponse(true)
    }, 1400)
  }

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 h-full flex flex-col shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(107,33,168,0.3)]">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">AI Companion</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-[#9CA3AF]">Aware of your full Cosmic Memory</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/app/companion")}
          className="text-xs font-bold text-primary hover:text-lavender transition-colors flex items-center gap-1"
        >
          Full Chat <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Suggested prompts */}
      {!showResponse && !typing && (
        <div className="flex flex-col gap-2 mb-4">
          {suggestedPrompts.map(p => (
            <button
              key={p}
              onClick={() => { setInput(p); sendMessage(p) }}
              className="flex items-center gap-2 text-left px-4 py-2.5 bg-white/5 hover:bg-primary/10 border border-white/8 hover:border-primary/30 rounded-xl text-sm text-[#9CA3AF] hover:text-white transition-all group"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary shrink-0 transition-colors" />
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Typing indicator */}
      <AnimatePresence>
        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 mb-4 p-3 bg-primary/8 border border-primary/15 rounded-2xl"
          >
            <Brain className="w-4 h-4 text-primary shrink-0" />
            <div className="flex gap-1">
              {[0, 0.2, 0.4].map(d => (
                <motion.div key={d} className="w-1.5 h-1.5 bg-primary/60 rounded-full"
                  animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI response */}
      <AnimatePresence>
        {showResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-primary/8 border border-primary/20 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">AI Response</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">{aiResponse}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="mt-auto flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask anything about your journey…"
          className="flex-1 bg-white/5 border border-white/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#6B7280] outline-none transition-all"
        />
        <button
          onClick={() => sendMessage(input)}
          className="w-10 h-10 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-xl flex items-center justify-center text-primary transition-colors shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

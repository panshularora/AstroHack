import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Play, Pause, ChevronLeft, ChevronRight, Sparkles, Target, Sun,
  CheckCircle2, Volume2, VolumeX, ShieldCheck
} from "lucide-react"

interface CosmicReplayProps {
  isOpen: boolean
  onClose: () => void
  sessionData?: {
    astrologerName: string
    astrologerAvatar: string
    date: string
    topic: string
    duration: number
    cost: number
  }
}

export function CosmicReplayModal({ isOpen, onClose, sessionData }: CosmicReplayProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  const astroName = sessionData?.astrologerName || "Dr. Sarah Chen"
  const astroAvatar = sessionData?.astrologerAvatar || "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  const topic = sessionData?.topic || "Career Growth & Jupiter 10th House Transit"
  const dateStr = sessionData?.date || "July 15, 2026"

  const slides = [
    {
      id: "intro",
      title: "Consultation Journey Overview",
      subtitle: "Session Recording & AI Memory Synthesis",
      render: () => (
        <div className="text-center space-y-6 py-4">
          <div className="relative w-24 h-24 mx-auto">
            <img src={astroAvatar} alt={astroName} className="w-24 h-24 rounded-full border-4 border-primary object-cover shadow-2xl" />
            <div className="absolute -bottom-2 -right-2 bg-gold p-1.5 rounded-full border-2 border-card text-navy">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="px-3 py-1 bg-primary/20 border border-primary/30 text-lavender rounded-full text-xs font-bold uppercase tracking-wider">
              Recorded Session
            </span>
            <h3 className="text-2xl font-bold text-white mt-3">{topic}</h3>
            <p className="text-xs text-[#9CA3AF] mt-1">
              With <strong className="text-white">{astroName}</strong> · {dateStr}
            </p>
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-white">45 Min Duration</span>
            <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-white">₹1,575 Paid</span>
            <span className="px-3 py-1.5 bg-green-500/15 border border-green-500/30 text-green-400 font-bold">5.0 Star Rating</span>
          </div>
        </div>
      )
    },
    {
      id: "highlights",
      title: "Key Transcript Highlights",
      subtitle: "Critical insights spoken during the session",
      render: () => (
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold text-xs">1</div>
            <div>
              <p className="text-xs text-white/90 leading-relaxed italic font-serif text-sm">
                "Jupiter is transiting your 10th house, creating a rare trine with your natal Sun. Do not make hasty resignations now."
              </p>
              <span className="text-[10px] text-[#9CA3AF] mt-1 block">Timestamp 12:45 · Topic: Timing Strategy</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 text-gold font-bold text-xs">2</div>
            <div>
              <p className="text-xs text-white/90 leading-relaxed italic font-serif text-sm">
                "Use the next 3 weeks to quietly upskill. A tech leadership opportunity will manifest through an old networking connection."
              </p>
              <span className="text-[10px] text-[#9CA3AF] mt-1 block">Timestamp 28:10 · Topic: Career Pivot</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "predictions",
      title: "Extracted Predictions",
      subtitle: "AI-parsed target dates & confidence levels",
      render: () => (
        <div className="space-y-4 py-2">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/20 to-card border border-primary/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                <Target className="w-3.5 h-3.5" /> High Confidence Prediction
              </span>
              <span className="text-xs font-bold text-gold bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/30">88% Confidence</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">Job Offer in Tech Sector (VP / Lead)</h4>
            <p className="text-xs text-[#9CA3AF]">Target Window: Late August – Early September 2026</p>
            <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-white/80">Status: Active Window Opening in 3 Days</span>
              <span className="text-green-400 font-bold">Auto-tracked in Memory</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-bold text-white">Financial Bonus / Investment Return</h4>
              <span className="text-xs font-bold text-white">75% Confidence</span>
            </div>
            <p className="text-xs text-[#9CA3AF]">Target Window: October 2026</p>
          </div>
        </div>
      )
    },
    {
      id: "remedies",
      title: "Assigned Remedies & Routines",
      subtitle: "Customized planetary harmony practices",
      render: () => (
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-2xl bg-gold/10 border border-gold/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0 text-gold">
              <Sun className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-white">Venus Beej Mantra Cycle</h4>
                <span className="text-[10px] font-bold text-gold bg-gold/20 px-2 py-0.5 rounded-full">Day 11 of 21</span>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-1">Chant 108 times daily at sunrise. Improves social magnetism and clarity.</p>
              <div className="mt-2 text-xs text-green-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 4-Day Streak Active
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 text-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white">Morning Sun Meditation</h4>
              <p className="text-xs text-[#9CA3AF] mt-1">10 minutes facing east at sunrise. Enhances focus during interviews.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "actions",
      title: "Follow-Up Action Plan",
      subtitle: "Clear next steps generated for Arjun",
      render: () => (
        <div className="space-y-3 py-2">
          {[
            { step: "1", task: "Update resume & portfolio emphasizing tech leadership by Friday.", done: true },
            { step: "2", task: "Reach out to former colleague & mentor for coffee catch-up.", done: true },
            { step: "3", task: "Complete Venus Beej Mantra daily through August 10th.", done: false },
            { step: "4", task: "Schedule 30-min follow-up check-in with Dr. Sarah Chen.", done: false },
          ].map(a => (
            <div key={a.step} className="p-3.5 rounded-xl bg-white/4 border border-white/8 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  a.done ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-white/10 text-[#9CA3AF]"
                }`}>
                  {a.step}
                </span>
                <span className={`text-xs ${a.done ? "text-white font-medium line-through opacity-70" : "text-white font-semibold"}`}>{a.task}</span>
              </div>
              {a.done && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
            </div>
          ))}
        </div>
      )
    },
    {
      id: "outcome",
      title: "User Reflection & Final Outcome",
      subtitle: "Saved into Arjun's Cosmic Memory Vault",
      render: () => (
        <div className="space-y-4 py-2">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-card to-card border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Verified Memory Entry
            </div>
            <p className="text-sm text-white/90 leading-relaxed font-medium">
              "Felt completely understood during Dr. Sarah's session. Following her timeline strategy gave me full confidence during my negotiations."
            </p>
            <span className="text-[10px] text-[#9CA3AF] mt-2 block">Voice note recorded July 16 · Saved to Lifelong Timeline</span>
          </div>

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-between">
            <span className="text-xs text-white font-bold">Memory Node ID: #CM-2026-0715</span>
            <span className="text-xs font-bold text-lavender flex items-center gap-1">
              Cosmic Memory Synced <Sparkles className="w-3.5 h-3.5 text-primary" />
            </span>
          </div>
        </div>
      )
    }
  ]

  // Auto-play timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => {
        if (prev >= slides.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 4500)
    return () => clearInterval(timer)
  }, [isOpen, isPlaying, slides.length])

  if (!isOpen) return null

  const handleNext = () => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))
  const handlePrev = () => setCurrentSlide(prev => Math.max(0, prev - 1))

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-card border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden flex flex-col min-h-[520px]"
        >
          {/* Header Story Progress Bars */}
          <div className="flex gap-1.5 mb-6">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => { setCurrentSlide(idx); setIsPlaying(false); }}
                className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden cursor-pointer"
              >
                <div
                  className={`h-full bg-gradient-to-r from-primary to-lavender transition-all duration-300 ${
                    idx < currentSlide ? "w-full" : idx === currentSlide ? "w-full animate-pulse" : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Top Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Cosmic Replay</span>
              <span className="text-[10px] text-[#9CA3AF] font-mono">({currentSlide + 1} / {slides.length})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-primary" />}
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-green-400" />}
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide Title */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">{slides[currentSlide].title}</h3>
            <p className="text-xs text-[#9CA3AF]">{slides[currentSlide].subtitle}</p>
          </div>

          {/* Main Slide Render */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {slides[currentSlide].render()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Slide Navigation */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-xs font-bold text-white flex items-center gap-1 shadow-md cursor-pointer"
              >
                Next Highlight <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-xs font-bold text-white flex items-center gap-1 shadow-md cursor-pointer"
              >
                Close Replay <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

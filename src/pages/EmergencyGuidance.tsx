import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ShieldAlert, Phone, Heart, Brain, ArrowLeft, Wind } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function EmergencyGuidance() {
  const navigate = useNavigate()
  const [breathing, setBreathing] = useState(false)
  const [breathCount, setBreathCount] = useState(0)

  useEffect(() => {
    if (!breathing) return
    const interval = setInterval(() => setBreathCount(c => c + 1), 4000)
    return () => clearInterval(interval)
  }, [breathing])

  const resources = [
    { icon: Phone, title: "Mental Health Crisis Helpline", desc: "KIRAN Helpline: 1800-599-0019 · iCall: 9152987821", action: "Call Now" },
    { icon: Brain, title: "AstroAI Twin Support", desc: "Instant grounding guidance based on active transits", action: "Open Chat" },
    { icon: Heart, title: "Astrologer Emergency Queue", desc: "Priority connection with online verified experts", action: "Connect" },
  ]

  return (
    <div className="page-container max-w-3xl pb-28">
      <div className="space-y-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-mono text-ink-secondary hover:text-ink transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        <div className="text-center py-6 border-b border-line/60">
          <div className="w-14 h-14 rounded-md bg-danger-light border border-danger/30 flex items-center justify-center mx-auto mb-4 text-danger">
            <ShieldAlert className="w-7 h-7 text-danger" />
          </div>
          <h1 className="text-h1 font-display text-ink tracking-tight">Cosmic Grounding & SOS</h1>
          <p className="text-sm text-ink-secondary mt-1 max-w-md mx-auto">
            If you are feeling overwhelmed by Saturn Sade Sati or intense transits, take a moment to center yourself.
          </p>
        </div>

        {/* Breathing Exercise */}
        <div className="p-8 rounded-lg bg-surface border border-line text-center space-y-4">
          <motion.div
            animate={breathing ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={breathing ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
            className="w-20 h-20 rounded-full bg-surface-2 border border-brand/40 flex items-center justify-center mx-auto text-brand"
          >
            <Wind className="w-7 h-7 text-brand" />
          </motion.div>
          <div>
            <p className="text-body font-bold text-ink">
              {breathing ? `Breathe ${breathCount % 2 === 0 ? "In (4s)" : "Out (4s)"}` : "Pranayama Breathing Exercise"}
            </p>
            <p className="text-xs font-mono text-ink-tertiary mt-1">
              {breathing ? `${Math.floor(breathCount / 2)} cycles completed` : "Equalize your nervous system before major decisions"}
            </p>
          </div>
          <Button variant={breathing ? "outline" : "primary"} size="sm" className="rounded-md font-mono" onClick={() => { setBreathing(!breathing); setBreathCount(0) }}>
            {breathing ? "Stop Practice" : "Begin Pranayama"}
          </Button>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h2 className="text-h2 font-display text-ink">Immediate Support Resources</h2>
          {resources.map(r => (
            <div key={r.title} className="p-5 rounded-lg bg-surface border border-line flex items-center justify-between gap-4 font-sans">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md bg-surface-2 border border-line flex items-center justify-center shrink-0 text-brand">
                  <r.icon className="w-4 h-4 text-brand" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink">{r.title}</p>
                  <p className="text-caption font-mono mt-0.5">{r.desc}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-md font-mono shrink-0">{r.action}</Button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs font-mono text-ink-tertiary pt-4">
          If you are in immediate medical danger, please dial 112 or visit your nearest hospital.
        </p>
      </div>
    </div>
  )
}
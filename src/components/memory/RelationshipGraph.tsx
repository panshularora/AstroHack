import { useState } from "react"
import { motion } from "framer-motion"
import { Target, CheckCircle2, Sparkles, Brain, Sun, BookOpen, Network, Maximize2 } from "lucide-react"
import { LifeGraphModal } from "@/components/graph/LifeGraphModal"

export function RelationshipGraph() {
  const [selectedNode, setSelectedNode] = useState<string>("p1")
  const [modalOpen, setModalOpen] = useState(false)

  const nodes = [
    { id: "t1", title: "Jupiter 10th House Transit", type: "transit", date: "July 01", icon: Sparkles, color: "border-purple-400 bg-purple-500/20 text-purple-300", glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]" },
    { id: "c1", title: "Dr. Sarah Chen Consultation", type: "consultation", date: "July 15", icon: BookOpen, color: "border-brand bg-brand/20 text-ink-secondary", glow: "shadow-[0_0_20px_rgba(107,33,168,0.4)]" },
    { id: "p1", title: "Job Offer Prediction (88%)", type: "prediction", date: "Aug 25 Window", icon: Target, color: "border-gold bg-gold/20 text-gold", glow: "shadow-[0_0_20px_rgba(245,158,11,0.4)]" },
    { id: "r1", title: "Venus Beej Mantra Routine", type: "remedy", date: "Day 11 of 21", icon: Sun, color: "border-emerald-400 bg-emerald-500/20 text-emerald-400", glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]" },
    { id: "m1", title: "VP Lead Offer Confirmed", type: "milestone", date: "Aug 14", icon: CheckCircle2, color: "border-blue-400 bg-blue-500/20 text-blue-400", glow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]" },
  ]

  const detailsMap: Record<string, { desc: string; connection: string }> = {
    t1: { desc: "Major planetary transit in your 10th house of career & authority.", connection: "Directly triggered Dr. Sarah's July 15 career reading." },
    c1: { desc: "45-min reading with Dr. Sarah Chen analyzing Rahu Mahadasha cycle.", connection: "Generated high-confidence Tech Lead offer prediction." },
    p1: { desc: "88% confidence prediction for VP / Lead tech offer in late August.", connection: "Linked to active Venus remedy routine & offer confirmation." },
    r1: { desc: "108 Chants daily at sunrise. 4-day streak active.", connection: "Elevated emotional resilience during interview phase by +24%." },
    m1: { desc: "Verified outcome confirmed true with attached offer letter evidence.", connection: "Updated Dr. Sarah's AstroVerified Trust Score (98 → 99)." },
  }

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            AI Memory Map & Relationship Network <Network className="w-5 h-5 text-brand" />
          </h2>
          <p className="text-[#9CA3AF]">
            Explore how consultations, transits, and remedies interconnect across your life journey.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-brand/20 hover:bg-brand/30 border border-brand/40 text-ink-secondary rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Maximize2 className="w-3.5 h-3.5" /> Fullscreen Memory Graph
        </button>
      </div>

      <div className="bg-surface border border-line rounded-lg p-6 md:p-8 relative overflow-hidden">
        {/* Interactive Visual Graph Web */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-6 border-b border-line/60">
          {nodes.map((n, idx) => {
            const Icon = n.icon
            const isSelected = selectedNode === n.id

            return (
              <div key={n.id} className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
                <div
                  onClick={() => setSelectedNode(n.id)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-all ${n.color} ${
                    isSelected ? `${n.glow} scale-110 border-white ring-4 ring-primary/30` : "opacity-80 hover:opacity-100"
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-[10px] text-[#9CA3AF] font-mono block">{n.date}</span>
                    <h4 className="text-xs font-bold text-white max-w-[120px] leading-tight truncate">{n.title}</h4>
                  </div>
                </div>

                {idx < nodes.length - 1 && (
                  <div className="hidden lg:block w-12 h-0.5 bg-gradient-to-r from-brand/60 to-gold/60 relative">
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
                      animate={{ left: ["0%", "100%"] }}
                      transition={{ duration: 2, delay: idx * 0.4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Selected Node Cosmic Detail Banner */}
        <div className="mt-6 p-4 bg-surface-2 border border-line/60 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/20 border border-brand/40 flex items-center justify-center text-brand shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-brand uppercase tracking-wider">Memory Node Detail</span>
              <h4 className="text-sm font-bold text-white">{nodes.find(n => n.id === selectedNode)?.title}</h4>
              <p className="text-xs text-[#9CA3AF] mt-0.5">{detailsMap[selectedNode]?.desc}</p>
            </div>
          </div>

          <div className="p-3 bg-black/40 rounded-xl border border-line/60 text-xs text-ink-secondary font-medium">
            <strong className="text-ink font-semibold">Interconnected Impact:</strong> {detailsMap[selectedNode]?.connection}
          </div>
        </div>
      </div>

      <LifeGraphModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Cpu, FileText, CheckCircle2, ShieldCheck, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

interface LifestrandNode {
  id: string
  layer: "reality" | "decisions" | "time" | "learning"
  title: string
  subtitle: string
  date: string
  status: string
  color: string
  details: string
}

const mockNodes: LifestrandNode[] = [
  {
    id: "n1",
    layer: "reality",
    title: "Google Offer Letter.pdf",
    subtitle: "Document Vault Anchor",
    date: "Aug 2026",
    status: "Verified PDF",
    color: "from-blue-500/20 to-cyan-500/20 border-blue-400/40 text-blue-300",
    details: "Attached proof document confirming Staff L5 Offer with start date Sept 1."
  },
  {
    id: "n2",
    layer: "decisions",
    title: "Accept Staff Offer vs Stay in Meta",
    subtitle: "Career Crossroads Node",
    date: "Aug 2026",
    status: "High Impact",
    color: "from-gold/20 to-amber-500/20 border-gold/40 text-gold-bright",
    details: "Pivotal career move evaluating team trajectory, compensation, and transit alignment."
  },
  {
    id: "n3",
    layer: "time",
    title: "Jupiter 10th House Transit",
    subtitle: "Mahadasha Alignment",
    date: "2026 - 2028",
    status: "Peak Window",
    color: "from-purple-500/20 to-pink-500/20 border-purple-400/40 text-purple-300",
    details: "Jupiter transiting 10th house of career & status. Sun-Jupiter 120° trine active."
  },
  {
    id: "n4",
    layer: "learning",
    title: "100% Career Jump Correlation",
    subtitle: "AI Proactive Insight",
    date: "Discovered Today",
    status: "AI Pattern",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-400/40 text-emerald-300",
    details: "AI discovered 3 past promotions occurred during identical Jupiter Dasha sub-periods."
  }
]

export function LifestrandCanvas({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedNode, setSelectedNode] = useState<LifestrandNode | null>(mockNodes[1])
  const [zoomLevel, setZoomLevel] = useState<"3H" | "TODAY" | "WEEK" | "YEAR">("TODAY")

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#090A0F]/95 backdrop-blur-2xl flex flex-col p-4 md:p-8 overflow-hidden font-sans"
      >
        {/* Top Header Control */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/10">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">The Lifestrand Spatial Canvas</h2>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-[10px] uppercase tracking-widest font-mono">
                  Temporal OS v2.0
                </Badge>
              </div>
              <p className="text-xs text-[#9CA3AF]">
                4 Synchronized Layers of Life: Reality ── Decisions ── Time ── AI Learning
              </p>
            </div>
          </div>

          {/* Temporal Zoom Selector */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            {(["3H", "TODAY", "WEEK", "YEAR"] as const).map((z) => (
              <button
                key={z}
                onClick={() => setZoomLevel(z)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                  zoomLevel === z
                    ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 shadow-sm"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                {z}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Spatial 4-Layer Canvas Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 overflow-y-auto min-h-0">
          
          {/* Main 4-Layer Strand Canvas */}
          <div className="lg:col-span-2 relative flex flex-col justify-around gap-4 bg-gradient-to-b from-white/[0.02] to-transparent p-6 rounded-2xl border border-white/10 overflow-hidden">
            
            {/* Temporal Glowing Cursor Bar */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent pointer-events-none shadow-[0_0_15px_rgba(25,211,243,0.5)]">
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-cyan-400 text-black text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shadow-lg">
                NOW CURSOR
              </div>
            </div>

            {/* Layer 1: REALITY */}
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
                  LAYER 1 — REALITY (Documents & Proof)
                </span>
                <span className="h-[1px] flex-1 bg-blue-500/20"></span>
              </div>
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedNode(mockNodes[0])}
                  className={`p-3.5 rounded-xl bg-gradient-to-r ${mockNodes[0].color} border cursor-pointer flex items-center gap-3 shadow-md w-full max-w-sm`}
                >
                  <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">{mockNodes[0].title}</p>
                    <p className="text-[10px] text-blue-300/80 font-mono">{mockNodes[0].subtitle}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Layer 2: DECISIONS */}
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                  LAYER 2 — DECISIONS (Choices & Agency)
                </span>
                <span className="h-[1px] flex-1 bg-gold/20"></span>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedNode(mockNodes[1])}
                  className={`p-4 rounded-xl bg-gradient-to-r ${mockNodes[1].color} border cursor-pointer flex items-center gap-3 shadow-lg ring-2 ring-gold/30 w-full max-w-md`}
                >
                  <Sparkles className="w-5 h-5 text-gold-bright shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">{mockNodes[1].title}</p>
                    <p className="text-[10px] text-gold/80 font-mono">{mockNodes[1].subtitle}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Layer 3: TIME */}
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  LAYER 3 — TIME (Cosmic Transits & Dashas)
                </span>
                <span className="h-[1px] flex-1 bg-purple-500/20"></span>
              </div>
              <div className="flex items-center justify-end gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedNode(mockNodes[2])}
                  className={`p-3.5 rounded-xl bg-gradient-to-r ${mockNodes[2].color} border cursor-pointer flex items-center gap-3 shadow-md w-full max-w-sm`}
                >
                  <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">{mockNodes[2].title}</p>
                    <p className="text-[10px] text-purple-300/80 font-mono">{mockNodes[2].subtitle}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Layer 4: LEARNING */}
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  LAYER 4 — LEARNING (Proactive AI Correlations)
                </span>
                <span className="h-[1px] flex-1 bg-emerald-500/20"></span>
              </div>
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedNode(mockNodes[3])}
                  className={`p-3.5 rounded-xl bg-gradient-to-r ${mockNodes[3].color} border cursor-pointer flex items-center gap-3 shadow-md w-full max-w-sm`}
                >
                  <Cpu className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">{mockNodes[3].title}</p>
                    <p className="text-[10px] text-emerald-300/80 font-mono">{mockNodes[3].subtitle}</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>

          {/* Node Inspector Panel */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col justify-between">
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <Badge className="bg-white/10 text-white border-white/20 text-[10px] font-mono uppercase">
                    {selectedNode.layer} Strand Node
                  </Badge>
                  <span className="text-xs font-mono text-[#9CA3AF]">{selectedNode.date}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-1">{selectedNode.title}</h3>
                  <p className="text-xs text-cyan-300 font-mono mb-3">{selectedNode.subtitle}</p>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
                    {selectedNode.details}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9CA3AF]">Verification Status:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {selectedNode.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9CA3AF]">Connected Layers:</span>
                    <span className="text-white font-mono font-bold">3 Strands Active</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#9CA3AF] text-xs font-mono">
                Click any node on the Lifestrand canvas to inspect telemetry.
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full text-xs font-bold border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 justify-between"
              >
                Simulate Parallel Decision Fork <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  )
}

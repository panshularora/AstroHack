import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Sparkles, Brain, Target, Sun, CheckCircle2, BookOpen, ShieldCheck, Filter, Search
} from "lucide-react"

interface LifeGraphModalProps {
  isOpen: boolean
  onClose: () => void
}

interface GraphNode {
  id: string
  title: string
  type: "consultation" | "prediction" | "remedy" | "milestone" | "ai_chat" | "transit"
  date: string
  astrologer?: string
  confidence?: number
  x: number // canvas coordinate %
  y: number // canvas coordinate %
  connections: string[] // connected node IDs
  description: string
}

export function LifeGraphModal({ isOpen, onClose }: LifeGraphModalProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("n_c1")
  const [filterType, setFilterType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const nodes: GraphNode[] = [
    {
      id: "n_t1",
      title: "Jupiter 10th House Transit",
      type: "transit",
      date: "2026-07-01",
      x: 15,
      y: 35,
      connections: ["n_c1", "n_p1"],
      description: "Major career expansion transit forming a trine with natal Sun."
    },
    {
      id: "n_c1",
      title: "Consultation: Career Growth & Transits",
      type: "consultation",
      date: "2026-07-15",
      astrologer: "Guruji Vikram Sharma",
      x: 32,
      y: 30,
      connections: ["n_t1", "n_p1", "n_r1", "n_ai1"],
      description: "45-min session mapping out Rahu Mahadasha & corporate leadership timing."
    },
    {
      id: "n_p1",
      title: "Prediction: Job Offer in Tech Sector",
      type: "prediction",
      date: "2026-08-25",
      astrologer: "Guruji Vikram Sharma",
      confidence: 88,
      x: 55,
      y: 22,
      connections: ["n_c1", "n_m1", "n_r1"],
      description: "Target window late August to early September for VP/Lead offer."
    },
    {
      id: "n_r1",
      title: "Remedy: Venus Beej Mantra (21 Days)",
      type: "remedy",
      date: "2026-07-16",
      x: 48,
      y: 55,
      connections: ["n_c1", "n_p1", "n_m1"],
      description: "108x daily chants at sunrise for social magnetism & focus."
    },
    {
      id: "n_ai1",
      title: "AI Companion: Rahu Dasha Briefing",
      type: "ai_chat",
      date: "2026-07-18",
      x: 35,
      y: 75,
      connections: ["n_c1", "n_r1"],
      description: "AI retrieval session analyzing past planetary cycles & leadership readiness."
    },
    {
      id: "n_m1",
      title: "Milestone: Verified VP Offer Letter",
      type: "milestone",
      date: "2026-08-14",
      x: 82,
      y: 38,
      connections: ["n_p1", "n_r1"],
      description: "Outcome confirmed true with uploaded offer letter evidence."
    },
    {
      id: "n_c2",
      title: "Consultation: Financial Life Path",
      type: "consultation",
      date: "2026-05-02",
      astrologer: "Elena Rostova",
      x: 20,
      y: 78,
      connections: ["n_m2"],
      description: "30-min reading on Saturn 2nd house financial stabilization."
    },
    {
      id: "n_m2",
      title: "Milestone: Investment Bonus Return",
      type: "milestone",
      date: "2026-05-15",
      x: 65,
      y: 82,
      connections: ["n_c2"],
      description: "Verified financial breakthrough payout (94% accuracy rating)."
    }
  ]

  const filteredNodes = nodes.filter(n => {
    const matchesFilter = filterType === "all" || n.type === filterType
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[1]

  const getNodeColor = (type: string) => {
    switch (type) {
      case "consultation": return { bg: "bg-amber-500 text-black font-bold", border: "border-amber-400", text: "text-amber-300", glow: "shadow-[0_0_20px_rgba(245,158,11,0.6)]" }
      case "prediction": return { bg: "bg-amber-400 text-black font-bold", border: "border-amber-300", text: "text-amber-300", glow: "shadow-[0_0_20px_rgba(245,158,11,0.6)]" }
      case "remedy": return { bg: "bg-emerald-500 text-black font-bold", border: "border-emerald-300", text: "text-emerald-400", glow: "shadow-[0_0_20px_rgba(16,185,129,0.6)]" }
      case "milestone": return { bg: "bg-cyan-400 text-black font-bold", border: "border-cyan-300", text: "text-cyan-400", glow: "shadow-[0_0_20px_rgba(34,211,238,0.6)]" }
      case "ai_chat": return { bg: "bg-purple-500 text-white font-bold", border: "border-purple-300", text: "text-purple-400", glow: "shadow-[0_0_20px_rgba(168,85,247,0.6)]" }
      case "transit": return { bg: "bg-blue-500 text-white font-bold", border: "border-blue-300", text: "text-blue-400", glow: "shadow-[0_0_20px_rgba(59,130,246,0.6)]" }
      default: return { bg: "bg-white/10 text-white font-bold", border: "border-white/20", text: "text-white", glow: "" }
    }
  }

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "consultation": return <BookOpen className="w-4 h-4 text-black" />
      case "prediction": return <Target className="w-4 h-4 text-black" />
      case "remedy": return <Sun className="w-4 h-4 text-black" />
      case "milestone": return <CheckCircle2 className="w-4 h-4 text-black" />
      case "ai_chat": return <Brain className="w-4 h-4 text-white" />
      case "transit": return <Sparkles className="w-4 h-4 text-white" />
      default: return <Sparkles className="w-4 h-4 text-white" />
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-6xl bg-[#090A0F] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col font-sans"
        >
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-lg">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Interactive Cosmic Life Graph <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                </h2>
                <p className="text-xs font-mono text-[#9CA3AF]">
                  Visual knowledge network showing how consultations, transits, and remedies interconnect over time
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filters & Search Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 shrink-0 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter Nodes:
              </span>
              {[
                { id: "all", label: "All Nodes" },
                { id: "consultation", label: "Consultations" },
                { id: "prediction", label: "Predictions" },
                { id: "remedy", label: "Remedies" },
                { id: "milestone", label: "Milestones" },
                { id: "transit", label: "Transits" },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    filterType === f.id
                      ? "bg-amber-500 text-black shadow-sm"
                      : "bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search graph nodes..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-[#6B7280] outline-none"
              />
            </div>
          </div>

          {/* Main Visual Graph Canvas + Details Drawer */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 min-h-[460px] overflow-hidden">
            {/* Interactive Canvas Graph Area */}
            <div className="md:col-span-8 bg-black/50 border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center p-4">
              {/* Subtle Cosmic Background Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* SVG Connecting Relationship Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {filteredNodes.map(node =>
                  node.connections.map(targetId => {
                    const targetNode = nodes.find(n => n.id === targetId)
                    if (!targetNode) return null
                    const isSelected = selectedNodeId === node.id || selectedNodeId === targetId
                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${targetNode.x}%`}
                        y2={`${targetNode.y}%`}
                        stroke={isSelected ? "#F59E0B" : "rgba(255, 255, 255, 0.15)"}
                        strokeWidth={isSelected ? 2.5 : 1}
                        strokeDasharray={isSelected ? "none" : "4 4"}
                      />
                    )
                  })
                )}
              </svg>

              {/* Render Nodes */}
              {filteredNodes.map(node => {
                const colorConfig = getNodeColor(node.type)
                const isSelected = selectedNodeId === node.id

                return (
                  <motion.div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    whileHover={{ scale: 1.15 }}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 flex flex-col items-center group`}
                  >
                    <div className={`w-11 h-11 rounded-xl ${colorConfig.bg} border-2 ${colorConfig.border} flex items-center justify-center transition-all ${
                      isSelected ? `${colorConfig.glow} scale-125 border-white ring-4 ring-amber-500/30` : "opacity-90 hover:opacity-100"
                    }`}>
                      {getNodeIcon(node.type)}
                    </div>
                    <span className={`text-[10px] font-mono font-bold text-white max-w-[110px] text-center truncate mt-1.5 px-2 py-0.5 rounded-lg bg-black/80 border border-white/10 backdrop-blur-md ${
                      isSelected ? "text-amber-400 border-amber-500 font-extrabold" : "opacity-80 group-hover:opacity-100"
                    }`}>
                      {node.title}
                    </span>
                  </motion.div>
                )
              })}

              <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-mono text-[#9CA3AF] backdrop-blur-md">
                Click any node to inspect connected memory & transits
              </div>
            </div>

            {/* Selected Node Cosmic Detail Inspector */}
            <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getNodeColor(selectedNode.type).border} ${getNodeColor(selectedNode.type).bg}`}>
                    {selectedNode.type.toUpperCase()} NODE
                  </span>
                  <span className="text-[10px] font-mono text-[#9CA3AF]">{selectedNode.date}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{selectedNode.title}</h3>
                  {selectedNode.astrologer && (
                    <p className="text-xs text-amber-400 font-mono font-semibold mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Guided by {selectedNode.astrologer}
                    </p>
                  )}
                </div>

                <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl text-xs text-white/90 leading-relaxed font-sans">
                  {selectedNode.description}
                </div>

                {selectedNode.confidence && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-300 font-bold">Verified Confidence Score</span>
                    <span className="text-white font-extrabold">{selectedNode.confidence}%</span>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono font-bold text-[#9CA3AF] uppercase tracking-wider block mb-2">Connected Knowledge Nodes ({selectedNode.connections.length})</span>
                  <div className="space-y-2 font-mono">
                    {selectedNode.connections.map(cId => {
                      const cNode = nodes.find(n => n.id === cId)
                      if (!cNode) return null
                      return (
                        <div
                          key={cId}
                          onClick={() => setSelectedNodeId(cId)}
                          className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 cursor-pointer transition-all flex items-center justify-between text-xs text-white"
                        >
                          <span className="font-semibold">{cNode.title}</span>
                          <span className="text-[9px] text-amber-400 uppercase font-bold">{cNode.type}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-amber-500 text-black font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                >
                  Close Graph Inspector
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

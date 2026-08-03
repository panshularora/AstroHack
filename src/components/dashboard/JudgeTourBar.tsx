import { useState } from "react"
import { Sparkles, MessageSquare, Sun, Scale, Network, Brain, Cpu } from "lucide-react"
import { CelestialToolsModal } from "@/components/astrology/CelestialToolsModal"
import { ConsultationFlowModal } from "@/components/consultation/ConsultationFlowModal"
import { AIDecisionSimulatorModal } from "@/components/simulator/AIDecisionSimulatorModal"
import { LifeGraphModal } from "@/components/graph/LifeGraphModal"
import { AIConsultationCoachModal } from "@/components/coach/AIConsultationCoachModal"
import { DigitalTwinModal } from "@/components/twin/DigitalTwinModal"
import { ReportNarrativeModal } from "@/components/dashboard/ReportNarrativeModal"
import { AsyncConsultationModal } from "@/components/consultation/AsyncConsultationModal"
import { PredictionShareCardModal } from "@/components/predictions/PredictionShareCardModal"
import { mockVerifiedAstrologers } from "@/lib/mock-data"

export function JudgeTourBar() {
  const [toolsOpen, setToolsOpen] = useState(false)
  const [consultModalOpen, setConsultModalOpen] = useState(false)
  const [simulatorOpen, setSimulatorOpen] = useState(false)
  const [graphOpen, setGraphOpen] = useState(false)
  const [coachOpen, setCoachOpen] = useState(false)
  const [twinOpen, setTwinOpen] = useState(false)
  const [narrativeOpen, setNarrativeOpen] = useState(false)
  const [asyncOpen, setAsyncOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <>
      <div className="bg-gradient-to-r from-brand/20 via-purple-900/30 to-blue-900/20 border border-brand/30 rounded-lg p-3 md:p-4 mb-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand/30 border border-brand/50 flex items-center justify-center text-brand shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                AstroLive 2.0 Product Tour
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  Ready for Evaluation
                </span>
              </p>
              <p className="text-[11px] text-[#9CA3AF]">
                Explore Digital Twin, AI Consultation Coach, Decision Simulator, Life Knowledge Graph, and Live Calls.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setTwinOpen(true)}
              className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-300" /> Digital Twin
            </button>
            <button
              onClick={() => setCoachOpen(true)}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Brain className="w-3.5 h-3.5 text-emerald-400" /> AI Coach
            </button>
            <button
              onClick={() => setGraphOpen(true)}
              className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Network className="w-3.5 h-3.5 text-blue-400" /> Life Graph
            </button>
            <button
              onClick={() => setSimulatorOpen(true)}
              className="px-3 py-1.5 bg-gradient-to-r from-brand/30 to-purple-600/30 hover:from-brand/40 hover:to-purple-600/40 border border-brand/50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Scale className="w-3.5 h-3.5 text-gold" /> Decision Simulator
            </button>
            <button
              onClick={() => setToolsOpen(true)}
              className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sun className="w-3.5 h-3.5" /> Panchang
            </button>
            <button
              onClick={() => setAsyncOpen(true)}
              className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" /> Async Query (₹49)
            </button>
            <button
              onClick={() => setShareOpen(true)}
              className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" /> Viral Share Card
            </button>
            <button
              onClick={() => setNarrativeOpen(true)}
              className="px-3 py-1.5 bg-gradient-to-r from-gold/20 to-amber-500/20 hover:from-gold/30 hover:to-amber-500/30 border border-gold/40 text-gold-bright rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-bright" /> Report Narrative
            </button>
            <button
              onClick={() => setConsultModalOpen(true)}
              className="px-3 py-1.5 bg-brand/20 hover:bg-brand/30 border border-brand/40 text-ink-secondary rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Live Call Demo
            </button>
          </div>
        </div>
      </div>

      <CelestialToolsModal
        isOpen={toolsOpen}
        onClose={() => setToolsOpen(false)}
        initialTab="panchang"
      />

      <ConsultationFlowModal
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
        astrologer={mockVerifiedAstrologers[0]}
        initialMode="chat"
      />

      <AIDecisionSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
      />

      <LifeGraphModal
        isOpen={graphOpen}
        onClose={() => setGraphOpen(false)}
      />

      <AIConsultationCoachModal
        isOpen={coachOpen}
        onClose={() => setCoachOpen(false)}
      />

      <DigitalTwinModal
        isOpen={twinOpen}
        onClose={() => setTwinOpen(false)}
      />

      <ReportNarrativeModal
        isOpen={narrativeOpen}
        onClose={() => setNarrativeOpen(false)}
      />

      <AsyncConsultationModal
        isOpen={asyncOpen}
        onClose={() => setAsyncOpen(false)}
      />

      <PredictionShareCardModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </>
  )
}

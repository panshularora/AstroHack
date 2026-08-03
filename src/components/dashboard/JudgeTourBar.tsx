import { useState } from "react"
import { Sparkles, MessageSquare, Sun, Scale, Network, Brain, Cpu, Zap, Folder, Target } from "lucide-react"
import { CelestialToolsModal } from "@/components/astrology/CelestialToolsModal"
import { ConsultationFlowModal } from "@/components/consultation/ConsultationFlowModal"
import { AIDecisionSimulatorModal } from "@/components/simulator/AIDecisionSimulatorModal"
import { LifeGraphModal } from "@/components/graph/LifeGraphModal"
import { AIConsultationCoachModal } from "@/components/coach/AIConsultationCoachModal"
import { DigitalTwinModal } from "@/components/twin/DigitalTwinModal"
import { ReportNarrativeModal } from "@/components/dashboard/ReportNarrativeModal"
import { AsyncConsultationModal } from "@/components/consultation/AsyncConsultationModal"
import { PredictionShareCardModal } from "@/components/predictions/PredictionShareCardModal"
import { AIPatternDiscoveryModal } from "@/components/discovery/AIPatternDiscoveryModal"
import { CosmicVaultModal } from "@/components/vault/CosmicVaultModal"
import { PredictionConfidenceModal } from "@/components/predictions/PredictionConfidenceModal"
import { LifestrandCanvas } from "@/components/spatial/LifestrandCanvas"
import { mockVerifiedAstrologers } from "@/lib/mock-data"

export function JudgeTourBar() {
  const [lifestrandOpen, setLifestrandOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [consultModalOpen, setConsultModalOpen] = useState(false)
  const [simulatorOpen, setSimulatorOpen] = useState(false)
  const [graphOpen, setGraphOpen] = useState(false)
  const [coachOpen, setCoachOpen] = useState(false)
  const [twinOpen, setTwinOpen] = useState(false)
  const [narrativeOpen, setNarrativeOpen] = useState(false)
  const [asyncOpen, setAsyncOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [patternOpen, setPatternOpen] = useState(false)
  const [vaultOpen, setVaultOpen] = useState(false)
  const [confidenceOpen, setConfidenceOpen] = useState(false)

  return (
    <>
      <div className="bg-[#090A0F]/90 border border-white/10 rounded-2xl p-3 md:p-4 mb-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  AstroLive 2.0 Master Product Story Walkthrough
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    GitHub of Life Decisions
                  </span>
                </p>
                <p className="text-[11px] text-[#9CA3AF]">
                  Follow the 6-step narrative arc: Identity → Orbit → Lifecycle → Life Graph → Proof Vault → Sanctuary
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setLifestrandOpen(true)}
                className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-300" /> Lifestrand Spatial OS
              </button>
              <button
                onClick={() => setNarrativeOpen(true)}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Pitch Executive Narrative
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mr-1">Story Arc:</span>
            
            <button
              onClick={() => setTwinOpen(true)}
              className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Cpu className="w-3 h-3 text-cyan-300" /> 1. Digital Twin
            </button>
            
            <button
              onClick={() => setSimulatorOpen(true)}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Scale className="w-3 h-3 text-amber-400" /> 2. Simulator
            </button>

            <button
              onClick={() => setPatternOpen(true)}
              className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Brain className="w-3 h-3 text-amber-400" /> 3. Pattern Discovery
            </button>

            <button
              onClick={() => setConfidenceOpen(true)}
              className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Target className="w-3 h-3 text-amber-400" /> 4. Confidence Engine
            </button>

            <button
              onClick={() => setGraphOpen(true)}
              className="px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Network className="w-3 h-3 text-blue-400" /> 5. Life Graph
            </button>

            <button
              onClick={() => setVaultOpen(true)}
              className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <Folder className="w-3 h-3 text-emerald-400" /> 6. Cosmic Vault
            </button>

            <span className="h-4 w-[1px] bg-white/20 mx-1"></span>

            <button
              onClick={() => setCoachOpen(true)}
              className="px-2.5 py-1 bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
            >
              <Brain className="w-3 h-3 text-emerald-400" /> AI Coach
            </button>

            <button
              onClick={() => setAsyncOpen(true)}
              className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 rounded-lg text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
            >
              <Zap className="w-3 h-3 text-emerald-400" /> Async Query (₹49)
            </button>

            <button
              onClick={() => setShareOpen(true)}
              className="px-2.5 py-1 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 text-purple-300 rounded-lg text-xs font-medium transition-all flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-purple-300" /> Viral Share Card
            </button>

            <button
              onClick={() => setToolsOpen(true)}
              className="px-2.5 py-1 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sun className="w-3 h-3" /> Panchang
            </button>

            <button
              onClick={() => setConsultModalOpen(true)}
              className="px-2.5 py-1 bg-brand/20 hover:bg-brand/30 border border-brand/40 text-ink-secondary rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <MessageSquare className="w-3 h-3" /> Live Call Demo
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

      <AIPatternDiscoveryModal
        isOpen={patternOpen}
        onClose={() => setPatternOpen(false)}
      />

      <CosmicVaultModal
        isOpen={vaultOpen}
        onClose={() => setVaultOpen(false)}
      />

      <PredictionConfidenceModal
        isOpen={confidenceOpen}
        onClose={() => setConfidenceOpen(false)}
      />

      <LifestrandCanvas
        isOpen={lifestrandOpen}
        onClose={() => setLifestrandOpen(false)}
      />
    </>
  )
}

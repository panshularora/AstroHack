import { useState } from "react"
import { Sparkles, Compass, Shield, Cpu, Target, Layers, FileText, Activity } from "lucide-react"
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
      <div className="bg-[#090A0F]/90 border border-white/10 rounded-2xl p-4 mb-6 shadow-xl backdrop-blur-xl space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-2">
                AstroLive 2.0 Product Story Suite
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Interactive Demo
                </span>
              </p>
              <p className="text-[11px] text-[#9CA3AF]">
                6-Stage Narrative Arc: Identity → Transits → Life Graph → Proof Vault
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLifestrandOpen(true)}
              className="px-3.5 py-1.5 bg-amber-500 text-black font-bold rounded-xl text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" /> Spatial OS
            </button>
            <button
              onClick={() => setNarrativeOpen(true)}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" /> Thesis Deck
            </button>
          </div>
        </div>

        {/* Clean, Uniform Control Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-xs font-mono">
          <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest mr-1">Modules:</span>
          
          <button
            onClick={() => setTwinOpen(true)}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Cpu className="w-3 h-3 text-amber-400" /> Digital Twin
          </button>
          
          <button
            onClick={() => setSimulatorOpen(true)}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Activity className="w-3 h-3 text-cyan-400" /> Decision Simulator
          </button>

          <button
            onClick={() => setConfidenceOpen(true)}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Target className="w-3 h-3 text-amber-400" /> Confidence Engine
          </button>

          <button
            onClick={() => setGraphOpen(true)}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3 h-3 text-emerald-400" /> Life Graph
          </button>

          <button
            onClick={() => setVaultOpen(true)}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Shield className="w-3 h-3 text-cyan-400" /> Proof Vault
          </button>

          <button
            onClick={() => setCoachOpen(true)}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-400" /> AI Coach
          </button>
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

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, FileText } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { JudgeTourBar } from "@/components/dashboard/JudgeTourBar"
import { CelestialOrbitHero } from "@/components/dashboard/CelestialOrbitHero"
import { DashboardMetricCards } from "@/components/dashboard/DashboardMetricCards"
import { DashboardCharts } from "@/components/dashboard/DashboardCharts"
import { CosmicVaultModal } from "@/components/vault/CosmicVaultModal"
import { useUser } from "@/context/UserContext"

export function Dashboard() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [vaultOpen, setVaultOpen] = useState(false)

  return (
    <div className="page-container max-w-7xl pb-28 space-y-8">
      
      {/* Executive Story Arc Tour Bar */}
      <JudgeTourBar />

      {/* Interactive Cosmic Planetary Transit Hero */}
      <CelestialOrbitHero />

      {/* Animated SaaS Metric Cards */}
      <DashboardMetricCards />

      {/* Interactive Charts Engine */}
      <DashboardCharts />

      {/* Two Column Grid: Active Predictions & Consultation Memory Logs */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Prediction Apertures */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Active Prediction Apertures for {user.name}</h3>
              <p className="text-xs font-mono text-[#9CA3AF]">Tracked against real-world outcome documents</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs font-mono border-white/20 text-white"
              onClick={() => navigate("/app/predictions")}
            >
              View Ledger <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-3">
            {user.predictions.map((p: any) => (
              <motion.div
                key={p.id}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Card className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#9CA3AF] mb-1">
                        {p.category} · {p.astrologerName}
                      </p>
                      <h4 className="text-sm font-bold text-white">{p.title}</h4>
                    </div>
                    <Badge variant={p.status === "completed" || p.status === "Verified" ? "success" : "gold"}>
                      {p.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                    <span className="text-amber-300 font-bold">{p.confidence}% Confidence</span>
                    <button
                      onClick={() => setVaultOpen(true)}
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" /> Upload PDF Proof
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Verified Consultation Logs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Consultations</h3>
              <p className="text-xs font-mono text-[#9CA3AF]">Archived in Cosmic Memory</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs font-mono border-white/20 text-white"
              onClick={() => navigate("/app/logger")}
            >
              View Logs <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-3">
            {user.consultations.map((c: any) => (
              <Card key={c.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-white">{c.astrologerName}</span>
                  <span className="text-[10px] font-mono text-amber-400">{c.date}</span>
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed font-mono">
                  "{c.topic}"
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {c.durationMinutes} min session · Verified Notes
                  </span>
                  <span className="text-[#9CA3AF]">₹{c.cost}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>

      <CosmicVaultModal
        isOpen={vaultOpen}
        onClose={() => setVaultOpen(false)}
      />
    </div>
  )
}
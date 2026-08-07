import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, FileText, Target, Calendar, Navigation, Globe, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { CelestialOrbitHero } from "@/components/dashboard/CelestialOrbitHero"
import { CosmicVaultModal } from "@/components/vault/CosmicVaultModal"
import { useUser } from "@/context/UserContext"

export function Dashboard() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [vaultOpen, setVaultOpen] = useState(false)

  const displayName = user.name && user.name.trim().length > 0 ? user.name : "User"

  return (
    <div className="page-container max-w-7xl pb-28 space-y-8 font-sans">
      {/* Interactive Cosmic Planetary Transit Hero */}
      <CelestialOrbitHero />

      {/* Jyotish Intelligence Quick-Access Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => navigate("/app/transits")}
          className="p-4 rounded-lg bg-surface border border-line cursor-pointer hover:border-blue-500/40 transition-colors group"
        >
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">In 12 Days</span>
          </div>
          <p className="text-xs font-bold text-white leading-snug">Jupiter crosses your natal Moon</p>
          <p className="text-[11px] text-neutral-400 mt-1">Major emotional expansion — family & property</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => navigate("/app/grahas")}
          className="p-4 rounded-lg bg-surface border border-line cursor-pointer hover:border-emerald-500/40 transition-colors group"
        >
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Live Now</span>
          </div>
          <p className="text-xs font-bold text-white leading-snug">Jupiter + Mars in your 10th House</p>
          <p className="text-[11px] text-neutral-400 mt-1">Career Raj Yoga active — next 23 days</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => navigate("/app/muhurta")}
          className="p-4 rounded-lg bg-surface border border-line cursor-pointer hover:border-amber-500/40 transition-colors group"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Muhurta</span>
          </div>
          <p className="text-xs font-bold text-white leading-snug">Next auspicious window</p>
          <p className="text-[11px] text-neutral-400 mt-1">Thu 10:22 AM – 12:44 PM · Rohini Nakshatra</p>
        </motion.div>
      </div>

      {/* Two Column Grid: Active Predictions & Consultation Memory Logs */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Predictions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Active Predictions for {displayName}</h3>
              <p className="text-xs font-mono text-[#9CA3AF]">Tracked against outcome documents</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs font-mono border-neutral-800 text-white cursor-pointer hover:bg-neutral-800"
              onClick={() => navigate("/app/predictions")}
            >
              View Predictions <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-3">
            {user.predictions && user.predictions.length > 0 ? (
              user.predictions.map((p: any) => (
                <motion.div
                  key={p.id}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Card className="p-5 space-y-3 bg-neutral-900/60 border border-neutral-800">
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

                    {/* Perfectly aligned Upload Document bottom row */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-xs font-mono w-full">
                      <span className="text-amber-400 font-semibold">{p.confidence}% Alignment</span>
                      <button
                        onClick={() => setVaultOpen(true)}
                        className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                        <span>Upload Document</span>
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center space-y-3">
                <Target className="w-8 h-8 text-neutral-600 mx-auto" />
                <p className="text-sm text-neutral-300 font-semibold">No active predictions logged yet</p>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Your active predictions will appear here once generated or booked with an astrologer.
                </p>
                <Button
                  size="sm"
                  onClick={() => navigate("/app/predictions")}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs mt-2 cursor-pointer"
                >
                  Explore Predictions
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Consultations */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Consultations</h3>
              <p className="text-xs font-mono text-[#9CA3AF]">Archived in Cosmic Memory</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs font-mono border-neutral-800 text-white cursor-pointer hover:bg-neutral-800"
              onClick={() => navigate("/app/memory")}
            >
              View Logs <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-3">
            {user.consultations && user.consultations.length > 0 ? (
              user.consultations.map((c: any) => (
                <Card key={c.id} className="p-5 space-y-3 bg-neutral-900/60 border border-neutral-800">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <span className="text-xs font-bold text-white">{c.astrologerName}</span>
                    <span className="text-[10px] font-mono text-amber-400">{c.date}</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed font-mono">
                    "{c.topic}"
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> {c.durationMinutes} min session
                    </span>
                    <span className="text-[#9CA3AF]">₹{c.cost}</span>
                  </div>
                </Card>
              ))
            ) : (
              <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center space-y-3">
                <Calendar className="w-8 h-8 text-neutral-600 mx-auto" />
                <p className="text-sm text-neutral-300 font-semibold">No consultations recorded yet</p>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Book a live consultation with a verified astrologer to build your archive.
                </p>
                <Button
                  size="sm"
                  onClick={() => navigate("/app/verified")}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs border border-neutral-700 mt-2 cursor-pointer"
                >
                  Find Astrologer
                </Button>
              </div>
            )}
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
import { useState } from "react"
import { motion } from "framer-motion"
import { Target, CheckCircle2, Clock, TrendingUp, Calendar, Plus, FileText, Share2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { PredictionShareCardModal } from "@/components/predictions/PredictionShareCardModal"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { Tabs } from "@/components/ui/Tabs"
import { mockDetailedPredictions, mockPredictionStats } from "@/lib/mock-data"

type Tab = "active" | "verified" | "all"

export function PredictionCenter() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>("active")
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [activeShareData, setActiveShareData] = useState<any>(null)

  const filtered = mockDetailedPredictions.filter(p => {
    if (tab === "active") return p.status === "pending" || p.status === "in_progress"
    if (tab === "verified") return p.status === "completed"
    return true
  })

  const statusBadge = (status: string) => {
    if (status === "completed") return <Badge variant="success" size="sm">Verified Outcome</Badge>
    if (status === "in_progress") return <Badge variant="brand" size="sm">Window Active</Badge>
    if (status === "pending") return <Badge variant="gold" size="sm">Pending Transit</Badge>
    return <Badge variant="default" size="sm">{status}</Badge>
  }

  return (
    <div className="page-container max-w-5xl pb-28">
      <div className="space-y-10">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="border-b border-line/60 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 font-mono text-[11px] text-ink-tertiary hover:text-ink transition-colors mb-5 group"
            >
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
                <Target className="w-4 h-4 text-brand" />
              </div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">Prediction Proof Engine</p>
            </div>
            <h1 className="text-h1 font-display text-ink tracking-tight">Verified Prediction Proofs</h1>
            <p className="text-sm text-ink-secondary mt-1">
              Every astrologer prediction is tracked against real-life milestones with immutable verification proof.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" variant="outline" className="rounded-md font-mono text-gold-bright border-gold/30" onClick={() => { setActiveShareData(null); setShareModalOpen(true) }}>
              <Share2 className="w-4 h-4 text-gold-bright" /> Viral Share Card
            </Button>
            <Button size="sm" className="rounded-md shrink-0">
              <Plus className="w-4 h-4" /> Attach Outcome Proof
            </Button>
          </div>
        </div>

        {/* ── Metric Cards ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
          {[
            { icon: Target,      label: "Total Tracked",    valueFn: () => mockPredictionStats.total,    accent: "text-ink",        bg: "bg-surface" },
            { icon: CheckCircle2,label: "Verified Accurate", valueFn: () => mockPredictionStats.completed, accent: "text-success",     bg: "bg-[rgba(16,185,129,0.12)]" },
            { icon: Clock,       label: "Active Windows",   valueFn: () => mockPredictionStats.pending,  accent: "text-warning",    bg: "bg-[rgba(245,158,11,0.12)]" },
            { icon: TrendingUp,  label: "Overall Accuracy", valueFn: () => `${mockPredictionStats.accuracy}%`, accent: "text-brand", bg: "bg-brand-light" },
          ].map(s => (
            <div key={s.label} className={`p-4 rounded-lg border border-line space-y-2 ${s.bg}`}>
              <div className="flex items-center justify-between text-ink-tertiary">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider">{s.label}</span>
                <s.icon className={`w-4 h-4 ${s.accent}`} />
              </div>
              <p className={`font-metric text-2xl font-bold tabular-nums tracking-tight ${s.accent}`}>
                {s.valueFn()}
              </p>
            </div>
          ))}
        </div>

        {/* ── Filter Tabs ─────────────────────────────────────────── */}
        <Tabs
          items={[
            { value: "active", label: "Active Windows" },
            { value: "verified", label: "Verified Outcomes" },
            { value: "all", label: "All Records" },
          ]}
          value={tab}
          onChange={(v) => setTab(v as Tab)}
        />

        {/* ── Predictions List ────────────────────────────────────── */}
        <div className="space-y-4">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-body font-bold text-ink">{p.title}</h3>
                    <p className="text-caption mt-1 font-mono">
                      Astrologer: {p.astrologer.name} · Category: {p.category.toUpperCase()}
                    </p>
                  </div>
                  {statusBadge(p.status)}
                </div>

                {p.notes && (
                  <div className="p-3 rounded-md bg-surface-2/60 border border-line/60 text-xs text-ink-secondary flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>{p.notes}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-line/60 text-xs font-mono">
                  <div className="flex items-center gap-2 text-ink-tertiary">
                    <Calendar className="w-3.5 h-3.5" />
                    Target: {new Date(p.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveShareData({
                          id: p.id,
                          title: p.title,
                          category: p.category.toUpperCase(),
                          targetDate: p.targetDate,
                          confidence: p.confidence,
                          astrologerName: p.astrologer.name
                        })
                        setShareModalOpen(true)
                      }}
                      className="flex items-center gap-1 text-[11px] text-brand hover:text-brand-hover font-bold transition-colors"
                    >
                      <Share2 className="w-3 h-3 text-brand" /> Share Proof Card
                    </button>
                    <span className="text-ink-secondary font-bold">{p.confidence}% Confidence</span>
                    <Progress value={p.confidence} className="w-24 h-1.5" color="brand" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <PredictionShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        prediction={activeShareData}
      />
    </div>
  )
}
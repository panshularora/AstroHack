import { useNavigate } from "react-router-dom"
import { Share2, Crown, Settings, ChevronRight, ShieldCheck, Target } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useLedger } from "@/context/LedgerContext"
import { PredictionShareCardModal } from "@/components/predictions/PredictionShareCardModal"
import { useState } from "react"
import { mockUser } from "@/lib/mock-data"

export function You() {
  const navigate = useNavigate()
  const { stats, predictions } = useLedger()
  const [shareOpen, setShareOpen] = useState(false)

  const verified = predictions.filter(p => p.status === "completed")
  const topAstrologer = verified.length > 0
    ? verified.reduce((best, p) => {
        const count = verified.filter(v => v.astrologer.name === p.astrologer.name).length
        return count > best.count ? { name: p.astrologer.name, count } : best
      }, { name: verified[0].astrologer.name, count: 0 })
    : null

  const menuItems = [
    { label: "AstroLive+ Subscription", path: "/app/subscription", icon: Crown, badge: "PRO" },
    { label: "Settings", path: "/app/settings", icon: Settings },
  ]

  return (
    <div className="page-container max-w-3xl pb-28">
      <div className="space-y-8">
        <div className="border-b border-line/60 pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand mb-2">You</p>
          <h1 className="font-display text-h1 text-ink tracking-tight">Prediction Scorecard</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Your verified track record — shareable proof of cosmic guidance that actually worked.
          </p>
        </div>

        {/* Scorecard */}
        <div className="cosmic-hero p-6 rounded-lg border border-brand/30 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand">2026 Scorecard</p>
              <h2 className="font-display text-2xl text-ink font-bold mt-1">{mockUser.name} Sharma</h2>
              <p className="text-xs font-mono text-ink-secondary mt-0.5">{mockUser.zodiacSign} · Member since {mockUser.memberSince}</p>
            </div>
            <div className="text-right">
              <p className="font-metric text-4xl font-bold text-gold-bright tabular-nums">{stats.verified}/{stats.total}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary">Verified</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono text-center">
            <div className="p-3 rounded-md bg-white/[0.04] border border-line/60">
              <p className="text-lg font-bold text-success">{stats.accuracy}%</p>
              <p className="text-[9px] uppercase tracking-[0.1em] text-ink-tertiary">Accuracy</p>
            </div>
            <div className="p-3 rounded-md bg-white/[0.04] border border-line/60">
              <p className="text-lg font-bold text-brand">{stats.active}</p>
              <p className="text-[9px] uppercase tracking-[0.1em] text-ink-tertiary">Active</p>
            </div>
            <div className="p-3 rounded-md bg-white/[0.04] border border-line/60">
              <p className="text-lg font-bold text-ink">{stats.needsVerification}</p>
              <p className="text-[9px] uppercase tracking-[0.1em] text-ink-tertiary">Pending</p>
            </div>
          </div>

          {topAstrologer && (
            <div className="p-4 rounded-md bg-surface/60 border border-line/60 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-success shrink-0" />
              <div>
                <p className="text-xs font-mono text-ink-tertiary uppercase tracking-[0.1em]">Most Accurate Guide</p>
                <p className="text-sm font-bold text-ink">{topAstrologer.name}</p>
              </div>
            </div>
          )}

          <Button className="w-full rounded-md font-mono" onClick={() => setShareOpen(true)}>
            <Share2 className="w-4 h-4" /> Share Scorecard
          </Button>
        </div>

        {/* Recent verified */}
        {verified.length > 0 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-tertiary mb-3">Recent Verified</p>
            <div className="space-y-2">
              {verified.slice(0, 3).map(p => (
                <div key={p.id} className="p-4 rounded-lg bg-surface border border-line flex items-center gap-3">
                  <Target className="w-4 h-4 text-success shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{p.title}</p>
                    <p className="text-xs font-mono text-ink-tertiary">{p.astrologer.name}</p>
                  </div>
                  <span className="font-mono text-[10px] text-success font-bold">✓</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Account links */}
        <div className="space-y-1">
          {menuItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 p-4 rounded-lg bg-surface border border-line hover:border-brand/30 transition-all group"
            >
              <item.icon className="w-4 h-4 text-ink-secondary group-hover:text-brand" />
              <span className="text-sm font-medium text-ink flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-gold-bright/15 text-gold-bright rounded-sm">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-ink-tertiary" />
            </button>
          ))}
        </div>
      </div>

      <PredictionShareCardModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        prediction={{
          id: "scorecard",
          title: `${stats.verified}/${stats.total} Predictions Verified in 2026`,
          category: "SCORECARD",
          targetDate: new Date().toISOString().split("T")[0],
          confidence: stats.accuracy,
          astrologerName: topAstrologer?.name || "AstroLive Ledger",
          verifiedDate: new Date().toISOString().split("T")[0],
        }}
      />
    </div>
  )
}

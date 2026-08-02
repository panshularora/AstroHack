import { motion } from "framer-motion"
import { Heart, Plus, Sparkles, TrendingUp, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"

const compatibility = [
  { label: "Emotional Harmony (Bhakoot)", value: 88 },
  { label: "Intellectual Alignment (Graha Maitri)", value: 92 },
  { label: "Physical Compatibility (Yoni Guna)", value: 75 },
  { label: "Long-term Destiny (Nadi Guna)", value: 85 },
]

const milestones = [
  { date: "Jun 10", title: "Ashtakoot Kundli Matching", desc: "Pandit Rajesh Kumar analyzed your synastry (31/36 Gunas matched)" },
  { date: "Jul 1", title: "Communication Transit", desc: "Mercury transit favored deep partner dialogue" },
  { date: "Jul 15", title: "Shared Goal Alignment", desc: "Venus 7th House trine established long-term vision" },
]

export function RelationshipMode() {
  return (
    <div className="page-container max-w-4xl pb-28">
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-line/60 pb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
                <Heart className="w-4 h-4 text-brand" />
              </div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">Kundli Synastry Engine</p>
            </div>
            <h1 className="text-h1 font-display text-ink tracking-tight">Relationship & Compatibility</h1>
            <p className="text-sm text-ink-secondary mt-1">Ashtakoot Guna Milan, planetary transits, and joint decision timing.</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-md font-mono shrink-0">
            <Plus className="w-4 h-4" /> Add Partner Kundli
          </Button>
        </div>

        {/* Partner Card */}
        <div className="p-6 rounded-lg bg-surface border border-line flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-surface-2 border border-brand/30 text-brand flex items-center justify-center font-mono font-bold text-sm shrink-0">
              MV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-body font-bold text-ink">Meera Verma</p>
                <Badge variant="gold" size="sm" className="font-mono">Aries Sun</Badge>
              </div>
              <p className="text-xs font-mono text-ink-tertiary mt-0.5">Leo + Aries Trine · 31/36 Gunas Matched</p>
            </div>
          </div>
          <Badge variant="success" size="sm" className="font-mono">High Compatibility</Badge>
        </div>

        {/* Compatibility Breakdown */}
        <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
          <div className="flex items-center gap-2 border-b border-line/60 pb-3">
            <Sparkles className="w-4 h-4 text-brand" />
            <h3 className="text-body font-bold text-ink">Guna & Transit Compatibility</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 font-mono text-xs">
            {compatibility.map(c => (
              <div key={c.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-ink-secondary">{c.label}</span>
                  <span className="font-bold text-ink">{c.value}%</span>
                </div>
                <Progress value={c.value} color="brand" className="h-1.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Shared Timeline */}
        <div className="space-y-4">
          <h2 className="text-h2 font-display text-ink">Synastry Timeline</h2>
          <div className="space-y-3 font-sans">
            {milestones.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="p-4 rounded-lg bg-surface border border-line flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/20 flex items-center justify-center text-brand shrink-0">
                      <Calendar className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink">{m.title}</p>
                      <p className="text-xs text-ink-secondary mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-ink-tertiary shrink-0">{m.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Windows */}
        <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
          <div className="flex items-center gap-2 border-b border-line/60 pb-3">
            <TrendingUp className="w-4 h-4 text-success" />
            <h3 className="text-body font-bold text-ink">Upcoming Relationship Transits</h3>
          </div>
          <div className="space-y-3 font-sans text-xs">
            <div className="p-4 rounded-md bg-surface-2/60 border border-line/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-gold-bright shrink-0" />
                <div>
                  <p className="font-bold text-ink">Vivaha & Commitment Window</p>
                  <p className="text-ink-secondary mt-0.5">Predicted by Pandit Rajesh Kumar (82% confidence)</p>
                </div>
              </div>
              <Badge variant="gold" size="sm" className="font-mono">Sept 15, 2026</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
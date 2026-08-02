import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Share2, Sparkles, CalendarDays, Brain, TrendingUp, Target, CheckCircle2, Award } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Tabs } from "@/components/ui/Tabs"
import { Progress } from "@/components/ui/Progress"
import { mockReportData } from "@/lib/mock-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type Period = "Weekly" | "Monthly" | "Quarterly" | "Annual (Wrapped)"

export function ReportsCenter() {
  const [period, setPeriod] = useState<Period>("Annual (Wrapped)")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => setIsExporting(false), 1800)
  }

  const periods: Period[] = ["Weekly", "Monthly", "Quarterly", "Annual (Wrapped)"]

  return (
    <div className="page-container max-w-5xl pb-28">
      {/* Header */}
      <div className="border-b border-line/60 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
              <Award className="w-4 h-4 text-brand" />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">Celestial Life Wrapped</p>
          </div>
          <h1 className="text-h1 font-display text-ink tracking-tight">Cosmic Life Reports</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Visualized intelligence synthesizing Arjun's transit history, prediction outcomes, and mental clarity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-md font-mono" onClick={() => {}}>
            <Share2 className="w-4 h-4" /> Share Wrapped
          </Button>
          <Button size="sm" className="rounded-md font-mono font-bold" onClick={handleExport} disabled={isExporting}>
            <Download className="w-4 h-4" />
            {isExporting ? "Compiling PDF..." : "Download Report"}
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <Tabs
        items={periods.map(p => ({ value: p, label: p }))}
        value={period}
        onChange={(v) => setPeriod(v as Period)}
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={period}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-8 mt-6"
        >
          {/* AI Summary + Adherence */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-lg bg-surface border border-line space-y-4">
              <div className="flex items-center gap-3 border-b border-line/60 pb-3">
                <Sparkles className="w-4.5 h-4.5 text-brand" />
                <div>
                  <h3 className="text-body font-bold text-ink">Synthesis & Key Guidance</h3>
                  <p className="text-caption font-mono mt-0.5">{period} Report · Arjun Sharma</p>
                </div>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed font-sans">
                {mockReportData.summary}
              </p>
            </div>

            <div className="p-6 rounded-lg bg-surface border border-line space-y-5">
              <div className="border-b border-line/60 pb-3">
                <h3 className="text-body font-bold text-ink">Remedy Adherence</h3>
                <p className="text-caption font-mono">Venus Beej & Morning Sun</p>
              </div>
              <div className="space-y-4 font-mono">
                {mockReportData.adherence.map(item => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-secondary">{item.name}</span>
                      <span className="font-bold text-ink">{item.value}%</span>
                    </div>
                    <Progress value={item.value} color="brand" className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Emotional Trends Chart */}
          <div className="p-6 rounded-lg bg-surface border border-line space-y-6">
            <div className="flex items-center justify-between border-b border-line/60 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-ink">
                <TrendingUp className="w-4 h-4 text-brand" />
                <span className="font-bold">Mental Clarity vs. Transit Intensity</span>
              </div>
              <Badge variant="success" size="sm" className="font-mono">+80% Growth</Badge>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={mockReportData.emotionalTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F1623",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "6px",
                    fontSize: "12px",
                    color: "#F5F0E8",
                  }}
                />
                <Line type="monotone" dataKey="clarity" stroke="#D97706" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="energy" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>

            <div className="flex items-center gap-6 pt-2 font-mono text-xs">
              {[
                { label: "Mental Clarity", color: "#D97706" },
                { label: "Stress Level", color: "#EF4444" },
                { label: "Transit Energy", color: "#10B981" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-ink-secondary">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid sm:grid-cols-3 gap-4 font-mono">
            {[
              { label: "Completed Consultations", value: mockReportData.stats.consultations, icon: CalendarDays },
              { label: "Verified Predictions", value: mockReportData.stats.predictionsVerified, icon: Target },
              { label: "AI Cosmic Twin Queries", value: mockReportData.stats.aiInteractions, icon: Brain },
            ].map(stat => (
              <div key={stat.label} className="p-5 rounded-lg bg-surface border border-line space-y-2">
                <div className="flex items-center justify-between text-ink-tertiary">
                  <span className="text-[10px] uppercase font-bold tracking-wider">{stat.label}</span>
                  <stat.icon className="w-4 h-4 text-brand" />
                </div>
                <p className="text-3xl font-bold text-ink tabular-nums tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div className="p-6 rounded-lg bg-surface border border-line space-y-5">
            <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Verified Milestones Log</h3>
            <div className="space-y-3 font-sans">
              {mockReportData.milestones.map((milestone, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-md bg-surface-2/60 border border-line/60">
                  <div className="w-7 h-7 rounded-md bg-success-light border border-success/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-ink">{milestone.title}</p>
                      <span className="text-[10px] font-mono text-ink-tertiary">{milestone.date}</span>
                    </div>
                    <p className="text-xs text-ink-secondary mt-1">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
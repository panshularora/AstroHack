import { motion } from "framer-motion"
import { Target, TrendingUp, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

interface DashboardMetricCardsProps {
  isLoading?: boolean
}

export function DashboardMetricCards({ isLoading }: DashboardMetricCardsProps) {
  const metrics = [
    {
      title: "Verified Accuracy Rate",
      value: "94.8%",
      trend: "+3.2% vs last month",
      icon: TrendingUp,
      badge: "High Precision",
      color: "text-emerald-400"
    },
    {
      title: "Active Aperture Window",
      value: "Aug 20–25",
      trend: "10th House Jupiter Trine",
      icon: Target,
      badge: "88% Conf.",
      color: "text-amber-400"
    },
    {
      title: "Active Remedy Streak",
      value: "Day 11 / 21",
      trend: "Venus Beej Mantra 108x",
      icon: CheckCircle2,
      badge: "14 Days Active",
      color: "text-cyan-400"
    },
    {
      title: "Cosmic Document Vault",
      value: "3 Encrypted PDFs",
      trend: "Offer Letter & Visa Synced",
      icon: ShieldCheck,
      badge: "256-bit Proof",
      color: "text-amber-300"
    }
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
        >
          <Card className="p-5 space-y-3 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#9CA3AF] font-bold uppercase tracking-wider">
                {m.title}
              </span>
              <Badge variant="brand" size="sm">
                {m.badge}
              </Badge>
            </div>

            <div className="flex items-baseline justify-between">
              <h4 className="text-2xl font-bold font-mono text-white tracking-tight">
                {m.value}
              </h4>
              <m.icon className={`w-5 h-5 ${m.color}`} />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF] pt-2 border-t border-white/5">
              <span>{m.trend}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

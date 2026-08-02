import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ShieldCheck, Star, Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { mockVerifiedAstrologers } from "@/lib/mock-data"

export function AstroVerified() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const filtered = mockVerifiedAstrologers.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.specialization.some(s => s.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="page-container max-w-5xl pb-28">
      <div className="space-y-10">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="border-b border-line/60 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
              <ShieldCheck className="w-4 h-4 text-brand" />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">AstroVerified Network</p>
          </div>
          <h1 className="text-h1 font-display text-ink tracking-tight">Verified Vedic Practitioners</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Expert astrologers with 100% verified accuracy logs, client reviews, and transparent pricing in INR.
          </p>
        </div>

        {/* ── Search Bar ─────────────────────────────────────────── */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, specialty (Vedic, KP, Prashna, Career)..."
            className="pl-11 h-11 text-sm bg-surface-2/60 border-line rounded-md font-sans"
          />
        </div>

        {/* ── Astrologer Grid ─────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-6">
          {filtered.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div
                onClick={() => navigate(`/app/astrologer/${a.id}`)}
                className="p-6 rounded-lg bg-surface border border-line hover:border-brand/40 shadow-xs transition-all duration-150 cursor-pointer space-y-5 group"
              >
                {/* Profile row */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-surface-2 border border-brand/30 text-brand flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    {a.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-body font-bold text-ink group-hover:text-brand transition-colors">{a.name}</p>
                      <div className={`w-2 h-2 rounded-full shrink-0 ${a.status === "online" ? "bg-success" : a.status === "busy" ? "bg-warning" : "bg-ink-quaternary"}`} />
                    </div>
                    <p className="text-caption mt-0.5">{a.specialization.join(" · ")}</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2.5 font-mono">
                  {[
                    { label: "Accuracy", value: `${a.accuracy}%` },
                    { label: "Experience", value: `${a.experienceYears}y` },
                    { label: "Sessions", value: a.consultationCount },
                  ].map(s => (
                    <div key={s.label} className="text-center p-2.5 rounded-md bg-surface-2/60 border border-line/50">
                      <p className="text-xs font-bold text-ink">{s.value}</p>
                      <p className="text-[10px] text-ink-tertiary uppercase mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-2 border-t border-line/60">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Star className="w-3.5 h-3.5 fill-gold-bright text-gold-bright" />
                    <span className="font-bold text-ink">{a.trustScore}</span>
                    <Badge variant="gold" size="sm">{a.badge}</Badge>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-sm font-bold text-ink">₹{a.pricing}</span>
                    <span className="text-caption text-ink-tertiary">/min</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="flex-1 rounded-md text-xs font-mono" onClick={(e) => { e.stopPropagation(); navigate(`/app/astrologer/${a.id}`) }}>
                    Profile
                  </Button>
                  <Button size="sm" className="flex-1 rounded-md font-mono font-bold text-xs" onClick={(e) => { e.stopPropagation(); navigate(`/app/room/${a.id}`) }}>
                    Connect Live
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
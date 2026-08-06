import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Target, Zap, FileText, Search, Folder, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { CosmicVaultModal } from "@/components/vault/CosmicVaultModal"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { mockTimelineEvents, mockJournalEntries, mockMemoryStats } from "@/lib/mock-data"
import { useUser } from "@/context/UserContext"

export function CosmicMemory() {
  const navigate = useNavigate()
  const { user } = useUser()
  const isDemoUser = user.email === "arjun.sharma@example.com" || user.id === "u1"

  const [search, setSearch] = useState("")
  const [vaultOpen, setVaultOpen] = useState(false)

  const memoryStats = isDemoUser ? mockMemoryStats : {
    totalConsultations: 0,
    activePredictions: 0,
    completedPredictions: 0,
    verifiedAccurate: 0,
    totalInvestment: 0,
  }

  const timelineEvents = isDemoUser ? mockTimelineEvents : []
  const journalEntries = isDemoUser ? mockJournalEntries : []

  const filteredTimeline = timelineEvents.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.astrologer?.name && e.astrologer.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="page-container max-w-5xl pb-28 font-sans">
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
                <BookOpen className="w-4 h-4 text-brand" />
              </div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">Searchable Lifelong Memory</p>
            </div>
            <h1 className="text-h1 font-display text-ink tracking-tight">Cosmic Memory Vault</h1>
            <p className="text-sm text-ink-secondary mt-1">
              Immutable archive of {user.name}'s consultations, verified predictions, remedies, and journal notes.
            </p>
          </div>
          <Button size="sm" variant="outline" className="rounded-md font-mono border-blue-500/30 text-blue-400 gap-2 shrink-0 cursor-pointer" onClick={() => setVaultOpen(true)}>
            <Folder className="w-4 h-4 text-blue-400" /> Life Document Vault
          </Button>
        </div>

        {/* ── Metric Cards ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
          {[
            { label: "Consultations", value: memoryStats.totalConsultations, icon: BookOpen },
            { label: "Tracked Predictions", value: memoryStats.activePredictions + memoryStats.completedPredictions, icon: Target },
            { label: "Verified Accurate", value: memoryStats.verifiedAccurate, icon: Zap },
            { label: "Total Investment", value: `₹${memoryStats.totalInvestment}`, icon: FileText },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-lg bg-surface border border-line space-y-2">
              <div className="flex items-center justify-between text-ink-tertiary">
                <span className="text-[10px] uppercase font-bold tracking-wider">{s.label}</span>
                <s.icon className="w-4 h-4 text-brand" />
              </div>
              <p className="text-2xl font-bold text-ink tabular-nums tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Search Bar ─────────────────────────────────────────── */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by topic, astrologer name, or prediction..."
            className="pl-11 h-11 text-sm bg-surface-2/60 border-line rounded-md font-sans"
          />
        </div>

        {/* ── Timeline ───────────────────────────────────────────── */}
        <div className="space-y-6">
          <div>
            <h2 className="text-h2 font-display text-ink">Timeline Archive</h2>
            <p className="text-caption mt-0.5">Chronological record of every consultation and milestone</p>
          </div>

          {filteredTimeline.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8">
              <BookOpen className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
              <h3 className="text-sm font-bold text-white">No memory logs recorded yet</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto font-mono">
                Your consultation transcripts and verified prediction proofs will appear here in real time.
              </p>
              <Button onClick={() => navigate("/app/verified")} className="rounded-xl bg-amber-500 text-black font-bold font-mono text-xs cursor-pointer">
                <Plus className="w-4 h-4 mr-1" /> Consult Verified Astrologer
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTimeline.map((event, i) => (
                <motion.div key={event.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <div className="p-5 rounded-lg bg-surface border border-line space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center shrink-0 text-brand">
                        {event.type === "consultation"
                          ? <BookOpen className="w-4 h-4 text-brand" />
                          : <Target className="w-4 h-4 text-success" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-body font-bold text-ink">{event.title}</p>
                          {event.type === "milestone" && <Badge variant="success" size="sm">Milestone</Badge>}
                        </div>
                        <p className="text-xs font-mono text-ink-tertiary mt-1">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          {event.astrologer && ` · ${event.astrologer.name}`}
                          {event.duration && ` · ${event.duration} min`}
                        </p>
                        {event.predictionsCount !== undefined && (
                          <div className="flex items-center gap-4 mt-3 font-mono text-[11px] text-ink-secondary">
                            <span>{event.predictionsCount} predictions</span>
                            <span>{event.remediesCount} remedies</span>
                            <span>{event.notesCount} notes</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ── Journal Entries ─────────────────────────────────────── */}
        <div className="space-y-6 pt-4 border-t border-line/60">
          <div>
            <h2 className="text-h2 font-display text-ink">Personal Reflections</h2>
            <p className="text-caption mt-0.5">Audio & text reflections linked to your Kundli journey</p>
          </div>

          {journalEntries.length === 0 ? (
            <p className="text-xs font-mono text-neutral-500 py-4">No reflections recorded yet.</p>
          ) : (
            <div className="space-y-4">
              {journalEntries.map(entry => (
                <div key={entry.id} className="p-5 rounded-lg bg-surface border border-line space-y-3 font-sans">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-md bg-surface-2 border border-line flex items-center justify-center shrink-0 text-brand">
                      <FileText className="w-4 h-4 text-brand" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-ink leading-relaxed">{entry.content}</p>
                      <div className="flex items-center gap-3 mt-3 font-mono text-xs">
                        <span className="text-ink-tertiary">{new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        <Badge variant="gold" size="sm">{entry.mood}</Badge>
                        {entry.duration && <span className="text-ink-tertiary">{entry.duration}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <CosmicVaultModal
        isOpen={vaultOpen}
        onClose={() => setVaultOpen(false)}
      />
    </div>
  )
}
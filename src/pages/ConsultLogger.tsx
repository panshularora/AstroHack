import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Plus, Star, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/Modal"
import { mockConsultations, mockAstrologers } from "@/lib/mock-data"

export function ConsultLogger() {
  const [showForm, setShowForm] = useState(false)
  const [topic, setTopic] = useState("")
  const [astrologer, setAstrologer] = useState("")
  const [duration, setDuration] = useState("")

  return (
    <div className="page-container max-w-5xl pb-28">
      <div className="space-y-10">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="border-b border-line/60 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
                <MessageSquare className="w-4 h-4 text-brand" />
              </div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">Consultation History</p>
            </div>
            <h1 className="text-h1 font-display text-ink tracking-tight">Verified Consultations</h1>
            <p className="text-sm text-ink-secondary mt-1">
              Log, review, and track action items from your live consultations with top Vedic experts.
            </p>
          </div>

          <Button size="sm" className="rounded-md shrink-0 font-mono" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" /> Log Session
          </Button>
        </div>

        {/* ── Consultation List ───────────────────────────────────── */}
        <div className="space-y-4">
          {mockConsultations.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-surface-2 border border-brand/30 text-brand flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    {c.astrologerName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-body font-bold text-ink">{c.topic}</p>
                      <Badge variant="success" size="sm">Verified Session</Badge>
                    </div>
                    <p className="text-caption mt-0.5">{c.astrologerName}</p>

                    <div className="flex flex-wrap items-center gap-5 mt-4 font-mono text-xs text-ink-secondary">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand" />
                        {new Date(c.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand" />
                        {c.durationMinutes} mins
                      </span>
                      <span className="font-bold text-ink">₹{c.cost.toLocaleString("en-IN")}</span>
                      {c.rating && (
                        <span className="flex items-center gap-1 text-gold-bright font-bold">
                          <Star className="w-3.5 h-3.5 fill-gold-bright text-gold-bright" />
                          {c.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Log Session Modal */}
      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <ModalHeader>
          <h2 className="text-h3 font-display text-ink">Log a Consultation</h2>
          <p className="text-xs text-ink-secondary mt-1 font-sans">Record key guidance, remedies, and predictions from your session.</p>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="block font-bold text-ink-secondary mb-1.5">Consultation Topic</label>
              <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Career Growth & Jupiter Transit" className="font-sans" />
            </div>
            <div>
              <label className="block font-bold text-ink-secondary mb-1.5">Astrologer</label>
              <select
                value={astrologer}
                onChange={e => setAstrologer(e.target.value)}
                className="w-full h-10 rounded-md border border-line bg-surface-2 px-3 text-xs text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand font-sans"
              >
                <option value="">Select astrologer</option>
                {mockAstrologers.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-ink-secondary mb-1.5">Duration (minutes)</label>
              <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="45" className="font-mono" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" size="sm" className="rounded-md" onClick={() => setShowForm(false)}>Cancel</Button>
          <Button size="sm" className="rounded-md" onClick={() => setShowForm(false)}>Save Session Record</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
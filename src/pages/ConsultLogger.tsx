import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Plus, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/Modal"
import { mockAstrologers } from "@/lib/mock-data"
import { useUser } from "@/context/UserContext"
import { useLedger } from "@/context/LedgerContext"
import { useNavigate } from "react-router-dom"

export function ConsultLogger() {
  const { user, updateProfile } = useUser()
  const { addPrediction } = useLedger()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [topic, setTopic] = useState("")
  const [astrologer, setAstrologer] = useState("")
  const [duration, setDuration] = useState("")
  const [error, setError] = useState("")

  const sessions = user.consultations || []

  const saveSession = () => {
    if (!topic.trim()) {
      setError("Add what was discussed.")
      return
    }
    const minutes = parseInt(duration, 10) || 30
    updateProfile({
      consultations: [
        {
          id: `c-${Date.now()}`,
          astrologerName: astrologer || mockAstrologers[0]?.name || "Astrologer",
          topic: topic.trim(),
          date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
          durationMinutes: minutes,
          cost: minutes * 15,
        },
        ...sessions,
      ],
    })
    const window = new Date()
    window.setDate(window.getDate() + 14)
    const added = addPrediction({
      title: topic.trim(),
      category: "career",
      targetDate: window.toISOString(),
      confidence: 80,
      astrologerName: astrologer || "Logged session",
    })
    setShowForm(false)
    setTopic("")
    setError("")
    navigate(added.ok ? "/app/ledger" : "/app/subscription")
  }

  return (
    <div className="page-container max-w-5xl pb-28">
      <div className="space-y-10">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="border-b border-line/60 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-none bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
                <MessageSquare className="w-4 h-4 text-brand" />
              </div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">Consultation History</p>
            </div>
            <h1 className="text-h1 font-display text-ink tracking-tight">Verified Consultations</h1>
            <p className="text-sm text-ink-secondary mt-1">
              Log, review, and track action items from your live consultations with top Vedic experts.
            </p>
          </div>

          <Button size="sm" className="rounded-none shrink-0 font-mono" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" /> Log Session
          </Button>
        </div>

        {/* ── Consultation List ───────────────────────────────────── */}
        <div className="space-y-4">
          {sessions.length === 0 && (
            <p className="text-sm text-zinc-500">No sessions yet. Log one, or finish a live call — both write to the ledger.</p>
          )}
          {sessions.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="p-6 rounded-none bg-surface border border-line space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-none bg-surface-2 border border-brand/30 text-brand flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    {c.astrologerName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-body font-bold text-ink">{c.topic}</p>
                      <Badge variant="success" size="sm">Logged</Badge>
                    </div>
                    <p className="text-caption mt-0.5">{c.astrologerName}</p>

                    <div className="flex flex-wrap items-center gap-5 mt-4 font-mono text-xs text-ink-secondary">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand" />
                        {c.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand" />
                        {c.durationMinutes} mins
                      </span>
                      <span className="font-bold text-ink">₹{c.cost.toLocaleString("en-IN")}</span>
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
                className="w-full h-10 rounded-none border border-line bg-surface-2 px-3 text-xs text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand font-sans"
              >
                <option value="">Select astrologer</option>
                {mockAstrologers.map(a => (
                  <option key={a.id} value={a.name}>{a.name}</option>
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
          {error && <p className="text-xs text-amber-400 px-6">{error}</p>}
          <Button variant="outline" size="sm" className="rounded-none" onClick={() => setShowForm(false)}>Cancel</Button>
          <Button size="sm" className="rounded-none" onClick={saveSession}>Save to ledger</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
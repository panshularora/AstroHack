import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Plus, Calendar, Star, FileText } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useUser } from "@/context/UserContext"

const ashtakoota = [
  { name: "Varna", score: 1, max: 1, desc: "Spiritual compatibility.", status: "green" },
  { name: "Vashya", score: 2, max: 2, desc: "Mutual control & attraction.", status: "green" },
  { name: "Tara", score: 1.5, max: 3, desc: "Longevity of bond.", status: "amber" },
  { name: "Yoni", score: 3, max: 4, desc: "Physical & temperamental match.", status: "green" },
  { name: "Graha Maitri", score: 4, max: 5, desc: "Intellectual & mental harmony.", status: "green" },
  { name: "Gana", score: 4, max: 6, desc: "Nature compatibility (Divine/Human/Demon).", status: "amber" },
  { name: "Bhakoot", score: 7, max: 7, desc: "Emotional & financial prosperity.", status: "green" },
  { name: "Nadi", score: 8, max: 8, desc: "Health & progeny compatibility.", status: "green" },
]

export function RelationshipMode() {
  const { user } = useUser()
  const [partnerAdded, setPartnerAdded] = useState(false)
  const [partnerName, setPartnerName] = useState("")
  const [dob, setDob] = useState("")
  const [tob, setTob] = useState("")
  const [pob, setPob] = useState("")

  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`astrolive_partner_${user.id}`)
      if (stored) {
        try {
          const data = JSON.parse(stored)
          if (data.name) {
            setPartnerName(data.name)
            setPartnerAdded(true)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [user])

  const handleCalculate = () => {
    if (!partnerName) return
    setPartnerAdded(true)
    if (user?.id) {
      localStorage.setItem(`astrolive_partner_${user.id}`, JSON.stringify({ name: partnerName, dob, tob, pob }))
    }
  }

  const milestones = [
    { date: "Jun 10", title: "Ashtakoot Kundli Matching", desc: `Pandit Rajesh Kumar analyzed your synastry with ${partnerName} (31/36 Gunas matched)` },
    { date: "Jul 1", title: "Communication Transit", desc: "Mercury transit favored deep partner dialogue" },
    { date: "Jul 15", title: "Shared Goal Alignment", desc: "Venus 7th House trine established long-term vision" },
  ]

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
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">Kundli Matching & Synastry</p>
            </div>
            <h1 className="text-h1 font-display text-ink tracking-tight">Relationship Compatibility</h1>
            <p className="text-sm text-ink-secondary mt-1">36-Guna Ashtakoota analysis for marriage and partnership compatibility.</p>
          </div>
          {!partnerAdded && (
            <Button variant="outline" size="sm" className="rounded-md font-mono shrink-0" onClick={() => document.getElementById('partner-name')?.focus()}>
              <Plus className="w-4 h-4" /> Add Partner Kundli
            </Button>
          )}
        </div>

        {!partnerAdded ? (
          <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
            <h3 className="text-body font-bold text-ink">Enter Partner Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink-secondary">Partner Name</label>
                <input id="partner-name" type="text" className="w-full bg-surface-2 border border-line rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-brand transition-colors" value={partnerName} onChange={e => setPartnerName(e.target.value)} placeholder="e.g. Meera Verma" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink-secondary">Date of Birth</label>
                <input type="date" className="w-full bg-surface-2 border border-line rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-brand transition-colors" value={dob} onChange={e => setDob(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink-secondary">Time of Birth</label>
                <input type="time" className="w-full bg-surface-2 border border-line rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-brand transition-colors" value={tob} onChange={e => setTob(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink-secondary">Place of Birth</label>
                <input type="text" className="w-full bg-surface-2 border border-line rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-brand transition-colors" value={pob} onChange={e => setPob(e.target.value)} placeholder="e.g. New Delhi, India" />
              </div>
            </div>
            <Button onClick={handleCalculate} disabled={!partnerName} className="mt-4 w-full sm:w-auto">
              Calculate Compatibility
            </Button>
          </div>
        ) : (
          <>
            {/* Ashtakoota Breakdown */}
            <div className="p-6 rounded-lg bg-surface border border-line space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-line/60 pb-6">
                <div>
                  <h3 className="text-h2 font-display text-ink">31 / 36 Gunas</h3>
                  <p className="text-sm text-ink-secondary mt-1">Excellent match with {partnerName}</p>
                </div>
                <Badge variant="success" className="font-mono text-sm px-3 py-1">Vivaha Yogya</Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {ashtakoota.map(item => (
                  <div key={item.name} className="p-3 rounded-md border border-line/60 bg-surface-2/30 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.status === 'green' ? 'bg-[#10b981]' : item.status === 'amber' ? 'bg-[#f59e0b]' : 'bg-[#ef4444]'}`} />
                      <div>
                        <p className="font-bold text-ink">{item.name}</p>
                        <p className="text-xs text-ink-secondary mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-ink shrink-0">{item.score}/{item.max}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Auspicious Windows */}
            <div className="space-y-4">
              <h3 className="text-body font-bold text-ink">Auspicious Marriage Windows</h3>
              <p className="text-sm text-ink-secondary">Venus & Jupiter conjunct in 7th house — highly auspicious for Vivaha Muhurta.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-md border border-brand/30 bg-surface flex items-center justify-between gap-4">
                  <Badge variant="gold" className="font-mono">Oct 15–Nov 5, 2026</Badge>
                  <Star className="w-4 h-4 text-brand opacity-60" />
                </div>
                <div className="p-4 rounded-md border border-brand/30 bg-surface flex items-center justify-between gap-4">
                  <Badge variant="gold" className="font-mono">Feb 12–Mar 8, 2027</Badge>
                  <Star className="w-4 h-4 text-brand opacity-60" />
                </div>
              </div>
            </div>

            {/* Download PDF Report */}
            <div className="p-6 rounded-lg bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-surface-2 border border-line flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-ink-secondary" />
                </div>
                <div>
                  <h3 className="text-body font-bold text-ink">Full Kundli Matching Report</h3>
                  <p className="text-xs text-ink-secondary mt-1">Detailed guna analysis, mangal dosha check, remedy suggestions.</p>
                </div>
              </div>
              <Button variant="outline" className="w-full sm:w-auto shrink-0" onClick={() => alert('Payment integration coming soon')}>
                Download Report — ₹99
              </Button>
            </div>

            {/* Shared Timeline */}
            <div className="space-y-4 pt-4">
              <h2 className="text-h2 font-display text-ink">Synastry Timeline</h2>
              <div className="space-y-3 font-sans">
                {milestones.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className="p-4 rounded-lg bg-surface border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="w-8 h-8 mt-0.5 sm:mt-0 rounded-md bg-surface-2 border border-brand/20 flex items-center justify-center text-brand shrink-0">
                          <Calendar className="w-4 h-4 text-brand" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-ink">{m.title}</p>
                          <p className="text-xs text-ink-secondary mt-0.5">{m.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-ink-tertiary shrink-0 sm:text-right">{m.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
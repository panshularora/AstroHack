import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { DetailedPrediction } from "@/lib/mock-data"

const CATEGORIES: DetailedPrediction["category"][] = ["career", "relationship", "finance", "health", "education"]

interface LogPredictionModalProps {
  open: boolean
  onClose: () => void
  onSave: (input: {
    title: string
    category: DetailedPrediction["category"]
    targetDate: string
    confidence: number
    astrologerName: string
  }) => { ok: boolean; reason?: string }
}

export function LogPredictionModal({ open, onClose, onSave }: LogPredictionModalProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<DetailedPrediction["category"]>("career")
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 21)
    return d.toISOString().slice(0, 10)
  })
  const [confidence, setConfidence] = useState(80)
  const [astrologerName, setAstrologerName] = useState("")
  const [error, setError] = useState("")

  if (!open) return null

  const submit = () => {
    if (!title.trim()) {
      setError("Write the prediction in one line.")
      return
    }
    const result = onSave({
      title: title.trim(),
      category,
      targetDate: new Date(targetDate).toISOString(),
      confidence,
      astrologerName: astrologerName.trim() || "Self-logged",
    })
    if (!result.ok) {
      setError(result.reason || "Could not save")
      return
    }
    setTitle("")
    setError("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-md bg-[#090A0F] border border-zinc-800 p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-zinc-500">Results</p>
            <h3 className="text-lg font-display text-white">Save a prediction</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Write one sentence they said, pick the date they named, and save it. You will come back here to close it.
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <label className="block space-y-1">
          <span className="text-[11px] text-zinc-500">What did they say, in one sentence?</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-9 bg-zinc-950 border border-zinc-800 px-3 text-sm text-white"
            placeholder="A job offer will arrive in the next three weeks"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span className="text-[10px] font-mono uppercase text-zinc-500">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as DetailedPrediction["category"])}
              className="w-full h-9 bg-zinc-950 border border-zinc-800 px-2 text-sm text-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-[11px] text-zinc-500">Date they named</span>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full h-9 bg-zinc-950 border border-zinc-800 px-2 text-sm text-white"
            />
          </label>
        </div>
        <label className="block space-y-1">
          <span className="text-[11px] text-zinc-500">Who said it?</span>
          <input
            value={astrologerName}
            onChange={(e) => setAstrologerName(e.target.value)}
            className="w-full h-9 bg-zinc-950 border border-zinc-800 px-3 text-sm text-white"
            placeholder="Name of the astrologer, or leave blank if it was you"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Confidence {confidence}%</span>
          <input
            type="range"
            min={50}
            max={99}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="w-full"
          />
        </label>
        {error && <p className="text-xs text-amber-400">{error}</p>}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1" onClick={submit}>Save this prediction</Button>
        </div>
      </div>
    </div>
  )
}

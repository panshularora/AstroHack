import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Edit2, Trash2, Plus, Clock, Target } from "lucide-react"
import type { ExtractedPrediction } from "@/lib/mock-data"
import { mockLatestSession } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export function PredictionExtractor() {
  const [predictions, setPredictions] = useState<ExtractedPrediction[]>(mockLatestSession.predictions)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleDelete = (id: string) => setPredictions(p => p.filter(x => x.id !== id))
  
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" /> AI Prediction Extractor
          </h2>
          <p className="text-[#9CA3AF]">We extracted these predictions from your session. Edit or add more before saving.</p>
        </div>
        <Button variant="outline" className="hidden md:flex gap-2 h-10 border-white/10 hover:bg-white/5 text-white">
          <Plus className="w-4 h-4" /> Add Manual Prediction
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {predictions.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              className="bg-card border border-white/10 rounded-3xl p-6 relative overflow-hidden"
            >
              {editingId === p.id ? (
                <div className="space-y-4 relative z-10">
                  <div>
                    <label className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block">Title</label>
                    <Input defaultValue={p.title} className="bg-navy/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block">Timeframe</label>
                      <Input defaultValue={p.timeframe} className="bg-navy/50" />
                    </div>
                    <div>
                      <label className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block">Confidence (%)</label>
                      <Input type="number" defaultValue={p.confidence} className="bg-navy/50" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <Button variant="outline" onClick={() => setEditingId(null)} className="border-white/10 hover:bg-white/5 text-white">Cancel</Button>
                    <Button onClick={() => setEditingId(null)} className="bg-primary/20 text-lavender hover:bg-primary/30">Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-primary/20 text-lavender rounded-md uppercase tracking-wider">{p.category}</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-white/5 text-white/90 rounded-md flex items-center gap-1 uppercase tracking-wider">
                        <Target className="w-3 h-3" /> {p.confidence}% Confidence
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-[#9CA3AF] flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4 text-primary" /> Target: {p.timeframe}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => setEditingId(p.id)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9CA3AF] hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <Button variant="outline" className="w-full mt-4 md:hidden border-white/10 h-12 text-white">
        <Plus className="w-4 h-4 mr-2" /> Add Manual Prediction
      </Button>
    </div>
  )
}

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import type { Consultation } from "@/lib/mock-data"
import { Calendar, Clock, Star, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { CosmicReplayModal } from "@/components/replay/CosmicReplayModal"

export function RecentConsultations({ consultations }: { consultations: Consultation[] }) {
  const navigate = useNavigate()
  const [replayModalOpen, setReplayModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)

  const handleWatchReplay = (c: Consultation) => {
    setSelectedSession({
      astrologerName: c.astrologerName,
      astrologerAvatar: c.astrologerAvatar,
      date: new Date(c.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      topic: c.topic,
      duration: c.durationMinutes,
      cost: c.cost,
    })
    setReplayModalOpen(true)
  }

  return (
    <>
      <div className="bg-card border border-white/10 rounded-3xl p-6 shadow-xl h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-white">Recent Consultations</h2>
            <p className="text-xs text-[#9CA3AF]">Your past readings & interactive Cosmic Replays</p>
          </div>
          <button
            onClick={() => navigate("/app/logger")}
            className="text-xs font-bold text-primary hover:text-lavender transition-colors flex items-center gap-1 cursor-pointer"
          >
            View History <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
          {consultations.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="bg-white/3 border border-white/8 rounded-2xl p-5 flex flex-col hover:border-white/20 hover:shadow-lg transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={c.astrologerAvatar} alt={c.astrologerName} className="w-11 h-11 rounded-full border border-white/10 object-cover" />
                  <div>
                    <h3 className="text-white font-semibold text-sm">{c.astrologerName}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mt-0.5">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(c.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.durationMinutes} min</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm">₹{c.cost.toLocaleString('en-IN')}</div>
                  {c.rating && (
                    <div className="flex items-center gap-1 text-xs text-gold justify-end mt-0.5 font-bold">
                      <Star className="w-3 h-3 fill-gold" /> {c.rating}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white/4 rounded-xl p-3 mb-5 border border-white/5">
                <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider font-bold">Topic Discussed</span>
                <p className="text-xs text-white/90 font-medium mt-0.5">{c.topic}</p>
              </div>
              
              <div className="mt-auto flex flex-col gap-2">
                <Button
                  onClick={() => handleWatchReplay(c)}
                  className="w-full text-xs h-9 bg-primary/20 text-lavender hover:bg-primary/30 border border-primary/30 font-bold flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-primary text-primary" /> Watch Cosmic Replay
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-xs h-8 border-white/10 hover:bg-white/10 text-[#9CA3AF] hover:text-white"
                    onClick={() => navigate("/app/logger")}
                  >
                    Notes
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-xs h-8 border-white/10 hover:bg-white/10 text-[#9CA3AF] hover:text-white"
                    onClick={() => navigate("/app/match")}
                  >
                    Follow-up
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CosmicReplayModal
        isOpen={replayModalOpen}
        onClose={() => setReplayModalOpen(false)}
        sessionData={selectedSession}
      />
    </>
  )
}

import { useState } from "react"
import { ShieldCheck, MessageSquare, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { type VerifiedAstrologer } from "@/lib/mock-data"
import { ConsultationFlowModal } from "@/components/consultation/ConsultationFlowModal"

export function ProfileHeader({ astrologer }: { astrologer: VerifiedAstrologer }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [initialMode, setInitialMode] = useState<"chat" | "voice" | "video">("chat")

  const handleOpen = (mode: "chat" | "voice" | "video") => {
    setInitialMode(mode)
    setModalOpen(true)
  }

  return (
    <>
      <div className="relative mb-16">
        {/* Background Banner */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-primary/20 via-blue-500/20 to-secondary/20 rounded-t-3xl overflow-hidden border-x border-t border-white/10">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 pt-24 px-6 md:px-12 flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar & Badges */}
          <div className="shrink-0 relative">
            <img src={astrologer.avatar} alt={astrologer.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#1a1b26] shadow-xl" />
            <div className="absolute -bottom-2 right-4 bg-primary rounded-full p-2 border-2 border-[#1a1b26] shadow-lg" title="AstroVerified Expert">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Info & Actions */}
          <div className="flex-1 w-full pt-4 md:pt-20">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{astrologer.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    astrologer.status === 'online' ? 'bg-green-400/20 text-green-400' : 
                    astrologer.status === 'busy' ? 'bg-gold/20 text-gold' : 'bg-white/10 text-[#9CA3AF]'
                  }`}>
                    {astrologer.status}
                  </span>
                </div>
                <p className="text-[#9CA3AF] text-lg mb-4 max-w-2xl">{astrologer.about}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                  <div className="flex items-center gap-1.5 text-white/80">
                    <span className="text-primary font-bold">{astrologer.accuracy}%</span> Verified Accuracy
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-1.5 text-white/80">
                    <span className="text-white">{astrologer.experienceYears}</span> Years Exp
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-1.5 text-white/80">
                    <span className="text-white">{astrologer.languages.join(", ")}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <Button
                  onClick={() => handleOpen("chat")}
                  className="w-full h-12 text-sm font-bold gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                >
                  <MessageSquare className="w-4 h-4" /> Start Chat • ₹{astrologer.pricing}/min
                </Button>
                <div className="flex gap-3 w-full">
                  <Button
                    onClick={() => handleOpen("voice")}
                    variant="outline"
                    className="flex-1 h-12 gap-2 border-white/20 text-white hover:bg-white/5"
                  >
                    <Phone className="w-4 h-4" /> Call
                  </Button>
                  <Button
                    onClick={() => handleOpen("video")}
                    variant="outline"
                    className="flex-1 h-12 gap-2 border-white/20 text-white hover:bg-white/5"
                  >
                    <Calendar className="w-4 h-4" /> Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationFlowModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        astrologer={astrologer}
        initialMode={initialMode}
      />
    </>
  )
}

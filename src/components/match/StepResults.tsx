import { motion } from "framer-motion"
import { ShieldCheck, Star, Users, MessageCircle, Phone, Video, Calendar } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { Astrologer } from "@/lib/mock-data"

interface StepResultsProps {
  results: Astrologer[]
  onReset: () => void
}

export function StepResults({ results, onReset }: StepResultsProps) {
  return (
    <motion.div
      key="step-results"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Perfect Cosmic Guides</h2>
        <p className="text-secondary-text text-lg">Based on your chart, concerns, and preferences, here are our top recommendations.</p>
      </div>

      <div className="space-y-6 mb-10">
        {results.map((a, i) => (
          <motion.div 
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className={`bg-card border ${i === 0 ? 'border-primary shadow-[0_0_20px_rgba(107,33,168,0.2)]' : 'border-white/10'} rounded-3xl p-6 md:p-8 relative overflow-hidden`}
          >
            {i === 0 && (
              <div className="absolute top-0 right-8 bg-primary text-white text-xs font-bold px-3 py-1 rounded-b-lg tracking-wider">
                #1 Match
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative shrink-0 mx-auto md:mx-0">
                <img src={a.avatar} alt={a.name} className="w-24 h-24 rounded-full border-4 border-card object-cover" />
                <div className="absolute -bottom-1 -right-1 bg-secondary text-white p-1 rounded-full border-2 border-card" title="AstroVerified">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{a.name}</h3>
                    <p className="text-sm text-secondary-text mb-3">{a.specialties.join(" • ")} | {a.yearsExperience} Yrs Exp</p>
                  </div>
                  <div className="text-xl font-bold text-white mb-4 md:mb-0">${a.pricePerMinute}<span className="text-sm font-normal text-secondary-text">/min</span></div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
                  <span className="flex items-center gap-1 bg-gold/10 text-gold text-xs font-bold px-2 py-1 rounded-md"><Star className="w-3.5 h-3.5 fill-gold" /> {a.rating}</span>
                  <span className="flex items-center gap-1 bg-white/5 text-white/90 text-xs font-bold px-2 py-1 rounded-md"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> {a.verifiedAccuracy}% Accuracy</span>
                  <span className="flex items-center gap-1 bg-white/5 text-white/90 text-xs font-bold px-2 py-1 rounded-md"><Users className="w-3.5 h-3.5 text-secondary-text" /> {a.consultationCount}+ Sessions</span>
                  <span className="text-xs text-[#9CA3AF] ml-2">Speaks: {a.languages.join(", ")}</span>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-sm text-lavender leading-relaxed mb-6 text-left">
                  <strong className="text-white block mb-1">Why We Recommended This Astrologer:</strong>
                  {a.recommendationReason}
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button className="h-10 text-sm gap-2 bg-white text-navy hover:bg-white/90"><MessageCircle className="w-4 h-4" /> Start Chat</Button>
                  <Button variant="outline" className="h-10 text-sm gap-2 border-white/20 hover:bg-white/5 text-white"><Phone className="w-4 h-4" /> Voice</Button>
                  <Button variant="outline" className="h-10 text-sm gap-2 border-white/20 hover:bg-white/5 text-white"><Video className="w-4 h-4" /> Video</Button>
                  <Button variant="outline" className="h-10 text-sm gap-2 border-white/20 hover:bg-white/5 text-white"><Calendar className="w-4 h-4" /> Schedule</Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center gap-4">
        <button onClick={onReset} className="px-6 py-3 font-medium text-[#9CA3AF] hover:text-white transition-colors cursor-pointer">
          Start Over
        </button>
        <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
          Compare Side by Side
        </Button>
      </div>
    </motion.div>
  )
}

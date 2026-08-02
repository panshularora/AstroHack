import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { mockVerifiedAstrologers, type VerifiedAstrologer } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"

export function AstrologerGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {mockVerifiedAstrologers.map((astrologer, i) => (
        <AstrologerCard key={astrologer.id} astrologer={astrologer} index={i} />
      ))}
    </div>
  )
}

function AstrologerCard({ astrologer, index }: { astrologer: VerifiedAstrologer, index: number }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-surface border border-line rounded-lg p-6 relative group hover:border-line-strong transition-all cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] flex flex-col h-full"
      onClick={() => navigate(`/app/astrologer/${astrologer.id}`)}
    >
      <div className="absolute top-6 right-6">
        <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          astrologer.status === 'online' ? 'bg-green-400/20 text-green-400' : 
          astrologer.status === 'busy' ? 'bg-gold/20 text-gold' : 'bg-white/10 text-[#9CA3AF]'
        }`}>
          {astrologer.status}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img src={astrologer.avatar} alt={astrologer.name} className="w-16 h-16 rounded-full object-cover border-2 border-line/60 group-hover:border-brand/50 transition-colors" />
          <div className="absolute -bottom-2 -right-2 bg-[#1a1b26] rounded-full p-1 border border-line">
            <ShieldCheck className="w-4 h-4 text-brand" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand transition-colors">{astrologer.name}</h3>
          <span className="text-xs text-brand font-bold bg-brand-light px-2 py-1 rounded-md">{astrologer.badge}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-[#9CA3AF] text-[10px] font-bold uppercase tracking-wider mb-1">Accuracy</div>
          <div className="text-xl font-bold text-white">{astrologer.accuracy}%</div>
          <p className="font-mono text-[9px] text-ink-tertiary mt-0.5 uppercase tracking-[0.1em]">
            of {astrologer.consultationCount} tracked predictions
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-[#9CA3AF] text-[10px] font-bold uppercase tracking-wider mb-1">Trust Score</div>
          <div className="text-xl font-bold text-brand">{astrologer.trustScore}</div>
        </div>
      </div>

      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#9CA3AF]">Experience</span>
          <span className="text-white font-medium">{astrologer.experienceYears} Years</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#9CA3AF]">Consultations</span>
          <span className="text-white font-medium">{astrologer.consultationCount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#9CA3AF]">Response Time</span>
          <span className="text-white font-medium">{astrologer.responseTime}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#9CA3AF]">Pricing</span>
          <span className="text-white font-medium">₹{astrologer.pricing}/min</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {astrologer.specialization.slice(0, 3).map(spec => (
          <span key={spec} className="text-[10px] font-bold px-2 py-1 bg-white/5 text-[#9CA3AF] rounded-md uppercase tracking-wider border border-line">{spec}</span>
        ))}
      </div>

      <div className="flex gap-2 mt-auto">
        <Button className="flex-1 h-10 gap-2 font-bold text-xs" onClick={(e) => { e.stopPropagation(); navigate(`/app/astrologer/${astrologer.id}`); }}>View Profile</Button>
      </div>
    </motion.div>
  )
}

import { GraduationCap } from "lucide-react"
import { mockExpertiseTimeline } from "@/lib/mock-data"

export function ExpertiseTimeline() {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="w-6 h-6 text-gold" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Expertise & Journey</h2>
          <p className="text-[#9CA3AF] text-sm">Professional background and milestones.</p>
        </div>
      </div>

      <div className="relative pl-6 md:pl-8 border-l-2 border-white/10 space-y-10">
        {mockExpertiseTimeline.map((item, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[33px] md:-left-[41px] top-1 w-4 h-4 rounded-full bg-gold/20 border-2 border-gold" />
            <span className="text-xs font-bold text-gold mb-2 block">{item.year}</span>
            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-2xl">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

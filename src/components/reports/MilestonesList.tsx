import { Flag } from 'lucide-react'

export function MilestonesList({ milestones }: { milestones: any[] }) {
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-8">
        <Flag className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-bold text-white">Major Milestones</h3>
      </div>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {milestones.map((m, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-primary bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(139,92,246,0.5)] z-10 ml-0 md:ml-0 md:mx-auto">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            
            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-primary text-xs font-bold mb-1">{m.date}</div>
              <h4 className="text-white font-bold mb-1">{m.title}</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

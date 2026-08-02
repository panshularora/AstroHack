import { FileText, Download, Calendar, Target, Activity } from "lucide-react"

export function ReportsGenerator() {
  const reports = [
    { icon: <Calendar className="w-5 h-5 text-primary" />, title: "Monthly Reflection", desc: "Summary of your emotional and cosmic progress this month." },
    { icon: <Target className="w-5 h-5 text-blue-400" />, title: "Prediction Progress", desc: "Status update on all active predictions and timelines." },
    { icon: <FileText className="w-5 h-5 text-gold" />, title: "Consultation Summary", desc: "Aggregated notes from all consultations with Dr. Sarah." },
    { icon: <Activity className="w-5 h-5 text-green-400" />, title: "Remedy Compliance", desc: "Detailed breakdown of your habit streaks." }
  ]

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-2">Reports Generator</h2>
      <p className="text-[#9CA3AF] mb-8">Generate beautifully formatted PDF reports using your Cosmic Memory.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((r, i) => (
          <div key={i} className="bg-card border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all group flex flex-col h-full cursor-pointer hover:shadow-lg">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 w-fit mb-5 group-hover:scale-110 transition-transform">
              {r.icon}
            </div>
            <h3 className="text-sm font-bold text-white mb-2">{r.title}</h3>
            <p className="text-xs text-[#9CA3AF] mb-6 flex-grow leading-relaxed">{r.desc}</p>
            
            <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Generate</span>
              <Download className="w-4 h-4 text-[#9CA3AF] group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

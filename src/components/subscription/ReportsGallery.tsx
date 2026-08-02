import { FileText, PieChart, LineChart } from "lucide-react"

export function ReportsGallery() {
  const reports = [
    { icon: <LineChart className="w-8 h-8 text-blue-400" />, title: "Annual Life Journey", desc: "A comprehensive 12-month cosmic forecast." },
    { icon: <PieChart className="w-8 h-8 text-primary" />, title: "Relationship Growth", desc: "Compatibility and joint transits overview." },
    { icon: <FileText className="w-8 h-8 text-gold" />, title: "Career Progress", desc: "Tracking professional milestones and opportunities." }
  ]

  return (
    <div className="mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Exclusive Premium Reports</h2>
        <p className="text-[#9CA3AF]">Generate beautifully formatted PDFs on demand.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reports.map((report, i) => (
          <div key={i} className="aspect-[3/4] bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 transition-opacity group-hover:opacity-90" />
            <div className="absolute inset-0 opacity-20 blur-[2px] flex flex-col gap-3 p-6 pointer-events-none">
              <div className="w-3/4 h-3 bg-white rounded-full" />
              <div className="w-full h-3 bg-white rounded-full" />
              <div className="w-5/6 h-3 bg-white rounded-full" />
              <div className="w-1/2 h-3 bg-white rounded-full mt-4" />
              <div className="w-full h-32 bg-white/20 rounded-xl mt-4" />
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                {report.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">{report.title}</h3>
              <p className="text-sm text-white/70">{report.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { Users } from "lucide-react"

export function CompareAstrologers() {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-6 h-6 text-secondary" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Compare With Similar Experts</h2>
          <p className="text-[#9CA3AF] text-sm">See how Dr. Vance compares to other Top Career Experts.</p>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 border-b border-white/10 text-[#9CA3AF] font-bold text-sm">Metric</th>
              <th className="py-4 px-6 border-b border-white/10 bg-white/5 rounded-tl-xl text-white font-bold text-sm">Dr. Alara Vance</th>
              <th className="py-4 px-6 border-b border-white/10 text-white font-bold text-sm">Dr. Sarah Chen</th>
              <th className="py-4 px-6 border-b border-white/10 text-white font-bold text-sm">Marcus Thorne</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="py-4 px-6 border-b border-white/5 text-[#9CA3AF]">Trust Score</td>
              <td className="py-4 px-6 border-b border-white/5 bg-white/5 text-primary font-bold">98</td>
              <td className="py-4 px-6 border-b border-white/5 text-white">99</td>
              <td className="py-4 px-6 border-b border-white/5 text-white">92</td>
            </tr>
            <tr>
              <td className="py-4 px-6 border-b border-white/5 text-[#9CA3AF]">Accuracy</td>
              <td className="py-4 px-6 border-b border-white/5 bg-white/5 text-white">94%</td>
              <td className="py-4 px-6 border-b border-white/5 text-white">96%</td>
              <td className="py-4 px-6 border-b border-white/5 text-white">89%</td>
            </tr>
            <tr>
              <td className="py-4 px-6 border-b border-white/5 text-[#9CA3AF]">Pricing</td>
              <td className="py-4 px-6 border-b border-white/5 bg-white/5 text-white">$45/min</td>
              <td className="py-4 px-6 border-b border-white/5 text-white">$60/min</td>
              <td className="py-4 px-6 border-b border-white/5 text-white">$30/min</td>
            </tr>
            <tr>
              <td className="py-4 px-6 text-[#9CA3AF]">Response Time</td>
              <td className="py-4 px-6 bg-white/5 rounded-bl-xl text-white">&lt; 5 mins</td>
              <td className="py-4 px-6 text-white">&lt; 2 mins</td>
              <td className="py-4 px-6 text-white">10 mins</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

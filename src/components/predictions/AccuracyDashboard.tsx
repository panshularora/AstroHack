import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { Activity, Target } from "lucide-react"
import { mockTrustDashboardData } from "@/lib/mock-data"

export function AccuracyDashboard() {
  const trendData = mockTrustDashboardData.accuracyTrend
  const radarData = mockTrustDashboardData.categorySuccess.map(c => ({
    category: c.category,
    success: c.rate,
    fullMark: 100
  }))

  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Accuracy Dashboard</h2>
        <p className="text-[#9CA3AF]">Historical performance of predictions across your journey.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trend Line Chart */}
        <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 lg:col-span-2 hover:border-white/20 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-white">Accuracy Trend</h3>
            </div>
            <span className="text-sm text-green-400 font-bold bg-green-400/10 px-3 py-1 rounded-full">+5% this year</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }}
                  itemStyle={{ color: '#7C3AED', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="#7C3AED" strokeWidth={4} dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-gold" />
            <h3 className="text-lg font-bold text-white">Category Success</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="category" stroke="#9CA3AF" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.1)" />
                <Radar name="Accuracy" dataKey="success" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

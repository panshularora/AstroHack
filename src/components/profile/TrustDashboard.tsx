import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Star } from "lucide-react"
import { mockTrustDashboardData } from '@/lib/mock-data'

export function TrustDashboard() {
  const { accuracyTrend, satisfaction } = mockTrustDashboardData

  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Trust Dashboard</h2>
        <p className="text-[#9CA3AF]">Verified analytics tracking performance and consistency.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Accuracy Trend */}
        <div className="bg-surface border border-line rounded-lg p-6 md:p-8 hover:border-line-strong transition-colors">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand" />
              <h3 className="text-lg font-bold text-white">Prediction Accuracy</h3>
            </div>
            <span className="text-sm font-bold text-white bg-white/10 px-3 py-1 rounded-full">94% Avg</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accuracyTrend} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#7C3AED', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#accuracyGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Satisfaction */}
        <div className="bg-surface border border-line rounded-lg p-6 md:p-8 hover:border-line-strong transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-gold fill-gold/20" />
              <h3 className="text-lg font-bold text-white">User Satisfaction</h3>
            </div>
            <span className="text-sm font-bold text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">4.9 / 5.0</span>
          </div>
          <div className="space-y-5">
            {satisfaction.map((stat, i) => (
              <div key={stat.rating} className="flex items-center gap-4">
                <span className="text-sm font-bold text-white w-12 shrink-0">{stat.rating}</span>
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-gold/50 to-gold rounded-full"
                    style={{ width: `${(stat.count / 850) * 100}%`, opacity: 1 - (i * 0.15) }}
                  />
                </div>
                <span className="text-sm text-[#9CA3AF] w-12 text-right">{stat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Area, AreaChart } from 'recharts'
import { mockChartData } from '@/lib/mock-data'
import { Sparkles, TrendingUp, PieChart as PieIcon } from 'lucide-react'

export function MemoryInsights() {
  const { accuracy, categories, moodEvolution } = mockChartData

  return (
    <div className="mb-24">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Insights From Your Journey</h2>
        <p className="text-[#9CA3AF]">Advanced analytics tracking your growth and accuracy.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Accuracy Bar Chart */}
        <div className="bg-surface border border-line rounded-lg p-6 md:p-8 hover:border-line-strong transition-colors">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-gold" />
            <h3 className="text-lg font-bold text-white">Astrologer Accuracy</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accuracy} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {accuracy.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#7C3AED' : index === 1 ? '#F59E0B' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Life Areas Pie Chart */}
        <div className="bg-surface border border-line rounded-lg p-6 md:p-8 hover:border-line-strong transition-colors">
          <div className="flex items-center gap-2 mb-6">
            <PieIcon className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-bold text-white">Consultation Topics</h3>
          </div>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }}
                />
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categories.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={['#7C3AED', '#EC4899', '#F59E0B', '#10B981'][index % 4]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-sm font-bold text-white/50">Life Areas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mood Evolution Area Chart */}
      <div className="bg-surface border border-line rounded-lg p-6 md:p-8 hover:border-line-strong transition-colors">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">Emotional Evolution</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={moodEvolution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }}
                />
              <Area type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

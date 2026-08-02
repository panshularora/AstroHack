import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity } from 'lucide-react'

export function EmotionalTrendsChart({ data }: { data: any[] }) {
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 h-full flex flex-col shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-bold text-white">Emotional Resonance</h3>
      </div>
      
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#9CA3AF" tick={{fill: '#9CA3AF', fontSize: 12}} axisLine={false} tickLine={false} />
            <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF', fontSize: 12}} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="clarity" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorClarity)" name="Clarity" />
            <Area type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorStress)" name="Stress" />
            <Area type="monotone" dataKey="energy" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorEnergy)" name="Energy" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

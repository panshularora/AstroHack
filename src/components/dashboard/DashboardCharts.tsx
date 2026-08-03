import { useState } from "react"
import { 
  AreaChart, Area, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from "recharts"
import { Card } from "@/components/ui/Card"
import { Tabs } from "@/components/ui/Tabs"

const TRANSIT_DATA = [
  { time: "Jul 01", intensity: 65, score: 70 },
  { time: "Jul 10", intensity: 78, score: 80 },
  { time: "Jul 20", intensity: 95, score: 92 },
  { time: "Aug 01", intensity: 88, score: 88 },
  { time: "Aug 10", intensity: 92, score: 95 },
  { time: "Aug 20", intensity: 98, score: 96 },
]

const RADAR_DATA = [
  { subject: "Career", score: 92 },
  { subject: "Finance", score: 78 },
  { subject: "Health", score: 85 },
  { subject: "Relationships", score: 88 },
  { subject: "Spiritual", score: 95 },
]

export function DashboardCharts() {
  const [chartTab, setChartTab] = useState("transit")

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      {/* Primary Area Chart */}
      <Card className="lg:col-span-8 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Celestial Transit Momentum Engine</h3>
            <p className="text-xs font-mono text-[#9CA3AF]">Real-time Jupiter 10th House Trine Intensity & Confidence Window</p>
          </div>

          <Tabs
            items={[
              { value: "transit", label: "Transit Strength" },
              { value: "confidence", label: "Confidence Engine" },
            ]}
            value={chartTab}
            onChange={setChartTab}
          />
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TRANSIT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="transitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#090A0F", 
                  borderColor: "rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  color: "#FFF",
                  fontSize: "12px",
                  fontFamily: "monospace"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey={chartTab === "transit" ? "intensity" : "score"} 
                stroke="#F59E0B" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#transitGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Secondary Radar Chart */}
      <Card className="lg:col-span-4 p-6 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white">Natal Kundli Life Balance</h3>
          <p className="text-xs font-mono text-[#9CA3AF]">5-Vector Astrological Strength Index</p>
        </div>

        <div className="h-[240px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" fontSize={10} tickLine={false} />
              <Radar name="Astrological Alignment" dataKey="score" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-2 border-t border-white/5 font-mono text-[10px] text-[#9CA3AF] flex justify-between">
          <span>Overall Alignment: 87.6%</span>
          <span className="text-amber-400 font-bold">Peak Active</span>
        </div>
      </Card>
    </div>
  )
}

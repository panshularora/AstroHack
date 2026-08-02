import { useState } from "react"
import { Bell, HeartPulse, Target, Sparkles, Check, Archive, Clock } from "lucide-react"
import { mockBriefNotifications } from "@/lib/mock-data"

export function NotificationCenter() {
  const [activeTab, setActiveTab] = useState("All")
  const tabs = ["All", "Predictions", "Remedies", "AI Recommendations"]

  const getIcon = (category: string) => {
    switch (category) {
      case 'Predictions': return <Target className="w-4 h-4 text-primary" />
      case 'Remedies': return <HeartPulse className="w-4 h-4 text-green-400" />
      case 'AI Recommendations': return <Sparkles className="w-4 h-4 text-blue-400" />
      default: return <Bell className="w-4 h-4 text-white" />
    }
  }

  const filtered = activeTab === "All" ? mockBriefNotifications : mockBriefNotifications.filter(n => n.category === activeTab)

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-white" />
          <h3 className="text-lg font-bold text-white">Smart Notifications</h3>
        </div>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">2 Unread</span>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === tab ? 'bg-white text-black' : 'bg-white/5 text-[#9CA3AF] hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(notification => (
          <div key={notification.id} className={`p-4 rounded-2xl border transition-colors group ${
            notification.unread ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
          }`}>
            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5">
                {getIcon(notification.category)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">{notification.category}</span>
                  <span className="text-[10px] text-[#9CA3AF]">{notification.time}</span>
                </div>
                <p className={`text-sm leading-relaxed mb-3 ${notification.unread ? 'text-white' : 'text-white/70'}`}>
                  {notification.text}
                </p>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-green-400" title="Mark as done"><Check className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400" title="Snooze"><Clock className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9CA3AF]" title="Archive"><Archive className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-[#9CA3AF] text-sm">
            No notifications in this category.
          </div>
        )}
      </div>
    </div>
  )
}

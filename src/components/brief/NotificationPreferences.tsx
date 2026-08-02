import { Settings, Moon, Bell, CalendarClock } from "lucide-react"

export function NotificationPreferences() {
  const preferences = [
    { title: "Delivery Time", desc: "When you receive your Daily Brief", icon: <CalendarClock className="w-4 h-4 text-primary" />, value: "08:00 AM" },
    { title: "Quiet Hours", desc: "No non-critical notifications", icon: <Moon className="w-4 h-4 text-blue-400" />, value: "10 PM - 7 AM" },
    { title: "AI Proactive", desc: "Allow AI to suggest actions", icon: <Bell className="w-4 h-4 text-gold" />, value: "Enabled" }
  ]

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 mb-16">
      <div className="flex items-center gap-2 mb-8">
        <Settings className="w-5 h-5 text-white" />
        <h2 className="text-xl font-bold text-white">Daily Brief Preferences</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {preferences.map((pref, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                {pref.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-white mb-0.5">{pref.title}</div>
                <div className="text-[10px] text-[#9CA3AF]">{pref.desc}</div>
              </div>
            </div>
            <div className="text-xs font-bold text-primary group-hover:text-white transition-colors">{pref.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

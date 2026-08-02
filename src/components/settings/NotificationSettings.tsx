import { Bell, Clock, Sun, Target } from "lucide-react"

export function NotificationSettings() {
  const notifications = [
    { icon: <Target className="w-5 h-5 text-primary" />, title: "Prediction Alerts", desc: "Notify me when a tracked prediction window opens.", enabled: true },
    { icon: <Sun className="w-5 h-5 text-gold" />, title: "Daily Brief Ready", desc: "Push notification when your morning brief is generated.", enabled: true },
    { icon: <Bell className="w-5 h-5 text-blue-400" />, title: "Consultation Reminders", desc: "Reminders 24h and 1h before a scheduled consultation.", enabled: true }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Notification Preferences</h2>
        <p className="text-[#9CA3AF]">Control how and when AstroLive contacts you.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-primary" /> Delivery Schedule
          </h3>
          <div className="grid xl:grid-cols-2 gap-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <label className="text-sm font-bold text-white block mb-2">Daily Brief Time</label>
              <input type="time" defaultValue="08:00" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <label className="text-sm font-bold text-white block mb-2">Quiet Hours (Do Not Disturb)</label>
              <div className="flex items-center gap-2">
                <input type="time" defaultValue="22:00" className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:invert text-sm" />
                <span className="text-[#9CA3AF]">to</span>
                <input type="time" defaultValue="07:00" className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:invert text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-400" /> Push Notifications
          </h3>
          {notifications.map((notif, i) => (
            <div key={i} className="flex items-start justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center shrink-0 mt-1 border border-white/5">
                  {notif.icon}
                </div>
                <div>
                  <div className="font-bold text-white mb-1">{notif.title}</div>
                  <div className="text-xs text-[#9CA3AF] leading-relaxed">{notif.desc}</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                <input type="checkbox" className="sr-only peer" defaultChecked={notif.enabled} />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

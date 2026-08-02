import { Eye, Activity, Mic, MapPin } from "lucide-react"

export function PrivacyPermissions() {
  const permissions = [
    { icon: <Eye className="w-5 h-5 text-blue-400" />, title: "AI Memory Usage", desc: "Allow AI to read past consultations to personalize responses.", enabled: true },
    { icon: <Activity className="w-5 h-5 text-green-400" />, title: "Anonymous Analytics", desc: "Share anonymous usage data to help improve AstroVerified accuracy.", enabled: false },
    { icon: <Mic className="w-5 h-5 text-brand" />, title: "Microphone Access", desc: "Required for voice-to-text during AI Companion chats.", enabled: true },
    { icon: <MapPin className="w-5 h-5 text-gold" />, title: "Location Access", desc: "Used to automatically update planetary transit calculations.", enabled: true }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Privacy & Permissions</h2>
        <p className="text-[#9CA3AF]">Manage what data you share and how it's used.</p>
      </div>

      <div className="bg-surface border border-line rounded-lg p-6 md:p-8 space-y-6">
        {permissions.map((perm, i) => (
          <div key={i} className="flex items-start justify-between p-4 bg-white/5 rounded-lg border border-line-subtle hover:bg-surface-3 transition-colors">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center shrink-0 mt-1">
                {perm.icon}
              </div>
              <div>
                <div className="font-bold text-white mb-1">{perm.title}</div>
                <div className="text-xs text-[#9CA3AF] leading-relaxed max-w-md">{perm.desc}</div>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
              <input type="checkbox" className="sr-only peer" defaultChecked={perm.enabled} />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

import { mockUserSettings } from "@/lib/mock-data"
import { ShieldCheck, Key, Fingerprint, Laptop, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function SecurityCenter() {
  const { activeSessions } = mockUserSettings

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Security Center</h2>
        <p className="text-[#9CA3AF]">Keep your AstroLive account secure.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
          <div>
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
              <Key className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Password</h3>
            <p className="text-sm text-[#9CA3AF] mb-6">Last changed 3 months ago.</p>
          </div>
          <Button variant="outline" className="w-full border-white/20">Change Password</Button>
        </div>

        <div className="bg-card border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
          <div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
              <Fingerprint className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Two-Factor Authentication</h3>
            <p className="text-sm text-[#9CA3AF] mb-6">Add an extra layer of security.</p>
          </div>
          <Button className="w-full">Enable 2FA</Button>
        </div>
      </div>

      <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-400" /> Active Sessions
        </h3>
        
        <div className="space-y-4">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/5">
                  {session.device.includes("MacBook") ? <Laptop className="w-5 h-5 text-white" /> : <Smartphone className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    {session.device} 
                    {session.current && <span className="text-[10px] bg-green-400/20 text-green-400 px-2 py-0.5 rounded-full uppercase tracking-wider border border-green-400/20">Current</span>}
                  </div>
                  <div className="text-xs text-[#9CA3AF] mt-0.5">{session.location} • {session.time}</div>
                </div>
              </div>
              {!session.current && (
                <button className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 bg-red-500/10 rounded-lg">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

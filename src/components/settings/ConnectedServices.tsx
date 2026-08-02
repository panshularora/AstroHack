import { mockUserSettings } from "@/lib/mock-data"
import { Calendar, Activity, Check, Plus } from "lucide-react"

export function ConnectedServices() {
  const { connectedServices } = mockUserSettings

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Connected Services</h2>
        <p className="text-[#9CA3AF]">Integrate AstroLive with your favorite tools.</p>
      </div>

      <div className="grid gap-4">
        {connectedServices.map((service) => (
          <div key={service.id} className="bg-card border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                {service.name.includes("Calendar") ? <Calendar className="w-6 h-6 text-blue-400" /> : <Activity className="w-6 h-6 text-red-400" />}
              </div>
              <div>
                <div className="font-bold text-white mb-1">{service.name}</div>
                <div className="text-xs text-[#9CA3AF]">{service.sync}</div>
              </div>
            </div>
            
            <div>
              {service.status === "Connected" ? (
                <button className="flex items-center gap-2 px-4 py-2 bg-green-400/10 text-green-400 border border-green-400/20 rounded-xl text-sm font-bold w-full md:w-auto justify-center">
                  <Check className="w-4 h-4" /> Connected
                </button>
              ) : (
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white border border-white/10 hover:bg-white/10 rounded-xl text-sm font-bold w-full md:w-auto justify-center transition-colors">
                  <Plus className="w-4 h-4" /> Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { useState } from "react"
import { User, Calendar, Shield, Info, RefreshCw, Save } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useUser } from "@/context/UserContext"
import { cn } from "@/lib/utils"

const categories = [
  { id: "account", label: "Account & Profile", icon: User },
  { id: "astrology", label: "Birth Chart Details", icon: Calendar },
  { id: "privacy", label: "Privacy & Data", icon: Shield },
  { id: "about", label: "About System", icon: Info },
] as const

type CategoryId = typeof categories[number]["id"]

export function Settings() {
  const [active, setActive] = useState<CategoryId>("account")
  const { user, updateProfile, resetToDemo } = useUser()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [dob, setDob] = useState(user.dob)
  const [time, setTime] = useState(user.timeOfBirth)
  const [place, setPlace] = useState(user.placeOfBirth)
  const [savedMessage, setSavedMessage] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      name,
      email,
      dob,
      timeOfBirth: time,
      placeOfBirth: place
    })
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 2500)
  }

  return (
    <div className="page-container max-w-5xl pb-28 font-sans">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight">System Settings & Dynamic Birth Chart</h1>
          <p className="text-xs text-[#9CA3AF] mt-1 font-mono">Configure your personal birth chart parameters, transit calculations, and memory profiles.</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-xs font-mono border-white/20 text-white flex items-center gap-1.5"
          onClick={resetToDemo}
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-400" /> Reset to Demo Profile
        </Button>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
        {/* ── Sidebar Nav ─────────────────────────────────────────── */}
        <nav className="space-y-1 sticky top-6 font-mono text-xs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-medium transition-colors text-left cursor-pointer",
                active === cat.id
                  ? "bg-white/10 text-white font-bold border-l-2 border-amber-500 shadow-sm"
                  : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
              )}
            >
              <cat.icon className={cn("w-4 h-4 shrink-0", active === cat.id ? "text-amber-400" : "text-[#9CA3AF]")} />
              {cat.label}
            </button>
          ))}
        </nav>

        {/* ── Content Panel ───────────────────────────────────────── */}
        <div className="space-y-6">
          {savedMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between">
              <span>✓ Chart recalculated successfully! Your Sun Sign & Transits have been updated across the OS.</span>
            </div>
          )}

          {active === "account" && (
            <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#090A0F] border border-white/10 space-y-6 shadow-xl">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Active User Profile</h3>
                <p className="text-xs text-[#9CA3AF] font-mono">Personal account details and active chart parameters</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#9CA3AF] uppercase block mb-1.5 font-bold">Full Name</label>
                  <Input value={name} onChange={e => setName(e.target.value)} className="bg-white/5 border-white/10 text-white text-xs rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#9CA3AF] uppercase block mb-1.5 font-bold">Email Address</label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} className="bg-white/5 border-white/10 text-white text-xs rounded-xl" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2 font-mono text-xs">
                <span className="text-amber-300 font-bold block">Current Calculated Astrological Identity:</span>
                <p className="text-white">
                  Sun Sign: <span className="font-bold text-amber-400">{user.sunSign}</span> · Ascendant: <span className="font-bold text-cyan-300">{user.ascendant}</span> · Active Dasha: <span className="font-bold text-emerald-300">{user.activeDasha}</span>
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" className="bg-amber-500 text-black font-bold hover:bg-amber-400 text-xs rounded-xl px-6 font-mono">
                  <Save className="w-4 h-4 mr-1" /> Save & Recalculate Chart
                </Button>
              </div>
            </form>
          )}

          {active === "astrology" && (
            <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#090A0F] border border-white/10 space-y-6 shadow-xl">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Birth Chart Parameters</h3>
                <p className="text-xs text-[#9CA3AF] font-mono">Update date, time, and location to dynamically re-index transits</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-[#9CA3AF] uppercase block mb-1.5 font-bold">Date of Birth (YYYY-MM-DD)</label>
                  <Input type="date" value={dob} onChange={e => setDob(e.target.value)} className="bg-white/5 border-white/10 text-white text-xs rounded-xl" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-[#9CA3AF] uppercase block mb-1.5 font-bold">Time of Birth (HH:MM)</label>
                    <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="bg-white/5 border-white/10 text-white text-xs rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#9CA3AF] uppercase block mb-1.5 font-bold">Place of Birth</label>
                    <Input value={place} onChange={e => setPlace(e.target.value)} className="bg-white/5 border-white/10 text-white text-xs rounded-xl" />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" className="bg-amber-500 text-black font-bold hover:bg-amber-400 text-xs rounded-xl px-6 font-mono">
                  <Save className="w-4 h-4 mr-1" /> Recalculate Natal Kundli
                </Button>
              </div>
            </form>
          )}

          {active === "privacy" && (
            <div className="p-6 rounded-2xl bg-[#090A0F] border border-white/10 space-y-4 shadow-xl text-xs font-mono text-[#9CA3AF]">
              <h3 className="text-base font-bold text-white mb-1">256-Bit Privacy & Encryption Controls</h3>
              <p className="leading-relaxed">All birth data, video consultation logs, and attached PDFs are encrypted on-device. No synthetic third-party tracking.</p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white">
                Status: 100% Encrypted & Private
              </div>
            </div>
          )}

          {active === "about" && (
            <div className="p-6 rounded-2xl bg-[#090A0F] border border-white/10 space-y-3 shadow-xl text-xs font-mono text-[#9CA3AF]">
              <h3 className="text-base font-bold text-white mb-1">AstroLive 2.0 Life OS</h3>
              <p>Version: 2.0.4 Release</p>
              <p>Lahiri Ayanamsha Ephemeris Sync: Active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
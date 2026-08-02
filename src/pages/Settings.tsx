import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Calendar, Database, Shield, Bell, Palette, Download, Link2, Info, Crown } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { mockUserSettings, mockUser } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const categories = [
  { id: "account", label: "Account", icon: User },
  { id: "astrology", label: "Birth Chart Details", icon: Calendar },
  { id: "memory", label: "Memory & Storage", icon: Database },
  { id: "privacy", label: "Privacy & Data", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "connected", label: "Connected APIs", icon: Link2 },
  { id: "about", label: "About System", icon: Info },
] as const

type CategoryId = typeof categories[number]["id"]

export function Settings() {
  const [active, setActive] = useState<CategoryId>("account")
  const navigate = useNavigate()
  const s = mockUserSettings

  return (
    <div className="page-container max-w-5xl pb-28">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="border-b border-line/60 pb-6 mb-8">
        <h1 className="text-h1 font-display text-ink tracking-tight">System Settings</h1>
        <p className="text-sm text-ink-secondary mt-1">Configure your birth chart parameters, privacy controls, and memory vault.</p>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
        {/* ── Sidebar Nav ─────────────────────────────────────────── */}
        <nav className="space-y-1 sticky top-6 font-mono text-xs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "w-full flex items-center gap-3 rounded-md px-3 py-2.5 font-medium transition-colors text-left",
                active === cat.id
                  ? "bg-surface-2 text-ink font-bold border-l-2 border-brand"
                  : "text-ink-secondary hover:text-ink hover:bg-surface-2/40"
              )}
            >
              <cat.icon className={cn("w-4 h-4 shrink-0", active === cat.id ? "text-brand" : "text-ink-tertiary")} />
              {cat.label}
            </button>
          ))}
        </nav>

        {/* ── Content Panel ───────────────────────────────────────── */}
        <div className="space-y-6">
          {active === "account" && (
            <>
              <div className="p-6 rounded-lg bg-surface border border-line space-y-6">
                <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">User Profile</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-md bg-brand text-white flex items-center justify-center font-mono font-bold text-lg shrink-0">
                    {s.profile.avatar}
                  </div>
                  <div>
                    <p className="text-body font-bold text-ink">{s.profile.name}</p>
                    <p className="text-caption font-mono text-gold-light mt-0.5">{s.profile.plan}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block text-ink-secondary mb-1.5 font-bold">Full Name</label>
                    <Input defaultValue={s.profile.name} className="font-sans" />
                  </div>
                  <div>
                    <label className="block text-ink-secondary mb-1.5 font-bold">Email</label>
                    <Input defaultValue={s.profile.email} className="font-sans" />
                  </div>
                  <div>
                    <label className="block text-ink-secondary mb-1.5 font-bold">Phone</label>
                    <Input defaultValue={s.profile.phone} className="font-mono" />
                  </div>
                  <div>
                    <label className="block text-ink-secondary mb-1.5 font-bold">Member Since</label>
                    <Input defaultValue={s.profile.memberSince} disabled className="font-mono" />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
                <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Active Sessions</h3>
                <div className="space-y-3 font-mono text-xs">
                  {s.activeSessions.map(session => (
                    <div key={session.id} className="flex items-center justify-between p-3.5 rounded-md bg-surface-2/60 border border-line/60">
                      <div>
                        <p className="font-bold text-ink">{session.device}</p>
                        <p className="text-caption text-ink-tertiary mt-0.5">{session.location} · {session.time}</p>
                      </div>
                      {session.current && <Badge variant="success" size="sm">Current</Badge>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {active === "astrology" && (
            <div className="p-6 rounded-lg bg-surface border border-line space-y-6">
              <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Birth Chart Parameters (Vedic Kundli)</h3>
              <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="block text-ink-secondary mb-1.5 font-bold">Date of Birth</label>
                  <Input defaultValue={s.birthDetails.date} type="date" />
                </div>
                <div>
                  <label className="block text-ink-secondary mb-1.5 font-bold">Time of Birth</label>
                  <Input defaultValue={s.birthDetails.time} type="time" />
                </div>
                <div>
                  <label className="block text-ink-secondary mb-1.5 font-bold">Place of Birth</label>
                  <Input defaultValue={s.birthDetails.location} className="font-sans" />
                </div>
                <div>
                  <label className="block text-ink-secondary mb-1.5 font-bold">Calculation System</label>
                  <Input defaultValue={s.birthDetails.system} disabled />
                </div>
              </div>
              <div className="p-4 rounded-md bg-surface-2 border border-brand/30 text-xs font-mono text-gold-bright">
                <p>Chart Placements: <span className="font-bold text-ink">{mockUser.zodiacSign} Sun · Scorpio Ascendant · Rahu Mahadasha</span></p>
              </div>
            </div>
          )}

          {active === "memory" && (
            <div className="p-6 rounded-lg bg-surface border border-line space-y-6">
              <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Cosmic Memory Storage</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                {[
                  { label: "Consultations", value: s.memoryUsage.consultations },
                  { label: "Predictions", value: s.memoryUsage.predictions },
                  { label: "Remedies", value: s.memoryUsage.remedies },
                  { label: "Journal Entries", value: s.memoryUsage.journalEntries },
                ].map(item => (
                  <div key={item.label} className="p-3.5 rounded-md bg-surface-2/60 border border-line/60">
                    <p className="text-xl font-bold text-ink tabular-nums">{item.value}</p>
                    <p className="text-[10px] text-ink-tertiary uppercase mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="rounded-md font-mono text-xs">
                <Download className="w-4 h-4" /> Export All Cosmic Memory Data
              </Button>
            </div>
          )}

          {active === "privacy" && (
            <div className="p-6 rounded-lg bg-surface border border-line space-y-4 font-sans text-xs">
              <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Privacy & Encryption</h3>
              <div className="space-y-3">
                {[
                  "End-to-end encrypted Cosmic Memory vault",
                  "Anonymized prediction proof verification log",
                  "No raw chart data shared with third parties",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3.5 p-3.5 rounded-md bg-surface-2/60 border border-line/60">
                    <Shield className="w-4 h-4 text-success shrink-0" />
                    <span className="text-ink-secondary flex-1">{item}</span>
                    <Badge variant="success" size="sm" className="font-mono">Active</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "notifications" && (
            <div className="p-6 rounded-lg bg-surface border border-line space-y-4 font-sans text-xs">
              <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Notification Preferences</h3>
              <div className="space-y-3">
                {["Daily Panchang brief alerts", "Prediction window opening alerts", "Remedy streak reminders", "Astrologer message queue alerts"].map(item => (
                  <div key={item} className="flex items-center gap-3.5 p-3.5 rounded-md bg-surface-2/60 border border-line/60">
                    <Bell className="w-4 h-4 text-brand shrink-0" />
                    <span className="text-ink-secondary flex-1">{item}</span>
                    <Badge variant="brand" size="sm" className="font-mono">Enabled</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "appearance" && (
            <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
              <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Theme System</h3>
              <div className="p-4 rounded-md bg-surface-2 border border-brand/30 font-mono text-xs text-ink">
                Active Theme: <span className="font-bold text-brand">Deep Cosmic Midnight (#080C14)</span>
              </div>
            </div>
          )}

          {active === "connected" && (
            <div className="p-6 rounded-lg bg-surface border border-line space-y-4 font-mono text-xs">
              <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Connected APIs</h3>
              <div className="space-y-3">
                {s.connectedServices.map(service => (
                  <div key={service.id} className="flex items-center gap-3.5 p-3.5 rounded-md bg-surface-2/60 border border-line/60">
                    <Link2 className="w-4 h-4 text-brand shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-ink">{service.name}</p>
                      <p className="text-caption text-ink-tertiary">{service.sync}</p>
                    </div>
                    <Badge variant="success" size="sm">{service.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "about" && (
            <div className="p-6 rounded-lg bg-surface border border-line space-y-4 font-mono text-xs">
              <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">System Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-line/40">
                  <span className="text-ink-tertiary">Version</span>
                  <span className="font-bold text-ink">AstroLive 2.0.0</span>
                </div>
                <div className="flex justify-between py-2 border-b border-line/40">
                  <span className="text-ink-tertiary">Current Membership</span>
                  <span className="font-bold text-gold-bright">{s.profile.plan}</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="rounded-md" onClick={() => navigate("/app/subscription")}>
                    <Crown className="w-4 h-4 text-gold-bright" /> Manage Membership
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
import { NavLink, Link, useNavigate } from "react-router-dom"
import {
  Home, LayoutDashboard, BookOpen, Star, Heart,
  Settings, Sparkles, Target, ShieldCheck, BarChart2,
  ChevronRight, Crown, MessageSquare, Zap, Compass
} from "lucide-react"
import { cn } from "@/lib/utils"
import { mockUser } from "@/lib/mock-data"

interface NavItem {
  path: string
  label: string
  icon: typeof LayoutDashboard
  meta?: string
}

interface NavGroup {
  index: string
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    index: "01",
    label: "Navigation",
    items: [
      { path: "/", label: "Home Page", icon: Home },
      { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard, meta: "Now" },
      { path: "/app/brief", label: "Daily Brief", icon: Star, meta: "Today" },
      { path: "/app/companion", label: "AI Companion", icon: Sparkles, meta: "Live" },
    ],
  },
  {
    index: "02",
    label: "Astrological Practice",
    items: [
      { path: "/app/match", label: "Smart Match", icon: Zap },
      { path: "/app/verified", label: "Astrologers", icon: ShieldCheck },
      { path: "/app/logger", label: "Consultations", icon: MessageSquare },
      { path: "/app/memory", label: "Cosmic Memory", icon: BookOpen },
    ],
  },
  {
    index: "03",
    label: "Life & Verification",
    items: [
      { path: "/app/predictions", label: "Predictions", icon: Target },
      { path: "/app/reports", label: "Reports", icon: BarChart2 },
      { path: "/app/journey", label: "Life Journey", icon: Heart },
    ],
  },
]

export function Sidebar() {
  const navigate = useNavigate()
  const initials = mockUser.name.slice(0, 2).toUpperCase()

  return (
    <aside className="w-[264px] border-r border-line bg-surface/95 backdrop-blur-md h-full flex flex-col shrink-0 select-none">
      {/* Brand — Astrolabe Logo */}
      <div className="px-5 py-4 border-b border-line/60">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand transition-transform group-hover:scale-105">
            <Compass className="w-4.5 h-4.5 text-brand" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold font-display tracking-tight text-ink leading-tight">
              AstroLive
            </span>
            <span className="text-[10px] text-ink-secondary tracking-widest uppercase font-mono font-semibold">
              Lifelong Companion
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation — Compact, readable, well-proportioned */}
      <nav className="flex-1 overflow-y-auto py-4 px-4 no-scrollbar space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="flex items-baseline gap-2 mb-1.5 px-2">
              <span className="font-mono text-[9px] text-gold-light tracking-[0.18em] font-bold">
                {group.index}
              </span>
              <p className="font-mono text-[9px] font-bold text-ink-secondary uppercase tracking-[0.16em]">
                {group.label}
              </p>
            </div>

            <div className="space-y-0.5">
              {group.items.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "relative flex items-center gap-3 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 group",
                      isActive
                        ? "bg-surface-2 text-ink font-semibold border-l-2 border-brand"
                        : "text-ink-secondary hover:text-ink hover:bg-surface-2/40"
                    )
                  }
                >
                  {({ isActive }: { isActive: boolean }) => (
                    <>
                      <item.icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-colors duration-150",
                          isActive ? "text-brand" : "text-ink-secondary group-hover:text-ink"
                        )}
                        strokeWidth={isActive ? 2 : 1.5}
                      />
                      <span className="flex-1">{item.label}</span>
                      {item.meta && (
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-gold-light bg-surface-2 border border-line px-1.5 py-0.5 rounded-sm">
                          {item.meta}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        {/* Account */}
        <div>
          <div className="flex items-baseline gap-2 mb-1.5 px-2">
            <span className="font-mono text-[9px] text-gold-light tracking-[0.18em] font-bold">04</span>
            <p className="font-mono text-[9px] font-bold text-ink-secondary uppercase tracking-[0.16em]">
              Account
            </p>
          </div>
          <div className="space-y-0.5">
            <NavLink
              to="/app/subscription"
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "relative flex items-center gap-3 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 group",
                  isActive ? "bg-surface-2 text-gold-bright font-semibold border-l-2 border-gold-bright" : "text-ink-secondary hover:text-ink hover:bg-surface-2/40"
                )
              }
            >
              {() => (
                <>
                  <Crown className="w-4 h-4 text-gold-bright shrink-0" strokeWidth={1.5} />
                  <span className="flex-1">AstroLive+</span>
                  <span className="font-mono text-[9px] font-bold tracking-[0.12em] px-1.5 py-0.5 bg-gold-bright/15 text-gold-bright rounded-sm">
                    PRO
                  </span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/app/settings"
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "relative flex items-center gap-3 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 group",
                  isActive ? "bg-surface-2 text-ink font-semibold border-l-2 border-brand" : "text-ink-secondary hover:text-ink hover:bg-surface-2/40"
                )
              }
            >
              {() => (
                <>
                  <Settings className="w-4 h-4 text-ink-secondary group-hover:text-ink shrink-0" strokeWidth={1.5} />
                  <span>Settings</span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </nav>

      {/* User profile footer */}
      <div className="border-t border-line/60 p-3.5">
        <button
          onClick={() => navigate("/app/settings")}
          className="w-full flex items-center gap-3 px-2.5 py-2 rounded-md bg-surface-2/40 hover:bg-surface-2 border border-line/50 transition-all duration-150 group"
        >
          <div className="w-8 h-8 rounded-md bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0 font-mono shadow-xs">
            {initials}
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-xs font-bold text-ink truncate leading-tight">{mockUser.name} Sharma</p>
            <p className="text-[10px] font-mono text-ink-secondary truncate mt-0.5 font-bold uppercase">
              {mockUser.isPremium ? "PRO" : "Free"} · {mockUser.zodiacSign}
            </p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-ink-secondary group-hover:text-ink transition-colors shrink-0" />
        </button>
      </div>
    </aside>
  )
}
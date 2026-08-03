import { NavLink, Link, useNavigate } from "react-router-dom"
import { 
  LayoutDashboard, 
  Bot, 
  Sparkles, 
  Target, 
  Database, 
  Calendar, 
  ShieldCheck, 
  BookOpen, 
  Heart, 
  Activity, 
  FileText, 
  CreditCard, 
  Settings, 
  Compass,
  ChevronRight,
  LifeBuoy
} from "lucide-react"
import { cn } from "@/lib/utils"
import { mockUser } from "@/lib/mock-data"

const primaryNavItems = [
  { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/companion", label: "AI Companion", icon: Bot, badge: "AI" },
  { path: "/app/match", label: "Smart Match", icon: Sparkles, badge: "Live" },
  { path: "/app/predictions", label: "Prediction Center", icon: Target },
  { path: "/app/memory", label: "Cosmic Memory", icon: Database },
  { path: "/app/brief", label: "Daily Brief", icon: Calendar },
]

const secondaryNavItems = [
  { path: "/app/verified", label: "AstroVerified", icon: ShieldCheck },
  { path: "/app/ledger", label: "Prediction Ledger", icon: BookOpen },
  { path: "/app/relationship", label: "Relationship Mode", icon: Heart },
  { path: "/app/journey", label: "Life Journey", icon: Activity },
  { path: "/app/reports", label: "Reports Center", icon: FileText },
  { path: "/app/sos", label: "Grounding SOS", icon: LifeBuoy, badge: "SOS", badgeColor: "bg-red-500/20 text-red-400 border-red-500/30" },
]

const utilityNavItems = [
  { path: "/app/subscription", label: "Subscription", icon: CreditCard },
  { path: "/app/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const navigate = useNavigate()
  const initials = mockUser.name.slice(0, 2).toUpperCase()

  return (
    <aside className="w-[240px] border-r border-line bg-surface/95 backdrop-blur-md h-full flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-line/60">
        <Link to="/app/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-surface-2 border border-brand/40 flex items-center justify-center text-brand transition-all group-hover:border-brand group-hover:scale-105 shadow-sm">
            <Compass className="w-4 h-4 text-brand" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold font-display tracking-tight text-ink leading-tight">AstroLive 2.0</span>
            <span className="text-[10px] text-brand tracking-wider uppercase font-mono font-semibold">Life OS</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
        {/* Core Suite */}
        <div>
          <p className="px-3 mb-1.5 text-[10px] font-mono font-bold tracking-widest text-ink-secondary/70 uppercase">
            Core Suite
          </p>
          <div className="space-y-0.5">
            {primaryNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 group",
                    isActive
                      ? "bg-brand/15 text-brand font-semibold border-l-2 border-brand"
                      : "text-ink-secondary hover:text-ink hover:bg-surface-2/60"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-brand" : "text-ink-secondary group-hover:text-ink")} strokeWidth={isActive ? 2 : 1.5} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-brand/20 text-brand border border-brand/30 rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Knowledge & Memory */}
        <div>
          <p className="px-3 mb-1.5 text-[10px] font-mono font-bold tracking-widest text-ink-secondary/70 uppercase">
            Memory & Intelligence
          </p>
          <div className="space-y-0.5">
            {secondaryNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 group",
                    isActive
                      ? "bg-brand/15 text-brand font-semibold border-l-2 border-brand"
                      : "text-ink-secondary hover:text-ink hover:bg-surface-2/60"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-brand" : "text-ink-secondary group-hover:text-ink")} strokeWidth={isActive ? 2 : 1.5} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={cn("font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-md border", item.badgeColor || "bg-brand/20 text-brand border-brand/30")}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Account & Settings */}
        <div>
          <p className="px-3 mb-1.5 text-[10px] font-mono font-bold tracking-widest text-ink-secondary/70 uppercase">
            Account
          </p>
          <div className="space-y-0.5">
            {utilityNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 group",
                    isActive
                      ? "bg-brand/15 text-brand font-semibold border-l-2 border-brand"
                      : "text-ink-secondary hover:text-ink hover:bg-surface-2/60"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-brand" : "text-ink-secondary group-hover:text-ink")} strokeWidth={isActive ? 2 : 1.5} />
                    <span className="flex-1">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* User Footer Profile */}
      <div className="border-t border-line/60 p-3">
        <button
          onClick={() => navigate("/app/you")}
          className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl bg-surface-2/40 hover:bg-surface-2 border border-line/50 transition-all group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0 font-mono shadow-sm">
            {initials}
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-xs font-bold text-ink truncate">{mockUser.name} Sharma</p>
            <p className="text-[10px] font-mono text-brand truncate">
              AstroLive Pro Member
            </p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-ink-secondary group-hover:text-ink shrink-0" />
        </button>
      </div>
    </aside>
  )
}

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
  { path: "/app/companion", label: "AI Companion", icon: Bot, badge: "AI", badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  { path: "/app/match", label: "Smart Match", icon: Sparkles, badge: "Live", badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
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
    <aside className="w-[240px] border-r border-white/[0.08] bg-[#090A0F]/95 backdrop-blur-xl h-full flex flex-col shrink-0 select-none text-sans">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-white/[0.08]">
        <Link to="/app/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 transition-all group-hover:scale-105 shadow-md shadow-amber-500/10">
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              AstroLive
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                2.0
              </span>
            </span>
            <span className="text-[10px] text-[#9CA3AF] font-mono tracking-widest uppercase font-semibold">Life OS</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {/* Core Suite */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-mono font-bold tracking-widest text-[#9CA3AF]/70 uppercase">
            Core Operating Suite
          </p>
          <div className="space-y-0.5">
            {primaryNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-white/10 text-white font-bold border border-white/15 shadow-sm"
                      : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-amber-400" : "text-[#9CA3AF] group-hover:text-white")} strokeWidth={isActive ? 2 : 1.5} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={cn("font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-md border", item.badgeColor)}>
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
          <p className="px-3 mb-2 text-[10px] font-mono font-bold tracking-widest text-[#9CA3AF]/70 uppercase">
            Memory & Intelligence
          </p>
          <div className="space-y-0.5">
            {secondaryNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-white/10 text-white font-bold border border-white/15 shadow-sm"
                      : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-amber-400" : "text-[#9CA3AF] group-hover:text-white")} strokeWidth={isActive ? 2 : 1.5} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={cn("font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-md border", item.badgeColor)}>
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
          <p className="px-3 mb-2 text-[10px] font-mono font-bold tracking-widest text-[#9CA3AF]/70 uppercase">
            Preferences
          </p>
          <div className="space-y-0.5">
            {utilityNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-white/10 text-white font-bold border border-white/15 shadow-sm"
                      : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-amber-400" : "text-[#9CA3AF] group-hover:text-white")} strokeWidth={isActive ? 2 : 1.5} />
                    <span className="flex-1">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* User Footer Profile */}
      <div className="border-t border-white/[0.08] p-3">
        <button
          onClick={() => navigate("/app/you")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] transition-all group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center text-xs font-bold shrink-0 font-mono shadow-md">
            {initials}
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{mockUser.name} Sharma</p>
            <p className="text-[10px] font-mono text-amber-400 truncate">
              AstroLive Pro Member
            </p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-white shrink-0" />
        </button>
      </div>
    </aside>
  )
}

import { useState } from "react"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
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
  LifeBuoy,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@/context/UserContext"

const primaryNavItems = [
  { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/predictions", label: "Predictions", icon: Target },
  { path: "/app/companion", label: "AI Companion", icon: Bot, badge: "AI", badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  { path: "/app/match", label: "Kundli Matchmaker", icon: Sparkles, badge: "Live", badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  { path: "/app/memory", label: "Consultations Archive", icon: Database },
  { path: "/app/brief", label: "Daily Horoscope", icon: Calendar },
]

const secondaryNavItems = [
  { path: "/app/verified", label: "Verified Astrologers", icon: ShieldCheck },
  { path: "/app/ledger", label: "Prediction Ledger", icon: BookOpen },
  { path: "/app/relationship", label: "Relationship Synastry", icon: Heart },
  { path: "/app/journey", label: "Dasha Timeline", icon: Activity },
  { path: "/app/reports", label: "Reports", icon: FileText },
  { path: "/app/sos", label: "Remedies & Peace", icon: LifeBuoy, badge: "Peace", badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
]

const utilityNavItems = [
  { path: "/app/subscription", label: "Subscription", icon: CreditCard },
  { path: "/app/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [collapsed, setCollapsed] = useState(false)

  const displayName = user.name && user.name.trim().length > 0 ? user.name : "User"
  const initials = displayName.slice(0, 2).toUpperCase()

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="border-r border-neutral-800 bg-[#090A0F] h-full flex flex-col shrink-0 select-none font-sans relative overflow-hidden"
    >
      {/* Brand Header */}
      <div className="px-4 py-4 border-b border-neutral-800 flex items-center justify-between">
        <Link to="/app/dashboard" className="flex items-center gap-3 group overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          {!collapsed && (
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                AstroLive
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  2.0
                </span>
              </span>
              <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase font-semibold">Vedic Astrology</span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {/* Core Suite */}
        <div>
          {!collapsed && (
            <p className="px-3 mb-2 text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
              Core Astrology Suite
            </p>
          )}
          <div className="space-y-0.5">
            {primaryNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors group",
                    isActive
                      ? "bg-neutral-800 text-white font-bold border border-neutral-700 shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-amber-400" : "text-neutral-400 group-hover:text-white")} strokeWidth={isActive ? 2 : 1.5} />
                    {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                    {!collapsed && item.badge && (
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
          {!collapsed && (
            <p className="px-3 mb-2 text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
              Archives & Remedies
            </p>
          )}
          <div className="space-y-0.5">
            {secondaryNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors group",
                    isActive
                      ? "bg-neutral-800 text-white font-bold border border-neutral-700 shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-amber-400" : "text-neutral-400 group-hover:text-white")} strokeWidth={isActive ? 2 : 1.5} />
                    {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                    {!collapsed && item.badge && (
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
          {!collapsed && (
            <p className="px-3 mb-2 text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
              Preferences
            </p>
          )}
          <div className="space-y-0.5">
            {utilityNavItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors group",
                    isActive
                      ? "bg-neutral-800 text-white font-bold border border-neutral-700 shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-amber-400" : "text-neutral-400 group-hover:text-white")} strokeWidth={isActive ? 2 : 1.5} />
                    {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* User Footer Profile */}
      <div className="border-t border-neutral-800 p-3">
        <button
          onClick={() => navigate("/app/you")}
          title={collapsed ? displayName : undefined}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors group cursor-pointer overflow-hidden"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center text-xs font-bold shrink-0 font-mono shadow-sm">
            {initials}
          </div>
          {!collapsed && (
            <div className="text-left flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{displayName}</p>
              <p className="text-[10px] font-mono text-amber-400 truncate">
                {user.sunSign} Sun · {user.ascendant}
              </p>
            </div>
          )}
          {!collapsed && <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white shrink-0" />}
        </button>
      </div>
    </motion.aside>
  )
}

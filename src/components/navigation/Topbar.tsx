import { useState } from "react"
import {
  Menu, X, LayoutDashboard, Star, Sparkles, MessageSquare,
  ShieldCheck, BookOpen, Target, BarChart2, Heart, Crown, Settings, Zap, Compass
} from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { mockUser } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const navGroups = [
  {
    label: "Daily Command",
    items: [
      { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { path: "/app/brief", label: "Daily Brief", icon: Star },
      { path: "/app/companion", label: "AI Companion", icon: Sparkles },
    ],
  },
  {
    label: "Astrological Practice",
    items: [
      { path: "/app/match", label: "Smart Match", icon: Zap },
      { path: "/app/verified", label: "Astrologers", icon: ShieldCheck },
      { path: "/app/logger", label: "Consultations", icon: MessageSquare },
      { path: "/app/memory", label: "Cosmic Memory", icon: BookOpen },
    ],
  },
  {
    label: "Life & Verification",
    items: [
      { path: "/app/predictions", label: "Predictions", icon: Target },
      { path: "/app/reports", label: "Reports", icon: BarChart2 },
      { path: "/app/journey", label: "Life Journey", icon: Heart },
    ],
  },
]

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const initials = mockUser.name.slice(0, 2).toUpperCase()

  return (
    <>
      <header className="h-14 border-b border-line/60 bg-surface/90 backdrop-blur-md px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 -ml-1 text-ink-secondary hover:text-ink transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate("/app/dashboard")}
          >
            <div className="w-7 h-7 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
              <Compass className="w-4 h-4 text-brand" />
            </div>
            <span className="text-sm font-bold font-display tracking-tight text-ink">AstroLive</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/app/settings")}
          className="w-7 h-7 rounded-md bg-brand text-white flex items-center justify-center text-[11px] font-mono font-bold shadow-xs cursor-pointer"
        >
          {initials}
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-surface border-r border-line z-40 flex flex-col"
            >
              <div className="h-14 px-4 flex items-center border-b border-line/60 justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
                    <Compass className="w-4 h-4 text-brand" />
                  </div>
                  <span className="text-sm font-bold font-display tracking-tight text-ink">AstroLive</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-ink-tertiary hover:text-ink">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
                {navGroups.map((group) => (
                  <div key={group.label} className="space-y-0.5">
                    <p className="px-2.5 mb-1.5 text-[10px] font-mono font-bold text-ink-tertiary uppercase tracking-[0.15em]">
                      {group.label}
                    </p>
                    {group.items.map(item => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }: { isActive: boolean }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-all duration-150 relative group",
                            isActive
                              ? "bg-surface-2 text-ink font-semibold border-l-2 border-brand"
                              : "text-ink-secondary hover:text-ink hover:bg-surface-2/50"
                          )
                        }
                      >
                        {({ isActive }: { isActive: boolean }) => (
                          <>
                            <item.icon className={cn(
                              "w-4 h-4 shrink-0 transition-colors",
                              isActive ? "text-brand" : "text-ink-tertiary group-hover:text-ink"
                            )} />
                            <span>{item.label}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                ))}

                <div className="pt-2 space-y-0.5">
                  <p className="px-2.5 mb-1.5 text-[10px] font-mono font-bold text-ink-tertiary uppercase tracking-[0.15em]">
                    Account
                  </p>
                  <NavLink
                    to="/app/subscription"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }: { isActive: boolean }) =>
                      cn(
                        "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-all duration-150 group",
                        isActive
                          ? "bg-surface-2 text-gold font-semibold border-l-2 border-gold-bright"
                          : "text-ink-secondary hover:text-ink hover:bg-surface-2/50"
                      )
                    }
                  >
                    <Crown className="w-4 h-4 text-gold-bright shrink-0" />
                    <span>AstroLive+</span>
                    <span className="ml-auto text-[9px] font-mono font-bold px-1.5 py-0.5 bg-gold-bright/15 text-gold-bright rounded-sm">PRO</span>
                  </NavLink>
                  <NavLink
                    to="/app/settings"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }: { isActive: boolean }) =>
                      cn(
                        "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-all duration-150 group",
                        isActive
                          ? "bg-surface-2 text-ink font-semibold border-l-2 border-brand"
                          : "text-ink-secondary hover:text-ink hover:bg-surface-2/50"
                      )
                    }
                  >
                    <Settings className="w-4 h-4 text-ink-tertiary group-hover:text-ink shrink-0" />
                    <span>Settings</span>
                  </NavLink>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
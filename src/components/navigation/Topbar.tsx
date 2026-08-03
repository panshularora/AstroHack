import { useState } from "react"
import { 
  Menu, X, Compass, Search, Sparkles, Clock, LayoutDashboard, Bot, 
  Target, Database, Calendar, ShieldCheck, BookOpen, Heart, Activity, FileText, LifeBuoy, CreditCard, Settings
} from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { mockUser } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const mobileNavItems = [
  { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/companion", label: "AI Companion", icon: Bot },
  { path: "/app/match", label: "Smart Match", icon: Sparkles },
  { path: "/app/predictions", label: "Predictions", icon: Target },
  { path: "/app/memory", label: "Cosmic Memory", icon: Database },
  { path: "/app/brief", label: "Daily Brief", icon: Calendar },
  { path: "/app/verified", label: "AstroVerified", icon: ShieldCheck },
  { path: "/app/ledger", label: "Prediction Ledger", icon: BookOpen },
  { path: "/app/relationship", label: "Relationship Mode", icon: Heart },
  { path: "/app/journey", label: "Life Journey", icon: Activity },
  { path: "/app/reports", label: "Reports Center", icon: FileText },
  { path: "/app/sos", label: "Grounding SOS", icon: LifeBuoy },
  { path: "/app/subscription", label: "Subscription", icon: CreditCard },
  { path: "/app/settings", label: "Settings", icon: Settings },
]

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const initials = mockUser.name.slice(0, 2).toUpperCase()

  return (
    <>
      <header className="h-14 border-b border-white/[0.08] bg-[#090A0F]/90 backdrop-blur-xl px-4 flex items-center justify-between text-sans select-none">
        {/* Left Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-1.5 -ml-1 text-[#9CA3AF] hover:text-white transition-colors">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/app/dashboard")}>
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">AstroLive 2.0</span>
          </div>
        </div>

        {/* Center Live Telemetry Bar */}
        <div className="hidden md:flex items-center gap-3 px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-full text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold">Jupiter 10th House</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1 text-[#9CA3AF]">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>Transit Alignment: 120° Trine</span>
          </div>
        </div>

        {/* Right Search & Profile */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-xs text-[#9CA3AF] cursor-pointer hover:bg-white/10 transition-colors">
            <Search className="w-3.5 h-3.5" />
            <span>Search transits, predictions...</span>
            <kbd className="text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/70">⌘K</kbd>
          </div>

          <button onClick={() => navigate("/app/you")} className="w-7 h-7 rounded-lg bg-amber-500 text-black flex items-center justify-center text-[11px] font-mono font-bold shadow-md cursor-pointer">
            {initials}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.25 }} className="fixed left-0 top-0 bottom-0 w-[260px] bg-[#090A0F] border-r border-white/10 z-40 flex flex-col md:hidden">
              <div className="h-14 px-4 flex items-center border-b border-white/10 justify-between">
                <span className="text-sm font-bold text-white">AstroLive Navigation</span>
                <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-[#9CA3AF]" /></button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {mobileNavItems.map(item => (
                  <NavLink key={item.path} to={item.path} onClick={() => setIsOpen(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-all",
                      isActive ? "bg-white/10 text-white font-bold border border-white/15" : "text-[#9CA3AF] hover:bg-white/5 hover:text-white"
                    )}>
                    {({ isActive }) => (
                      <>
                        <item.icon className={cn("w-4 h-4", isActive ? "text-amber-400" : "text-[#9CA3AF]")} />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

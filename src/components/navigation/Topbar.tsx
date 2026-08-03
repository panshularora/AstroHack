import { useState } from "react"
import { Menu, X, BookOpen, MessageCircle, ShieldCheck, User, Compass } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { mockUser } from "@/lib/mock-data"
import { useLedger } from "@/context/LedgerContext"
import { cn } from "@/lib/utils"

const navItems = [
  { path: "/app/ledger", label: "Ledger", icon: BookOpen },
  { path: "/app/consult", label: "Consult", icon: MessageCircle },
  { path: "/app/astrologers", label: "Astrologers", icon: ShieldCheck },
  { path: "/app/you", label: "You", icon: User },
]

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { stats } = useLedger()
  const initials = mockUser.name.slice(0, 2).toUpperCase()

  return (
    <>
      <header className="h-14 border-b border-line/60 bg-surface/90 backdrop-blur-md px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 -ml-1 text-ink-secondary hover:text-ink">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/app/ledger")}>
            <div className="w-7 h-7 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold font-display tracking-tight text-ink">AstroLive</span>
          </div>
        </div>
        <button onClick={() => navigate("/app/you")} className="w-7 h-7 rounded-md bg-brand text-white flex items-center justify-center text-[11px] font-mono font-bold">
          {initials}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.25 }} className="fixed left-0 top-0 bottom-0 w-[240px] bg-surface border-r border-line z-40 flex flex-col">
              <div className="h-14 px-4 flex items-center border-b border-line/60 justify-between">
                <span className="text-sm font-bold font-display text-ink">AstroLive</span>
                <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-ink-tertiary" /></button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-0.5">
                {navItems.map(item => (
                  <NavLink key={item.path} to={item.path} onClick={() => setIsOpen(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium transition-all",
                      isActive ? "bg-surface-2 text-ink font-semibold border-l-2 border-brand" : "text-ink-secondary hover:bg-surface-2/50"
                    )}>
                    {({ isActive }) => (
                      <>
                        <item.icon className={cn("w-4 h-4", isActive ? "text-brand" : "text-ink-tertiary")} />
                        <span>{item.label}</span>
                        {item.path === "/app/ledger" && stats.needsVerification > 0 && (
                          <span className="ml-auto font-mono text-[9px] font-bold px-1.5 py-0.5 bg-warning/15 text-warning rounded-sm">{stats.needsVerification}</span>
                        )}
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

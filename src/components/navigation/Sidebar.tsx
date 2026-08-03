import { NavLink, Link, useNavigate } from "react-router-dom"
import { BookOpen, MessageCircle, ShieldCheck, User, ChevronRight, Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockUser } from "@/lib/mock-data"
import { useLedger } from "@/context/LedgerContext"

const navItems = [
  { path: "/app/ledger", label: "Ledger", icon: BookOpen },
  { path: "/app/consult", label: "Consult", icon: MessageCircle },
  { path: "/app/astrologers", label: "Astrologers", icon: ShieldCheck },
  { path: "/app/you", label: "You", icon: User },
]

export function Sidebar() {
  const navigate = useNavigate()
  const { stats } = useLedger()
  const initials = mockUser.name.slice(0, 2).toUpperCase()

  return (
    <aside className="w-[220px] border-r border-line bg-surface/95 backdrop-blur-md h-full flex flex-col shrink-0 select-none">
      <div className="px-5 py-4 border-b border-line/60">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand transition-transform group-hover:scale-105">
            <Compass className="w-4 h-4 text-brand" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold font-display tracking-tight text-ink leading-tight">AstroLive</span>
            <span className="text-[10px] text-ink-secondary tracking-widest uppercase font-mono font-semibold">Prediction Ledger</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "relative flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-150 group",
                isActive
                  ? "bg-surface-2 text-ink font-semibold border-l-2 border-brand"
                  : "text-ink-secondary hover:text-ink hover:bg-surface-2/40"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-brand" : "text-ink-secondary group-hover:text-ink")} strokeWidth={isActive ? 2 : 1.5} />
                <span className="flex-1">{item.label}</span>
                {item.path === "/app/ledger" && stats.needsVerification > 0 && (
                  <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-warning/15 text-warning border border-warning/25 rounded-[2px]">
                    {stats.needsVerification}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line/60 p-3.5">
        <button
          onClick={() => navigate("/app/you")}
          className="w-full flex items-center gap-3 px-2.5 py-2 rounded-md bg-surface-2/40 hover:bg-surface-2 border border-line/50 transition-all group"
        >
          <div className="w-8 h-8 rounded-md bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0 font-mono">
            {initials}
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-xs font-bold text-ink truncate">{mockUser.name} Sharma</p>
            <p className="text-[10px] font-mono text-ink-secondary truncate mt-0.5">
              {stats.verified}/{stats.total} verified
            </p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-ink-secondary group-hover:text-ink shrink-0" />
        </button>
      </div>
    </aside>
  )
}

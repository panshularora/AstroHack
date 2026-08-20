import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { BookOpen, Bot, Film, Home, Search, Sparkles, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { STRAND_MODES, modeForPath } from "@/lib/loop"
import { useUser } from "@/context/UserContext"
import { useCommandMenu } from "@/components/command/CommandMenu"
import { useI18n, type Msg } from "@/lib/i18n"

const MODE_ICONS = {
  strand: Home,
  watch: Film,
  weave: Video,
  puja: Sparkles,
  claims: BookOpen,
} as const

export function StrandModeNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useUser()
  const { openMenu } = useCommandMenu()
  const { t } = useI18n()
  const labels: Record<string, Msg> = {
    strand: "home",
    watch: "reels",
    weave: "talkNow",
    puja: "puja",
    claims: "results",
  }
  const activeMode = modeForPath(location.pathname)
  const displayName = user.name?.trim() || "User"
  const initials = displayName.slice(0, 2).toUpperCase()

  return (
    <aside className="hidden md:flex flex-col w-[200px] shrink-0 h-full bg-zinc-950/40 border-r border-white/[0.04]">
      <div className="h-14 px-4 flex items-center">
        <button type="button" onClick={() => navigate("/app/dashboard")} className="text-left">
          <span className="font-display text-lg italic text-zinc-50">AstroLive</span>
        </button>
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={openMenu}
          className="w-full h-9 px-3 flex items-center gap-2 rounded-full text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/80 transition-colors duration-200"
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[12px] flex-1 text-left">{t("search")}</span>
          <kbd className="text-[10px] font-mono text-zinc-600">
            {typeof navigator !== "undefined" && /mac/i.test(navigator.platform) ? "⌘K" : "Ctrl K"}
          </kbd>
        </button>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-0.5">
        {STRAND_MODES.map((mode) => {
          const Icon = MODE_ICONS[mode.id]
          const isActive = activeMode === mode.id
          return (
            <NavLink
              key={mode.id}
              to={mode.href}
              className={cn(
                "flex items-center gap-2.5 px-3 h-10 text-[13px] rounded-full transition-colors duration-200",
                isActive ? "bg-zinc-100 text-zinc-950 font-medium" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/70"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              <span>{t(labels[mode.id])}</span>
            </NavLink>
          )
        })}
        <NavLink
          to="/app/companion"
          className={cn(
            "flex items-center gap-2.5 px-3 h-10 text-[13px] rounded-full transition-colors duration-200",
            location.pathname.startsWith("/app/companion")
              ? "bg-zinc-100 text-zinc-950 font-medium"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/70"
          )}
        >
          <Bot className="w-4 h-4 shrink-0" strokeWidth={1.75} />
          <span>{t("ask")}</span>
        </NavLink>
      </nav>

      <div className="p-3">
        <button
          type="button"
          onClick={() => navigate("/app/you")}
          className="w-full flex items-center gap-2.5 px-2 py-2 rounded-2xl hover:bg-zinc-900/80 transition-colors duration-200"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center font-mono text-[10px] font-semibold shrink-0">
            {initials}
          </div>
          <div className="min-w-0 text-left">
            <p className="text-xs font-medium text-zinc-100 truncate">{displayName}</p>
            <p className="text-[10px] text-zinc-500 truncate">
              {user.sunSign} · {user.ascendant}
            </p>
          </div>
        </button>
      </div>
    </aside>
  )
}

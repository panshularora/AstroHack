import { useLocation, useNavigate } from "react-router-dom"
import { BookOpen, Film, Home, Sparkles, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { STRAND_MODES, modeForPath } from "@/lib/loop"
import { useI18n, type Msg } from "@/lib/i18n"

const ICONS = {
  strand: Home,
  watch: Film,
  weave: Video,
  puja: Sparkles,
  claims: BookOpen,
} as const

export function StrandMobileDock() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useI18n()
  const active = modeForPath(location.pathname)
  const label: Record<string, Msg> = {
    strand: "home",
    watch: "reels",
    weave: "talkNow",
    puja: "puja",
    claims: "results",
  }

  return (
    <nav className="md:hidden fixed bottom-3 inset-x-3 z-30 bg-zinc-900/90 backdrop-blur-md rounded-full pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-14">
        {STRAND_MODES.map((mode) => {
          const Icon = ICONS[mode.id]
          const isActive = active === mode.id
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => navigate(mode.href)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 transition-colors duration-200",
                isActive ? "text-zinc-50" : "text-zinc-500"
              )}
            >
              <span className={cn("grid h-7 w-7 place-items-center rounded-full", isActive && "bg-white/10")}>
                <Icon className="w-4 h-4" strokeWidth={isActive ? 2 : 1.5} />
              </span>
              <span className="text-[10px] font-medium">{t(label[mode.id])}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

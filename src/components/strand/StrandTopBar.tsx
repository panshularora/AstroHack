import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { BookOpen, Bot, Film, Home, Menu, Search, Sparkles, Video, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { STRAND_MODES, modeForPath } from "@/lib/loop"

const MODE_ICONS = {
  strand: Home,
  watch: Film,
  weave: Video,
  puja: Sparkles,
  claims: BookOpen,
} as const
import { useUser } from "@/context/UserContext"
import { computePanchang } from "@/lib/vedic"
import { Button } from "@/components/ui/Button"
import { useCommandMenu } from "@/components/command/CommandMenu"
import { ThemeToggle } from "@/components/site/ThemeToggle"
import { LangToggle } from "@/components/site/LangToggle"
import { useI18n, type Msg } from "@/lib/i18n"

function useNow(ms = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), ms)
    return () => window.clearInterval(id)
  }, [ms])
  return now
}

const MODE_LABEL: Record<string, Msg> = {
  strand: "home",
  watch: "reels",
  weave: "talkNow",
  puja: "puja",
  claims: "results",
}

export function StrandTopBar() {
  const { user } = useUser()
  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const { openMenu } = useCommandMenu()
  const [open, setOpen] = useState(false)
  const now = useNow(1000)
  const skyAt = useNow(30_000)
  const activeMode = modeForPath(location.pathname)
  const initials = (user.name?.trim() || "U").slice(0, 2).toUpperCase()
  const panchang = computePanchang(skyAt, user.placeOfBirth)
  const clock = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })

  return (
    <div className="sticky top-0 z-20 bg-zinc-950/70 backdrop-blur-md">
      <header className="h-14 px-3 sm:px-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            className="md:hidden p-2 -ml-1 text-zinc-400 hover:text-zinc-100"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <button type="button" onClick={() => navigate("/app/dashboard")} className="md:hidden">
            <span className="font-display text-lg italic text-zinc-50">{t("brand")}</span>
          </button>
          <div className="hidden md:flex items-center gap-3 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
              {t("live")}
            </span>
            <span className="tabular-nums text-zinc-400">{clock}</span>
            <span className="truncate">Moon {panchang.moonSign} · {panchang.tithi}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openMenu}
            className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-full text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-colors duration-200"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs">{t("search")}</span>
          </button>
          <button type="button" onClick={openMenu} className="sm:hidden p-2 text-zinc-400" aria-label="Search">
            <Search className="w-4 h-4" />
          </button>
          <LangToggle compact />
          <button
            type="button"
            onClick={() => navigate("/app/wallet")}
            className="h-8 px-3 rounded-full text-xs text-zinc-200 hover:bg-zinc-900 tabular-nums"
            aria-label={t("wallet")}
          >
            ₹{user.walletBalance ?? 0}
          </button>
          <ThemeToggle />
          <Button size="sm" variant="ghost" className="hidden sm:inline-flex" onClick={() => navigate("/app/companion")}>
            {t("ask")}
          </Button>
          <Button size="sm" className="hidden sm:inline-flex" onClick={() => navigate("/app/consult")}>
            {t("talkNow")}
          </Button>
          <button
            type="button"
            onClick={() => navigate("/app/you")}
            className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-950 font-mono text-[11px] font-semibold"
          >
            {initials}
          </button>
        </div>
      </header>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/70 z-40 md:hidden" onClick={() => setOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-[min(100%,17rem)] bg-zinc-950 z-50 md:hidden flex flex-col rounded-r-3xl">
            <div className="h-14 px-4 flex items-center justify-between">
              <span className="font-display italic text-zinc-50">{t("brand")}</span>
              <button type="button" onClick={() => setOpen(false)} className="p-2 text-zinc-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 space-y-1">
              {STRAND_MODES.map((mode) => {
                const Icon = MODE_ICONS[mode.id]
                const isActive = activeMode === mode.id
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      navigate(mode.href)
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 h-11 text-left text-sm rounded-full",
                      isActive ? "bg-zinc-100 text-zinc-950" : "text-zinc-300 hover:bg-zinc-900"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {t(MODE_LABEL[mode.id])}
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  navigate("/app/companion")
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 h-11 text-left text-sm rounded-full",
                  location.pathname.startsWith("/app/companion")
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-300 hover:bg-zinc-900"
                )}
              >
                <Bot className="w-4 h-4" />
                {t("ask")}
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  )
}

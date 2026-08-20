import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { LOOP_STAGES, MORE_LENSES, STRAND_MODES, modeForPath } from "@/lib/loop"

export function LensBanner() {
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname

  if (
    path === "/app/dashboard" ||
    path === "/app" ||
    path === "/app/strand" ||
    path.startsWith("/app/room")
  ) {
    return null
  }

  const mode = modeForPath(path)
  const modeMeta = STRAND_MODES.find((m) => m.id === mode)
  const lens = MORE_LENSES.find((l) => path === l.href || path.startsWith(l.href + "/"))
  const stage =
    LOOP_STAGES.find((s) => s.href === path) ||
    (lens ? LOOP_STAGES.find((s) => s.id === lens.stage) : undefined)

  const title =
    modeMeta?.label ||
    path.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
    "Page"

  const hint = (() => {
    if (path === "/app/ledger" || path.startsWith("/app/proof")) {
      return "Each prediction lives here until you mark yes, no, or still waiting."
    }
    const raw = lens?.blurb || stage?.description
    if (!raw) return ""
    return raw.endsWith(".") ? raw : `${raw}.`
  })()

  return (
    <div className="px-5 py-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <div className="flex items-center gap-2 min-w-0 text-xs">
        <button
          type="button"
          onClick={() => navigate("/app/dashboard")}
          className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-100 transition-colors shrink-0"
        >
          <ArrowLeft className="w-3 h-3" />
          Home
        </button>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-200 capitalize truncate">{title}</span>
      </div>
      {hint && <p className="text-xs text-zinc-500 leading-relaxed max-w-md">{hint}</p>}
    </div>
  )
}

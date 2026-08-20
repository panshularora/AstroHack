import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { computeSkyFlags } from "@/lib/vedic"

export function SkyAlertBanner() {
  const navigate = useNavigate()
  const flags = useMemo(() => computeSkyFlags(), [])
  if (flags.length === 0) return null
  const retro = flags.filter((f) => f.retrograde).map((f) => f.name)
  const combust = flags.filter((f) => f.combust).map((f) => f.name)
  const parts = [
    retro.length ? `${retro.join(", ")} retrograde` : null,
    combust.length ? `${combust.join(", ")} combust` : null,
  ].filter(Boolean)

  return (
    <button
      type="button"
      onClick={() => navigate("/app/grahas")}
      className="w-full text-left px-4 py-2 border-b border-amber-900/50 bg-amber-950/40 text-[11px] font-mono text-amber-200 hover:bg-amber-950/70"
    >
      Live sky · {parts.join(" · ")}
    </button>
  )
}

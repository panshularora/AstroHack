import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiOptional } from "@/lib/api"

interface TapeRow {
  id: string
  title: string
  astrologerName: string
  outcome: string
}

function verb(o: string) {
  if (o === "yes") return "came true"
  if (o === "partial") return "partly"
  return "did not happen"
}

export function TapeTicker() {
  const navigate = useNavigate()
  const [rows, setRows] = useState<TapeRow[]>([])

  useEffect(() => {
    apiOptional<TapeRow[]>("/api/tape").then((data) => {
      if (data && Array.isArray(data) && data.length) setRows(data)
    })
    const src = new EventSource("/api/tape/stream")
    src.addEventListener("tape", (ev) => {
      try {
        const raw = JSON.parse((ev as MessageEvent).data) as Array<{
          id: string
          title: string
          astrologer_name?: string
          astrologerName?: string
          outcome: string
        }>
        if (!Array.isArray(raw) || !raw.length) return
        setRows(
          raw.map((r) => ({
            id: r.id,
            title: r.title,
            astrologerName: r.astrologerName || r.astrologer_name || "",
            outcome: r.outcome,
          }))
        )
      } catch {
        /* ignore */
      }
    })
    return () => src.close()
  }, [])

  if (!rows.length) return null

  const loop = [...rows, ...rows]

  return (
    <button
      type="button"
      onClick={() => navigate("/tape")}
      className="relative block w-full overflow-hidden py-4 text-left"
      aria-label="Open the public tape"
    >
      <div className="ecliptic-drift flex gap-12 whitespace-nowrap">
        {loop.map((r, i) => (
          <span key={`${r.id}-${i}`} className="text-[13px] text-zinc-400">
            <span className={r.outcome === "yes" ? "text-emerald-400" : r.outcome === "no" ? "text-zinc-500" : "text-amber-200/80"}>
              {verb(r.outcome)}
            </span>
            {" · "}
            {r.title.replace(/[?.!]+$/, "")}
            <span className="text-zinc-600"> — {r.astrologerName}</span>
          </span>
        ))}
      </div>
    </button>
  )
}

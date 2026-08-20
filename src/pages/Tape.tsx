import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CosmicField } from "@/components/sky/CosmicField"
import { apiOptional } from "@/lib/api"
import { useI18n } from "@/lib/i18n"
import { LangToggle } from "@/components/site/LangToggle"

interface TapeRow {
  id: string
  title: string
  category: string
  astrologerName: string
  firstName: string
  outcome: "yes" | "partial" | "no" | string
  verifiedOn: string
}

export function Tape() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const [rows, setRows] = useState<TapeRow[]>([])
  const verb = (o: string) => (o === "yes" ? t("cameTrue") : o === "partial" ? t("partlyTrue") : t("didNotHappen"))

  useEffect(() => {
    document.title = "AstroLive · The tape"
    apiOptional<TapeRow[]>("/api/tape").then((data) => {
      if (data && Array.isArray(data)) setRows(data)
    })
    return () => {
      document.title = "AstroLive. They named a date."
    }
  }, [])

  return (
    <div className="relative min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <CosmicField density={40} />
      <div className="relative max-w-2xl mx-auto px-5 py-12 pb-28">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display italic text-xl text-zinc-50">
            {t("brand")}
          </Link>
          <LangToggle compact />
        </div>
        <p className="mt-10 text-[12px] uppercase tracking-[0.18em] text-zinc-500">{t("tape")}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl text-zinc-50 leading-[1.05]">{t("tapeHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">{t("tapeBody")}</p>

        <ol className="mt-12 space-y-10">
          {rows.map((r) => (
            <li key={r.id}>
              <button type="button" onClick={() => navigate(`/p/${r.id}`)} className="text-left w-full group">
                <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  {verb(r.outcome)} · {new Date(r.verifiedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
                <p className="mt-2 font-display text-2xl text-zinc-50 leading-snug group-hover:italic">
                  {/[.!?]$/.test(String(r.title).trim()) ? r.title : `${r.title}.`}
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  {t("saidMarked", { name: r.astrologerName, user: r.firstName })}
                </p>
              </button>
            </li>
          ))}
        </ol>

        {rows.length === 0 && (
          <p className="mt-12 text-sm text-zinc-500">{t("tapeEmpty")}</p>
        )}
      </div>
    </div>
  )
}

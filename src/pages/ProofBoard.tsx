import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CosmicField } from "@/components/sky/CosmicField"
import { Button } from "@/components/ui/Button"
import { PRACTITIONERS } from "@/data/practitioners"
import { apiOptional } from "@/lib/api"
import { emptyScore, scoreLabel, type ProofScore } from "@/lib/proofScore"
import { useUser } from "@/context/UserContext"
import { useI18n } from "@/lib/i18n"
import { LangToggle } from "@/components/site/LangToggle"

export function ProofBoard() {
  const navigate = useNavigate()
  const { isAuthed } = useUser()
  const { t } = useI18n()
  const [scores, setScores] = useState<ProofScore[]>([])

  useEffect(() => {
    document.title = "AstroLive · Who actually came true"
    apiOptional<ProofScore[]>("/api/proof-scores").then((rows) => {
      if (rows && Array.isArray(rows)) setScores(rows)
    })
    return () => {
      document.title = "AstroLive. They named a date."
    }
  }, [])

  const ranked = [...PRACTITIONERS]
    .map((p) => {
      const s = scores.find((x) => x.name.toLowerCase() === p.name.toLowerCase()) || emptyScore(p.name)
      return { p, s }
    })
    .sort((a, b) => b.s.closed - a.s.closed || b.s.hitRate - a.s.hitRate || parseFloat(b.p.accuracy) - parseFloat(a.p.accuracy))

  return (
    <div className="relative min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <CosmicField density={36} />
      <div className="relative max-w-2xl mx-auto px-5 py-12 pb-28">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display italic text-xl text-zinc-50">
            {t("brand")}
          </Link>
          <LangToggle compact />
        </div>
        <p className="mt-10 text-[12px] uppercase tracking-[0.18em] text-zinc-500">{t("proofBoard")}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl text-zinc-50 leading-[1.05]">{t("rankedDates")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">{t("boardBody")}</p>

        <ol className="mt-12 space-y-8">
          {ranked.map(({ p, s }, i) => (
            <li key={p.id} className="flex gap-5 items-start">
              <img src={p.imageUrl} alt="" className="astro-face w-16 h-20 sm:w-20 sm:h-24 rounded-[18px] object-cover shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-zinc-600">{String(i + 1).padStart(2, "0")}</p>
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      isAuthed
                        ? `/app/room/${p.id}?mode=video`
                        : `/login?next=${encodeURIComponent(`/app/room/${p.id}?mode=video`)}`
                    )
                  }
                  className="mt-1 text-left w-full group"
                >
                  <p className="font-display text-2xl text-zinc-50 group-hover:italic">{p.name}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {p.specialty} · ₹{p.ratePerMin}/min ·{" "}
                    {s.closed > 0 ? scoreLabel(s) : `${p.accuracy} ${t("claimedNoCards")}`}
                  </p>
                </button>
              </div>
            </li>
          ))}
        </ol>

        <Button className="mt-12" onClick={() => navigate(isAuthed ? "/app/consult" : "/signup")}>
          Talk to the person on top
        </Button>
      </div>
    </div>
  )
}

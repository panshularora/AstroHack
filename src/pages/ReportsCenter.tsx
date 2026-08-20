import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { useLedger } from "@/context/LedgerContext"
import { REPORT_FEE } from "@/lib/entitlements"
import { downloadEvidencePdf } from "@/lib/evidencePdf"
import { useI18n } from "@/lib/i18n"
import { useState } from "react"
import { CosmicField } from "@/components/sky/CosmicField"

export function ReportsCenter() {
  const navigate = useNavigate()
  const { user, payFee } = useUser()
  const { predictions, stats } = useLedger()
  const { t } = useI18n()
  const [msg, setMsg] = useState("")
  const [busy, setBusy] = useState(false)
  const closed = predictions.filter((p) => p.status === "completed" || p.status === "failed" || p.outcome)

  const month = new Date().toISOString().slice(0, 7)
  const monthRows = closed.filter((p) => {
    const d = (p.closedAt || p.targetDate || "").slice(0, 7)
    return !d || d === month
  })

  const exportPdf = async () => {
    setBusy(true)
    setMsg("")
    const res = await payFee("report")
    setBusy(false)
    if (!res.ok) {
      setMsg(res.reason || t("checkoutFailed"))
      return
    }
    downloadEvidencePdf({
      name: user.name,
      month,
      rows: (monthRows.length ? monthRows : closed).map((p) => ({
        title: p.title,
        astrologer: p.astrologer.name,
        date: (p.closedAt || p.targetDate || "").slice(0, 10),
        outcome: p.outcome === "no" || p.status === "failed" ? "no" : p.outcome === "partial" ? "partial" : "yes",
      })),
    })
    setMsg(res.already ? t("reportAgain") : t("reportPaid", { n: user.plan === "free" ? REPORT_FEE : 0 }))
  }

  return (
    <div className="relative">
      <CosmicField density={24} />
      <div className="relative page-container max-w-2xl pb-28">
      <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("report")}</p>
      <h1 className="font-display text-5xl text-zinc-50 mt-2 leading-[0.95]">
        {t("reportHead")}
      </h1>
      <p className="mt-4 text-[15px] text-zinc-400 max-w-md leading-relaxed">
        {stats.total === 0
          ? t("reportEmpty")
          : t("reportStats", { yes: stats.verified, total: stats.total, pct: stats.accuracy })}
      </p>
      <p className="mt-3 text-sm text-zinc-500">
        {user.plan === "free" ? t("reportFeeLine", { n: REPORT_FEE }) : t("reportIncluded")}
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button disabled={busy} onClick={() => void exportPdf()}>
          {t("downloadPdf")}
        </Button>
        <Button variant="ghost" onClick={() => navigate("/app/ledger")}>
          {t("results")}
        </Button>
      </div>
      {msg && <p className="mt-4 text-sm text-emerald-300">{msg}</p>}

      {closed.length > 0 && (
        <ul className="mt-14 space-y-6">
          {closed.slice(0, 8).map((p) => (
            <li key={p.id}>
              <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                {p.outcome === "no" || p.status === "failed" ? t("didNotHappen") : p.outcome === "partial" ? t("partlyTrue") : t("cameTrue")}
              </p>
              <p className="font-display text-2xl text-zinc-50 mt-1">{p.title}</p>
              <p className="text-sm text-zinc-500 mt-1">{p.astrologer.name}</p>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  )
}

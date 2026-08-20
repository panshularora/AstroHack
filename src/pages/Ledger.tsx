import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useLedger } from "@/context/LedgerContext"
import { PredictionReceiptCard } from "@/components/ledger/PredictionReceiptCard"
import { VerificationModal } from "@/components/ledger/VerificationModal"
import { OutcomeProofModal } from "@/components/predictions/OutcomeProofModal"
import { LogPredictionModal } from "@/components/predictions/LogPredictionModal"
import type { DetailedPrediction } from "@/lib/mock-data"
import { useUser } from "@/context/UserContext"
import { getProof, proofFromPrediction, saveProof, type ProofRecord } from "@/lib/proof"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

type Filter = "needs" | "waiting" | "done" | "all"

function normClaim(title: string) {
  return title
    .toLowerCase()
    .replace(/^a second opinion on this line:\s*/i, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 56)
}

function bucket(p: DetailedPrediction): Exclude<Filter, "all"> {
  if (p.status === "completed" || p.status === "failed") return "done"
  if (new Date(p.targetDate) <= new Date()) return "needs"
  return "waiting"
}

export function Ledger() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { predictions, verifyPrediction, addPrediction } = useLedger()
  const [verifyTarget, setVerifyTarget] = useState<DetailedPrediction | null>(null)
  const [proof, setProof] = useState<ProofRecord | null>(null)
  const [logOpen, setLogOpen] = useState(false)
  const { t } = useI18n()

  const needs = predictions.filter((p) => bucket(p) === "needs")
  const waiting = predictions.filter((p) => bucket(p) === "waiting")
  const done = predictions.filter((p) => bucket(p) === "done")

  const [filter, setFilter] = useState<Filter | null>(null)
  const active = filter ?? (needs.length ? "needs" : "all")

  const visible = useMemo(() => {
    if (active === "needs") return needs
    if (active === "waiting") return waiting
    if (active === "done") return done
    return [...needs, ...waiting, ...done]
  }, [active, needs, waiting, done])

  const closeLine = (p: DetailedPrediction, outcome: "yes" | "partial" | "no", note?: string, evidenceName?: string) => {
    verifyPrediction(p.id, outcome, note)
    const record = proofFromPrediction(p, user.name, outcome, note, evidenceName)
    saveProof(record)
    setProof(record)
    setVerifyTarget(null)
  }

  const handleVerify = (outcome: "yes" | "partial" | "no", note?: string, evidenceName?: string) => {
    if (!verifyTarget) return
    closeLine(verifyTarget, outcome, note, evidenceName)
  }

  const openProof = (p: DetailedPrediction) => {
    const existing = getProof(p.id)
    if (existing) {
      setProof(existing)
      return
    }
    const outcome = p.outcome || (p.status === "failed" ? "no" : "yes")
    const record = proofFromPrediction(p, user.name, outcome, p.notes)
    saveProof(record)
    setProof(record)
  }

  const pairs = useMemo(() => {
    const map = new Map<string, DetailedPrediction[]>()
    for (const p of predictions) {
      const key = normClaim(p.title)
      if (key.length < 8) continue
      const list = map.get(key) || []
      list.push(p)
      map.set(key, list)
    }
    return [...map.values()].filter((list) => new Set(list.map((p) => p.astrologer.name)).size > 1)
  }, [predictions])

  const tabs: { id: Filter; label: "needsAnswer" | "stillWaiting" | "alreadyAnswered" | "allLines"; n: number }[] = [
    { id: "needs", label: "needsAnswer", n: needs.length },
    { id: "waiting", label: "stillWaiting", n: waiting.length },
    { id: "done", label: "alreadyAnswered", n: done.length },
    { id: "all", label: "allLines", n: predictions.length },
  ]

  return (
    <div className="relative">
      <CosmicField density={26} />
      <div className="relative page-container max-w-2xl pb-28">
      <p className="text-[12px] uppercase tracking-[0.18em] text-zinc-500">{t("results")}</p>
      <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">
        {t("jobTrue")}
      </h1>
      <p className="mt-4 text-[15px] text-zinc-400 max-w-xl leading-relaxed">{t("jobTrueD")}</p>

      {needs[0] && active === "needs" && (
        <div className="mt-12">
          <p className="text-[12px] uppercase tracking-[0.16em] text-emerald-400">{t("windowClosed")}</p>
          <p className="mt-3 font-display text-3xl sm:text-5xl text-zinc-50 leading-[1.05]">{needs[0].title}</p>
          <p className="mt-3 text-sm text-zinc-500">
            {needs[0].astrologer.name} ·{" "}
            {t("checkBy", {
              date: new Date(needs[0].targetDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
            })}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-baseline">
            <button type="button" className="font-display text-2xl sm:text-3xl text-emerald-300 text-left hover:italic" onClick={() => closeLine(needs[0], "yes")}>
              {t("itHappened")}
            </button>
            <button type="button" className="font-display text-2xl sm:text-3xl text-zinc-300 text-left hover:italic" onClick={() => closeLine(needs[0], "partial")}>
              {t("partly")}
            </button>
            <button type="button" className="font-display text-2xl sm:text-3xl text-zinc-500 text-left hover:italic" onClick={() => closeLine(needs[0], "no")}>
              {t("itDidNot")}
            </button>
          </div>
        </div>
      )}

      {pairs.length > 0 && (
        <div className="mt-10">
          <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("secondOpinions")}</p>
          <p className="mt-2 font-display text-2xl text-zinc-50">{t("twoExperts")}</p>
          <div className="mt-5 space-y-8">
            {pairs.map((list) => (
              <div key={normClaim(list[0].title)}>
                <p className="text-sm text-zinc-400 leading-relaxed">{list[0].title}</p>
                <ul className="mt-3 space-y-2">
                  {list.map((p) => (
                    <li key={p.id} className="text-sm text-zinc-300">
                      {p.astrologer.name}
                      {" · "}
                      {p.status === "completed" || p.status === "failed"
                        ? p.outcome === "no" || p.status === "failed"
                          ? t("didNotHappen")
                          : p.outcome === "partial"
                            ? t("partlyTrue")
                            : t("cameTrue")
                        : t("checkBy", {
                            date: new Date(p.targetDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
                          })}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={
              active === tab.id
                ? "h-8 px-3 rounded-full text-xs bg-zinc-100 text-zinc-950"
                : "h-8 px-3 rounded-full text-xs text-zinc-400 hover:text-zinc-100"
            }
          >
            {t(tab.label)} {tab.n}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="mt-4">
          {visible.map((p) => (
            <PredictionReceiptCard
              key={p.id}
              prediction={p}
              onVerify={() => setVerifyTarget(p)}
              onShare={() => openProof(p)}
              onSecond={() =>
                navigate(
                  `/app/consult?claim=${encodeURIComponent(p.title)}&cat=${encodeURIComponent(p.category)}`
                )
              }
            />
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <p className="font-display text-2xl text-zinc-50">
            {predictions.length === 0
              ? t("nothingSaved")
              : active === "needs"
                ? t("nothingNeeds")
                : active === "waiting"
                  ? t("nothingWaiting")
                  : t("nothingAnswered")}
          </p>
          <p className="text-sm text-zinc-500 mt-3 max-w-sm leading-relaxed">{t("afterChatSave")}</p>
        </div>
      )}

      <div className="mt-12 flex flex-wrap gap-3">
        <Button size="sm" onClick={() => setLogOpen(true)}>
          {t("savePrediction")}
        </Button>
        <Button size="sm" variant="outline" onClick={() => navigate("/app/consult")}>
          {t("talkToExpert")}
        </Button>
      </div>

      <VerificationModal
        isOpen={!!verifyTarget}
        onClose={() => setVerifyTarget(null)}
        prediction={verifyTarget}
        onConfirm={handleVerify}
      />
      <OutcomeProofModal isOpen={!!proof} onClose={() => setProof(null)} proof={proof} />
      <LogPredictionModal open={logOpen} onClose={() => setLogOpen(false)} onSave={addPrediction} />
      </div>
    </div>
  )
}

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { useLedger } from "@/context/LedgerContext"
import { PredictionShareCardModal } from "@/components/predictions/PredictionShareCardModal"
import { useNatalChart, useUser } from "@/context/UserContext"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function You() {
  const navigate = useNavigate()
  const { user } = useUser()
  const natal = useNatalChart()
  const { stats, predictions } = useLedger()
  const [shareOpen, setShareOpen] = useState(false)
  const { t } = useI18n()

  const verified = predictions.filter((p) => p.status === "completed")
  const topAstrologer =
    verified.length > 0
      ? verified.reduce(
          (best, p) => {
            const count = verified.filter((v) => v.astrologer.name === p.astrologer.name).length
            return count > best.count ? { name: p.astrologer.name, count } : best
          },
          { name: verified[0].astrologer.name, count: 0 }
        )
      : null

  return (
    <div className="relative">
      <CosmicField density={28} />
      <div className="relative page-container max-w-2xl pb-28">
      <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("you")}</p>
      <h1 className="font-display text-5xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{user.name}</h1>
      <p className="mt-4 text-[15px] text-zinc-400 leading-relaxed max-w-md">
        {natal.moonSign} Moon · {natal.lagnaSign} lagna · {user.plan === "free" ? t("payAsYouGo") : user.plan}. {t("wallet")} ₹
        {user.walletBalance}.
      </p>

      <div className="mt-12">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("whatCameTrue")}</p>
        <p className="font-display text-5xl text-zinc-50 mt-2">
          {stats.verified}
          <span className="text-zinc-500">/{stats.total}</span>
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          {stats.total === 0
            ? t("nothingDated")
            : t("closedTrue", { pct: stats.accuracy, n: stats.needsVerification })}
        </p>
        {topAstrologer && (
          <p className="mt-3 text-sm text-zinc-400">{t("mostRight", { name: topAstrologer.name })}</p>
        )}
        <Button className="mt-6" onClick={() => setShareOpen(true)}>
          {t("shareRecord")}
        </Button>
      </div>

      {verified.length > 0 && (
        <div className="mt-14">
          <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("recentEndings")}</p>
          <ul className="mt-5 space-y-6">
            {verified.slice(0, 4).map((p) => (
              <li key={p.id}>
                <p className="font-display text-2xl text-zinc-50 leading-snug">{p.title}</p>
                <p className="text-sm text-zinc-500 mt-1">
                  {p.astrologer.name} · {t("cameTrue")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-16 space-y-4">
        {[
          { t: t("freeKundli"), d: t("chartDrawnD"), href: "/app/kundli" },
          { t: t("wallet"), d: t("walletHead"), href: "/app/wallet" },
          { t: t("offerings"), d: t("offeringsHead"), href: "/app/offerings" },
          { t: t("jobAsk"), d: t("jobAskD"), href: "/app/companion" },
          { t: t("puja"), d: t("jobPujaD"), href: "/app/puja" },
          { t: t("report"), d: t("reportHead"), href: "/app/reports" },
          { t: t("pricing"), d: t("seePlusFamily"), href: "/app/subscription" },
          { t: t("invite"), d: t("yourCodeIs", { code: user.inviteCode }), href: "/app/share" },
        ].map((item) => (
          <button key={item.href} type="button" onClick={() => navigate(item.href)} className="block text-left group">
            <p className="font-display text-2xl text-zinc-50 group-hover:italic">{item.t}</p>
            <p className="text-sm text-zinc-500 mt-0.5">{item.d}</p>
          </button>
        ))}
      </div>

      <PredictionShareCardModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        prediction={{
          id: "scorecard",
          title: `${stats.verified}/${stats.total} Predictions Verified in 2026`,
          category: "SCORECARD",
          targetDate: new Date().toISOString().split("T")[0],
          confidence: stats.accuracy,
          astrologerName: topAstrologer?.name || "AstroLive Ledger",
          verifiedDate: new Date().toISOString().split("T")[0],
        }}
      />
      </div>
    </div>
  )
}

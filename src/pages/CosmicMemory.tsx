import { useNavigate } from "react-router-dom"
import { useLedger } from "@/context/LedgerContext"
import { useUser } from "@/context/UserContext"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function CosmicMemory() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { predictions } = useLedger()
  const { t } = useI18n()
  const sessions = user.consultations || []
  const first = user.name.split(" ")[0]

  return (
    <div className="relative">
      <CosmicField density={26} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("memory")}</p>
        <h1 className="font-display text-5xl text-zinc-50 mt-2 leading-[0.95]">{t("whatYouAsked")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-md leading-relaxed">{t("memoryBody", { name: first })}</p>

        <div className="mt-12">
          <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("sessions")}</p>
          {sessions.length === 0 ? (
            <button type="button" onClick={() => navigate("/app/consult")} className="mt-4 block text-left">
              <p className="font-display text-2xl text-zinc-50">{t("noSession")}</p>
              <p className="text-sm text-zinc-500 mt-1">{t("talkOnce")}</p>
            </button>
          ) : (
            <ul className="mt-5 space-y-6">
              {sessions.map((c) => (
                <li key={c.id}>
                  <p className="font-display text-2xl text-zinc-50">{c.astrologerName}</p>
                  <p className="text-sm text-zinc-500 mt-1">
                    {c.topic} · {c.date} · {c.durationMinutes} min
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-14">
          <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("datedLines")}</p>
          {predictions.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">{t("nothingDated")}</p>
          ) : (
            <ul className="mt-5 space-y-6">
              {predictions.slice(0, 8).map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => navigate("/app/ledger")} className="text-left">
                    <p className="font-display text-2xl text-zinc-50 leading-snug">{p.title}</p>
                    <p className="text-sm text-zinc-500 mt-1">
                      {p.astrologer.name} · {p.status === "completed" || p.status === "failed" ? t("answered") : t("stillOpen")}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { useLedger } from "@/context/LedgerContext"
import { proofPublicUrl } from "@/lib/proof"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function ShareKundli() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { predictions } = useLedger()
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const inviteUrl = `${window.location.origin}/signup?from=${encodeURIComponent(user.inviteCode)}`
  const closed = predictions.find((p) => p.status === "completed" || p.status === "failed")
  const proofUrl = closed
    ? proofPublicUrl(closed.id.startsWith("proof-") ? closed.id : `proof-${closed.id}`, user.inviteCode)
    : inviteUrl

  const copy = async (value: string) => {
    await navigator.clipboard?.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const whatsapp = (value: string, text: string) => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${value}`)}`, "_blank", "noopener")
  }

  return (
    <div className="relative">
      <CosmicField density={28} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.18em] text-zinc-500">{t("invite")}</p>
        <h1 className="font-display text-4xl sm:text-5xl text-zinc-50 mt-2 leading-[1.05]">{t("inviteHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-xl leading-relaxed">{t("inviteBody")}</p>

        <p className="mt-10 text-sm text-zinc-300">
          {t("yourCodeIs", { code: user.inviteCode })} {t("broughtPeople", { n: user.invitedCount })}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={() => copy(inviteUrl)}>{copied ? t("linkCopied") : t("copyInvite")}</Button>
          <Button variant="outline" onClick={() => whatsapp(inviteUrl, t("waInvite"))}>
            {t("sendWhatsapp")}
          </Button>
        </div>

        {closed && (
          <div className="mt-14">
            <h2 className="font-display text-2xl text-zinc-50">{t("orSendResult")}</h2>
            <p className="mt-2 text-sm text-zinc-500 max-w-lg leading-relaxed">
              {t("finishedResultBody", { title: closed.title })}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => copy(proofUrl)}>
                {t("copyProof")}
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  navigate(
                    `/p/${closed.id.startsWith("proof-") ? closed.id : `proof-${closed.id}`}?from=${user.inviteCode}`
                  )
                }
              >
                {t("previewCard")}
              </Button>
            </div>
          </div>
        )}

        <p className="mt-16 text-sm text-zinc-500 max-w-lg leading-relaxed">{t("growthLoop")}</p>
      </div>
    </div>
  )
}

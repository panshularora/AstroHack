import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PUJA_RITES } from "@/data/pujas"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { useI18n } from "@/lib/i18n"
import { PRACTITIONERS } from "@/data/practitioners"
import { CosmicField } from "@/components/sky/CosmicField"
import { RevealImage } from "@/components/motion/RevealImage"

export function Puja() {
  const { user, payFee } = useUser()
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const [busy, setBusy] = useState<string | null>(null)
  const hi = locale === "hi"

  const book = async (riteId: string) => {
    setBusy(riteId)
    setMsg("")
    const res = await payFee("puja", { riteId })
    setBusy(null)
    if (!res.ok || !res.practitionerId) {
      setMsg(res.reason || t("checkoutFailed"))
      return
    }
    const q = new URLSearchParams({ rite: riteId })
    navigate(`/app/puja/session/${res.practitionerId}?${q.toString()}`)
  }

  return (
    <div className="relative">
      <CosmicField density={40} />
      <div className="pointer-events-none absolute left-1/2 top-16 h-56 w-56 -translate-x-1/2 rounded-full opacity-40 blur-3xl bg-[radial-gradient(circle,rgba(232,200,114,0.22),transparent_70%)]" />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("puja")}</p>
        <h1 className="font-display text-5xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("pujaHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-md leading-relaxed">{t("pujaBody")}</p>
        <p className="mt-3 text-sm text-zinc-500">{t("walletLeft", { n: user.walletBalance ?? 0 })}</p>

        <div className="mt-14 space-y-14">
          {PUJA_RITES.map((r) => {
            const pandit = PRACTITIONERS.find((p) => p.id === r.practitionerId)
            return (
              <article key={r.id} className="flex gap-5 items-start">
                {pandit && (
                  <RevealImage src={pandit.imageUrl} className="w-28 h-40 sm:w-32 sm:h-44 rounded-[22px] shrink-0" />
                )}
                <div>
                  <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">₹{r.fee} · {r.minutes} min</p>
                  <h2 className="mt-1 font-display text-3xl text-zinc-50">{hi ? r.nameHi : r.name}</h2>
                  <p className="mt-2 text-sm text-zinc-400 max-w-md leading-relaxed">{hi ? r.lineHi : r.line}</p>
                  {pandit && <p className="mt-2 text-sm text-zinc-500">{pandit.name}</p>}
                  <Button className="mt-4" disabled={!!busy} onClick={() => void book(r.id)}>
                    {t("sitPuja")}
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
        {msg && <p className="mt-8 text-sm text-amber-200">{msg}</p>}
      </div>
    </div>
  )
}

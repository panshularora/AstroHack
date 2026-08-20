import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { OFFERINGS } from "@/data/offerings"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { useI18n } from "@/lib/i18n"
import { api, apiOptional } from "@/lib/api"
import { playAarti } from "@/lib/aartiTone"
import { cn } from "@/lib/utils"
import { CosmicField } from "@/components/sky/CosmicField"

export function Offerings() {
  const { user, updateProfile, payFee } = useUser()
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const [claimed, setClaimed] = useState<string[]>([])
  const [msg, setMsg] = useState("")
  const [busy, setBusy] = useState<string | null>(null)
  const [address, setAddress] = useState("")
  const [orders, setOrders] = useState<{ offeringId: string; tracking: string; status: string }[]>([])
  const wallet = user.walletBalance ?? 0
  const hi = locale === "hi"

  useEffect(() => {
    apiOptional<{ offeringId: string }[]>("/api/claims").then((rows) => {
      if (Array.isArray(rows)) setClaimed(rows.map((r) => r.offeringId))
    })
    apiOptional<{ offeringId: string; tracking: string; status: string }[]>("/api/orders").then((rows) => {
      if (Array.isArray(rows)) setOrders(rows)
    })
  }, [wallet])

  const claim = async (id: string) => {
    setBusy(id)
    setMsg("")
    try {
      const remote = await api<{ offeringId: string; walletBalance: number; claimed: string[] }>("/api/claims", {
        method: "POST",
        body: JSON.stringify({ offeringId: id, confirm: true }),
      })
      setClaimed(remote.claimed || [...claimed, id])
      if (typeof remote.walletBalance === "number") updateProfile({ walletBalance: remote.walletBalance })
      setMsg(t("claimOk"))
    } catch (e) {
      setMsg(e instanceof Error ? e.message : t("checkoutFailed"))
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="relative">
      <CosmicField density={30} />
      <div className="relative page-container max-w-2xl pb-28">
      <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("offerings")}</p>
      <h1 className="font-display text-5xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("offeringsHead")}</h1>
      <p className="mt-4 text-[15px] text-zinc-400 max-w-md leading-relaxed">{t("offeringsBody")}</p>
      <p className="mt-3 text-sm text-zinc-500">{t("walletLeft", { n: wallet })}</p>
      <p className="mt-2 text-sm text-zinc-600 max-w-md leading-relaxed">{t("labDemoNote")}</p>

      <div className="mt-12 space-y-12">
        {OFFERINGS.map((o) => {
          const have = claimed.includes(o.id)
          const can = wallet >= o.minWallet && wallet >= o.cost
          return (
            <article key={o.id}>
              <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                {o.kind} {o.planet ? `· ${o.planet}` : ""}
              </p>
              <h2 className="mt-1 font-display text-3xl text-zinc-50">{hi ? o.nameHi : o.name}</h2>
              <p className="mt-2 text-sm text-zinc-400 max-w-md leading-relaxed">{hi ? o.lineHi : o.line}</p>
              <p className="mt-2 text-sm text-zinc-500">
                {o.cost === 0 ? t("freeIfWallet", { n: o.minWallet }) : t("costsIfWallet", { n: o.cost })}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {have ? (
                  <>
                    <p className="text-sm text-emerald-300 self-center">{t("alreadyClaimed")}</p>
                    {o.kind === "aarti" && (
                      <Button size="sm" variant="outline" onClick={() => playAarti(o.id)}>
                        {t("playAarti")}
                      </Button>
                    )}
                    {o.kind !== "aarti" && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!!busy}
                        onClick={() => {
                          setBusy(o.id)
                          payFee("ship", { offeringId: o.id, address: address || "On file" }).then((res) => {
                            setBusy(null)
                            if (res.ok && res.tracking) {
                              setMsg(t("shipped", { code: res.tracking }))
                              setOrders((prev) =>
                                prev.some((x) => x.offeringId === o.id)
                                  ? prev
                                  : [{ offeringId: o.id, tracking: res.tracking!, status: "lab-queued" }, ...prev]
                              )
                            } else setMsg(res.reason || t("checkoutFailed"))
                          })
                        }}
                      >
                        {orders.find((x) => x.offeringId === o.id)
                          ? t("tracking", { code: orders.find((x) => x.offeringId === o.id)!.tracking })
                          : t("shipLab")}
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    size="sm"
                    disabled={!!busy || !can}
                    onClick={() => (can ? void claim(o.id) : navigate("/app/wallet"))}
                  >
                    {can ? t("claimNow") : t("needWallet", { n: o.minWallet })}
                  </Button>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder={t("shipAddress")}
        className="mt-12 w-full max-w-md h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm"
      />
      {msg && <p className={cn("mt-8 text-sm", /ATL|vault|Claimed|तिजोरी|दावा/i.test(msg) ? "text-emerald-300" : "text-amber-200")}>{msg}</p>}
      </div>
    </div>
  )
}

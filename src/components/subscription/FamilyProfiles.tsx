import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { PaywallModal } from "@/components/paywall/PaywallModal"
import { useI18n } from "@/lib/i18n"

export function FamilyProfiles() {
  const { user, addFamilyMember, switchChart } = useUser()
  const { t } = useI18n()
  const [paywall, setPaywall] = useState(false)
  const [name, setName] = useState("")
  const [relation, setRelation] = useState("Spouse")
  const [dob, setDob] = useState("1996-03-12")
  const [msg, setMsg] = useState("")

  const add = () => {
    if (user.plan !== "family") {
      setPaywall(true)
      return
    }
    const res = addFamilyMember({
      name: name || "Family member",
      relation,
      dob,
      timeOfBirth: "10:15",
      placeOfBirth: user.placeOfBirth,
    })
    setMsg(res.ok ? t("chartAdded") : res.reason || "")
    if (res.ok) setName("")
  }

  return (
    <div>
      <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("family")}</p>
      <h2 className="font-display text-3xl text-zinc-50 mt-2">{t("oneWalletFour")}</h2>
      <p className="text-sm text-zinc-500 mt-2 max-w-md">{t("familyBody")}</p>

      <div className="mt-6 space-y-4">
        <button type="button" onClick={() => switchChart("self")} className="block text-left">
          <p className="font-display text-2xl text-zinc-50">{user.name}</p>
          <p className="text-sm text-zinc-500">{user.moonSign} Moon · {user.ascendant} lagna</p>
        </button>
        {user.family.map((f) => (
          <button key={f.id} type="button" onClick={() => switchChart(f.id)} className="block text-left">
            <p className="font-display text-2xl text-zinc-50">{f.name}</p>
            <p className="text-sm text-zinc-500">{f.relation}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2 items-center">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white w-40"
        />
        <select
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          className="h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white"
        >
          <option>Spouse</option>
          <option>Parent</option>
          <option>Child</option>
        </select>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white"
        />
        <Button onClick={add}>{user.plan === "family" ? "Add chart" : "Unlock Family"}</Button>
      </div>
      {msg && <p className="mt-3 text-sm text-emerald-300">{msg}</p>}
      <PaywallModal open={paywall} feature="family" onClose={() => setPaywall(false)} />
    </div>
  )
}

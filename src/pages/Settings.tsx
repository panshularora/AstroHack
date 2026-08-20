import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { ConfirmModal } from "@/components/ui/ConfirmModal"
import { LAST_UPDATED } from "@/lib/site"
import { cn } from "@/lib/utils"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n, type Msg } from "@/lib/i18n"

const tabs: { id: "account" | "birth" | "privacy" | "about"; label: Msg }[] = [
  { id: "account", label: "account" },
  { id: "birth", label: "birth" },
  { id: "privacy", label: "privacyTab" },
  { id: "about", label: "aboutTab" },
]

type Tab = (typeof tabs)[number]["id"]

export function Settings() {
  const { t } = useI18n()
  const [active, setActive] = useState<Tab>("account")
  const { user, updateProfile, resetToDemo } = useUser()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [dob, setDob] = useState(user.dob)
  const [time, setTime] = useState(user.timeOfBirth)
  const [place, setPlace] = useState(user.placeOfBirth)
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({ name, email, dob, timeOfBirth: time, placeOfBirth: place })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  const field =
    "w-full h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white focus-visible:outline-none focus-visible:border-zinc-400"
  const labelCls = "block text-sm text-zinc-400 mb-1.5"

  return (
    <div className="relative">
      <CosmicField density={24} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("settings")}</p>
        <h1 className="font-display text-5xl text-zinc-50 mt-2 leading-[0.95]">{t("yourNameChart")}</h1>
        <p className="mt-3 text-sm text-zinc-500 max-w-md">{t("settingsBody")}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "h-9 px-4 rounded-full text-sm",
                active === tab.id ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
              )}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>

        {active === "account" && (
          <form onSubmit={save} className="mt-10 space-y-5 max-w-md">
            <div>
              <label className={labelCls}>{t("fullName")}</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className={field} />
            </div>
            <div>
              <label className={labelCls}>{t("email")}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
            </div>
            <p className="text-sm text-zinc-500">
              {user.sunSign} Sun · {user.moonSign} Moon · {user.ascendant} lagna · {user.activeDasha}
            </p>
            <Button type="submit">{t("saveChanges")}</Button>
          </form>
        )}

        {active === "birth" && (
          <form onSubmit={save} className="mt-10 space-y-5 max-w-md">
            <div>
              <label className={labelCls}>{t("dob")}</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={field} />
            </div>
            <div>
              <label className={labelCls}>{t("tob")}</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={field} />
            </div>
            <div>
              <label className={labelCls}>{t("pob")}</label>
              <input value={place} onChange={(e) => setPlace(e.target.value)} className={field} />
            </div>
            <Button type="submit">{t("redrawChart")}</Button>
          </form>
        )}

        {active === "privacy" && (
          <div className="mt-10 max-w-md space-y-4 text-[15px] text-zinc-400 leading-relaxed">
            <p>{t("privacyBody1")}</p>
            <p>{t("privacyBody2")}</p>
          </div>
        )}

        {active === "about" && (
          <div className="mt-10 max-w-md space-y-4 text-[15px] text-zinc-400 leading-relaxed">
            <p className="font-display text-3xl text-zinc-50">{t("brand")}</p>
            <p>{t("lastUpdatedSidereal", { date: LAST_UPDATED })}</p>
            <button type="button" onClick={() => setConfirmReset(true)} className="text-sm text-zinc-500 hover:text-zinc-200">
              {t("resetDemo")}
            </button>
          </div>
        )}

        {saved && (
          <p className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-40 rounded-full bg-zinc-100 text-zinc-950 px-4 py-2 text-sm">
            {t("savedToast")}
          </p>
        )}

        <ConfirmModal
          open={confirmReset}
          title={t("resetDemoTitle")}
          body={t("resetDemoBody")}
          confirmLabel={t("reset")}
          danger
          onConfirm={resetToDemo}
          onClose={() => setConfirmReset(false)}
        />
      </div>
    </div>
  )
}

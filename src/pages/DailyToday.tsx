import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useNatalChart, useUser } from "@/context/UserContext"
import { useLedger } from "@/context/LedgerContext"
import { computeChoghadiya, computePanchang, grahasInNatalHouses, nextMoonSignChange } from "@/lib/vedic"
import { skyHeat } from "@/lib/skyHeat"
import { CosmicField } from "@/components/sky/CosmicField"
import { NightOrbit } from "@/components/sky/NightOrbit"
import { KineticWords } from "@/components/motion/KineticWords"
import { dueReminderAllowed, enableDueReminder } from "@/hooks/useDueReminder"
import { useI18n } from "@/lib/i18n"

export function DailyToday() {
  const navigate = useNavigate()
  const { user, checkIn } = useUser()
  const { predictions } = useLedger()
  const { t, locale } = useI18n()
  const natal = useNatalChart()
  const [now, setNow] = useState(() => new Date())
  const [bonus, setBonus] = useState(0)
  const [saving, setSaving] = useState(false)
  const [notifyOn, setNotifyOn] = useState(() => dueReminderAllowed())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const panchang = useMemo(() => computePanchang(now, user.placeOfBirth), [now, user.placeOfBirth])
  const live = useMemo(() => grahasInNatalHouses(natal, now), [natal, now])
  const choghadiya = useMemo(() => computeChoghadiya(user.placeOfBirth), [user.placeOfBirth])
  const moonMove = useMemo(() => nextMoonSignChange(now), [now])
  const moon = live.bodies.find((b) => b.id === "moon")
  const firstName = (user.name?.trim() || "there").split(" ")[0]
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
  const done = user.lastCheckin === today
  const due = predictions.filter(
    (p) => (p.status === "pending" || p.status === "in_progress") && new Date(p.targetDate) <= now
  )
  const heat = useMemo(() => skyHeat(predictions, natal), [predictions, natal])
  const moonHours = Math.max(1, Math.round(moonMove.hours))

  const markToday = async () => {
    setSaving(true)
    const result = await checkIn()
    setSaving(false)
    if (result.bonus) setBonus(result.bonus)
  }

  return (
    <div className="relative">
      <CosmicField density={36} />
      <div className="relative page-container max-w-2xl pb-24">
        <p className="text-sm text-zinc-400">
          {panchang.weekday} · {user.placeOfBirth.split(",")[0]}
        </p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.94]">
          <KineticWords key={`n-${locale}`} text={t("someonesToday", { name: firstName })} />{" "}
          <KineticWords key={`t-${locale}`} text={t("todayDot")} italic delay={0.1} className="text-zinc-300" />
        </h1>
        <div className="relative mt-8 h-[200px] sm:h-[240px]">
          <NightOrbit bodies={live.bodies} panchang={panchang} />
        </div>
        <p className="mt-6 font-display text-3xl sm:text-4xl text-zinc-100 leading-[1.08]">
          {moon
            ? t("moonInHouse", { sign: panchang.moonSign, n: moon.house })
            : t("moonIn", { sign: panchang.moonSign })}
        </p>
        <p className="mt-4 text-[15px] text-zinc-400 leading-relaxed max-w-lg">
          {t("todaySkyDetail", {
            tithi: panchang.tithi,
            nak: panchang.nakshatra,
            sign: moonMove.toSign,
            n: moonHours,
            rahu: panchang.rahuKaal.label,
          })}
        </p>

        {heat[0] && due.length === 0 && (
          <button type="button" onClick={() => navigate("/app/ledger")} className="mt-12 block text-left">
            <p className="text-[12px] uppercase tracking-[0.16em] text-amber-200/80">{t("skyOnLine")}</p>
            <p className="font-display text-3xl text-zinc-50 mt-2 leading-snug">{heat[0].prediction.title}</p>
            <p className="mt-2 text-sm text-zinc-500 max-w-lg leading-relaxed">{heat[0].why}</p>
          </button>
        )}

        {due.length > 0 ? (
          <button type="button" onClick={() => navigate("/app/ledger")} className="mt-12 block text-left">
            <p className="text-[12px] uppercase tracking-[0.16em] text-emerald-300">
              {due.length === 1 ? t("oneLinePast") : t("linesPast", { n: due.length })}
            </p>
            <p className="font-display text-3xl text-zinc-50 mt-2">{t("markWhatHappened")}</p>
          </button>
        ) : (
          <p className="mt-12 text-sm text-zinc-500 leading-relaxed max-w-lg">{t("nothingDue")}</p>
        )}

        <div className="mt-8">
          <p className="text-sm text-zinc-300">
            {done ? t("alreadyOpened", { n: user.checkinStreak }) : t("markToKeep", { n: user.checkinStreak || 0 })}
          </p>
          {bonus > 0 && <p className="mt-2 text-sm text-emerald-300">{t("streakBonus", { n: bonus })}</p>}
          <Button className="mt-5" disabled={done || saving} onClick={markToday}>
            {done ? t("todayMarked", { n: user.checkinStreak }) : saving ? t("saving") : t("iAmHere")}
          </Button>
          <button
            type="button"
            className="mt-4 block text-sm text-zinc-500 hover:text-zinc-200"
            onClick={() => {
              void enableDueReminder().then(setNotifyOn)
            }}
          >
            {notifyOn ? t("deviceRemind") : t("remindMe")}
          </button>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl text-zinc-50">{t("hoursOfDay")}</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {choghadiya.current ? t("nowIs", { name: choghadiya.current.name }) : t("dayHours")}
          </p>
          <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-lg">
            {choghadiya.slots
              .filter((s) => s.period === "day")
              .map((s) => `${s.name} ${s.label.split("–")[0].trim()}`)
              .join(" · ")}
          </p>
        </div>
      </div>
    </div>
  )
}

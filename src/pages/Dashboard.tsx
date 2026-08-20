import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useNatalChart, useUser } from "@/context/UserContext"
import { useLedger } from "@/context/LedgerContext"
import { PRACTITIONERS } from "@/data/practitioners"
import { computePanchang, grahasInNatalHouses, nextMoonSignChange } from "@/lib/vedic"
import { CosmicField } from "@/components/sky/CosmicField"
import { NightOrbit } from "@/components/sky/NightOrbit"
import { NorthIndianChart } from "@/components/kundli/NorthIndianChart"
import { KineticWords } from "@/components/motion/KineticWords"
import { ProofPaper } from "@/components/ledger/ProofPaper"
import { skyHeat } from "@/lib/skyHeat"
import { Button } from "@/components/ui/Button"
import { RevealImage } from "@/components/motion/RevealImage"
import { SkyIntro } from "@/components/motion/SkyIntro"
import { useI18n } from "@/lib/i18n"

const ease = [0.22, 1, 0.36, 1] as const

export function Dashboard() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { user } = useUser()
  const { t } = useI18n()
  const entering = params.get("enter") === "1"
  const { predictions } = useLedger()
  const natal = useNatalChart()
  const firstName = (user.name?.trim() || "there").split(" ")[0]
  const [now, setNow] = useState(() => new Date())
  const [ayanamsa, setAyanamsa] = useState("")

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    fetch(
      `/api/sky?dob=${encodeURIComponent(user.dob)}&time=${encodeURIComponent(user.timeOfBirth)}&place=${encodeURIComponent(user.placeOfBirth)}`
    )
      .then((r) => r.json())
      .then((data: { natal?: { ayanamsa?: number; dasha?: string } }) => {
        if (typeof data?.natal?.ayanamsa === "number") {
          setAyanamsa(`Lahiri ${data.natal.ayanamsa.toFixed(2)}° · ${data.natal.dasha || natal.dasha.label}`)
        }
      })
      .catch(() => {})
  }, [user.dob, user.timeOfBirth, user.placeOfBirth, natal.dasha.label])

  const panchang = useMemo(() => computePanchang(now, user.placeOfBirth), [now, user.placeOfBirth])
  const liveSky = useMemo(() => grahasInNatalHouses(natal, now), [natal, now])
  const moonMove = useMemo(() => nextMoonSignChange(now), [now])
  const experts = PRACTITIONERS.filter((a) => a.isOnline && !(a.tag || "").includes("PUJA")).slice(0, 6)
  const lead = experts[0]
  const due = predictions.filter(
    (p) => (p.status === "pending" || p.status === "in_progress") && new Date(p.targetDate) <= new Date()
  )
  const heat = useMemo(() => skyHeat(predictions, natal), [predictions, natal])
  const moonHours = Math.max(1, Math.round(moonMove.hours))

  return (
    <div className="relative">
      {entering && (
        <SkyIntro
          mode="enter"
          name={firstName}
          onDone={() => {
            const next = new URLSearchParams(params)
            next.delete("enter")
            setParams(next, { replace: true })
          }}
        />
      )}
      <CosmicField density={48} />
      <div className="relative page-container max-w-6xl pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
              className="text-sm text-zinc-400"
            >
              {firstName} · {panchang.weekday} · {user.placeOfBirth.split(",")[0]}
            </motion.p>
            <h1 className="font-display text-[2.8rem] sm:text-6xl lg:text-[4.4rem] text-zinc-50 mt-2 leading-[0.92] tracking-tight">
              <KineticWords text={t("yourSky")} />{" "}
              <KineticWords text={t("todayDot")} italic delay={0.12} className="text-zinc-300" />
            </h1>
            <p className="mt-6 text-[17px] text-zinc-400 leading-relaxed max-w-md">
              {t("homeSky", { sign: panchang.moonSign, rahu: panchang.rahuKaal.label, n: moonHours })}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => navigate("/app/consult")}>
                {t("jobTalk")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/app/puja")}>
                {t("jobPuja")}
              </Button>
              <Button size="lg" variant="ghost" onClick={() => navigate("/app/companion")}>
                {t("ask")}
              </Button>
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              <button type="button" className="hover:text-zinc-200" onClick={() => navigate("/app/ledger")}>
                {t("jobTrue")}
              </button>
              <span className="mx-2 text-zinc-700">·</span>
              <button type="button" className="hover:text-zinc-200" onClick={() => navigate("/app/reels")}>
                {t("jobWatch")}
              </button>
            </p>
          </div>

          <div className="lg:col-span-5 relative h-[320px] sm:h-[400px]">
            {lead && (
              <button
                type="button"
                onClick={() => navigate(`/app/room/${lead.id}?mode=video`)}
                className="lift-face absolute left-0 top-6 w-[46%] z-10 text-left"
              >
                <RevealImage src={lead.imageUrl} className="w-full aspect-[3/4] rounded-[24px]" />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.16em] text-emerald-200">{t("live")}</span>
              </button>
            )}
            <div className="absolute right-0 top-0 w-[72%] h-full">
              <NightOrbit bodies={liveSky.bodies} panchang={panchang} />
            </div>
          </div>
        </div>

        {due[0] ? (
          <button type="button" onClick={() => navigate("/app/ledger")} className="mt-16 block w-full max-w-xl text-left">
            <ProofPaper
              kicker={t("windowClosed")}
              title={`“${due[0].title}”`}
              body={t("didThisHappen")}
              footer={due[0].astrologer?.name ? t("namedTheDate", { name: due[0].astrologer.name }) : undefined}
            />
          </button>
        ) : heat[0] ? (
          <button type="button" onClick={() => navigate("/app/ledger")} className="mt-16 block text-left max-w-xl">
            <p className="text-[12px] uppercase tracking-[0.16em] text-amber-200/80">{t("skyOnLine")}</p>
            <p className="font-display text-3xl sm:text-4xl text-zinc-50 mt-2 leading-[1.08]">{heat[0].prediction.title}</p>
            <p className="mt-3 text-sm text-zinc-500 max-w-md leading-relaxed">{heat[0].why}</p>
          </button>
        ) : (
          <button type="button" onClick={() => navigate("/app/today")} className="mt-16 block text-left">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("dailyReturn")}</p>
            <p className="font-display text-3xl text-zinc-50 mt-2">
              {user.lastCheckin === new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
                ? t("todayMarked", { n: user.checkinStreak })
                : t("openTodayOnce")}
            </p>
          </button>
        )}

        <section className="mt-20">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[12px] uppercase tracking-[0.16em] text-emerald-400">
                {experts.length} {t("onlineNow")}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-zinc-50 mt-1">{t("whoWillTalk")}</h2>
            </div>
            <button type="button" onClick={() => navigate("/app/consult")} className="text-sm text-zinc-400 hover:text-zinc-100">
              {t("seeAll")}
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
            {experts.map((a, i) => (
              <motion.button
                key={a.id}
                type="button"
                onClick={() => navigate(`/app/room/${a.id}?mode=video`)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.45, ease }}
                className="lift-face shrink-0 w-[168px] sm:w-[200px] text-left"
              >
                <div className="relative">
                  <RevealImage src={a.imageUrl} className="w-full aspect-[3/4] rounded-[22px]" delay={i * 0.04} />
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.16em] text-emerald-200">{t("live")}</span>
                </div>
                <p className="mt-3 text-[15px] text-zinc-50">{a.name}</p>
                <p className="text-sm text-zinc-500">
                  {a.specialty} · ₹{a.ratePerMin}
                </p>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="mt-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <NorthIndianChart natal={natal} size={280} />
            <p className="text-[12px] text-zinc-500 mt-3">
              {user.name} · {natal.lagnaSign} lagna · {natal.moonSign} moon
              {ayanamsa ? ` · ${ayanamsa}` : ""}
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("freeKundli")}</p>
            <h2 className="font-display text-4xl text-zinc-50 mt-2">{t("chartDrawn")}</h2>
            <div className="mt-8 space-y-5">
              {[
                { t: t("freeKundli"), d: t("chartDrawnD"), href: "/app/kundli" },
                { t: t("results"), d: t("jobTrueD"), href: "/app/ledger" },
                { t: t("report"), d: t("reportFeeLine", { n: 199 }), href: "/app/reports" },
              ].map((p) => (
                <button key={p.href} type="button" onClick={() => navigate(p.href)} className="block text-left group">
                  <p className="font-display text-2xl text-zinc-50 group-hover:italic">{p.t}</p>
                  <p className="text-sm text-zinc-500 mt-0.5">{p.d}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-20 grid lg:grid-cols-12 gap-10">
          <button type="button" onClick={() => navigate("/board")} className="lg:col-span-6 text-left group">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("proofBoard")}</p>
            <p className="font-display text-3xl text-zinc-50 mt-2 group-hover:italic">{t("whoCameTrue")}</p>
            <p className="mt-2 text-sm text-zinc-500 max-w-sm">{t("rankedDates")}</p>
          </button>
          <button type="button" onClick={() => navigate("/app/share")} className="lg:col-span-6 text-left group">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("invite")}</p>
            <p className="font-display text-3xl text-zinc-50 mt-2 group-hover:italic">{t("sendCardBoth")}</p>
            <p className="mt-2 text-sm text-zinc-500 max-w-sm">{t("yourCodeIs", { code: user.inviteCode })}</p>
          </button>
        </div>
      </div>
    </div>
  )
}

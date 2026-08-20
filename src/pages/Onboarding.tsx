import { useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useUser, calculateZodiac } from "@/context/UserContext"
import { CosmicField } from "@/components/sky/CosmicField"
import { NightOrbit } from "@/components/sky/NightOrbit"
import { SkyIntro } from "@/components/motion/SkyIntro"
import { LangToggle } from "@/components/site/LangToggle"
import { useI18n } from "@/lib/i18n"
import { computeNatal, computePanchang } from "@/lib/vedic"

const INTENTION_IDS = ["career", "marriage", "health", "money", "family", "peace"] as const

export function Onboarding() {
  const navigate = useNavigate()
  const { user, updateProfile } = useUser()
  const { t } = useI18n()
  const [step, setStep] = useState<"intro" | "birth" | "ready">("intro")
  const [dob, setDob] = useState(() => user.dob || "1998-05-15")
  const [timeOfBirth, setTimeOfBirth] = useState(() => user.timeOfBirth || "08:30")
  const [placeOfBirth, setPlaceOfBirth] = useState(() => user.placeOfBirth || "New Delhi, India")
  const [intentions, setIntentions] = useState<string[]>(user.intentions || [])

  useEffect(() => {
    if (user.dob) setDob(user.dob)
    if (user.timeOfBirth) setTimeOfBirth(user.timeOfBirth)
    if (user.placeOfBirth) setPlaceOfBirth(user.placeOfBirth)
  }, [user.dob, user.timeOfBirth, user.placeOfBirth])

  const natal = calculateZodiac(dob, timeOfBirth, placeOfBirth)
  const chart = useMemo(() => computeNatal(dob, timeOfBirth, placeOfBirth), [dob, timeOfBirth, placeOfBirth])
  const sky = useMemo(() => computePanchang(new Date(), placeOfBirth), [placeOfBirth])
  const first = (user.name || "You").split(" ")[0]
  const field =
    "w-full h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white focus-visible:outline-none focus-visible:border-zinc-400"

  const finish = () => {
    updateProfile({
      dob,
      timeOfBirth,
      placeOfBirth: placeOfBirth || "New Delhi, India",
      intentions,
      onboardingComplete: true,
      starterDismissed: false,
    })
    navigate("/app/dashboard?enter=1")
  }

  const intentionLabel = (id: string) => {
    if (id === "career") return t("career")
    if (id === "marriage") return t("marriage")
    if (id === "health") return t("health")
    if (id === "money") return t("money")
    if (id === "family") return t("family")
    return t("peaceOfMind")
  }

  if (step === "intro") {
    return <SkyIntro mode="story" onDone={() => setStep("birth")} />
  }

  return (
    <div className="relative min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <CosmicField density={48} />
      <div className="relative max-w-lg mx-auto px-5 py-12">
        <div className="flex items-center justify-between">
          <p className="font-display italic text-xl text-zinc-50">{t("brand")}</p>
          <LangToggle compact />
        </div>
        <p className="mt-10 text-[12px] uppercase tracking-[0.16em] text-zinc-500">
          {step === "birth" ? t("onboardingChart") : t("onboardingReady")}
        </p>

        <AnimatePresence mode="wait">
          {step === "birth" ? (
            <motion.div
              key="birth"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32 }}
            >
              <h1 className="mt-2 font-display text-4xl sm:text-5xl text-zinc-50 leading-[0.95]">
                {t("onboardingBirthHead")} <span className="italic text-zinc-300">{t("onboardingBirthItal")}</span>
              </h1>
              <div className="mt-8 space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">{t("dateOfBirth")}</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={field} />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">{t("birthTime")}</label>
                  <input type="time" value={timeOfBirth} onChange={(e) => setTimeOfBirth(e.target.value)} className={field} />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1.5">{t("birthPlace")}</label>
                  <input value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} className={field} />
                </div>
              </div>
              <p className="mt-5 text-sm text-zinc-500">{t("careAbout")}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {INTENTION_IDS.map((item) => {
                  const label = intentionLabel(item)
                  const on = intentions.includes(item)
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setIntentions((prev) => (on ? prev.filter((x) => x !== item) : [...prev, item]))
                      }
                      className={cn(
                        "h-9 px-4 rounded-full text-sm",
                        on ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
                      )}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
              <Button className="mt-8" size="lg" onClick={() => setStep("ready")}>
                {t("drawChart")}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32 }}
            >
              <h1 className="mt-2 font-display text-4xl sm:text-5xl text-zinc-50 leading-[0.95]">
                {t("snapshotHello", { name: first })}
              </h1>
              <p className="mt-6 font-display text-3xl text-zinc-100">
                {natal.sunSign} Sun · {natal.moonSign} Moon · {natal.ascendant} lagna
              </p>
              <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed">{t("snapshotLine")}</p>
              <div className="mt-8 -mx-4 overflow-hidden">
                <NightOrbit bodies={chart.bodies} panchang={sky} />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button size="lg" onClick={finish}>
                  {t("openSky")}
                </Button>
                <button type="button" className="text-sm text-zinc-500" onClick={() => setStep("birth")}>
                  {t("editBirth")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

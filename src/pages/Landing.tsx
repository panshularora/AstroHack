import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Menu, Search, Video, X } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/Button"
import { CosmicField } from "@/components/sky/CosmicField"
import { NightOrbit } from "@/components/sky/NightOrbit"
import { Magnetic } from "@/components/motion/Magnetic"
import { RevealImage } from "@/components/motion/RevealImage"
import { PRACTITIONERS } from "@/data/practitioners"
import { computeGrahas, computePanchang } from "@/lib/vedic"
import { ThemeToggle } from "@/components/site/ThemeToggle"
import { useCommandMenu } from "@/components/command/CommandMenu"
import { FaqList } from "@/components/ui/FaqList"
import { LAST_UPDATED } from "@/lib/site"
import { useUser } from "@/context/UserContext"
import { captureInvite } from "@/lib/utm"
import { SmoothScroll } from "@/components/motion/SmoothScroll"
import { KineticWords } from "@/components/motion/KineticWords"
import { ProofPaper } from "@/components/ledger/ProofPaper"
import { HowStory } from "@/components/landing/HowStory"
import { TapeTicker } from "@/components/landing/TapeTicker"
import { LangToggle } from "@/components/site/LangToggle"
import { FAQ_BY_LOCALE, useI18n } from "@/lib/i18n"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ease = [0.22, 1, 0.36, 1] as const

export function Landing() {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const online = PRACTITIONERS.filter((a) => a.isOnline)
  const sky = useMemo(() => computePanchang(new Date(), "New Delhi, India"), [])
  const bodies = useMemo(() => computeGrahas(new Date()).bodies, [])
  const faces = online.slice(0, 5)
  const { openMenu } = useCommandMenu()
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthed } = useUser()
  const { t, locale } = useI18n()
  const goApp = (path: string) => navigate(isAuthed ? path : `/login?next=${encodeURIComponent(path)}`)
  const proofSec = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: proofSec, offset: ["start end", "end start"] })
  const paperY = useTransform(scrollYProgress, [0, 1], [48, -36])

  useEffect(() => {
    captureInvite()
  }, [])

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.from(".hero-orbit", {
      opacity: 0,
      y: 28,
      duration: 1.05,
      delay: 0.18,
      ease: "power3.out",
    })
  })

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
        <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-5 h-16 flex items-center gap-3">
            <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2.5 shrink-0">
              <span className="font-display text-xl italic text-zinc-50">{t("brand")}</span>
            </button>
            <nav className="hidden lg:flex items-center gap-6 text-[13px] text-zinc-400">
              <a href="#experts" className="link-draw">{t("experts")}</a>
              <a href="#how" className="link-draw">{t("theLoop")}</a>
              <button type="button" className="link-draw" onClick={() => navigate("/horoscope")}>{t("horoscope")}</button>
              <button type="button" className="link-draw" onClick={() => navigate("/match")}>{t("matching")}</button>
              <a href="#pricing" className="link-draw">{t("pricing")}</a>
            </nav>
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <div className="hidden md:flex items-center gap-1">
                <LangToggle compact />
                <button
                  type="button"
                  onClick={openMenu}
                  aria-label="Search the site"
                  className="p-2 rounded-full text-zinc-400 hover:text-zinc-100"
                >
                  <Search className="w-4 h-4" />
                </button>
                <ThemeToggle />
              </div>
              {isAuthed && (
                <Button size="sm" variant="outline" onClick={() => goApp("/app/dashboard")}>
                  {t("openApp")}
                </Button>
              )}
              {!isAuthed && (
                <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={() => navigate("/signup")}>
                  {t("getStarted")}
                </Button>
              )}
              <Link
                to="/login"
                className="inline-flex items-center justify-center h-8 px-4 text-xs font-medium rounded-full bg-zinc-100 text-zinc-950 hover:bg-white shrink-0"
              >
                {t("login")}
              </Link>
              <button
                type="button"
                className="md:hidden p-2 text-zinc-300"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {menuOpen && (
          <div className="fixed inset-0 z-[80] md:hidden">
            <button type="button" className="absolute inset-0 bg-black/60" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
            <div className="absolute top-0 right-0 h-full w-[min(100%,18rem)] bg-zinc-950 p-6 flex flex-col gap-4">
              <button type="button" className="self-end p-2" onClick={() => setMenuOpen(false)} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <LangToggle compact />
                <ThemeToggle />
              </div>
              {[
                [t("experts"), "#experts"],
                [t("theLoop"), "#how"],
                [t("horoscope"), "/horoscope"],
                [t("matching"), "/match"],
                [t("pricing"), "#pricing"],
              ].map(([label, href]) => (
                href.startsWith("#") ? (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-lg text-zinc-200">
                    {label}
                  </a>
                ) : (
                  <button
                    key={href}
                    type="button"
                    className="text-lg text-zinc-200 text-left"
                    onClick={() => {
                      setMenuOpen(false)
                      navigate(href)
                    }}
                  >
                    {label}
                  </button>
                )
              ))}
              <Button onClick={() => { setMenuOpen(false); navigate("/login") }}>{t("login")}</Button>
              <Button variant="outline" onClick={() => { setMenuOpen(false); navigate("/signup") }}>{t("getStarted")}</Button>
            </div>
          </div>
        )}

        <section className="relative min-h-[100dvh] flex items-end lg:items-center overflow-hidden">
          <CosmicField density={72} />
          <div className="relative max-w-6xl mx-auto px-5 pb-16 pt-10 w-full grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-6 relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="text-[13px] text-zinc-300 inline-flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                {online.length} {t("onlineNow")} · {t("moonIn", { sign: sky.moonSign })} · {sky.tithi}
              </motion.p>
              <h1 className="mt-5 font-display text-[3.4rem] sm:text-7xl lg:text-[5.4rem] text-zinc-50 leading-[0.86] max-w-xl">
                <KineticWords key={`n-${locale}`} text={t("namedDate")} />
                <span className="block mt-3">
                  <KineticWords key={`k-${locale}`} text={t("keptCard")} italic delay={0.28} className="text-zinc-200" />
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.72, ease }}
                className="mt-7 text-[17px] text-zinc-400 max-w-md leading-relaxed"
              >
                {t("heroBody")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.86, ease }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Magnetic>
                  <Button size="lg" onClick={() => goApp("/app/consult")}>
                    <Video className="w-4 h-4" /> {t("talkNow")}
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                    {t("login")}
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button size="lg" variant="ghost" onClick={() => navigate("/?story=1")}>
                    {t("playStory")}
                  </Button>
                </Magnetic>
                <button type="button" className="link-draw text-sm text-zinc-400" onClick={() => navigate("/p/proof-dp2?from=ARJUN")}>
                  {t("openCard")}
                </button>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1, ease }}
                className="mt-10 text-sm text-zinc-500"
              >
                {t("fromRate", { n: Math.min(...online.map((a) => a.ratePerMin)) })} · {sky.nakshatra}
                <span className="block mt-1 text-zinc-400">{t("firstUserPerkBody")}</span>
              </motion.p>
            </div>

            <div className="hero-orbit lg:col-span-6 relative h-[420px] sm:h-[560px]">
              {faces[0] && (
                <button
                  type="button"
                  onClick={() => goApp(`/app/room/${faces[0].id}?mode=video`)}
                  className="absolute left-0 bottom-0 z-10 w-[58%] text-left"
                >
                  <RevealImage src={faces[0].imageUrl} className="aspect-[3/4] rounded-[28px]" />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.16em] text-emerald-200">{t("live")}</span>
                </button>
              )}
              <div className="absolute right-[-6%] top-[-4%] w-[78%] h-full">
                <NightOrbit bodies={bodies} panchang={sky} />
              </div>
            </div>
          </div>
        </section>

        <TapeTicker />

        <HowStory />

        <section id="experts" className="py-8">
          <div className="max-w-6xl mx-auto px-5 mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[12px] tracking-[0.18em] uppercase text-zinc-500">{online.length} {t("onlineNow")}</p>
              <h2 className="mt-2 font-display text-5xl text-zinc-50">{t("whoIsOnNow")}</h2>
            </div>
            <Button variant="ghost" onClick={() => goApp("/app/consult")}>
              {t("seeAll")}
            </Button>
          </div>
          <div className="max-w-6xl mx-auto px-5 flex gap-4 overflow-x-auto no-scrollbar pb-6">
            {online.slice(0, 7).map((a, i) => (
              <motion.button
                key={a.id}
                type="button"
                onClick={() => goApp(`/app/room/${a.id}?mode=video`)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.45, ease }}
                className="lift-face shrink-0 w-[200px] sm:w-[230px] text-left group"
              >
                <div className="relative">
                  <RevealImage src={a.imageUrl} alt={a.name} className="w-full aspect-[3/4] rounded-[24px]" delay={i * 0.04} />
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-emerald-200">{t("live")}</span>
                </div>
                <p className="mt-3 text-[15px] text-zinc-50">{a.name}</p>
                <p className="text-sm text-zinc-500">
                  {a.specialty} · ₹{a.ratePerMin}/min
                </p>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-5 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <button type="button" onClick={() => navigate("/horoscope")} className="text-left group">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("dailyRashi")}</p>
            <p className="mt-2 font-display text-3xl text-zinc-50 group-hover:italic">{t("horoscope")}</p>
          </button>
          <button type="button" onClick={() => navigate("/match")} className="text-left group">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("gunaMilan")}</p>
            <p className="mt-2 font-display text-3xl text-zinc-50 group-hover:italic">{t("matching")}</p>
          </button>
          <button type="button" onClick={() => navigate("/kundli")} className="text-left group">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("freeKundli")}</p>
            <p className="mt-2 font-display text-3xl text-zinc-50 group-hover:italic">{t("freeKundli")}</p>
          </button>
          <button type="button" onClick={() => navigate("/panchang")} className="text-left group">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("panchang")}</p>
            <p className="mt-2 font-display text-3xl text-zinc-50 group-hover:italic">{t("panchangHead")}</p>
          </button>
        </section>

        <section id="proof" ref={proofSec} className="relative py-32 overflow-hidden">
          <CosmicField density={36} />
          <div className="relative max-w-6xl mx-auto px-5 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-[12px] tracking-[0.18em] uppercase text-zinc-500">{t("theDifference")}</p>
              <h2 className="mt-3 font-display text-5xl sm:text-6xl text-zinc-50 leading-[1.02] max-w-md">
                {t("holdPrediction")}
              </h2>
              <p className="mt-5 text-[15px] text-zinc-400 max-w-sm leading-relaxed">{t("proofBody")}</p>
              <button
                type="button"
                className="mt-6 text-sm text-zinc-300 hover:text-white"
                onClick={() => navigate("/p/proof-dp2?from=ARJUN")}
              >
                {t("openRealCard")}
              </button>
            </div>
            <motion.div style={reduce ? undefined : { y: paperY }} className="lg:col-span-7">
              <ProofPaper
                kicker="Came true · 16 May 2026"
                title="A bonus from an investment will arrive."
                body="Predicted by Dr. Sundeep Kochar, who was 94% sure. Arjun marked yes when the letter came."
                footer="This page does not need an account. Move the paper. It tilts like stock."
                stamp="yes"
              />
            </motion.div>
          </div>
        </section>

        <section id="why" className="max-w-6xl mx-auto px-5 py-28">
          <p className="text-[12px] tracking-[0.18em] uppercase text-zinc-500">{t("whyThis")}</p>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl text-zinc-50 leading-[1.02] max-w-xl">
            {t("whyHead")}
          </h2>
          <div className="mt-14 grid lg:grid-cols-12 gap-12">
            <button type="button" onClick={() => navigate("/tape")} className="lg:col-span-6 text-left group">
              <p className="font-display text-3xl text-zinc-50 group-hover:italic">{t("missesStay")}</p>
              <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed max-w-sm">{t("inviteBoth")}</p>
            </button>
            <button type="button" onClick={() => navigate("/board")} className="lg:col-span-6 text-left group">
              <p className="font-display text-3xl text-zinc-50 group-hover:italic">{t("rankedDates")}</p>
              <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed max-w-sm">{t("boardBody")}</p>
            </button>
          </div>
        </section>

        <section id="pricing" className="max-w-6xl mx-auto px-5 py-24">
          <h2 className="font-display text-5xl text-zinc-50">{t("talkReady")}</h2>
          <div className="mt-12 grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <p className="text-[12px] uppercase tracking-[0.16em] text-emerald-400">{t("firstUserPerk")}</p>
              <p className="mt-2 font-display text-3xl text-zinc-50 leading-snug">{t("firstUserPerkBody")}</p>
              <p className="font-display text-7xl text-zinc-50 mt-8">₹10</p>
              <p className="mt-1 text-zinc-400">{t("payAsYouGo")}</p>
              <p className="mt-6 text-[15px] text-zinc-400 max-w-md leading-relaxed">{t("payGoBody")}</p>
              <p className="mt-8 text-sm text-zinc-500">
                {t("planFree")} ₹0 · {t("planPlus")} ₹499 · {t("planFamily")} ₹999
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <Button size="lg" onClick={() => navigate("/signup")}>
                {t("createFree")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/app/dashboard")}>
                {t("tryDemo")}
              </Button>
              <button
                type="button"
                className="text-sm text-zinc-500 hover:text-zinc-200 text-left px-1"
                onClick={() => navigate("/app/subscription")}
              >
                {t("seePlusFamily")}
              </button>
            </div>
          </div>
        </section>

        <section id="faq" className="max-w-6xl mx-auto px-5 py-24">
          <h2 className="font-display text-5xl text-zinc-50 mb-10">{t("faq")}</h2>
          <FaqList items={FAQ_BY_LOCALE[locale]} />
        </section>

        <footer className="px-5 py-10 text-xs text-zinc-600 flex flex-col sm:flex-row justify-between gap-2 max-w-6xl mx-auto">
          <p className="text-zinc-400">{t("brand")}</p>
          <p>{t("lastUpdatedLabel", { date: LAST_UPDATED })}</p>
          <p className="flex gap-4">
            <Link to="/terms" className="hover:text-zinc-300">{t("terms")}</Link>
            <Link to="/privacy" className="hover:text-zinc-300">{t("privacy")}</Link>
            <Link to="/tape" className="hover:text-zinc-300">{t("tape")}</Link>
            <Link to="/report" className="hover:text-zinc-300">{t("report")}</Link>
          </p>
        </footer>
      </div>
    </SmoothScroll>
  )
}

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom"
import { MessageCircle, Phone, Video } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { RevealImage } from "@/components/motion/RevealImage"
import { PRACTITIONERS } from "@/data/practitioners"
import { cn } from "@/lib/utils"
import { apiOptional } from "@/lib/api"
import { emptyScore, scoreLabel, type ProofScore } from "@/lib/proofScore"
import { useI18n } from "@/lib/i18n"
import { useUser } from "@/context/UserContext"
import { CosmicField } from "@/components/sky/CosmicField"

const focusAreas = [
  { id: "career", label: "Career", keys: ["career", "vedic", "transit"] },
  { id: "relationships", label: "Marriage", keys: ["match", "relationship", "kundli"] },
  { id: "finance", label: "Money", keys: ["finance", "wealth", "numerology"] },
  { id: "health", label: "Health", keys: ["health", "nadi", "remed"] },
]

const ease = [0.22, 1, 0.36, 1] as const

export function Consult() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const claim = params.get("claim") || ""
  const { t } = useI18n()
  const { user, isAuthed, payFee } = useUser()
  const [payMsg, setPayMsg] = useState("")
  const [paying, setPaying] = useState(false)
  const [focus, setFocus] = useState("career")
  const [lang, setLang] = useState<"all" | "en" | "hi">("all")
  const [scores, setScores] = useState<ProofScore[]>([])

  useEffect(() => {
    apiOptional<ProofScore[]>("/api/proof-scores").then((rows) => {
      if (rows && Array.isArray(rows)) setScores(rows)
    })
  }, [])

  const ranked = useMemo(() => {
    const keys = focusAreas.find((f) => f.id === focus)?.keys || []
    return PRACTITIONERS.filter((a) => a.isOnline)
      .filter((a) => !(a.tag || "").includes("PUJA"))
      .filter((a) => {
        const langs = a.languages || ["en", "hi"]
        return lang === "all" || langs.includes(lang)
      })
      .map((a) => {
        const hay = `${a.specialty} ${a.bio} ${(a.techniques || []).join(" ")}`.toLowerCase()
        const hit = keys.some((k) => hay.includes(k))
        const score = scores.find((s) => s.name.toLowerCase() === a.name.toLowerCase()) || emptyScore(a.name)
        return { a, hit, score }
      })
      .sort(
        (x, y) =>
          Number(y.hit) - Number(x.hit) ||
          y.score.closed - x.score.closed ||
          y.score.hitRate - x.score.hitRate ||
          y.a.ratePerMin - x.a.ratePerMin
      )
  }, [focus, scores, lang])

  const start = async (id: string, mode: "chat" | "audio" | "video") => {
    if (claim) {
      setPaying(true)
      const res = await payFee("second-opinion", { claim })
      setPaying(false)
      if (!res.ok) {
        setPayMsg(res.reason || t("checkoutFailed"))
        return
      }
    }
    const q = new URLSearchParams({ mode })
    if (claim) q.set("claim", claim)
    navigate(`/app/room/${id}?${q.toString()}`)
  }

  const featured = ranked[0]
  const rest = ranked.slice(1)

  return (
    <div className="relative">
      <CosmicField density={28} />
      <div className="relative page-container max-w-5xl pb-28">
      <p className="text-[12px] uppercase tracking-[0.18em] text-emerald-400">{ranked.length} {t("onlineNow")}</p>
      <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("whoIsOn")}</h1>
      <p className="text-[15px] text-zinc-400 mt-4 max-w-lg leading-relaxed">{t("jobTalkD")}</p>
      {claim && (
        <p className="mt-4 text-sm text-amber-200/90 max-w-lg leading-relaxed">
          {t("secondOpinion", { claim })} {t("secondFeeLine")}
        </p>
      )}
      {payMsg && <p className="mt-2 text-sm text-amber-200">{payMsg}</p>}
      {(!isAuthed || user.firstSessionFree) && (
        <p className="mt-3 text-sm text-emerald-300">{t("firstThreeFree")}</p>
      )}

      <div className="flex flex-wrap gap-2 mt-8">
        {focusAreas.map((f) => (
          <button
            key={f.id}
            onClick={() => setFocus(f.id)}
            className={cn(
              "px-4 h-9 rounded-full text-sm transition-[background-color,color] duration-200",
              focus === f.id ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
            )}
          >
            {f.id === "career"
              ? t("career")
              : f.id === "relationships"
                ? t("marriage")
                : f.id === "finance"
                  ? t("money")
                  : t("health")}
          </button>
        ))}
        {(["all", "hi", "en"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setLang(id)}
            className={cn(
              "px-4 h-9 rounded-full text-sm",
              lang === id ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
            )}
          >
            {id === "all" ? t("allLangs") : id === "hi" ? t("hindi") : t("english")}
          </button>
        ))}
      </div>

      {featured && (
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mt-12 grid lg:grid-cols-12 gap-8 items-end"
        >
          <button
            type="button"
            onClick={() => start(featured.a.id, "video")}
            className="lift-face lg:col-span-5 text-left"
          >
            <div className="relative">
              <RevealImage
                src={featured.a.imageUrl}
                className="w-full aspect-[3/4] max-h-[520px] rounded-[24px]"
              />
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.16em] text-emerald-200">
                {t("live")}
              </span>
            </div>
          </button>
          <div className="lg:col-span-7 pb-1">
            <p className="text-[12px] uppercase tracking-[0.16em] text-emerald-400">{t("liveFirst")}</p>
            <h2 className="font-display text-4xl sm:text-5xl text-zinc-50 mt-2 leading-[1.02]">{featured.a.name}</h2>
            <p className="text-sm text-zinc-400 mt-3">
              {featured.a.specialty} · ₹{featured.a.ratePerMin}/min
            </p>
            <p className="mt-4 text-[15px] text-zinc-400 leading-relaxed max-w-md">
              {featured.score.closed > 0
                ? scoreLabel(featured.score)
                : `${featured.a.accuracy} ${t("claimedNoCards")}`}
            </p>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-md line-clamp-3">{featured.a.bio}</p>
            <p className="mt-3 text-sm text-zinc-500">
              {t("speaks")} · {(featured.a.languages || ["en", "hi"]).map((l) => (l === "hi" ? "हिन्दी" : "English")).join(" · ")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button disabled={paying} onClick={() => void start(featured.a.id, "video")}>
                <Video className="w-3.5 h-3.5" /> {t("video")}
              </Button>
              <Button variant="outline" onClick={() => start(featured.a.id, "audio")}>
                <Phone className="w-3.5 h-3.5" /> {t("call")}
              </Button>
              <Button variant="ghost" onClick={() => start(featured.a.id, "chat")}>
                <MessageCircle className="w-3.5 h-3.5" /> {t("chat")}
              </Button>
            </div>
          </div>
        </motion.article>
      )}

      <div className="mt-16 space-y-10">
        {rest.map(({ a, score }, i) => (
          <motion.article
            key={a.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.04, duration: 0.4, ease }}
            className="flex gap-5 sm:gap-7 items-start"
          >
            <button type="button" onClick={() => start(a.id, "video")} className="lift-face shrink-0">
              <RevealImage
                src={a.imageUrl}
                className="w-24 h-32 sm:w-32 sm:h-44 rounded-[22px]"
                delay={i * 0.03}
              />
            </button>
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl sm:text-3xl text-zinc-50 leading-tight">{a.name}</h2>
                <p className="text-sm text-zinc-400 shrink-0">
                  ₹{a.ratePerMin}
                  <span className="text-zinc-600">/min</span>
                </p>
              </div>
              <p className="text-sm text-zinc-500 mt-1">{a.specialty}</p>
              <p className="text-sm text-zinc-400 mt-2">
                {score.closed > 0 ? scoreLabel(score) : `${a.accuracy} ${t("claimedNoCards")}`}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button size="sm" onClick={() => start(a.id, "video")}>
                  <Video className="w-3.5 h-3.5" /> {t("video")}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => start(a.id, "audio")}>
                  {t("call")}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => start(a.id, "chat")}>
                  {t("chat")}
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <button type="button" onClick={() => navigate("/board")} className="mt-16 block text-left">
        <p className="text-sm text-zinc-500 hover:text-zinc-200">{t("openProofBoard")}</p>
      </button>
      </div>
    </div>
  )
}

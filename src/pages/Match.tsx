import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { CosmicField } from "@/components/sky/CosmicField"
import { matchKundlis } from "@/lib/vedic/match"
import { LangToggle } from "@/components/site/LangToggle"
import { useI18n } from "@/lib/i18n"
import { useUser } from "@/context/UserContext"
import { apiOptional } from "@/lib/api"

const field =
  "w-full h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white focus-visible:outline-none focus-visible:border-zinc-400"

export function Match() {
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const { user, isAuthed } = useUser()
  const [a, setA] = useState({
    dob: isAuthed ? user.dob : "1994-08-14",
    time: isAuthed ? user.timeOfBirth : "08:30",
    place: isAuthed ? user.placeOfBirth : "New Delhi, India",
  })
  const [b, setB] = useState({ dob: "1996-03-12", time: "10:15", place: "Mumbai, India" })
  const [run, setRun] = useState(false)
  const local = useMemo(() => (run ? matchKundlis(a, b) : null), [run, a, b])
  const [remote, setRemote] = useState<ReturnType<typeof matchKundlis> | null>(null)
  const result = remote || local

  return (
    <div className="relative min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <CosmicField density={28} />
      <div className="relative max-w-3xl mx-auto px-5 py-10 pb-24">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display italic text-xl">
            {t("brand")}
          </Link>
          <LangToggle compact />
        </div>
        <p className="mt-10 text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("gunaMilan")}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl text-zinc-50 leading-[1.02]">{t("matchHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg">{t("matchBody")}</p>

        <div className="mt-10 grid sm:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-zinc-500 mb-3">{t("you")}</p>
            <input className={field + " mb-3"} type="date" value={a.dob} onChange={(e) => setA({ ...a, dob: e.target.value })} />
            <input className={field + " mb-3"} type="time" value={a.time} onChange={(e) => setA({ ...a, time: e.target.value })} />
            <input className={field} value={a.place} onChange={(e) => setA({ ...a, place: e.target.value })} />
          </div>
          <div>
            <p className="text-sm text-zinc-500 mb-3">{t("partner")}</p>
            <input className={field + " mb-3"} type="date" value={b.dob} onChange={(e) => setB({ ...b, dob: e.target.value })} />
            <input className={field + " mb-3"} type="time" value={b.time} onChange={(e) => setB({ ...b, time: e.target.value })} />
            <input className={field} value={b.place} onChange={(e) => setB({ ...b, place: e.target.value })} />
          </div>
        </div>

        <Button
          className="mt-8"
          onClick={() => {
            setRun(true)
            apiOptional<ReturnType<typeof matchKundlis>>("/api/match", {
              method: "POST",
              body: JSON.stringify({ a, b }),
            }).then((row) => {
              if (row?.rows) setRemote(row)
            })
          }}
        >
          {t("computeMatch")}
        </Button>

        {result && (
          <div className="mt-12">
            <p className="font-display text-5xl text-zinc-50">
              {result.total}
              <span className="text-zinc-500 text-3xl">/{result.max}</span>
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {result.leftMoon} · {result.leftNak} → {result.rightMoon} · {result.rightNak}
            </p>
            <ul className="mt-8 space-y-4">
              {result.rows.map((row) => (
                <li key={row.name}>
                  <p className="text-sm text-zinc-500">
                    {locale === "hi" ? row.nameHi : row.name} · {row.score}/{row.max}
                  </p>
                  <p className="text-zinc-300">{locale === "hi" ? row.noteHi : row.note}</p>
                </li>
              ))}
            </ul>
            {result.verdict === "nadi" && (
              <p className="mt-6 text-sm text-amber-200">
                {t("nadiDosha")}
              </p>
            )}
            <Button className="mt-8" variant="outline" onClick={() => navigate("/app/consult")}>
              {t("talkToExpert")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

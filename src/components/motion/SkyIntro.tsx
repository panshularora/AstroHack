import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { CosmicField } from "@/components/sky/CosmicField"
import { Button } from "@/components/ui/Button"
import { useI18n } from "@/lib/i18n"

const ease = [0.22, 1, 0.36, 1] as const

const GRAHAS = [
  { id: "mercury", color: "#C5D0D8", r: 72, size: 7, dur: 16, start: 18 },
  { id: "venus", color: "#E6D5C4", r: 102, size: 9, dur: 24, start: 70 },
  { id: "mars", color: "#C45C4A", r: 132, size: 8, dur: 32, start: 128 },
  { id: "jupiter", color: "#D4C4A0", r: 162, size: 13, dur: 44, start: 200 },
  { id: "saturn", color: "#8B93A1", r: 192, size: 11, dur: 56, start: 255 },
  { id: "moon", color: "#F4F7FB", r: 222, size: 12, dur: 20, start: 310 },
] as const

const BEATS: { key: "introTalk" | "introDate" | "introCard" | "introFree"; x: string; y: string; delay: number }[] = [
  { key: "introTalk", x: "6%", y: "18%", delay: 1.15 },
  { key: "introDate", x: "auto", y: "20%", delay: 1.85 },
  { key: "introCard", x: "6%", y: "72%", delay: 2.55 },
  { key: "introFree", x: "auto", y: "74%", delay: 3.2 },
]

export function SkyIntro({
  mode = "story",
  name,
  onDone,
}: {
  mode?: "story" | "enter"
  name?: string
  onDone: () => void
}) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const enter = mode === "enter"
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (!enter) return
    const ms = reduce ? 700 : 2200
    const id = window.setTimeout(() => doneRef.current(), ms)
    return () => window.clearTimeout(id)
  }, [enter, reduce])

  return (
    <div className="fixed inset-0 z-[70] bg-zinc-950 text-zinc-100 overflow-hidden">
      <CosmicField density={enter ? 36 : 64} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[min(88vw,420px)] w-[min(88vw,420px)] sm:h-[520px] sm:w-[520px]">
          {GRAHAS.map((g, i) => (
            <motion.div
              key={g.id}
              className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.09]"
              style={{ width: g.r * 2, height: g.r * 2, marginLeft: -g.r, marginTop: -g.r }}
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : 0.28 + i * 0.08, ease }}
            >
              <div
                className={reduce ? "" : "absolute inset-0"}
                style={
                  reduce
                    ? undefined
                    : { animation: `orbitSpin ${g.dur}s linear infinite`, animationDelay: `-${(g.start / 360) * g.dur}s` }
                }
              >
                <span
                  className="absolute left-1/2 top-0 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: g.size,
                    height: g.size,
                    background: g.color,
                    boxShadow: `0 0 14px ${g.color}99`,
                  }}
                />
              </div>
            </motion.div>
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
            animate={enter && !reduce ? { opacity: [0, 1, 1, 0], scale: [0.2, 1, 1.35, 2.1] } : { opacity: 1, scale: 1 }}
            transition={enter && !reduce ? { duration: 2.05, ease } : { duration: 0.9, ease }}
            style={{
              width: 58,
              height: 58,
              background: "radial-gradient(circle at 32% 28%, #FFF6D8 0%, #E8B86D 42%, #C4843A 100%)",
              boxShadow: "0 0 72px rgba(232, 184, 109, 0.42)",
            }}
            aria-label={t("introSun")}
          />
        </div>
      </div>

      {!enter &&
        BEATS.map((beat) => (
          <motion.p
            key={beat.key}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: reduce ? 0 : beat.delay, ease }}
            className="absolute max-w-[11rem] sm:max-w-[14rem] font-display text-xl sm:text-2xl text-zinc-100 leading-snug"
            style={{
              left: beat.x === "auto" ? undefined : beat.x,
              right: beat.x === "auto" ? "6%" : undefined,
              top: beat.y,
            }}
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-zinc-100 align-middle" />
            {t(beat.key)}
          </motion.p>
        ))}

      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <p className="font-display italic text-xl">{t("brand")}</p>
        {!enter && (
          <button type="button" className="text-sm text-zinc-500 hover:text-zinc-200" onClick={onDone}>
            {t("introSkip")}
          </button>
        )}
      </div>

      <div className="absolute bottom-10 inset-x-0 z-20 px-5 text-center">
        {enter ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-4xl text-zinc-50"
          >
            {t("enterSky", { name: name || "" })}
          </motion.p>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.4 }}
              className="text-[12px] uppercase tracking-[0.16em] text-zinc-500"
            >
              {t("introKicker")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 3.7, duration: 0.4, ease }}
              className="mt-5"
            >
              <Button size="lg" onClick={onDone}>
                {t("introBegin")}
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

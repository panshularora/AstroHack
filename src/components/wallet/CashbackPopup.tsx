import { useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { useI18n } from "@/lib/i18n"
import { WELCOME_CREDIT } from "@/lib/entitlements"

const ease = [0.22, 1, 0.36, 1] as const

export function CashbackPopup({
  amount = WELCOME_CREDIT,
  onDone,
}: {
  amount?: number
  onDone: (goWallet?: boolean) => void
}) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const coins = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: 8 + ((i * 17) % 84),
        delay: (i % 8) * 0.09,
        dur: 1.6 + (i % 5) * 0.18,
        size: 8 + (i % 4) * 3,
      })),
    []
  )

  return (
    <div className="fixed inset-0 z-[85] flex items-end sm:items-center justify-center px-5 pb-10 sm:pb-0">
      <button type="button" className="absolute inset-0 bg-black/70" aria-label={t("gotIt")} onClick={() => onDone()} />
      {!reduce &&
        coins.map((c) => (
          <motion.span
            key={c.id}
            className="pointer-events-none absolute top-[-8%] rounded-full"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.size,
              background: "radial-gradient(circle at 30% 30%, #FFF6D8, #E8B86D 55%, #C4843A)",
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
            transition={{ duration: c.dur, delay: c.delay, ease: "linear", repeat: Infinity }}
          />
        ))}

      <motion.div
        role="dialog"
        aria-labelledby="cashback-title"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="relative z-10 w-full max-w-sm text-center"
      >
        <p className="text-[12px] uppercase tracking-[0.18em] text-amber-200/90">{t("cashbackKicker")}</p>
        <h2 id="cashback-title" className="mt-3 font-display text-6xl sm:text-7xl text-zinc-50 leading-none">
          ₹{amount}
        </h2>
        <p className="mt-4 font-display text-2xl text-zinc-100">{t("cashbackTitle")}</p>
        <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed">{t("cashbackBody", { n: amount })}</p>
        <Button className="mt-8 w-full" size="lg" onClick={() => onDone(true)}>
          {t("seeWallet")}
        </Button>
        <button type="button" className="mt-4 text-sm text-zinc-500 hover:text-zinc-200" onClick={() => onDone()}>
          {t("gotIt")}
        </button>
      </motion.div>
    </div>
  )
}

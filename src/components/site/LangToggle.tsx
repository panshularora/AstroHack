import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function LangToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n()
  return (
    <div
      className="relative z-[60] inline-flex items-center rounded-full bg-white/10 p-0.5 pointer-events-auto"
      role="group"
      aria-label={t("langHint")}
    >
      <button
        type="button"
        aria-pressed={locale === "en"}
        onPointerDown={(e) => {
          e.stopPropagation()
          setLocale("en")
        }}
        className={cn(
          "h-8 px-3 rounded-full text-[12px] font-medium",
          locale === "en" ? "bg-zinc-100 text-zinc-950" : "text-zinc-300 hover:text-zinc-50"
        )}
      >
        {compact ? "EN" : t("english")}
      </button>
      <button
        type="button"
        aria-pressed={locale === "hi"}
        onPointerDown={(e) => {
          e.stopPropagation()
          setLocale("hi")
        }}
        className={cn(
          "h-8 px-3 rounded-full text-[12px] font-medium",
          locale === "hi" ? "bg-zinc-100 text-zinc-950" : "text-zinc-300 hover:text-zinc-50"
        )}
      >
        {t("hindi")}
      </button>
    </div>
  )
}

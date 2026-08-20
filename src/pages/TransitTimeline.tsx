import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useNatalChart, useUser } from "@/context/UserContext"
import { PLAN_LIMITS } from "@/lib/entitlements"
import { houseAreaLabel, upcomingTransits } from "@/lib/vedic"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const categories = ["All", "Career", "Relationships", "Finance", "Health"] as const

export function TransitTimeline() {
  const navigate = useNavigate()
  const { user } = useUser()
  const natal = useNatalChart()
  const { t, locale } = useI18n()
  const [activeFilter, setActiveFilter] = useState<(typeof categories)[number]>("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const days = PLAN_LIMITS[user.plan].transitDays
  const transitEvents = useMemo(() => upcomingTransits(natal, days), [natal, days])

  const filteredEvents = transitEvents
    .filter((e) => activeFilter === "All" || e.category === activeFilter)
    .sort((a, b) => a.daysOut - b.daysOut)

  const catLabel = (c: string) =>
    c === "Career" ? t("career") : c === "Relationships" ? t("marriage") : c === "Finance" ? t("money") : c === "Health" ? t("health") : t("allLines")

  return (
    <div className="relative">
      <CosmicField density={26} />
      <div className="relative page-container max-w-2xl pb-28">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("transitsKicker")}</p>
        <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{t("transitsHead")}</h1>
        <p className="mt-4 text-[15px] text-zinc-400 max-w-lg leading-relaxed">{t("transitsBody", { n: days })}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveFilter(c)}
              className={cn(
                "h-9 px-4 rounded-full text-sm",
                activeFilter === c ? "bg-zinc-100 text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
              )}
            >
              {catLabel(c)}
            </button>
          ))}
        </div>

        <div className="mt-14 space-y-10">
          {filteredEvents.map((event) => {
            const open = expandedId === event.id
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setExpandedId(open ? null : event.id)}
                className="block w-full text-left"
              >
                <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                  {t("inDays", { n: event.daysOut })} · {houseAreaLabel(event.house, locale === "hi")}
                </p>
                <h2 className="mt-1 font-display text-2xl text-zinc-50">
                  {locale === "hi" ? event.planetHi : event.planet} {locale === "hi" ? event.transitTypeHi : event.transitType}
                </h2>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-lg">
                  {locale === "hi" ? event.summaryHi : event.summary}
                </p>
                {open && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {locale === "hi" ? event.opportunityHi : event.opportunity}
                    </p>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {locale === "hi" ? event.cautionHi : event.caution}
                    </p>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {filteredEvents.length === 0 && <p className="mt-14 text-sm text-zinc-500">{t("nothingDated")}</p>}

        <Button className="mt-14" onClick={() => navigate("/app/consult")}>
          {t("talkToExpert")}
        </Button>
      </div>
    </div>
  )
}

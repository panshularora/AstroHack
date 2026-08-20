import { useNatalChart, useUser } from "@/context/UserContext"
import { computePanchang } from "@/lib/vedic"
import { NorthIndianChart } from "@/components/kundli/NorthIndianChart"

export function ChartRail() {
  const { user } = useUser()
  const natal = useNatalChart()
  const sky = computePanchang(new Date(), user.placeOfBirth)

  return (
    <aside className="lg:sticky lg:top-20 space-y-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Open on the desk</p>
      <h2 className="font-display text-2xl text-zinc-50 leading-snug">{user.name.split(" ")[0]}’s chart</h2>
      <NorthIndianChart natal={natal} size={200} />
      <p className="text-sm text-zinc-400 leading-relaxed">
        {natal.lagnaSign} lagna · {natal.moonSign} moon · {natal.dasha.label}.
      </p>
      <p className="text-sm text-zinc-500 leading-relaxed">
        Today: Moon in {sky.moonSign}, {sky.tithi}. Rahu Kaal {sky.rahuKaal.label}.
      </p>
    </aside>
  )
}

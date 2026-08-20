import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"

export type LiveExpert = {
  id: string
  name: string
  photo: string
  line: string
  rate: number
}

export function LiveExpertsPanel({
  experts,
  title = "Online now",
  seeAllHref = "/app/verified",
}: {
  experts: LiveExpert[]
  title?: string
  seeAllHref?: string
  framed?: boolean
}) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-end justify-between gap-3 mb-5">
        <p className="text-sm text-zinc-400">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 align-middle" />
          {title}
        </p>
        <button type="button" onClick={() => navigate(seeAllHref)} className="text-xs text-zinc-500 hover:text-zinc-100">
          See all
        </button>
      </div>
      <div className="flex gap-5 overflow-x-auto no-scrollbar">
        {experts.map((a) => (
          <div key={a.id} className="shrink-0 w-[140px]">
            <button type="button" onClick={() => navigate(`/app/astrologer/${a.id}`)} className="lift-face text-left w-full">
              <img src={a.photo} alt="" className="astro-face w-full aspect-[3/4] rounded-[20px]" />
              <p className="mt-2 text-sm text-zinc-50 truncate">{a.name}</p>
              <p className="text-xs text-zinc-500 truncate">₹{a.rate}/min</p>
            </button>
            <Button size="xs" className="mt-2 w-full" onClick={() => navigate(`/app/room/${a.id}?mode=chat`)}>
              Chat
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function toLiveExperts(
  rows: Array<{
    id: string
    name: string
    imageUrl?: string
    avatar?: string
    specialty?: string
    specialties?: string[]
    ratePerMin?: number
    pricePerMinute?: number
  }>
): LiveExpert[] {
  return rows.map((a) => ({
    id: a.id,
    name: a.name,
    photo: a.imageUrl || a.avatar || "",
    line: a.specialty || a.specialties?.[0] || "",
    rate: a.ratePerMin ?? a.pricePerMinute ?? 10,
  }))
}

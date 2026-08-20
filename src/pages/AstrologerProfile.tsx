import { useNavigate, useParams } from "react-router-dom"
import { PRACTITIONERS } from "@/data/practitioners"
import { Button } from "@/components/ui/Button"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

export function AstrologerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const expert = PRACTITIONERS.find((p) => p.id === id) || PRACTITIONERS[0]
  const { t } = useI18n()

  const start = (mode: "chat" | "audio" | "video") => {
    navigate(`/app/room/${expert.id}?mode=${mode}`)
  }

  return (
    <div className="relative">
      <CosmicField density={28} />
      <div className="relative page-container max-w-4xl pb-28">
        <button type="button" onClick={() => navigate("/app/consult")} className="text-sm text-zinc-500 hover:text-zinc-200">
          {t("backToLive")}
        </button>
        <div className="mt-8 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-5">
            <img src={expert.imageUrl} alt="" className="astro-face w-full aspect-[3/4] rounded-[24px] object-cover" />
          </div>
          <div className="lg:col-span-7">
            <p className="text-[12px] uppercase tracking-[0.16em] text-emerald-400">
              {expert.isOnline ? t("liveNow") : t("offline")}
            </p>
            <h1 className="font-display text-4xl sm:text-6xl text-zinc-50 mt-2 leading-[0.95]">{expert.name}</h1>
            <p className="mt-3 text-[15px] text-zinc-400">
              {expert.specialty} · ₹{expert.ratePerMin}/min
            </p>
            <p className="mt-5 text-[15px] text-zinc-400 leading-relaxed max-w-md">{expert.bio}</p>
            <p className="mt-4 text-sm text-zinc-500">{(expert.techniques || []).join(" · ")}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Button size="lg" onClick={() => start("video")}>
                {t("video")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => start("audio")}>
                {t("call")}
              </Button>
              <Button size="lg" variant="ghost" onClick={() => start("chat")}>
                {t("chat")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

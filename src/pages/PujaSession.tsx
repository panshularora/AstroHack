import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { PRACTITIONERS } from "@/data/practitioners"
import { pujaById } from "@/data/pujas"
import { useUser } from "@/context/UserContext"
import { useLedger } from "@/context/LedgerContext"
import { useI18n } from "@/lib/i18n"
import { CosmicField } from "@/components/sky/CosmicField"
import { useRtcRoom } from "@/hooks/useRtcRoom"
import { getToken } from "@/lib/api"
import { startRoomTone } from "@/lib/aartiTone"
import { cn } from "@/lib/utils"

function bind(el: HTMLVideoElement | null, stream: MediaStream | null, muted: boolean) {
  if (!el) return
  if (!stream) {
    if (el.srcObject) el.srcObject = null
    return
  }
  if (el.srcObject !== stream) el.srcObject = stream
  el.muted = muted
  el.playsInline = true
  const play = () => void el.play().catch(() => {})
  if (el.readyState >= 2) play()
  else el.onloadedmetadata = play
}

export function PujaSession() {
  const { id } = useParams()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const { t, locale } = useI18n()
  const { user, settleSession } = useUser()
  const { addPrediction } = useLedger()
  const pandit = PRACTITIONERS.find((p) => p.id === id) || PRACTITIONERS.find((p) => (p.tag || "").includes("PUJA"))
  const rite = pujaById(params.get("rite") || "")
  const joinCode = params.get("join") || ""
  const [phase, setPhase] = useState<"waiting" | "in_call" | "done">("waiting")
  const [timer, setTimer] = useState(0)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [camErr, setCamErr] = useState("")
  const localRef = useRef<HTMLVideoElement>(null)
  const remoteRef = useRef<HTMLVideoElement>(null)
  const stopTone = useRef<(() => void) | null>(null)
  const rtcOn = phase !== "done" && !!localStream && !!joinCode
  const { remoteStream, link } = useRtcRoom(joinCode, rtcOn, localStream)
  const hi = locale === "hi"

  useEffect(() => {
    document.documentElement.classList.add("astro-room-lock")
    stopTone.current = startRoomTone()
    return () => {
      document.documentElement.classList.remove("astro-room-lock")
      stopTone.current?.()
    }
  }, [])

  useEffect(() => {
    if (joinCode) return
    let dead = false
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    const session = getToken()
    if (session) headers.Authorization = `Bearer ${session}`
    fetch("/api/rtc/room", { method: "POST", headers })
      .then((r) => r.json())
      .then((data: { token?: string }) => {
        if (dead || !data.token) return
        const next = new URLSearchParams(params)
        next.set("join", data.token)
        setParams(next, { replace: true })
      })
      .catch(() => {})
    return () => {
      dead = true
    }
  }, [joinCode, params, setParams])

  useEffect(() => {
    let dead = false
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: { echoCancellation: true, noiseSuppression: true },
      })
      .then((s) => {
        if (dead) {
          s.getTracks().forEach((t) => t.stop())
          return
        }
        setLocalStream(s)
      })
      .catch((e: Error) => setCamErr(e.message || "Camera blocked."))
    return () => {
      dead = true
    }
  }, [])

  useEffect(() => {
    bind(localRef.current, localStream, true)
  }, [localStream])
  useEffect(() => {
    bind(remoteRef.current, remoteStream, false)
  }, [remoteStream])

  useEffect(() => {
    if (phase !== "in_call") return
    const id = window.setInterval(() => setTimer((n) => n + 1), 1000)
    return () => window.clearInterval(id)
  }, [phase])

  const endSitting = async () => {
    localStream?.getTracks().forEach((t) => t.stop())
    setLocalStream(null)
    stopTone.current?.()
    const minutes = Math.max(1, Math.ceil(timer / 60))
    if (timer > 5 && pandit) {
      await settleSession({
        minutes,
        ratePerMin: pandit.ratePerMin,
        practitionerId: pandit.id,
        practitionerName: pandit.name,
        mode: "video",
      })
    }
    if (rite && pandit) {
      addPrediction({
        title: rite.topic,
        category: "health",
        targetDate: new Date().toISOString(),
        confidence: 92,
        astrologerName: pandit.name,
      })
    }
    setPhase("done")
  }

  const clock = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`

  if (!pandit) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-zinc-950">
        <Button onClick={() => navigate("/app/puja")}>{t("puja")}</Button>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 bg-zinc-950 text-zinc-100">
      <img src={pandit.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover astro-face opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,200,114,0.2),transparent_70%)] blur-3xl" />
      <CosmicField density={36} />
      <video
        ref={remoteRef}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          phase === "in_call" && remoteStream ? "opacity-100" : "opacity-0"
        )}
        playsInline
        autoPlay
      />
      <video
        ref={localRef}
        muted
        playsInline
        autoPlay
        className={cn(
          "absolute object-cover -scale-x-100 rounded-[22px] z-20",
          phase === "waiting" ? "inset-0 h-full w-full rounded-none" : "right-4 bottom-28 w-28 h-40 sm:w-36 sm:h-52"
        )}
      />

      <div className="absolute top-5 left-5 right-5 z-30">
        <p className="text-[12px] uppercase tracking-[0.16em] text-amber-200/80">{t("puja")}</p>
        <h1 className="font-display text-3xl sm:text-4xl text-zinc-50 mt-1">
          {rite ? (hi ? rite.nameHi : rite.name) : t("puja")}
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          {pandit.name}
          {phase === "in_call" ? ` · ${clock}` : ""}
          {link === "live" ? ` · ${t("live")}` : ""}
        </p>
        {camErr && <p className="mt-2 text-sm text-amber-200">{camErr}</p>}
      </div>

      {phase === "waiting" && (
        <div className="absolute inset-x-0 bottom-0 z-30 px-5 pb-10 pt-24 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent">
          <p className="text-[15px] text-zinc-300 max-w-md leading-relaxed">{t("pujaSitBody")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => setPhase("in_call")}>
              {t("beginSitting")}
            </Button>
            <Button size="lg" variant="ghost" onClick={() => navigate("/app/puja")}>
              {t("puja")}
            </Button>
          </div>
        </div>
      )}

      {phase === "in_call" && (
        <div className="absolute inset-x-0 bottom-8 z-30 flex justify-center">
          <Button variant="danger" onClick={() => void endSitting()}>
            {t("endSitting")}
          </Button>
        </div>
      )}

      {phase === "done" && (
        <div className="absolute inset-0 z-40 grid place-items-center bg-zinc-950 px-5">
          <div className="max-w-md text-center">
            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("puja")}</p>
            <h2 className="mt-2 font-display text-4xl text-zinc-50">{t("pujaDated")}</h2>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{t("pujaDatedBody", { name: user.name.split(" ")[0] })}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={() => navigate("/app/ledger")}>{t("results")}</Button>
              <Button variant="ghost" onClick={() => navigate("/app/puja")}>
                {t("puja")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

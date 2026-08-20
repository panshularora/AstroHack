import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Video, Mic, MicOff, VideoOff, MessageCircle, Link2, X, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { PRACTITIONERS } from "@/data/practitioners"
import { useLedger, type ExtractedReceipt } from "@/context/LedgerContext"
import { useUser } from "@/context/UserContext"
import { useI18n, type Msg } from "@/lib/i18n"
import { FIRST_FREE_MINUTES, WALLET_PACKS } from "@/lib/entitlements"
import { pujaById } from "@/data/pujas"
import { cn } from "@/lib/utils"
import { askAstroAssistant, localConsultReply, snapshotForModel } from "@/lib/astroChat"
import { ChartRail } from "@/components/session/ChartRail"
import { useRtcRoom } from "@/hooks/useRtcRoom"
import { getToken } from "@/lib/api"
import { startRoomTone } from "@/lib/aartiTone"
import { CosmicField } from "@/components/sky/CosmicField"

type Rec = {
  lang: string
  interimResults: boolean
  onstart: () => void
  onend: () => void
  onerror: () => void
  onresult: (e: { results?: { [i: number]: { [j: number]: { transcript?: string } } } }) => void
  start: () => void
}

function parseCallMode(raw: string | null): "chat" | "audio" | "video" {
  if (raw === "chat" || raw === "audio" || raw === "video") return raw
  return "chat"
}

function guessCategory(text: string): ExtractedReceipt["category"] {
  const t = text.toLowerCase()
  if (/job|career|promot|office|work|boss/.test(t)) return "career"
  if (/money|bonus|invest|salary|wealth|finance/.test(t)) return "finance"
  if (/love|marry|marriage|partner|relation|family/.test(t)) return "relationship"
  if (/health|illness|body|sleep/.test(t)) return "health"
  if (/study|exam|college|school/.test(t)) return "education"
  return "career"
}

function speak(text: string, lang = "en-IN") {
  if (typeof window === "undefined" || !window.speechSynthesis) return
  const u = new SpeechSynthesisUtterance(text.replace(/\n+/g, " ").slice(0, 320))
  u.lang = lang
  u.rate = 0.94
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}

function bindLocal(el: HTMLVideoElement | null, stream: MediaStream | null) {
  if (!el) return
  if (!stream) {
    if (el.srcObject) el.srcObject = null
    return
  }
  if (el.srcObject !== stream) el.srcObject = stream
  el.muted = true
  el.defaultMuted = true
  el.playsInline = true
  el.setAttribute("playsinline", "true")
  el.setAttribute("webkit-playsinline", "true")
  const play = () => void el.play().catch(() => {})
  if (el.readyState >= 2) play()
  else el.onloadedmetadata = play
}

function bindRemote(el: HTMLVideoElement | null, stream: MediaStream | null) {
  if (!el) return
  if (!stream) {
    if (el.srcObject) el.srcObject = null
    return
  }
  if (el.srcObject !== stream) el.srcObject = stream
  el.muted = false
  el.playsInline = true
  el.setAttribute("playsinline", "true")
  const play = () => void el.play().catch(() => {})
  if (el.readyState >= 2) play()
  else el.onloadedmetadata = play
}

function carrierLabel(
  link: ReturnType<typeof useRtcRoom>["link"],
  others: number,
  t: (k: Msg) => string
) {
  if (link === "live") return t("carrierLive")
  if (link === "connecting") return t("connectingCarrier")
  if (link === "failed") return t("carrierRetry")
  if (link === "full") return t("roomFull")
  if (others) return t("peerInRoom")
  return t("soloInvite")
}

export function LiveConsultationRoom() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addPredictions, addPrediction, predictions } = useLedger()
  const { user, settleSession, buyWalletPack } = useUser()
  const { t, locale } = useI18n()
  const [ledgerError, setLedgerError] = useState("")
  const [bill, setBill] = useState<{ charged: number; freeMinutes: number } | null>(null)
  const [roomTone, setRoomTone] = useState(false)
  const [billPaused, setBillPaused] = useState(false)
  const [upiBusy, setUpiBusy] = useState(false)
  const stopToneRef = useRef<(() => void) | null>(null)

  const expert = PRACTITIONERS.find((a) => a.id === id) || PRACTITIONERS[0]
  const initialMode = parseCallMode(searchParams.get("mode"))
  const claim = searchParams.get("claim") || ""
  const pujaId = searchParams.get("puja") || ""
  const joinCode = searchParams.get("join") || ""

  const [phase, setPhase] = useState<"waiting" | "in_call" | "ended" | "extracted" | "confirmed">("waiting")
  const [callType, setCallType] = useState<"chat" | "audio" | "video">(initialMode)
  const [timer, setTimer] = useState(0)
  const [micActive, setMicActive] = useState(true)
  const [videoActive, setVideoActive] = useState(true)
  const [cameraError, setCameraError] = useState("")
  const [camEpoch, setCamEpoch] = useState(0)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [selectedReceipts, setSelectedReceipts] = useState<Set<number>>(new Set([0]))
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: expert.name,
      text: claim
        ? `${user.name.split(" ")[0]}, I have the chart open. You already carry this dated line: “${claim}”. Tell me if you want me to hold it, move the date, or disagree.`
        : `${user.name.split(" ")[0]}, I have your chart open. ${user.moonSign} Moon, ${user.ascendant} lagna, ${user.activeDasha}. Ask the thing you came for.`,
      time: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
    },
  ])
  const [chatInput, setChatInput] = useState(claim ? `A second opinion on this line: ${claim}` : "")

  useEffect(() => {
    const first = user.name.split(" ")[0]
    const body = t("askWelcome", {
      name: first,
      moon: user.moonSign,
      lagna: user.ascendant,
      dasha: user.activeDasha,
    })
    setChatMessages((prev) => {
      if (prev.length !== 1 || prev[0].sender === "You") return prev
      return [{ ...prev[0], text: claim ? `${body} ${t("secondOn", { claim })}` : body }]
    })
  }, [locale, claim, t, user.name, user.moonSign, user.ascendant, user.activeDasha])
  const [chatBusy, setChatBusy] = useState(false)
  const [listening, setListening] = useState(false)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const sendingRef = useRef(false)
  const [pinFor, setPinFor] = useState<string | null>(null)
  const [pinDate, setPinDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 21)
    return d.toISOString().slice(0, 10)
  })
  const [pinNote, setPinNote] = useState("")
  const [chatOpen, setChatOpen] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 1024
  )
  const stageLocalRef = useRef<HTMLVideoElement>(null)
  const pipLocalRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  const wantMedia = callType !== "chat" && (phase === "waiting" || phase === "in_call")
  const rtcOn = wantMedia && !!localStream && !!joinCode
  const { remoteStream, others, link } = useRtcRoom(joinCode, rtcOn, localStream)

  useEffect(() => {
    document.documentElement.classList.add("astro-room-lock")
    return () => document.documentElement.classList.remove("astro-room-lock")
  }, [])

  useEffect(() => {
    if (!roomTone || phase === "ended" || phase === "extracted" || phase === "confirmed") {
      stopToneRef.current?.()
      stopToneRef.current = null
      return
    }
    stopToneRef.current = startRoomTone()
    return () => {
      stopToneRef.current?.()
      stopToneRef.current = null
    }
  }, [roomTone, phase])

  useEffect(() => {
    if (callType === "chat" || joinCode) return
    let dead = false
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    const session = getToken()
    if (session) headers.Authorization = `Bearer ${session}`
    fetch("/api/rtc/room", { method: "POST", headers })
      .then((r) => r.json())
      .then((data: { token?: string }) => {
        if (dead || !data.token) return
        const next = new URLSearchParams(searchParams)
        next.set("join", data.token)
        setSearchParams(next, { replace: true })
      })
      .catch(() => {
        if (dead) return
        const next = new URLSearchParams(searchParams)
        next.set("join", `sess_${crypto.randomUUID().slice(0, 10)}`)
        setSearchParams(next, { replace: true })
      })
    return () => {
      dead = true
    }
  }, [callType, joinCode, searchParams, setSearchParams])

  const receipts: ExtractedReceipt[] = (() => {
    const inThreeWeeks = new Date()
    inThreeWeeks.setDate(inThreeWeeks.getDate() + 21)
    const asked = chatMessages.filter((m) => m.sender === "You").map((m) => m.text.trim()).filter(Boolean)
    const seeds = asked.length ? asked.slice(-2) : claim ? [claim] : []
    return seeds.map((q, i) => {
      const cleaned = q.replace(/^A second opinion on this line:\s*/i, "").replace(/[?!.]+$/, "")
      return {
        id: `sess-${i}-${cleaned.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`,
        title: cleaned.charAt(0).toUpperCase() + cleaned.slice(1),
        category: guessCategory(q),
        windowStart: new Date().toISOString().slice(0, 10),
        windowEnd: inThreeWeeks.toISOString(),
        confidence: 76,
        type: "prediction" as const,
        astrologerName: expert.name,
      }
    })
  })()

  useEffect(() => {
    if (!wantMedia) {
      setLocalStream((prev) => {
        prev?.getTracks().forEach((t) => t.stop())
        return null
      })
      return
    }
    let dead = false
    navigator.mediaDevices
      .getUserMedia({
        video:
          callType === "video"
            ? { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }
            : false,
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      })
      .then((s) => {
        if (dead) {
          s.getTracks().forEach((t) => t.stop())
          return
        }
        setCameraError("")
        setLocalStream(s)
      })
      .catch((err: Error) => {
        setCameraError(err.message || "Camera or mic was blocked.")
        setLocalStream(null)
      })
    return () => {
      dead = true
    }
  }, [wantMedia, callType, camEpoch])

  useEffect(() => {
    bindLocal(stageLocalRef.current, localStream)
    bindLocal(pipLocalRef.current, localStream)
    bindRemote(remoteVideoRef.current, remoteStream)
  })

  useEffect(() => {
    localStream?.getAudioTracks().forEach((t) => {
      t.enabled = micActive
    })
    localStream?.getVideoTracks().forEach((t) => {
      t.enabled = videoActive
    })
  }, [localStream, micActive, videoActive])

  useEffect(() => {
    if (phase !== "in_call") return
    const interval = setInterval(() => setTimer((n) => (billPaused ? n : n + 1)), 1000)
    return () => clearInterval(interval)
  }, [phase, billPaused])

  useEffect(() => {
    if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
  }, [chatMessages, chatBusy])

  const formatTimer = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`

  const freeSeconds = user.firstSessionFree ? FIRST_FREE_MINUTES * 60 : 0
  const freeRemain = Math.max(0, freeSeconds - timer)
  const billedSeconds = Math.max(0, timer - freeSeconds)
  const runningCost = (billedSeconds / 60) * expert.ratePerMin
  const walletLeft = (user.walletBalance ?? 0) - runningCost
  const broke = phase === "in_call" && billedSeconds > 0 && walletLeft <= 0

  useEffect(() => {
    if (broke) setBillPaused(true)
  }, [broke])

  const endCall = () => {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel()
    localStream?.getTracks().forEach((t) => t.stop())
    setLocalStream(null)
    const minutes = Math.max(1, Math.ceil(timer / 60))
    const settle = async () => {
      if (timer > 5) {
        const res = await settleSession({
          minutes,
          ratePerMin: expert.ratePerMin,
          practitionerId: expert.id,
          practitionerName: expert.name,
          mode: callType,
        })
        setBill(res)
      }
      if (pujaId) {
        const rite = pujaById(pujaId)
        if (rite) {
          addPrediction({
            title: rite.topic,
            category: "health",
            targetDate: new Date().toISOString(),
            confidence: 92,
            astrologerName: expert.name,
          })
        }
      }
      setPhase("ended")
      setTimeout(() => setPhase("extracted"), 900)
    }
    void settle()
  }

  const pinLine = (text: string) => {
    const line = text.split("\n").map((l) => l.trim()).find(Boolean) || text
    const result = addPrediction({
      title: line.slice(0, 160),
      category: guessCategory(text),
      targetDate: new Date(pinDate).toISOString(),
      confidence: 78,
      astrologerName: expert.name,
    })
    setPinNote(result.ok ? "Saved to Results." : result.reason || "Could not save")
    setPinFor(null)
  }

  const handleSendMessage = async () => {
    const text = chatInput.trim()
    if (!text || sendingRef.current) return
    sendingRef.current = true
    const stamp = new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })
    const next = [...chatMessages, { sender: "You", text, time: stamp }]
    setChatMessages(next)
    setChatInput("")
    setChatBusy(true)
    const remote = await askAstroAssistant({
      question: text,
      history: next.slice(-8).map((m) => ({
        role: m.sender === "You" ? "user" : "assistant",
        content: m.text,
      })),
      context: snapshotForModel(user, predictions),
      persona: `You are ${expert.name}. First person. Answer the actual question. Under 140 words. Date claims if you make them.`,
    })
    const reply = remote || localConsultReply(text, user, predictions, expert.name)
    setChatMessages((prev) => [
      ...prev,
      { sender: expert.name, text: reply, time: new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }) },
    ])
    if (callType !== "chat") speak(reply, locale === "hi" ? "hi-IN" : "en-IN")
    setChatBusy(false)
    sendingRef.current = false
  }

  const listen = () => {
    const w = window as unknown as {
      webkitSpeechRecognition?: new () => Rec
      SpeechRecognition?: new () => Rec
    }
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SR) {
      setPinNote("This browser cannot hear you. Type instead.")
      return
    }
    const rec = new SR()
    rec.lang = "en-IN"
    rec.interimResults = false
    rec.onstart = () => setListening(true)
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    rec.onresult = (e) => {
      const said = e.results?.[0]?.[0]?.transcript
      if (said) setChatInput((prev) => (prev ? `${prev} ${said}` : said))
    }
    rec.start()
  }

  const copyRoom = async () => {
    const url = `${window.location.origin}/app/room/${expert.id}?mode=${callType}${joinCode ? `&join=${joinCode}` : ""}`
    await navigator.clipboard?.writeText(url)
    setPinNote("Join link copied. Open it on another phone or laptop — they will see your live camera.")
  }

  const confirmReceipts = () => {
    const toAdd = receipts.filter((_, i) => selectedReceipts.has(i))
    const result = addPredictions(toAdd)
    if (!result.ok) {
      setLedgerError(result.reason || "Could not add")
      return
    }
    setLedgerError("")
    setPhase("confirmed")
  }

  const showLocalStage = callType === "video" && !!localStream && videoActive && !remoteStream
  const showRemote = !!remoteStream
  const showPip = callType === "video" && !!localStream && (phase === "in_call" || showRemote)

  const chatPane = (
    <div className="flex flex-col min-h-0 h-full">
      <div ref={chatScrollRef} className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-4 pr-1">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={msg.sender === "You" ? "text-right" : ""}>
            <p className="text-[11px] text-zinc-500 mb-1">
              {msg.sender === "You" ? t("youLabel") : msg.sender} · {msg.time}
            </p>
            <p
              className={cn(
                "inline-block max-w-[92%] text-left text-[15px] leading-relaxed whitespace-pre-wrap",
                msg.sender === "You" ? "text-zinc-50" : "text-zinc-300"
              )}
            >
              {msg.text}
            </p>
            {msg.sender !== "You" && idx > 0 && (
              <div className="mt-2">
                {pinFor === String(idx) ? (
                  <span className="inline-flex flex-wrap items-center gap-2">
                    <input
                      type="date"
                      value={pinDate}
                      onChange={(e) => setPinDate(e.target.value)}
                      className="h-8 bg-transparent border-b border-zinc-700 px-1 text-[11px] text-white"
                    />
                    <button type="button" className="text-[12px] text-emerald-300" onClick={() => pinLine(msg.text)}>
                      {t("saveToResults")}
                    </button>
                    <button type="button" className="text-[12px] text-zinc-500" onClick={() => setPinFor(null)}>
                      {t("cancel")}
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    className="text-[12px] text-zinc-500 hover:text-zinc-200"
                    onClick={() => setPinFor(String(idx))}
                  >
                    {t("saveLineDate")}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        {chatBusy && <p className="text-xs text-zinc-500">{t("readingNamed", { name: expert.name.split(" ")[0] })}</p>}
      </div>
      <div className="shrink-0 pt-3 flex gap-2">
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
          placeholder={t("askPlaceholder")}
          disabled={chatBusy}
          className="flex-1 h-11 rounded-full bg-white/5 border border-white/10 px-4 text-sm text-white focus-visible:outline-none focus-visible:border-zinc-400"
        />
        <Button size="sm" variant="ghost" disabled={chatBusy} onClick={listen}>
          {listening ? t("listening") : t("speak")}
        </Button>
        <Button size="sm" disabled={chatBusy || !chatInput.trim()} onClick={handleSendMessage}>
          {t("send")}
        </Button>
      </div>
    </div>
  )

  const controlBar = callType !== "chat" && (phase === "waiting" || phase === "in_call") && (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={() => setMicActive((v) => !v)}
        aria-label={micActive ? "Mute" : "Unmute"}
        className={cn(
          "h-12 w-12 rounded-full grid place-items-center",
          micActive ? "bg-white/10 text-white" : "bg-red-600 text-white"
        )}
      >
        {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
      </button>
      <button
        type="button"
        onClick={() => setRoomTone((v) => !v)}
        aria-label={t("roomTone")}
        className={cn(
          "h-12 w-12 rounded-full grid place-items-center",
          roomTone ? "bg-zinc-100 text-zinc-950" : "bg-white/10 text-white"
        )}
      >
        {roomTone ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>
      {callType === "video" && (
        <button
          type="button"
          onClick={() => setVideoActive((v) => !v)}
          aria-label={videoActive ? "Turn camera off" : "Turn camera on"}
          className={cn(
            "h-12 w-12 rounded-full grid place-items-center",
            videoActive ? "bg-white/10 text-white" : "bg-red-600 text-white"
          )}
        >
          {videoActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>
      )}
      {phase === "in_call" && (
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-label="Toggle chat"
          className={cn("h-12 w-12 rounded-full grid place-items-center", chatOpen ? "bg-zinc-100 text-zinc-950" : "bg-white/10 text-white")}
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      )}
      <button
        type="button"
        onClick={copyRoom}
        aria-label="Copy join link"
        className="h-12 w-12 rounded-full bg-white/10 text-white grid place-items-center"
      >
        <Link2 className="w-5 h-5" />
      </button>
      {phase === "in_call" ? (
        <Button variant="danger" onClick={endCall} className="h-12 px-5">
          {t("end")}
        </Button>
      ) : (
        <Button size="lg" onClick={() => setPhase("in_call")}>
          {callType === "audio" ? t("startCall") : t("startVideo")}
        </Button>
      )}
    </div>
  )

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-950">
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className={cn("absolute inset-0 h-full w-full object-cover", showRemote ? "opacity-100" : "opacity-0 pointer-events-none")}
      />
      <video
        ref={stageLocalRef}
        autoPlay
        playsInline
        muted
        className={cn(
          "absolute inset-0 h-full w-full object-cover -scale-x-100",
          showLocalStage ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />
      {!showRemote && !showLocalStage && (
        <img src={expert.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover astro-face" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35 pointer-events-none" />

      <div
        className={cn(
          "absolute z-20 overflow-hidden rounded-2xl bg-zinc-950 shadow-[0_16px_40px_rgba(0,0,0,0.55)] ring-1 ring-white/15",
          "w-[128px] sm:w-[176px] aspect-[3/4]",
          chatOpen && phase === "in_call" ? "right-4 sm:right-[400px]" : "right-4 sm:right-6",
          phase === "in_call" ? "bottom-28 sm:bottom-32" : "bottom-36 sm:bottom-40",
          showPip ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <video
          ref={pipLocalRef}
          autoPlay
          playsInline
          muted
          className={cn("h-full w-full object-cover -scale-x-100", videoActive ? "opacity-100" : "opacity-0")}
        />
        {!videoActive && (
          <p className="absolute inset-0 grid place-items-center text-[11px] text-zinc-400 px-2 text-center">{t("cameraOff")}</p>
        )}
        <p className="absolute left-2 bottom-1.5 text-[10px] tracking-wide text-white/85">{t("youLabel")}</p>
      </div>

      <header
        className={cn(
          "absolute top-0 z-30 flex items-start justify-between gap-4 px-4 sm:px-6 pt-4 left-0",
          chatOpen && phase === "in_call" && callType !== "chat" ? "right-0 sm:right-[380px]" : "right-0"
        )}
      >
        <div className="min-w-0">
          {phase === "waiting" && (
            <button type="button" onClick={() => navigate("/app/consult")} className="text-sm text-zinc-300 hover:text-white">
              {t("backToLive")}
            </button>
          )}
          <p className="mt-2 text-sm text-zinc-200 truncate">
            <span className={link === "live" ? "text-emerald-400" : "text-zinc-400"}>
              {phase === "in_call" ? t("live") : t("ready")}
            </span>
            <span className="text-zinc-500"> · </span>
            {expert.name}
            {phase === "in_call" && (
              <>
                <span className="text-zinc-500"> · </span>
                {formatTimer(timer)}
                <span className="text-zinc-500"> · </span>
                <span className="font-display text-lg text-zinc-50">₹{Math.floor(runningCost)}</span>
                <span className="text-zinc-500"> · </span>
                ₹{expert.ratePerMin}/{t("perMinShort")}
                {freeRemain > 0 && (
                  <>
                    <span className="text-zinc-500"> · </span>
                    <span className="text-emerald-300">
                      {t("freeLeftClock", { clock: formatTimer(freeRemain) })}
                    </span>
                  </>
                )}
                <span className="text-zinc-500"> · </span>
                {t("walletLeft", { n: Math.max(0, Math.floor(walletLeft)) })}
              </>
            )}
          </p>
          {phase === "in_call" && walletLeft < expert.ratePerMin && !broke && (
            <p className="text-[12px] text-amber-200 mt-1">{t("lowWallet")}</p>
          )}
          {callType !== "chat" && (phase === "waiting" || phase === "in_call") && (
            <p className="text-[12px] text-zinc-400 mt-0.5">{carrierLabel(link, others, t)}</p>
          )}
        </div>
        {phase === "in_call" && (
          <Button size="sm" variant="danger" onClick={endCall} className="shrink-0">
            {t("end")}
          </Button>
        )}
      </header>

      {pinNote && (
        <p className="absolute top-20 left-4 right-4 z-30 text-sm text-emerald-300 sm:max-w-md">{pinNote}</p>
      )}

      {broke && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-zinc-950/85 px-5">
          <div className="max-w-sm text-center">
            <p className="text-[12px] uppercase tracking-[0.16em] text-amber-200">{t("wallet")}</p>
            <p className="mt-2 font-display text-4xl text-zinc-50">{t("walletEmptyPay")}</p>
            <p className="mt-3 text-sm text-zinc-400">
              ₹{expert.ratePerMin}/{t("perMinShort")} · {t("walletLeft", { n: Math.max(0, Math.floor(walletLeft)) })}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                disabled={upiBusy}
                onClick={() => {
                  setUpiBusy(true)
                  const pack = WALLET_PACKS.find((p) => p.amount >= expert.ratePerMin * 5) || WALLET_PACKS[1]
                  buyWalletPack(pack.amount).then((res) => {
                    setUpiBusy(false)
                    if (res.ok) setBillPaused(false)
                    else setPinNote(res.reason || t("checkoutFailed"))
                  })
                }}
              >
                {upiBusy ? t("upiOpening") : t("payUpi")}
              </Button>
              <Button variant="danger" onClick={endCall}>
                {t("end")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {phase === "waiting" && (
        <div className="absolute inset-x-0 bottom-0 z-30 px-4 sm:px-6 pb-6 pt-16">
          <p className="text-[12px] uppercase tracking-[0.16em] text-emerald-400">{t("live")}</p>
          <h1 className="font-display text-3xl sm:text-5xl text-zinc-50 mt-1 leading-none">{expert.name}</h1>
          <p className="text-sm text-zinc-400 mt-2">
            {expert.specialty} · ₹{expert.ratePerMin}/min · {t("walletLeft", { n: user.walletBalance ?? 0 })}
            {user.firstSessionFree ? ` · ${t("firstThreeFree")}` : ""}
          </p>
          {!user.firstSessionFree && (user.walletBalance ?? 0) < expert.ratePerMin && (
            <button type="button" className="mt-2 text-sm text-amber-200" onClick={() => navigate("/app/wallet")}>
              {t("lowWallet")} · {t("addMoney")}
            </button>
          )}
          {claim && <p className="mt-2 text-sm text-zinc-300 max-w-lg">{t("secondOn", { claim })}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {(["chat", "audio", "video"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setCallType(mode)}
                className={cn(
                  "h-9 px-4 rounded-full text-sm capitalize",
                  callType === mode ? "bg-zinc-100 text-zinc-950" : "bg-white/10 text-zinc-200 hover:bg-white/15"
                )}
              >
                {mode === "audio" ? t("call") : mode === "video" ? t("video") : t("chat")}
              </button>
            ))}
          </div>
          {cameraError && (
            <p className="mt-3 text-sm text-amber-200 max-w-lg">
              {cameraError} {t("allowCamera")}{" "}
              <button type="button" className="underline" onClick={() => setCamEpoch((n) => n + 1)}>
                {t("tryAgain")}
              </button>
            </p>
          )}
          {callType === "video" && !localStream && !cameraError && (
            <p className="mt-3 text-sm text-zinc-400">{t("waitingCamera")}</p>
          )}
          {callType === "video" && localStream && !cameraError && (
            <p className="mt-3 text-sm text-zinc-300">{t("thisIsYou")}</p>
          )}
          <div className="mt-5">
            {callType === "chat" ? (
              <Button size="lg" onClick={() => setPhase("in_call")}>
                {t("startChat")}
              </Button>
            ) : (
              controlBar
            )}
          </div>
        </div>
      )}

      {phase === "in_call" && callType === "chat" && (
        <div className="absolute inset-0 z-20 flex bg-zinc-950">
          <CosmicField density={28} />
          <div className="hidden lg:block w-[280px] shrink-0 overflow-y-auto px-5 py-6 relative z-10">
            <ChartRail />
          </div>
          <div className="relative z-10 flex-1 min-w-0 min-h-0 px-4 sm:px-6 py-16">{chatPane}</div>
        </div>
      )}

      {phase === "in_call" && callType !== "chat" && (
        <>
          <div
            className={cn(
              "absolute bottom-0 z-30 px-4 sm:px-6 pb-6 left-0",
              chatOpen ? "right-0 sm:right-[380px]" : "right-0"
            )}
          >
            {controlBar}
          </div>
          {chatOpen && (
            <aside className="absolute z-40 inset-y-0 right-0 w-full sm:w-[380px] bg-zinc-950/90 backdrop-blur-md flex flex-col px-4 sm:px-5 pt-16 pb-4">
              <div className="flex items-center justify-between mb-3 shrink-0">
                <p className="text-sm text-zinc-400">{t("desk")}</p>
                <button type="button" onClick={() => setChatOpen(false)} className="h-8 w-8 grid place-items-center text-zinc-400 hover:text-white" aria-label="Close chat">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="min-h-0 flex-1">{chatPane}</div>
            </aside>
          )}
        </>
      )}

      {phase === "ended" && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-zinc-950">
          <p className="font-display text-3xl text-zinc-50">{t("pullingLines")}</p>
        </div>
      )}

      {(phase === "extracted" || phase === "confirmed") && (
        <div className="absolute inset-0 z-50 overflow-y-auto overscroll-contain bg-zinc-950 px-5 py-10">
          <CosmicField density={22} />
          <div className="relative max-w-xl mx-auto">
            {phase === "confirmed" ? (
              <>
                <h2 className="font-display text-4xl text-zinc-50">{t("savedResults")}</h2>
                <p className="mt-3 text-sm text-zinc-400">{t("whenDateComes")}</p>
                <Button className="mt-6" onClick={() => navigate("/app/ledger")}>
                  {t("openResults")}
                </Button>
              </>
            ) : (
              <>
                <h2 className="font-display text-4xl text-zinc-50">{t("saveWhatSaid")}</h2>
                <p className="mt-3 text-sm text-zinc-400">{t("sessionWith", { name: expert.name })}</p>
                {bill && (
                  <p className="mt-3 text-sm text-emerald-300">
                    {t("chargedThisCall", { n: bill.charged })} {t("stillInWallet", { n: user.walletBalance ?? 0 })}
                  </p>
                )}
                {receipts.length === 0 && (
                  <p className="mt-6 text-sm text-zinc-500">{t("nothingToDate")}</p>
                )}
                <div className="mt-8 space-y-5">
                  {receipts.map((r, i) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() =>
                        setSelectedReceipts((prev) => {
                          const next = new Set(prev)
                          if (next.has(i)) next.delete(i)
                          else next.add(i)
                          return next
                        })
                      }
                      className="text-left w-full"
                    >
                      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                        {selectedReceipts.has(i) ? t("willSave") : t("skip")}
                      </p>
                      <p className="mt-1 font-display text-2xl text-zinc-50">{r.title}</p>
                    </button>
                  ))}
                </div>
                {ledgerError && <p className="mt-4 text-sm text-amber-400">{ledgerError}</p>}
                <div className="mt-8 flex gap-3">
                  <Button disabled={!receipts.length || !selectedReceipts.size} onClick={confirmReceipts}>
                    {t("saveToResults")}
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/app/ledger")}>
                    {t("skip")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

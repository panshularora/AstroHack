import { useEffect, useState } from "react"

export type RtcLink = "off" | "waiting" | "connecting" | "live" | "full" | "failed"

type Signal = {
  seq: number
  from: string
  type: "offer" | "answer" | "ice"
  payload: RTCSessionDescriptionInit | RTCIceCandidateInit
}

const FALLBACK_ICE: RTCIceServer[] = [
  { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun.cloudflare.com:3478"] },
  {
    urls: [
      "turn:openrelay.metered.ca:80",
      "turn:openrelay.metered.ca:443",
      "turn:openrelay.metered.ca:443?transport=tcp",
    ],
    username: "openrelayproject",
    credential: "openrelayproject",
  },
]

export function useRtcRoom(token: string, enabled: boolean, local: MediaStream | null) {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [others, setOthers] = useState(0)
  const [link, setLink] = useState<RtcLink>("off")

  useEffect(() => {
    if (!enabled || !token || !local) {
      setLink("off")
      setOthers(0)
      setRemoteStream(null)
      return
    }

    const peer = crypto.randomUUID()
    let after = 0
    let dead = false
    let pc: RTCPeerConnection | null = null
    let makingOffer = false
    let ignoreOffer = false
    let socket: WebSocket | null = null
    const pendingIce: RTCIceCandidateInit[] = []
    let iceServers: RTCIceServer[] = FALLBACK_ICE

    const post = (path: string, body: unknown) =>
      fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).catch(() => undefined)

    const sendSignal = (type: string, payload: unknown) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "signal", kind: type, payload }))
        return
      }
      post("/api/rtc/signal", { token, from: peer, type, payload })
    }

    const flushIce = async (conn: RTCPeerConnection) => {
      while (pendingIce.length) {
        const c = pendingIce.shift()
        if (c) await conn.addIceCandidate(c).catch(() => {})
      }
    }

    const ensurePc = () => {
      if (pc) return pc
      pc = new RTCPeerConnection({ iceServers, iceCandidatePoolSize: 8 })
      local.getTracks().forEach((track) => pc!.addTrack(track, local))
      pc.onicecandidate = (e) => {
        if (e.candidate) sendSignal("ice", e.candidate.toJSON())
      }
      pc.ontrack = (e) => {
        setRemoteStream(e.streams[0] ?? new MediaStream([e.track]))
        setLink("live")
      }
      pc.onconnectionstatechange = () => {
        const state = pc?.connectionState
        if (state === "connected") setLink("live")
        if (state === "connecting") setLink((prev) => (prev === "live" ? prev : "connecting"))
        if (state === "failed") {
          setLink("failed")
          pc?.restartIce()
        }
        if (state === "disconnected") setLink("waiting")
      }
      pc.oniceconnectionstatechange = () => {
        if (pc?.iceConnectionState === "failed") pc.restartIce()
      }
      pc.onnegotiationneeded = async () => {
        if (!pc || dead) return
        try {
          makingOffer = true
          await pc.setLocalDescription(await pc.createOffer())
          if (dead || !pc.localDescription) return
          sendSignal("offer", pc.localDescription)
        } catch {
          /* glare */
        } finally {
          makingOffer = false
        }
      }
      return pc
    }

    const handle = async (sig: Signal) => {
      const conn = ensurePc()
      const polite = peer > sig.from
      if (sig.type === "offer" && sig.payload && "type" in (sig.payload as object)) {
        const collide = makingOffer || conn.signalingState !== "stable"
        ignoreOffer = !polite && collide
        if (ignoreOffer) return
        await conn.setRemoteDescription(sig.payload as RTCSessionDescriptionInit)
        await flushIce(conn)
        await conn.setLocalDescription(await conn.createAnswer())
        if (conn.localDescription) sendSignal("answer", conn.localDescription)
      }
      if (sig.type === "answer" && sig.payload && "type" in (sig.payload as object)) {
        if (conn.signalingState === "have-local-offer") {
          await conn.setRemoteDescription(sig.payload as RTCSessionDescriptionInit)
          await flushIce(conn)
        }
      }
      if (sig.type === "ice" && sig.payload) {
        const cand = sig.payload as RTCIceCandidateInit
        if (!conn.remoteDescription) {
          pendingIce.push(cand)
          return
        }
        try {
          await conn.addIceCandidate(cand)
        } catch {
          /* drop */
        }
      }
    }

    const tick = async () => {
      if (dead) return
      const res = await fetch(
        `/api/rtc/poll?token=${encodeURIComponent(token)}&peer=${encodeURIComponent(peer)}&after=${after}`
      ).catch(() => null)
      if (!res) return
      if (res.status === 409) {
        setLink("full")
        return
      }
      if (!res.ok) return
      const data = (await res.json()) as { others?: string[]; signals?: Signal[] }
      setOthers(data.others?.length || 0)
      if (data.others?.length) setLink((prev) => (prev === "live" || prev === "failed" ? prev : "connecting"))
      for (const sig of data.signals || []) {
        after = Math.max(after, sig.seq)
        await handle(sig).catch(() => {})
      }
    }

    const openSocket = () => {
      const proto = window.location.protocol === "https:" ? "wss" : "ws"
      const ws = new WebSocket(`${proto}://${window.location.host}/ws/rtc`)
      socket = ws
      ws.onopen = () => ws.send(JSON.stringify({ type: "hello", token, peer }))
      ws.onmessage = (ev) => {
        let msg: { type?: string; others?: string[]; seq?: number; from?: string; kind?: string; payload?: unknown }
        try {
          msg = JSON.parse(String(ev.data))
        } catch {
          return
        }
        if (msg.type === "full") {
          setLink("full")
          return
        }
        if (msg.type === "peers") {
          setOthers(msg.others?.length || 0)
          if (msg.others?.length) setLink((prev) => (prev === "live" ? prev : "connecting"))
          return
        }
        if (msg.type === "signal" && msg.from && msg.kind) {
          after = Math.max(after, msg.seq || 0)
          void handle({
            seq: msg.seq || 0,
            from: msg.from,
            type: msg.kind as Signal["type"],
            payload: msg.payload as Signal["payload"],
          })
        }
      }
      ws.onerror = () => {
        socket = null
      }
    }

    const boot = async () => {
      const iceRes = await fetch("/api/rtc/ice").catch(() => null)
      if (iceRes?.ok) {
        const data = (await iceRes.json()) as { iceServers?: RTCIceServer[] }
        if (data.iceServers?.length) iceServers = data.iceServers
      }
      if (dead) return
      const join = await post("/api/rtc/join", { token, peer })
      if (join && join.status === 409) {
        setLink("full")
        return
      }
      setLink("waiting")
      ensurePc()
      openSocket()
      await tick()
    }

    void boot()
    const iv = window.setInterval(() => void tick(), 2500)

    return () => {
      dead = true
      window.clearInterval(iv)
      post("/api/rtc/leave", { token, peer })
      socket?.close()
      pc?.close()
      pc = null
      setRemoteStream(null)
    }
  }, [token, enabled, local])

  return { remoteStream, others, link }
}

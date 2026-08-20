import { createHmac, timingSafeEqual } from "node:crypto"
import type { Server } from "node:http"
import { WebSocketServer, WebSocket } from "ws"
import { rtcSecret } from "./env.js"

const SECRET = rtcSecret() || "astrolive-rtc-dev"
const ROOM_TTL_MS = 1000 * 60 * 60 * 4

type RtcSig = { seq: number; from: string; type: string; payload: unknown }
type Room = {
  peers: Map<string, { seen: number; ws?: WebSocket }>
  sigs: RtcSig[]
  seq: number
}

const rooms = new Map<string, Room>()

function hmac(value: string) {
  return createHmac("sha256", SECRET).update(value).digest("hex").slice(0, 24)
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export function mintRoomToken() {
  const room = `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
  const exp = Date.now() + ROOM_TTL_MS
  const token = `${room}.${exp}.${hmac(`${room}.${exp}`)}`
  return { room, exp, token }
}

export function readRoomToken(raw: string | undefined | null) {
  if (!raw) return null
  const [room, expRaw, sig] = raw.split(".")
  const exp = Number(expRaw)
  if (!room || !sig || !Number.isFinite(exp) || exp < Date.now()) return null
  if (!safeEqual(sig, hmac(`${room}.${exp}`))) return null
  return room
}

export function getRoom(name: string) {
  let r = rooms.get(name)
  if (!r) {
    r = { peers: new Map(), sigs: [], seq: 0 }
    rooms.set(name, r)
  }
  return r
}

export function prunePeers(r: Room) {
  const now = Date.now()
  for (const [id, peer] of r.peers) {
    const open = peer.ws && peer.ws.readyState === WebSocket.OPEN
    if (!open && now - peer.seen > 12_000) r.peers.delete(id)
  }
}

export function pushSignal(room: string, from: string, type: string, payload: unknown) {
  const r = getRoom(room)
  r.seq += 1
  const sig: RtcSig = { seq: r.seq, from, type, payload }
  r.sigs.push(sig)
  if (r.sigs.length > 80) r.sigs.splice(0, r.sigs.length - 80)
  const wire = JSON.stringify({ type: "signal", seq: sig.seq, from, kind: type, payload })
  for (const [id, peer] of r.peers) {
    if (id === from) continue
    if (peer.ws && peer.ws.readyState === WebSocket.OPEN) peer.ws.send(wire)
  }
  return sig.seq
}

export function othersOf(room: string, peer: string) {
  const r = getRoom(room)
  prunePeers(r)
  return [...r.peers.keys()].filter((p) => p !== peer)
}

export function attachRtcSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: "/ws/rtc" })
  wss.on("connection", (ws) => {
    let room = ""
    let peer = ""
    ws.on("message", (raw) => {
      let msg: { type?: string; token?: string; peer?: string; kind?: string; payload?: unknown }
      try {
        msg = JSON.parse(String(raw))
      } catch {
        return
      }
      if (msg.type === "hello") {
        const name = readRoomToken(msg.token)
        if (!name || !msg.peer) {
          ws.send(JSON.stringify({ type: "error", error: "bad token" }))
          ws.close()
          return
        }
        room = name
        peer = msg.peer
        const r = getRoom(room)
        prunePeers(r)
        if (!r.peers.has(peer) && r.peers.size >= 2) {
          ws.send(JSON.stringify({ type: "full" }))
          ws.close()
          return
        }
        r.peers.set(peer, { seen: Date.now(), ws })
        ws.send(JSON.stringify({ type: "peers", others: othersOf(room, peer) }))
        const notice = JSON.stringify({ type: "peers", others: [peer] })
        for (const [id, p] of r.peers) {
          if (id !== peer && p.ws?.readyState === WebSocket.OPEN) p.ws.send(notice)
        }
        return
      }
      if (msg.type === "signal" && room && peer && msg.kind) {
        const r = getRoom(room)
        const slot = r.peers.get(peer)
        if (slot) slot.seen = Date.now()
        pushSignal(room, peer, msg.kind, msg.payload)
      }
    })
    ws.on("close", () => {
      if (!room || !peer) return
      const r = rooms.get(room)
      r?.peers.delete(peer)
    })
  })
  return wss
}

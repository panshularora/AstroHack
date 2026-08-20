import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"
import { db, nowIso } from "./db.js"

const SCRYPT_KEYLEN = 32

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const key = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex")
  return `scrypt$${salt}$${key}`
}

export function verifyPassword(password: string, stored: string) {
  const [algo, salt, key] = stored.split("$")
  if (algo !== "scrypt" || !salt || !key) return false
  const next = scryptSync(password, salt, SCRYPT_KEYLEN)
  const prev = Buffer.from(key, "hex")
  if (next.length !== prev.length) return false
  return timingSafeEqual(next, prev)
}

export function createSession(userId: string) {
  const token = randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString()
  db.prepare("INSERT INTO sessions (token, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)").run(
    token,
    userId,
    expires,
    nowIso()
  )
  return { token, expiresAt: expires }
}

export function userIdFromToken(token: string | undefined | null) {
  if (!token) return null
  const row = db
    .prepare("SELECT user_id, expires_at FROM sessions WHERE token = ?")
    .get(token) as { user_id: string; expires_at: string } | undefined
  if (!row) return null
  if (new Date(row.expires_at).getTime() < Date.now()) {
    db.prepare("DELETE FROM sessions WHERE token = ?").run(token)
    return null
  }
  return row.user_id
}

export function destroySession(token: string) {
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token)
}

export function bearer(header: string | undefined) {
  if (!header) return null
  const [type, token] = header.split(" ")
  if (type !== "Bearer" || !token) return null
  return token
}

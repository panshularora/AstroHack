const KEY = "astrolive_utm"
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref", "from"] as const
const INVITE_KEY = "astrolive_invite"

export type UtmRecord = Partial<Record<(typeof PARAMS)[number], string>> & { capturedAt: string }

export function captureUtm(search = typeof window !== "undefined" ? window.location.search : ""): UtmRecord | null {
  const q = new URLSearchParams(search)
  const next: UtmRecord = { capturedAt: new Date().toISOString() }
  let hit = false
  for (const key of PARAMS) {
    const v = q.get(key)
    if (v) {
      next[key] = v
      hit = true
    }
  }
  if (!hit) return readUtm()
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
  fetch("/api/utm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(next),
  }).catch(() => {})
  return next
}

export function readUtm(): UtmRecord | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as UtmRecord) : null
  } catch {
    return null
  }
}

export function captureInvite(search = typeof window !== "undefined" ? window.location.search : "") {
  captureUtm(search)
  const q = new URLSearchParams(search)
  const code = (q.get("from") || q.get("ref") || "").trim()
  if (code) {
    try {
      sessionStorage.setItem(INVITE_KEY, code)
    } catch {
      /* ignore */
    }
  }
  return readInvite()
}

export function readInvite() {
  try {
    const stored = sessionStorage.getItem(INVITE_KEY)
    if (stored) return stored
  } catch {
    /* ignore */
  }
  const utm = readUtm()
  return (utm?.from || utm?.ref || "").trim()
}

export function withUtm(href: string): string {
  const utm = readUtm()
  if (!utm) return href
  const url = new URL(href, typeof window !== "undefined" ? window.location.origin : "https://astrolive.app")
  for (const key of PARAMS) {
    const v = utm[key]
    if (v && !url.searchParams.has(key)) url.searchParams.set(key, v)
  }
  return url.pathname + url.search + url.hash
}

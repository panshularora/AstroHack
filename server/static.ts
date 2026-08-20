import { existsSync, readFileSync, statSync } from "node:fs"
import { extname, join } from "node:path"
import { fileURLToPath } from "node:url"
import type { Hono } from "hono"

const distDir = join(fileURLToPath(new URL(".", import.meta.url)), "..", "dist")

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".map": "application/json",
}

/** Serve the Vite build from the API process when dist/ exists (one host, HTTPS in front). */
export function mountSpa(app: Hono) {
  const index = join(distDir, "index.html")
  if (!existsSync(index)) return false
  app.get("*", (c) => {
    const p = c.req.path
    if (p.startsWith("/api") || p.startsWith("/ws")) return c.notFound()
    const rel = p === "/" ? "index.html" : p.replace(/^\//, "")
    let file = join(distDir, rel)
    if (!file.startsWith(distDir) || !existsSync(file) || statSync(file).isDirectory()) {
      file = index
    }
    const body = readFileSync(file)
    return new Response(body, {
      headers: { "content-type": MIME[extname(file)] || "application/octet-stream" },
    })
  })
  return true
}

// @ts-nocheck
import { handle } from "hono/vercel"

export const config = {
  runtime: "nodejs",
  maxDuration: 30,
}

export default async function route(request: Request) {
  const url = new URL(request.url)
  if (url.pathname === "/api/ping") {
    return Response.json({ ok: true, node: process.version })
  }
  try {
    const mod = await import("../server/index.ts")
    return handle(mod.app)(request)
  } catch (err) {
    const e = err as Error
    return Response.json({ error: e.message || String(err), stack: e.stack || "" }, { status: 500 })
  }
}

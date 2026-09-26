// @ts-nocheck
// Vercel's Node.js runtime calls a default export as (req, res) with a Node
// IncomingMessage, so the Hono app is adapted with @hono/node-server/vercel.
import { handle } from "@hono/node-server/vercel"

export const config = {
  runtime: "nodejs",
  maxDuration: 30,
}

let handler

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader("content-type", "application/json")
  res.end(JSON.stringify(body))
}

export default async function route(req, res) {
  const pathname = (req.url || "/").split("?")[0]
  if (pathname === "/api/ping") {
    return sendJson(res, 200, { ok: true, node: process.version })
  }
  try {
    if (!handler) {
      const mod = await import("../server/index.ts")
      handler = handle(mod.app)
    }
    return await handler(req, res)
  } catch (err) {
    console.error(err)
    return sendJson(res, 500, { error: (err as Error)?.message || String(err) })
  }
}

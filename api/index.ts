// @ts-nocheck
// Vercel's Node.js runtime calls a default export as (req, res) with a Node
// IncomingMessage, so the Hono app is adapted with @hono/node-server/vercel.
// vercel.json rewrites every /api/* path here (except /api/ping, which has
// its own function); req.url keeps the original path for Hono's router.
import { handle } from "@hono/node-server/vercel"

export const config = {
  runtime: "nodejs",
}

let handler

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader("content-type", "application/json")
  res.end(JSON.stringify(body))
}

// With Vercel's Node helpers enabled (the default), the request stream is
// read before the handler runs and only replayed through req.on("data"/"end"),
// which @hono/node-server does not use, so POST bodies hang. Buffer the body
// here and hand it over as req.rawBody, which @hono/node-server reads directly.
function readRawBody(req): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)))
    req.on("end", () => resolve(Buffer.concat(chunks)))
    req.on("error", reject)
  })
}

export default async function route(req, res) {
  const pathname = (req.url || "/").split("?")[0]
  if (pathname === "/api/ping") {
    return sendJson(res, 200, { ok: true, node: process.version })
  }
  try {
    if (!handler) {
      const mod = await import("../server/index.js")
      handler = handle(mod.app)
    }
    if (req.method !== "GET" && req.method !== "HEAD" && !(req.rawBody instanceof Buffer)) {
      req.rawBody = await readRawBody(req)
    }
    return await handler(req, res)
  } catch (err) {
    console.error(err)
    return sendJson(res, 500, { error: (err as Error)?.message || String(err) })
  }
}

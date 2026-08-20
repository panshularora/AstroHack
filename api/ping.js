export default function handler() {
  return new Response(JSON.stringify({ ok: true, node: process.version }), {
    headers: { "content-type": "application/json" },
  })
}

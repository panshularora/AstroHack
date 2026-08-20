import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))

export function loadEnv() {
  const file = path.join(here, ".env")
  if (!fs.existsSync(file)) return
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const trim = line.trim()
    if (!trim || trim.startsWith("#")) continue
    const eq = trim.indexOf("=")
    if (eq < 1) continue
    const key = trim.slice(0, eq).trim()
    let val = trim.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnv()

export function rtcSecret() {
  return (process.env.RTC_SECRET || "").trim()
}

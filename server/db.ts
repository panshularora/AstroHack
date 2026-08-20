import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { DatabaseSync } from "node:sqlite"

const here = path.dirname(fileURLToPath(import.meta.url))
const onVercel = Boolean(process.env.VERCEL)
const dataDir = onVercel ? path.join("/tmp", "astrolive") : path.join(here, "data")
if (!onVercel) fs.mkdirSync(dataDir, { recursive: true })

const raw = new DatabaseSync(onVercel ? ":memory:" : path.join(dataDir, "astrolive.db"))
if (!onVercel) raw.exec("PRAGMA journal_mode = WAL")
raw.exec("PRAGMA foreign_keys = ON")
raw.exec("PRAGMA busy_timeout = 5000")

export const db = {
  exec(sql: string) {
    raw.exec(sql)
  },
  pragma(stmt: string) {
    raw.exec(`PRAGMA ${stmt}`)
  },
  prepare(sql: string) {
    const stmt = raw.prepare(sql)
    return {
      run: (...args: unknown[]) => stmt.run(...args),
      get: (...args: unknown[]) => stmt.get(...args) as unknown,
      all: (...args: unknown[]) => stmt.all(...args) as unknown[],
    }
  },
  transaction(fn: () => void) {
    return () => {
      raw.exec("BEGIN")
      try {
        fn()
        raw.exec("COMMIT")
      } catch (err) {
        raw.exec("ROLLBACK")
        throw err
      }
    }
  },
}

const schemaFile = [
  path.join(here, "schema.sql"),
  path.join(process.cwd(), "server", "schema.sql"),
].find((p) => fs.existsSync(p))
if (!schemaFile) throw new Error("server/schema.sql not found")
const schema = fs.readFileSync(schemaFile, "utf8")
db.exec(schema)

function columnNames(table: string) {
  return (db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]).map((c) => c.name)
}

function ensureColumn(table: string, name: string, ddl: string) {
  if (!columnNames(table).includes(name)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${name} ${ddl}`)
  }
}

ensureColumn("users", "invite_code", "TEXT")
ensureColumn("users", "checkin_streak", "INTEGER NOT NULL DEFAULT 0")
ensureColumn("users", "last_checkin", "TEXT")
ensureColumn("users", "welcome_granted", "INTEGER NOT NULL DEFAULT 0")
ensureColumn("users", "first_session_used", "INTEGER NOT NULL DEFAULT 0")
db.exec(`
  CREATE TABLE IF NOT EXISTS claims (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    offering_id TEXT NOT NULL,
    cost INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE(user_id, offering_id)
  );
  CREATE TABLE IF NOT EXISTS fee_purchases (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    kind TEXT NOT NULL,
    key TEXT NOT NULL,
    amount INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE(user_id, kind, key)
  );
  CREATE TABLE IF NOT EXISTS shop_orders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    offering_id TEXT NOT NULL,
    tracking TEXT NOT NULL UNIQUE,
    address TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS rtc_rooms (
    id TEXT PRIMARY KEY,
    exp INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );
`)
db.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_users_invite ON users(invite_code) WHERE invite_code IS NOT NULL")

export function nowIso() {
  return new Date().toISOString()
}

export function monthKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

export function id(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

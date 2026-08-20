import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  BookOpen,
  Bot,
  Clock,
  Compass,
  CreditCard,
  Database,
  Film,
  Globe,
  Heart,
  Home,
  LifeBuoy,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
  Video,
} from "lucide-react"
import { LENS_GROUPS, STRAND_MODES } from "@/lib/loop"

type CommandItem = {
  id: string
  label: string
  hint: string
  href: string
  group: string
  Icon: typeof Search
}

const MODE_ICONS = {
  strand: Home,
  watch: Film,
  weave: Video,
  puja: Sparkles,
  claims: BookOpen,
} as const

const LENS_ICONS: Record<string, typeof Compass> = {
  "/app/companion": Bot,
  "/app/puja": Sparkles,
  "/app/reels": Film,
  "/app/consult": Video,
  "/app/today": Sun,
  "/app/ledger": BookOpen,
  "/app/sos": LifeBuoy,
  "/app/kundli": Compass,
  "/app/yogas": Compass,
  "/app/reports": BookOpen,
  "/app/sade-sati": Globe,
  "/app/mangal": Heart,
  "/app/muhurta": Clock,
  "/app/grahas": Globe,
  "/app/transits": Compass,
  "/app/relationship": Heart,
  "/app/memory": Database,
  "/app/you": User,
  "/app/subscription": CreditCard,
  "/app/share": Globe,
  "/app/settings": Settings,
}

function buildItems(): CommandItem[] {
  const go: CommandItem[] = STRAND_MODES.map((mode) => ({
    id: mode.id,
    label: mode.label,
    hint: mode.href.replace("/app/", ""),
    href: mode.href,
    group: "Jump to",
    Icon: MODE_ICONS[mode.id],
  }))

  const rest: CommandItem[] = LENS_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      id: item.href,
      label: item.label,
      hint: item.blurb,
      href: item.href,
      group: group.title,
      Icon: LENS_ICONS[item.href] || Compass,
    }))
  )

  return [...go, ...rest]
}

const ALL_ITEMS = buildItems()

type CommandCtx = { openMenu: () => void; closeMenu: () => void; isOpen: boolean }

const CommandMenuContext = createContext<CommandCtx | null>(null)

export function useCommandMenu() {
  const ctx = useContext(CommandMenuContext)
  if (!ctx) {
    return {
      openMenu: () => {},
      closeMenu: () => {},
      isOpen: false,
    }
  }
  return ctx
}

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const value = useMemo<CommandCtx>(
    () => ({
      openMenu: () => setOpen(true),
      closeMenu: () => setOpen(false),
      isOpen: open,
    }),
    [open]
  )

  return (
    <CommandMenuContext.Provider value={value}>
      {children}
      <CommandMenu open={open} onClose={() => setOpen(false)} />
    </CommandMenuContext.Provider>
  )
}

export function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [q, setQ] = useState("")
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!open) {
      setQ("")
      setActive(0)
    }
  }, [open])

  const items = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return ALL_ITEMS
    return ALL_ITEMS.filter(
      (i) =>
        i.label.toLowerCase().includes(query) ||
        i.hint.toLowerCase().includes(query) ||
        i.group.toLowerCase().includes(query)
    )
  }, [q])

  useEffect(() => {
    setActive(0)
  }, [q])

  const go = useCallback(
    (href: string) => {
      onClose()
      navigate(href)
    },
    [navigate, onClose]
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActive((i) => Math.min(i + 1, Math.max(items.length - 1, 0)))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActive((i) => Math.max(i - 1, 0))
      }
      if (e.key === "Enter" && items[active]) {
        e.preventDefault()
        go(items[active].href)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose, items, active, go])

  if (!open) return null

  const grouped = items.reduce<Record<string, CommandItem[]>>((acc, item) => {
    acc[item.group] = acc[item.group] || []
    acc[item.group].push(item)
    return acc
  }, {})

  let running = -1

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-3 pt-[10vh] sm:px-4">
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 bg-black/55 backdrop-blur-[3px]"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-label="Search"
        initial={{ opacity: 0, y: 8, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[560px] bg-zinc-950 rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 h-12 border-b border-zinc-800">
          <Search className="w-4 h-4 text-zinc-500 shrink-0" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages, charts, talk…"
            className="flex-1 bg-transparent text-[14px] text-zinc-100 placeholder:text-zinc-600 outline-none"
          />
          <kbd className="hidden sm:inline text-[10px] font-mono text-zinc-600 border border-zinc-800 px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <div className="max-h-[min(62vh,420px)] overflow-y-auto py-1.5">
          {items.length === 0 && (
            <p className="px-4 py-10 text-sm text-zinc-500 text-center">Nothing matches “{q}”.</p>
          )}
          {Object.entries(grouped).map(([group, groupItems]) => (
            <div key={group} className="mb-1">
              <p className="px-4 pt-2 pb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">
                {group}
              </p>
              {groupItems.map((item) => {
                running += 1
                const index = running
                const selected = index === active
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(item.href)}
                    className={`w-full grid grid-cols-[20px_minmax(0,1fr)_minmax(0,11rem)] items-center gap-3 px-4 h-10 text-left ${
                      selected ? "bg-zinc-800/90" : "hover:bg-zinc-900"
                    }`}
                  >
                    <item.Icon className={`w-3.5 h-3.5 ${selected ? "text-zinc-100" : "text-zinc-500"}`} />
                    <span className={`text-[13px] truncate ${selected ? "text-zinc-50" : "text-zinc-200"}`}>
                      {item.label}
                    </span>
                    <span className="text-[11px] text-zinc-500 truncate text-right hidden sm:block">
                      {item.hint}
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="px-4 h-9 border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-600">
          <span>↑↓ move</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </motion.div>
    </div>
  )
}

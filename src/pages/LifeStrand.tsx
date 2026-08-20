import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  FileText,
  Link2,
  Sparkles,
  Target,
  Upload,
} from "lucide-react"
import { useUser } from "@/context/UserContext"
import { useLedger } from "@/context/LedgerContext"
import { LayerChips } from "@/components/strand/LayerChips"
import { LOOP_STAGES, LAYER_META, type LoopStageId, type StrandLayerId } from "@/lib/loop"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

type StrandNode = {
  id: string
  title: string
  subtitle: string
  when: string
  layers: StrandLayerId[]
  stage: LoopStageId
  status?: "open" | "active" | "done" | "due"
  href: string
}

export function LifeStrand() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { predictions, stats } = useLedger()
  const [layers, setLayers] = useState<Set<StrandLayerId>>(new Set(["M", "D", "C", "A"]))
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeStage, setActiveStage] = useState<LoopStageId | null>(null)

  const displayName = user.name?.trim() || "You"
  const isDemo =
    user.email === "arjun.sharma@example.com" || user.id === "u1"

  const nodes = useMemo<StrandNode[]>(() => {
    const base: StrandNode[] = [
      {
        id: "birth",
        title: "Birth · strand origin",
        subtitle: `${user.placeOfBirth || "—"} · ${user.dob || "—"} ${user.timeOfBirth || ""}`,
        when: user.dob || "Origin",
        layers: ["C"],
        stage: "daily_ritual",
        status: "done",
        href: "/app/you",
      },
      {
        id: "natal",
        title: "Natal baseline",
        subtitle: `${user.sunSign} Sun · ${user.ascendant} Lagna · ${user.activeDasha}`,
        when: "Profile",
        layers: ["C"],
        stage: "daily_ritual",
        status: "done",
        href: "/app/you",
      },
      {
        id: "today",
        title: "Today · daily ritual",
        subtitle: `${user.transitPlanet} influencing ${user.transitHouse}`,
        when: "Now",
        layers: ["C", "D"],
        stage: "daily_ritual",
        status: "active",
        href: "/app/today",
      },
    ]

    if (isDemo || user.consultations.length > 0) {
      const c = user.consultations[0]
      base.push({
        id: c?.id || "consult-1",
        title: c ? `Consultation · ${c.astrologerName}` : "Consultation weave",
        subtitle: c?.topic || "Expert input ready to extract",
        when: c?.date || "Recent",
        layers: ["A", "C"],
        stage: "consultation",
        status: "done",
        href: "/app/logger",
      })
    }

    const predNodes: StrandNode[] = predictions.slice(0, 4).map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: `${p.astrologer?.name || "Source"} · ${p.confidence}% conf · ${p.category}`,
      when: p.targetDate?.slice(0, 10) || "Window",
      layers: ["A", "C"] as StrandLayerId[],
      stage: (p.status === "completed" || p.status === "failed"
        ? "verification"
        : "prediction") as LoopStageId,
      status:
        p.status === "completed"
          ? "done"
          : p.status === "failed"
            ? "due"
            : new Date(p.targetDate) <= new Date()
              ? "due"
              : "open",
      href: "/app/ledger",
    }))

    if (isDemo) {
      base.push({
        id: "decision-venus",
        title: "Decision · Venus remedy streak",
        subtitle: "Day 11 of 21 · Beej mantra 108×",
        when: "Active",
        layers: ["D"],
        stage: "decision",
        status: "active",
        href: "/app/sos",
      })
      base.push({
        id: "evidence-bonus",
        title: "Evidence · equity bonus letter",
        subtitle: "Manifest attached to verified finance claim",
        when: "Closed",
        layers: ["M", "A"],
        stage: "evidence",
        status: "done",
        href: "/app/memory",
      })
      base.push({
        id: "pattern-career",
        title: "Pattern · Jupiter 10H career wins",
        subtitle: "Verified career claims cluster under this transit",
        when: "Insight",
        layers: ["A", "C"],
        stage: "ai_pattern",
        status: "active",
        href: "/app/companion",
      })
      base.push({
        id: "future-muhurta",
        title: "Future decision · next muhurta",
        subtitle: "Thu 10:22–12:44 · Rohini — contract window",
        when: "Upcoming",
        layers: ["C", "D"],
        stage: "future_decision",
        status: "open",
        href: "/app/muhurta",
      })
    } else if (predNodes.length === 0) {
      base.push({
        id: "empty-predict",
        title: "No predictions yet",
        subtitle: "A consultation will extract claims onto this strand",
        when: "Next",
        layers: ["A"],
        stage: "consultation",
        status: "open",
        href: "/app/match",
      })
      base.push({
        id: "empty-future",
        title: "Future decision",
        subtitle: "Use muhurta & transits when a choice appears",
        when: "Soon",
        layers: ["D", "C"],
        stage: "future_decision",
        status: "open",
        href: "/app/muhurta",
      })
    }

    return [...base, ...predNodes]
  }, [user, predictions, isDemo])

  const visible = nodes.filter(
    (n) => n.layers.some((l) => layers.has(l)) && (!activeStage || n.stage === activeStage)
  )

  const selected = nodes.find((n) => n.id === selectedId) || visible[0] || null

  const toggleLayer = (id: StrandLayerId) => {
    setLayers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        if (next.size > 1) next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="min-h-full pb-24 md:pb-10">
      {/* Hero identity band */}
      <section className="relative overflow-hidden border-b border-line bg-stars">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/10 via-transparent to-[#060A10]" />
        <div className="absolute -top-24 left-1/3 w-[420px] h-[420px] rounded-full bg-brand/10 blur-[120px] pointer-events-none" />

        <div className="relative page-container max-w-6xl pt-8 pb-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-bright mb-3">
                Life journey map
              </p>
              <h1 className="font-display text-4xl sm:text-5xl text-ink tracking-tight text-balance">
                {displayName}&rsquo;s story,{" "}
                <span className="text-gradient-gold">in one place</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-ink-secondary max-w-xl leading-relaxed">
                See past sessions, saved advice, proof you added, and what&rsquo;s coming next —
                all on one simple timeline.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 min-w-[280px]">
              {[
                { label: "Open advice", value: stats.active, onClick: () => navigate("/app/ledger") },
                { label: "Came true", value: stats.verified, onClick: () => navigate("/app/ledger") },
                {
                  label: "Hit rate",
                  value: stats.total ? `${stats.accuracy}%` : "—",
                  onClick: () => navigate("/app/companion"),
                },
              ].map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={m.onClick}
                  className="rounded-none border border-line bg-surface/70 px-3 py-3 text-left hover:border-brand/40 transition-colors"
                >
                  <p className="font-metric text-xl font-bold text-ink">{m.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink-tertiary mt-1">
                    {m.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <LayerChips active={layers} onToggle={toggleLayer} />

          {/* Stage filter chips */}
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveStage(null)}
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-none border",
                !activeStage
                  ? "border-brand/40 bg-brand/15 text-gold-bright"
                  : "border-line text-ink-tertiary hover:text-ink"
              )}
            >
              All stages
            </button>
            {LOOP_STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStage((prev) => (prev === s.id ? null : s.id))}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-none border",
                  activeStage === s.id
                    ? "border-brand/40 bg-brand/15 text-gold-bright"
                    : "border-line text-ink-tertiary hover:text-ink"
                )}
              >
                {s.short}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="page-container max-w-6xl pt-8 grid lg:grid-cols-12 gap-8">
        {/* Strand timeline */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-ink">Your timeline</h2>
              <p className="text-xs text-ink-tertiary font-mono mt-0.5">
                Past → now → next · {visible.length} items
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={() => navigate("/app/journey")}>
              Full map
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="relative">
            {/* Vertical strand line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/50 via-line-strong to-brand/20" />

            <div className="space-y-3">
              {visible.map((node, i) => {
                const isSel = selected?.id === node.id
                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedId(node.id)}
                    className={cn(
                      "w-full text-left relative pl-10 pr-4 py-4 rounded-none border transition-colors",
                      isSel
                        ? "bg-surface-2 border-brand/40 shadow-glow"
                        : "bg-surface/60 border-line hover:border-line-strong hover:bg-surface"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-[9px] top-1/2 -translate-y-1/2 w-[13px] h-[13px] rounded-full border-2 bg-canvas",
                        node.status === "done" && "border-success bg-success/30",
                        node.status === "active" && "border-gold-bright bg-brand/40 animate-pulse",
                        node.status === "due" && "border-danger bg-danger/30",
                        node.status === "open" && "border-ink-tertiary"
                      )}
                    />
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-tertiary">
                            {node.when}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand">
                            {node.stage.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-ink leading-snug">{node.title}</p>
                        <p className="text-xs text-ink-secondary mt-1 leading-relaxed">{node.subtitle}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {node.layers.map((l) => (
                            <span
                              key={l}
                              className={cn(
                                "font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] border",
                                LAYER_META[l].bg,
                                LAYER_META[l].border,
                                LAYER_META[l].text
                              )}
                            >
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>
                      <StatusIcon status={node.status} />
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Detail + next actions */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="rounded-none border border-line bg-surface p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-tertiary mb-2">
                  Selected node
                </p>
                <h3 className="text-lg font-bold text-ink leading-snug">{selected.title}</h3>
                <p className="text-sm text-ink-secondary mt-2 leading-relaxed">{selected.subtitle}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {selected.layers.map((l) => (
                    <span
                      key={l}
                      className={cn(
                        "text-[11px] px-2 py-1 rounded-none border",
                        LAYER_META[l].bg,
                        LAYER_META[l].border,
                        LAYER_META[l].text
                      )}
                    >
                      {LAYER_META[l].name}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  <Button className="w-full justify-between" onClick={() => navigate(selected.href)}>
                    Open stage
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => navigate("/app/companion")}
                  >
                    Ask patterns about this
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rounded-none border border-line bg-surface-2/40 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold-bright mb-3">
              Quick actions
            </p>
            <div className="space-y-2">
              {[
                {
                  icon: Sparkles,
                  label: "Talk to an astrologer",
                  blurb: "Chat, call, or video — live",
                  href: "/app/consult",
                },
                {
                  icon: Target,
                  label: "My saved advice",
                  blurb: "What experts said, with dates",
                  href: "/app/ledger",
                },
                {
                  icon: Upload,
                  label: "Add proof",
                  blurb: "Upload a document or note",
                  href: "/app/memory",
                },
                {
                  icon: CheckCircle2,
                  label: "Mark what came true",
                  blurb: "Yes / partly / no",
                  href: "/app/ledger",
                },
                {
                  icon: FileText,
                  label: "Today’s guide",
                  blurb: "Free daily tips",
                  href: "/app/today",
                },
              ].map((a) => (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => navigate(a.href)}
                  className="w-full flex items-start gap-3 rounded-none border border-line bg-surface/50 px-3 py-3 text-left hover:border-brand/35 transition-colors"
                >
                  <a.icon className="w-4 h-4 text-gold-bright mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-sm font-semibold text-ink">{a.label}</span>
                    <span className="block text-xs text-ink-tertiary mt-0.5">{a.blurb}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-none border border-dashed border-line px-4 py-3 flex items-start gap-2">
            <Link2 className="w-4 h-4 text-ink-tertiary mt-0.5 shrink-0" />
            <p className="text-xs text-ink-tertiary leading-relaxed">
              Prefer Home for chat and calls. This page is just your personal history map.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusIcon({ status }: { status?: StrandNode["status"] }) {
  if (status === "done") return <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
  if (status === "active") return <Circle className="w-4 h-4 text-gold-bright shrink-0 fill-brand/40" />
  if (status === "due") return <Circle className="w-4 h-4 text-danger shrink-0" />
  return <Circle className="w-4 h-4 text-ink-quaternary shrink-0" />
}

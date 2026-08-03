import { useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import {
  Target, ArrowRight, ChevronRight, Activity, CheckCircle2, Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { CosmicHero } from "@/components/visual/CosmicHero"
import {
  mockPredictions, mockConsultations, mockChartData
} from "@/lib/mock-data"
import {
  AreaChart, Area, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts"

// ── Interactive Cosmic Field ───────────────────────────────────────────
const PLANETS = [
  { name: "Sun", sign: "Leo 14°", house: "1st House", status: "Natal Ruler", angle: 30, color: "#F59E0B", r: 84 },
  { name: "Jupiter", sign: "Taurus 22°", house: "10th House", status: "Career Trine (Active)", angle: 120, color: "#D97706", r: 114 },
  { name: "Venus", sign: "Cancer 08°", house: "12th House", status: "Remedy Day 11", angle: 210, color: "#EC4899", r: 144 },
  { name: "Mercury", sign: "Leo 02°", house: "1st House", status: "Direct in 3 Days", angle: 300, color: "#38BDF8", r: 174 },
]

function InteractiveCosmicRing({ score }: { score: number }) {
  const [activePlanet, setActivePlanet] = useState(PLANETS[1])
  const [hovered, setHovered] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
      {/* LEFT: Contextual Overview */}
      <div className="max-w-xl space-y-6 text-left">
        <div className="inline-flex items-center gap-2.5 font-mono text-[11px] text-gold-bright/90 tracking-[0.16em] uppercase">
          <span className="inline-block w-2 h-2 rounded-full bg-brand animate-pulse" />
          Live Celestial Transit Engine
        </div>

        <p className="font-mono text-xs text-ink-tertiary uppercase tracking-[0.14em]">
          Leo Sun · Scorpio Ascendant
        </p>
        <p className="text-sm text-ink-secondary leading-relaxed max-w-lg">
          Active <span className="text-gold-light font-mono">Jupiter 10th House Transit</span> — forming a
          120° trine with your natal Sun. High momentum for professional breakthroughs over the next 72 hours.
        </p>

        {/* Selected Planet Insight — hairline card, sharp corners */}
        <div className="p-5 border-l-2 border-gold-bright/60 bg-white/[0.03] backdrop-blur-sm transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activePlanet.color }} />
              <p className="text-sm font-medium text-ink">
                {activePlanet.name} in <span className="font-mono text-gold-light">{activePlanet.sign}</span>
              </p>
            </div>
            <span className="font-mono text-[10px] text-gold-bright/90 tracking-[0.12em] uppercase">
              {activePlanet.house}
            </span>
          </div>
          <p className="text-xs text-ink-secondary leading-relaxed">
            {activePlanet.status} — {activePlanet.name} aligns with your career axis. Ideal window for
            negotiations, launches, and decisive conversations.
          </p>
        </div>

        {/* Orbit Controls — sharp, no pills */}
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-[0.14em]">Select</span>
          <div className="flex gap-px bg-white/5">
            {PLANETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setActivePlanet(p)}
                className={`px-3 py-1.5 font-mono text-[11px] transition-all duration-150 ${
                  activePlanet.name === p.name
                    ? "bg-brand text-white"
                    : "bg-surface text-ink-secondary hover:bg-surface-2 hover:text-ink"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Orbital Centerpiece */}
      <div
        className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center shrink-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glowing center core */}
        <div
          className={`absolute w-24 h-24 rounded-full bg-[radial-gradient(circle_at_35%_30%,#FDE68A,#F59E0B_45%,#B45309_80%)] shadow-[0_0_50px_rgba(245,158,11,0.5)] flex flex-col items-center justify-center text-center z-20 cursor-pointer transition-transform duration-500 ${
            hovered ? "scale-105" : ""
          }`}
        >
          <span className="font-mono text-[9px] text-white/80 uppercase tracking-[0.22em]">Alignment</span>
          <span className="font-metric text-3xl font-bold text-white tabular-nums leading-none">{score}</span>
          <span className="font-mono text-[9px] text-white/70 uppercase tracking-[0.14em] mt-0.5 block">
            / 100 today
          </span>
        </div>

        {/* SVG orbital system */}
        <svg width="384" height="384" viewBox="0 0 384 384" className="absolute inset-0 w-full h-full">
          {PLANETS.map((p, idx) => (
            <circle
              key={`orbit-${p.name}`}
              cx="192" cy="192" r={p.r}
              fill="none"
              stroke={activePlanet.name === p.name ? p.color : "rgba(255,255,255,0.12)"}
              strokeWidth={activePlanet.name === p.name ? "1.5" : "0.8"}
              strokeDasharray={idx % 2 === 0 ? "3 5" : "none"}
              className="transition-colors duration-200"
            />
          ))}
          {PLANETS.map((p) => {
            const isSelected = activePlanet.name === p.name
            const rad = (p.angle * Math.PI) / 180
            const cx = 192 + p.r * Math.cos(rad)
            const cy = 192 + p.r * Math.sin(rad)
            return (
              <g key={`node-${p.name}`} className="cursor-pointer" onClick={() => setActivePlanet(p)}>
                {isSelected && (
                  <circle cx={cx} cy={cy} r="14" fill={p.color} fillOpacity="0.22">
                    <animate attributeName="r" values="10;17;10" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={cx} cy={cy}
                  r={isSelected ? "5.5" : "4"}
                  fill={p.color}
                  stroke="#0F1623"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />
              </g>
            )
          })}
        </svg>

        {/* Outer rotating astrolabe ring */}
        <div className="absolute inset-0 rounded-full border border-line border-dashed animate-orbit-reverse pointer-events-none" />
      </div>
    </div>
  )
}

// ── Custom Tooltip ──────────────────────────────────────────────────────
function CustomChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface-2 text-ink border border-line rounded-md px-3 py-2 shadow-xl font-mono text-xs">
      <p className="font-bold text-gold-light mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-ink-secondary">
          {p.name}: <span className="font-bold text-ink">{p.value}{p.name === "score" ? "/10" : "%"}</span>
        </p>
      ))}
    </div>
  )
}

// ── Content section component for ivory band ───────────────────────────
function SectionHeader({ kicker, title, caption, action }: {
  kicker: string
  title: string
  caption?: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-end justify-between gap-4 pb-5 border-b border-ivory-border">
      <div>
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-brand">{kicker}</p>
        <h2 className="font-display text-3xl text-ink-ivory mt-1 tracking-tight">{title}</h2>
        {caption && <p className="text-[13px] text-ink-ivory-tertiary mt-0.5">{caption}</p>}
      </div>
      {action}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
export function Dashboard() {
  const navigate = useNavigate()
  const todayDate = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  const activePredictions = mockPredictions.filter(p => p.status === "pending")

  return (
    <div className="min-h-full">
      {/* ══ DARK COSMIC HERO + COSMIC FIELD ══════════════════════════════ */}
      <CosmicHero
        eyebrow={todayDate.toUpperCase()}
        title={<>Your Cosmic Field</>}
        subtitle="Live planetary transits mapped against your natal chart — select any planet to read its current alignment."
      >
        <InteractiveCosmicRing score={88} />
      </CosmicHero>

      {/* ══ IVORY CONTENT BAND ═══════════════════════════════════════════ */}
      <div className="ivory-content">
        <div className="cosmic-seam" />

        {/* Unfolding Predictions + AI Coach */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: Unfolding Predictions */}
            <div className="lg:col-span-7">
              <SectionHeader
                kicker="Proof Engine"
                title="Unfolding Predictions"
                caption="Verified with real-world outcomes over time"
                action={
                  <Button variant="ghost" size="sm" onClick={() => navigate("/app/predictions")} className="text-ink-ivory-tertiary hover:text-ink-ivory">
                    View All <ChevronRight className="w-4 h-4" />
                  </Button>
                }
              />

              <div className="mt-6 space-y-4">
                {activePredictions.map((pred) => {
                  const daysRemaining = Math.max(0, Math.ceil((new Date(pred.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                  return (
                    <div
                      key={pred.id}
                      onClick={() => navigate("/app/predictions")}
                      className="group cursor-pointer bg-ivory-card border border-ivory-border hover:border-brand/50 shadow-xs hover:shadow-md transition-all duration-200 px-5 py-4"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <Target className="w-4 h-4 text-brand shrink-0" />
                          <p className="text-sm font-medium text-ink-ivory group-hover:text-brand transition-colors">
                            {pred.content}
                          </p>
                        </div>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 bg-brand-tint text-brand rounded-[2px] shrink-0">
                          {pred.confidenceLevel}% CONF
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between font-mono text-[11px] text-ink-ivory-tertiary">
                          <span>Verification Window</span>
                          <span className="font-medium text-ink-ivory">
                            {daysRemaining > 0 ? `${daysRemaining} days` : "Active Now"}
                          </span>
                        </div>
                        <Progress value={pred.confidenceLevel} color="brand" className="h-1" />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-ivory-border font-mono text-[11px] text-ink-ivory-tertiary">
                        <span>{new Date(pred.targetDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span className="text-brand font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Attach Evidence <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT: AI Coach Prep */}
            <div className="lg:col-span-5">
              <SectionHeader
                kicker="AI Coach"
                title="Session Prep"
                caption="Pre-consultation agenda"
              />

              <div className="mt-6 space-y-5">
                <div className="bg-ivory-card border border-ivory-border p-5 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-brand">
                    <Activity className="w-3.5 h-3.5" /> Recommended Focus
                  </div>
                  <p className="text-sm font-medium text-ink-ivory">
                    Ask Dr. Sarah Chen about the upcoming Rahu Mahadasha transition on Aug 25.
                  </p>
                  <p className="text-[13px] text-ink-ivory-secondary leading-relaxed">
                    Your previous session covered Jupiter 10th house. Align career timing with your long-term wealth path.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-ivory-tertiary">Agenda</p>
                  {[
                    "Clarify job offer negotiation parameters",
                    "Review Venus Beej Mantra remedy results (Day 11)",
                    "Confirm financial investment timing window",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 px-3 py-2.5 text-[13px] text-ink-ivory-secondary">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Button variant="primary" className="w-full" onClick={() => navigate("/app/companion")}>
                  <Sparkles className="w-4 h-4" /> Generate Personalized Agenda
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Life Balance */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-8 border-t border-ivory-border">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Emotional Trends */}
            <div className="lg:col-span-7">
              <SectionHeader
                kicker="Tracking"
                title="Clarity & Growth"
                caption="14 consultations across 7 months"
                action={<Badge variant="success" size="sm" className="font-mono">+80% CLARITY</Badge>}
              />
              <div className="mt-6 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockChartData.moodEvolution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="clarityGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D97706" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#78716C" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#78716C" }} axisLine={false} tickLine={false} domain={[0, 10]} />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Area type="monotone" dataKey="score" stroke="#D97706" strokeWidth={2.5} fill="url(#clarityGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Life Domain Radar */}
            <div className="lg:col-span-5">
              <SectionHeader
                kicker="Balance"
                title="Cosmic Radar"
                caption="Strength across life sectors"
              />
              <div className="mt-6 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                    { subject: "Career", A: 92 },
                    { subject: "Finance", A: 78 },
                    { subject: "Relations", A: 85 },
                    { subject: "Health", A: 70 },
                    { subject: "Spirituality", A: 88 },
                  ]}>
                    <PolarGrid stroke="rgba(28,25,23,0.12)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#57534E", fontWeight: 600 }} />
                    <Radar name="Domain Alignment" dataKey="A" stroke="#D97706" strokeWidth={2} fill="#D97706" fillOpacity={0.18} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-8 pb-16 border-t border-ivory-border">
          <SectionHeader
            kicker="Memory"
            title="Recent Consultations"
            caption="Archived in Cosmic Memory with verified notes"
            action={
              <Button variant="ivory" size="sm" onClick={() => navigate("/app/logger")}>
                Consultation Logs <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            }
          />

          <div className="mt-6 grid sm:grid-cols-3 gap-5">
            {mockConsultations.map((consult) => (
              <div
                key={consult.id}
                onClick={() => navigate("/app/logger")}
                className="bg-ivory-card border border-ivory-border hover:border-brand/50 hover:shadow-md transition-all duration-150 cursor-pointer px-5 py-4 space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-[4px] bg-brand-tint text-brand flex items-center justify-center font-mono font-bold text-xs">
                    {consult.astrologerName.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-metric text-xs font-semibold text-brand">
                    ★ {consult.rating}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-ink-ivory line-clamp-1">{consult.topic}</h4>
                  <p className="text-[12px] text-ink-ivory-tertiary mt-1 font-mono">
                    {consult.astrologerName} · {consult.durationMinutes} MIN
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-ivory-border font-mono text-[11px] text-ink-ivory-tertiary">
                  <span>{new Date(consult.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  <span className="font-medium text-ink-ivory">₹{consult.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
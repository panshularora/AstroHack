/* ═══════════════════════════════════════════════════════════════════════════
   Per-page hero visualizations — each page gets its own memorable cosmic mark.
   All live on the dark hero band, rendered in SVG for crispness + motion.
   ═══════════════════════════════════════════════════════════════════════════ */

interface VizProps {
  size?: number
  className?: string
}

/* ── DASHBOARD: Interactive Cosmic Field ─────────────────────────────── */
export function CosmicFieldViz({ size = 420, className }: VizProps) {
  const planets = [
    { name: "Sun", color: "#F59E0B", angle: 30, r: 84 },
    { name: "Jupiter", color: "#D97706", angle: 120, r: 114 },
    { name: "Venus", color: "#EC4899", angle: 210, r: 144 },
    { name: "Mercury", color: "#38BDF8", angle: 300, r: 174 },
  ]
  const cx = 210
  const cy = 210

  return (
    <div className={`relative mx-auto aspect-square ${className ?? ""}`} style={{ width: size, maxWidth: "100%" }}>
      {/* Core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full bg-[radial-gradient(circle_at_35%_30%,#FDE68A,#F59E0B_45%,#B45309_80%)] shadow-[0_0_50px_rgba(245,158,11,0.4)] flex flex-col items-center justify-center">
        <span className="font-mono text-[9px] text-white/80 uppercase tracking-[0.22em]">Alignment</span>
        <span className="font-metric text-2xl md:text-3xl font-bold text-white tabular-nums leading-none">88</span>
      </div>

      <svg viewBox="0 0 420 420" className="absolute inset-0 w-full h-full">
        {/* Rotating orbits */}
        {[0, 1].map((layer) => (
          <g key={layer} className="animate-orbit" style={{ animationDuration: `${40 + layer * 25}s`, transformOrigin: "210px 210px" }}>
            {planets.slice(layer, layer + 2).map((p) => (
              <circle
                key={p.name}
                cx={cx} cy={cy} r={p.r}
                fill="none"
                stroke={p.color}
                strokeWidth="0.8"
                strokeOpacity="0.35"
                strokeDasharray="2 4"
              />
            ))}
          </g>
        ))}
        {/* Static guide rings */}
        {planets.map((p) => (
          <circle key={`ring-${p.name}`} cx={cx} cy={cy} r={p.r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        ))}
        {/* Planet nodes */}
        {planets.map((p) => {
          const rad = (p.angle * Math.PI) / 180
          const px = cx + p.r * Math.cos(rad)
          const py = cy + p.r * Math.sin(rad)
          return (
            <g key={`node-${p.name}`}>
              <circle cx={px} cy={py} r="12" fill={p.color} opacity="0.12">
                <animate attributeName="r" values="8;15;8" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle cx={px} cy={py} r="4.5" fill={p.color} stroke="#0F1623" strokeWidth="2" />
            </g>
          )
        })}
        {/* Constellation lines */}
        <line x1="112" y1="220" x2="252" y2="150" stroke="rgba(245,158,11,0.15)" strokeWidth="0.6" strokeDasharray="3 5" />
        <line x1="252" y1="150" x2="330" y2="86" stroke="rgba(245,158,11,0.15)" strokeWidth="0.6" strokeDasharray="3 5" />
      </svg>

      {/* Outer rotating astrolabe ring */}
      <div className="absolute inset-0 rounded-full border border-line/60 border-dashed animate-orbit-reverse pointer-events-none" />
    </div>
  )
}

/* ── PREDICTIONS: Prediction Timeline Universe ───────────────────────── */
export function TimelineUniverseViz({ className }: VizProps) {
  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className ?? ""}`}>
      <svg viewBox="0 0 640 260" className="w-full h-auto" fill="none">
        {/* Timeline axis */}
        <line x1="24" y1="130" x2="616" y2="130" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        {/* Nodes on the prediction timeline — past verified, present active, future emerging */}
        <g>
          <circle cx="92" cy="130" r="4" fill="#34D399" />
          <circle cx="92" cy="130" r="9" stroke="#34D399" strokeOpacity="0.3" strokeWidth="1">
            <animate attributeName="r" values="8;13;8" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="92" y="100" textAnchor="middle" fill="#34D399" fontSize="10" fontFamily="Geist Mono, monospace">VERIFIED</text>
          <text x="92" y="165" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Geist Mono, monospace">AUG 02</text>
        </g>
        <g>
          <circle cx="252" cy="130" r="5" fill="#F59E0B" />
          <circle cx="252" cy="130" r="12" stroke="#F59E0B" strokeOpacity="0.4" strokeWidth="1.2">
            <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="252" y="100" textAnchor="middle" fill="#FDE68A" fontSize="10" fontFamily="Geist Mono, monospace">IN WINDOW</text>
          <text x="252" y="165" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Geist Mono, monospace">AUG 18</text>
        </g>
        <g>
          <circle cx="420" cy="130" r="4" fill="#38BDF8" />
          <circle cx="420" cy="130" r="9" stroke="#38BDF8" strokeOpacity="0.25" strokeWidth="1">
            <animate attributeName="r" values="8;12;8" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <text x="420" y="100" textAnchor="middle" fill="#7DD3FC" fontSize="10" fontFamily="Geist Mono, monospace">TRACKING</text>
          <text x="420" y="165" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Geist Mono, monospace">SEP 04</text>
        </g>
        <g>
          <circle cx="568" cy="130" r="3.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeDasharray="2 2" />
          <text x="568" y="100" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Geist Mono, monospace">FUTURE</text>
          <text x="568" y="165" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Geist Mono, monospace">OCT 12</text>
        </g>
        {/* Orbits around active node */}
        <circle cx="252" cy="130" r="28" stroke="rgba(245,158,11,0.15)" strokeWidth="0.7" strokeDasharray="2 3" />
        <circle cx="252" cy="130" r="42" stroke="rgba(245,158,11,0.1)" strokeWidth="0.7" strokeDasharray="2 3" />
      </svg>
    </div>
  )
}

/* ── COSMIC MEMORY: Galaxy Timeline ──────────────────────────────────── */
export function GalaxyTimelineViz({ className }: VizProps) {
  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className ?? ""}`}>
      <svg viewBox="0 0 640 300" className="w-full h-auto" fill="none">
        {/* Galaxy spiral arm */}
        <path
          d="M320 150 C 320 100, 380 70, 440 100 C 500 130, 490 210, 420 230 C 350 250, 280 200, 300 150"
          stroke="rgba(245,158,11,0.25)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          fill="none"
        />
        <path
          d="M320 150 C 320 200, 260 230, 200 200 C 140 170, 150 90, 220 70 C 290 50, 360 100, 340 150"
          stroke="rgba(56,189,248,0.2)"
          strokeWidth="1.2"
          strokeDasharray="3 7"
          fill="none"
        />
        {/* Galaxy core */}
        <circle cx="320" cy="150" r="14" fill="#F59E0B" opacity="0.9" />
        <circle cx="320" cy="150" r="26" stroke="#F59E0B" strokeOpacity="0.25" strokeWidth="1">
          <animate attributeName="r" values="24;34;24" dur="4s" repeatCount="indefinite" />
        </circle>
        {/* Memory moments along the arm */}
        {[
          { x: 200, y: 96, color: "#34D399" },
          { x: 440, y: 120, color: "#38BDF8" },
          { x: 480, y: 200, color: "#EC4899" },
          { x: 200, y: 240, color: "#F59E0B" },
        ].map((m, i) => (
          <g key={i}>
            <circle cx={m.x} cy={m.y} r="4" fill={m.color} />
            <circle cx={m.x} cy={m.y} r="9" stroke={m.color} strokeOpacity="0.3" strokeWidth="1">
              <animate attributeName="r" values="7;12;7" dur={`${2.4 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {/* Labels */}
        <text x="200" y="82" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="Geist Mono, monospace">2024 · REMEDY WINDOW</text>
        <text x="480" y="230" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="Geist Mono, monospace">2025 · JUPITER RETURN</text>
      </svg>
    </div>
  )
}

/* ── REPORTS: Animated Constellation Analytics ───────────────────────── */
export function ConstellationAnalyticsViz({ className }: VizProps) {
  const stars = [
    { x: 60, y: 60 }, { x: 140, y: 40 }, { x: 220, y: 90 }, { x: 180, y: 180 },
    { x: 90, y: 190 }, { x: 300, y: 60 }, { x: 370, y: 140 }, { x: 280, y: 200 },
    { x: 420, y: 90 }, { x: 480, y: 170 }, { x: 540, y: 80 }, { x: 560, y: 200 },
  ]
  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
    [2, 5], [5, 6], [6, 7], [7, 3],
    [6, 8], [8, 9], [9, 10], [10, 11], [11, 8], [9, 7],
  ]

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className ?? ""}`}>
      <svg viewBox="0 0 620 260" className="w-full h-auto" fill="none">
        {/* Constellation links */}
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={stars[a].x} y1={stars[a].y}
            x2={stars[b].x} y2={stars[b].y}
            stroke="rgba(245,158,11,0.22)"
            strokeWidth="0.8"
            strokeDasharray="3 5"
          >
            <animate attributeName="stroke-opacity" values="0.15;0.4;0.15" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
          </line>
        ))}
        {/* Nodes */}
        {stars.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r="2.5" fill={i % 3 === 0 ? "#F59E0B" : "#FDE68A"} />
            <circle cx={s.x} cy={s.y} r="6" stroke={i % 3 === 0 ? "#F59E0B" : "#FDE68A"} strokeOpacity="0.25" strokeWidth="1">
              <animate attributeName="r" values="5;9;5" dur={`${2 + (i % 5)}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {/* Caption */}
        <text x="310" y="248" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Geist Mono, monospace" letterSpacing="2">
          CLARITY TREND · 92% ALIGNMENT · 7 CONSULTATIONS
        </text>
      </svg>
    </div>
  )
}

/* ── AI COMPANION: Neural Orbital Network ────────────────────────────── */
export function NeuralOrbitalViz({ className }: VizProps) {
  const nodes = [
    { x: 310, y: 130, r: 10, color: "#F59E0B" },
    { x: 240, y: 80, r: 6, color: "#38BDF8" },
    { x: 380, y: 80, r: 6, color: "#EC4899" },
    { x: 200, y: 160, r: 6, color: "#34D399" },
    { x: 420, y: 160, r: 6, color: "#A78BFA" },
    { x: 240, y: 210, r: 5, color: "#FDE68A" },
    { x: 380, y: 210, r: 5, color: "#FDE68A" },
  ]
  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [3, 5], [4, 6], [1, 3], [2, 4],
  ]

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className ?? ""}`}>
      <svg viewBox="0 0 620 280" className="w-full h-auto" fill="none">
        {/* Orbit around core */}
        <ellipse cx="310" cy="130" rx="120" ry="52" stroke="rgba(245,158,11,0.15)" strokeWidth="0.8" strokeDasharray="3 6" className="animate-orbit" style={{ transformOrigin: "310px 130px" }} />
        <ellipse cx="310" cy="130" rx="150" ry="66" stroke="rgba(56,189,248,0.12)" strokeWidth="0.8" strokeDasharray="3 6" className="animate-orbit-reverse" style={{ transformOrigin: "310px 130px" }} />
        {/* Neural edges */}
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.7"
          >
            <animate attributeName="stroke-opacity" values="0.08;0.25;0.08" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
          </line>
        ))}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity="0.9" />
            <circle cx={n.x} cy={n.y} r={n.r + 6} stroke={n.color} strokeOpacity="0.25" strokeWidth="1">
              <animate attributeName="r" values={`${n.r + 4};${n.r + 10};${n.r + 4}`} dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {/* Pulse along a key edge (neural signal) */}
        <circle r="2.5" fill="#FDE68A">
          <animateMotion dur="3s" repeatCount="indefinite" path="M310 130 L240 80" />
          <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite" />
        </circle>
        <text x="310" y="268" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Geist Mono, monospace" letterSpacing="2">
          AI COMPANION · CONTINUOUS ORBITAL REASONING
        </text>
      </svg>
    </div>
  )
}

/* ── CONSULTATIONS: Celestial Calendar ───────────────────────────────── */
export function CelestialCalendarViz({ className }: VizProps) {
  const days = Array.from({ length: 14 }, (_, i) => 5 + i)
  const markers = [1, 3, 6, 9, 11]

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className ?? ""}`}>
      <svg viewBox="0 0 640 240" className="w-full h-auto" fill="none">
        {/* Calendar ring */}
        <circle cx="320" cy="120" r="80" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        <circle cx="320" cy="120" r="105" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="3 5" />
        {/* Day nodes around ring */}
        {days.map((d, i) => {
          const rad = ((i / days.length) * 360 - 90) * (Math.PI / 180)
          const x = 320 + 80 * Math.cos(rad)
          const y = 120 + 80 * Math.sin(rad)
          const hasMark = markers.includes(i)
          return (
            <g key={d}>
              <circle
                cx={x} cy={y}
                r={hasMark ? 5 : 2.5}
                fill={hasMark ? "#F59E0B" : "rgba(255,255,255,0.35)"}
              />
              {hasMark && (
                <circle cx={x} cy={y} r="10" stroke="#F59E0B" strokeOpacity="0.3" strokeWidth="1">
                  <animate attributeName="r" values="8;14;8" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              <text x={x} y={y - 12} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Geist Mono, monospace">
                {d}
              </text>
            </g>
          )
        })}
        {/* Center label */}
        <text x="320" y="112" textAnchor="middle" fill="#FDE68A" fontSize="11" fontFamily="Geist Mono, monospace" letterSpacing="2">
          AUG·SEP
        </text>
        <text x="320" y="130" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Geist Mono, monospace">
          14-WEEK FORECAST
        </text>
        {/* Moons */}
        <circle cx="320" cy="120" r="14" fill="#F59E0B" opacity="0.12" />
        <circle cx="326" cy="114" r="14" fill="#080C14" />
      </svg>
    </div>
  )
}
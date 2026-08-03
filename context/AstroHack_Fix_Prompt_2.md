# AstroHack — Fix Prompt 2: The Remaining Broken Files

Paste this entire prompt into Cursor / Claude Code with the repo open. These are all based on the actual source code.

---

## PROMPT

You are fixing the remaining broken components in the AstroLive 2.0 hackathon project. The design system in `src/index.css` is the source of truth. Do NOT modify `index.css`, `package.json`, `src/routes/index.tsx`, or `src/lib/mock-data.ts`.

---

### FIX 1 — StepResults.tsx (Smart Match results — worst file in the codebase)

**File:** `src/components/match/StepResults.tsx`

This file is completely using the old design system. It has `bg-card`, `border-white/10`, `rounded-3xl`, `text-secondary-text`, `bg-primary`, `text-lavender`, `border-primary`, `border-navy`, `shadow-[0_0_20px_rgba(107,33,168,0.2)]`. Full rewrite of the JSX:

```tsx
import { motion } from "framer-motion"
import { ShieldCheck, MessageCircle, Phone, Video, Calendar, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import type { Astrologer } from "@/lib/mock-data"

interface StepResultsProps {
  results: Astrologer[]
  onReset: () => void
}

export function StepResults({ results, onReset }: StepResultsProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      key="step-results"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2 className="font-display text-h1 text-ink tracking-tight">Your Verified Matches</h2>
        <p className="text-sm text-ink-secondary mt-1">
          Matched to your birth chart transits, Dasha cycle, and consultation focus.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {results.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`p-6 rounded-lg border bg-surface transition-all duration-150 hover:border-brand/40 hover:shadow-md ${
              i === 0 ? "border-brand/50 bg-surface-2/50" : "border-line"
            }`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-brand/20 to-brand-hover/10 border border-brand/30 flex items-center justify-center font-mono font-bold text-base text-gold-bright shrink-0">
                  {a.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-bold text-ink">{a.name}</h3>
                    {i === 0 && (
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 bg-brand-light text-brand border border-brand/20 rounded-[2px]">
                        #1 Match
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-ink-tertiary">
                    {a.specialties.join(" · ")} · {a.yearsExperience}y exp
                  </p>
                </div>
              </div>

              {/* Price + availability */}
              <div className="text-right shrink-0">
                <p className="font-metric text-lg font-bold text-ink">₹{a.pricePerMinute}<span className="text-xs font-sans text-ink-tertiary font-normal">/min</span></p>
                <div className="flex items-center gap-1.5 justify-end mt-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${a.availability === "online" ? "bg-success" : "bg-warning"}`} />
                  <span className="font-mono text-[10px] text-ink-tertiary capitalize">{a.availability}</span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 mb-4 font-mono text-xs">
              <span className="flex items-center gap-1.5 text-gold-bright">
                <Star className="w-3.5 h-3.5 fill-gold-bright" />
                <span className="font-bold">{a.rating}</span>
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>{a.verifiedAccuracy}% accuracy</span>
              </span>
              <span className="flex items-center gap-1.5 text-ink-secondary">
                <Users className="w-3.5 h-3.5" />
                <span>{a.consultationCount}+ sessions</span>
              </span>
              <span className="text-ink-tertiary">
                {a.languages.join(", ")}
              </span>
            </div>

            {/* Why this match */}
            {a.recommendationReason && (
              <div className="p-4 mb-5 bg-brand-tint border border-brand/15 rounded-md">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand mb-1.5 font-bold">
                  Why this match
                </p>
                <p className="text-xs text-ink-secondary leading-relaxed">{a.recommendationReason}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2.5">
              <Button
                size="sm"
                className="rounded-md font-mono"
                onClick={() => navigate(`/app/room/${a.id}`)}
              >
                <MessageCircle className="w-3.5 h-3.5" /> Chat Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md font-mono"
                onClick={() => navigate(`/app/room/${a.id}`)}
              >
                <Phone className="w-3.5 h-3.5" /> Voice
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-md font-mono"
                onClick={() => navigate(`/app/room/${a.id}`)}
              >
                <Video className="w-3.5 h-3.5" /> Video
              </Button>
              <Button variant="ghost" size="sm" className="rounded-md font-mono text-ink-secondary">
                <Calendar className="w-3.5 h-3.5" /> Schedule
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="font-mono text-xs text-ink-tertiary hover:text-ink underline underline-offset-2 transition-colors"
      >
        ← Start over
      </button>
    </motion.div>
  )
}
```

---

### FIX 2 — ContextPanel.tsx (AI Companion context panel)

**File:** `src/components/companion/ContextPanel.tsx`

Completely broken: uses `bg-card`, `rounded-3xl`, `bg-primary/5 rounded-full blur-3xl`, `text-primary`, `text-[#9CA3AF]`, `border-white/10`. Full rewrite:

```tsx
import { useState } from "react"
import { Settings2, Database, Check, Minus } from "lucide-react"

export function ContextPanel() {
  const [toggles, setToggles] = useState({
    consultations: true,
    predictions: true,
    remedies: true,
    journal: false,
    mood: true,
    timeline: true,
  })

  const toggle = (key: keyof typeof toggles) =>
    setToggles(prev => ({ ...prev, [key]: !prev[key] }))

  const items = [
    { key: "consultations", label: "Consultation History", desc: "Past transcripts and summaries" },
    { key: "predictions",   label: "Active Predictions",   desc: "Upcoming and verified outcomes" },
    { key: "remedies",      label: "Remedies & Habits",    desc: "Streaks and daily practices" },
    { key: "journal",       label: "Private Journal",      desc: "Personal notes and reflections" },
    { key: "mood",          label: "Mood History",         desc: "Emotional tracking data" },
    { key: "timeline",      label: "Life Timeline",        desc: "Major milestones and events" },
  ] as const

  return (
    <div className="p-5 rounded-lg bg-surface border border-line h-full space-y-5">
      <div className="flex items-center justify-between border-b border-line/60 pb-4">
        <div className="flex items-center gap-2.5">
          <Settings2 className="w-4 h-4 text-brand" />
          <h3 className="text-sm font-bold text-ink">AI Context Controls</h3>
        </div>
        <Database className="w-3.5 h-3.5 text-ink-tertiary" />
      </div>

      <p className="text-xs text-ink-secondary leading-relaxed">
        Toggle which memory sources the AI uses to reason. Your data is never shared without permission.
      </p>

      <div className="space-y-1">
        {items.map(({ key, label, desc }) => (
          <div
            key={key}
            onClick={() => toggle(key)}
            className="flex items-center justify-between py-2.5 px-3 rounded-md hover:bg-surface-2/60 cursor-pointer transition-soft group"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink group-hover:text-ink truncate">{label}</p>
              <p className="text-[11px] text-ink-tertiary font-mono mt-0.5 truncate">{desc}</p>
            </div>
            <div className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors shrink-0 ml-3 ${
              toggles[key] ? "bg-brand justify-end" : "bg-surface-3 justify-start"
            }`}>
              <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-line/60">
        <div className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-success" />
          <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-[0.12em]">
            {Object.values(toggles).filter(Boolean).length} of {items.length} sources active
          </span>
        </div>
      </div>
    </div>
  )
}
```

---

### FIX 3 — CompanionHeader.tsx

**File:** `src/components/companion/CompanionHeader.tsx`

Uses `bg-gradient-to-tr from-primary to-blue-500`, `rounded-2xl`, `bg-green-400`, `bg-card`, `border-white/10`, `text-[#9CA3AF]`, `text-lavender`. Replace the entire return JSX:

```tsx
return (
  <div className="flex items-center justify-between gap-6 mb-8 pb-6 border-b border-line/60">
    <div className="flex items-center gap-3.5">
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-brand" />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-canvas" />
      </div>
      <div>
        <h1 className="font-display text-h1 text-ink tracking-tight">{mockDailyCheckIn.greeting}</h1>
        <p className="font-mono text-[10px] text-brand uppercase tracking-[0.14em] mt-0.5">
          Memory Active · Leo Sun · Rahu Dasha
        </p>
      </div>
    </div>

    <div className="flex items-center gap-6 bg-surface-2 border border-line rounded-lg px-5 py-3 shrink-0 font-mono">
      <div>
        <p className="text-[9px] text-ink-tertiary uppercase tracking-[0.12em] mb-0.5">Cosmic Streak</p>
        <p className="text-sm font-bold text-ink">{mockDailyCheckIn.streak} Days</p>
      </div>
      <div className="w-px h-8 bg-line" />
      <div>
        <p className="text-[9px] text-ink-tertiary uppercase tracking-[0.12em] mb-0.5">Remedy Due</p>
        <p className="text-sm font-bold text-gold-bright">{mockDailyCheckIn.pendingRemedies} Active</p>
      </div>
    </div>
  </div>
)
```

Keep all existing imports but remove `BrainCircuit` and `Activity` if they're no longer used (add `Sparkles` if not already imported).

---

### FIX 4 — AICompanion.tsx — add markdown rendering and fix the memory context panel

**File:** `src/pages/AICompanion.tsx`

The right sidebar "Memory Context" panel currently shows `"45 min last"` as a label for Consultations — this is confusing. The value comes from `mockLatestSession.duration`. Fix the label:

Find:
```tsx
<span className="font-bold text-ink">{mockLatestSession.duration} min last</span>
```
Replace with:
```tsx
<span className="font-bold text-ink">{mockLatestSession.duration} min</span>
```
And add a sub-label under it:
```tsx
<span className="font-mono text-[9px] text-ink-tertiary block">most recent session</span>
```

In the same sidebar, the "Active Predictions" and "Active Remedies" values are just raw numbers. Add explicit sub-labels under each:
- Under predictions count: `<span className="font-mono text-[9px] text-ink-tertiary block">being tracked</span>`
- Under remedies count: `<span className="font-mono text-[9px] text-ink-tertiary block">currently active</span>`

Also: the AI message bubble in the chat currently renders `{msg.content}` as plain text. Add `react-markdown` if not already installed (`npm install react-markdown`), import it, and render AI messages as:
```tsx
import ReactMarkdown from "react-markdown"

// In the message bubble for role === "assistant":
<ReactMarkdown
  className="text-xs leading-relaxed"
  components={{
    p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
    strong: ({ children }) => <strong className="font-semibold text-gold-bright">{children}</strong>,
  }}
>
  {msg.content}
</ReactMarkdown>
```

---

### FIX 5 — LiveConsultationRoom.tsx — fix the astrologer avatar

**File:** `src/pages/LiveConsultationRoom.tsx`

In the waiting room, the astrologer avatar is a large `w-20 h-20` box with 2-letter initials. It looks like a placeholder. Replace with:

```tsx
<div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand/25 to-surface-3 border-2 border-brand/30 flex items-center justify-center font-mono font-bold text-2xl text-gold-bright mx-auto shadow-glow">
  {astrologer.name.slice(0, 2).toUpperCase()}
</div>
```

Also in the in-call phase: find any `bg-primary` or `border-primary/20` classes and replace:
- `bg-primary` → `bg-brand`
- `border-primary` → `border-brand`
- `text-primary` → `text-brand`

The call mode selector buttons: if they use `border-brand bg-surface-2` for active and `border-line` for inactive — that's correct, leave them.

---

### FIX 6 — DailyBrief.tsx — make the energy score feel real

**File:** `src/pages/DailyBrief.tsx`

The energy score ring is a `rounded-full` circle with a number. It looks like a loading spinner placeholder. Replace that element:

Find the energy score circle and replace:
```tsx
<div className="w-24 h-24 rounded-full border-2 border-brand/40 flex flex-col items-center justify-center bg-surface-2/60 shadow-lg">
  <span className="text-3xl font-bold text-ink tabular-nums">{d.energyScore}</span>
  <span className="text-[10px] text-gold-light uppercase">Optimal</span>
</div>
```
With:
```tsx
<div className="relative w-28 h-28">
  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
    <circle
      cx="50" cy="50" r="42"
      fill="none"
      stroke="#D97706"
      strokeWidth="8"
      strokeLinecap="round"
      strokeDasharray={`${(d.energyScore / 100) * 263.9} 263.9`}
    />
  </svg>
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <span className="font-metric text-3xl font-bold text-ink tabular-nums leading-none">{d.energyScore}</span>
    <span className="font-mono text-[9px] text-gold-bright uppercase tracking-[0.12em] mt-0.5">Optimal</span>
  </div>
</div>
```

This replaces the flat circle with a real SVG arc chart using the actual score value. Use `font-metric` for the number (Space Grotesk, already defined in the design system for data).

---

### FIX 7 — PredictionCenter.tsx — make metric cards use the ivory surface

**File:** `src/pages/PredictionCenter.tsx`

The 4 metric cards (Total Tracked / Verified Accurate / Active Windows / Overall Accuracy) currently all look identical (`bg-surface border border-line`). Give each one a distinct accent:

```tsx
const metricStyles = [
  { icon: Target,      label: "Total Tracked",    valueFn: () => mockPredictionStats.total,    accent: "text-ink",        bg: "bg-surface" },
  { icon: CheckCircle2,label: "Verified Accurate", valueFn: () => mockPredictionStats.completed, accent: "text-success",     bg: "bg-success-light" },
  { icon: Clock,       label: "Active Windows",   valueFn: () => mockPredictionStats.pending,  accent: "text-warning",    bg: "bg-warning-light" },
  { icon: TrendingUp,  label: "Overall Accuracy", valueFn: () => `${mockPredictionStats.accuracy}%`, accent: "text-brand", bg: "bg-brand-light" },
]
```

Then render each with `bg` as the card background and `accent` as the value color:
```tsx
{metricStyles.map(s => (
  <div key={s.label} className={`p-4 rounded-lg border border-line space-y-2 ${s.bg}`}>
    <div className="flex items-center justify-between text-ink-tertiary">
      <span className="text-[10px] uppercase font-mono font-bold tracking-wider">{s.label}</span>
      <s.icon className={`w-4 h-4 ${s.accent}`} />
    </div>
    <p className={`font-metric text-2xl font-bold tabular-nums tracking-tight ${s.accent}`}>
      {s.valueFn()}
    </p>
  </div>
))}
```

Note: `bg-success-light` and `bg-warning-light` use the CSS variables `--color-success-light` and `--color-warning-light` already defined in `index.css`. In Tailwind v4 these should work as `bg-[var(--color-success-light)]` if the short form doesn't resolve. Use `bg-[rgba(16,185,129,0.12)]` and `bg-[rgba(245,158,11,0.12)]` as fallback.

---

### FIX 8 — Landing page sections returning AI-slop content

**Files to update:** `src/components/landing/CoreFeatures.tsx`, `src/components/landing/TestimonialsSection.tsx`, `src/components/landing/FinalCTA.tsx`

**CoreFeatures.tsx** — Find all instances of:
- `rounded-full` on icon containers → change to `rounded-md`  
- `bg-primary/10` → `bg-brand-light`
- `text-primary` → `text-brand`
- `rounded-2xl` or `rounded-3xl` on cards → `rounded-lg`
- `border-white/10` → `border-line`
- `bg-card` → `bg-surface`
- `text-secondary-text` → `text-ink-secondary`

**TestimonialsSection.tsx** — Same class replacements. Additionally, if testimonial avatars are `rounded-full` letter circles with `bg-primary/20`, change to:
```tsx
<div className="w-9 h-9 rounded-md bg-brand-light border border-brand/20 flex items-center justify-center font-mono font-bold text-xs text-brand">
  {initials}
</div>
```

**FinalCTA.tsx** — If it has a large `rounded-3xl` CTA section or `bg-gradient-to-r from-primary` background, replace with:
```tsx
className="cosmic-hero py-20 px-6 text-center"
```
And the CTA button: `bg-brand hover:bg-brand-hover text-white rounded-md` (remove any `rounded-full` on buttons).

---

### FIX 9 — Global: remove all `img` tags with broken `src={a.avatar}`

**Files:** Any component using `<img src={a.avatar}` from the `Astrologer` type.

The `avatar` field in mock data is a letter string like `"A"`, not a URL. Any `<img src={a.avatar}` will render a broken image icon. Find all occurrences across the codebase and replace with the initials avatar pattern:

```tsx
// Replace: <img src={a.avatar} alt={a.name} className="w-24 h-24 rounded-full ..." />
// With:
<div className="w-14 h-14 rounded-lg bg-gradient-to-br from-brand/25 to-surface-3 border border-brand/30 flex items-center justify-center font-mono font-bold text-sm text-gold-bright shrink-0">
  {a.name.slice(0, 2).toUpperCase()}
</div>
```

Search for `src={a.avatar}` and `src={astrologer.avatar}` across all files and apply this replacement, adjusting size classes to match the context.

---

### FIX 10 — Add a "Back" breadcrumb to inner pages

All inner pages (AICompanion, SmartMatch, PredictionCenter, DailyBrief, LiveConsultationRoom, CosmicMemory) have no breadcrumb. Add this to the top of the header section of each page, above the icon+title row:

```tsx
<button
  onClick={() => navigate(-1)}
  className="flex items-center gap-1.5 font-mono text-[11px] text-ink-tertiary hover:text-ink transition-colors mb-5 group"
>
  <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  Back
</button>
```

Import `useNavigate` if not already imported in those files.

---

### VERIFICATION CHECKLIST

After all changes, run `npm run build`. Must pass with 0 TypeScript errors.

Then verify visually:

- [ ] Smart Match results page has no `bg-card`, `rounded-3xl`, `text-lavender`, `text-secondary-text`
- [ ] Context Panel has real toggle switches (not `ToggleLeft`/`ToggleRight` icons)
- [ ] AI Companion header has no gradient avatar blob
- [ ] `"45 min last"` label is fixed to show "45 min / most recent session" with proper context
- [ ] No `<img src={a.avatar}` broken image tags anywhere
- [ ] Daily Brief energy score shows SVG arc ring, not a flat circle
- [ ] Prediction metric cards use 4 distinct accent colors (default / green / amber / brand)
- [ ] All landing page cards use `rounded-lg` not `rounded-3xl`
- [ ] "Back" breadcrumb appears on all inner pages
- [ ] `npm run build` → 0 errors

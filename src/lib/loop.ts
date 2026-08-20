/** Product journey — consumer labels. */
export type LoopStageId =
  | "consultation"
  | "prediction"
  | "decision"
  | "evidence"
  | "verification"
  | "ai_pattern"
  | "daily_ritual"
  | "future_decision"

export type StrandLayerId = "M" | "D" | "C" | "A"

export interface LoopStage {
  id: LoopStageId
  short: string
  label: string
  layer: StrandLayerId
  description: string
  href: string
}

export const LOOP_STAGES: LoopStage[] = [
  {
    id: "consultation",
    short: "Talk",
    label: "Talk to expert",
    layer: "A",
    description: "Chat, call, or video with a real astrologer.",
    href: "/app/consult",
  },
  {
    id: "prediction",
    short: "Advice",
    label: "Save advice",
    layer: "A",
    description: "What they said, with dates.",
    href: "/app/ledger",
  },
  {
    id: "decision",
    short: "Action",
    label: "Your action",
    layer: "D",
    description: "Remedies and steps you take.",
    href: "/app/sos",
  },
  {
    id: "evidence",
    short: "Proof",
    label: "Add proof",
    layer: "M",
    description: "Documents or notes when something happens.",
    href: "/app/memory",
  },
  {
    id: "verification",
    short: "Result",
    label: "Mark result",
    layer: "M",
    description: "Did it come true?",
    href: "/app/ledger",
  },
  {
    id: "ai_pattern",
    short: "Insights",
    label: "AI insights",
    layer: "A",
    description: "Patterns from your history.",
    href: "/app/companion",
  },
  {
    id: "daily_ritual",
    short: "Today",
    label: "Daily guide",
    layer: "C",
    description: "Today’s horoscope and focus.",
    href: "/app/today",
  },
  {
    id: "future_decision",
    short: "Timing",
    label: "Best timing",
    layer: "D",
    description: "Good dates for big moves.",
    href: "/app/muhurta",
  },
]

export const LAYER_META: Record<
  StrandLayerId,
  { name: string; full: string; color: string; text: string; border: string; bg: string }
> = {
  M: {
    name: "Proof",
    full: "Documents & real-life proof",
    color: "bg-emerald-500",
    text: "text-emerald-400",
    border: "border-emerald-800",
    bg: "bg-emerald-950",
  },
  D: {
    name: "Actions",
    full: "Things you do",
    color: "bg-sky-500",
    text: "text-sky-400",
    border: "border-sky-800",
    bg: "bg-sky-950",
  },
  C: {
    name: "Stars",
    full: "Chart & timing",
    color: "bg-zinc-300",
    text: "text-zinc-200",
    border: "border-zinc-600",
    bg: "bg-zinc-900",
  },
  A: {
    name: "Advice",
    full: "Predictions & AI help",
    color: "bg-zinc-100",
    text: "text-zinc-100",
    border: "border-zinc-600",
    bg: "bg-zinc-900",
  },
}

export type StrandModeId = "strand" | "watch" | "weave" | "puja" | "claims"
export type ActiveNavId = StrandModeId | "more"

export interface StrandMode {
  id: StrandModeId
  label: string
  href: string
  match: string[]
}

export const STRAND_MODES: StrandMode[] = [
  {
    id: "strand",
    label: "Home",
    href: "/app/dashboard",
    match: [
      "/app/dashboard",
      "/app/strand",
      "/app/journey",
      "/app/today",
      "/app/kundli",
      "/app/companion",
      "/app/you",
      "/app/wallet",
    ],
  },
  {
    id: "watch",
    label: "Watch",
    href: "/app/reels",
    match: ["/app/reels"],
  },
  {
    id: "weave",
    label: "Talk",
    href: "/app/consult",
    match: ["/app/consult", "/app/room", "/app/astrologer"],
  },
  {
    id: "puja",
    label: "Puja",
    href: "/app/puja",
    match: ["/app/puja"],
  },
  {
    id: "claims",
    label: "Results",
    href: "/app/ledger",
    match: ["/app/ledger", "/app/predictions", "/app/proof", "/app/reports"],
  },
]

export const LENS_GROUPS: {
  id: string
  title: string
  hint: string
  items: { label: string; href: string; stage: LoopStageId; blurb: string }[]
}[] = [
  {
    id: "life",
    title: "What do you need?",
    hint: "Start here",
    items: [
      { label: "Watch a reel", href: "/app/reels", stage: "daily_ritual", blurb: "Proof, sky, aarti. Stay a minute." },
      { label: "I need to talk to someone", href: "/app/consult", stage: "consultation", blurb: "Chat or call. From ₹10/min." },
      { label: "What's going on with me today", href: "/app/today", stage: "daily_ritual", blurb: "One page. No jargon." },
      { label: "Did a prediction come true?", href: "/app/ledger", stage: "verification", blurb: "Mark yes or no. Get a proof card." },
    ],
  },
  {
    id: "answers",
    title: "Common questions",
    hint: "2 minutes",
    items: [
      { label: "Show my birth chart", href: "/app/kundli", stage: "daily_ritual", blurb: "Simple chart + download PDF" },
      { label: "Chart yogas", href: "/app/yogas", stage: "daily_ritual", blurb: "Combinations in this kundli" },
      { label: "Reports and papers", href: "/app/reports", stage: "evidence", blurb: "Download a dated report" },
      { label: "Am I in Sade Sati?", href: "/app/sade-sati", stage: "daily_ritual", blurb: "Yes / no, and which phase" },
      { label: "Marriage / Mangal dosha", href: "/app/mangal", stage: "future_decision", blurb: "Clear yes, no, or cancelled" },
      { label: "When is a good time?", href: "/app/muhurta", stage: "future_decision", blurb: "This week’s better slots" },
      { label: "Sit for a live puja", href: "/app/puja", stage: "consultation", blurb: "Its own sitting. Not Talk now." },
    ],
  },
  {
    id: "later",
    title: "Later, if you want",
    hint: "Optional",
    items: [
      { label: "Planets right now", href: "/app/grahas", stage: "daily_ritual", blurb: "Where the 9 grahas sit" },
      { label: "What’s coming", href: "/app/transits", stage: "daily_ritual", blurb: "Next few weeks for you" },
      { label: "Kundli match", href: "/match", stage: "future_decision", blurb: "Ashtakoot from two birth times" },
      { label: "Daily rashi", href: "/horoscope", stage: "daily_ritual", blurb: "Today from the live Moon" },
      { label: "Past sessions", href: "/app/memory", stage: "evidence", blurb: "Notes from old calls" },
    ],
  },
  {
    id: "account",
    title: "Account",
    hint: "",
    items: [
      { label: "Proof board", href: "/board", stage: "verification", blurb: "Ranked by dated results." },
      { label: "Send an invite", href: "/app/share", stage: "evidence", blurb: "A public card. You both get ₹50." },
      { label: "Wallet & plans", href: "/app/subscription", stage: "future_decision", blurb: "Recharge or go Plus" },
      { label: "My details", href: "/app/you", stage: "daily_ritual", blurb: "Name, birth time, chart" },
      { label: "Settings", href: "/app/settings", stage: "daily_ritual", blurb: "Privacy and account" },
    ],
  },
]

export const MORE_LENSES = LENS_GROUPS.flatMap((g) => g.items)

export function modeForPath(pathname: string): ActiveNavId {
  for (const mode of STRAND_MODES) {
    if (mode.match.some((m) => pathname === m || pathname.startsWith(m + "/"))) {
      return mode.id
    }
  }
  return "more"
}

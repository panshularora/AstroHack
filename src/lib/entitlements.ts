export type PlanId = "free" | "plus" | "family"

export type FeatureId =
  | "ai_chat"
  | "muhurta"
  | "yoga_detail"
  | "reports"
  | "family"
  | "unlimited_predictions"
  | "transit_extended"
  | "priority_match"

export interface PlanLimits {
  aiPerMonth: number
  muhurtaPerMonth: number
  activePredictions: number
  transitDays: number
  yogaDetail: boolean
  reports: boolean
  family: boolean
  priorityMatch: boolean
}

export const PLAN_LIMITS: Record<PlanId, PlanLimits> = {
  free: {
    aiPerMonth: 5,
    muhurtaPerMonth: 3,
    activePredictions: 3,
    transitDays: 10,
    yogaDetail: false,
    reports: false,
    family: false,
    priorityMatch: false,
  },
  plus: {
    aiPerMonth: Number.POSITIVE_INFINITY,
    muhurtaPerMonth: Number.POSITIVE_INFINITY,
    activePredictions: Number.POSITIVE_INFINITY,
    transitDays: 45,
    yogaDetail: true,
    reports: true,
    family: false,
    priorityMatch: true,
  },
  family: {
    aiPerMonth: Number.POSITIVE_INFINITY,
    muhurtaPerMonth: Number.POSITIVE_INFINITY,
    activePredictions: Number.POSITIVE_INFINITY,
    transitDays: 45,
    yogaDetail: true,
    reports: true,
    family: true,
    priorityMatch: true,
  },
}

export const PLAN_META: Record<
  PlanId,
  { name: string; price: string; period: string; tagline: string }
> = {
  free: { name: "Free", price: "₹0", period: "forever", tagline: "Daily sky + 3 tracked predictions" },
  plus: { name: "Plus", price: "₹499", period: "/ month", tagline: "Unlimited AI, timing & proof cards" },
  family: { name: "Family", price: "₹999", period: "/ month", tagline: "4 charts under one roof" },
}

/** Rupees charged from wallet. Server is the only place this is applied. */
export const PLAN_PRICE_INR: Record<PlanId, number> = {
  free: 0,
  plus: 499,
  family: 999,
}

/** Talk credit granted from the server when a paid plan is first bought. */
export const PLAN_TALK_CREDIT: Record<PlanId, number> = {
  free: 0,
  plus: 200,
  family: 300,
}

export const WELCOME_CREDIT = 150
export const FIRST_FREE_MINUTES = 3
export const FIRST_RECHARGE_BONUS = 50
export const INVITE_CREDIT = 50
export const REPORT_FEE = 199
export const SECOND_OPINION_FEE = 99
export const SHIP_FEE = 399

export const WALLET_PACKS = [
  { amount: 100, bonus: 0 },
  { amount: 300, bonus: 30 },
  { amount: 500, bonus: 75 },
  { amount: 1000, bonus: 200 },
] as const

export type WalletPackAmount = (typeof WALLET_PACKS)[number]["amount"]

export const FEATURE_COPY: Record<
  FeatureId,
  { title: string; body: string; required: PlanId }
> = {
  ai_chat: {
    title: "Unlimited AI questions",
    body: "Free includes 5 questions a month. Plus unlocks the full chart conversation.",
    required: "plus",
  },
  muhurta: {
    title: "Unlimited Muhurta windows",
    body: "Free includes 3 timing searches a month. Plus scans every auspicious slot.",
    required: "plus",
  },
  yoga_detail: {
    title: "Full yoga interpretations",
    body: "See how each yoga actually plays in this dasha — not just the name.",
    required: "plus",
  },
  reports: {
    title: "Monthly reports & PDF export",
    body: "A dated report you can download and share. Plus and Family only.",
    required: "plus",
  },
  family: {
    title: "Family charts",
    body: "Add up to 3 more birth charts and match kundlis under one plan.",
    required: "family",
  },
  unlimited_predictions: {
    title: "Unlimited live predictions",
    body: "Free tracks 3 open predictions. Plus keeps the full proof ledger.",
    required: "plus",
  },
  transit_extended: {
    title: "45-day personal transits",
    body: "Free shows the next 10 days. Plus maps a month and a half ahead.",
    required: "plus",
  },
  priority_match: {
    title: "Priority astrologer match",
    body: "Skip the queue and get matched to top-rated experts first.",
    required: "plus",
  },
}

export function currentMonthKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

export function planRank(plan: PlanId): number {
  if (plan === "family") return 2
  if (plan === "plus") return 1
  return 0
}

export function hasPlanAccess(plan: PlanId, required: PlanId): boolean {
  return planRank(plan) >= planRank(required)
}

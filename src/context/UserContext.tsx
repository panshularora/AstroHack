import React, { createContext, useContext, useState, useEffect } from "react"
import { computeNatal, computePanchang, grahasInNatalHouses } from "@/lib/vedic"
import { currentMonthKey, type PlanId, type WalletPackAmount } from "@/lib/entitlements"
import { api, apiOptional, getToken, setToken } from "@/lib/api"
import { openUpiCheckout, type UpiOrder } from "@/lib/upiPay"
import { readInvite } from "@/lib/utm"

export interface UsageCounters {
  monthKey: string
  aiQuestions: number
  muhurtaQueries: number
}

export interface UserProfileData {
  id: string
  name: string
  email: string
  dob: string
  timeOfBirth: string
  placeOfBirth: string
  sunSign: string
  moonSign: string
  moonNakshatra: string
  moonPada: number
  ascendant: string
  activeDasha: string
  transitPlanet: string
  transitHouse: string
  avatar: string
  memberSince: string
  intentions: string[]
  onboardingComplete: boolean
  starterDismissed: boolean
  plan: PlanId
  planSince?: string
  walletBalance: number
  inviteCode: string
  invitedCount: number
  checkinStreak: number
  lastCheckin?: string | null
  firstSessionFree: boolean
  welcomeGranted: boolean
  hasRecharged: boolean
  usage: UsageCounters
  predictions: Array<{
    id: string
    title: string
    category: string
    confidence: number
    status: string
    astrologerName: string
  }>
  consultations: Array<{
    id: string
    astrologerName: string
    topic: string
    date: string
    durationMinutes: number
    cost: number
  }>
  family: Array<{
    id: string
    name: string
    relation: string
    dob: string
    timeOfBirth: string
    placeOfBirth: string
  }>
}

export interface UserAccountRecord extends UserProfileData {
  passwordHash?: string
}

export interface NatalSnapshot {
  sunSign: string
  moonSign: string
  moonNakshatra: string
  moonPada: number
  ascendant: string
  activeDasha: string
  transitPlanet: string
  transitHouse: string
}

export function calculateZodiac(
  dob: string,
  time = "08:30",
  place = "New Delhi, India"
): NatalSnapshot {
  const natal = computeNatal(dob || "1994-08-14", time || "12:00", place || "New Delhi, India")
  const live = grahasInNatalHouses(natal)
  const focus =
    live.bodies.find((b) => b.id === "jupiter") ||
    live.bodies.find((b) => b.id === "saturn") ||
    live.bodies[0]
  return {
    sunSign: natal.sunSign,
    moonSign: natal.moonSign,
    moonNakshatra: natal.moonNakshatra,
    moonPada: natal.moonPada,
    ascendant: natal.lagnaSign,
    activeDasha: natal.dasha.label,
    transitPlanet: focus.name,
    transitHouse: `${focus.house}${focus.house === 1 ? "st" : focus.house === 2 ? "nd" : focus.house === 3 ? "rd" : "th"} House`,
  }
}

function emptyUsage(): UsageCounters {
  return { monthKey: currentMonthKey(), aiQuestions: 0, muhurtaQueries: 0 }
}

export const DEFAULT_DEMO_USER: UserProfileData = {
  id: "u1",
  name: "Arjun Sharma",
  email: "arjun.sharma@example.com",
  dob: "1994-08-14",
  timeOfBirth: "08:30",
  placeOfBirth: "New Delhi, India",
  ...calculateZodiac("1994-08-14", "08:30", "New Delhi, India"),
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  memberSince: "May 2024",
  intentions: ["Career", "Money"],
  onboardingComplete: true,
  starterDismissed: true,
  plan: "free",
  walletBalance: 100000,
  inviteCode: "ARJUN",
  invitedCount: 0,
  checkinStreak: 0,
  lastCheckin: null,
  firstSessionFree: false,
  welcomeGranted: true,
  hasRecharged: true,
  usage: emptyUsage(),
  predictions: [
    { id: "p1", title: "A job offer will land in the tech sector", category: "CAREER", confidence: 88, status: "Active Window", astrologerName: "Acharya Indu Prakash" },
    { id: "p2", title: "A bonus from an investment will arrive", category: "FINANCE", confidence: 94, status: "Verified", astrologerName: "Dr. Sundeep Kochar" },
    { id: "p3", title: "The relationship will feel easier and more aligned", category: "RELATIONSHIP", confidence: 82, status: "Active Window", astrologerName: "Pt. Ajai Bhambi" },
  ],
  consultations: [
    { id: "c1", astrologerName: "Acharya Indu Prakash", topic: "Rahu-Jupiter Transit Alignment", date: "Jul 15, 2026", durationMinutes: 45, cost: 800 },
    { id: "c2", astrologerName: "Dr. Sundeep Kochar", topic: "Saturn Wealth Stabilization", date: "May 02, 2026", durationMinutes: 30, cost: 500 },
  ],
  family: [],
}

function hydrateUser(raw: Partial<UserProfileData> | null | undefined): UserProfileData {
  const base: UserProfileData = {
    ...DEFAULT_DEMO_USER,
    predictions: DEFAULT_DEMO_USER.predictions,
    consultations: DEFAULT_DEMO_USER.consultations,
    ...raw,
    intentions: raw?.intentions ?? [],
    onboardingComplete: raw?.onboardingComplete ?? Boolean(raw?.dob),
    starterDismissed: raw?.starterDismissed ?? false,
    plan: raw?.plan ?? "free",
    walletBalance: typeof raw?.walletBalance === "number" ? raw.walletBalance : 100000,
    inviteCode: raw?.inviteCode || DEFAULT_DEMO_USER.inviteCode,
    invitedCount: typeof raw?.invitedCount === "number" ? raw.invitedCount : 0,
    checkinStreak: typeof raw?.checkinStreak === "number" ? raw.checkinStreak : 0,
    lastCheckin: raw?.lastCheckin ?? null,
    firstSessionFree: Boolean(raw?.firstSessionFree),
    welcomeGranted: Boolean(raw?.welcomeGranted),
    hasRecharged: Boolean(raw?.hasRecharged),
    usage: raw?.usage?.monthKey === currentMonthKey() ? raw.usage : emptyUsage(),
    moonSign: raw?.moonSign || DEFAULT_DEMO_USER.moonSign,
    moonNakshatra: raw?.moonNakshatra || DEFAULT_DEMO_USER.moonNakshatra,
    moonPada: raw?.moonPada || DEFAULT_DEMO_USER.moonPada,
    family: raw?.family ?? [],
  }
  const calc = calculateZodiac(base.dob, base.timeOfBirth, base.placeOfBirth)
  return { ...base, ...calc }
}

interface UserContextType {
  user: UserProfileData
  authReady: boolean
  isAuthed: boolean
  updateProfile: (updates: Partial<UserProfileData>) => void
  resetToDemo: () => void
  createNewUser: (name: string, email: string, password?: string, dob?: string, time?: string, place?: string) => Promise<void>
  loginUser: (email: string, password?: string) => Promise<boolean>
  checkIn: () => Promise<{ ok: boolean; bonus: number; already: boolean }>
  checkoutPlan: (plan: PlanId) => Promise<{ ok: boolean; reason?: string }>
  buyWalletPack: (amount: number) => Promise<{ ok: boolean; credited?: number; firstBonus?: number; reason?: string }>
  settleSession: (opts: {
    minutes: number
    ratePerMin: number
    practitionerId?: string
    practitionerName?: string
    mode?: string
  }) => Promise<{ charged: number; freeMinutes: number }>
  payFee: (
    kind: "report" | "second-opinion" | "puja" | "ship",
    extra?: { claim?: string; riteId?: string; offeringId?: string; address?: string }
  ) => Promise<{
    ok: boolean
    reason?: string
    already?: boolean
    tracking?: string
    practitionerId?: string
    topic?: string
    riteId?: string
  }>
  consumeAiQuestion: () => boolean
  consumeMuhurta: () => boolean
  addWallet: (amount: number) => void
  addFamilyMember: (member: { name: string; relation: string; dob: string; timeOfBirth: string; placeOfBirth: string }) => { ok: boolean; reason?: string }
  switchChart: (memberId: "self" | string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfileData>(() => hydrateUser(DEFAULT_DEMO_USER))
  const [authReady, setAuthReady] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setIsAuthed(false)
      setAuthReady(true)
      return
    }
    apiOptional<UserProfileData>("/api/me").then((remote) => {
      if (remote?.id) {
        setUser(hydrateUser(remote))
        setIsAuthed(true)
      } else {
        setToken(null)
        setIsAuthed(false)
      }
      setAuthReady(true)
    })
  }, [])

  const updateProfile = (updates: Partial<UserProfileData>) => {
    setUser((prev) => {
      const nextDob = updates.dob || prev.dob
      const nextTime = updates.timeOfBirth || prev.timeOfBirth
      const nextPlace = updates.placeOfBirth || prev.placeOfBirth
      const calc = calculateZodiac(nextDob, nextTime, nextPlace)
      const updatedUser = { ...prev, ...updates, ...calc }
      if (getToken()) {
        api("/api/me", { method: "PATCH", body: JSON.stringify(updates) }).catch(() => {})
      }
      return updatedUser
    })
  }

  const resetToDemo = () => {
    setToken(null)
    setIsAuthed(false)
    setUser(hydrateUser(DEFAULT_DEMO_USER))
  }

  const createNewUser = async (
    name: string,
    email: string,
    password = "",
    dob = "1998-05-15",
    time = "08:30",
    place = "New Delhi, India"
  ) => {
    const invite = readInvite()
    const remote = await apiOptional<{ token: string; user: UserProfileData }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, dob, timeOfBirth: time, placeOfBirth: place, invite }),
    })
    if (remote?.token && remote.user) {
      setToken(remote.token)
      setUser(hydrateUser({ ...remote.user, onboardingComplete: false }))
      setIsAuthed(true)
      return
    }
    throw new Error("Could not create the account. Is the API running?")
  }

  const loginUser = async (email: string, password = ""): Promise<boolean> => {
    const cleanEmail = email.toLowerCase().trim()
    const remote = await apiOptional<{ token: string; user: UserProfileData }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: cleanEmail, password }),
    })
    if (remote?.token && remote.user) {
      setToken(remote.token)
      setUser(hydrateUser(remote.user))
      setIsAuthed(true)
      return true
    }
    return false
  }

  const checkoutPlan = async (plan: PlanId): Promise<{ ok: boolean; reason?: string }> => {
    if (!getToken()) return { ok: false, reason: "Sign in first." }
    try {
      const remote = await api<UserProfileData>("/api/checkout/plan", {
        method: "POST",
        body: JSON.stringify({ plan, confirm: true }),
      })
      setUser(hydrateUser(remote))
      return { ok: true }
    } catch (e) {
      return { ok: false, reason: e instanceof Error ? e.message : "Checkout failed." }
    }
  }

  const consumeAiQuestion = () => {
    const monthKey = currentMonthKey()
    const usage = user.usage.monthKey === monthKey ? user.usage : emptyUsage()
    updateProfile({ usage: { ...usage, monthKey, aiQuestions: usage.aiQuestions + 1 } })
    if (getToken()) api("/api/me/usage", { method: "POST", body: JSON.stringify({ kind: "ai" }) }).catch(() => {})
    return true
  }

  const consumeMuhurta = () => {
    const monthKey = currentMonthKey()
    const usage = user.usage.monthKey === monthKey ? user.usage : emptyUsage()
    updateProfile({ usage: { ...usage, monthKey, muhurtaQueries: usage.muhurtaQueries + 1 } })
    if (getToken()) api("/api/me/usage", { method: "POST", body: JSON.stringify({ kind: "muhurta" }) }).catch(() => {})
    return true
  }

  const checkIn = async () => {
    if (!getToken()) return { ok: false, bonus: 0, already: false }
    try {
      const remote = await api<UserProfileData & { checkinBonus?: number; already?: boolean }>("/api/checkin", {
        method: "POST",
      })
      setUser(hydrateUser(remote))
      return { ok: true, bonus: remote.checkinBonus || 0, already: Boolean(remote.already) }
    } catch {
      return { ok: false, bonus: 0, already: false }
    }
  }

  const buyWalletPack = async (amount: number): Promise<{ ok: boolean; credited?: number; firstBonus?: number; reason?: string }> => {
    if (!getToken()) return { ok: false, reason: "Sign in first." }
    const before = user.walletBalance ?? 0
    try {
      const order = await api<UpiOrder>("/api/pay/upi/order", {
        method: "POST",
        body: JSON.stringify({ pack: amount as WalletPackAmount }),
      })
      const paid = await openUpiCheckout(order)
      if (paid) {
        const remote = await api<UserProfileData & { credited?: number; already?: boolean }>("/api/pay/upi/verify", {
          method: "POST",
          body: JSON.stringify(paid),
        })
        setUser(hydrateUser(remote))
        return { ok: true, credited: remote.credited, firstBonus: order.firstBonus }
      }
      for (let i = 0; i < 6; i++) {
        await new Promise((r) => setTimeout(r, 1500))
        const me = await api<UserProfileData>("/api/me")
        const now = me.walletBalance ?? 0
        if (now > before) {
          setUser(hydrateUser(me))
          return { ok: true, credited: now - before, firstBonus: order.firstBonus }
        }
      }
      return { ok: false, reason: "UPI cancelled." }
    } catch (e) {
      return { ok: false, reason: e instanceof Error ? e.message : "UPI failed." }
    }
  }

  const settleSession = async (opts: {
    minutes: number
    ratePerMin: number
    practitionerId?: string
    practitionerName?: string
    mode?: string
  }): Promise<{ charged: number; freeMinutes: number }> => {
    if (!getToken()) return { charged: 0, freeMinutes: 0 }
    try {
      const remote = await api<UserProfileData & { charged?: number; freeMinutes?: number }>("/api/checkout/session", {
        method: "POST",
        body: JSON.stringify({ ...opts, confirm: true }),
      })
      setUser(hydrateUser(remote))
      return { charged: remote.charged || 0, freeMinutes: remote.freeMinutes || 0 }
    } catch {
      return { charged: 0, freeMinutes: 0 }
    }
  }

  const addWallet = (amount: number) => {
    if (amount > 0) void buyWalletPack(amount)
  }

  const payFee = async (
    kind: "report" | "second-opinion" | "puja" | "ship",
    extra: { claim?: string; riteId?: string; offeringId?: string; address?: string } = {}
  ) => {
    if (!getToken()) return { ok: false, reason: "Sign in first." }
    try {
      const remote = await api<
        UserProfileData & {
          already?: boolean
          tracking?: string
          practitionerId?: string
          topic?: string
          riteId?: string
        }
      >("/api/checkout/fee", {
        method: "POST",
        body: JSON.stringify({ kind, confirm: true, ...extra }),
      })
      setUser(hydrateUser(remote))
      return {
        ok: true,
        already: remote.already,
        tracking: remote.tracking,
        practitionerId: remote.practitionerId,
        topic: remote.topic,
        riteId: remote.riteId,
      }
    } catch (e) {
      return { ok: false, reason: e instanceof Error ? e.message : "Checkout failed." }
    }
  }

  const addFamilyMember = (member: {
    name: string
    relation: string
    dob: string
    timeOfBirth: string
    placeOfBirth: string
  }) => {
    if (user.plan !== "family") {
      return { ok: false, reason: "Family plan required to add other charts." }
    }
    if (user.family.length >= 3) {
      return { ok: false, reason: "Family plan includes 3 additional charts." }
    }
    updateProfile({
      family: [
        ...user.family,
        { id: `fam-${Date.now()}`, ...member },
      ],
    })
    if (getToken()) api("/api/family", { method: "POST", body: JSON.stringify(member) }).catch(() => {})
    return { ok: true }
  }

  const switchChart = (memberId: "self" | string) => {
    if (memberId === "self") return
    const member = user.family.find((f) => f.id === memberId)
    if (!member) return
    updateProfile({
      name: member.name,
      dob: member.dob,
      timeOfBirth: member.timeOfBirth,
      placeOfBirth: member.placeOfBirth,
    })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        authReady,
        isAuthed,
        updateProfile,
        resetToDemo,
        createNewUser,
        loginUser,
        checkIn,
        checkoutPlan,
        buyWalletPack,
        settleSession,
        payFee,
        consumeAiQuestion,
        consumeMuhurta,
        addWallet,
        addFamilyMember,
        switchChart,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used within a UserProvider")
  return context
}

export function useNatalChart() {
  const { user } = useUser()
  return computeNatal(user.dob, user.timeOfBirth, user.placeOfBirth)
}

export function useTodayPanchang() {
  const { user } = useUser()
  return computePanchang(new Date(), user.placeOfBirth)
}

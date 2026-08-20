import { getToken } from "@/lib/api"
import type { ChatMessage } from "@/lib/mock-data"
import type { DetailedPrediction } from "@/lib/mock-data"
import type { UserProfileData } from "@/context/UserContext"
import {
  computeAshtakavarga,
  computeChoghadiya,
  computeMangalDosha,
  computeNatal,
  computeNumerology,
  computePanchang,
  computeSadeSati,
  computeSkyFlags,
  computeVarshphal,
  detectYogas,
  grahasInNatalHouses,
  lagnaLord,
  nextMoonSignChange,
  personalizedFocus,
  recommendGemstones,
  upcomingTransits,
} from "@/lib/vedic"

export interface ChatReply {
  content: string
  citations: NonNullable<ChatMessage["citations"]>
}

function recentAssistantTexts(history: ChatMessage[]) {
  return history.filter((m) => m.role === "assistant").slice(-4).map((m) => m.content)
}

function pickUnused(options: string[], used: string[]) {
  const fresh = options.filter((o) => !used.some((u) => u.includes(o.slice(0, 40))))
  return (fresh[0] || options[Math.floor(Math.random() * options.length)]) as string
}

export function buildChartContext(user: UserProfileData, predictions: DetailedPrediction[]) {
  const natal = computeNatal(user.dob, user.timeOfBirth, user.placeOfBirth)
  const panchang = computePanchang(new Date(), user.placeOfBirth)
  const live = grahasInNatalHouses(natal)
  const moon = live.bodies.find((b) => b.id === "moon")!
  const sun = live.bodies.find((b) => b.id === "sun")!
  const sat = live.bodies.find((b) => b.id === "saturn")!
  const jup = live.bodies.find((b) => b.id === "jupiter")!
  const sade = computeSadeSati(natal)
  const mangal = computeMangalDosha(natal)
  const flags = computeSkyFlags()
  const transits = upcomingTransits(natal, 20)
  const moonMove = nextMoonSignChange()
  const choghadiya = computeChoghadiya(user.placeOfBirth)
  const yogas = detectYogas(natal).filter((y) => y.isActive)
  const gems = recommendGemstones(natal)
  const sav = computeAshtakavarga(natal)
  const year = computeVarshphal(natal)
  const numbers = computeNumerology(user.name, user.dob, lagnaLord(Math.floor(natal.lagna / 30) % 12))
  const open = predictions.filter((p) => p.status === "pending" || p.status === "in_progress")
  const due = open.filter((p) => new Date(p.targetDate) <= new Date())

  return {
    natal,
    panchang,
    moon,
    sun,
    sat,
    jup,
    sade,
    mangal,
    flags,
    transits,
    moonMove,
    choghadiya,
    yogas,
    gems,
    sav,
    year,
    numbers,
    open,
    due,
    live,
  }
}

export type ChartContext = ReturnType<typeof buildChartContext>

export function localAstroReply(
  question: string,
  user: UserProfileData,
  predictions: DetailedPrediction[],
  history: ChatMessage[]
): ChatReply {
  const q = question.toLowerCase().trim()
  const ctx = buildChartContext(user, predictions)
  const used = recentAssistantTexts(history)
  const cite = (type: "consultation" | "prediction" | "remedy", title: string, id: string) => ({ type, title, id })

  const skyLine = `Right now (Lahiri ${ctx.panchang.ayanamsaLabel}): Moon in ${ctx.moon.sign} ${ctx.moon.degreeLabel} · ${ctx.panchang.nakshatra} pada ${ctx.panchang.nakshatraPada} · ${ctx.panchang.tithi}.`
  const natalLine = `${user.name}: ${ctx.natal.sunSign} Sun, ${ctx.natal.moonSign} Moon (${ctx.natal.moonNakshatra} p${ctx.natal.moonPada}), ${ctx.natal.lagnaSign} Lagna. Running ${ctx.natal.dasha.label}.`

  if (/sade|saade|shani.*7|7\.5|saat/.test(q)) {
    const body = [
      `**${ctx.sade.label}.** Saturn is in ${ctx.sade.saturnSign} ${ctx.sade.saturnDegree}, ${ctx.sade.houseFromMoon} from your natal Moon in ${ctx.sade.natalMoon}.`,
      ctx.sade.start && ctx.sade.end
        ? `This phase: ${ctx.sade.start.toLocaleDateString("en-IN")} → ${ctx.sade.end.toLocaleDateString("en-IN")}.`
        : "Saturn is not on the 12th / 1st / 2nd from your Moon, so classical Sade Sati is off.",
      ctx.sade.advice,
    ].join("\n\n")
    return { content: body, citations: [cite("consultation", "Sade Sati tracker", "sade")] }
  }

  if (/mangal|manglik|kuja|mars dosha|marriage dosha/.test(q)) {
    return {
      content: [
        `**${ctx.mangal.verdict}**`,
        ctx.mangal.causes.length ? `Cause: ${ctx.mangal.causes.join("; ")}.` : "Mars is not in 1, 2, 4, 7, 8 or 12 from Lagna or Moon.",
        ctx.mangal.bhanga.length ? `Dosha bhanga: ${ctx.mangal.bhanga.join("; ")}.` : "",
        ctx.mangal.marriageNote,
      ]
        .filter(Boolean)
        .join("\n\n"),
      citations: [cite("consultation", "Mangal Dosha check", "mangal")],
    }
  }

  if (/gem|stone|ratna|ruby|pearl|pukhraj|neelam/.test(q)) {
    const g = ctx.gems[0]
    return {
      content: g
        ? `For your chart I'd start with **${g.gem}** for ${g.planet}. Wear it in **${g.metal}** on the **${g.finger}**, first on **${g.day}** after a short puja.\n\n${g.reason}\n\n${g.caution}`
        : "No weak karaka jumped out. Don't buy a stone from a generic ad — check the Kundli page first.",
      citations: [cite("remedy", "Gemstone engine", "gems")],
    }
  }

  if (/choghadiya|rahu kaal|rahu kaal|muhurta|auspicious|good time|today.*time/.test(q)) {
    const now = ctx.choghadiya.current
    return {
      content: [
        skyLine,
        now
          ? `Current Choghadiya: **${now.name}** (${now.period}) · ${now.label}. ${now.auspicious ? "Usable for ordinary starts." : "Skip launches and payments in this slot."}`
          : "Between day/night segments — wait for the next Choghadiya.",
        `Rahu Kaal today: **${ctx.panchang.rahuKaal.label}**. Abhijit: ${ctx.panchang.abhijit.label}.`,
      ].join("\n\n"),
      citations: [cite("consultation", "Today's Panchang", "today")],
    }
  }

  if (/varsh|annual|this year|solar return/.test(q)) {
    return {
      content: `**Varshphal ${ctx.year.year}.** Solar return ${ctx.year.solarReturn.toLocaleString("en-IN")}. Year lagna ${ctx.year.lagna}, Muntha in ${ctx.year.munthaSign} (house ${ctx.year.munthaHouse}).\n\n${ctx.year.themes.join("\n")}`,
      citations: [cite("consultation", "Varshphal", "varsh")],
    }
  }

  if (/ashtak|bindu|how (hard|bad|strong).*transit|saturn.*affect/.test(q)) {
    return {
      content: `Sarvashtakavarga total **${ctx.sav.sarvashtakavarga}**. Strongest house ${ctx.sav.strongestHouse}, weakest ${ctx.sav.weakestHouse}.\n\n${ctx.sav.note}`,
      citations: [cite("consultation", "Ashtakavarga", "sav")],
    }
  }

  if (/number|mulank|bhagyank|naamank|numerolog/.test(q)) {
    return {
      content: `Mulank **${ctx.numbers.mulank}** (${ctx.numbers.mulankPlanet}) · Bhagyank **${ctx.numbers.bhagyank}** (${ctx.numbers.bhagyankPlanet}) · Name **${ctx.numbers.nameNumber}** (${ctx.numbers.namePlanet}).\n\nLagna lord ${ctx.numbers.chartRuler}. ${ctx.numbers.harmony}`,
      citations: [cite("consultation", "Numerology", "num")],
    }
  }

  if (/dasha|antardasha|mahadasha|period/.test(q)) {
    return {
      content: `${natalLine}\n\nMaha: **${ctx.natal.dasha.maha.lord}** until ${ctx.natal.dasha.maha.end.toLocaleDateString("en-IN")}. Antar: **${ctx.natal.dasha.antar.lord}** until ${ctx.natal.dasha.antar.end.toLocaleDateString("en-IN")}.\n\nDecisions in this antar should respect ${ctx.natal.dasha.antar.lord.toLowerCase()}'s house themes, not generic "lucky days."`,
      citations: [cite("consultation", "Vimshottari dasha", "dasha")],
    }
  }

  if (/moon|today|panchang|nakshatra|tithi/.test(q) && !/next month/.test(q)) {
    return {
      content: [
        skyLine,
        `Moon leaves ${ctx.moonMove.fromSign} for **${ctx.moonMove.toSign}** in about ${Math.max(1, Math.round(ctx.moonMove.hours))} hours.`,
        personalizedFocus(ctx.natal, user.intentions),
        ctx.flags.length ? `Sky flags: ${ctx.flags.map((f) => `${f.name} ${f.detail}`).join("; ")}.` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
      citations: [cite("consultation", "Live panchang", "panchang")],
    }
  }

  if (/yoga|raj yoga|gaja|budhaditya/.test(q)) {
    const names = ctx.yogas.map((y) => y.name).join(", ") || "none fully formed"
    const first = ctx.yogas[0]
    return {
      content: `Active yogas in this Kundli: **${names}**.\n\n${first ? `${first.name}: ${first.meaning}` : "No classical yoga is fully on. Strength will come from dasha timing instead."}`,
      citations: [cite("consultation", "Chart yogas", "yoga")],
    }
  }

  if (/predict|window|offer|job|career|ledger|verif|came true|proof/.test(q)) {
    const openList = ctx.open.length
      ? ctx.open.map((p) => `• ${p.title} — ${new Date(p.targetDate).toLocaleDateString("en-IN")} (${p.status})`).join("\n")
      : "No open receipts. Log one line an astrologer said, then close it later."
    const dueLine = ctx.due.length
      ? `\n\n**${ctx.due.length} window${ctx.due.length > 1 ? "s" : ""} already closed.** Open My advice and tap Verify Now — that's the shareable proof card.`
      : ""
    return {
      content: `${natalLine}\n\nTracked predictions:\n${openList}${dueLine}\n\nTransit next: ${ctx.transits[0] ? `${ctx.transits[0].planet} ${ctx.transits[0].transitType} in ${ctx.transits[0].daysOut} days (${ctx.transits[0].houseArea}).` : "quiet week."}`,
      citations: [cite("prediction", "Prediction ledger", "ledger")],
    }
  }

  if (/transit|jupiter|saturn|graha|planet|house/.test(q)) {
    const next = ctx.transits.slice(0, 3)
    const lines = next.map((t) => `• in ${t.daysOut}d — **${t.planet} ${t.transitType}** · house ${t.house} (${t.houseArea})`).join("\n")
    return {
      content: `${skyLine}\n\nJupiter is transiting your ${ctx.jup.house}th (${ctx.jup.houseArea.toLowerCase()}). Saturn is in ${ctx.sat.sign}, house ${ctx.sat.house}.\n\nUpcoming from *your* Lagna, not a newspaper horoscope:\n${lines || "No major ingresses in the free window."}`,
      citations: [cite("consultation", "Personal transits", "transit")],
    }
  }

  if (/kundli|chart|lagna|ascendant|born|birth/.test(q)) {
    return {
      content: `${natalLine}\n\nBorn ${user.dob} ${user.timeOfBirth} · ${ctx.natal.placeName}.\n\nDownload the D1 + planet table from **My Kundli**. That PDF is the lead magnet — it's computed, not a stock image.`,
      citations: [cite("consultation", "D1 Kundli", "kundli")],
    }
  }

  if (/hello|hi\b|hey|namaste|good morning|good evening/.test(q)) {
    return {
      content: pickUnused(
        [
          `Namaste ${user.name}. ${natalLine}\n\n${skyLine}\n\nAsk me Sade Sati, Mangal, today's Choghadiya, or a specific decision. I'll use this chart, not a script.`,
          `Hey ${user.name.split(" ")[0]}. Moon is in ${ctx.moon.sign} right now. ${ctx.sade.phase === "clear" ? "Sade Sati is off." : `Sade Sati: ${ctx.sade.phase}.`}\n\nWhat do you actually need to decide?`,
        ],
        used
      ),
      citations: [cite("consultation", "Live chart", "hello")],
    }
  }

  // Default: answer the question with live facts, never the old "17 days" loop
  const next = ctx.transits[0]
  const intent = user.intentions[0]
  const body = [
    `You asked: “${question.trim()}”. I am answering from this kundli, not a saved script.`,
    natalLine,
    skyLine,
    intent ? personalizedFocus(ctx.natal, user.intentions) : `Current dasha ${ctx.natal.dasha.label} is the backdrop for this question.`,
    next
      ? `Nearest personal transit: **${next.planet} ${next.transitType}** in ${next.daysOut} day${next.daysOut === 1 ? "" : "s"} (${next.houseArea}). ${next.summary}`
      : "No major ingress in the next few days — use today's Choghadiya instead of waiting for a headline transit.",
    ctx.due.length ? `${ctx.due.length} prediction${ctx.due.length > 1 ? "s" : ""} waiting to be closed in the ledger.` : "",
  ]
    .filter(Boolean)
    .join("\n\n")

  return {
    content: body,
    citations: [cite("consultation", "Live natal + sky", "live")],
  }
}

export function localConsultReply(
  question: string,
  user: UserProfileData,
  predictions: DetailedPrediction[],
  astrologerName: string
): string {
  const first = (user.name || "there").split(" ")[0]
  const asked = question.trim() || "this"
  const facts = localAstroReply(asked, user, predictions, []).content.replace(/\*\*/g, "")
  return [
    `${first}, you asked me: “${asked}”.`,
    facts,
    `This is ${astrologerName} speaking from your chart, not a saved script. If this should be dated, we will save one line when the session ends.`,
  ].join("\n\n")
}

export async function askAstroAssistant(input: {
  question: string
  history: { role: "user" | "assistant"; content: string }[]
  context: string
  persona?: string
}): Promise<string | null> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
    const res = await fetch("/api/chat", {
      method: "POST",
      headers,
      body: JSON.stringify(input),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { text?: string; useLocal?: boolean }
    if (data.useLocal || !data.text?.trim()) return null
    return data.text.trim()
  } catch {
    return null
  }
}

export function snapshotForModel(user: UserProfileData, predictions: DetailedPrediction[]) {
  const ctx = buildChartContext(user, predictions)
  return [
    `Name: ${user.name}`,
    `Birth: ${user.dob} ${user.timeOfBirth} ${user.placeOfBirth}`,
    `Natal: Sun ${ctx.natal.sunSign}, Moon ${ctx.natal.moonSign} ${ctx.natal.moonNakshatra} p${ctx.natal.moonPada}, Lagna ${ctx.natal.lagnaSign}`,
    `Dasha: ${ctx.natal.dasha.label} (maha ${ctx.natal.dasha.maha.lord} until ${ctx.natal.dasha.maha.end.toDateString()})`,
    `Today: ${ctx.panchang.tithi}, ${ctx.panchang.nakshatra}, Moon ${ctx.panchang.moonSign}, Rahu Kaal ${ctx.panchang.rahuKaal.label}`,
    `Sade Sati: ${ctx.sade.label}`,
    `Mangal: ${ctx.mangal.verdict}`,
    `Sky flags: ${ctx.flags.map((f) => `${f.name} ${f.detail}`).join("; ") || "none"}`,
    `Next transits: ${ctx.transits
      .slice(0, 4)
      .map((t) => `${t.daysOut}d ${t.planet} ${t.transitType}`)
      .join("; ")}`,
    `Open predictions: ${ctx.open.map((p) => p.title).join("; ") || "none"}`,
    `Intentions: ${user.intentions.join(", ") || "none"}`,
  ].join("\n")
}

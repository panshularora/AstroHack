# AstroLive — Dated astrology that leaves a receipt

**AstroHack 2026 · Product submission**  
Prototype: live web app (Vite + React + Hono + SQLite)  
Demo login: `arjun.sharma@example.com` / `cosmic2026`  
Public proof: `/p/proof-dp2?from=ARJUN`  
Public board: `/board`

---

## 1. Problem comprehension

AstroLive.app today is a pay-per-minute marketplace: chat ₹10, talk ₹15, horoscope tiles, kundli, shop, pooja. That model has three operational bottlenecks that show up at scale.

1. **Acquisition is paid.** A session produces nothing a user would send to a friend except a screenshot. There is no structural reason for organic growth.
2. **Retention is a tile.** Daily horoscope is a commodity. After the call, the advice evaporates. There is no unfinished job that pulls the user back.
3. **Trust is a star.** 4.9 ratings do not tell a first-time buyer whether the last ten dated claims came true. High-intent users (career, money, marriage) cannot tell who is honest.

The brief asks for one of: structural virality, habit, new revenue, or a USP. This prototype is built so all four sit on the same loop, because they share one object: **a dated claim with an ending**.

---

## 2. Solution design

One sentence: **They named a date. You kept the card.**

```
Talk live
  → save one sentence with a check-by date
    → come back when the date arrives
      → mark yes / partly / no
        → public proof card
          → friend opens it (no login)
            → signs up with invite on the link
              → both get ₹50 of talk time
                → friend talks
```

That is the product, not a feature list. Everything else (kundli, today, dasha, board) exists to feed or prove that loop.

| Brief pillar | Object in the product | Live route |
|---|---|---|
| Structural virality | Public proof URL + invite on the link | `/p/:id?from=CODE`, `/app/share` |
| Habit | Due windows + daily check-in (7 days = ₹10) | `/app/ledger`, `/app/today`, Home |
| New revenue | Invite minutes, streak credit, Plus ledger, Family charts, PPM | `/app/subscription`, checkout API |
| USP | Rank by dated results, not stars | `/board`, Talk now sort |

---

## 3. Prototype functionality

Judges can walk this without a script.

1. Landing (`/`) — USP headline. Nav: loop, card, **Why this**.
2. Open a real card (`/p/proof-dp2?from=ARJUN`) — no login. Claim ₹50.
3. Proof board (`/board`) — experts ranked by marked outcomes.
4. Demo login — Home shows the due prediction or the daily return.
5. Talk now → a desk, not a SaaS call box. Face, chart, chat. Call/video **speaks** the answer. **Speak** for your voice. **Save this line with a date.**
6. Results — tabs plus **Two experts, one line** when a second opinion exists. **Did this happen?**
7. Public **tape** (`/tape`) — yeses and misses after life answered.
8. Invite — code `ARJUN`. Both wallets move when a new account uses it.

Backend: Hono + SQLite. Sessions, wallet, checkout (`confirm: true`, server deducts), ledger close, public proofs, proof-scores, daily check-in, referrals. Vedic math stays on-device (`src/lib/vedic`). Plans cannot be flipped from the client.

---

## 4. Project uniqueness

Comparable apps (AstroLive.app, Astrotalk, InstaAstro) sell **access**: minutes, a face, a shop.

This prototype sells **accountability**:

- A claim without a date is not saved.
- A date without a mark is an unfinished job.
- A mark becomes a public card, including when it did not happen.
- Experts rise on that board, not on review inflation.

That is a different category, not a reskin.

---

## 5. Scalability and feasibility

What is already production-shaped:

- Auth and entitlements on the server.
- Wallet ledger as an append-only table.
- Proof pages are static reads (`GET /api/proofs/:id`). They scale like any CDN page.
- Invite credit is one insert + two wallet rows. Cheap.
- Chart math is client-side. No astrology API tax per page view.
- Chat can use Grok (`XAI_API_KEY`) or the local Vedic snapshot.

What would scale next (not faked in the prototype):

- Real-time voice/video via a CPaaS (same room UX).
- Push on `target_date` (the habit trigger we already model).
- Proof-score as a nightly materialised view (the query is already grouped).

Nothing in the loop requires a new scientific breakthrough. It requires writing dates down and making the ending public.

---

## 6. Report clarity — 90-second demo

| Time | Action | What it proves |
|---|---|---|
| 0:00 | Landing | USP, problem |
| 0:20 | `/board` | Uniqueness |
| 0:35 | Public card + invite | Virality |
| 0:50 | Demo Home | Habit |
| 1:05 | Chat + save a line | Functionality |
| 1:20 | Results → Did this happen? | Core loop |
| 1:30 | Wallet / Plus | Revenue beyond minutes |

---

## 7. Business impact

**Today’s P&L on this category is minutes.** CAC is ads. Retention is notifications about generic horoscopes. Take-rate is the same as every other consult marketplace.

**If this loop works:**

- CAC falls because a true (or honest-false) card is a share people send without a coupon code.
- LTV rises because an open prediction is a reason to open the app again, and a closed one is a reason to talk again.
- Plus is not “remove ads.” Plus is “keep the full proof ledger.” That is a subscription attached to identity, not to content.
- Expert supply quality rises because the public board punishes empty confidence.

Unit economics already in the prototype:

- Chat from ₹10/min, call/video from ₹15/min (existing model, kept).
- Invite: ₹50 / ₹50 talk credit (growth spend, not a shop SKU).
- Streak: ₹10 / 7 days (habit subsidy).
- Plus ₹499, Family ₹999, charged only from wallet on the server.

---

## Scorecard map

| Criterion | Where it lives |
|---|---|
| Problem comprehension | This report §1. Landing “Why this.” |
| Solution design | The loop. Landing “The loop.” |
| Prototype functionality | Routes above. Working API + demo user. |
| Uniqueness | `/board` + public `/p/:id`. |
| Scalability / feasibility | This report §5. SQLite schema, server checkout. |
| Report clarity | This document. |
| Business impact | This report §7. Pricing + invite + Plus. |

The prototype is the argument. This report only names what is already on the screen.

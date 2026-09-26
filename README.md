# AstroLive: an astrology marketplace that keeps score

**What:** users chat with an astrologer, save any prediction with a date, and later mark whether it came true. Each resolved prediction becomes a public "proof" page, and astrologers are ranked on a leaderboard by their dated results.
**Why:** astrology apps sell predictions but never track them. AstroLive makes accuracy visible, and that record is the product's selling point.

**Live:** https://astro-hack-six.vercel.app · **Board:** https://astro-hack-six.vercel.app/board · **Public proof (no login):** https://astro-hack-six.vercel.app/p/proof-dp2?from=ARJUN
Demo account: `arjun.sharma@example.com` / `cosmic2026`

**Status:** a hackathon project (58 commits, 2–20 Aug 2026). It is deployed and working. On Vercel the API runs as a serverless function (`api/index.ts`) with an in-memory SQLite database that is re-seeded on each cold start, so sign-ups and new predictions there do not persist, and the `ws` signalling server is not available (call signalling falls back to HTTP polling). The only automated check is `npm run test:vedic`, which verifies the astrology calculations.

## How it works
| Part | Implementation | Where |
|---|---|---|
| Web app | Vite + React 19 + TypeScript + Tailwind v4, react-router, Recharts | `src/` |
| API | Hono on `@hono/node-server`: auth, plans, check-ins, invites, predictions and proof scores, horoscope / kundli / panchang, an SSE live "tape" (`/api/tape/stream`) | `server/index.ts` |
| Database | better-sqlite3 (WAL, foreign keys), 12-table schema | `server/schema.sql`, `server/db.ts` |
| Auth | scrypt password hashing with a random salt and constant-time compare; server-side session tokens | `server/auth.ts` |
| Payments | Server-side checkout and entitlements; Razorpay order/payment signatures verified with HMAC-SHA256 | `server/pay.ts` |
| Real-time calls | `ws` WebSocket signalling server at `/ws/rtc`; rooms authorised with HMAC-signed tokens (`timingSafeEqual`) | `server/rtc.ts` |
| Astrology maths | Vedic calculations on-device, with a verification script | `src/lib/vedic/`, `scripts/verify-vedic.ts` |

## Run locally
```bash
npm install && npm install --prefix server
npm run dev:all          # web (Vite) + API (tsx server/index.ts) together
# or separately:  npm run dev:server   and   npm run dev
npm run test:vedic       # astrology maths check
```
Environment variables: see `server/env.ts`. Razorpay keys and the RTC secret are optional for local demo mode.

## Judge path
1. `/`: the pitch and USP. 2. `/board`: experts ranked by dated results. 3. `/p/proof-dp2?from=ARJUN`: public proof. 4. Log in, then Home, then **Results**, then "Did this happen?". 5. Talk now, then **Save this line with a date**. 6. `/app/share`: referral credit (₹50 each).

## Repo notes
- Submission documents: `AstroHack_Submission.docx/.pdf`, `REPORT.md`.
- The numbered `1.md`–`12.md` files, the design-prototype folders and `prompt.md` are working notes. Moving them into `docs/` (or deleting them) would make the repo easier to read.

## Next steps
API tests for auth, checkout signature verification and the proof-score logic; a CI workflow running `npm run build` and the tests.

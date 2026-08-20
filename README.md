# AstroLive

Talk to an astrologer, save what they predicted with a date, and later mark whether it came true. That result is a public page anyone can open.

**Live:** https://astro-hack-six.vercel.app  
**Code:** https://github.com/panshularora/AstroHack  
**Submission:** [AstroHack_Submission.docx](./AstroHack_Submission.docx)

Demo: `arjun.sharma@example.com` / `cosmic2026`  
Public card (no login): https://astro-hack-six.vercel.app/p/proof-dp2?from=ARJUN  
Board: https://astro-hack-six.vercel.app/board

## Run locally

```bash
# API (port 8787)
cd server
npm install
npx tsx index.ts

# Web (port 5174)
cd ..
npm install
npm run dev -- --host 127.0.0.1 --port 5174
```

Open http://127.0.0.1:5174/

Demo: `arjun.sharma@example.com` / `cosmic2026`

## Judge path

1. `/` — USP and **Why this** (virality, habit, revenue, USP).
2. `/board` — experts ranked by dated results.
3. `/p/proof-dp2?from=ARJUN` — public proof, no login.
4. Log in → Home → **Results** → Did this happen?
5. Talk now → chat → **Save this line with a date**.
6. `/app/share` — invite code. Both get ₹50 when a new account uses it.

## Documents

- **`AstroHack_Submission.docx`** — document to submit (problem, AstroLive teardown, what we built, every surface, impact, metrics, how to evaluate).
- [REPORT.md](./REPORT.md) — short justifying notes.
- `AstroHack_Report.docx` — short Word version of those notes.

## Stack

Vite + React + TypeScript + Tailwind. Hono API + SQLite. Vedic math on-device (`src/lib/vedic`). Checkout and entitlements on the server only.

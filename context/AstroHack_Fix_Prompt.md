# AstroHack — Single Master Fix Prompt

Paste this entire prompt into your AI editor (Cursor / Claude Code / Windsurf) with the repo open.

---

## PROMPT

You are refactoring the AstroLive 2.0 hackathon project at `panshularora/AstroHack`. The codebase is React + TypeScript + Vite + Tailwind v4. The design system in `src/index.css` is excellent and already defines the full token set — the problem is that many components ignore it and use old/wrong classes. Do NOT change `index.css`, `package.json`, or any routing. Fix every issue below precisely.

---

### FIX 1 — Install react-markdown and fix the ChatInterface

**File:** `src/components/companion/ChatInterface.tsx`

The AI assistant messages render raw markdown as plain text with visible `**asterisks**`. Fix this:

1. Run `npm install react-markdown` first.
2. Import `ReactMarkdown` from `'react-markdown'` at the top.
3. In the message rendering, replace:
   ```tsx
   <div className="whitespace-pre-wrap">{msg.content}</div>
   ```
   with:
   ```tsx
   <ReactMarkdown
     className="prose prose-sm max-w-none prose-invert prose-p:leading-relaxed prose-strong:text-gold-bright prose-p:text-ink/90"
     components={{
       p: ({ children }) => <p className="mb-2 last:mb-0 text-sm leading-relaxed">{children}</p>,
       strong: ({ children }) => <strong className="font-semibold text-gold-bright">{children}</strong>,
     }}
   >
     {msg.content}
   </ReactMarkdown>
   ```
4. The chat container div currently has `rounded-3xl` and `bg-card/50` — these classes don't exist in the design system. Replace the outer container className with:
   `"flex flex-col h-[600px] bg-surface border border-line rounded-lg overflow-hidden relative"`
5. The user message bubble has `bg-primary` (doesn't exist). Change to `bg-brand text-white rounded-lg rounded-tr-sm`.
6. The AI message bubble has `bg-black/40 rounded-2xl rounded-tl-sm`. Change to `bg-surface-2 border border-line rounded-lg rounded-tl-sm`.
7. The avatar for AI has `bg-gradient-to-tr from-primary to-blue-500 rounded-xl`. Change to `bg-brand-light border border-brand/30 rounded-md`.
8. The "Proactive Alert Banner" has `bg-primary/10 border-primary/20`. Change to `bg-brand-light border-b border-brand/20`.
9. The suggestion chips at the bottom have dark styling. Give them: `bg-surface-2 border border-line hover:border-brand/50 text-ink-secondary hover:text-ink text-xs px-3 py-2 rounded-md transition-soft cursor-pointer`.
10. The send button: replace any `bg-primary` with `bg-brand hover:bg-brand-hover`.

---

### FIX 2 — Rebuild the Landing page HeroSection

**File:** `src/components/landing/HeroSection.tsx`  
(Also check `src/components/landing/AnimatedHero.tsx` — use whichever is actually rendered by `src/pages/Landing.tsx`)

The current hero uses classes that don't exist in the design system (`bg-card`, `text-lavender`, `rounded-full` on large blobs, `bg-gradient-to-r from-white via-lavender`). Full replacement:

Replace the entire component content with this structure:

```tsx
export function AnimatedHero() {  // or HeroSection — match whichever name is used
  const navigate = useNavigate()
  
  return (
    <section className="cosmic-hero min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center relative overflow-hidden bg-stars">
      
      {/* Subtle radial glow — use existing design token colors only */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/5 blur-[100px]" />
      </div>

      {/* Eyebrow pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-light border border-brand/25 rounded-md font-mono text-[11px] text-brand tracking-[0.14em] uppercase mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        Vedic Astrological Intelligence
      </div>

      {/* Main headline — use font-display (Instrument Serif) */}
      <h1 className="font-display text-display text-ink max-w-4xl mx-auto text-balance mb-6">
        Your cosmic journey,{" "}
        <span className="text-gradient-gold">continuously intelligent.</span>
      </h1>

      {/* Subtext */}
      <p className="text-subtitle text-ink-secondary max-w-2xl mx-auto mb-10 text-pretty">
        AstroLive turns Vedic astrology from one-time readings into a lifelong companion. 
        Track prediction proof, log remedies, and stay aligned with live planetary transits.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
        <button
          onClick={() => navigate('/app/dashboard')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand hover:bg-brand-hover text-white font-medium text-sm rounded-md transition-soft shadow-glow-gold"
        >
          Enter Live Field <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => navigate('/app/dashboard')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-ink border border-line hover:border-line-strong font-medium text-sm rounded-md transition-soft"
        >
          Try Demo Account
        </button>
      </div>

      {/* Live status bar */}
      <div className="w-full max-w-2xl mx-auto px-5 py-3 bg-surface/60 border border-line backdrop-blur-sm rounded-lg flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-2 text-brand">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-ink-secondary uppercase tracking-[0.12em]">Active Kundli Transit Alignment</span>
        </div>
        <span className="text-ink-tertiary">Arjun's Chart · Leo Sun · Scorpio Ascendant</span>
      </div>

    </section>
  )
}
```

Make sure to import `ArrowRight` from `lucide-react` and `useNavigate` from `react-router-dom`.

Remove or empty out `EcosystemTimeline.tsx`, `FeaturesSection.tsx`, `TimelineSection.tsx` if they render AI-slop content — replace their content with `return null` temporarily so the landing page is clean and focused.

---

### FIX 3 — Fix the Dashboard CosmicHero dark band

**File:** `src/components/visual/CosmicHero.tsx`

This is the dark hero section at the top of the Dashboard. Check if it uses any classes that don't exist in the design system (like `bg-night`, `bg-gradient-to-b from-[#080C14]`, or hardcoded hex values). Ensure the wrapper uses `className="cosmic-hero"` as defined in index.css rather than custom hex backgrounds. The `cosmic-hero` class gives the correct gradient. The content should have `padding-top: 3rem` and `padding-bottom: 2.5rem` and `padding-left/right: 2.5rem` on larger screens.

---

### FIX 4 — Fix the Sidebar "NOW / TODAY / LIVE" meta badges

**File:** `src/components/navigation/Sidebar.tsx`

The meta badges ("NOW", "TODAY", "LIVE") currently look like generic Bootstrap badges. They should feel intentional. Replace the badge rendering with:

```tsx
{item.meta && (
  <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-[2px] ${
    item.meta === 'Live' 
      ? 'bg-success/15 text-success border border-success/25' 
      : 'bg-brand-light text-brand border border-brand/20'
  }`}>
    {item.meta}
  </span>
)}
```

---

### FIX 5 — Fix the Astrologer cards (AstrologerGrid)

**File:** `src/components/verified/AstrologerGrid.tsx`

The letter avatar (`"AC"`, `"PA"`) looks like a placeholder. Make it feel intentional:

Replace the avatar element (wherever it renders the 2-letter initials box) with:
```tsx
<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand/30 to-brand-hover/20 border border-brand/30 flex items-center justify-center font-mono font-bold text-sm text-gold-bright shrink-0 shadow-glow">
  {initials}
</div>
```

The accuracy percentage ("96% ACCURACY") needs context. Find where it renders and add below it:
```tsx
<p className="font-mono text-[9px] text-ink-tertiary mt-0.5 uppercase tracking-[0.1em]">
  of {astrologer.consultationCount} tracked predictions
</p>
```

The "Connect Live" button: if it uses any class not in the design system (like `bg-primary`, `bg-orange-500`), replace with `bg-brand hover:bg-brand-hover text-white`.

---

### FIX 6 — Add context labels to all bare numbers on the Dashboard

**File:** `src/pages/Dashboard.tsx`

The "Alignment 88" center of the cosmic ring has no explanation. Find the element with the score and add below the number:
```tsx
<span className="font-mono text-[9px] text-white/70 uppercase tracking-[0.14em] mt-0.5 block">
  / 100 today
</span>
```

The planet selector buttons at the bottom: if they use `bg-surface`, `bg-brand` etc already this is fine. If they use `bg-primary` or any non-existent class, replace with the correct tokens.

---

### FIX 7 — Fix the Reports page chart labels

**File:** `src/components/reports/EmotionalTrendsChart.tsx` (or wherever the Reports line chart lives)

The "Mental Clarity vs. Transit Intensity" chart has no X-axis labels and no legend. Add these to the Recharts `LineChart` or `AreaChart`:

1. Add a `Legend` component: `import { Legend } from 'recharts'` and add `<Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'var(--font-mono)' }} />` inside the chart.
2. The XAxis currently has no data labels — find the `<XAxis />` and add: `tick={{ fontSize: 11, fill: '#78716C', fontFamily: 'var(--font-mono)' }} tickLine={false} axisLine={false}`.
3. If the XAxis `dataKey` is missing, add `dataKey="month"` (or whatever the month field is in the data).
4. Add proper stroke colors for each line using design tokens: use `stroke="#D97706"` for the clarity line and `stroke="#EF4444"` for the intensity line.

---

### FIX 8 — Fix the AICompanion page layout

**File:** `src/pages/AICompanion.tsx`

The page renders a 3-column layout (sidebar + chat + context panel) but on the actual screenshots the right context panel feels detached. Ensure:

1. The main content area uses `ivory-content` class for the right panel background so it contrasts with the dark chat panel.
2. The "Memory Context" panel on the right: wrap it in `className="bg-ivory border-l border-ivory-border p-6 space-y-6"` to create the dark→light editorial split that's defined in the design system but not being used.
3. The "Latest Session Notes" section header: use `className="font-mono text-[10px] tracking-[0.16em] uppercase text-brand"`.

---

### FIX 9 — Make the landing TestimonialsSection feel human

**File:** `src/components/landing/TestimonialsSection.tsx`

The testimonials currently look like generic SaaS review cards. Replace the 3 testimonial texts and names with these specific, realistic, Indian-user quotes:

```
Quote 1: "Madhav predicted my company switch would happen before Diwali. I got the offer October 14th. I logged it in Cosmic Memory the same night."
Name: Priya S., Mumbai — Scorpio ♏ — 4 consultations

Quote 2: "I was sceptical about the accuracy tracking. Then Pandit Rajesh's relationship prediction came true in 6 weeks exactly. The proof is right there in my timeline."  
Name: Arjun K., Bangalore — Leo ♌ — 7 consultations

Quote 3: "No other app remembered what my last astrologer told me. AstroLive 2.0 literally nudged me 3 days before my predicted career window opened."
Name: Sneha R., Delhi — Libra ♎ — 2 consultations
```

Each card: use `bg-ivory-card border border-ivory-border shadow-sm` on a light background section. The section wrapper itself: `className="ivory-content py-20 px-6"` to use the ivory editorial surface correctly.

---

### FIX 10 — Global consistency pass

Do this across ALL files:

1. **Find and replace every instance of these non-existent classes** and replace with the correct design-system equivalent:
   - `bg-primary` → `bg-brand`
   - `bg-primary/10` → `bg-brand-light`
   - `border-primary` → `border-brand`
   - `text-primary` → `text-brand`
   - `text-lavender` → `text-ink-secondary`
   - `bg-card` → `bg-surface`
   - `bg-card/50` → `bg-surface/80`
   - `rounded-2xl` → `rounded-lg` (the design system uses sharp, architectural corners — see index.css: "NO AI bubble pills")
   - `rounded-3xl` → `rounded-lg`
   - `rounded-xl` on chat bubbles or cards → `rounded-md`
   - `from-primary` in gradients → `from-brand`
   - Any `via-lavender` → remove or replace with `via-brand/50`
   - `bg-white/5 border border-white/10` (generic dark glass) → `bg-surface-2 border border-line`

2. **Remove all** `.bg-gradient-to-r from-white via-lavender to-secondary` headline gradients on the landing page — replace with `text-gradient-gold` or `text-ink` as appropriate.

3. **Every `font-mono` label that is ALL CAPS** must have `tracking-[0.12em]` or higher — this is already defined in `.text-overline` class. Swap to `className="text-overline text-ink-secondary"` where appropriate.

4. In `src/components/navigation/Sidebar.tsx`, the user avatar at the bottom uses `bg-brand text-white`. This is correct — leave it. The `rounded-md` is correct — leave it.

5. In any page that has a hero section followed by content, ensure the hero uses `cosmic-hero` class and the content uses `ivory-content` class with `cosmic-seam` between them. This is the signature aesthetic defined in the design system that is currently only used on the Dashboard.

---

### VERIFICATION CHECKLIST

After making all changes, verify:
- [ ] Chat messages with `**bold**` render as bold text, not asterisks
- [ ] Landing hero has no `bg-card`, `text-lavender`, or `rounded-3xl` classes
- [ ] Landing hero uses `font-display` for the headline
- [ ] Astrologer avatars show accuracy with "of X predictions" context
- [ ] Reports chart has a legend and X-axis month labels  
- [ ] "NOW", "TODAY", "LIVE" badges in sidebar use success/brand colors not generic gray
- [ ] AI Companion right panel uses `ivory-content` background class
- [ ] No `rounded-2xl` or `rounded-3xl` on card components (use `rounded-lg` or `rounded-md`)
- [ ] Run `npm run build` — must pass with 0 errors

Do not change `index.css`. Do not change `src/routes/index.tsx`. Do not change `src/lib/mock-data.ts`. Only fix what is listed above.

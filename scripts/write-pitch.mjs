import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, LevelFormat, PageBreak, VerticalAlign,
  TabStopType, TabStopPosition,
} from "docx"
import fs from "node:fs"

const pageWidth = 12240
const pageHeight = 15840
const margin = 1080
const content = pageWidth - margin * 2 // 10080 with 0.75" — wait we use 1080 = 0.75"
// User asked 8 pages. 0.75" margins give more words per page; 1" is more editorial.
// Use 1" (1440) for a pitch that feels like a printed brief.
const m = 1440
const W = pageWidth - m * 2 // 9360

const ink = "111113"
const mute = "52525B"
const faint = "71717A"
const paper = "FAFAFA"
const rule = { style: BorderStyle.SINGLE, size: 6, color: "111113" }
const hair = { style: BorderStyle.SINGLE, size: 4, color: "D4D4D8" }
const borders = { top: hair, bottom: hair, left: hair, right: hair }
const cellPad = { top: 50, bottom: 50, left: 100, right: 100 }
const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }
const noBorders = { top: none, bottom: none, left: none, right: none }

const run = (text, opts = {}) =>
  new TextRun({
    text,
    font: opts.font ?? "Arial",
    size: opts.size ?? 22,
    color: opts.color ?? ink,
    bold: opts.bold,
    italics: opts.italics,
    allCaps: opts.allCaps,
  })

const p = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: opts.line ?? 252 },
    alignment: opts.align,
    border: opts.border,
    children: Array.isArray(text) ? text : [run(text, opts)],
  })

const h1 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 200, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "111113", space: 4 } },
    children: [run(text, { bold: true, size: 32 })],
  })

const h2 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [run(text, { bold: true, size: 26 })],
  })

const h3 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 80 },
    children: [run(text, { bold: true, size: 22, color: mute })],
  })

const bullet = (text, ref = "bullets") =>
  new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 60, line: 252 },
    children: [run(text)],
  })

const quote = (text) =>
  new Paragraph({
    spacing: { before: 100, after: 140, line: 276 },
    indent: { left: 240, right: 240 },
    border: { left: { style: BorderStyle.SINGLE, size: 16, color: "111113", space: 12 } },
    children: [run(text, { italics: true, size: 24 })],
  })

const cell = (text, width, header = false, opts = {}) =>
  new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: {
      fill: header ? "111113" : opts.fill ?? "FFFFFF",
      type: ShadingType.CLEAR,
    },
    margins: cellPad,
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        children: [
          run(text, {
            size: opts.size ?? 20,
            bold: header || opts.bold,
            color: header ? paper : opts.color ?? ink,
            italics: opts.italics,
          }),
        ],
      }),
    ],
  })

const table = (headers, rows, widths) =>
  new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((t, i) => cell(t, widths[i], true)),
      }),
      ...rows.map((r, ri) =>
        new TableRow({
          children: r.map((t, i) =>
            cell(String(t), widths[i], false, { fill: ri % 2 === 0 ? "F4F4F5" : "FFFFFF" })
          ),
        })
      ),
    ],
  })

const spacer = (after = 200) => p("", { after, size: 8 })

const page = () => new Paragraph({ children: [new PageBreak()] })

const kicker = (text) =>
  p(text, { size: 18, color: mute, allCaps: true, after: 80, bold: true })

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: ink },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: ink },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: mute },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "b2",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "b3",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "b4",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "b5",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "nums",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "demo",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: pageWidth, height: pageHeight },
        margin: { top: m, right: m, bottom: m, left: m },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "111113", space: 8 } },
          spacing: { after: 160 },
          children: [
            run("ASTROLIVE", { size: 18, bold: true }),
            run("    Product hackathon pitch    AstroHack 2026", { size: 18, color: mute }),
          ],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: "D4D4D8", space: 8 } },
          spacing: { before: 120 },
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            run("They named a date. You kept the card.", { size: 16, color: mute, italics: true }),
            run("\t", { size: 16 }),
            run("Page ", { size: 16, color: mute }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: mute }),
          ],
        })],
      }),
    },
    children: [
      // ───────── COVER ─────────
      kicker("PRODUCT HACKATHON SUBMISSION"),
      new Paragraph({
        spacing: { after: 80, before: 80 },
        children: [run("AstroLive", { size: 72, bold: true })],
      }),
      p("Dated astrology that leaves a receipt", { size: 28, after: 80 }),
      p("They named a date. You kept the card.", { italics: true, size: 26, color: mute, after: 280 }),

      table(
        ["Item", "Detail"],
        [
          ["Format", "Working web prototype, not a slide deck"],
          ["Category", "Live astrology consultations, India"],
          ["Incumbents", "AstroTalk (category), astrolive.app (direct)"],
          ["Thesis", "Sell accountability, not another minute"],
          ["North star", "Dated claims closed per active user"],
          ["Demo login", "arjun.sharma@example.com  /  cosmic2026"],
          ["Public proof", "/p/proof-dp2?from=ARJUN  (no login)"],
          ["Public board", "/board  (ranked by dated results)"],
          ["Invite", "Code ARJUN. Both wallets get Rs 50"],
        ],
        [2800, 6560]
      ),

      spacer(280),
      p("This document is the written argument. The prototype is the product. Judges should spend more time on the live loop than on these pages.", { italics: true, color: mute, after: 80 }),
      p("Sections: 1 Problem statement.  2 Teardown of AstroLive.  3 Proposed solution.  4 Expected impact.  5 Success metrics.  Appendix: 90-second demo and scorecard.", { size: 20, color: faint }),

      page(),

      // ───────── ONE PAGE PITCH ─────────
      h1("The pitch in one page"),
      quote("Other apps sell access to a face. We sell a dated claim with an ending. That object is how we acquire, retain, charge, and rank."),

      p("India already pays for astrology at scale. AstroTalk reported about Rs 1,176–1,214 crore of revenue in FY25, with consultations still ~80–90% of the mix, ~1.5 million transacting users, and roughly 25–30% repeating. That is not a demand problem. It is a product problem: after the minute is billed, nothing remains that a user would keep, mark, or send."),

      p("AstroLive.app, and every AstroTalk clone, is built as a mall. Chat from Rs 10. Talk from Rs 15. Horoscope tiles. Kundli. Shop. Pooja. The session produces a screenshot. Trust is a star. Retention is a daily paragraph. Growth is ads plus a first-free-call coupon. A challenger that copies this stack is a cheaper AstroTalk with less inventory. It cannot win."),

      p("Our bet: the missing object is a dated sentence. Talk live. Save one line with a check-by date. Come back when the date arrives. Mark yes, partly, or no. That mark becomes a public card. A friend opens it with no login. The invite is on the link. Both get talk credit. Experts rise on a board of marked outcomes, not review inflation."),

      h2("What is live today"),
      bullet("Public proof pages at /p/:id. No account required. Invite rides on the URL.", "b2"),
      bullet("A public board at /board. Experts ranked by dated results, including misses.", "b2"),
      bullet("Talk now with chat, call, and video. First three minutes free. Wallet deducts after. UPI top-up.", "b2"),
      bullet("Save this line with a date. Results has one job: Did this happen?", "b2"),
      bullet("First-login Rs 150. First recharge +Rs 50. Invite Rs 50 / Rs 50. Streak Rs 10 / 7 days.", "b2"),
      bullet("Plus Rs 499 and Family Rs 999 charged on the server. Dated PDF Rs 199. Second opinion Rs 99.", "b2"),
      bullet("English and Hindi. On-device Vedic math. Plans cannot be flipped from the client.", "b2"),

      h2("What we are not pitching"),
      p("We are not pitching a better horoscope tile, a bigger mall, or a more mystical AI. We are not cloning AstroMall. We are not asking judges to imagine a backend. Auth, wallet, checkout, proofs, referrals, and entitlements already run on the server."),

      page(),

      // ───────── 1 PROBLEM ─────────
      h1("1. Problem statement"),
      h2("The job people actually hire"),
      p("A person does not open an astrology app for a vibe. They open it because a decision has a date attached: a job offer, a marriage window, a money transfer, a visa, a court date, a pregnancy. They want a human who will look at a chart and say something specific. Then they want to know, later, whether that something happened."),

      p("That is a high-intent, high-anxiety, culturally fluent job. Therapy is still stigmatised for a large part of this audience. A pandit is not. The category grew because it is the socially permitted way to ask “will this work?” and sit with someone while you wait."),

      h2("The market is proven. The product is unfinished."),
      p("Public filings and reporting around AstroTalk (FY25) put operating revenue near Rs 1,176 crore, up ~83% year on year, with India still ~80% of mix. Consultations remain the engine. Remedies and D2C (AstroMall, marketplaces) are the second act, not the first. Take-rate on minutes is typically cited in the 20–25% range, though some practitioner reports put the cut much higher. Repeat is 25–30% of transacting users — respectable for a marketplace, fatal if you want a daily product."),

      p("Those numbers prove people will pay per minute. They do not prove the minute is a good product. They prove the opposite: the category can print rupees while still failing the job after the call ends."),

      h2("Three failures of the category"),
      h3("1. Acquisition is paid"),
      p("A session produces nothing a user would send to a friend except a screenshot of a chat. There is no structural reason for organic growth. Coupons, first-free-minutes, and app-install ads are the growth system. When the coupon ends, the user is gone. A shareable artifact does not exist, so CAC stays on the P&L forever."),

      h3("2. Retention is a tile"),
      p("Daily horoscope is a commodity. Every app has today’s rashi paragraph. After the call, the advice evaporates into a transcript the user will not re-open. There is no unfinished job that pulls them back on a specific morning. Push notifications say “Moon is in your 7th” — the same sentence 40 million other people received. Habit without a personal object is spam."),

      h3("3. Trust is a star"),
      p("4.9 ratings do not tell a first-time buyer whether the last ten dated claims came true. High-intent users (career, money, marriage) cannot tell who is honest. Review inflation is the native language of this marketplace. An expert who says “yes, soon” collects stars. An expert who names 14 August and misses should fall. Today they do not, because the product never asked for a date, and never asked for an ending."),

      h2("Who is hurt"),
      table(
        ["Person", "What they need", "What they get today"],
        [
          ["Seeker, first time", "A reason to trust this face", "Stars, years of experience, a smile"],
          ["Seeker, returning", "Did last month’s line happen?", "A new chat window. Pay again."],
          ["Seeker, sharing", "Something a sister can open", "A screenshot. No context. No invite."],
          ["Honest expert", "Credit for being specific", "Buried under 4.9s who stay vague"],
          ["Vague expert", "Nothing — they are rewarded", "Volume, not accountability"],
          ["The platform", "Organic loops and LTV", "Ads, coupons, a shop on the side"],
        ],
        [2200, 3280, 3880]
      ),

      spacer(200),
      h2("The problem we refuse to solve"),
      p("We are not trying to make astrology more scientific. We are not trying to replace the astrologer with a model. We are not trying to win on SKU count. The problem is operational: the marketplace has no leftover object, no honest ranking, and no reason to return that is not another billed minute. Fix the object and the rest of the P&L can sit on it."),

      quote("A claim without a date is not advice. It is atmosphere. Atmosphere cannot be verified, shared, or ranked. That is why every clone looks the same."),

      h2("Why a challenger can win here"),
      p("AstroTalk’s advantage is supply and brand. A weekend product cannot out-mall them, and should not try. A challenger can out-design the leftover: a dated card (a public GET), an invite (two wallet rows), a board (a GROUP BY). None of this needs a new model of the sky. It needs the date written down and the ending made public. That is the problem this prototype exists to attack."),

      page(),

      // ───────── 2 TEARDOWN ─────────
      h1("2. Teardown of AstroLive"),
      p("AstroLive (astrolive.app, also on the App Store and Play Store as “AstroLive – Talk to Astrologer”) is a live-consultation marketplace positioned under AstroTalk. It is the product we were asked to analyse, and the product a naive rebuild would copy."),

      h2("What it is, as shipped"),
      p("The live site and store listings describe a familiar stack:"),
      bullet("Live audio or video with professional astrologers. Store copy still says “Rs 10 per call” in places; the web product sells chat at Rs 10/min and talk at Rs 15/min.", "b3"),
      bullet("Free trial for new users (three free calls in store copy; first consultation free on the marketing site).", "b3"),
      bullet("Chat as a second mode.", "b3"),
      bullet("No scheduling required. Connect when someone is online.", "b3"),
      bullet("Adjacent utilities: daily horoscope, today’s panchang, kundli match, free kundli, love calculator, wallet.", "b3"),
      bullet("A grid of astrologers. Live sessions. App download CTAs.", "b3"),

      p("This is a competent clone of the AstroTalk home: a feed of faces, a price per minute, a wallet, and a row of free tools that exist to give a non-paying user something to tap. It is not a distinct product. It is a distribution of the same job with less catalogue."),

      h2("The user journey, as it actually runs"),
      table(
        ["Step", "What the user does", "What the product keeps"],
        [
          ["Land", "Sees faces, rates, online dots", "A session of browsing. No artifact."],
          ["Tap a tool", "Kundli, horoscope, love calculator", "A generated page. Commodity."],
          ["Pick a face", "Filters by skill, language, price", "A star and a rate. Not a record."],
          ["Pay / trial", "Wallet or first-free minutes", "A balance. Same as every rival."],
          ["Talk", "Chat, call, or video. Clock runs.", "A transcript, if anything."],
          ["Hang up", "Advice is in the user’s head", "Nothing dated. Nothing public."],
          ["Next day", "A horoscope tile, a push", "The same paragraph as everyone."],
          ["Share", "Screenshot of a chat bubble", "Zero new users. Zero proof."],
        ],
        [1600, 3680, 4080]
      ),

      spacer(200),
      p("The journey has a hole after hang-up. That hole is the entire product opportunity. Everything above hang-up is a commodity. Everything below it is missing."),

      h2("Feature inventory versus jobs"),
      table(
        ["Surface", "Job it claims", "Job it actually does", "Keep / kill / replace"],
        [
          ["Talk / chat / video", "Get advice now", "Sells minutes. Works.", "Keep. It is the engine."],
          ["Wallet", "Pay without friction", "Works. Table stakes.", "Keep."],
          ["Free first minutes", "Reduce trial anxiety", "Works as a coupon, not a loop.", "Keep, attach to a card."],
          ["Daily horoscope", "Give a reason to open", "Commodity paragraph.", "Replace with due claims."],
          ["Free kundli", "SEO + utility", "Everyone has this.", "Keep as a public tool."],
          ["Kundli match", "Marriage intent", "Guna milan is real. Love calculator is not.", "Keep the 36-guna version."],
          ["Panchang", "Today’s limbs", "Useful if computed, not copied.", "Keep, compute locally."],
          ["Astrologer grid", "Pick a person", "Ranked by stars and online.", "Replace rank with proof."],
          ["Shop / pooja mall", "Second revenue", "AstroTalk’s D2C. A clone loses.", "Do not clone the mall."],
          ["Ratings", "Trust", "Inflated. Not dated.", "Replace with a board."],
        ],
        [2000, 2200, 2760, 2400]
      ),

      spacer(200),
      h2("Where AstroLive is weaker than AstroTalk"),
      bullet("Supply. AstroTalk cites 10,000+ astrologers and crores of registered users. AstroLive cannot win a density contest.", "b4"),
      bullet("Brand. “Talk to an astrologer” already means AstroTalk for a large Hindi-speaking audience.", "b4"),
      bullet("Remedies commerce. AstroTalk has spent years standing up a store. Copying SKUs is how a challenger looks small.", "b4"),
      bullet("Habit surfaces. Horoscope, panchang, and kundli on AstroLive are the same tiles, with less editorial weight.", "b4"),
      bullet("After-call. Neither product dates the claim. AstroTalk at least has more of the user’s history in one account. AstroLive still evaporates.", "b4"),

      h2("The clone trap"),
      p("Live consult at Rs 10 / Rs 15, first-free minutes, and a wallet are the right pipe. They are not the product. The product is what remains when the pipe is turned off."),
      p("A typical “beat AstroTalk in a hackathon” rebuild does this: prettier cards, more AI chat, a shop, reels, a pooja fire animation, a bigger dashboard. That is how you lose. You spend the weekend on surfaces AstroTalk will ship better next quarter, and you still have no leftover object."),

      p("The teardown’s conclusion is therefore narrow: keep the live minute. Kill the mall-as-identity. Replace stars with dated outcomes. Replace the horoscope tile as the daily hook with a claim that is due. Put an invite on a public card, not in a referral settings page nobody opens."),

      quote("AstroLive today is a storefront. The storefront is fine. It is not a reason to exist. The reason to exist is a card a sister can open on a phone, with a date, a result, and fifty rupees of talk time waiting if she stays."),

      page(),

      // ───────── 3 SOLUTION ─────────
      h1("3. Proposed solution"),
      h2("One sentence"),
      p("They named a date. You kept the card.", { italics: true, size: 26, after: 200 }),
      p("A person talks to a live expert. One sentence is saved with a check-by date. When the date arrives, the user marks yes, partly, or no. That mark is a public proof card. A friend opens it without logging in. The invite is on the link. Both wallets move. Experts are ranked by those endings. Minutes, Plus, and first-time perks sit on top of that loop. They are not the loop."),

      h2("The object"),
      p("The product is not a dashboard of features. It is one object with four fields that must all exist:"),
      table(
        ["Field", "Rule", "If missing"],
        [
          ["The line", "One sentence the expert actually said", "Nothing to keep. Chat evaporates."],
          ["The date", "A check-by day, not “soon”", "Cannot form a habit. Cannot rank."],
          ["The mark", "Yes / partly / no, by the user", "No honesty. No board."],
          ["The card", "Public URL, including misses", "No virality. No tape."],
        ],
        [2000, 4000, 3360]
      ),

      spacer(200),
      p("A claim without a date is not saved. A date without a mark is an unfinished job on Home. A mark becomes a card, including when it did not happen. That last clause is the USP. Misses stay on the tape. A product that hides misses is a brochure. A product that shows them is a ledger."),

      h2("The loop, as a user lives it"),
      p("Talk live → save one sentence with a check-by date → come back when the date arrives → mark yes / partly / no → public proof card → friend opens it (no login) → signs up with the invite on the link → both get Rs 50 of talk time → friend talks → a new line is dated."),
      p("That is also the growth model, the habit model, and the ranking model. One object, four jobs. The brief asked for structural virality, or habit, or new revenue, or a USP. We put all four on the same object because they share it."),

      h2("How the brief maps onto the prototype"),
      table(
        ["Brief pillar", "Object in the product", "Live route"],
        [
          ["Structural virality", "Public proof URL + invite on the link", "/p/:id?from=CODE, /app/share"],
          ["Habit", "Due windows + daily check-in (7 days = Rs 10)", "/app/ledger, /app/today, Home"],
          ["New revenue", "Invite minutes, streak, Plus, Family, PPM, PDF, second opinion", "/app/subscription, /app/wallet"],
          ["USP", "Rank by dated results, not stars", "/board, Talk now sort"],
        ],
        [2400, 4200, 2760]
      ),

      spacer(200),
      h2("What we shipped, in the order a judge should touch it"),
      h3("Public, no login"),
      bullet("Landing states the USP in the headline. Login is a white pill on the top right. English / Hindi toggle.", "b5"),
      bullet("A real card at /p/proof-dp2?from=ARJUN. Date, result, expert, invite. Claim Rs 50.", "b5"),
      bullet("Proof board at /board. Experts ordered by marked outcomes.", "b5"),
      bullet("Public kundli, panchang, guna milan, horoscope — computed, not a copied table. On-device Vedic math (Lahiri sidereal).", "b5"),
      bullet("Public tape at /tape. Yeses and misses after life answered.", "b5"),

      h3("After login"),
      bullet("Home is the due prediction or the daily return, not a metric card grid.", "b5"),
      bullet("Talk now is a desk: face, chart rail, chat. Call and video. Clock. Wallet ticker. First three minutes free, then deduct.", "b5"),
      bullet("Save this line with a date writes into Results. Results has one primary action: Did this happen?", "b5"),
      bullet("Wallet: UPI via Razorpay (test keys in this build). Packs, first-recharge bonus Rs 50. Fake confirm:true top-up is rejected by the API.", "b5"),
      bullet("Plus Rs 499 / Family Rs 999. Server is the only place a plan flips. Plus is “keep the full proof ledger,” not “remove ads.”", "b5"),
      bullet("Dated PDF Rs 199. Second opinion Rs 99. Lab / courier SKU at Rs 399 with a tracking number — honest about what is mock.", "b5"),
      bullet("Online puja is its own sitting (/app/puja), not a SKU inside Talk now. Reels are a retention surface, not a mall.", "b5"),
      bullet("Ask uses xAI when a key is present, otherwise the natal snapshot. No fake “AI insights” cards.", "b5"),

      h3("First-time economics, already in the ledger"),
      table(
        ["Lever", "Amount", "Job"],
        [
          ["Welcome credit", "Rs 150", "Reduce empty-wallet drop at first talk"],
          ["First session", "3 minutes free", "Taste the desk before the ticker"],
          ["First recharge bonus", "+Rs 50", "Paytm-style first top-up"],
          ["Invite (both sides)", "Rs 50 / Rs 50", "Card is the coupon"],
          ["Seven-day streak", "Rs 10", "Subsidy for the habit, not a game"],
          ["Chat / call", "from Rs 10 / Rs 15 per min", "Existing category engine, kept"],
          ["Plus / Family", "Rs 499 / Rs 999", "Ledger as identity, not content"],
        ],
        [2800, 2800, 3760]
      ),

      spacer(200),
      h2("What we deliberately did not build"),
      p("No AstroMall clone. No fire on puja. No boxed “AI insight” dashboard as the home. No client-side plan upgrade. No fake email on forgot-password. No invented astrology API. Chart math is local. Live video uses WebRTC with STUN; TURN is optional. Ask is optional xAI. The product works without those keys. That is a product decision: extras may deepen the desk, they must not be required to see the loop."),

      h2("Feasibility — why this is not a slide"),
      p("Auth is scrypt sessions on Hono. Wallet is an append-only table. Checkout for plans deducts on the server. Proof pages are static reads (GET /api/proofs/:id) and can sit on a CDN tomorrow. Invite credit is one insert and two wallet rows. Proof-score is a grouped query that can become a nightly view. None of this needs a scientific breakthrough. It needs dates written down and endings made public."),
      p("What would scale next, and is not faked: CPaaS behind the same room UX, push on target_date (the habit trigger already modelled), production Razorpay live keys, a real courier API behind the tracking number we already issue. The prototype is honest about those seams."),

      page(),

      // ───────── 4 IMPACT ─────────
      h1("4. Expected impact"),
      p("Today this category’s P&L is minutes. CAC is ads. Retention is generic horoscope notifications. Take-rate is the same as every other consult marketplace. If the dated-card loop works, three numbers move, in this order: cost to acquire, reason to return, mix of revenue that is not a minute."),

      h2("Acquisition — CAC can fall because the artifact is the ad"),
      p("A true card, or an honest miss, is a story a person already sends on WhatsApp. Today they send a screenshot. Tomorrow they send a URL that does not require an app install to read. The invite is on that URL. Both sides receive talk credit. That is paid acquisition with a 100% relevant creative, generated by the user’s own life, at the cost of Rs 100 of talk inventory (Rs 50 + Rs 50), not the cost of a Google UAC bid."),
      p("We do not claim “viral coefficient 1.4” from a weekend prototype. We claim the mechanism is in the product, not in a referral settings page. The success test is in section 5: invites accepted per closed card."),

      h2("Retention — an open date is an unfinished job"),
      p("Habit products need an unfinished object. Superhuman has unread. Duolingo has a streak. This product has a date. On the morning the claim is due, Home is not a horoscope. Home is “Did the bonus land?” That is a reason to open that no tile can match, because it is theirs."),
      p("Closing the claim is also a reason to talk again. Yes: “it happened, what is next.” No: “it missed, I want a second opinion for Rs 99.” Partly: “half-right, date the rest.” Retention and revenue share the same button."),

      h2("Revenue — minutes stay; they stop being the only story"),
      p("We keep pay-per-minute. It is the category’s proven engine and the honest way to pay a live expert. We add four lines that sit on the leftover:"),
      table(
        ["Line", "Why it exists", "Why it is not a mall"],
        [
          ["Invite / streak credit", "Growth and habit subsidy", "Inventory, not a SKU"],
          ["Plus Rs 499", "Keep the full proof ledger", "Identity, not content"],
          ["Family Rs 999", "Four charts, one roof", "Marriage and household intent"],
          ["PDF Rs 199, second opinion Rs 99", "Artifacts and doubt", "Jobs on the same claim"],
        ],
        [2800, 3280, 3280]
      ),
      spacer(160),
      p("Plus is not “remove ads.” A consult marketplace that sells ad-free is confused about what it is. Plus is the right to keep every dated card, unlimited AI questions against the natal snapshot, and a 45-day transit window. That is a subscription attached to a ledger of one’s life, which is the only subscription this category can defend."),

      h2("Supply — honest experts become findable"),
      p("The public board punishes empty confidence. An expert who dates claims and hits them rises. An expert who hides behind “soon” does not appear. Over time this is a supply-quality flywheel AstroTalk cannot copy without making its own 4.9s look expensive. That is the only way a small roster beats a large one: fewer faces, harder to fake."),

      h2("Brand — a challenger with a sentence"),
      p("AstroTalk’s brand is access: “talk now.” AstroLive’s brand, if this ships, is accountability: “they named a date.” Those are different category positions. Access will always go to the densest marketplace. Accountability can go to the product that publishes endings. We would rather be small and specific than large and identical."),

      h2("Unit economics already in the build"),
      table(
        ["Unit", "Prototype value", "Note"],
        [
          ["Chat", "from Rs 10 / min", "Kept from the category"],
          ["Call / video", "from Rs 15 / min", "Kept from the category"],
          ["Welcome", "Rs 150", "Once, on first login"],
          ["First three minutes", "Rs 0", "Once, then ticker"],
          ["Invite pair", "Rs 100 talk inventory", "Only on a new account using the code"],
          ["Streak", "Rs 10 / 7 days", "Capped subsidy"],
          ["Plus", "Rs 499 / mo + Rs 200 talk", "Server charged"],
          ["Family", "Rs 999 / mo + Rs 300 talk", "Server charged"],
          ["Dated PDF", "Rs 199", "Artifact of the ledger"],
          ["Second opinion", "Rs 99", "Doubt, monetised honestly"],
        ],
        [2800, 2800, 3760]
      ),

      spacer(200),
      h2("If it fails"),
      p("If people will not date a claim, we have a counselling app with a clock, and we should not pretend otherwise. If they date but never mark, we have a notes app. If they mark but never send, we have a private journal with a nicer typeface. Each failure mode is observable in the metrics in the next section. The prototype is built so those numbers can exist. That is the impact we are willing to be judged on."),

      page(),

      // ───────── 5 METRICS ─────────
      h1("5. Success metrics"),
      h2("North star"),
      p("Dated claims closed per weekly active user.", { bold: true, size: 24, after: 160 }),
      p("Not minutes consumed. Minutes are the fuel. Not DAU. DAU can be a horoscope tile. Not GMV. GMV can be a mall. A closed claim means a date was named, time passed, and a human marked an ending. That is the product happening. Everything else is a leading or lagging view of that event."),

      h2("The metric tree"),
      table(
        ["Layer", "Metric", "Why it matters"],
        [
          ["Input", "% of sessions that save a dated line", "If this is low, the desk failed"],
          ["Input", "Median days from save to due date", "Too far = forgotten. Too near = noise"],
          ["Core", "Claims closed / WAU", "North star"],
          ["Core", "Yes / partly / no mix", "All-yes is fake. All-no is churn"],
          ["Habit", "D1 / D7 return on due date", "The unfinished job"],
          ["Habit", "7-day check-in completion", "Subsidy should follow this, not lead it"],
          ["Virality", "Public card opens / closed claim", "Is the card worth sending?"],
          ["Virality", "Invites accepted / card open", "Is the invite load-bearing?"],
          ["Revenue", "PPM GMV / WAU", "Engine still healthy"],
          ["Revenue", "Plus conversion of users with ≥3 closed claims", "Ledger as identity"],
          ["Trust", "Proof-score vs star-rating rank correlation", "Board must disagree with stars"],
          ["Trust", "% of cards that are misses still public", "Honesty, not a brochure"],
        ],
        [1800, 4000, 3560]
      ),

      spacer(200),
      h2("Targets for a 90-day private beta (directional, not theatre)"),
      p("These are the numbers we would hold ourselves to with a few thousand seekers and a small roster. They are not “we will 10x AstroTalk.” They are the smallest set that would prove the loop is real."),
      table(
        ["Metric", "90-day target", "Kill-the-idea threshold"],
        [
          ["Sessions that save a dated line", "≥ 40%", "< 15% after copy and prompt tests"],
          ["Due-date D1 return", "≥ 35%", "< 15%"],
          ["Closed claims / WAU / week", "≥ 0.6", "< 0.2"],
          ["Misses left public", "≥ 80% of no’s", "User-hidden misses > 40%"],
          ["Card opens from share", "≥ 1.2 per closed yes", "< 0.3"],
          ["Invite accept on those opens", "≥ 8%", "< 2% with credit still on"],
          ["Plus take among 3+ closers", "≥ 6%", "Indistinguishable from all users"],
          ["Board vs stars, top 10 overlap", "≤ 50%", "Same 10 faces as a star sort"],
        ],
        [3600, 2880, 2880]
      ),

      spacer(200),
      h2("Counter-metrics (how we know we are cheating)"),
      bullet("If yes-rate on closed claims sits above ~75% for a month, users are only dating safe lines, or experts are only allowing safe lines. The board becomes a brochure. We would force a prompt: “name a date you could be wrong.”"),
      bullet("If invite accepts spike while due-date return stays flat, we bought users with Rs 50 and did not buy the habit. Cut the credit, keep the card."),
      bullet("If PPM GMV falls while Plus rises, we accidentally replaced the expert with a subscription content farm. Kill that path. The expert is the product’s mouth."),
      bullet("If misses are public in the database but not in the UI, we shipped a lie. The tape is the brand."),

      h2("Judge-weekend metrics (what you can verify today)"),
      p("A hackathon cannot show 90-day D7. It can show that the instrumentation of those metrics already exists as product behaviour:"),
      table(
        ["You can do this now", "What it stands in for"],
        [
          ["Open /p/proof-dp2?from=ARJUN with no login", "Virality surface is real"],
          ["See a miss on /board, not only hits", "Honesty is not a slide"],
          ["Log in, save a line with a date, find it in Results", "The object can be created"],
          ["Mark it. The card updates.", "The unfinished job can close"],
          ["Create a second account with code ARJUN, watch both wallets", "Invite is a ledger event"],
          ["Attempt to PATCH a plan from the client", "Entitlements are server-side"],
          ["Empty the wallet, try to stay on a call", "Ticker and UPI overlay, not a fake confirm"],
        ],
        [5000, 4360]
      ),

      spacer(200),
      h2("Scorecard map"),
      table(
        ["Typical criterion", "Where it lives"],
        [
          ["Problem comprehension", "Section 1. Landing, Why this."],
          ["Solution design", "Section 3. The loop. Landing, The loop."],
          ["Prototype functionality", "Live routes above. Working API + demo user."],
          ["Uniqueness", "/board and public /p/:id. Misses stay."],
          ["Scalability / feasibility", "Section 3, Feasibility. SQLite schema, server checkout."],
          ["Report clarity", "This document."],
          ["Business impact", "Sections 4 and 5. Pricing, invite, Plus, metric tree."],
        ],
        [3200, 6160]
      ),

      // ───────── APPENDIX ─────────
      h1("Appendix. Ninety-second demo"),
      p("If a judge has one and a half minutes, use this path. Do not narrate the stack. Narrate the leftover."),
      table(
        ["Time", "Action", "What it proves"],
        [
          ["0:00", "Landing. Read the headline. Toggle Hindi.", "USP, locale, Login on the right"],
          ["0:15", "Open /board", "Uniqueness: ranked by dates"],
          ["0:30", "Open /p/proof-dp2?from=ARJUN", "Virality: no login, invite on the card"],
          ["0:45", "Demo login. Home.", "Habit: due claim or daily return"],
          ["1:00", "Talk now. Save this line with a date.", "Functionality: the object is created"],
          ["1:15", "Results → Did this happen?", "Core loop closes"],
          ["1:25", "Wallet / Plus", "Revenue beyond minutes"],
        ],
        [1400, 4200, 3760]
      ),

      spacer(240),
      h2("Demo credentials"),
      p("Email: arjun.sharma@example.com"),
      p("Password: cosmic2026"),
      p("Invite: ARJUN"),
      p("Public card: /p/proof-dp2?from=ARJUN"),
      p("Board: /board"),

      h2("What to say if asked “isn’t this just AstroTalk with a card?”"),
      p("AstroTalk sells the minute, then a shop. The minute is real. The shop is a second company. We sell the ending of the minute. The card is not a share sheet glued onto a clone. It is the ranking, the habit, the invite, and the subscription, using one object. If we ripped the card out, we would be AstroLive.app, and we would not have a reason to exist."),

      h2("Risks we are not hiding"),
      bullet("Experts may refuse to date claims. Then the desk must prompt, or the board stays empty. We would rather have an empty honest board than a full fake one."),
      bullet("Users may not want misses public. Default is public; hide is a choice we can add. The metric is how often they hide."),
      bullet("Astrology is a regulated-adjacent, high-emotion category. We do not diagnose. We do not promise outcomes. The card is a record of what was said, not a guarantee."),
      bullet("UPI in this build is Razorpay test. Live keys and a webhook secret in the dashboard are a go-live step, not a story."),

      spacer(160),
      p("The prototype is the argument. This report only names what is already on the screen.", { italics: true, size: 22, color: mute }),
      p("They named a date. You kept the card.", { italics: true, size: 28, bold: true, after: 40 }),
    ],
  }],
})

const buf = await Packer.toBuffer(doc)
const out = new URL("../AstroLive_Hackathon_Pitch.docx", import.meta.url)
fs.writeFileSync(out, buf)
console.log("wrote", out.pathname)

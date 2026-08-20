import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, LevelFormat, PageBreak, VerticalAlign,
  TabStopType, TabStopPosition,
} from "docx"
import fs from "node:fs"

const pageWidth = 12240
const pageHeight = 15840
const m = 1440
const W = pageWidth - m * 2
const ink = "111113"
const mute = "52525B"
const paper = "FAFAFA"
const hair = { style: BorderStyle.SINGLE, size: 4, color: "D4D4D8" }
const borders = { top: hair, bottom: hair, left: hair, right: hair }
const cellPad = { top: 50, bottom: 50, left: 100, right: 100 }

const run = (text, opts = {}) =>
  new TextRun({
    text,
    font: "Arial",
    size: opts.size ?? 22,
    color: opts.color ?? ink,
    bold: opts.bold,
    italics: opts.italics,
  })

const p = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: opts.line ?? 252 },
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
    spacing: { before: 200, after: 80 },
    children: [run(text, { bold: true, size: 26 })],
  })

const h3 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 140, after: 60 },
    children: [run(text, { bold: true, size: 22, color: mute })],
  })

const bullet = (text, ref = "bullets") =>
  new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 50, line: 252 },
    children: [run(text)],
  })

const cell = (text, width, header = false, opts = {}) =>
  new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: header ? "111113" : opts.fill ?? "FFFFFF", type: ShadingType.CLEAR },
    margins: cellPad,
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      children: [run(String(text), {
        size: opts.size ?? 19,
        bold: header || opts.bold,
        color: header ? paper : ink,
      })],
    })],
  })

const table = (headers, rows, widths) =>
  new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((t, i) => cell(t, widths[i], true)) }),
      ...rows.map((r, ri) =>
        new TableRow({
          children: r.map((t, i) => cell(t, widths[i], false, { fill: ri % 2 === 0 ? "F4F4F5" : "FFFFFF" })),
        })
      ),
    ],
  })

const spacer = (after = 160) => p("", { after, size: 8 })
const page = () => new Paragraph({ children: [new PageBreak()] })
const kicker = (text) => p(text, { size: 18, color: mute, after: 60, bold: true })

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: ink },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: ink },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: mute },
        paragraph: { spacing: { before: 140, after: 60 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [1, 2, 3, 4, 5, 6, 7].map((n) => ({
      reference: n === 1 ? "bullets" : `b${n}`,
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    })).concat([{
      reference: "steps",
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }]),
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
          spacing: { after: 140 },
          children: [
            run("ASTROLIVE", { size: 18, bold: true }),
            run("    AstroHack 2026    Project submission", { size: 18, color: mute }),
          ],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: "D4D4D8", space: 8 } },
          spacing: { before: 100 },
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            run("AstroLive  ·  Project submission", { size: 16, color: mute }),
            run("\tPage ", { size: 16, color: mute }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: mute }),
          ],
        })],
      }),
    },
    children: [
      kicker("ASTROHACK 2026  ·  PROJECT SUBMISSION"),
      new Paragraph({
        spacing: { after: 80, before: 40 },
        children: [run("AstroLive", { size: 64, bold: true })],
      }),
      p("A working web app to talk to an astrologer, save what they said with a date, and later mark whether it came true.", { size: 24, after: 160 }),

      h2("What this product is"),
      p("AstroLive is an astrology consultation app, like AstroTalk or the existing astrolive.app: you pick a live expert and talk by chat, phone, or video, paying from a wallet by the minute."),
      p("After the call, this app does one extra thing those products do not. You save one sentence the astrologer said, and you pick a date by which it should happen — for example, “a job offer will come by 14 August.” When that date arrives, Home asks you: did it happen? You mark Yes, Partly, or No."),
      p("That answer becomes a public page. Anyone can open it without logging in. If a friend signs up from the invite on that page, both of you get Rs 50 of talk time. Experts on the public board are ranked by these dated results, including the ones that missed, not only by star ratings."),
      p("Around that, the app also has kundli, panchang, kundli matching, daily horoscope, short reels, online puja as its own session, an Ask AI chat on your birth chart, English and Hindi, and UPI wallet top-up. Those tools support the consultation. The thing this product adds is the dated line, the later mark, and the public page."),

      h2("What a user actually does (example)"),
      p("Arjun logs in, opens Talk now, and starts a video session with Acharya Indu Prakash. The first three minutes are free; after that the wallet is charged per minute. He saves the line “a job offer will land in tech” with the date 14 August. On 14 August, Home shows that line and asks if it happened. He marks Yes. A public card is created. He sends the link to his sister. She opens it with no account. If she signs up with his code ARJUN, both wallets receive Rs 50, and she can talk to an expert herself."),

      spacer(80),
      table(
        ["Field", "Value"],
        [
          ["Live app", "https://astro-hack-six.vercel.app"],
          ["Source code", "https://github.com/panshularora/AstroHack"],
          ["This submission (Word)", "https://github.com/panshularora/AstroHack/blob/main/AstroHack_Submission.docx"],
          ["Demo login", "arjun.sharma@example.com  /  cosmic2026"],
          ["Invite code", "ARJUN  (both people get Rs 50 talk credit)"],
          ["Finished card (no login)", "https://astro-hack-six.vercel.app/p/proof-dp2?from=ARJUN"],
          ["Expert board (no login)", "https://astro-hack-six.vercel.app/board"],
          ["Yeses and misses (no login)", "https://astro-hack-six.vercel.app/tape"],
          ["Local (optional)", "http://127.0.0.1:5174  with API on port 8787"],
        ],
        [3200, 6160]
      ),

      spacer(160),
      h2("Contents"),
      p("1. Problem statement — why the current apps stop too early"),
      p("2. Analysis of AstroLive.app — what exists today, what is missing"),
      p("3. Our solution — what we built and how a user uses it"),
      p("4. Everything in the prototype — screens, wallet, plans, tools"),
      p("5. How it is built — server, wallet, payments, live call"),
      p("6. Expected impact — what changes if people use the dated line"),
      p("7. Success metrics — how we will know it is working"),
      p("8. How to try it — step-by-step for judges"),
      p("9. Appendix — full list of pages, APIs, and limits"),

      page(),

      // ───── 1 PROBLEM ─────
      h1("1. Problem statement"),
      h2("What people hire astrology for"),
      p("A user opens an astrology app because a decision has a date: a job, a marriage window, money, a visa, health. They want a person to look at a chart and say something specific. Later they want to know whether that something happened. Therapy is still hard to ask for in much of this audience. A consultation with an astrologer is not. That is the job."),

      h2("What the category actually sells"),
      p("The live-astrology category in India is a pay-per-minute marketplace. AstroTalk, the category leader, reported about Rs 1,176 crore operating revenue in FY25, with consultations still roughly 80–90% of mix and about 1.5 million transacting users. Repeat is reported around 25–30%. Chat, call, and video are billed by the minute. Trust is shown as stars and years of experience. After the call, the product offers a daily horoscope tile, a kundli tool, and increasingly a remedies shop."),
      p("Demand is not the problem. The product after hang-up is the problem."),

      h2("Three failures this submission treats as the brief"),
      h3("Acquisition is paid"),
      p("A session produces nothing a user would send except a screenshot of a chat. There is no page with a link. Growth is ads, coupons, and first-free minutes. When the coupon ends, the user has nothing to show a sister, and no reason for her to open the same app."),

      h3("Retention is a tile"),
      p("Daily horoscope is a commodity paragraph. After the call, advice sits in a transcript the user does not reopen. There is no unfinished personal job that is due on a specific morning. Push notifications repeat the same sky sentence for millions of people."),

      h3("Trust is a star"),
      p("A 4.9 rating does not say whether the last ten dated claims came true. High-intent users (career, money, marriage) cannot tell who is specific and who is vague. The product never required a date and never required an ending, so ranking cannot be honest."),

      h2("What the hackathon brief asked for"),
      p("The brief asks us to add at least one of: a way the product spreads by itself, a reason to come back every day, a new way to earn money, or a unique selling point — without copying AstroTalk’s shop. This prototype uses one thing for all four: a prediction with a date and a later Yes/No. Spreading happens when someone sends the public page. Coming back happens when the date arrives. New money sits on that record (Plus keeps the full list; a PDF and a second opinion cost extra). The unique point is ranking astrologers by those dated results. Everything else in the app supports that."),

      page(),

      // ───── 2 TEARDOWN ─────
      h1("2. Analysis and teardown of AstroLive"),
      p("AstroLive (astrolive.app; App Store and Play Store as “AstroLive – Talk to Astrologer”) is a live-consultation marketplace in the same job as AstroTalk. It is the product being analysed here, and the product a naive rebuild would copy."),

      h2("What AstroLive.app is today"),
      bullet("Live audio or video with astrologers. Store listings still say a nominal Rs 10 per call; the website sells chat at Rs 10/min and talk at Rs 15/min.", "b2"),
      bullet("A free trial for new users (three free calls in store copy; first consultation free on the marketing site).", "b2"),
      bullet("Chat as a second mode. No booking slot required if someone is online.", "b2"),
      bullet("Wallet.", "b2"),
      bullet("Utility row: daily horoscope, today’s panchang, kundli match, free kundli, love calculator.", "b2"),
      bullet("A grid of astrologers and live sessions, then an app-download CTA.", "b2"),

      p("This is the AstroTalk home screen with a smaller catalogue: faces, a rate, a wallet, and free tools that give a non-paying user something to tap. It is not a distinct product. It is the same job with less inventory."),

      h2("The user journey and what the product keeps"),
      table(
        ["Step", "User action", "What remains after"],
        [
          ["Land", "Sees faces, rates, online dots", "A browse session. No artifact."],
          ["Tap a tool", "Kundli, horoscope, love calculator", "A generated page. Commodity."],
          ["Pick a face", "Skill, language, price", "A star and a rate."],
          ["Pay or trial", "Wallet or first-free minutes", "A balance. Table stakes."],
          ["Talk", "Chat, call, or video. Clock runs.", "A transcript, if anything."],
          ["Hang up", "Advice is in the user’s head", "Nothing dated. Nothing public."],
          ["Next day", "Horoscope tile or a push", "The same paragraph as everyone."],
          ["Share", "Screenshot of a chat bubble", "No new user. No proof."],
        ],
        [1600, 3600, 4160]
      ),

      spacer(160),
      p("The hole is after hang-up. Everything above hang-up is a commodity. Everything below it is missing. That hole is what this prototype fills."),

      h2("Feature versus job"),
      table(
        ["Surface on AstroLive.app", "Job it claims", "What this prototype does with it"],
        [
          ["Talk / chat / video", "Get advice now", "Kept. This is the engine."],
          ["Wallet", "Pay without friction", "Kept. Server ledger + UPI."],
          ["Free first minutes", "Lower trial anxiety", "Kept. First 3 minutes free, then ticker."],
          ["Daily horoscope", "Reason to open tomorrow", "Replaced as the hook by due claims. Horoscope still exists as a computed public page."],
          ["Free kundli", "Utility / SEO", "Kept as a public Lahiri D1. No account."],
          ["Kundli match", "Marriage intent", "Kept as 36-guna Ashtakoot, not a love calculator."],
          ["Panchang", "Today’s five limbs", "Kept. Computed for place, not a copied table."],
          ["Astrologer grid", "Pick a person", "Kept. Rank is by dated results on /board, not stars first."],
          ["Shop / pooja mall", "Second revenue", "Not cloned. Puja is its own sitting, not a SKU wall."],
          ["Star ratings", "Trust", "Replaced as the primary rank by a public board of marked outcomes."],
        ],
        [2400, 2800, 4160]
      ),

      spacer(160),
      h2("Where AstroLive.app is weaker than AstroTalk, and why copying either is the wrong rebuild"),
      p("AstroTalk has supply (thousands of astrologers), brand (“talk now” already means them for a large Hindi-speaking audience), and a remedies store. AstroLive.app cannot win a density contest against that, and a hackathon rebuild cannot either. Copying the mall, the fire animation, the SKU grid, or a larger AI-card dashboard produces a smaller AstroTalk. It does not produce a reason to exist."),
      p("The teardown conclusion used in this build: keep the live minute. Do not make the mall the identity. Require a date on saved advice. Require a mark when the date arrives. Publish the ending, including misses. Put the invite on that public card. Rank experts on those endings."),

      page(),

      // ───── 3 SOLUTION ─────
      h1("3. Our solution — what we built and how a user uses it"),
      h2("In one paragraph"),
      p("We built a website where you talk to a real astrologer, pay by the minute, and then keep a written, dated record of what they predicted. When the date comes, you mark whether it came true. That mark is a page you can send to anyone. That is the whole product. Kundli, horoscope, reels, puja, and Ask AI are extra tools around it."),

      h2("Step by step, what the user does"),
      p("1. Create an account or use the demo. New accounts receive Rs 150 in the wallet. The first three minutes of a live session are free."),
      p("2. Open Talk now. Choose an astrologer who is online. Start chat, call, or video. The clock charges the wallet after the free minutes."),
      p("3. Save one sentence they said, with a date. The app will not save the line if there is no date. “Soon” is not enough."),
      p("4. Leave. The advice is not gone. It sits in Results with that date."),
      p("5. When the date arrives, Home shows the line and asks: Did this happen? Mark Yes, Partly, or No."),
      p("6. The app publishes a public page for that result. You can send the link. The other person does not need to log in to read it."),
      p("7. If they create an account from your invite code, both of you get Rs 50 of talk time, and they can start at step 2."),
      p("8. The public board lists astrologers by how these dated marks turned out, including misses. That is how we show who is specific, instead of only showing 4.9 stars."),

      h2("What must be saved for this to work"),
      table(
        ["What is saved", "Rule", "If it is missing"],
        [
          ["The sentence", "One line the astrologer actually said", "The chat disappears. There is nothing to come back to."],
          ["The date", "A real calendar day, not “soon”", "The app cannot remind you, and cannot rank the expert."],
          ["Your mark", "Yes, Partly, or No, typed by you", "Nobody knows if it came true. The board is empty."],
          ["The public page", "A link anyone can open, including misses", "You cannot send it. Friends cannot join from it."],
        ],
        [2200, 3800, 3360]
      ),

      spacer(140),
      p("If there is no date, the line is not saved. If there is a date but you have not marked it yet, Home keeps asking. If you mark No, that miss still appears on the public board. We do not hide failed predictions."),

      h2("How the brief maps to what was built"),
      table(
        ["Brief pillar", "What the product does", "Where to open it"],
        [
          ["Structural virality", "Public proof URL. Invite rides on the link. Both wallets move.", "/p/:id?from=CODE   /app/share"],
          ["Habit", "Due prediction on Home. Daily check-in. Seven days adds Rs 10.", "/app/dashboard   /app/ledger   /app/today"],
          ["New revenue", "Minutes, invite credit, streak, Plus, Family, dated PDF, second opinion, puja sitting, UPI packs.", "/app/wallet   /app/subscription"],
          ["USP", "Experts ranked by dated, marked results — not stars.", "/board   Talk now sort"],
        ],
        [2400, 4000, 2960]
      ),

      page(),

      // ───── 4 FUNCTIONALITY ─────
      h1("4. Prototype functionality — every surface that was built"),
      p("This section is the inventory. If a judge asks “what did you make?”, the answer is this list, running in the browser against the API on port 8787."),

      h2("4.1 Public site (no account)"),
      table(
        ["Route", "What it does"],
        [
          ["/", "Home page. What the product is, who is online, pricing, FAQ. English/Hindi. Login on the top right."],
          ["/login  /signup  /forgot-password", "Auth. Demo fill for Arjun. Forgot-password is honest: this demo does not send mail; it shows the sample login."],
          ["/p/:id", "Public proof card. Date, result, expert, invite. Opens with no login."],
          ["/board", "Experts ranked by marked dated outcomes, including misses."],
          ["/tape", "Public tape of yeses and misses after life answered."],
          ["/kundli", "Free North-Indian D1. Lahiri sidereal from birth time and lat/long. No account."],
          ["/panchang", "Today’s five limbs for a place, computed, not a copied table."],
          ["/horoscope", "Daily / tomorrow / week / month from today’s Moon, not a stock paragraph."],
          ["/match", "Two charts, 36 gunas (Ashtakoot). Not a love calculator."],
          ["/report  /terms  /privacy", "Public report page, terms, privacy."],
        ],
        [3200, 6160]
      ),

      spacer(140),
      h2("4.2 Inside the app — five jobs in the nav"),
      p("After login the chrome is five jobs, not a twelve-item dashboard. Desktop left rail and mobile dock: Home, Reels, Talk now, Puja, Results. Search (Ctrl/Cmd K) reaches the rest. Ask AI is on the rail as well."),
      table(
        ["Job", "Route", "What the user does"],
        [
          ["Home", "/app/dashboard", "Due prediction if a date has arrived. Otherwise today’s sky, natal D1, who is on the line. First-login cashback popup (Rs 150) once."],
          ["Reels", "/app/reels", "Full-screen retention: quotes, facts, astrologer lines. Glyphs, not a black quote card. Not a shop."],
          ["Talk now", "/app/consult", "Pick an expert. Chat, call, or video. Rate per minute shown. Opens the live room."],
          ["Puja", "/app/puja", "Its own sitting, not a row inside Talk now. Book a rite from wallet, then /app/puja/session/:id. No fire animation."],
          ["Results", "/app/ledger", "Saved dated lines. Tabs. Did this happen? Close writes a public proof. Second opinion (Rs 99) when two experts spoke to the same line."],
        ],
        [1800, 2600, 4960]
      ),

      spacer(140),
      h2("4.3 Live consultation room"),
      p("Route: /app/room/:id. This is the live call screen: the astrologer’s face, your birth chart, chat, and a rupee clock."),
      bullet("Modes: chat, call, video. WebRTC with STUN. Optional TURN if RTC credentials are set.", "b3"),
      bullet("Face of the practitioner, natal chart rail, in-room chat.", "b3"),
      bullet("Rupee ticker. First three minutes free on the first session, then wallet deduct per minute at the expert’s rate.", "b3"),
      bullet("If the wallet hits empty, the overlay stops the call and offers UPI top-up. It does not silently continue.", "b3"),
      bullet("Save this line with a date writes a prediction into Results. Without a date it is not saved.", "b3"),
      bullet("Speak uses the browser voice. Call/video can speak the answer back.", "b3"),

      h2("4.4 Wallet, UPI, and first-time money"),
      p("Wallet is server-side. The client cannot invent a balance. Fake checkout with confirm:true is rejected (HTTP 403)."),
      table(
        ["Event", "Amount", "When"],
        [
          ["Welcome credit", "Rs 150", "First login, once. Cashback popup."],
          ["First session", "3 minutes free", "Once. Then the ticker."],
          ["First recharge bonus", "+Rs 50", "First UPI pack."],
          ["Invite (both sides)", "Rs 50 / Rs 50", "New account created with code ARJUN (or any user’s code)."],
          ["Seven-day check-in", "Rs 10", "Streak complete."],
          ["Wallet packs", "Rs 100 / 300 / 500 / 1000", "Bonuses 0 / 30 / 75 / 200. Paid with Razorpay UPI."],
        ],
        [2800, 2800, 3760]
      ),
      spacer(100),
      p("UPI path: create order on the server → Razorpay Checkout restricted to UPI → HMAC verify → credit wallet. Webhook is a backup. Test keys are used in this build. Live keys are a go-live step, not faked as success."),

      h2("4.5 Plans and paid artifacts"),
      p("Plans cannot be flipped from the client. POST /api/checkout/plan deducts the wallet on the server and writes the plan."),
      table(
        ["SKU", "Price", "What it is"],
        [
          ["Free", "Rs 0", "Daily sky, 3 tracked predictions, 5 AI questions/month, 3 muhurta/month, 10-day transits."],
          ["Plus", "Rs 499 / month", "Full proof ledger, unlimited AI and muhurta, 45-day transits, yoga detail, reports, Rs 200 talk credit on first buy."],
          ["Family", "Rs 999 / month", "Plus plus up to three more charts under one roof. Rs 300 talk credit on first buy."],
          ["Dated PDF", "Rs 199", "A report of the ledger, not a generic horoscope PDF."],
          ["Second opinion", "Rs 99", "Another expert on the same dated line."],
          ["Lab / courier SKU", "Rs 399", "Issues a tracking number. Courier is labelled honestly; it is not a fake live logistics network."],
          ["Online puja sitting", "Rite fee from wallet", "Own room. Not a mall SKU inside Talk now."],
        ],
        [2400, 2400, 4560]
      ),

      spacer(140),
      h2("4.6 Proof, board, invite, Ask"),
      bullet("Closing a claim in Results writes a row in proofs. GET /api/proofs/:id serves the public card.", "b4"),
      bullet("/board reads proof-scores (grouped marked outcomes per expert).", "b4"),
      bullet("/app/share shows the user’s invite code. Capture on landing via ?from=CODE. Register applies both credits once.", "b4"),
      bullet("Ask / companion: POST /api/chat. If XAI_API_KEY is set, answers come from xAI against the natal snapshot. If not, the local Vedic snapshot still answers. GET /api/chat/status reports which path is live. No fake “AI insight” card grid on Home.", "b4"),

      h2("4.7 Vedic and chart tools (computed, not copied)"),
      p("Math lives in src/lib/vedic (Lahiri sidereal). The same engine is exposed on GET /api/sky so the client and the server agree. These pages exist to feed a better dated line, not as a second product."),
      table(
        ["Route", "Tool"],
        [
          ["/app/kundli", "Logged-in D1, dasha, ayanamsa from /api/sky"],
          ["/app/today", "Personal panchang and daily return"],
          ["/app/grahas", "Navagraha live positions"],
          ["/app/transits", "Personal transits (10 days free, 45 on Plus)"],
          ["/app/muhurta", "Timing windows (3/month free)"],
          ["/app/yogas", "Chart yogas (detail on Plus)"],
          ["/app/sade-sati  /app/mangal", "Sade Sati and Mangal dosha"],
          ["/app/gems  /app/varshphal", "Gem notes and annual chart"],
          ["/app/ashtakavarga  /app/prashna  /app/numerology", "Ashtakavarga, prashna, numerology"],
          ["/app/memory  /app/reports  /app/you", "Consultation archive, reports, profile"],
          ["/app/settings  /app/offerings", "Account, locale, appearance; claimable offerings against wallet"],
        ],
        [3600, 5760]
      ),

      spacer(140),
      h2("4.8 Locale and chrome"),
      bullet("English and Hindi. Toggle on landing, auth, and in-app. Dictionary in src/lib/i18n.tsx. Stored as astrolive_locale.", "b5"),
      bullet("Login is a white control on the top right of the landing header, always visible, and again in the hero.", "b5"),
      bullet("No astrologer photo on the login form. Demo account is a text control, not a face.", "b5"),
      bullet("Command menu (Ctrl/Cmd K) searches routes and actions.", "b5"),

      page(),

      // ───── 5 IMPLEMENTATION ─────
      h1("5. How it is implemented"),
      h2("Stack"),
      p("Web: Vite, React 19, TypeScript, Tailwind, React Router, Framer Motion / GSAP on public pages. API: Hono on Node, port 8787. Data: SQLite (better-sqlite3), WAL. Auth: scrypt password hash, bearer sessions. Live: WebRTC signalling on the API, STUN, optional TURN. Pay: Razorpay Orders + Checkout (UPI only) + HMAC verify + webhook. Ask: optional xAI. Vedic: on-device, also /api/sky."),

      h2("What already behaves like production"),
      bullet("Sessions, register, login, logout. RequireAuth on /app/*.", "b6"),
      bullet("Wallet is an append-only wallet_ledger. Balance is not a client field of record.", "b6"),
      bullet("Plan changes only through /api/checkout/plan after a wallet debit.", "b6"),
      bullet("Live session settle: first free minutes, then debit. Insufficient funds returns 402 with the amount needed.", "b6"),
      bullet("Ledger create and close. Close writes proofs. Public GET for a proof does not need a session.", "b6"),
      bullet("Referrals table. Invite credit once per new account.", "b6"),
      bullet("Daily check-in with streak bonus.", "b6"),
      bullet("Proof-scores grouped for /board.", "b6"),
      bullet("UPI order/verify. Fake wallet confirm is 403.", "b6"),
      bullet("SPA can be served from dist/ by the same API process (npm start).", "b6"),

      h2("What is modelled and labelled, not faked as live ops"),
      p("Push notifications on target_date are modelled as the due state on Home; device push is not wired. TURN is optional. Razorpay is test-mode unless live keys are supplied. The lab/courier SKU issues a tracking code and does not pretend to be a carrier API. Forgot-password does not send mail. Those seams are visible in the UI copy. They are not presented as completed infrastructure."),

      h2("Why this can scale"),
      p("Proof pages are static reads. Invite credit is one insert and two wallet rows. Chart math does not call a paid astrology API per page view. Proof-score is a grouped query that can become a nightly view. Voice/video can sit behind a CPaaS using the same room. Nothing in the loop requires a new model of the sky. It requires dates written down and endings made public."),

      page(),

      // ───── 6 IMPACT ─────
      h1("6. Expected impact"),
      p("Today the category P&L is minutes. CAC is ads. Retention is generic horoscope notifications. Take-rate is a consult-marketplace take-rate. If users actually date a line and mark it, three numbers move: cost to acquire a second user, reason to open the app on a specific morning, and revenue that is not another minute."),

      h2("Acquisition"),
      p("A closed card is a URL. It does not need an app install to read. The invite is on the URL. Both sides receive talk credit. That is acquisition with a creative generated by the user’s own life, at the cost of Rs 100 of talk inventory (Rs 50 + Rs 50), instead of a permanent UAC bid. This submission does not claim a viral coefficient from a weekend. It claims the mechanism is in the product and can be counted (section 7)."),

      h2("Retention"),
      p("Home is the due claim when a date has arrived: “Did this happen?” That is an unfinished personal job. Closing it is also a reason to talk again (yes: what is next; no: second opinion at Rs 99; partly: date the rest). The daily horoscope still exists. It is no longer the hook."),

      h2("Revenue mix"),
      p("Pay-per-minute stays. That is how the astrologer is paid. On top of that we added: invite and streak credits (talk time, not products in a shop), Plus at Rs 499 to keep every dated result, Family at Rs 999 for extra charts, a dated PDF at Rs 199, a second opinion at Rs 99, and puja as its own session. Plus is not “remove ads.” It is “keep the full list of what was predicted and how it turned out.”"),

      h2("Supply quality"),
      p("The public board makes empty confidence expensive. Experts who date claims and accept endings rise. Experts who stay at “soon” do not. A small roster can be more trustworthy than a large one if the rank is outcomes. That is the only supply advantage a challenger can have against AstroTalk’s density."),

      h2("Unit economics already in the prototype"),
      table(
        ["Unit", "Value in this build"],
        [
          ["Chat", "from Rs 10 / min"],
          ["Call / video", "from Rs 15 / min"],
          ["Welcome", "Rs 150 once"],
          ["First three minutes", "Rs 0 once"],
          ["Invite pair", "Rs 100 talk inventory, once per new account"],
          ["Streak", "Rs 10 per 7 days"],
          ["Plus", "Rs 499 / month + Rs 200 talk on first buy"],
          ["Family", "Rs 999 / month + Rs 300 talk on first buy"],
          ["Dated PDF", "Rs 199"],
          ["Second opinion", "Rs 99"],
        ],
        [3600, 5760]
      ),

      page(),

      // ───── 7 METRICS ─────
      h1("7. Success metrics"),
      h2("North star"),
      p("Dated claims closed per weekly active user.", { bold: true, size: 24, after: 120 }),
      p("Not minutes (fuel). Not DAU (a horoscope tile can fake that). Not GMV (a mall can fake that). A closed claim means a date was named, time passed, and a human marked an ending. That is the product happening."),

      h2("Metric tree"),
      table(
        ["Layer", "Metric", "What it tells us"],
        [
          ["Input", "% of sessions that save a dated line", "If low, people talked but did not keep anything."],
          ["Input", "Median days from save to due date", "Too far = forgotten. Too near = noise."],
          ["Core", "Claims closed / WAU", "North star."],
          ["Core", "Yes / partly / no mix", "All-yes is fake. All-no is churn."],
          ["Habit", "Return on the due date (D1)", "The unfinished job."],
          ["Habit", "7-day check-in completion", "Subsidy should follow this, not lead it."],
          ["Virality", "Public card opens / closed claim", "Is the card worth sending?"],
          ["Virality", "Invites accepted / card open", "Is the invite load-bearing?"],
          ["Revenue", "Minutes GMV / WAU", "Engine still healthy."],
          ["Revenue", "Plus conversion among users with ≥3 closed claims", "Ledger as identity."],
          ["Trust", "Overlap of board top-10 vs star top-10", "Must disagree, or the USP is theatre."],
          ["Trust", "% of no’s that stay public", "If misses are hidden, the board is fake."],
        ],
        [1800, 4000, 3560]
      ),

      spacer(140),
      h2("90-day private beta — directional targets"),
      table(
        ["Metric", "Target", "Kill the idea if"],
        [
          ["Sessions that save a dated line", "≥ 40%", "< 15% after prompt tests"],
          ["Due-date D1 return", "≥ 35%", "< 15%"],
          ["Closed claims / WAU / week", "≥ 0.6", "< 0.2"],
          ["Misses left public", "≥ 80% of no’s", "Hidden misses > 40%"],
          ["Card opens from share", "≥ 1.2 per closed yes", "< 0.3"],
          ["Invite accept on those opens", "≥ 8%", "< 2% with credit still on"],
          ["Plus take among 3+ closers", "≥ 6%", "Same as all users"],
          ["Board vs stars, top 10 overlap", "≤ 50%", "The same ten faces"],
        ],
        [3600, 2800, 2960]
      ),

      spacer(140),
      h2("Counter-metrics"),
      p("If yes-rate sits above ~75% for a month, people are only dating safe lines. If invite accepts spike while due-date return is flat, we bought users with Rs 50 and did not buy the habit. If minutes fall while Plus rises, we replaced the expert with a content farm. If misses are in the database but not on /board, we shipped a lie."),

      page(),

      // ───── 8 EVALUATE ─────
      h1("8. How to evaluate the prototype"),
      h2("Open the live product"),
      p("Use the deployed site: https://astro-hack-six.vercel.app"),
      p("Source: https://github.com/panshularora/AstroHack"),
      p("Demo login: arjun.sharma@example.com / cosmic2026. Invite: ARJUN."),
      p("To run on a laptop instead: Terminal 1: cd server && npx tsx index.ts (API, port 8787). Terminal 2: npm run dev -- --host 127.0.0.1 --port 5174. Open http://127.0.0.1:5174/"),

      h2("Suggested walk (about two minutes, unscripted is fine)"),
      table(
        ["Order", "Open", "Confirm"],
        [
          ["1", "https://astro-hack-six.vercel.app/", "What the product is. Login on the top right. Hindi toggle."],
          ["2", "https://astro-hack-six.vercel.app/board", "Experts ordered by dated results. Misses are visible."],
          ["3", "https://astro-hack-six.vercel.app/p/proof-dp2?from=ARJUN", "Card opens with no login. Invite on the page."],
          ["4", "/login then Home", "Due claim or daily return. Wallet in the chrome."],
          ["5", "Talk now → live session", "Astrologer, chart, chat. Save a line with a date."],
          ["6", "Results", "The line is there. Did this happen? Mark it."],
          ["7", "Wallet / Plus", "UPI packs. Plans. A plan cannot be turned on from the browser alone."],
          ["8", "Reels, Puja, Ask", "Short videos, online puja session, Ask AI."],
        ],
        [1200, 3200, 4960]
      ),

      spacer(140),
      h2("Scorecard — where each criterion lives"),
      table(
        ["Criterion", "In this document", "In the product"],
        [
          ["Problem comprehension", "Section 1", "Landing, Why this"],
          ["Teardown of AstroLive", "Section 2", "Landing loop vs mall; we did not clone the shop"],
          ["Solution design", "Section 3", "The loop. Save with a date. Public card."],
          ["Prototype functionality", "Section 4", "Routes in the appendix. Working API + demo user."],
          ["Uniqueness", "Sections 2–3", "/board and /p/:id, including misses"],
          ["Scalability / feasibility", "Section 5", "Server checkout, wallet ledger, public GET proofs"],
          ["Business impact", "Section 6", "Wallet, Plus, invite, PDF, second opinion"],
          ["Success metrics", "Section 7", "Close, invite, board — all observable this weekend"],
          ["Report clarity", "This file", "This file"],
        ],
        [2800, 3000, 3560]
      ),

      spacer(160),
      p("Difference from AstroTalk: AstroTalk sells minutes, then a shop. This app also sells minutes, then asks you to date the prediction and mark the result. That public result is how people share the app, how they come back, how experts are ranked, and why someone would pay for Plus. If you remove that dated result, you are left with astrolive.app, which is what section 2 already describes."),

      page(),

      // ───── 9 APPENDIX ─────
      h1("9. Appendix"),
      h2("9.1 Authenticated routes (complete)"),
      table(
        ["Route", "Surface"],
        [
          ["/app/dashboard", "Home"],
          ["/app/reels", "Reels"],
          ["/app/consult", "Talk now — expert list"],
          ["/app/room/:id", "Live session (chat / call / video)"],
          ["/app/puja", "Puja list"],
          ["/app/puja/session/:id", "Puja sitting"],
          ["/app/ledger", "Results — dated claims"],
          ["/app/companion", "Ask AI"],
          ["/app/wallet", "Wallet and UPI packs"],
          ["/app/subscription", "Free / Plus / Family"],
          ["/app/share", "Invite code"],
          ["/app/today", "Personal today / panchang"],
          ["/app/kundli", "Logged-in chart"],
          ["/app/grahas  /app/transits  /app/muhurta  /app/yogas", "Live grahas, transits, timing, yogas"],
          ["/app/sade-sati  /app/mangal  /app/gems  /app/varshphal", "Sade Sati, Mangal, gems, annual"],
          ["/app/ashtakavarga  /app/prashna  /app/numerology", "Ashtakavarga, prashna, numerology"],
          ["/app/memory  /app/reports  /app/you  /app/settings", "Archive, reports, profile, settings"],
          ["/app/offerings", "Wallet claims (gems / aarti style, not a mall)"],
          ["/onboarding", "Birth details and first pass"],
        ],
        [4200, 5160]
      ),

      spacer(160),
      h2("9.2 API (complete enough to audit)"),
      table(
        ["Method", "Path", "Role"],
        [
          ["POST", "/api/auth/register  /login  /logout", "Accounts"],
          ["GET/PATCH", "/api/me", "Profile, including wallet from the server"],
          ["POST", "/api/checkout/plan  /session  /fee", "Plans, live settle, PDF / opinion / puja / ship"],
          ["POST", "/api/pay/upi/order  /verify  /webhook", "Real UPI"],
          ["GET", "/api/pay/upi/config", "Whether UPI is enabled"],
          ["POST", "/api/ledger  /ledger/:id/close", "Create and close dated claims"],
          ["GET", "/api/proofs/:id  /proof-scores  /tape", "Public proof, board, tape"],
          ["POST", "/api/checkin", "Daily streak"],
          ["GET", "/api/invite/:code", "Invite preview"],
          ["POST", "/api/chat   GET /api/chat/status", "Ask AI"],
          ["GET", "/api/sky  /panchang  /kundli  /horoscope", "Computed Vedic"],
          ["POST", "/api/match", "Guna milan"],
          ["POST", "/api/rtc/room  /join  /signal   GET /ice /poll", "Live room"],
          ["GET", "/api/practitioners  /claims  /orders", "Roster, offerings, order history"],
        ],
        [1600, 4200, 3560]
      ),

      spacer(160),
      h2("9.3 Honest limits of this build"),
      bullet("Razorpay is test-mode unless live keys are in server/.env. Do not treat a test payment as a rupee in a company bank account.", "b7"),
      bullet("WebRTC uses STUN; some NATs need TURN, which is optional.", "b7"),
      bullet("xAI is optional. Without the key, Ask uses the local snapshot.", "b7"),
      bullet("Forgot-password does not send email.", "b7"),
      bullet("Lab/courier tracking is a generated code, labelled as such.", "b7"),
      bullet("Device push on due dates is not wired. The due state on Home is.", "b7"),
      bullet("This is a prototype roster of practitioners, not 10,000 live experts.", "b7"),

      spacer(200),
      h2("Summary for judges"),
      p("AstroLive is a live astrology consultation app. You talk to an expert, pay from a wallet, save what they predicted with a date, and later mark whether it came true. That result is a public page. That is what we made, and that is what the running prototype does."),
    ],
  }],
})

const buf = await Packer.toBuffer(doc)
const out = new URL("../AstroHack_Submission.docx", import.meta.url)
fs.writeFileSync(out, buf)
console.log("wrote", out.pathname)

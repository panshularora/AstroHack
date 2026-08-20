import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber, LevelFormat } from "docx"
import fs from "node:fs"

const pageWidth = 12240
const margin = 1080
const content = pageWidth - margin * 2
const ink = "111113"
const mute = "52525B"
const line = { style: BorderStyle.SINGLE, size: 4, color: "D4D4D8" }
const borders = { top: line, bottom: line, left: line, right: line }
const cellPad = { top: 80, bottom: 80, left: 120, right: 120 }

const p = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 160, before: opts.before ?? 0, line: 276 },
    ...opts,
    children: [new TextRun({ text, font: "Calibri", size: opts.size ?? 22, color: opts.color ?? ink, bold: opts.bold, italics: opts.italics })],
  })

const h = (text, level) =>
  new Paragraph({
    heading: level,
    spacing: { before: level === HeadingLevel.HEADING_1 ? 360 : 280, after: 140 },
    children: [new TextRun({ text, font: "Calibri", bold: true, size: level === HeadingLevel.HEADING_1 ? 32 : 26, color: ink })],
  })

const cell = (text, width, header = false) =>
  new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: header ? { fill: "111113", type: ShadingType.CLEAR } : { fill: "FFFFFF", type: ShadingType.CLEAR },
    margins: cellPad,
    children: [new Paragraph({ children: [new TextRun({ text, font: "Calibri", size: 20, bold: header, color: header ? "FAFAFA" : ink })] })],
  })

const table = (headers, rows, widths) =>
  new Table({
    width: { size: content, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ children: headers.map((t, i) => cell(t, widths[i], true)) }),
      ...rows.map((r) => new TableRow({ children: r.map((t, i) => cell(t, widths[i])) })),
    ],
  })

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Calibri", color: ink },
        paragraph: { spacing: { before: 360, after: 140 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Calibri", color: ink },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: { size: { width: pageWidth, height: 15840 }, margin: { top: margin, right: margin, bottom: margin, left: margin } },
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "111113", space: 8 } },
        spacing: { after: 200 },
        children: [new TextRun({ text: "AstroLive  ·  AstroHack 2026", font: "Calibri", size: 18, color: mute })],
      })] }),
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: "D4D4D8", space: 8 } },
        spacing: { before: 160 },
        children: [
          new TextRun({ text: "They named a date. You kept the card.    ", font: "Calibri", size: 18, color: mute, italics: true }),
          new TextRun({ text: "Page ", font: "Calibri", size: 18, color: mute }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: mute }),
        ],
      })] }),
    },
    children: [
      p("PRODUCT SUBMISSION", { size: 20, color: mute, after: 80 }),
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: "Dated astrology that leaves a receipt", font: "Calibri", size: 44, bold: true, color: ink })],
      }),
      p("They named a date. You kept the card.", { italics: true, size: 24, after: 240 }),
      p("Prototype: live web app (Vite, React, Hono, SQLite). Demo: arjun.sharma@example.com / cosmic2026. Public proof: /p/proof-dp2?from=ARJUN. Public board: /board."),

      h("1. Problem comprehension", HeadingLevel.HEADING_1),
      p("AstroLive.app today is a pay-per-minute marketplace: chat at ten rupees, talk at fifteen, horoscope tiles, kundli, shop, pooja. At scale that model has three bottlenecks."),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text: "Acquisition is paid. A session produces nothing a user would send except a screenshot.", font: "Calibri", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text: "Retention is a tile. After the call, the advice evaporates. There is no unfinished job.", font: "Calibri", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 }, children: [new TextRun({ text: "Trust is a star. Ratings do not say whether the last ten dated claims came true.", font: "Calibri", size: 22 })] }),
      p("The brief asks for structural virality, habit, new revenue, or a USP. This prototype puts all four on one object: a dated claim with an ending."),

      h("2. Solution design", HeadingLevel.HEADING_1),
      p("Talk live. Save one sentence with a check-by date. Come back when the date arrives. Mark yes, partly, or no. A public proof card. A friend opens it with no login. They sign up with the invite on the link. Both get fifty rupees of talk time. The friend talks."),
      p("That is the product, not a feature list."),
      table(
        ["Brief pillar", "Object in the product", "Live route"],
        [
          ["Structural virality", "Public proof URL + invite on the link", "/p/:id?from=CODE, /app/share"],
          ["Habit", "Due windows + daily check-in (7 days = Rs 10)", "/app/ledger, /app/today, Home"],
          ["New revenue", "Invite minutes, streak, Plus, Family, PPM", "/app/subscription, checkout API"],
          ["USP", "Rank by dated results, not stars", "/board, Talk now sort"],
        ],
        [2600, 3800, 3680]
      ),

      h("3. Prototype functionality", HeadingLevel.HEADING_1),
      p("Landing states the USP. Why this names the four bets. A real card opens without login. The proof board ranks experts by marked outcomes. Demo Home shows the due prediction or the daily return. Chat answers the natal snapshot, not a canned promotion. Save this line with a date writes to Results. Results has three tabs and one button: Did this happen? Invite code ARJUN moves both wallets."),
      p("Backend: Hono + SQLite. Sessions, wallet, server checkout, ledger close, public proofs, proof-scores, check-in, referrals. Vedic math is on-device. Plans cannot be flipped from the client."),

      h("4. Project uniqueness", HeadingLevel.HEADING_1),
      p("Comparable apps sell access: minutes, a face, a shop. This prototype sells accountability. A claim without a date is not saved. A date without a mark is an unfinished job. A mark becomes a public card, including when it did not happen. Experts rise on that board, not on review inflation. That is a different category, not a reskin."),

      h("5. Scalability and feasibility", HeadingLevel.HEADING_1),
      p("Auth and entitlements live on the server. The wallet is append-only. Proof pages are static reads and can sit on a CDN. Invite credit is one insert and two wallet rows. Chart math is client-side. Chat can use Grok or the local Vedic snapshot."),
      p("Next, not faked: CPaaS for live voice and video in the same room, push on target_date (the habit trigger already modelled), proof-score as a nightly view. Nothing in the loop requires a scientific breakthrough. It requires writing dates down and making the ending public."),

      h("6. Ninety-second demo", HeadingLevel.HEADING_1),
      table(
        ["Time", "Action", "What it proves"],
        [
          ["0:00", "Landing", "USP, problem"],
          ["0:20", "/board", "Uniqueness"],
          ["0:35", "Public card + invite", "Virality"],
          ["0:50", "Demo Home", "Habit"],
          ["1:05", "Chat + save a line", "Functionality"],
          ["1:20", "Results, Did this happen?", "Core loop"],
          ["1:30", "Wallet / Plus", "Revenue beyond minutes"],
        ],
        [1400, 3800, 4880]
      ),

      h("7. Business impact", HeadingLevel.HEADING_1),
      p("Today this category is minutes. CAC is ads. Retention is generic horoscope notifications. If this loop works, CAC falls because an honest card is a share without a coupon. LTV rises because an open prediction is a reason to open the app, and a closed one is a reason to talk again. Plus is not remove ads. Plus is keep the full proof ledger. Expert supply quality rises because the public board punishes empty confidence."),
      p("Unit economics already in the prototype: chat from Rs 10/min, call and video from Rs 15/min. Invite Rs 50 / Rs 50 talk credit. Streak Rs 10 per seven days. Plus Rs 499 and Family Rs 999, charged only from the wallet on the server."),

      h("Scorecard map", HeadingLevel.HEADING_1),
      table(
        ["Criterion", "Where it lives"],
        [
          ["Problem comprehension", "This report, section 1. Landing, Why this."],
          ["Solution design", "The loop. Landing, The loop."],
          ["Prototype functionality", "Routes above. Working API + demo user."],
          ["Uniqueness", "/board and public /p/:id."],
          ["Scalability / feasibility", "This report, section 5. Server checkout."],
          ["Report clarity", "This document and REPORT.md."],
          ["Business impact", "This report, section 7. Pricing + invite + Plus."],
        ],
        [3200, 6880]
      ),
      p("The prototype is the argument. This report only names what is already on the screen.", { before: 240, italics: true }),
    ],
  }],
})

const buf = await Packer.toBuffer(doc)
const out = new URL("../AstroHack_Report.docx", import.meta.url)
fs.writeFileSync(out, buf)
console.log("wrote", out.pathname)

function esc(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/[^\x20-\x7E]/g, "?")
}

export function downloadEvidencePdf(opts: {
  name: string
  month: string
  rows: { title: string; astrologer: string; date: string; outcome: string }[]
}) {
  const lines: string[] = [
    "AstroLive  dated evidence",
    opts.name,
    `Month ${opts.month}`,
    "Yes / partial / no cards from this wallet.",
    "",
  ]
  if (!opts.rows.length) lines.push("(No closed cards in this window.)")
  for (const r of opts.rows) {
    lines.push(`${r.outcome.toUpperCase()}  ${r.date}`)
    lines.push(r.title.slice(0, 90))
    lines.push(r.astrologer)
    lines.push("")
  }
  lines.push("This is evidence, not a horoscope pamphlet.")

  const leading = 16
  const startY = 800
  const content = lines
    .map((line, i) => {
      const y = startY - i * leading
      if (y < 48) return ""
      return `BT /F1 ${i === 0 ? 18 : 11} Tf 48 ${y} Td (${esc(line)}) Tj ET`
    })
    .filter(Boolean)
    .join("\n")

  const stream = content + "\n"
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}endstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>",
  ]

  let body = "%PDF-1.4\n"
  const offsets = [0]
  for (let i = 0; i < objects.length; i++) {
    offsets.push(body.length)
    body += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`
  }
  const xref = body.length
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (let i = 1; i <= objects.length; i++) {
    body += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`
  }
  body += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`

  const blob = new Blob([body], { type: "application/pdf" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = `astrolive-evidence-${opts.month}.pdf`
  a.click()
  URL.revokeObjectURL(a.href)
}

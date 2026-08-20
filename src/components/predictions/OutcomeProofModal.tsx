import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Copy, Download, Share2, ShieldCheck, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { proofPublicUrl, proofShareText, type ProofRecord } from "@/lib/proof"
import { useUser } from "@/context/UserContext"
import { useI18n } from "@/lib/i18n"

interface OutcomeProofModalProps {
  isOpen: boolean
  onClose: () => void
  proof: ProofRecord | null
}

export function OutcomeProofModal({ isOpen, onClose, proof }: OutcomeProofModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const { user, isAuthed } = useUser()
  const { t, locale } = useI18n()
  const invite = isAuthed ? user.inviteCode : undefined
  const out =
    proof?.outcome === "yes" ? t("outcomeYes") : proof?.outcome === "partial" ? t("outcomePartial") : t("outcomeNo")

  useEffect(() => {
    if (!isOpen || !proof || !canvasRef.current) return
    drawProofCard(canvasRef.current, proof, {
      kicker: t("proofKicker"),
      outcome: out,
      predictedBy: t("predictedBy", { name: proof.astrologerName }),
      window: t("proofWindow"),
      closed: t("proofClosed"),
      by: t("proofBy"),
      footer: t("proofFooter"),
      hi: locale === "hi",
    })
  }, [isOpen, proof, t, out, locale])

  if (!isOpen || !proof) return null

  const text = proofShareText(proof, invite)
  const url = proofPublicUrl(proof.id, invite)
  const yes = proof.outcome === "yes"

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener")
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "AstroLive proof", text, url })
        return
      } catch {
        /* user cancelled */
      }
    }
    handleWhatsApp()
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement("a")
    a.href = canvas.toDataURL("image/png")
    a.download = `astrolive-proof-${proof.id}.png`
    a.click()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          className="relative w-full max-w-lg bg-zinc-950 p-5 sm:p-6 space-y-4"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 p-1.5 text-zinc-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="pr-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-400 mb-1">{t("datedResult")}</p>
            <h2 className="text-xl font-display text-white">
              {yes ? t("outcomeYes") : `${out}. ${t("thisOneClosed")}`}
            </h2>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              {proof.astrologerName} made this prediction. {proof.userName} closed it on{" "}
              {new Date(proof.verifiedOn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
            </p>
          </div>

          <canvas
            ref={canvasRef}
            width={1080}
            height={1350}
            className="w-full h-auto rounded-[4px] bg-black"
          />

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleDownload}>
              <Download className="w-3.5 h-3.5" />
              {saved ? t("savedToast") : t("download")}
            </Button>
            <Button variant="outline" onClick={handleNativeShare}>
              <Share2 className="w-3.5 h-3.5" />
              {t("shareRecord")}
            </Button>
            <Button variant="outline" onClick={handleWhatsApp}>
              {t("sendWhatsapp")}
            </Button>
            <Button variant="outline" onClick={handleCopy}>
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t("linkCopied") : t("copyProof")}
            </Button>
          </div>

          <p className="text-[10px] font-mono text-zinc-600 break-all">{url}</p>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function drawProofCard(
  canvas: HTMLCanvasElement,
  proof: ProofRecord,
  copy: {
    kicker: string
    outcome: string
    predictedBy: string
    window: string
    closed: string
    by: string
    footer: string
    hi: boolean
  }
) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const w = canvas.width
  const h = canvas.height
  const serif = copy.hi
    ? '700 56px "Noto Sans Devanagari", "Cormorant Garamond", serif'
    : '700 56px "Cormorant Garamond", Georgia, serif'
  const sans = copy.hi
    ? '500 28px "Noto Sans Devanagari", "IBM Plex Sans", sans-serif'
    : '500 28px "IBM Plex Sans", sans-serif'
  const display = copy.hi
    ? '600 44px "Noto Sans Devanagari", "Cormorant Garamond", serif'
    : '600 44px "Cormorant Garamond", Georgia, serif'

  ctx.fillStyle = "#1a1814"
  ctx.fillRect(0, 0, w, h)
  const paper = ctx.createLinearGradient(0, 0, 0, h)
  paper.addColorStop(0, "#f6edd8")
  paper.addColorStop(1, "#e8d7b4")
  ctx.fillStyle = paper
  ctx.fillRect(56, 56, w - 112, h - 112)

  ctx.strokeStyle = "rgba(42, 36, 24, 0.18)"
  ctx.lineWidth = 2
  ctx.strokeRect(72, 72, w - 144, h - 144)

  ctx.fillStyle = "#6a5e48"
  ctx.font = sans
  ctx.fillText(copy.kicker, 110, 160)

  ctx.fillStyle = proof.outcome === "yes" ? "#1f6b3a" : proof.outcome === "partial" ? "#7a5b12" : "#3f3a34"
  ctx.font = display
  ctx.fillText(copy.outcome, 110, 230)

  ctx.fillStyle = "#2a2418"
  ctx.font = serif
  wrapText(ctx, `“${proof.title}”`, 110, 340, w - 220, 68)

  ctx.fillStyle = "#5c564e"
  ctx.font = sans
  ctx.fillText(copy.predictedBy, 110, 580)
  ctx.fillText(`${proof.confidence}%`, 110, 628)

  ctx.fillStyle = "#2a2418"
  ctx.font = sans
  ctx.fillText(`${copy.window}  ${new Date(proof.windowEnd).toLocaleDateString("en-IN")}`, 110, 760)
  ctx.fillText(`${copy.closed}  ${new Date(proof.verifiedOn).toLocaleDateString("en-IN")}`, 110, 820)
  ctx.fillText(`${copy.by}  ${proof.userName}`, 110, 880)

  if (proof.note) {
    ctx.fillStyle = "#6a5e48"
    ctx.font = sans
    wrapText(ctx, proof.note, 110, 970, w - 220, 36)
  }

  ctx.fillStyle = "#8a8378"
  ctx.font = sans
  ctx.fillText(proof.id, 110, h - 140)
  ctx.fillText(copy.footer, 110, h - 90)
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ")
  let line = ""
  let cy = y
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, cy)
      line = word
      cy += lineHeight
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, cy)
}

export function ProofBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-emerald-400">
      <ShieldCheck className="w-3 h-3" />
      Proof issued
    </span>
  )
}

export function SparkleMark() {
  return <Sparkles className="w-4 h-4 text-emerald-400" />
}

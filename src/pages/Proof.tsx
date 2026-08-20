import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { OutcomeProofModal } from "@/components/predictions/OutcomeProofModal"
import { CosmicField } from "@/components/sky/CosmicField"
import { getProof, type ProofRecord } from "@/lib/proof"
import { apiOptional } from "@/lib/api"
import { captureInvite } from "@/lib/utm"
import { Skeleton } from "@/components/ui/Skeleton"
import { PRACTITIONERS } from "@/data/practitioners"
import { useUser } from "@/context/UserContext"
import { SmoothScroll } from "@/components/motion/SmoothScroll"
import { KineticWords } from "@/components/motion/KineticWords"
import { ProofPaper } from "@/components/ledger/ProofPaper"
import { useI18n } from "@/lib/i18n"
import { LangToggle } from "@/components/site/LangToggle"

const ease = [0.22, 1, 0.36, 1] as const

export function Proof() {
  const { id = "" } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthed } = useUser()
  const { t, locale } = useI18n()
  const outLabel = (o: ProofRecord["outcome"]) =>
    o === "yes" ? t("outcomeYes") : o === "partial" ? t("outcomePartial") : t("outcomeNo")
  const [proof, setProof] = useState<ProofRecord | undefined>(() => getProof(id))
  const [loading, setLoading] = useState(!getProof(id))
  const [open, setOpen] = useState(false)

  useEffect(() => {
    captureInvite()
  }, [])

  useEffect(() => {
    if (proof) {
      document.title = `${outLabel(proof.outcome)} · ${proof.title.slice(0, 48)}`
    }
    return () => {
      document.title = "AstroLive. They named a date."
    }
  }, [proof, locale])

  useEffect(() => {
    let live = true
    apiOptional<ProofRecord>(`/api/proofs/${id}`).then((row) => {
      if (!live) return
      if (row && "title" in row) setProof(row)
      setLoading(false)
    })
    return () => {
      live = false
    }
  }, [id])

  const invite = params.get("from") || params.get("ref") || ""
  const expert = proof
    ? PRACTITIONERS.find((p) => p.name.toLowerCase() === proof.astrologerName.toLowerCase())
    : undefined
  const signupHref = `/signup${invite ? `?from=${encodeURIComponent(invite)}` : ""}`
  const talkHref = expert ? `/app/astrologer/${expert.id}` : "/app/consult"

  if (loading) {
    return (
      <div className="relative min-h-[100dvh] bg-zinc-950">
        <CosmicField density={28} />
        <div className="relative page-container max-w-lg py-20 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    )
  }

  if (!proof) {
    return (
      <div className="relative min-h-[100dvh] bg-zinc-950 text-zinc-100">
        <CosmicField density={28} />
        <div className="relative page-container max-w-lg py-20">
          <p className="font-display text-3xl text-zinc-50">{t("proofNotFound")}</p>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{t("proofNotFoundD")}</p>
          <Button className="mt-6" onClick={() => navigate(isAuthed ? "/app/ledger" : signupHref)}>
            {isAuthed ? t("openResults") : t("startFreeLedger")}
          </Button>
        </div>
      </div>
    )
  }

  const ended = formatDay(proof.verifiedOn)
  const windowDay = formatDay(proof.windowEnd)
  const title = /[.!?]$/.test(proof.title.trim()) ? proof.title.trim() : `${proof.title.trim()}.`

  return (
    <SmoothScroll>
      <div className="relative min-h-[100dvh] bg-zinc-950 text-zinc-100 overflow-x-hidden">
        <CosmicField density={56} />
        <div className="relative max-w-2xl mx-auto px-5 py-10 sm:py-16 pb-28">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-display italic text-xl text-zinc-50">
              {t("brand")}
            </Link>
            <LangToggle compact />
          </div>
          <p className="mt-10 text-[12px] uppercase tracking-[0.18em] text-emerald-400">{t("datedResult")}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl text-zinc-50 leading-[0.95]">
            <KineticWords key={`o-${locale}`} text={`${outLabel(proof.outcome)}.`} />{" "}
            <KineticWords key={`c-${locale}`} text={t("thisOneClosed")} italic delay={0.18} className="text-zinc-300" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease }}
            className="mt-5 text-[15px] text-zinc-400 leading-relaxed max-w-lg"
          >
            {t("proofSaid", { name: proof.astrologerName, window: windowDay, user: proof.userName, ended })}
          </motion.p>

          <div className="mt-10">
            <ProofPaper
              kicker={outLabel(proof.outcome)}
              title={title}
              body={`Predicted by ${proof.astrologerName}, who was ${proof.confidence}% sure.${proof.note ? ` ${proof.note}` : ""}`}
              footer={`Closed by ${proof.userName} on ${ended}. Move the paper.`}
              stamp={proof.outcome === "yes" || proof.outcome === "partial" || proof.outcome === "no" ? proof.outcome : undefined}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease }}
            className="mt-10 text-[15px] text-zinc-400 leading-relaxed max-w-lg"
          >
            {t("otherAppsSell")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.68, ease }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Button size="lg" onClick={() => navigate(isAuthed ? talkHref : `/login?next=${encodeURIComponent(talkHref)}`)}>
              {expert ? t("talkToName", { name: expert.name.split(" ")[0] }) : t("talkToExpert")}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate(isAuthed ? "/app/ledger" : signupHref)}>
              {isAuthed ? t("openResults") : invite ? t("claimFifty") : t("startOwnLedger")}
            </Button>
          </motion.div>
          <button type="button" className="mt-4 text-sm text-zinc-500 hover:text-zinc-200" onClick={() => setOpen(true)}>
            {t("openShareable")}
          </button>
        </div>
        <OutcomeProofModal isOpen={open} onClose={() => setOpen(false)} proof={proof} />
      </div>
    </SmoothScroll>
  )
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

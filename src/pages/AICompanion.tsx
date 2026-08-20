import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { type ChatMessage } from "@/lib/mock-data"
import { CosmicVaultModal } from "@/components/vault/CosmicVaultModal"
import { cn } from "@/lib/utils"
import { useUser } from "@/context/UserContext"
import { useLedger } from "@/context/LedgerContext"
import { PLAN_LIMITS } from "@/lib/entitlements"
import { PaywallModal } from "@/components/paywall/PaywallModal"
import { askAstroAssistant, localAstroReply, snapshotForModel } from "@/lib/astroChat"
import { CosmicField } from "@/components/sky/CosmicField"
import { useI18n } from "@/lib/i18n"

const suggestions = [
  "Am I in Sade Sati right now?",
  "Do I have Mangal Dosha?",
  "What's today's Moon and Rahu Kaal?",
  "Which prediction should I verify?",
]

const suggestionsHi = [
  "क्या मैं साढ़े साती में हूँ?",
  "क्या मंगल दोष है?",
  "आज चंद्र और राहु काल?",
  "कौन सी भविष्यवाणी जाँचूँ?",
]

export function AICompanion() {
  const navigate = useNavigate()
  const { user, consumeAiQuestion } = useUser()
  const { predictions } = useLedger()
  const { t, locale } = useI18n()
  const hi = locale === "hi"

  const firstName = user.name.split(" ")[0]
  const welcome = t("askWelcome", {
    name: firstName,
    moon: user.moonSign,
    lagna: user.ascendant,
    dasha: user.activeDasha,
  })
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "msg-welcome",
      role: "assistant",
      content: `${user.name.split(" ")[0]}, I have the chart. ${user.moonSign} Moon, ${user.ascendant} lagna, ${user.activeDasha}. Ask the real question.`,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    },
  ])

  useEffect(() => {
    setMessages((prev) => {
      if (prev[0]?.id !== "msg-welcome") return prev
      if (prev[0].content === welcome) return prev
      return [{ ...prev[0], content: welcome }, ...prev.slice(1)]
    })
  }, [welcome])
  const sendingRef = useRef(false)

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [vaultOpen, setVaultOpen] = useState(false)
  const [paywall, setPaywall] = useState(false)
  const aiLimit = PLAN_LIMITS[user.plan].aiPerMonth
  const aiLeft = Number.isFinite(aiLimit) ? Math.max(0, aiLimit - user.usage.aiQuestions) : 99
  const scrollRef = useRef<HTMLDivElement>(null)
  const chips = hi ? suggestionsHi : suggestions

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isTyping])

  const handleSend = async (text?: string) => {
    const content = text || input.trim()
    if (!content || sendingRef.current || isTyping) return
    if (Number.isFinite(aiLimit) && (user.usage?.aiQuestions || 0) >= aiLimit) {
      setPaywall(true)
      return
    }
    sendingRef.current = true
    consumeAiQuestion()

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    }

    const nextHistory = [...messages, userMsg]
    setMessages(nextHistory)
    setInput("")
    setIsTyping(true)

    const local = localAstroReply(content, user, predictions, nextHistory)
    let textOut = local.content
    const remote = await askAstroAssistant({
      question: content,
      history: nextHistory.slice(-8).map((m) => ({ role: m.role, content: m.content })),
      context: snapshotForModel(user, predictions),
    })
    if (remote) textOut = remote

    const aiMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: "assistant",
      content: textOut,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      citations: remote ? undefined : local.citations,
    }
    setMessages((prev) => [...prev, aiMsg])
    setIsTyping(false)
    sendingRef.current = false
  }

  return (
    <div className="relative min-h-[calc(100dvh-3.5rem)]">
      <CosmicField density={34} />
      <div className="relative page-container max-w-2xl flex flex-col min-h-[calc(100dvh-3.5rem)] pb-4">
        <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">{t("ask")}</p>
        <h1 className="font-display text-4xl sm:text-5xl text-zinc-50 mt-2 leading-[0.95]">{t("jobAsk")}</h1>
        <p className="mt-3 text-sm text-zinc-500">
          {Number.isFinite(aiLimit) ? t("questionsLeft", { n: aiLeft }) : t("unlimitedPlan")}{" "}
          <button type="button" className="text-zinc-400 hover:text-zinc-100" onClick={() => setVaultOpen(true)}>
            {t("attachPaper")}
          </button>
          {" · "}
          <button type="button" className="text-zinc-400 hover:text-zinc-100" onClick={() => navigate("/app/consult")}>
            {t("talkPerson")}
          </button>
        </p>

        <div ref={scrollRef} className="mt-8 flex-1 min-h-[38vh] overflow-y-auto space-y-7 pr-1 pb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={msg.role === "user" ? "text-right" : ""}>
              <p className="text-[11px] text-zinc-500 mb-1.5">
                {msg.role === "user" ? t("youLabel") : t("chartLabel")} · {msg.timestamp}
              </p>
              <p
                className={cn(
                  "inline-block max-w-[92%] text-left text-[15px] leading-relaxed whitespace-pre-wrap",
                  msg.role === "user" ? "text-zinc-50" : "text-zinc-300"
                )}
              >
                {msg.content}
              </p>
              {msg.citations && msg.citations.length > 0 && (
                <p className="mt-2 text-[12px] text-zinc-600">{msg.citations.map((c) => c.title).join(" · ")}</p>
              )}
            </div>
          ))}
          {isTyping && <p className="text-xs text-zinc-500">{t("readingChart")}</p>}
        </div>

        <div className="sticky bottom-20 md:bottom-3 z-20 -mx-1 mt-auto bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent pt-5 pb-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {chips.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void handleSend(s)}
                disabled={isTyping}
                className="h-8 px-3 rounded-full text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  void handleSend()
                }
              }}
              disabled={isTyping}
              placeholder={t("askPlaceholder")}
              className="flex-1 h-12 rounded-full bg-white/[0.06] border border-white/10 px-5 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-400"
            />
            <Button disabled={isTyping || !input.trim()} onClick={() => void handleSend()}>
              {t("send")}
            </Button>
          </div>
        </div>
      </div>

      <CosmicVaultModal isOpen={vaultOpen} onClose={() => setVaultOpen(false)} />
      <PaywallModal open={paywall} feature="ai_chat" onClose={() => setPaywall(false)} />
    </div>
  )
}

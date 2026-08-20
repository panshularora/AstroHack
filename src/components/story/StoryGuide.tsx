import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"

const STEPS = [
  {
    path: "/",
    title: "Other apps sell another minute.",
    body: "Watch what happens after the call — on the real product, not slides.",
  },
  {
    path: "/p/proof-dp2?from=ARJUN",
    title: "This page needs no login.",
    body: "A person named a date. Life answered. The paper is still here. Move it.",
  },
  {
    path: "/tape",
    title: "Misses stay on the tape.",
    body: "That is why this ranking is not a star rating.",
  },
  {
    path: "/board",
    title: "Experts ranked by dated results.",
    body: "Talk to the person who actually came true.",
  },
  {
    path: "/app/ledger",
    title: "When the date comes, you mark it.",
    body: "Yes, partly, or no. That writes the next public card.",
    auth: true,
  },
  {
    path: "/app/consult?claim=A%20job%20offer%20will%20land%20in%20the%20tech%20sector",
    title: "Second opinion on the same line.",
    body: "Two experts. One date. Honesty compounds.",
    auth: true,
  },
  {
    path: "/app/dashboard",
    title: "They come back because a window closed.",
    body: "Habit is a date, not a horoscope tile. That is the product.",
    auth: true,
  },
] as const

function withStory(path: string) {
  const [base, qs] = path.split("?")
  const next = new URLSearchParams(qs || "")
  next.set("story", "1")
  return `${base}?${next.toString()}`
}

export function StoryGuide() {
  const loc = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { isAuthed, loginUser, authReady } = useUser()
  const [busy, setBusy] = useState(false)
  const on = params.get("story") === "1"

  const index = STEPS.findIndex((s) => loc.pathname === s.path.split("?")[0])

  useEffect(() => {
    if (loc.pathname !== "/story") return
    navigate(withStory("/"), { replace: true })
  }, [loc.pathname, navigate])

  useEffect(() => {
    if (on) document.documentElement.classList.add("astro-story")
    else document.documentElement.classList.remove("astro-story")
    return () => document.documentElement.classList.remove("astro-story")
  }, [on])

  if (!on || index < 0) return null

  const step = STEPS[index]
  const last = index === STEPS.length - 1

  const go = async (dir: 1 | -1) => {
    if (dir === -1) {
      if (index === 0) {
        skip()
        return
      }
      navigate(withStory(STEPS[index - 1].path))
      return
    }
    if (last) {
      skip()
      navigate("/app/consult")
      return
    }
    const next = STEPS[index + 1]
    if ("auth" in next && next.auth && !isAuthed) {
      setBusy(true)
      const ok = await loginUser("arjun.sharma@example.com", "cosmic2026")
      setBusy(false)
      if (!ok) {
        navigate(`/login?next=${encodeURIComponent(withStory(next.path))}`)
        return
      }
    }
    navigate(withStory(next.path))
  }

  const skip = () => {
    const next = new URLSearchParams(params)
    next.delete("story")
    setParams(next, { replace: true })
  }

  if (!authReady) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-[80] pointer-events-none print:hidden">
      <div className="pointer-events-auto bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent px-5 pt-16 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            The story · {index + 1} of {STEPS.length}
          </p>
          <p className="mt-2 font-display text-2xl sm:text-3xl text-zinc-50 leading-tight">{step.title}</p>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl leading-relaxed">{step.body}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={() => void go(1)} disabled={busy}>
              {busy ? "Opening the demo…" : last ? "Talk now" : "Next"}
            </Button>
            {index > 0 && (
              <button type="button" className="text-sm text-zinc-500 hover:text-zinc-200" onClick={() => void go(-1)}>
                Back
              </button>
            )}
            <button type="button" className="text-sm text-zinc-600 hover:text-zinc-300" onClick={skip}>
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

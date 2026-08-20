import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowUp, MessageCircle, X } from "lucide-react"
import { BANNER_ID, BANNER_KEY, CONTACT_HREF } from "@/lib/site"
import { captureUtm } from "@/lib/utm"

function useScrollMetrics(_path: string) {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const read = () => {
      const root = document.querySelector<HTMLElement>("[data-scroll-root]")
      if (root) {
        const max = root.scrollHeight - root.clientHeight
        const p = max > 0 ? root.scrollTop / max : 0
        setProgress(p)
        setShowTop(root.scrollTop > 420)
        return
      }
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      setProgress(p)
      setShowTop(window.scrollY > 420)
    }
    read()
    const root = document.querySelector("[data-scroll-root]")
    root?.addEventListener("scroll", read, { passive: true })
    window.addEventListener("scroll", read, { passive: true })
    window.addEventListener("resize", read)
    return () => {
      root?.removeEventListener("scroll", read)
      window.removeEventListener("scroll", read)
      window.removeEventListener("resize", read)
    }
  }, [_path])

  return { progress, showTop }
}

export function SiteChrome() {
  const loc = useLocation()
  const navigate = useNavigate()
  const { progress, showTop } = useScrollMetrics(loc.pathname)
  const [bannerOn, setBannerOn] = useState(false)
  const hideFloat =
    loc.pathname.startsWith("/app/room") ||
    loc.pathname === "/" ||
    loc.pathname.startsWith("/p/") ||
    loc.pathname === "/tape" ||
    loc.pathname === "/board" ||
    loc.pathname === "/story"

  useEffect(() => {
    captureUtm(loc.search)
  }, [loc.search])

  useEffect(() => {
    try {
      setBannerOn(localStorage.getItem(BANNER_KEY) !== BANNER_ID)
    } catch {
      setBannerOn(true)
    }
  }, [])

  const dismiss = () => {
    setBannerOn(false)
    try {
      localStorage.setItem(BANNER_KEY, BANNER_ID)
    } catch {
      /* ignore */
    }
  }

  const toTop = () => {
    const root = document.querySelector<HTMLElement>("[data-scroll-root]")
    if (root) root.scrollTo({ top: 0, behavior: "smooth" })
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:bg-zinc-100 focus:text-zinc-950 focus:px-3 focus:py-2 focus:rounded-full"
      >
        Skip to content
      </a>

      {bannerOn && !hideFloat && (
        <div className="site-banner relative z-[60] bg-zinc-100 text-zinc-950 text-[13px]">
          <div className="max-w-6xl mx-auto px-4 h-9 flex items-center justify-center gap-3">
            <p>
              Live experts on the line.{" "}
              <button type="button" className="underline underline-offset-2" onClick={() => navigate(CONTACT_HREF)}>
                Talk now
              </button>
            </p>
            <button type="button" onClick={dismiss} aria-label="Dismiss banner" className="absolute right-3 p-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div
        className="fixed top-0 inset-x-0 z-[70] h-0.5 pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Scroll progress"
      >
        <div
          className="h-full bg-zinc-100 origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {!hideFloat && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-40 flex flex-col items-end gap-2 print:hidden">
          {showTop && (
            <button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition-colors duration-200 flex items-center justify-center"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate(CONTACT_HREF)}
            className="h-10 px-4 rounded-full bg-zinc-100 text-zinc-950 text-sm font-medium hover:bg-white transition-colors duration-200 inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Talk
          </button>
        </div>
      )}
    </>
  )
}

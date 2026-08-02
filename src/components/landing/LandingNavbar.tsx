import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Compass } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Astrologers", href: "#astrologers" },
  { label: "Pricing", href: "#pricing" },
]

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-line/40",
          scrolled
            ? "bg-surface/90 backdrop-blur-md"
            : "bg-canvas/80 backdrop-blur-sm"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
              <Compass className="w-4 h-4 text-brand" />
            </div>
            <span className="text-base font-bold font-display tracking-tight text-ink">AstroLive</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-xs font-mono font-semibold text-ink-secondary hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="rounded-md font-mono" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button size="sm" className="rounded-md font-sans font-bold" onClick={() => navigate("/app/dashboard")}>
              Enter App
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1.5 text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 bg-surface border-b border-line md:hidden"
          >
            <div className="px-4 py-4 space-y-2 font-mono">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-xs font-semibold text-ink-secondary hover:text-ink hover:bg-surface-2 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Button variant="outline" size="sm" className="rounded-md" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button size="sm" className="rounded-md font-sans font-bold" onClick={() => navigate("/app/dashboard")}>
                  Enter App
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
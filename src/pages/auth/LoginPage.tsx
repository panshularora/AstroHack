import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, Zap, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"

const DEMO_CREDENTIALS = { email: "arjun.sharma@example.com", password: "cosmic2026" }

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [demoHint, setDemoHint] = useState(false)

  const simulateLogin = async (e: React.FormEvent | null, demo = false) => {
    if (e) e.preventDefault()
    setError("")

    const creds = demo ? DEMO_CREDENTIALS : { email, password }
    if (!demo && (!creds.email || !creds.password)) {
      setError("Please enter your email and password.")
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    navigate("/app/dashboard")
  }

  const handleDemo = () => {
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
    setDemoHint(true)
    setTimeout(() => simulateLogin(null, true), 500)
  }

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-display tracking-tight text-ink mb-1">Welcome back</h2>
        <p className="text-xs text-ink-secondary">Sign in to access your personal Kundli and transits.</p>
      </div>

      {/* Demo Account Button */}
      <button
        onClick={handleDemo}
        disabled={loading}
        className="w-full mb-5 flex items-center gap-3 bg-surface-2 border border-brand/30 hover:border-brand rounded-md p-3.5 text-left group transition-all"
      >
        <div className="w-8 h-8 rounded-md bg-brand-light border border-brand/20 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-brand" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-ink text-xs font-mono">Explore Arjun's Demo Field</p>
          <p className="text-[11px] text-ink-secondary">Instant access to active predictions & chart transits</p>
        </div>
        <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-line" />
        <span className="text-xs font-mono text-ink-secondary uppercase tracking-wider">or sign in with email</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <form onSubmit={simulateLogin} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-mono font-medium text-ink-secondary mb-1.5">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-10 bg-surface-2 border border-line rounded-md pl-9 pr-3.5 text-xs text-ink placeholder:text-ink-tertiary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand font-sans"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs font-mono font-medium text-ink-secondary">Password</label>
            <Link to="/forgot-password" className="text-xs text-gold-bright hover:underline font-mono">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 bg-surface-2 border border-line rounded-md pl-9 pr-9 text-xs text-ink placeholder:text-ink-tertiary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand font-sans"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-danger font-mono">
              {error}
            </motion.p>
          )}
          {demoHint && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-gold-bright font-mono flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" /> Loading demo cosmic field…
            </motion.p>
          )}
        </AnimatePresence>

        <Button type="submit" disabled={loading} className="w-full rounded-md" size="md">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
        </Button>
      </form>

      {/* High Contrast Create Account Redirect */}
      <div className="mt-6 pt-4 border-t border-line/60 text-center">
        <p className="text-xs text-ink-secondary">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gold-bright font-bold hover:underline ml-1">
            Create one free
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
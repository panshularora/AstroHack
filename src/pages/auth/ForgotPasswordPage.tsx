import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { Mail, ArrowLeft, Loader2, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email) {
      setError("Please enter your email address.")
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  return (
    <motion.div
      key="forgot"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-xl bg-brand-light border border-brand/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-brand" />
            </div>
            <h2 className="text-xl font-semibold text-ink mb-2">Check your inbox</h2>
            <p className="text-sm text-ink-secondary mb-1">We sent a reset link to</p>
            <p className="text-sm font-medium text-ink mb-6">{email}</p>
            <p className="text-[13px] text-ink-tertiary mb-6">
              Didn't receive it? Check your spam folder, or{" "}
              <button onClick={() => setSent(false)} className="text-brand hover:underline">try again</button>.
            </p>
            <Link to="/login">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to sign in
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link to="/login" className="flex items-center gap-1.5 text-ink-tertiary hover:text-ink transition-colors mb-6 text-[13px] font-medium group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to sign in
            </Link>

            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-light border border-brand/10 flex items-center justify-center mb-4">
                <Send className="w-5 h-5 text-brand" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink mb-1.5">Forgot your password?</h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                No worries. Enter the email address linked to your account and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-ink-secondary mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-10 bg-surface border border-line rounded-lg pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-brand transition-colors"
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[13px] text-danger">
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send reset link"}
              </Button>
            </form>

            <p className="mt-5 text-center text-[13px] text-ink-tertiary">
              Remembered it?{" "}
              <Link to="/login" className="text-brand hover:text-brand-hover font-medium transition-colors">Sign in</Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
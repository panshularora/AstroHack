import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, Calendar, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"

export function SignUpPage() {
  const navigate = useNavigate()
  const { createNewUser } = useUser()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setLoading(true)

    // Register new user account in database with clean empty arrays for predictions & consultations
    createNewUser(
      name.trim(),
      email.trim(),
      password,
      dob || "1998-05-15",
      "08:30",
      "New Delhi, India"
    )

    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    setSuccess(true)
    await new Promise(r => setTimeout(r, 600))
    navigate("/onboarding")
  }

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const strengthLabels = ["", "Weak", "Fair", "Strong"]
  const strengthColors = ["", "bg-danger", "bg-warning", "bg-success"]

  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="font-sans"
    >
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="w-14 h-14 rounded-md bg-success-light border border-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-success" />
            </div>
            <h2 className="text-xl font-bold font-display text-ink mb-1">Account created!</h2>
            <p className="text-xs text-ink-secondary">Taking you to your birth details setup...</p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-display tracking-tight text-ink mb-1">Create your account</h2>
              <p className="text-xs text-ink-secondary">Begin your personal cosmic journey today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono font-medium text-ink-secondary mb-1.5">Full name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full h-10 bg-surface-2 border border-line rounded-md pl-9 pr-3.5 text-xs text-ink placeholder:text-ink-tertiary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand font-sans"
                  />
                </div>
              </div>

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

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-mono font-medium text-ink-secondary mb-1.5">
                  Date of birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full h-10 bg-surface-2 border border-line rounded-md pl-9 pr-3.5 text-xs text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand font-mono [color-scheme:dark] cursor-pointer"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-mono font-medium text-ink-secondary mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full h-10 bg-surface-2 border border-line rounded-md pl-9 pr-9 text-xs text-ink placeholder:text-ink-tertiary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand font-sans"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink cursor-pointer">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-sm ${i <= strength ? strengthColors[strength] : "bg-surface-3"}`} />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-ink-tertiary">{strengthLabels[strength]}</span>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-danger font-mono">
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <Button type="submit" disabled={loading} className="w-full rounded-md cursor-pointer" size="md">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
              </Button>

              <p className="text-xs text-center text-ink-secondary leading-relaxed pt-2">
                By signing up, you agree to our Terms and Privacy Policy.
              </p>
            </form>

            <div className="mt-6 pt-4 border-t border-line/60 text-center">
              <p className="text-xs font-sans text-ink-secondary">
                Already have an account?{" "}
                <Link to="/login" className="text-gold-bright font-bold hover:underline ml-1">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
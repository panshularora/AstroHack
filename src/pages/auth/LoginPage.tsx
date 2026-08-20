import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, Link, useSearchParams } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { FormError } from "@/components/ui/FormStatus"
import { useI18n } from "@/lib/i18n"

export function LoginPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { loginUser } = useUser()
  const { t } = useI18n()
  const afterLogin = params.get("next") || "/app/dashboard"

  const [email, setEmail] = useState("arjun.sharma@example.com")
  const [password, setPassword] = useState("cosmic2026")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [demoHint, setDemoHint] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError(t("fillEmailPw"))
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))

    const success = await loginUser(email, password)
    setLoading(false)

    if (success) {
      navigate(afterLogin.startsWith("/") ? afterLogin : "/app/dashboard")
    } else {
      setError(t("badLogin"))
    }
  }

  const handleDemo = async () => {
    setEmail("arjun.sharma@example.com")
    setPassword("cosmic2026")
    setDemoHint(true)
    setLoading(true)
    const ok = await loginUser("arjun.sharma@example.com", "cosmic2026")
    setLoading(false)
    if (ok) navigate(afterLogin.startsWith("/") ? afterLogin : "/app/dashboard")
    else setError(t("demoNeedsApi"))
  }

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="font-sans"
    >
      <div className="mb-8">
        <h2 className="font-display text-4xl text-zinc-50 leading-tight">{t("welcomeBack")}</h2>
        <p className="text-sm text-zinc-400 mt-2">{t("signInToSee")}</p>
      </div>

      <button
        type="button"
        onClick={handleDemo}
        disabled={loading}
        className="w-full mb-5 flex items-center gap-3 hover:bg-zinc-900/60 rounded-full p-3.5 text-left group transition-colors duration-200 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
          <span className="text-[11px] font-medium">Demo</span>
        </div>
        <div className="flex-1">
          <p className="text-sm text-zinc-100">{t("tryDemoAs")}</p>
          <p className="text-[11px] text-ink-secondary">{t("sampleChats")}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-line" />
        <span className="text-xs text-zinc-500">{t("orEmail")}</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">{t("email")}</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 bg-white/[0.04] border border-white/10 rounded-full pl-9 pr-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-400 font-sans"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-sm text-zinc-400">{t("password")}</label>
            <Link to="/forgot-password" className="text-xs text-zinc-400 hover:text-zinc-100">
              {t("forgot")}
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 bg-white/[0.04] border border-white/10 rounded-full pl-9 pr-9 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-400 font-sans"
              aria-invalid={Boolean(error)}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              aria-label={showPw ? t("hidePassword") : t("showPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink cursor-pointer"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <FormError message={error} />
        {demoHint && <p className="text-xs text-zinc-400 flex items-center gap-2">{t("loadingDemo")}</p>}

        <Button type="submit" disabled={loading} className="w-full cursor-pointer" size="md">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("signIn")}
        </Button>
      </form>

      <div className="mt-6 pt-4 border-t border-line/60 text-center">
        <p className="text-xs text-ink-secondary">
          {t("noAccount")}{" "}
          <Link to="/signup" className="text-zinc-100 hover:underline ml-1">
            {t("createOneFree")}
          </Link>
        </p>
        <p className="text-[11px] text-zinc-500 mt-3">{t("welcomeOnSignup")}</p>
      </div>
    </motion.div>
  )
}

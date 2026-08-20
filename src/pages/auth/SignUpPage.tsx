import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, Link, useSearchParams } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, Calendar, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"
import { FormError, FormSuccess } from "@/components/ui/FormStatus"
import { captureInvite, readInvite } from "@/lib/utm"
import { apiOptional } from "@/lib/api"
import { useI18n } from "@/lib/i18n"

export function SignUpPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { createNewUser } = useUser()
  const { t } = useI18n()
  const [inviteFrom, setInviteFrom] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    captureInvite()
    const code = readInvite() || params.get("from") || params.get("ref") || ""
    if (!code) return
    apiOptional<{ name: string; credit: number }>(`/api/invite/${encodeURIComponent(code)}`).then((row) => {
      if (row?.name) setInviteFrom(row.name)
    })
  }, [params])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim() || !email.trim() || !password) {
      setError(t("fillRequired"))
      return
    }
    if (password.length < 8) {
      setError(t("pwShort"))
      return
    }

    setLoading(true)
    try {
      await createNewUser(
        name.trim(),
        email.trim(),
        password,
        dob || "1998-05-15",
        "08:30",
        "New Delhi, India"
      )
      setSuccess(true)
      await new Promise((r) => setTimeout(r, 500))
      navigate("/onboarding")
    } catch (err) {
      setError(err instanceof Error ? err.message : t("checkoutFailed"))
    } finally {
      setLoading(false)
    }
  }

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const strengthLabels = ["", t("weak"), t("fair"), t("strong")]
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
          <FormSuccess title={t("accountCreated")} detail={t("takingToBirth")} />
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-display tracking-tight text-ink mb-1">{t("createAccount")}</h2>
              <p className="text-xs text-ink-secondary">
                {inviteFrom ? t("inviteCredit", { name: inviteFrom }) : t("talkDateCome")}
              </p>
              <p className="text-[11px] text-zinc-500 mt-2">{t("welcomeOnSignup")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">{t("fullName")}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("fullName")}
                    className="w-full h-11 bg-white/[0.04] border border-white/10 rounded-full pl-9 pr-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-400 font-sans"
                  />
                </div>
              </div>

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
                <label className="block text-sm text-zinc-400 mb-1.5">{t("dateOfBirth")}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full h-11 bg-white/[0.04] border border-white/10 rounded-full pl-9 pr-3.5 text-sm text-zinc-100 focus-visible:outline-none focus-visible:border-zinc-400 font-mono [color-scheme:dark] cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">{t("password")}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("minChars")}
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
                {password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-sm ${i <= strength ? strengthColors[strength] : "bg-surface-3"}`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-ink-tertiary">{strengthLabels[strength]}</span>
                  </div>
                )}
              </div>

              <FormError message={error} />

              <Button type="submit" disabled={loading} className="w-full cursor-pointer" size="md">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("createAccountCta")}
              </Button>

              <p className="text-xs text-center text-ink-secondary leading-relaxed pt-2">
                {t("agreeTerms")}{" "}
                <Link to="/terms" className="underline">
                  {t("terms")}
                </Link>{" "}
                {t("and")}{" "}
                <Link to="/privacy" className="underline">
                  {t("privacy")}
                </Link>{" "}
                {t("pages")}
              </p>
            </form>

            <div className="mt-6 pt-4 border-t border-line/60 text-center">
              <p className="text-xs font-sans text-ink-secondary">
                {t("haveAccount")}{" "}
                <Link to="/login" className="text-gold-bright font-bold hover:underline ml-1">
                  {t("signIn")}
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

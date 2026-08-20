import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { FormError } from "@/components/ui/FormStatus"
import { useI18n } from "@/lib/i18n"

export function ForgotPasswordPage() {
  const { t } = useI18n()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [asked, setAsked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email) {
      setError(t("enterEmail"))
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setLoading(false)
    setAsked(true)
  }

  return (
    <motion.div
      key="forgot"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="font-sans"
    >
      <Link to="/login" className="text-sm text-zinc-500 hover:text-zinc-200">
        {t("backSignIn")}
      </Link>
      <div className="mt-8 mb-8">
        <h2 className="font-display text-4xl text-zinc-50 leading-tight">{t("forgotHead")}</h2>
        <p className="text-sm text-zinc-400 mt-2">{t("forgotBody")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">{t("email")}</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 bg-white/[0.04] border border-white/10 rounded-full pl-9 pr-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-400"
              aria-invalid={Boolean(error)}
            />
          </div>
        </div>
        <FormError message={error} />
        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("sendReset")}
        </Button>
      </form>

      {asked && <p className="mt-5 text-sm text-amber-200 leading-relaxed">{t("forgotDemo")}</p>}

      <p className="mt-6 text-center text-sm text-zinc-500">
        {t("remembered")}{" "}
        <Link to="/login" className="text-zinc-100 hover:underline">
          {t("signIn")}
        </Link>
      </p>
    </motion.div>
  )
}

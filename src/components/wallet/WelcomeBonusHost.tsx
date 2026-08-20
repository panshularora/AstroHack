import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useUser } from "@/context/UserContext"
import { WELCOME_CREDIT } from "@/lib/entitlements"
import { CashbackPopup } from "@/components/wallet/CashbackPopup"

export function WelcomeBonusHost() {
  const { user, isAuthed, authReady, updateProfile } = useUser()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!authReady || !isAuthed) return
    if (!user.welcomeGranted || user.starterDismissed) return
    if (!user.onboardingComplete) return
    if (location.search.includes("enter=1")) return
    if (location.pathname.includes("/room/")) return
    setOpen(true)
  }, [
    authReady,
    isAuthed,
    user.welcomeGranted,
    user.starterDismissed,
    user.onboardingComplete,
    location.pathname,
    location.search,
  ])

  if (!open) return null

  return (
    <CashbackPopup
      amount={WELCOME_CREDIT}
      onDone={(goWallet) => {
        setOpen(false)
        updateProfile({ starterDismissed: true })
        if (goWallet) navigate("/app/wallet")
      }}
    />
  )
}

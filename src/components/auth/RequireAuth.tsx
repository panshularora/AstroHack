import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useUser } from "@/context/UserContext"

export function RequireAuth({ children }: { children: ReactNode }) {
  const { authReady, isAuthed } = useUser()
  const location = useLocation()

  if (!authReady) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-zinc-500">
        Checking your session…
      </div>
    )
  }

  if (!isAuthed) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?next=${next}`} replace />
  }

  return <>{children}</>
}

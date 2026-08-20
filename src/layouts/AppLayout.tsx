import { Outlet, useLocation } from "react-router-dom"
import { LedgerProvider, useLedger } from "@/context/LedgerContext"
import { StrandModeNav } from "@/components/strand/StrandModeNav"
import { StrandTopBar } from "@/components/strand/StrandTopBar"
import { StrandMobileDock } from "@/components/strand/StrandMobileDock"
import { LensBanner } from "@/components/strand/LensBanner"
import { useDueReminder } from "@/hooks/useDueReminder"
import { WelcomeBonusHost } from "@/components/wallet/WelcomeBonusHost"
import { cn } from "@/lib/utils"

function DueReminderHost() {
  const { predictions } = useLedger()
  useDueReminder(predictions)
  return null
}

export function AppLayout() {
  const location = useLocation()
  const isRoom = location.pathname.includes("/room/") || location.pathname.includes("/puja/session")
  const isReels = location.pathname.includes("/reels")

  return (
    <LedgerProvider>
      <DueReminderHost />
      {!isRoom && <WelcomeBonusHost />}
      <div className="flex h-[100dvh] bg-zinc-950 text-zinc-100 overflow-hidden">
        {!isRoom && <StrandModeNav />}

        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {!isRoom && !isReels && <StrandTopBar />}

          <main
            data-scroll-root
            className={cn(
              "flex-1 relative min-h-0",
              isRoom || isReels ? "overflow-hidden overscroll-none" : "overflow-y-auto pb-24 md:pb-0"
            )}
          >
            {!isRoom && !isReels && <LensBanner />}
            <div
              key={location.pathname}
              className={isRoom || isReels ? "absolute inset-0 overflow-hidden" : "min-h-full animate-fade-in-up"}
            >
              <Outlet />
            </div>
          </main>

          {!isRoom && <StrandMobileDock />}
        </div>
      </div>
    </LedgerProvider>
  )
}

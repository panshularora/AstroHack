import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "@/components/navigation/Sidebar"
import { Topbar } from "@/components/navigation/Topbar"
import { LedgerProvider } from "@/context/LedgerContext"
import { AnimatePresence, motion } from "framer-motion"

export function AppLayout() {
  const location = useLocation()

  return (
    <LedgerProvider>
      <div className="flex h-screen bg-[#030508] text-[#F3F4F6] overflow-hidden relative selection:bg-amber-500/30 selection:text-amber-200">
        {/* Ambient Motion Spotlight Background Glows */}
        <div className="fixed -top-40 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="fixed -bottom-40 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="hidden md:flex z-20">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 z-10 relative">
          <div className="md:hidden flex-shrink-0">
            <Topbar />
          </div>

          <main className="flex-1 overflow-y-auto relative scroll-smooth">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="min-h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </LedgerProvider>
  )
}

import { Outlet, useLocation } from "react-router-dom"
import { Sidebar } from "@/components/navigation/Sidebar"
import { Topbar } from "@/components/navigation/Topbar"
import { AnimatePresence, motion } from "framer-motion"
import { SOSButton } from "@/components/emergency/SOSButton"

export function AppLayout() {
  const location = useLocation()
  const isSOSPage = location.pathname === "/app/sos"

  return (
    <div className="flex h-screen bg-canvas text-ink overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Topbar */}
        <div className="md:hidden flex-shrink-0">
          <Topbar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {!isSOSPage && <SOSButton />}
    </div>
  )
}
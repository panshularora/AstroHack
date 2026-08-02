import { Outlet } from "react-router-dom"

// Thin layout for the standalone landing page.
// No sidebar, no topbar, no nav chrome.
export function RootLayout() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <Outlet />
    </main>
  )
}
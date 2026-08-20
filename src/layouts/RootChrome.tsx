import { Outlet, useLocation, useNavigation } from "react-router-dom"
import { CommandMenuProvider } from "@/components/command/CommandMenu"
import { SiteChrome } from "@/components/site/SiteChrome"
import { StoryGuide } from "@/components/story/StoryGuide"
import { Cursor } from "@/components/motion/Cursor"

export function RootChrome() {
  const loc = useLocation()
  const nav = useNavigation()
  const loading = nav.state === "loading"

  return (
    <CommandMenuProvider>
      <SiteChrome />
      <Cursor />
      <StoryGuide />
      {loading && (
        <div className="fixed top-0 inset-x-0 z-[71] h-0.5 overflow-hidden print:hidden">
          <div className="h-full w-1/3 bg-zinc-100 animate-drift" />
        </div>
      )}
      <div id="main" tabIndex={-1} key={loc.pathname.startsWith("/app") ? "app" : loc.pathname}>
        <Outlet />
      </div>
    </CommandMenuProvider>
  )
}

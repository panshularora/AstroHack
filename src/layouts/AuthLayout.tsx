import { Outlet, Link, useLocation } from "react-router-dom"
import { CosmicField } from "@/components/sky/CosmicField"
import { LangToggle } from "@/components/site/LangToggle"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/Button"

export function AuthLayout() {
  const { t } = useI18n()
  const loc = useLocation()

  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100 flex">
      <div className="hidden lg:flex lg:w-[46%] relative flex-col justify-end p-12 overflow-hidden">
        <CosmicField density={56} />
        <div className="relative z-10">
          <Link to="/" className="font-display text-2xl italic text-zinc-50">
            {t("brand")}
          </Link>
          <h1 className="mt-10 font-display text-5xl text-zinc-50 leading-[0.95] max-w-sm">
            {t("namedDate")}
            <span className="italic text-zinc-300"> {t("keptCard")}</span>
          </h1>
          <p className="text-[15px] text-zinc-400 mt-5 max-w-sm leading-relaxed">{t("heroBody")}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
          <Link to="/" className="font-display text-xl italic lg:hidden">
            {t("brand")}
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <LangToggle compact />
            {loc.pathname !== "/login" && (
              <Link to="/login">
                <Button size="sm">{t("login")}</Button>
              </Link>
            )}
          </div>
        </div>
        <div className="w-full max-w-md pt-14 lg:pt-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

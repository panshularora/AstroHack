import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const [ok, setOk] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setOk(true)
      window.setTimeout(() => setOk(false), 1600)
    } catch {
      setOk(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200",
        className
      )}
    >
      {ok ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      {ok ? "Copied" : label}
    </button>
  )
}

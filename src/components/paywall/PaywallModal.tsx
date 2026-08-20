import { useNavigate } from "react-router-dom"
import { Crown, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { FEATURE_COPY, PLAN_META, type FeatureId } from "@/lib/entitlements"

export function PaywallModal({
  open,
  feature,
  onClose,
}: {
  open: boolean
  feature: FeatureId
  onClose: () => void
}) {
  const navigate = useNavigate()
  if (!open) return null
  const copy = FEATURE_COPY[feature]
  const plan = PLAN_META[copy.required]

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80">
      <div className="w-full max-w-md bg-[#090A0F] border border-zinc-700 p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Plus lock</p>
            <h3 className="text-lg font-bold text-white mt-1">{copy.title}</h3>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-zinc-400">{copy.body}</p>
        <p className="text-sm text-zinc-200">
          {plan.name} · {plan.price}
          {plan.period}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Stay on Free
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              onClose()
              navigate("/app/subscription")
            }}
          >
            <Crown className="w-3.5 h-3.5" />
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  )
}

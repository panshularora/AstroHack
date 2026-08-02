import { ShieldAlert } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function SOSButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate("/app/sos")}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 bg-surface border border-line rounded-full shadow-lg hover:shadow-xl hover:border-line-strong transition-all group"
    >
      <ShieldAlert className="w-[18px] h-[18px] text-danger group-hover:scale-110 transition-transform" />
      <span className="absolute right-full mr-3 whitespace-nowrap bg-ink text-white text-[12px] font-medium px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
        Urgent support
      </span>
    </button>
  )
}
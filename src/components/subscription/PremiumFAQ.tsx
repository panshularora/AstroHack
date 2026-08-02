import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { mockFAQs } from "@/lib/mock-data"

export function PremiumFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mb-24 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-[#9CA3AF]">Everything you need to know about AstroLive+.</p>
      </div>

      <div className="space-y-4">
        {mockFAQs.map((faq, i) => (
          <div key={i} className="bg-card border border-white/10 rounded-2xl overflow-hidden transition-all">
            <button 
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-bold text-white">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-[#9CA3AF] transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`px-6 pb-6 text-[#9CA3AF] text-sm leading-relaxed ${open === i ? 'block' : 'hidden'}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

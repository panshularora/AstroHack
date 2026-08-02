import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Calendar, Target, Sparkles, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { JourneyArc, JourneySpiral } from "@/components/visual/JourneyVisual"
import { cn } from "@/lib/utils"

const steps = ["Birth Details", "Interests", "Goals", "Ready"]
const interests = ["Career", "Relationships", "Health", "Finance", "Spirituality", "Education"]
const goals = ["Daily guidance", "Track predictions", "Find astrologer", "Remedy tracking", "Life planning", "AI companion"]

export function Onboarding() {
  const [step, setStep] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const navigate = useNavigate()

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
  }

  const next = () => step < steps.length - 1 ? setStep(step + 1) : navigate("/app/dashboard")
  const back = () => step > 0 && setStep(step - 1)

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Progress — Journey Arc */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-40 h-32">
            <JourneyArc size={160} progress={(step + 1) / steps.length} animate={true} />
          </div>
          <p className="text-[13px] text-ink-tertiary mt-1">Step {step + 1} of {steps.length}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            {step === 0 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-light border border-brand/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-5 h-5 text-brand" />
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight text-ink mb-1.5">Your birth details</h1>
                  <p className="text-sm text-ink-secondary">This powers your entire cosmic chart.</p>
                </div>
                <div className="space-y-3">
                  <div><label className="block text-[13px] font-medium text-ink-secondary mb-1.5">Date of birth</label><Input type="date" className="[color-scheme:light]" /></div>
                  <div><label className="block text-[13px] font-medium text-ink-secondary mb-1.5">Time of birth</label><Input type="time" className="[color-scheme:light]" /></div>
                  <div><label className="block text-[13px] font-medium text-ink-secondary mb-1.5">Place of birth</label><Input placeholder="City, Country" /></div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-light border border-brand/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-5 h-5 text-brand" />
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight text-ink mb-1.5">What matters to you?</h1>
                  <p className="text-sm text-ink-secondary">Select areas you'd like cosmic guidance on.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {interests.map(item => (
                    <button key={item} onClick={() => toggle(selectedInterests, setSelectedInterests, item)} className={cn("p-3 rounded-lg border text-sm font-medium transition-colors text-left", selectedInterests.includes(item) ? "border-brand bg-brand-light text-brand" : "border-line text-ink-secondary hover:bg-surface-2")}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-light border border-brand/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-5 h-5 text-brand" />
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight text-ink mb-1.5">Your goals</h1>
                  <p className="text-sm text-ink-secondary">What do you want from AstroLive?</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {goals.map(item => (
                    <button key={item} onClick={() => toggle(selectedGoals, setSelectedGoals, item)} className={cn("p-3 rounded-lg border text-sm font-medium transition-colors text-left", selectedGoals.includes(item) ? "border-brand bg-brand-light text-brand" : "border-line text-ink-secondary hover:bg-surface-2")}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-6">
                <div className="w-32 h-32 mx-auto mb-5">
                  <JourneySpiral size={128} animate={true} />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-ink mb-1.5">You're all set!</h1>
                <p className="text-sm text-ink-secondary mb-2">Your cosmic journey begins now.</p>
                <p className="text-[13px] text-ink-tertiary">Every consultation, prediction, and remedy will be woven into your journey spiral.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 0 && step < 3 ? (
            <Button variant="ghost" size="sm" onClick={back}><ArrowLeft className="w-3.5 h-3.5" /> Back</Button>
          ) : <div />}
          <Button size="sm" onClick={next}>
            {step === 3 ? "Enter dashboard" : "Continue"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
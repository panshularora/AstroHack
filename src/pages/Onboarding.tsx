import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useUser } from "@/context/UserContext"

const steps = ["Birth Details", "Interests", "Goals", "Ready"]
const interests = ["Career", "Relationships", "Health", "Finance", "Spirituality", "Education"]
const goals = ["Daily guidance", "Track predictions", "Find astrologer", "Remedy tracking", "Life planning", "AI companion"]

export function Onboarding() {
  const navigate = useNavigate()
  const { user, updateProfile } = useUser()

  const [step, setStep] = useState(0)

  const [dob, setDob] = useState(() => user.dob || "1998-05-15")
  const [timeOfBirth, setTimeOfBirth] = useState(() => user.timeOfBirth || "08:30")
  const [placeOfBirth, setPlaceOfBirth] = useState(() => user.placeOfBirth || "New Delhi, India")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  useEffect(() => {
    if (user.dob) setDob(user.dob)
    if (user.timeOfBirth) setTimeOfBirth(user.timeOfBirth)
    if (user.placeOfBirth) setPlaceOfBirth(user.placeOfBirth)
  }, [user.dob, user.timeOfBirth, user.placeOfBirth])

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
  }

  const handleNext = () => {
    if (step === 0) {
      updateProfile({
        dob,
        timeOfBirth,
        placeOfBirth: placeOfBirth || "New Delhi, India",
      })
    }

    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      updateProfile({
        dob,
        timeOfBirth,
        placeOfBirth: placeOfBirth || "New Delhi, India",
      })
      navigate("/app/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        {/* Simple Step Progress */}
        <div className="text-center mb-6">
          <span className="text-xs text-neutral-400 font-mono">
            Step {step + 1} of {steps.length}
          </span>
        </div>

        {/* Clean Minimal Card Container */}
        <div className="p-8 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* STEP 0: BIRTH DETAILS */}
              {step === 0 && (
                <div className="space-y-5">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white mb-1">Your birth details</h1>
                    <p className="text-sm text-neutral-400">This powers your cosmic chart.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Date of Birth */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Date of birth
                      </label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full h-11 bg-black/50 border border-neutral-800 rounded-xl px-3.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500/60 transition-colors [color-scheme:dark] cursor-pointer"
                      />
                    </div>

                    {/* Time of Birth */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Time of birth
                      </label>
                      <input
                        type="time"
                        value={timeOfBirth}
                        onChange={(e) => setTimeOfBirth(e.target.value)}
                        className="w-full h-11 bg-black/50 border border-neutral-800 rounded-xl px-3.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500/60 transition-colors [color-scheme:dark] cursor-pointer"
                      />
                    </div>

                    {/* Place of Birth */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Place of birth
                      </label>
                      <input
                        type="text"
                        value={placeOfBirth}
                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                        placeholder="City, Country"
                        className="w-full h-11 bg-black/50 border border-neutral-800 rounded-xl px-3.5 text-sm text-white font-sans focus:outline-none focus:border-amber-500/60 transition-colors placeholder:text-neutral-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: INTERESTS */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white mb-1">What matters to you?</h1>
                    <p className="text-sm text-neutral-400">Select areas for cosmic guidance.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {interests.map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggle(selectedInterests, setSelectedInterests, item)}
                        className={cn(
                          "p-3 rounded-xl border text-sm font-medium transition-colors text-left cursor-pointer",
                          selectedInterests.includes(item)
                            ? "border-amber-500 bg-amber-500/10 text-amber-400"
                            : "border-neutral-800 bg-black/30 text-neutral-300 hover:bg-neutral-800/50"
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: GOALS */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white mb-1">Your goals</h1>
                    <p className="text-sm text-neutral-400">What do you want from AstroLive?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {goals.map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggle(selectedGoals, setSelectedGoals, item)}
                        className={cn(
                          "p-3 rounded-xl border text-sm font-medium transition-colors text-left cursor-pointer",
                          selectedGoals.includes(item)
                            ? "border-amber-500 bg-amber-500/10 text-amber-400"
                            : "border-neutral-800 bg-black/30 text-neutral-300 hover:bg-neutral-800/50"
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: READY */}
              {step === 3 && (
                <div className="text-center py-6 space-y-3">
                  <h1 className="text-2xl font-bold text-white">You're all set!</h1>
                  <p className="text-sm text-neutral-400">Your cosmic journey begins now.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Clean Navigation */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-neutral-800">
            {step > 0 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
              </Button>
            ) : <div />}

            <Button
              size="sm"
              onClick={handleNext}
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-xl px-5 py-2 cursor-pointer transition-colors"
            >
              <span>{step === 3 ? "Enter dashboard" : "Continue"}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
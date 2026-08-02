import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { mockOnboardingGoals } from '@/lib/mock-data'
import { Check } from 'lucide-react'
import type { OnboardingData } from './OnboardingOrchestrator'

export function PersonalGoalsStep({ onNext, onBack, data, updateData }: { onNext: () => void, onBack: () => void, data: OnboardingData, updateData: (d: any) => void }) {
  const [selected, setSelected] = useState<string[]>(data.goals || [])

  const toggleGoal = (goal: string) => {
    setSelected(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal])
  }

  const handleNext = () => {
    updateData({ goals: selected })
    onNext()
  }

  return (
    <div className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full relative min-h-screen pt-12 md:pt-24">
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">What brings you to AstroLive?</h2>
        <p className="text-[#9CA3AF]">Select areas you want guidance on. This helps personalize your Daily Briefs and AI insights.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
        {mockOnboardingGoals.map(goal => {
          const isSelected = selected.includes(goal)
          return (
            <button
              key={goal}
              onClick={() => toggleGoal(goal)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected 
                  ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                  : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-[#9CA3AF]'}`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="font-bold block text-sm">{goal}</span>
            </button>
          )
        })}
      </div>

      <div className="pt-12 pb-8 flex justify-between items-center relative z-10 mt-auto">
        <button onClick={onBack} className="text-[#9CA3AF] hover:text-white transition-colors text-sm font-medium">
          Back
        </button>
        <Button onClick={handleNext} disabled={selected.length === 0} className="px-8">
          Continue
        </Button>
      </div>
    </div>
  )
}

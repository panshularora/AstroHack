import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WelcomeStep } from './WelcomeStep'
import { FeatureSlidesStep } from './FeatureSlidesStep'
import { AuthStep } from './AuthStep'
import { BirthDetailsStep } from './BirthDetailsStep'
import { PersonalGoalsStep } from './PersonalGoalsStep'
import { PreferencesStep } from './PreferencesStep'
import { AIIntroStep } from './AIIntroStep'
import { FirstBriefStep } from './FirstBriefStep'
import { AstrologerMatchStep } from './AstrologerMatchStep'
import { SuccessRoadmapStep } from './SuccessRoadmapStep'
import { InteractiveTourOverlay } from './InteractiveTourOverlay'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/context/UserContext'

export type OnboardingData = {
  name: string
  email: string
  phone: string
  dob: string
  birthTime: string
  birthPlace: string
  system: string
  gender: string
  goals: string[]
  lang: string
  consultationMode: string
  notifications: Record<string, boolean>
  [key: string]: any
}

export function OnboardingOrchestrator() {
  const { createNewUser } = useUser()
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    name: '',
    email: '',
    phone: '',
    dob: '1996-03-21',
    birthTime: '12:00',
    birthPlace: 'New York, USA',
    system: 'vedic',
    gender: 'male',
    goals: ['Career Growth', 'Finance', 'Relationships'],
    lang: 'english',
    consultationMode: 'chat',
    notifications: { dailyBrief: true, predictions: true, remedies: true, transits: true }
  })
  const [showTour, setShowTour] = useState(false)
  const navigate = useNavigate()

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1))
  
  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => {
      const updated = { ...prev, ...newData }
      // Create or update real user context chart calculations
      createNewUser(
        updated.name || "Member",
        updated.email || "user@astrolive.io",
        updated.dob || "1996-03-21",
        updated.birthTime || "12:00",
        updated.birthPlace || "New York, USA"
      )
      return updated
    })
  }

  const finishOnboarding = () => {
    createNewUser(
      data.name || "Member",
      data.email || "user@astrolive.io",
      data.dob || "1996-03-21",
      data.birthTime || "12:00",
      data.birthPlace || "New York, USA"
    )
    navigate('/app/dashboard')
  }

  const steps = [
    <WelcomeStep key="welcome" onNext={nextStep} />,
    <FeatureSlidesStep key="features" onNext={nextStep} onBack={prevStep} />,
    <AuthStep key="auth" onNext={nextStep} onBack={prevStep} updateData={updateData} />,
    <BirthDetailsStep key="birth" onNext={nextStep} onBack={prevStep} updateData={updateData} />,
    <PersonalGoalsStep key="goals" onNext={nextStep} onBack={prevStep} data={data} updateData={updateData} />,
    <PreferencesStep key="pref" onNext={nextStep} onBack={prevStep} updateData={updateData} />,
    <AIIntroStep key="ai" onNext={nextStep} data={data} />,
    <FirstBriefStep key="brief" onNext={nextStep} data={data} />,
    <AstrologerMatchStep key="match" onNext={nextStep} data={data} />,
    <SuccessRoadmapStep key="success" onNext={() => setShowTour(true)} data={data} />
  ]

  return (
    <div className="min-h-screen bg-navy relative overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-1 flex flex-col"
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>

      {showTour && <InteractiveTourOverlay onComplete={finishOnboarding} />}
    </div>
  )
}

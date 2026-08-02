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
import { mockUser, mockUserSettings } from '@/lib/mock-data'

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
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    name: 'Arjun Sharma',
    email: 'arjun.sharma@example.com',
    phone: '+1 (555) 382-9102',
    dob: '1994-08-15',
    birthTime: '14:30',
    birthPlace: 'New Delhi, India',
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
      // Persist to central mock database
      if (updated.name) {
        mockUser.name = updated.name.split(' ')[0] || updated.name
        mockUserSettings.profile.name = updated.name
      }
      if (updated.email) mockUserSettings.profile.email = updated.email
      if (updated.phone) mockUserSettings.profile.phone = updated.phone
      if (updated.dob) mockUserSettings.birthDetails.date = updated.dob
      if (updated.birthTime) mockUserSettings.birthDetails.time = updated.birthTime
      if (updated.birthPlace) mockUserSettings.birthDetails.location = updated.birthPlace
      return updated
    })
  }

  const finishOnboarding = () => {
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

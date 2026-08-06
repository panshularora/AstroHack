import { useState } from "react"
import { PRACTITIONERS } from "@/data/practitioners"
import type { Practitioner, SessionMode, Specialization, UserBirthDetails } from "@/types/verified"
import { PractitionerGrid } from "@/components/verified/PractitionerGrid"
import { LiveSessionModal } from "@/components/verified/LiveSessionModal"
import { PractitionerProfileModal } from "@/components/verified/PractitionerProfileModal"
import { FilterModal } from "@/components/verified/FilterModal"
import { SearchModal } from "@/components/verified/SearchModal"
import { HowItWorksModal } from "@/components/verified/HowItWorksModal"
import { PricingModal } from "@/components/verified/PricingModal"
import { SupportModal } from "@/components/verified/SupportModal"
import { BirthChartCalculatorModal } from "@/components/verified/BirthChartCalculatorModal"
import { Compass, ShieldCheck, Filter, Search, HelpCircle, CreditCard, LifeBuoy } from "lucide-react"
import { useUser } from "@/context/UserContext"

export function AstroVerified() {
  const { user } = useUser()

  const [activeSpecialtyFilter, setActiveSpecialtyFilter] = useState<Specialization>('All')

  // User birth details derived from global UserContext profile
  const [userBirthDetails, setUserBirthDetails] = useState<UserBirthDetails>({
    name: user.name || 'Alexandra Vance',
    dob: user.dob || '1995-08-15',
    timeOfBirth: user.timeOfBirth || '10:30',
    location: user.placeOfBirth || 'New Delhi, India',
  })

  // Modals state
  const [activeSession, setActiveSession] = useState<{ practitioner: Practitioner; mode: SessionMode } | null>(null)
  const [profilePractitioner, setProfilePractitioner] = useState<Practitioner | null>(null)
  
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [isBirthChartOpen, setIsBirthChartOpen] = useState(false)

  // Filtered practitioners list
  const filteredPractitioners = PRACTITIONERS.filter((p) => {
    if (activeSpecialtyFilter === 'All') return true
    return p.specialty.toLowerCase() === activeSpecialtyFilter.toLowerCase()
  })

  const handleStartSession = (practitioner: Practitioner, mode: SessionMode) => {
    setActiveSession({ practitioner, mode })
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-200 font-sans pb-20">
      
      {/* Top Controls Bar */}
      <div className="w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-30 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBirthChartOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 rounded-full border border-amber-500/30 transition-colors font-serif cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Natal Chart Engine</span>
          </button>
          {activeSpecialtyFilter !== 'All' && (
            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
              Filtering by: <strong className="text-amber-300">{activeSpecialtyFilter}</strong>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="p-1.5 text-neutral-400 hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Search</span>
          </button>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-1 text-neutral-400 hover:text-amber-200 transition-colors font-mono cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Main Directory Header & Content */}
      <main className="flex-1">
        <header className="pt-8 pb-6 px-4 text-center max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-700/60 shadow-lg text-xs font-medium tracking-wide text-amber-200 mb-4 backdrop-blur-md">
            <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif tracking-wider text-amber-100">
              AstroLive: Verified Predictive Network
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-100 tracking-tight leading-tight mb-3">
            Verified Vedic Practitioners
          </h1>

          <p className="text-sm text-neutral-400 max-w-2xl font-light tracking-wide leading-relaxed mb-4">
            Connect with verified practitioners for audio, video, and chat sessions with 100% verified accuracy standards.
          </p>

          <div className="flex items-center gap-4 text-xs text-neutral-500 font-mono">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              14 Verified Practitioners Live
            </span>
            <span className="text-neutral-700">•</span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              98.5%+ Accuracy Verified
            </span>
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-amber-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>How It Works</span>
            </button>
            <button
              onClick={() => setIsPricingOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-amber-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-400" />
              <span>Pricing & Credits</span>
            </button>
            <button
              onClick={() => setIsSupportOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-amber-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-amber-400" />
              <span>Concierge Support</span>
            </button>
          </div>
        </header>

        {/* Directory Grid */}
        <PractitionerGrid
          practitioners={filteredPractitioners}
          onStartSession={handleStartSession}
          onOpenProfile={(p) => setProfilePractitioner(p)}
        />
      </main>

      {/* Interactive Modals */}
      {activeSession && (
        <LiveSessionModal
          practitioner={activeSession.practitioner}
          mode={activeSession.mode}
          userBirthDetails={userBirthDetails}
          onUpdateBirthDetails={setUserBirthDetails}
          onClose={() => setActiveSession(null)}
        />
      )}

      {profilePractitioner && (
        <PractitionerProfileModal
          practitioner={profilePractitioner}
          onStartSession={handleStartSession}
          onClose={() => setProfilePractitioner(null)}
        />
      )}

      {isFilterModalOpen && (
        <FilterModal
          activeFilter={activeSpecialtyFilter}
          onSelectFilter={(spec) => setActiveSpecialtyFilter(spec)}
          onClose={() => setIsFilterModalOpen(false)}
        />
      )}

      {isSearchModalOpen && (
        <SearchModal
          practitioners={PRACTITIONERS}
          onSelectPractitioner={(p) => setProfilePractitioner(p)}
          onClose={() => setIsSearchModalOpen(false)}
        />
      )}

      {isHowItWorksOpen && (
        <HowItWorksModal onClose={() => setIsHowItWorksOpen(false)} />
      )}

      {isPricingOpen && (
        <PricingModal onClose={() => setIsPricingOpen(false)} />
      )}

      {isSupportOpen && (
        <SupportModal onClose={() => setIsSupportOpen(false)} />
      )}

      {isBirthChartOpen && (
        <BirthChartCalculatorModal
          userBirthDetails={userBirthDetails}
          onUpdateBirthDetails={setUserBirthDetails}
          onClose={() => setIsBirthChartOpen(false)}
        />
      )}

    </div>
  )
}
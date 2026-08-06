import React, { useState } from 'react';
import { PRACTITIONERS } from './data/practitioners';
import { Practitioner, SessionMode, Specialization, UserBirthDetails } from './types';
import { Header } from './components/Header';
import { PractitionerGrid } from './components/PractitionerGrid';
import { FooterNav } from './components/FooterNav';
import { LiveSessionModal } from './components/LiveSessionModal';
import { PractitionerProfileModal } from './components/PractitionerProfileModal';
import { FilterModal } from './components/FilterModal';
import { SearchModal } from './components/SearchModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { PricingModal } from './components/PricingModal';
import { SupportModal } from './components/SupportModal';
import { BirthChartCalculatorModal } from './components/BirthChartCalculatorModal';
import { Compass, Sparkles, Filter, Search } from 'lucide-react';

export default function App() {
  const [activeSpecialtyFilter, setActiveSpecialtyFilter] = useState<Specialization>('All');
  
  // User Birth Details
  const [userBirthDetails, setUserBirthDetails] = useState<UserBirthDetails>({
    name: 'Alexandra Vance',
    dob: '1995-08-15',
    timeOfBirth: '10:30',
    location: 'New York, USA',
  });

  // Modals state
  const [activeSession, setActiveSession] = useState<{ practitioner: Practitioner; mode: SessionMode } | null>(null);
  const [profilePractitioner, setProfilePractitioner] = useState<Practitioner | null>(null);
  
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isBirthChartOpen, setIsBirthChartOpen] = useState(false);

  // Filtered practitioners
  const filteredPractitioners = PRACTITIONERS.filter((p) => {
    if (activeSpecialtyFilter === 'All') return true;
    return p.specialty.toLowerCase() === activeSpecialtyFilter.toLowerCase();
  });

  const handleStartSession = (practitioner: Practitioner, mode: SessionMode) => {
    setActiveSession({ practitioner, mode });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* Top Bar with Quick Controls */}
      <div className="w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBirthChartOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 rounded-full border border-amber-500/30 transition-colors font-serif"
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
            className="p-1.5 text-neutral-400 hover:text-amber-200 transition-colors"
            title="Search Practitioners"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-1 text-neutral-400 hover:text-amber-200 transition-colors font-mono"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <Header />

        {/* Directory Grid */}
        <PractitionerGrid
          practitioners={filteredPractitioners}
          onStartSession={handleStartSession}
          onOpenProfile={(p) => setProfilePractitioner(p)}
        />
      </main>

      {/* Bottom Navigation & Footer */}
      <FooterNav
        onOpenFilter={() => setIsFilterModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        activeSpecialtyFilter={activeSpecialtyFilter}
      />

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
  );
}

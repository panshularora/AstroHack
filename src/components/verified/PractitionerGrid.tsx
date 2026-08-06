import React from 'react';
import type { Practitioner, SessionMode } from '@/types/verified';
import { PractitionerCard } from './PractitionerCard';

interface PractitionerGridProps {
  practitioners: Practitioner[];
  onStartSession: (practitioner: Practitioner, mode: SessionMode) => void;
  onOpenProfile: (practitioner: Practitioner) => void;
}

export const PractitionerGrid: React.FC<PractitionerGridProps> = ({
  practitioners,
  onStartSession,
  onOpenProfile,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
        {practitioners.map((practitioner) => (
          <PractitionerCard
            key={practitioner.id}
            practitioner={practitioner}
            onStartSession={onStartSession}
            onOpenProfile={onOpenProfile}
          />
        ))}
      </div>
    </div>
  );
};

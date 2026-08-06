import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Practitioner, SessionMode } from '@/types/verified';

interface PractitionerCardProps {
  practitioner: Practitioner;
  onStartSession: (practitioner: Practitioner, mode: SessionMode) => void;
  onOpenProfile?: (practitioner: Practitioner) => void;
}

export const PractitionerCard: React.FC<PractitionerCardProps> = ({
  practitioner,
  onStartSession,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/app/astrologer/${practitioner.id}`);
  };

  return (
    <div className="group relative bg-[#141518]/95 hover:bg-[#191b1f] border border-neutral-800/90 hover:border-neutral-700/80 rounded-2xl p-3.5 flex flex-col transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/60 font-sans">
      {/* Clean Portrait Image Container - Navigates to Astrologer Profile Page */}
      <div 
        onClick={handleCardClick}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 cursor-pointer mb-3 border border-neutral-800 group-hover:border-neutral-700/60 transition-colors"
      >
        <img
          src={practitioner.imageUrl}
          alt={practitioner.name}
          className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Practitioner Info Row below image */}
      <div 
        onClick={handleCardClick}
        className="cursor-pointer mb-3 px-0.5 space-y-1"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {practitioner.isOnline && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Live Now" />
            )}
            <h3 className="font-serif text-sm md:text-base font-normal text-neutral-100 group-hover:text-amber-200 transition-colors truncate">
              {practitioner.name}
            </h3>
          </div>
          <span className="font-mono text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 uppercase shrink-0">
            {practitioner.tag}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-400 font-light">
          <span className="truncate">{practitioner.specialty}</span>
          <span className="font-mono font-bold text-amber-400 text-xs shrink-0 ml-1">
            ₹{practitioner.ratePerMin}/min
          </span>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-0.5">
          <span>{practitioner.experienceYears} Yrs Exp</span>
          <span className="text-emerald-400 font-bold">{practitioner.accuracy} Accuracy</span>
        </div>
      </div>

      {/* Bottom Session Mode Trigger Buttons: Audio, Video, Chat */}
      <div className="mt-auto pt-2.5 border-t border-neutral-800/80 grid grid-cols-3 gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartSession(practitioner, 'audio');
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-neutral-900/80 hover:bg-amber-950/40 text-neutral-400 hover:text-amber-200 border border-neutral-800 hover:border-amber-800/50 transition-all cursor-pointer group/btn"
          title="Start Audio Consultation"
        >
          <div className="w-3.5 h-3.5 rounded-full border-1.5 border-current flex items-center justify-center mb-0.5 group-hover/btn:scale-110 transition-transform">
            <div className="w-1 h-1 rounded-full bg-current" />
          </div>
          <span className="text-[10px] font-mono tracking-wider">Audio</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartSession(practitioner, 'video');
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md bg-neutral-900/80 hover:bg-amber-950/40 text-neutral-400 hover:text-amber-200 border border-neutral-800 hover:border-amber-800/50 transition-all cursor-pointer group/btn"
          title="Start Video Consultation"
        >
          <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-current my-1 mb-1 group-hover/btn:scale-110 transition-transform" />
          <span className="text-[10px] font-mono tracking-wider">Video</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartSession(practitioner, 'chat');
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-neutral-900/80 hover:bg-amber-950/40 text-neutral-400 hover:text-amber-200 border border-neutral-800 hover:border-amber-800/50 transition-all cursor-pointer group/btn"
          title="Start Live Chat Consultation"
        >
          <div className="w-3.5 h-[2px] bg-current my-1.5 mb-1 group-hover/btn:scale-110 transition-transform rounded-full" />
          <span className="text-[10px] font-mono tracking-wider">Chat</span>
        </button>
      </div>
    </div>
  );
};

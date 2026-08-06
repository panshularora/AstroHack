import React from 'react';
import { Practitioner, SessionMode } from '../types';

interface PractitionerCardProps {
  practitioner: Practitioner;
  onStartSession: (practitioner: Practitioner, mode: SessionMode) => void;
  onOpenProfile: (practitioner: Practitioner) => void;
}

export const PractitionerCard: React.FC<PractitionerCardProps> = ({
  practitioner,
  onStartSession,
  onOpenProfile,
}) => {
  return (
    <div className="group relative bg-[#141518]/95 hover:bg-[#191b1f] border border-neutral-800/90 hover:border-neutral-700/80 rounded-xl p-3 flex flex-col transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/60">
      {/* Top Image Container */}
      <div 
        onClick={() => onOpenProfile(practitioner)}
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900 cursor-pointer mb-3 border border-neutral-800 group-hover:border-neutral-700/60 transition-colors"
      >
        {/* High-contrast Monochrome Portrait Image */}
        <img
          src={practitioner.imageUrl}
          alt={practitioner.name}
          className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Right System Tag Badge - e.g. [VEDIC] */}
        <div className="absolute top-2 right-2 z-10">
          <span className="font-mono text-[10px] tracking-widest text-neutral-200 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-neutral-700/80 uppercase shadow-md">
            {practitioner.tag}
          </span>
        </div>

        {/* Live Indicator overlay if online */}
        {practitioner.isOnline && (
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-neutral-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider">Live</span>
          </div>
        )}
      </div>

      {/* Practitioner Info Header */}
      <div 
        onClick={() => onOpenProfile(practitioner)}
        className="cursor-pointer mb-3 px-1"
      >
        <div className="flex items-baseline justify-between gap-2 mb-0.5">
          <h3 className="font-serif text-sm md:text-base font-normal text-neutral-100 group-hover:text-amber-100 transition-colors truncate">
            {practitioner.name}
          </h3>
          <div className="text-right shrink-0">
            <span className="text-[10px] text-neutral-400 font-mono block leading-none">Accuracy</span>
            <span className="font-serif text-xs md:text-sm text-neutral-200 font-light tracking-tight">
              {practitioner.accuracy}
            </span>
          </div>
        </div>

        <p className="text-xs text-neutral-400 font-light truncate">
          {practitioner.specialty}
        </p>
      </div>

      {/* Bottom Session Mode Trigger Buttons: Audio, Video, Chat */}
      <div className="mt-auto pt-2 border-t border-neutral-800/80 grid grid-cols-3 gap-1">
        {/* Audio Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartSession(practitioner, 'audio');
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md bg-neutral-900/60 hover:bg-amber-950/40 text-neutral-400 hover:text-amber-200 border border-neutral-800 hover:border-amber-800/50 transition-all group/btn"
          title="Start Audio Consultation"
        >
          {/* Circle Icon as seen in screenshot */}
          <div className="w-4 h-4 rounded-full border-1.5 border-current flex items-center justify-center mb-0.5 group-hover/btn:scale-110 transition-transform">
            <div className="w-1 h-1 rounded-full bg-current" />
          </div>
          <span className="text-[10px] font-mono tracking-wider">Audio</span>
        </button>

        {/* Video Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartSession(practitioner, 'video');
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md bg-neutral-900/60 hover:bg-amber-950/40 text-neutral-400 hover:text-amber-200 border border-neutral-800 hover:border-amber-800/50 transition-all group/btn"
          title="Start Video Consultation"
        >
          {/* Triangle / Play Icon as seen in screenshot */}
          <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-current my-1 mb-1 group-hover/btn:scale-110 transition-transform" />
          <span className="text-[10px] font-mono tracking-wider">Video</span>
        </button>

        {/* Chat Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartSession(practitioner, 'chat');
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md bg-neutral-900/60 hover:bg-amber-950/40 text-neutral-400 hover:text-amber-200 border border-neutral-800 hover:border-amber-800/50 transition-all group/btn"
          title="Start Live Chat Consultation"
        >
          {/* Dash / Minus Icon as seen in screenshot */}
          <div className="w-3.5 h-[2px] bg-current my-1.5 mb-1 group-hover/btn:scale-110 transition-transform rounded-full" />
          <span className="text-[10px] font-mono tracking-wider">Chat</span>
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Star, ShieldCheck, Clock, Sparkles, MessageSquare, Video, Mic } from 'lucide-react';
import type { Practitioner, SessionMode } from '@/types/verified';

interface PractitionerProfileModalProps {
  practitioner: Practitioner;
  onStartSession: (practitioner: Practitioner, mode: SessionMode) => void;
  onClose: () => void;
}

export const PractitionerProfileModal: React.FC<PractitionerProfileModalProps> = ({
  practitioner,
  onStartSession,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg font-sans">
      <div className="relative w-full max-w-3xl bg-[#121316] border border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-2xl text-neutral-100 max-h-[88vh] flex flex-col overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header - Fixed Top */}
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start pb-5 border-b border-neutral-800/80 shrink-0">
          
          {/* Clean Portrait Image Container - No Floating Overlay Badges */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-700 shrink-0 shadow-xl">
            <img
              src={practitioner.imageUrl}
              alt={practitioner.name}
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>

          {/* Practitioner Specs */}
          <div className="flex-1 text-center sm:text-left space-y-2 min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 pr-8 sm:pr-0">
              {practitioner.isOnline && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Live Now" />
              )}
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal leading-tight truncate">
                {practitioner.name}
              </h2>
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 font-light flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className="truncate">{practitioner.title}</span>
              <span className="text-neutral-600">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-bold shrink-0">
                {practitioner.specialty}
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-amber-300 border border-neutral-700 text-[10px] font-mono font-bold uppercase shrink-0">
                {practitioner.tag}
              </span>
            </p>

            {/* Metrics Badges Grid */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 font-mono text-xs text-neutral-300">
              <div className="flex items-center gap-1.5 bg-neutral-900/90 px-2.5 py-1 rounded-xl border border-neutral-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">{practitioner.accuracy}</span>
                <span className="text-neutral-500 text-[10px] uppercase">Accuracy</span>
              </div>

              <div className="flex items-center gap-1.5 bg-neutral-900/90 px-2.5 py-1 rounded-xl border border-neutral-800">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">{practitioner.rating}</span>
                <span className="text-neutral-500 text-[10px]">({practitioner.totalSessions} sessions)</span>
              </div>

              <div className="flex items-center gap-1.5 bg-neutral-900/90 px-2.5 py-1 rounded-xl border border-neutral-800">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-bold text-white">{practitioner.experienceYears} Yrs Exp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Quote Body - Scrollable Middle */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {practitioner.featuredQuote && (
            <blockquote className="p-3.5 rounded-2xl bg-amber-950/20 border-l-3 border-amber-400 italic text-xs sm:text-sm text-amber-100 font-serif leading-relaxed">
              "{practitioner.featuredQuote}"
            </blockquote>
          )}

          <div>
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold mb-1.5">
              Practitioner Biography
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {practitioner.bio}
            </p>
          </div>

          {practitioner.techniques && practitioner.techniques.length > 0 && (
            <div>
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold mb-2">
                Primary System Techniques
              </h3>
              <div className="flex flex-wrap gap-2">
                {practitioner.techniques.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 rounded-xl"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom High-Contrast Action Bar - Fixed Bottom (Never Cut Off) */}
        <div className="pt-4 border-t border-neutral-800/80 bg-[#121316] shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-mono text-sm text-neutral-300">
            Rate: <strong className="text-amber-400 font-bold text-base sm:text-lg">₹{practitioner.ratePerMin}</strong> / min
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onStartSession(practitioner, 'audio');
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5 text-amber-400" />
              <span>Start Audio</span>
            </button>
            <button
              onClick={() => {
                onStartSession(practitioner, 'video');
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>Start Video</span>
            </button>
            <button
              onClick={() => {
                onStartSession(practitioner, 'chat');
                onClose();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-mono font-bold transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Start Live Chat</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

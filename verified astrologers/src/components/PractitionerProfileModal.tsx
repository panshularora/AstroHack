import React from 'react';
import { X, Star, ShieldCheck, Sparkles, Clock, Compass } from 'lucide-react';
import { Practitioner, SessionMode } from '../types';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#141518] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-neutral-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start pb-6 border-b border-neutral-800">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-700 shrink-0 shadow-xl">
            <img
              src={practitioner.imageUrl}
              alt={practitioner.name}
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute top-2 right-2">
              <span className="font-mono text-[9px] text-amber-300 bg-black/80 px-1.5 py-0.5 rounded border border-neutral-700 uppercase">
                {practitioner.tag}
              </span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-100 font-medium">
                {practitioner.name}
              </h2>
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            </div>

            <p className="text-sm text-neutral-400 font-light mb-3">
              {practitioner.title} • <span className="text-amber-200/90">{practitioner.specialty}</span>
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-1 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                <span className="text-amber-400 font-bold">{practitioner.accuracy}</span>
                <span className="text-neutral-500">Accuracy</span>
              </div>
              <div className="flex items-center gap-1 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{practitioner.rating}</span>
                <span className="text-neutral-500">({practitioner.totalSessions})</span>
              </div>
              <div className="flex items-center gap-1 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{practitioner.experienceYears} Yrs Exp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Quote */}
        <div className="py-6 space-y-4">
          <blockquote className="p-4 rounded-xl bg-neutral-900/80 border-l-2 border-amber-400 italic text-xs sm:text-sm text-amber-100/90 font-serif">
            "{practitioner.featuredQuote}"
          </blockquote>

          <div>
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Practitioner Biography
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {practitioner.bio}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Primary System Techniques
            </h3>
            <div className="flex flex-wrap gap-2">
              {practitioner.techniques.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Triggers */}
        <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm text-neutral-300">
            Rate: <strong className="text-amber-200">${practitioner.ratePerMin.toFixed(2)}</strong> / min
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onStartSession(practitioner, 'audio');
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-neutral-900 hover:bg-amber-950/40 text-neutral-200 hover:text-amber-200 border border-neutral-700 rounded-xl text-xs font-mono font-medium transition-colors"
            >
              Start Audio
            </button>
            <button
              onClick={() => {
                onStartSession(practitioner, 'video');
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-neutral-900 hover:bg-amber-950/40 text-neutral-200 hover:text-amber-200 border border-neutral-700 rounded-xl text-xs font-mono font-medium transition-colors"
            >
              Start Video
            </button>
            <button
              onClick={() => {
                onStartSession(practitioner, 'chat');
                onClose();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-mono font-medium transition-colors shadow-lg"
            >
              Start Live Chat
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

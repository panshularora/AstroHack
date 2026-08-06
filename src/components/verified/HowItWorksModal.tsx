import React from 'react';
import { X, ShieldCheck, Sparkles } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-2xl bg-[#141518] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-neutral-100 max-h-[85vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium text-amber-100">
                How AstroLive Works
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                The Predictive Network Standard for Astrology & Cosmic Navigation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          {/* Step 1 */}
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-300 font-mono text-xs shrink-0 font-bold">
              01
            </div>
            <div>
              <h3 className="font-serif text-base text-neutral-100 mb-1">
                Verified Practitioner Directory
              </h3>
              <p className="text-neutral-400">
                Every practitioner listed on AstroLive undergoes rigorous vetting for prediction accuracy (minimum 98.0%+ verified historical baseline), deep mastery of Parashara Jyotish, Nakshatras, and cosmic degree math.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-300 font-mono text-xs shrink-0 font-bold">
              02
            </div>
            <div>
              <h3 className="font-serif text-base text-neutral-100 mb-1">
                Natal Chart Calibration
              </h3>
              <p className="text-neutral-400">
                Provide your birth date, time, and city. Our real-time backend engine automatically calculates planet degrees, Lagna (Ascendant), divisional D9/D10 charts, and your active Vimshottari Dasha period.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-300 font-mono text-xs shrink-0 font-bold">
              03
            </div>
            <div>
              <h3 className="font-serif text-base text-neutral-100 mb-1">
                Instant Encrypted Sessions (Audio, Video, Chat)
              </h3>
              <p className="text-neutral-400">
                Choose your preferred mode: high-fidelity voice call, video consultation, or instant live message stream. Receive direct, actionable, real-time guidance grounded in celestial planetary transits.
              </p>
            </div>
          </div>

          {/* Guarantee Banner */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong>100% Satisfaction Guarantee:</strong> If your session does not deliver absolute clarity or alignment, your credits are refunded immediately.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

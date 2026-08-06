import React from 'react';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-6 px-4 text-center max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Logo Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-700/60 shadow-lg text-xs font-medium tracking-wide text-amber-200/90 mb-6 backdrop-blur-md">
        <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
          <Compass className="w-3.5 h-3.5" />
        </div>
        <span className="font-serif tracking-wider text-amber-100/90">
          AstroLive: Life Navigation System
        </span>
      </div>

      {/* Main Title */}
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-100 tracking-tight leading-tight mb-3 drop-shadow-sm">
        The Predictive Network Directory
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-neutral-400 max-w-2xl font-light tracking-wide leading-relaxed mb-2">
        Connect with verified practitioners for audio, video, and chat sessions.
      </p>

      {/* Subtle indicator bar */}
      <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500 font-mono">
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          14 Verified Practitioners Live
        </span>
        <span className="text-neutral-700">•</span>
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80" />
          98.5%+ Accuracy Verified
        </span>
      </div>
    </header>
  );
};

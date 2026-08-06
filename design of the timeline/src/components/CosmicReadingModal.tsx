import React from 'react';
import { X, Sparkles, BookOpen, Compass, Award } from 'lucide-react';
import { CosmicReading } from '../types';

interface CosmicReadingModalProps {
  reading: CosmicReading | null;
  isOpen: boolean;
  onClose: () => void;
  isFallback?: boolean;
}

export const CosmicReadingModal: React.FC<CosmicReadingModalProps> = ({
  reading,
  isOpen,
  onClose,
  isFallback,
}) => {
  if (!isOpen || !reading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-amber-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(251,191,36,0.15)] text-zinc-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-2">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <span className="block text-xs font-mono tracking-[0.25em] text-amber-200/80 uppercase">
            {reading.theme || 'Celestial Path Synthesis'}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
            {reading.title}
          </h2>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 mb-6 shadow-inner">
          <p className="text-base font-serif italic text-zinc-200 leading-relaxed text-center">
            "{reading.summary}"
          </p>
        </div>

        {/* Insights Section */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xs font-mono text-amber-200/90 uppercase tracking-widest flex items-center gap-2">
            <Compass className="w-4 h-4" /> Celestial Patterns & Insights
          </h3>
          <div className="grid gap-3">
            {reading.insights.map((insight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-zinc-900/60 border border-white/5 rounded-xl p-4 text-sm text-zinc-300 leading-relaxed"
              >
                <span className="text-amber-300 font-mono font-bold">0{idx + 1}.</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Astrological Analogy */}
        {reading.astrologicalAnalogy && (
          <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-5 mb-8 flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-200 mb-1">
                Cosmic Alignment
              </h4>
              <p className="text-xs text-amber-100/80 font-sans leading-relaxed">
                {reading.astrologicalAnalogy}
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-[11px] font-mono text-zinc-500">
            {isFallback ? '✦ AstroLive Standard Reading Engine' : '✦ Powered by Gemini 3.6 Flash'}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-mono text-xs font-bold transition-all shadow-lg cursor-pointer"
          >
            Close Reading
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Sparkles, Compass, Award } from 'lucide-react';
import type { CosmicReading } from '../../../types/constellation';

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
    <div className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn select-none font-sans">
      <div className="relative w-full max-w-2xl bg-[#090A0F] border border-zinc-700 rounded-none p-8 shadow-[0_0_50px_rgba(245,158,11,0.2)] text-zinc-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-zinc-100/5 text-zinc-200 border border-zinc-700 mb-2">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <span className="block text-xs font-mono tracking-[0.25em] text-zinc-300 font-bold uppercase">
            {reading.theme || 'Celestial Path Synthesis'}
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-wide">
            {reading.title}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-none p-6 mb-6 shadow-inner">
          <p className="text-base font-display italic text-zinc-200 leading-relaxed text-center">
            "{reading.summary}"
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-xs font-mono text-zinc-200 uppercase tracking-widest flex items-center gap-2 font-bold">
            <Compass className="w-4 h-4" /> Celestial Patterns & Insights
          </h3>
          <div className="grid gap-3 font-mono text-xs">
            {reading.insights.map((insight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-none p-4 text-xs text-zinc-300 leading-relaxed"
              >
                <span className="text-zinc-300 font-mono font-bold">0{idx + 1}.</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {reading.astrologicalAnalogy && (
          <div className="bg-zinc-100/5 border border-zinc-700 rounded-none p-5 mb-8 flex items-start gap-3">
            <Award className="w-5 h-5 text-zinc-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-200 mb-1 font-bold">
                Cosmic Alignment
              </h4>
              <p className="text-xs text-amber-100 font-mono leading-relaxed">
                {reading.astrologicalAnalogy}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs">
          <span className="text-[11px] text-zinc-500">
            {isFallback ? '✦ AstroLive Standard Reading Engine' : '✦ Powered by Gemini AI Engine'}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-none bg-zinc-100 hover:bg-zinc-200 text-black font-mono text-xs font-bold transition-all shadow-lg cursor-pointer"
          >
            Close Reading
          </button>
        </div>
      </div>
    </div>
  );
};

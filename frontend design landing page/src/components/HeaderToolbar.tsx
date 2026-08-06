import React from 'react';
import { Volume2, VolumeX, Maximize2, Sparkles, Palette, Edit3, Clock } from 'lucide-react';
import { AmbientSoundType, ThemeId } from '../types';

interface HeaderToolbarProps {
  zenMode: boolean;
  onToggleZenMode: () => void;
  ambientSound: AmbientSoundType;
  onOpenSoundModal: () => void;
  onOpenReflectionModal: () => void;
  onOpenThemeModal: () => void;
  activeTheme: ThemeId;
  formattedDate: string;
}

export const HeaderToolbar: React.FC<HeaderToolbarProps> = ({
  zenMode,
  onToggleZenMode,
  ambientSound,
  onOpenSoundModal,
  onOpenReflectionModal,
  onOpenThemeModal,
  formattedDate,
}) => {
  if (zenMode) {
    return (
      <button
        onClick={onToggleZenMode}
        className="fixed top-6 right-6 z-50 text-neutral-500 hover:text-neutral-200 transition-colors p-2 rounded-full hover:bg-neutral-800/40 cursor-pointer"
        title="Exit Minimal Zen View (or press Esc)"
      >
        <Maximize2 className="w-4 h-4" />
      </button>
    );
  }

  return (
    <header className="w-full max-w-5xl mx-auto px-6 py-4 flex items-center justify-between text-neutral-400 select-none">
      {/* Left: Date & Subtitle */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-neutral-400" />
          <span className="font-sans-clean text-xs sm:text-sm text-neutral-300 tracking-wide font-medium">
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Right: Quick Tool Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reflection / Log Note */}
        <button
          onClick={onOpenReflectionModal}
          className="flex items-center gap-1.5 text-xs font-sans-clean text-neutral-300 hover:text-white bg-neutral-900/60 hover:bg-neutral-800/80 px-3 py-1.5 rounded-full border border-neutral-800/80 transition-all cursor-pointer"
          title="Write Reflection or Note"
        >
          <Edit3 className="w-3.5 h-3.5 text-neutral-400" />
          <span className="hidden sm:inline">Reflect</span>
        </button>

        {/* Ambient Soundscape */}
        <button
          onClick={onOpenSoundModal}
          className={`flex items-center gap-1.5 text-xs font-sans-clean px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
            ambientSound !== 'none'
              ? 'bg-neutral-100 text-neutral-900 border-white font-medium shadow-[0_0_10px_rgba(255,255,255,0.3)]'
              : 'text-neutral-300 hover:text-white bg-neutral-900/60 hover:bg-neutral-800/80 border-neutral-800/80'
          }`}
          title="Ambient Sound Synthesizer"
        >
          {ambientSound !== 'none' ? (
            <Volume2 className="w-3.5 h-3.5 text-neutral-900 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
          )}
          <span className="capitalize">{ambientSound !== 'none' ? ambientSound : 'Sound'}</span>
        </button>

        {/* Themes */}
        <button
          onClick={onOpenThemeModal}
          className="p-1.5 text-neutral-400 hover:text-neutral-100 bg-neutral-900/60 hover:bg-neutral-800/80 rounded-full border border-neutral-800/80 transition-all cursor-pointer"
          title="Change Aesthetic Theme"
        >
          <Palette className="w-3.5 h-3.5" />
        </button>

        {/* Zen Mode */}
        <button
          onClick={onToggleZenMode}
          className="flex items-center gap-1 text-xs font-sans-clean text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-800/80 px-2.5 py-1.5 rounded-full border border-neutral-800/80 transition-all cursor-pointer"
          title="Toggle Pure Minimal View"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
          <span className="hidden sm:inline">Zen View</span>
        </button>
      </div>
    </header>
  );
};

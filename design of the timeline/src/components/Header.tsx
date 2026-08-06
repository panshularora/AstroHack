import React from 'react';
import { Menu, Sparkles, Plus, Compass } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenAddModal: () => void;
  onGenerateReading: () => void;
  isGeneratingReading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenAddModal,
  onGenerateReading,
  isGeneratingReading,
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 pointer-events-none">
      {/* Logo */}
      <div className="pointer-events-auto flex items-center space-x-2">
        <h1 className="text-2xl font-light tracking-wide text-white font-serif flex items-center gap-2">
          <span className="text-amber-200/90 text-xl font-mono font-bold">✦</span>
          AstroLive
        </h1>
      </div>

      {/* Main Title Centered */}
      <div className="absolute left-1/2 -translate-x-1/2 top-6 text-center pointer-events-auto hidden md:block">
        <h2 className="text-xl md:text-2xl tracking-[0.25em] text-zinc-100 font-serif uppercase font-light drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
          The Life Constellation Map
        </h2>
      </div>

      {/* Right Controls */}
      <div className="pointer-events-auto flex items-center space-x-3">
        <button
          onClick={onGenerateReading}
          disabled={isGeneratingReading}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-amber-200/90 border border-amber-500/30 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(251,191,36,0.1)] active:scale-95 disabled:opacity-50 cursor-pointer"
          title="Generate AI Celestial Reading"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isGeneratingReading ? 'animate-spin' : ''}`} />
          <span>{isGeneratingReading ? 'Reading Stars...' : 'Cosmic Reading'}</span>
        </button>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-zinc-200 border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          title="Add New Milestone Star"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Star</span>
        </button>

        <button
          onClick={onOpenMenu}
          className="p-2 rounded-lg text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/10 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

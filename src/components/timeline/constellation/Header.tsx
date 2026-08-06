import React from 'react';
import { Menu, Sparkles, Plus } from 'lucide-react';

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
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 pointer-events-none font-sans">
      <div className="pointer-events-auto flex items-center space-x-2">
        <h1 className="text-xl font-display font-bold tracking-wide text-white flex items-center gap-2">
          <span className="text-amber-400 text-lg font-mono">✦</span>
          AstroLive Timeline
        </h1>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-6 text-center pointer-events-auto hidden md:block">
        <h2 className="text-xs md:text-sm tracking-[0.25em] text-zinc-200 font-mono uppercase font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
          The Life Constellation Map
        </h2>
      </div>

      <div className="pointer-events-auto flex items-center space-x-3">
        <button
          onClick={onGenerateReading}
          disabled={isGeneratingReading}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] backdrop-blur-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          title="Generate AI Celestial Reading"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isGeneratingReading ? 'animate-spin' : ''}`} />
          <span>{isGeneratingReading ? 'Reading Stars...' : 'Cosmic Reading'}</span>
        </button>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-zinc-200 border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          title="Add New Milestone Star"
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Add Star</span>
        </button>

        <button
          onClick={onOpenMenu}
          className="p-2.5 rounded-xl text-zinc-300 hover:text-white bg-black/60 hover:bg-zinc-800 border border-white/10 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

import React from 'react';
import { Palette, X, Check } from 'lucide-react';
import type { ThemeId } from '../../../types/chrono';
import { THEMES } from '../../../utils/chrono/themes';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none font-sans">
      <div className="w-full max-w-md bg-[#090A0F] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col space-y-5 text-neutral-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-lg text-white font-bold">Aesthetic Theme</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          {Object.values(THEMES).map((theme) => {
            const isSelected = activeTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full ${theme.bgClass} border border-neutral-700 flex items-center justify-center`}>
                    <div className={`w-2 h-2 rounded-full ${theme.accent}`} />
                  </div>
                  <span className="text-xs font-bold text-white">{theme.name}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-400" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl font-mono text-xs transition-colors cursor-pointer"
        >
          Apply Theme
        </button>
      </div>
    </div>
  );
};

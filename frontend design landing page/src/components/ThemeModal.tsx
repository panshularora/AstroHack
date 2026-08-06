import React from 'react';
import { Palette, X, Check } from 'lucide-react';
import { ThemeId } from '../types';
import { THEMES } from '../utils/themes';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-md bg-[#181818] border border-neutral-800 rounded-3xl p-6 shadow-2xl flex flex-col space-y-5 text-neutral-200">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-display text-lg text-white font-medium">Aesthetic Theme</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {Object.values(THEMES).map((theme) => {
            const isSelected = activeTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-800/80 border-neutral-600 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]'
                    : 'bg-neutral-900/60 border-neutral-800/80 text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full ${theme.bgClass} border border-neutral-700 flex items-center justify-center`}>
                    <div className={`w-2 h-2 rounded-full ${theme.accent}`} />
                  </div>
                  <span className="text-sm font-sans-clean font-medium text-white">{theme.name}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-white text-neutral-900 hover:bg-neutral-200 rounded-xl font-sans-clean font-medium text-sm transition-colors cursor-pointer"
        >
          Apply Theme
        </button>
      </div>
    </div>
  );
};

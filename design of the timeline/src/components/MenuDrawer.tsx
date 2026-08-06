import React from 'react';
import { X, Filter, Download, Upload, RotateCcw, Sparkles, Star } from 'lucide-react';
import { MilestoneCategory } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetDefault: () => void;
  onClearAll: () => void;
}

const CATEGORY_FILTERS: { label: string; value: string }[] = [
  { label: 'All Stars', value: 'all' },
  { label: 'Birth', value: 'birth' },
  { label: 'Education', value: 'education' },
  { label: 'Career', value: 'career' },
  { label: 'Travel', value: 'travel' },
  { label: 'Relationship', value: 'relationship' },
  { label: 'Achievement', value: 'achievement' },
  { label: 'Decision', value: 'decision' },
];

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  onExportData,
  onImportData,
  onResetDefault,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-zinc-950 border-l border-white/15 h-full p-6 shadow-2xl flex flex-col text-zinc-100 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="text-lg font-serif text-white">Constellation Menu</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-300" /> Filter Constellation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORY_FILTERS.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => onSelectCategory(cat.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono border text-left transition-all cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  ✦ {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Map Management */}
          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
              Data & Export
            </h4>
            <div className="space-y-2">
              <button
                onClick={onExportData}
                className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
              >
                <span>Export Map JSON</span>
                <Download className="w-4 h-4 text-amber-300" />
              </button>

              <label className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-xs font-mono text-zinc-200 transition-colors cursor-pointer">
                <span>Import Constellation JSON</span>
                <Upload className="w-4 h-4 text-amber-300" />
                <input
                  type="file"
                  accept=".json"
                  onChange={onImportData}
                  className="hidden"
                />
              </label>

              <button
                onClick={onResetDefault}
                className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
              >
                <span>Reset Default Screenshot Map</span>
                <RotateCcw className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] font-mono text-zinc-500">
            AstroLive Constellation Map v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

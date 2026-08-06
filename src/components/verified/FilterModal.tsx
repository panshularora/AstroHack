import React from 'react';
import { X, Check } from 'lucide-react';
import type { Specialization } from '@/types/verified';

interface FilterModalProps {
  activeFilter: Specialization;
  onSelectFilter: (specialty: Specialization) => void;
  onClose: () => void;
}

const SPECIALITY_OPTIONS: { label: Specialization; desc: string; tag: string }[] = [
  { label: 'All', desc: 'Browse all verified practitioners across all systems', tag: 'ALL' },
  { label: 'Vedic Astrology', desc: 'Classical Jyotish, Nakshatras, Dasha periods, and Karmic timing', tag: 'VEDIC' },
  { label: 'Financial Transits', desc: 'Monetary degrees, market trends, wealth yogas, and expansion cycles', tag: 'FIN' },
  { label: 'Relationship Sync', desc: 'Synastry compatibility, soulmate alignment, and Guna matching', tag: 'REL' },
  { label: 'Cosmic Counseling', desc: 'Evolutionary astrology, spiritual awakenings, and archetypal guidance', tag: 'COSMIC' },
  { label: 'Career Projections', desc: '10th House Karma Bhava, D10 Dashamsha, leadership timing', tag: 'CAREER' },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  activeFilter,
  onSelectFilter,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-lg bg-[#141518] border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-100">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h2 className="font-serif text-lg font-medium text-amber-100">
              Filter by Specialization
            </h2>
            <p className="text-xs text-neutral-400 font-light">
              Select a domain of predictive astrology or counseling
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {SPECIALITY_OPTIONS.map((opt) => {
            const isSelected = activeFilter === opt.label;
            return (
              <button
                key={opt.label}
                onClick={() => {
                  onSelectFilter(opt.label);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500/80 text-amber-100'
                    : 'bg-neutral-900/60 hover:bg-neutral-800/80 border-neutral-800 text-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-serif text-sm font-medium text-neutral-100 group-hover:text-amber-200">
                      {opt.label}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-black/60 text-neutral-400 border border-neutral-800">
                      [{opt.tag}]
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light">
                    {opt.desc}
                  </p>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

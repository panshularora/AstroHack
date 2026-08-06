import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import type { Practitioner } from '@/types/verified';

interface SearchModalProps {
  practitioners: Practitioner[];
  onSelectPractitioner: (practitioner: Practitioner) => void;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  practitioners,
  onSelectPractitioner,
  onClose,
}) => {
  const [query, setQuery] = useState('');

  const filtered = practitioners.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.specialty.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q) ||
      (p.techniques && p.techniques.some((t) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-2xl bg-[#141518] border border-neutral-800 rounded-2xl p-5 shadow-2xl text-neutral-100 flex flex-col max-h-[80vh]">
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search practitioners by name, specialty, tag [VEDIC], or technique..."
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-neutral-100 placeholder:text-neutral-500 focus:outline-none font-light"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto space-y-2 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-xs font-mono">
              No matching verified practitioners found for "{query}".
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectPractitioner(p);
                  onClose();
                }}
                className="p-3 bg-neutral-900/60 hover:bg-neutral-800/90 border border-neutral-800 hover:border-neutral-700/80 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-900 shrink-0 border border-neutral-800">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-sm text-neutral-100 group-hover:text-amber-200 truncate">
                        {p.name}
                      </h4>
                      <span className="font-mono text-[9px] text-amber-300 bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/30 uppercase">
                        {p.tag}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light truncate">
                      {p.specialty} • Accuracy {p.accuracy}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono text-xs text-amber-300 font-bold">
                  ₹{p.ratePerMin}/min
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

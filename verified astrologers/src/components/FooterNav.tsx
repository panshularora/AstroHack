import React from 'react';
import { Compass, Filter, Search, HelpCircle, CreditCard, LifeBuoy } from 'lucide-react';

interface FooterNavProps {
  onOpenFilter: () => void;
  onOpenSearch: () => void;
  onOpenHowItWorks: () => void;
  onOpenPricing: () => void;
  onOpenSupport: () => void;
  activeSpecialtyFilter: string;
}

export const FooterNav: React.FC<FooterNavProps> = ({
  onOpenFilter,
  onOpenSearch,
  onOpenHowItWorks,
  onOpenPricing,
  onOpenSupport,
  activeSpecialtyFilter,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4 flex flex-col items-center gap-8">
      {/* Centered Navigation Links as shown in the reference screenshot */}
      <nav className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 text-sm text-neutral-300 font-serif tracking-wide">
        <button
          onClick={onOpenFilter}
          className="hover:text-amber-200 transition-colors flex items-center gap-1.5 focus:outline-none group"
        >
          <Filter className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
          <span>Filter by Specialization</span>
          {activeSpecialtyFilter !== 'All' && (
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-500/30">
              {activeSpecialtyFilter}
            </span>
          )}
        </button>

        <button
          onClick={onOpenSearch}
          className="hover:text-amber-200 transition-colors flex items-center gap-1.5 focus:outline-none group"
        >
          <Search className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
          <span>Search Practitioners</span>
        </button>

        <button
          onClick={onOpenHowItWorks}
          className="hover:text-amber-200 transition-colors flex items-center gap-1.5 focus:outline-none group"
        >
          <HelpCircle className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
          <span>How It Works</span>
        </button>

        <button
          onClick={onOpenPricing}
          className="hover:text-amber-200 transition-colors flex items-center gap-1.5 focus:outline-none group"
        >
          <CreditCard className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
          <span>Pricing</span>
        </button>

        <button
          onClick={onOpenSupport}
          className="hover:text-amber-200 transition-colors flex items-center gap-1.5 focus:outline-none group"
        >
          <LifeBuoy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
          <span>Support</span>
        </button>
      </nav>

      {/* AstroLive Branding Footer */}
      <footer className="flex flex-col items-center justify-center gap-2 text-center pt-4 border-t border-neutral-800/60 w-full max-w-2xl">
        <div className="flex items-center gap-2 text-neutral-200 font-serif text-sm tracking-widest">
          <div className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Compass className="w-3 h-3" />
          </div>
          <span>AstroLive</span>
        </div>
        <p className="text-[11px] font-mono text-neutral-500 tracking-wider">
          © {new Date().getFullYear()} AstroLive Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

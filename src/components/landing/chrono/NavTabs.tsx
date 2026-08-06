import React from 'react';
import { motion } from 'framer-motion';
import type { NavTab } from '../../../types/chrono';

interface NavTabsProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const NavTabs: React.FC<NavTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: NavTab; label: string }[] = [
    { id: 'past', label: 'Past Transits' },
    { id: 'present', label: 'Present Alignment' },
    { id: 'future', label: 'Future Horizons' },
  ];

  return (
    <nav className="flex items-center justify-center space-x-4 sm:space-x-8 select-none py-4 font-sans relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-4 py-2 text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 cursor-pointer focus:outline-none uppercase ${
              isActive
                ? 'text-amber-400 font-bold scale-105'
                : 'text-neutral-400 hover:text-white font-normal'
            }`}
          >
            <span>{tab.label}</span>

            {/* Glowing Active Indicator Pillar */}
            {isActive && (
              <motion.div
                layoutId="activeNavTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.9)] rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};

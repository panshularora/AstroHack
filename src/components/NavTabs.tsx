import React from 'react';
import type { NavTab } from '../types';

interface NavTabsProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const NavTabs: React.FC<NavTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: NavTab; label: string }[] = [
    { id: 'past', label: 'Past' },
    { id: 'present', label: 'Present' },
    { id: 'future', label: 'Future' },
  ];

  return (
    <nav className="flex items-center justify-center space-x-8 sm:space-x-12 select-none py-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative font-sans-clean text-sm sm:text-base tracking-wide transition-all duration-300 cursor-pointer focus:outline-none ${
              isActive
                ? 'text-white font-medium scale-105'
                : 'text-neutral-400 hover:text-neutral-200 font-normal'
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

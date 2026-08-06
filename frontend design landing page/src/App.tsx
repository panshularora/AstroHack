/**
 * Chrono - Time & Reflection
 * Minimalist temporal clock & timeline navigation app
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ClockDisplay } from './components/ClockDisplay';
import { TimeSlider } from './components/TimeSlider';
import { NavTabs } from './components/NavTabs';
import { HeaderToolbar } from './components/HeaderToolbar';
import { PresentView } from './components/PresentView';
import { PastView } from './components/PastView';
import { FutureView } from './components/FutureView';
import { SoundModal } from './components/SoundModal';
import { ThemeModal } from './components/ThemeModal';
import { ReflectionModal } from './components/ReflectionModal';
import {
  NavTab,
  TimeFormat,
  ReflectionEntry,
  TimeCapsule,
  FutureGoal,
  ThemeId,
  AmbientSoundType,
} from './types';
import {
  getDayProgress,
  getDateFromDayProgress,
  formatDateString,
  formatTime,
} from './utils/time';
import { THEMES } from './utils/themes';
import { playAmbientSound, setAmbientVolume } from './utils/audio';

export default function App() {
  // Live Clock State
  const [realTime, setRealTime] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState<boolean>(true);
  const [sliderProgress, setSliderProgress] = useState<number>(() => getDayProgress(new Date()));

  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<NavTab>('present');
  const [zenMode, setZenMode] = useState<boolean>(false);
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('12h');
  const [showSeconds, setShowSeconds] = useState<boolean>(false);

  // Themes & Sound
  const [activeTheme, setActiveTheme] = useState<ThemeId>('obsidian');
  const [ambientSound, setAmbientSound] = useState<AmbientSoundType>('none');
  const [soundVolume, setSoundVolume] = useState<number>(0.3);

  // Modals
  const [showSoundModal, setShowSoundModal] = useState<boolean>(false);
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false);
  const [showReflectionModal, setShowReflectionModal] = useState<boolean>(false);

  // Data persistence
  const [reflections, setReflections] = useState<ReflectionEntry[]>(() => {
    try {
      const saved = localStorage.getItem('chrono_reflections');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [timeCapsules, setTimeCapsules] = useState<TimeCapsule[]>(() => {
    try {
      const saved = localStorage.getItem('chrono_capsules');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [futureGoals, setFutureGoals] = useState<FutureGoal[]>(() => {
    try {
      const saved = localStorage.getItem('chrono_goals');
      return saved
        ? JSON.parse(saved)
        : [
            { id: '1', title: 'Sunset Reflection & Evening Quiet', timeLabel: '07:30 PM', completed: false, timestamp: Date.now() },
            { id: '2', title: 'Night Journal & Tomorrow Planning', timeLabel: '09:30 PM', completed: false, timestamp: Date.now() },
          ];
    } catch {
      return [];
    }
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('chrono_reflections', JSON.stringify(reflections));
  }, [reflections]);

  useEffect(() => {
    localStorage.setItem('chrono_capsules', JSON.stringify(timeCapsules));
  }, [timeCapsules]);

  useEffect(() => {
    localStorage.setItem('chrono_goals', JSON.stringify(futureGoals));
  }, [futureGoals]);

  // Live timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setRealTime(now);
      if (isLive) {
        setSliderProgress(getDayProgress(now));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isLive]);

  // Keyboard shortcut for Zen View
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zenMode) {
        setZenMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zenMode]);

  // Compute displayed date based on live state or slider scrubbing
  const displayDate = useMemo(() => {
    if (isLive) return realTime;
    return getDateFromDayProgress(sliderProgress, realTime);
  }, [isLive, sliderProgress, realTime]);

  const themeConfig = THEMES[activeTheme] || THEMES.obsidian;

  // Handlers
  const handleSliderChange = (newProgress: number) => {
    setIsLive(false);
    setSliderProgress(newProgress);
  };

  const handleResetToLive = () => {
    setIsLive(true);
    setSliderProgress(getDayProgress(realTime));
  };

  const handleToggleFormat = () => {
    if (timeFormat === '12h' && !showSeconds) {
      setShowSeconds(true);
    } else if (timeFormat === '12h' && showSeconds) {
      setTimeFormat('24h');
      setShowSeconds(false);
    } else {
      setTimeFormat('12h');
      setShowSeconds(false);
    }
  };

  const handleSoundChange = (type: AmbientSoundType) => {
    setAmbientSound(type);
    playAmbientSound(type, soundVolume);
  };

  const handleVolumeChange = (vol: number) => {
    setSoundVolume(vol);
    setAmbientVolume(vol);
  };

  const handleSaveReflection = (entry: Omit<ReflectionEntry, 'id' | 'createdAt'>) => {
    const newEntry: ReflectionEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setReflections((prev) => [newEntry, ...prev]);
  };

  const handleAddIntention = (content: string) => {
    const timeLabel = formatTime(displayDate, timeFormat);
    handleSaveReflection({
      title: 'Daily Anchor',
      content,
      category: 'intention',
      tab: 'present',
      timeLabel,
      timestamp: displayDate.getTime(),
    });
  };

  const handleAddCapsule = (title: string, message: string, unlockTimestamp: number) => {
    const newCapsule: TimeCapsule = {
      id: Date.now().toString(),
      createdTimestamp: Date.now(),
      unlockTimestamp,
      title,
      message,
      isUnlocked: false,
    };
    setTimeCapsules((prev) => [newCapsule, ...prev]);
  };

  const handleAddGoal = (title: string, timeLabel: string) => {
    const newGoal: FutureGoal = {
      id: Date.now().toString(),
      title,
      timeLabel,
      completed: false,
      timestamp: Date.now(),
    };
    setFutureGoals((prev) => [...prev, newGoal]);
  };

  const handleToggleGoal = (id: string) => {
    setFutureGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  return (
    <div
      className={`min-h-screen w-full ${themeConfig.bgClass} text-neutral-100 flex flex-col justify-between transition-colors duration-500 overflow-x-hidden font-sans-clean selection:bg-neutral-800 selection:text-white`}
    >
      {/* Top Header / Subtle Action Toolbar */}
      <HeaderToolbar
        zenMode={zenMode}
        onToggleZenMode={() => setZenMode(!zenMode)}
        ambientSound={ambientSound}
        onOpenSoundModal={() => setShowSoundModal(true)}
        onOpenReflectionModal={() => setShowReflectionModal(true)}
        onOpenThemeModal={() => setShowThemeModal(true)}
        activeTheme={activeTheme}
        formattedDate={formatDateString(displayDate)}
      />

      {/* Central Visual Focus Area (Exactly matches the user's screenshot layout) */}
      <main className="flex-1 flex flex-col items-center justify-center my-auto w-full max-w-4xl mx-auto px-4 py-6">
        {/* Large Serif Time Readout */}
        <ClockDisplay
          displayDate={displayDate}
          timeFormat={timeFormat}
          showSeconds={showSeconds}
          onToggleFormat={handleToggleFormat}
          isScrubbing={!isLive}
        />

        {/* Glowing Thin Timeline Slider */}
        <TimeSlider
          progress={sliderProgress}
          onChange={handleSliderChange}
          isLive={isLive}
          onResetToLive={handleResetToLive}
        />

        {/* Bottom Navigation Tabs */}
        <NavTabs activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

        {/* Active Tab Functional Panels (Visible when not in Zen Mode) */}
        {!zenMode && (
          <div className="w-full mt-6">
            {activeTab === 'present' && (
              <PresentView
                currentDate={displayDate}
                reflections={reflections}
                onAddIntention={handleAddIntention}
              />
            )}
            {activeTab === 'past' && (
              <PastView
                currentDate={displayDate}
                reflections={reflections}
                onAddReflection={handleSaveReflection}
              />
            )}
            {activeTab === 'future' && (
              <FutureView
                currentDate={displayDate}
                timeCapsules={timeCapsules}
                futureGoals={futureGoals}
                onAddCapsule={handleAddCapsule}
                onAddGoal={handleAddGoal}
                onToggleGoal={handleToggleGoal}
              />
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <SoundModal
        isOpen={showSoundModal}
        onClose={() => setShowSoundModal(false)}
        activeSound={ambientSound}
        onSelectSound={handleSoundChange}
        volume={soundVolume}
        onVolumeChange={handleVolumeChange}
      />

      <ThemeModal
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        activeTheme={activeTheme}
        onSelectTheme={(theme) => setActiveTheme(theme)}
      />

      <ReflectionModal
        isOpen={showReflectionModal}
        onClose={() => setShowReflectionModal(false)}
        activeTab={activeTab}
        timeLabel={formatTime(displayDate, timeFormat)}
        onSave={handleSaveReflection}
      />
    </div>
  );
}

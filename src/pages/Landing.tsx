import { useState, useEffect, useMemo, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  Orbit,
  Star,
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockDisplay } from '../components/landing/chrono/ClockDisplay';
import { TimeSlider } from '../components/landing/chrono/TimeSlider';
import { NavTabs } from '../components/landing/chrono/NavTabs';
import { HeaderToolbar } from '../components/landing/chrono/HeaderToolbar';
import { PresentView } from '../components/landing/chrono/PresentView';
import { PastView } from '../components/landing/chrono/PastView';
import { FutureView } from '../components/landing/chrono/FutureView';
import { SoundModal } from '../components/landing/chrono/SoundModal';
import { ThemeModal } from '../components/landing/chrono/ThemeModal';
import { ReflectionModal } from '../components/landing/chrono/ReflectionModal';
import type {
  NavTab,
  TimeFormat,
  ReflectionEntry,
  TimeCapsule,
  FutureGoal,
  ThemeId,
  AmbientSoundType,
} from '../types/chrono';
import {
  getDayProgress,
  getDateFromDayProgress,
  formatDateString,
  formatTime,
} from '../utils/chrono/time';
import { THEMES } from '../utils/chrono/themes';
import { playAmbientSound, setAmbientVolume } from '../utils/chrono/audio';

const FAQS = [
  {
    q: 'How does AstroLive calculate real-time planetary transits?',
    a: 'AstroLive uses mathematical Sidereal Lahiri Ayanamsha algorithms synced with astronomical ephemeris data to render exact degrees, nakshatra padas, and dasha periods.',
  },
  {
    q: 'What is the 3D Constellation Life Journey map?',
    a: 'The 3D Constellation map allows you to visualize major life events, memories, and spiritual milestones as interactive glowing star nodes linked across space and time.',
  },
  {
    q: 'Can I match with verified astrologers and log consultation records?',
    a: 'Yes! AstroLive includes AstroVerified match algorithms, consultation logging, and AI-powered prediction trackers for complete confidence.',
  },
];

export function Landing() {
  const navigate = useNavigate();
  const [realTime, setRealTime] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState<boolean>(true);
  const [sliderProgress, setSliderProgress] = useState<number>(() => getDayProgress(new Date()));

  const [activeTab, setActiveTab] = useState<NavTab>('present');
  const [zenMode, setZenMode] = useState<boolean>(false);
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('12h');
  const [showSeconds, setShowSeconds] = useState<boolean>(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [activeTheme, setActiveTheme] = useState<ThemeId>('obsidian');
  const [ambientSound, setAmbientSound] = useState<AmbientSoundType>('none');
  const [soundVolume, setSoundVolume] = useState<number>(0.3);

  const [showSoundModal, setShowSoundModal] = useState<boolean>(false);
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false);
  const [showReflectionModal, setShowReflectionModal] = useState<boolean>(false);

  // Scroll animation visibility observer states
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
            { id: '1', title: 'Sunset Meditation & Quiet Reflection', timeLabel: '07:30 PM', completed: false, timestamp: Date.now() },
            { id: '2', title: 'Kundli Verification & Daily Alignment', timeLabel: '09:30 PM', completed: false, timestamp: Date.now() },
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('chrono_reflections', JSON.stringify(reflections));
  }, [reflections]);

  useEffect(() => {
    localStorage.setItem('chrono_capsules', JSON.stringify(timeCapsules));
  }, [timeCapsules]);

  useEffect(() => {
    localStorage.setItem('chrono_goals', JSON.stringify(futureGoals));
  }, [futureGoals]);

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

  // Tab switching smoothly moves the timeline slider line!
  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'past') {
      setIsLive(false);
      setSliderProgress(22); // Glides line back to Past
    } else if (tab === 'present') {
      setIsLive(true);
      setSliderProgress(getDayProgress(realTime)); // Glides line to Present live time
    } else if (tab === 'future') {
      setIsLive(false);
      setSliderProgress(85); // Glides line forward to Future
    }
  };

  const displayDate = useMemo(() => {
    if (isLive) return realTime;
    return getDateFromDayProgress(sliderProgress, realTime);
  }, [isLive, sliderProgress, realTime]);

  const themeConfig = THEMES[activeTheme] || THEMES.obsidian;

  const handleSliderChange = (newProgress: number) => {
    setIsLive(false);
    setSliderProgress(newProgress);
  };

  const handleResetToLive = () => {
    setIsLive(true);
    setSliderProgress(getDayProgress(realTime));
    setActiveTab('present');
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
      className={`min-h-screen w-full ${themeConfig.bgClass} text-neutral-100 flex flex-col justify-between transition-colors duration-500 overflow-x-hidden font-sans selection:bg-neutral-800 selection:text-white relative`}
    >
      {/* Dynamic Animated Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[150px]"
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Toolbar */}
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

        {/* Pristine Minimal Hero Section */}
        <main className="min-h-[80vh] flex flex-col items-center justify-center my-auto w-full max-w-4xl mx-auto px-4 py-8">
          <ClockDisplay
            displayDate={displayDate}
            timeFormat={timeFormat}
            showSeconds={showSeconds}
            onToggleFormat={handleToggleFormat}
            isScrubbing={!isLive}
          />

          {/* Interactive Moving Timeline Line */}
          <TimeSlider
            progress={sliderProgress}
            onChange={handleSliderChange}
            isLive={isLive}
            onResetToLive={handleResetToLive}
          />

          {/* Dynamic Animated Nav Tabs (Past / Present / Future) */}
          <NavTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {!zenMode && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="w-full mt-6"
              >
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
              </motion.div>
            </AnimatePresence>
          )}
        </main>

        {/* ABOUT ASTROLIVE & ENTER SECTION */}
        <section
          id="about-astrolive"
          ref={registerRef('about-astrolive')}
          className={`w-full max-w-4xl mx-auto px-6 py-20 border-t border-neutral-900/80 transition-all duration-1000 transform ${
            visibleSections['about-astrolive']
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* About Headline */}
          <div className="text-center space-y-3 mb-14">
            <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              ✦ ABOUT ASTROLIVE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal mt-3">
              Real-Time Vedic Astrology & Planetary Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto font-sans leading-relaxed">
              AstroLive bridges millenia of authentic Vedic astronomical calculations with cutting-edge 3D interactive constellation timelines and real-time planetary transits.
            </p>
          </div>

          {/* 3 Core Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <motion.div
              whileHover={{ scale: 1.03, y: -6 }}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex flex-col space-y-3 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300 cursor-pointer"
            >
              <Orbit className="w-6 h-6 text-amber-400" />
              <h3 className="font-serif text-lg text-white font-bold">Vedic Kundli Engine</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Authentic Lahiri Ayanamsha mathematical calculations for planetary degrees, Dasha periods, and house placements.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -6 }}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex flex-col space-y-3 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 cursor-pointer"
            >
              <Star className="w-6 h-6 text-cyan-400" />
              <h3 className="font-serif text-lg text-white font-bold">3D Life Constellation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Visualize your life journey, key memories, and milestones as interactive glowing star nodes linked in 3D space.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -6 }}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex flex-col space-y-3 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer"
            >
              <Cpu className="w-6 h-6 text-emerald-400" />
              <h3 className="font-serif text-lg text-white font-bold">AI Cosmic Intelligence</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Personalized daily briefs, smart astrologer verification matching, and instant consultation record keeping.
              </p>
            </motion.div>
          </div>

          {/* Integrated Seamless CTA Section */}
          <div className="relative py-12 px-4 text-center flex flex-col items-center space-y-5 my-6">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 blur-2xl pointer-events-none -z-10" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Celestial Transits Live</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-normal tracking-tight">
              Step Into Your Celestial Alignment
            </h3>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-sans leading-relaxed">
              Experience your live Kundli chart, planetary dasha transits, and interactive life journey timeline now.
            </p>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Enter AstroLive</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* HIGH TRUST ADVANTAGE */}
        <section
          id="trust-advantage"
          ref={registerRef('trust-advantage')}
          className={`w-full max-w-4xl mx-auto px-6 py-20 border-t border-neutral-900 transition-all duration-1000 transform ${
            visibleSections['trust-advantage']
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center space-y-2 mb-12">
            <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              ✦ HIGH TRUST PLATFORM
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal mt-2">
              Why AstroLive is Built Different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 flex flex-col space-y-3 hover:border-amber-500/40 hover:-translate-y-1.5 transition-all duration-300">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <h4 className="text-sm font-bold text-white font-serif">Mathematical Ephemeris Accuracy</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                No generic random horoscopes. AstroLive calculates exact planetary degrees using NASA JPL synced astronomical algorithms.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 flex flex-col space-y-3 hover:border-cyan-500/40 hover:-translate-y-1.5 transition-all duration-300">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h4 className="text-sm font-bold text-white font-serif">Real-Time Dasha Engine</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Track Mahadasha, Antardasha, and Paryantardasha timelines live with high-precision time scrubbing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 flex flex-col space-y-3 hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300">
              <Activity className="w-6 h-6 text-emerald-400" />
              <h4 className="text-sm font-bold text-white font-serif">Local Privacy Control</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Your birth chart data and personal notes are stored locally and securely, giving you 100% control over your privacy.
              </p>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section
          id="faq-section"
          ref={registerRef('faq-section')}
          className={`w-full max-w-3xl mx-auto px-6 py-20 border-t border-neutral-900 transition-all duration-1000 transform ${
            visibleSections['faq-section']
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center space-y-2 mb-10">
            <div className="flex items-center justify-center gap-1.5 text-neutral-400">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>
            <h2 className="text-2xl font-serif text-white font-normal">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80 cursor-pointer hover:border-neutral-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-sans">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                      expandedFaq === idx ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </div>
                {expandedFaq === idx && (
                  <p className="text-xs text-neutral-400 mt-2.5 pt-2 border-t border-neutral-800/60 leading-relaxed font-sans">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full border-t border-neutral-900 bg-black/60 py-10 px-6 font-sans">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-400 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold text-sm">✦</span>
              <span className="font-serif font-bold text-white text-sm">ASTROLIVE</span>
              <span className="text-neutral-600">•</span>
              <span>Vedic Astrology & Planetary Transits OS</span>
            </div>

            <div className="flex items-center gap-6 text-neutral-400 font-mono text-[11px]">
              <button onClick={() => navigate('/login')} className="hover:text-white transition-colors cursor-pointer">
                Login / Signup
              </button>
              <button onClick={() => navigate('/app/dashboard')} className="hover:text-white transition-colors cursor-pointer">
                Dashboard
              </button>
              <button onClick={() => navigate('/timeline')} className="hover:text-white transition-colors cursor-pointer">
                3D Timeline
              </button>
            </div>

            <span className="text-neutral-600 text-[11px] font-mono">
              © {new Date().getFullYear()} AstroLive. All rights reserved.
            </span>
          </div>
        </footer>
      </div>

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

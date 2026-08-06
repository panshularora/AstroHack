import React, { useState, useEffect } from 'react';
import type { LifeMilestone, ConstellationLine, CosmicReading } from '../types/constellation';
import { INITIAL_MILESTONES, INITIAL_LINES } from '../data/initialConstellation';
import { Header } from '../components/timeline/constellation/Header';
import { ConstellationCanvas } from '../components/timeline/constellation/ConstellationCanvas';
import { Controls } from '../components/timeline/constellation/Controls';
import { TimelineScrubber } from '../components/timeline/constellation/TimelineScrubber';
import { AddMilestoneModal } from '../components/timeline/constellation/AddMilestoneModal';
import { MilestoneDetailDrawer } from '../components/timeline/constellation/MilestoneDetailDrawer';
import { CosmicReadingModal } from '../components/timeline/constellation/CosmicReadingModal';
import { MenuDrawer } from '../components/timeline/constellation/MenuDrawer';
import { useUser } from '@/context/UserContext';
import { Sparkles, Upload, Plus } from 'lucide-react';

export function LifeJourney() {
  const { user } = useUser();
  const isDemoUser = user.email === "arjun.sharma@example.com" || user.id === "u1";

  const storageKeyMilestones = `astrolive_milestones_${user.id}`;
  const storageKeyLines = `astrolive_lines_${user.id}`;

  const [milestones, setMilestones] = useState<LifeMilestone[]>(() => {
    const saved = localStorage.getItem(storageKeyMilestones);
    if (saved) return JSON.parse(saved);
    return isDemoUser ? INITIAL_MILESTONES : [];
  });

  const [lines, setLines] = useState<ConstellationLine[]>(() => {
    const saved = localStorage.getItem(storageKeyLines);
    if (saved) return JSON.parse(saved);
    return isDemoUser ? INITIAL_LINES : [];
  });

  const [currentYear, setCurrentYear] = useState<number>(2030);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(() => {
    return isDemoUser ? 'career-pivot' : null;
  });

  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [isConnectMode, setIsConnectMode] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [cosmicReading, setCosmicReading] = useState<CosmicReading | null>(null);
  const [isGeneratingReading, setIsGeneratingReading] = useState<boolean>(false);
  const [isReadingModalOpen, setIsReadingModalOpen] = useState<boolean>(false);
  const [isReadingFallback, setIsReadingFallback] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(storageKeyMilestones, JSON.stringify(milestones));
  }, [milestones, storageKeyMilestones]);

  useEffect(() => {
    localStorage.setItem(storageKeyLines, JSON.stringify(lines));
  }, [lines, storageKeyLines]);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentYear((prev) => {
          if (prev >= 2030) {
            setIsPlaying(false);
            return 2030;
          }
          return prev + 0.25;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.6));
  const handleResetView = () => {
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleAddMilestone = (newMilestoneData: Omit<LifeMilestone, 'id'>) => {
    const newId = `milestone-${Date.now()}`;
    const newMilestone: LifeMilestone = {
      ...newMilestoneData,
      id: newId,
    };

    setMilestones((prev) => [...prev, newMilestone]);

    if (milestones.length > 0) {
      const preceding = [...milestones].sort((a, b) => b.year - a.year)[0];
      if (preceding) {
        setLines((prev) => [
          ...prev,
          {
            id: `line-${Date.now()}`,
            fromId: preceding.id,
            toId: newId,
            style: 'dotted',
          },
        ]);
      }
    }

    setSelectedMilestoneId(newId);
  };

  const handleUpdateMilestonePosition = (id: string, x: number, y: number) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, x, y } : m))
    );
  };

  const handleUpdateMilestone = (updated: LifeMilestone) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    setLines((prev) => prev.filter((l) => l.fromId !== id && l.toId !== id));
    setSelectedMilestoneId(null);
  };

  const handleConnectStars = (fromId: string, toId: string) => {
    const existing = lines.find(
      (l) =>
        (l.fromId === fromId && l.toId === toId) ||
        (l.fromId === toId && l.toId === fromId)
    );
    if (!existing) {
      setLines((prev) => [
        ...prev,
        {
          id: `line-${Date.now()}`,
          fromId,
          toId,
          style: 'dotted',
        },
      ]);
    }
  };

  const handleRemoveLine = (lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  };

  const handleGenerateReading = async () => {
    setIsGeneratingReading(true);
    try {
      const res = await fetch('/api/cosmic-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          milestones: milestones.filter((m) => m.year <= currentYear),
          userContext: 'Life constellation reading up to current timeline year.',
        }),
      });

      const data = await res.json();
      if (data.reading) {
        setCosmicReading(data.reading);
        setIsReadingFallback(!!data.isFallback);
        setIsReadingModalOpen(true);
      }
    } catch {
      setCosmicReading({
        title: 'The Aligned Trajectory of Purpose',
        summary: 'Your constellation reflects a clear shift from structured foundations into expansive creative sovereignty.',
        theme: 'Jupiter Dasha Expansion & Karmic Shift',
        insights: [
          'The natal transit unlocked active house placement, aligning career with authentic legacy.',
          'Current transits indicate Rahu-Ketu nodal shift toward digital mastery and expansion.',
          'Upcoming timeline period marks peak culmination of your major life decisions.'
        ],
        astrologicalAnalogy: 'Like Saturn completing its Sade Sati cycle, past friction has crystallized into indestructible wisdom.',
      });
      setIsReadingFallback(true);
      setIsReadingModalOpen(true);
    } finally {
      setIsGeneratingReading(false);
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify({ milestones, lines }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `astrolive_constellation_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.milestones && data.lines) {
          setMilestones(data.milestones);
          setLines(data.lines);
          setIsMenuDrawerOpen(false);
        }
      } catch {
        alert('Invalid constellation JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefault = () => {
    setMilestones(isDemoUser ? INITIAL_MILESTONES : []);
    setLines(isDemoUser ? INITIAL_LINES : []);
    setCurrentYear(2030);
    setSelectedMilestoneId(isDemoUser ? 'career-pivot' : null);
    setIsMenuDrawerOpen(false);
  };

  const selectedMilestone = milestones.find((m) => m.id === selectedMilestoneId) || null;

  const filteredMilestones =
    selectedCategory === 'all'
      ? milestones
      : milestones.filter((m) => m.category === selectedCategory);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans select-none text-white">
      <Header
        onOpenMenu={() => setIsMenuDrawerOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onGenerateReading={handleGenerateReading}
        isGeneratingReading={isGeneratingReading}
      />

      <ConstellationCanvas
        milestones={filteredMilestones}
        lines={lines}
        currentYear={currentYear}
        selectedMilestoneId={selectedMilestoneId}
        onSelectMilestone={setSelectedMilestoneId}
        isConnectMode={isConnectMode}
        onConnectStars={handleConnectStars}
        zoomLevel={zoomLevel}
        panOffset={panOffset}
        onUpdatePan={setPanOffset}
        onUpdateMilestonePosition={handleUpdateMilestonePosition}
      />

      {/* Empty State Overlay for New User Accounts */}
      {milestones.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4 z-20">
          <div className="bg-neutral-900/90 border border-amber-500/30 backdrop-blur-xl p-8 rounded-3xl max-w-lg text-center space-y-4 pointer-events-auto shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">Dasha Constellation Engine Active</h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed">
              Your celestial timeline is clear. Upload a document (PDF, Visa, Offer Letter) or click "+ Add Milestone" to plot your life events on the constellation canvas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl font-mono transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add First Milestone</span>
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl font-mono border border-neutral-700 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Life Document PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Controls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        onToggleConnectMode={() => setIsConnectMode(!isConnectMode)}
        isConnectMode={isConnectMode}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />

      <TimelineScrubber
        currentYear={currentYear}
        minYear={2000}
        maxYear={2030}
        onYearChange={setCurrentYear}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onResetTimeline={() => setCurrentYear(2030)}
      />

      <AddMilestoneModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMilestone={handleAddMilestone}
      />

      <MilestoneDetailDrawer
        milestone={selectedMilestone}
        allMilestones={milestones}
        lines={lines}
        onClose={() => setSelectedMilestoneId(null)}
        onUpdateMilestone={handleUpdateMilestone}
        onDeleteMilestone={handleDeleteMilestone}
        onConnectStars={handleConnectStars}
        onRemoveLine={handleRemoveLine}
      />

      <CosmicReadingModal
        reading={cosmicReading}
        isOpen={isReadingModalOpen}
        onClose={() => setIsReadingModalOpen(false)}
        isFallback={isReadingFallback}
      />

      <MenuDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onResetDefault={handleResetDefault}
        onClearAll={() => {
          setMilestones([]);
          setLines([]);
          setIsMenuDrawerOpen(false);
        }}
      />
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { LifeMilestone, ConstellationLine, CosmicReading } from './types';
import { INITIAL_MILESTONES, INITIAL_LINES } from './data/initialConstellation';
import { Header } from './components/Header';
import { ConstellationCanvas } from './components/ConstellationCanvas';
import { Controls } from './components/Controls';
import { TimelineScrubber } from './components/TimelineScrubber';
import { AddMilestoneModal } from './components/AddMilestoneModal';
import { MilestoneDetailDrawer } from './components/MilestoneDetailDrawer';
import { CosmicReadingModal } from './components/CosmicReadingModal';
import { MenuDrawer } from './components/MenuDrawer';

export default function App() {
  // Persistence via localStorage
  const [milestones, setMilestones] = useState<LifeMilestone[]>(() => {
    const saved = localStorage.getItem('astrolive_milestones');
    return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
  });

  const [lines, setLines] = useState<ConstellationLine[]>(() => {
    const saved = localStorage.getItem('astrolive_lines');
    return saved ? JSON.parse(saved) : INITIAL_LINES;
  });

  // Timeline & Playback
  const [currentYear, setCurrentYear] = useState<number>(2030);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Selected Milestone (Default to 'career-pivot' as in the screenshot!)
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>('career-pivot');

  // Canvas View State
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Modes & Modals
  const [isConnectMode, setIsConnectMode] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Cosmic Reading State
  const [cosmicReading, setCosmicReading] = useState<CosmicReading | null>(null);
  const [isGeneratingReading, setIsGeneratingReading] = useState<boolean>(false);
  const [isReadingModalOpen, setIsReadingModalOpen] = useState<boolean>(false);
  const [isReadingFallback, setIsReadingFallback] = useState<boolean>(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('astrolive_milestones', JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem('astrolive_lines', JSON.stringify(lines));
  }, [lines]);

  // Timeline Auto Playback Loop
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

  // Handle Zoom
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.6));
  const handleResetView = () => {
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Add Milestone
  const handleAddMilestone = (newMilestoneData: Omit<LifeMilestone, 'id'>) => {
    const newId = `milestone-${Date.now()}`;
    const newMilestone: LifeMilestone = {
      ...newMilestoneData,
      id: newId,
    };

    setMilestones((prev) => [...prev, newMilestone]);

    // Automatically connect line to the most recent preceding milestone if available
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

  // Update Milestone Position
  const handleUpdateMilestonePosition = (id: string, x: number, y: number) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, x, y } : m))
    );
  };

  // Update Milestone Details
  const handleUpdateMilestone = (updated: LifeMilestone) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === updated.id) ? updated : m)
    );
  };

  // Delete Milestone
  const handleDeleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    setLines((prev) => prev.filter((l) => l.fromId !== id && l.toId !== id));
    setSelectedMilestoneId(null);
  };

  // Connect Two Stars
  const handleConnectStars = (fromId: string, toId: string) => {
    // Avoid duplicate lines
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

  // Remove Line
  const handleRemoveLine = (lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  };

  // Generate Cosmic Reading via Express Backend Endpoint
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
    } catch (err) {
      console.error('Failed to generate reading:', err);
    } finally {
      setIsGeneratingReading(false);
    }
  };

  // Data Export & Import
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
      } catch (err) {
        alert('Invalid constellation JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefault = () => {
    setMilestones(INITIAL_MILESTONES);
    setLines(INITIAL_LINES);
    setCurrentYear(2030);
    setSelectedMilestoneId('career-pivot');
    setIsMenuDrawerOpen(false);
  };

  const selectedMilestone = milestones.find((m) => m.id === selectedMilestoneId) || null;

  // Filtered milestones based on category
  const filteredMilestones =
    selectedCategory === 'all'
      ? milestones
      : milestones.filter((m) => m.category === selectedCategory);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-sans select-none text-white">
      {/* Top Header Navbar */}
      <Header
        onOpenMenu={() => setIsMenuDrawerOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onGenerateReading={handleGenerateReading}
        isGeneratingReading={isGeneratingReading}
      />

      {/* Main Interactive Constellation Canvas */}
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

      {/* Floating Canvas View Controls */}
      <Controls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        onToggleConnectMode={() => setIsConnectMode(!isConnectMode)}
        isConnectMode={isConnectMode}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Bottom Timeline Year Scrubber */}
      <TimelineScrubber
        currentYear={currentYear}
        minYear={2000}
        maxYear={2030}
        onYearChange={setCurrentYear}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onResetTimeline={() => setCurrentYear(2030)}
      />

      {/* Add New Milestone Modal */}
      <AddMilestoneModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMilestone={handleAddMilestone}
      />

      {/* Selected Milestone Detail Drawer */}
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

      {/* Cosmic AI Reading Modal */}
      <CosmicReadingModal
        reading={cosmicReading}
        isOpen={isReadingModalOpen}
        onClose={() => setIsReadingModalOpen(false)}
        isFallback={isReadingFallback}
      />

      {/* Menu & Data Settings Drawer */}
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

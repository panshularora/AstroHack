import React, { useRef, useEffect, useState, useCallback } from 'react';
import { LifeMilestone, ConstellationLine } from '../types';
import { IconRenderer } from './IconRenderer';
import { BACKGROUND_STARS } from '../data/initialConstellation';

interface ConstellationCanvasProps {
  milestones: LifeMilestone[];
  lines: ConstellationLine[];
  currentYear: number;
  selectedMilestoneId: string | null;
  onSelectMilestone: (id: string | null) => void;
  isConnectMode: boolean;
  onConnectStars: (fromId: string, toId: string) => void;
  zoomLevel: number;
  panOffset: { x: number; y: number };
  onUpdatePan: (offset: { x: number; y: number }) => void;
  onUpdateMilestonePosition: (id: string, x: number, y: number) => void;
}

export const ConstellationCanvas: React.FC<ConstellationCanvasProps> = ({
  milestones,
  lines,
  currentYear,
  selectedMilestoneId,
  onSelectMilestone,
  isConnectMode,
  onConnectStars,
  zoomLevel,
  panOffset,
  onUpdatePan,
  onUpdateMilestonePosition,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const [connectSourceId, setConnectSourceId] = useState<string | null>(null);
  const [draggingMilestoneId, setDraggingMilestoneId] = useState<string | null>(null);

  // Background star field canvas renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate random background stars
    const numStars = 180;
    const starParticles = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space radial background glow
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      gradient.addColorStop(0, '#0f121d');
      gradient.addColorStop(0.5, '#090a10');
      gradient.addColorStop(1, '#040406');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Twinkling stars
      starParticles.forEach((p) => {
        p.alpha += p.speed;
        if (p.alpha > 1 || p.alpha < 0.2) p.speed = -p.speed;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(p.alpha) * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle Pan Events
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.milestone-node')) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        onUpdatePan({
          x: e.clientX - startPan.x,
          y: e.clientY - startPan.y,
        });
      } else if (draggingMilestoneId && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate relative % based on zoom and pan
        const relX = ((e.clientX - rect.left - panOffset.x) / (rect.width * zoomLevel)) * 100;
        const relY = ((e.clientY - rect.top - panOffset.y) / (rect.height * zoomLevel)) * 100;
        onUpdateMilestonePosition(
          draggingMilestoneId,
          Math.max(2, Math.min(98, relX)),
          Math.max(2, Math.min(98, relY))
        );
      }
    },
    [isPanning, startPan, panOffset, zoomLevel, draggingMilestoneId, onUpdatePan, onUpdateMilestonePosition]
  );

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingMilestoneId(null);
  };

  // Node Click Behavior (Selection or Line Connecting)
  const handleNodeClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (isConnectMode) {
      if (!connectSourceId) {
        setConnectSourceId(id);
      } else {
        if (connectSourceId !== id) {
          onConnectStars(connectSourceId, id);
        }
        setConnectSourceId(null);
      }
    } else {
      onSelectMilestone(selectedMilestoneId === id ? null : id);
    }
  };

  // Find node by ID (including background helper stars)
  const getNodePos = (id: string) => {
    const m = milestones.find((m) => m.id === id);
    if (m) return { x: m.x, y: m.y, isVisible: m.year <= currentYear };
    const bg = BACKGROUND_STARS.find((b) => b.id === id);
    if (bg) return { x: bg.x, y: bg.y, isVisible: true };
    return null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={() => {
        if (!isPanning) {
          onSelectMilestone(null);
          setConnectSourceId(null);
        }
      }}
    >
      {/* Background Starry Sky Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Main Celestial Map Container with Pan & Zoom */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out origin-center"
        style={{
          transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomLevel})`,
        }}
      >
        {/* Constellation SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          <defs>
            <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {lines.map((line) => {
            const p1 = getNodePos(line.fromId);
            const p2 = getNodePos(line.toId);

            if (!p1 || !p2) return null;
            const isVisible = p1.isVisible && p2.isVisible;

            return (
              <g key={line.id} className="transition-opacity duration-500">
                <line
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.2"
                  strokeDasharray={line.style === 'solid' ? 'none' : '4 4'}
                  className={isVisible ? 'opacity-80' : 'opacity-15'}
                />
                {/* Glowing Overlay on active lines */}
                {isVisible && (
                  <line
                    x1={`${p1.x}%`}
                    y1={`${p1.y}%`}
                    x2={`${p2.x}%`}
                    y2={`${p2.y}%`}
                    stroke="url(#lineGlow)"
                    strokeWidth="0.8"
                    strokeDasharray="3 3"
                    className="opacity-40 animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Background Helper Stars (small twinkling constellation joints) */}
        {BACKGROUND_STARS.map((bg) => (
          <div
            key={bg.id}
            className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-white/40 pointer-events-none z-10"
            style={{ left: `${bg.x}%`, top: `${bg.y}%` }}
          />
        ))}

        {/* Interactive Milestone Star Nodes */}
        {milestones.map((m) => {
          const isVisible = m.year <= currentYear;
          const isSelected = selectedMilestoneId === m.id;
          const isConnectSource = connectSourceId === m.id;

          return (
            <div
              key={m.id}
              className={`milestone-node absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-25 scale-90 grayscale'
              }`}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              onClick={(e) => handleNodeClick(e, m.id)}
            >
              {/* Star Light Aura Glow */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  isSelected
                    ? 'w-16 h-16 -left-4 -top-4 bg-amber-200/30 blur-md animate-pulse'
                    : 'w-10 h-10 -left-1 -top-1 bg-white/10 blur-sm group-hover:bg-amber-100/20'
                }`}
              />

              {/* Star Core Icon Node */}
              <div
                className={`relative flex items-center justify-center rounded-full transition-transform duration-200 ${
                  isSelected
                    ? 'w-9 h-9 bg-zinc-950 border-2 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.9)] scale-110'
                    : isConnectSource
                    ? 'w-8 h-8 bg-amber-950 border-2 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.8)]'
                    : 'w-7 h-7 bg-zinc-950/80 border border-white/40 text-zinc-200 group-hover:border-white group-hover:scale-105'
                }`}
              >
                {/* Star shape symbol or category icon */}
                <span className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
                  ✦
                </span>
              </div>

              {/* Label & Icon Below Node (Exact design matching image) */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none whitespace-nowrap">
                <div className="text-zinc-300 opacity-80 group-hover:opacity-100 transition-opacity mb-0.5">
                  <IconRenderer name={m.icon} className="w-4 h-4" />
                </div>
                <span className="text-xs font-serif tracking-wider text-zinc-300/90 group-hover:text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] font-light">
                  {m.title}
                </span>
              </div>

              {/* Active / Hover Tooltip Card (EXACT MATCH TO SCREENSHOT) */}
              {isSelected && (
                <div
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 w-72 bg-zinc-950/90 border border-white/25 rounded-2xl p-4 shadow-[0_0_30px_rgba(255,255,255,0.15)] backdrop-blur-xl z-50 text-left pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Pointer arrow pointing down to node */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-950 border-r border-b border-white/25 rotate-45" />

                  {/* Timestamp Header */}
                  <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5 flex items-center justify-between">
                    <span>{m.timestampDisplay || `${m.date.toUpperCase()} - 12:00:00`}</span>
                  </div>

                  {/* Memory / Description Text */}
                  <p className="text-sm font-sans font-light text-zinc-100 leading-relaxed mb-3">
                    {m.description}
                  </p>

                  {/* Metadata tags */}
                  {m.location && (
                    <div className="text-[11px] font-mono text-amber-200/80 flex items-center gap-1">
                      <span>📍</span> {m.location}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

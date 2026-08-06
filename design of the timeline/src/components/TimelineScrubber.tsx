import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimelineScrubberProps {
  currentYear: number;
  minYear: number;
  maxYear: number;
  onYearChange: (year: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onResetTimeline: () => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  currentYear,
  minYear,
  maxYear,
  onYearChange,
  isPlaying,
  onTogglePlay,
  onResetTimeline,
}) => {
  const yearTicks = [2000, 2010, 2020, 2030];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-30 flex items-center gap-4 bg-zinc-950/70 border border-white/10 rounded-full px-6 py-3 backdrop-blur-md shadow-2xl">
      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer shrink-0"
        title={isPlaying ? 'Pause Timeline' : 'Play Timeline Evolution'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>

      {/* Timeline Range & Ticks */}
      <div className="relative flex-1 py-2">
        {/* Track Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/20 -translate-y-1/2" />
        
        {/* Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-amber-200 to-white -translate-y-1/2 transition-all duration-150"
          style={{
            width: `${((currentYear - minYear) / (maxYear - minYear)) * 100}%`,
          }}
        />

        {/* Range Input */}
        <input
          type="range"
          min={minYear}
          max={maxYear}
          step={0.5}
          value={currentYear}
          onChange={(e) => onYearChange(parseFloat(e.target.value))}
          className="relative z-10 w-full h-4 opacity-0 cursor-pointer"
        />

        {/* Thumb Overlay */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-all duration-150 flex flex-col items-center"
          style={{
            left: `${((currentYear - minYear) / (maxYear - minYear)) * 100}%`,
          }}
        >
          <div className="w-4 h-4 rounded-full bg-white border-2 border-zinc-900 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
          <span className="text-[10px] font-mono text-amber-200 mt-1 font-semibold tracking-wider">
            {Math.floor(currentYear)}
          </span>
        </div>

        {/* Year Ticks Labels */}
        <div className="flex justify-between w-full mt-3 text-xs font-mono text-zinc-400">
          {yearTicks.map((year) => (
            <div key={year} className="flex flex-col items-center">
              <div className="w-[1px] h-2 bg-white/20 mb-1" />
              <button
                onClick={() => onYearChange(year)}
                className={`hover:text-white transition-colors cursor-pointer ${
                  Math.floor(currentYear) === year ? 'text-amber-200 font-bold' : ''
                }`}
              >
                {year}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Timeline Button */}
      <button
        onClick={onResetTimeline}
        className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
        title="Show All Years"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};

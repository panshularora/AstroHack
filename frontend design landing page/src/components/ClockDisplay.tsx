import React from 'react';
import { formatTime } from '../utils/time';
import { TimeFormat } from '../types';

interface ClockDisplayProps {
  displayDate: Date;
  timeFormat: TimeFormat;
  showSeconds: boolean;
  onToggleFormat: () => void;
  isScrubbing?: boolean;
}

export const ClockDisplay: React.FC<ClockDisplayProps> = ({
  displayDate,
  timeFormat,
  showSeconds,
  onToggleFormat,
  isScrubbing = false,
}) => {
  const formattedTime = formatTime(displayDate, timeFormat, showSeconds);

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-2">
      <button
        onClick={onToggleFormat}
        className={`group transition-transform duration-300 active:scale-98 cursor-pointer focus:outline-none`}
        title="Click to toggle 12h / 24h or show seconds"
      >
        <span
          className={`font-serif-clock text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-neutral-100 transition-colors duration-300 ${
            isScrubbing ? 'text-amber-200/90' : 'hover:text-white'
          }`}
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {formattedTime}
        </span>
      </button>

      {/* Subtle indicator if scrubbing */}
      {isScrubbing && (
        <span className="mt-2 text-xs font-sans-clean uppercase tracking-widest text-amber-300/80 bg-amber-950/40 px-3 py-0.5 rounded-full border border-amber-800/40 animate-pulse">
          Temporal Offset Active
        </span>
      )}
    </div>
  );
};

import React from 'react';

interface ClockDisplayProps {
  displayDate?: Date;
  timeFormat?: string;
  showSeconds?: boolean;
  onToggleFormat?: () => void;
  isScrubbing?: boolean;
}

export const ClockDisplay: React.FC<ClockDisplayProps> = ({
  isScrubbing = false,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none py-4 text-center">
      {/* Central Large Hero Title: Astro Live */}
      <span className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white font-normal">
        Astro Live
      </span>

      {isScrubbing && (
        <span className="mt-3 text-[11px] font-mono tracking-widest text-amber-300/80 bg-amber-950/40 px-3.5 py-0.5 rounded-full border border-amber-800/40 animate-pulse">
          Temporal Offset Active
        </span>
      )}
    </div>
  );
};

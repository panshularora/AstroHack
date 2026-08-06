import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TimeSliderProps {
  progress: number; // 0 to 100
  onChange: (newProgress: number) => void;
  isLive: boolean;
  onResetToLive: () => void;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({
  progress,
  onChange,
  isLive,
  onResetToLive,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateProgressFromEvent = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const percentage = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
      onChange(percentage);
    },
    [onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    calculateProgressFromEvent(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      calculateProgressFromEvent(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        calculateProgressFromEvent(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        calculateProgressFromEvent(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, calculateProgressFromEvent]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-8 group px-6">
      {/* Container matching screenshot track width */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="w-full max-w-2xl h-8 flex items-center relative cursor-pointer select-none"
      >
        {/* Background track line */}
        <div className="w-full h-[1px] bg-neutral-800/80 relative overflow-visible">
          {/* Active progress glowing line */}
          <div
            className="absolute top-0 left-0 h-[1.5px] bg-gradient-to-r from-neutral-600 via-neutral-300 to-white time-glow transition-all ease-out duration-75"
            style={{ width: `${progress}%` }}
          />

          {/* Thumb handle */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white thumb-glow transition-all duration-150 ${
              isDragging ? 'w-3.5 h-3.5 scale-125' : 'w-2.5 h-2.5 group-hover:scale-125'
            }`}
            style={{ left: `${progress}%` }}
          >
            {/* Soft outer aura ring */}
            <div className="absolute -inset-1 rounded-full bg-white/30 blur-[2px]" />
          </div>
        </div>
      </div>

      {/* Subtle Return to Live indicator if user navigated away from live time */}
      {!isLive && (
        <button
          onClick={onResetToLive}
          className="mt-1 text-xs font-sans-clean text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 cursor-pointer bg-neutral-900/60 px-2.5 py-1 rounded-full border border-neutral-800"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>Reset to Live Time</span>
        </button>
      )}
    </div>
  );
};

import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TimeSliderProps {
  progress: number;
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
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="w-full max-w-2xl h-8 flex items-center relative cursor-pointer select-none"
      >
        {/* Background Rail Line */}
        <div className="w-full h-[1.5px] bg-neutral-800/80 relative overflow-visible">
          {/* Pure Plain Gold Progress Line */}
          <div
            className={`absolute top-0 left-0 h-[2px] -top-[0.25px] bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] ${
              isDragging ? 'transition-none' : 'transition-all duration-700 ease-in-out'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!isLive && (
        <button
          onClick={onResetToLive}
          className="mt-2 text-xs font-mono text-amber-400 hover:text-amber-300 transition-all duration-300 flex items-center gap-1.5 cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-1.5 rounded-full border border-amber-500/30 animate-pulse shadow-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>Reset to Live Time</span>
        </button>
      )}
    </div>
  );
};

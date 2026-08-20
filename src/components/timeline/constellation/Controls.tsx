import React from 'react';
import { Plus, Minus, Maximize2, Compass, Link as LinkIcon, RotateCcw } from 'lucide-react';

interface ControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onToggleConnectMode: () => void;
  isConnectMode: boolean;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleConnectMode,
  isConnectMode,
  onToggleFullscreen,
  isFullscreen,
}) => {
  return (
    <>
      <div className="absolute top-20 right-6 z-30 flex flex-col bg-[#090A0F]/85 border border-white/10 rounded-none p-1 backdrop-blur-md shadow-2xl text-zinc-300 font-sans">
        <button
          onClick={onZoomIn}
          className="p-2.5 hover:bg-white/10 hover:text-white rounded-none transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2.5 hover:bg-white/10 hover:text-white rounded-none transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="my-1 border-t border-white/10" />
        <button
          onClick={onToggleConnectMode}
          className={`p-2.5 rounded-none transition-colors cursor-pointer ${
            isConnectMode
              ? 'bg-zinc-100/10 text-zinc-200 border border-zinc-700 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
              : 'hover:bg-white/10 hover:text-white'
          }`}
          title={isConnectMode ? 'Connecting Stars (Click 2 stars to draw line)' : 'Toggle Connect Stars Mode'}
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          onClick={onResetView}
          className="p-2.5 hover:bg-white/10 hover:text-white rounded-none transition-colors cursor-pointer"
          title="Reset Canvas View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleFullscreen}
          className="p-2.5 hover:bg-white/10 hover:text-white rounded-none transition-colors cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-6 right-6 z-30">
        <button
          onClick={onResetView}
          className="p-3 rounded-full bg-[#090A0F]/85 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 backdrop-blur-md transition-all shadow-xl hover:rotate-45 active:scale-95 cursor-pointer"
          title="Reset Orientation"
        >
          <Compass className="w-5 h-5 text-zinc-300" />
        </button>
      </div>
    </>
  );
};

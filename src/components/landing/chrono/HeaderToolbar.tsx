import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderToolbarProps {
  zenMode?: boolean;
  onToggleZenMode?: () => void;
  ambientSound?: string;
  onOpenSoundModal?: () => void;
  onOpenReflectionModal?: () => void;
  onOpenThemeModal?: () => void;
  activeTheme?: string;
  formattedDate: string;
}

export const HeaderToolbar: React.FC<HeaderToolbarProps> = ({
  formattedDate,
}) => {
  const navigate = useNavigate();

  return (
    <header className="w-full max-w-5xl mx-auto px-6 py-5 flex items-center justify-between text-neutral-400 select-none font-sans">
      {/* Left: Star Icon + Date */}
      <div className="flex items-center gap-3">
        <span
          className="text-amber-400 font-bold text-lg leading-none cursor-pointer hover:scale-110 transition-transform"
          onClick={() => navigate('/login')}
          title="AstroLive Login"
        >
          ✦
        </span>
        <span className="text-neutral-700">|</span>
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
          <Clock className="w-3.5 h-3.5 text-neutral-500" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Right: Enter AstroLive CTA -> Navigates to /login */}
      <div className="flex items-center">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs px-4.5 py-2 rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer"
        >
          <span>Enter AstroLive</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};

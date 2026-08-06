import React from 'react';
import { Volume2, VolumeX, X, Disc, CloudRain, Radio, Waves } from 'lucide-react';
import type { AmbientSoundType } from '../types';

interface SoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSound: AmbientSoundType;
  onSelectSound: (sound: AmbientSoundType) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
}

export const SoundModal: React.FC<SoundModalProps> = ({
  isOpen,
  onClose,
  activeSound,
  onSelectSound,
  volume,
  onVolumeChange,
}) => {
  if (!isOpen) return null;

  const sounds: { id: AmbientSoundType; name: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'none',
      name: 'Mute',
      desc: 'Silent focus',
      icon: <VolumeX className="w-5 h-5 text-neutral-400" />,
    },
    {
      id: 'tick',
      name: 'Soft Tick',
      desc: 'Gentle mechanical clock cadence',
      icon: <Disc className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'rain',
      name: 'Gentle Rain',
      desc: 'Calming synthesized rainfall',
      icon: <CloudRain className="w-5 h-5 text-blue-400" />,
    },
    {
      id: 'space',
      name: 'Cosmic Drone',
      desc: 'Deep ambient low-frequency harmonics',
      icon: <Radio className="w-5 h-5 text-indigo-400" />,
    },
    {
      id: 'brown',
      name: 'Warm Brown Noise',
      desc: 'Deep soothing background masking',
      icon: <Waves className="w-5 h-5 text-amber-500" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-md bg-[#181818] border border-neutral-800 rounded-3xl p-6 shadow-2xl flex flex-col space-y-5 text-neutral-200">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-display text-lg text-white font-medium">Ambient Soundscape</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Volume slider */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-sans-clean">
            <span>Volume</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>

        {/* Sound Selection Grid */}
        <div className="space-y-2.5">
          {sounds.map((sound) => {
            const isSelected = activeSound === sound.id;
            return (
              <button
                key={sound.id}
                onClick={() => onSelectSound(sound.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-800/80 border-neutral-600 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]'
                    : 'bg-neutral-900/60 border-neutral-800/80 text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                    {sound.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-sans-clean font-medium text-white">{sound.name}</span>
                    <span className="text-xs font-sans-clean text-neutral-500">{sound.desc}</span>
                  </div>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-white text-neutral-900 hover:bg-neutral-200 rounded-xl font-sans-clean font-medium text-sm transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};

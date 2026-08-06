import React from 'react';
import { Volume2, VolumeX, X, Disc, CloudRain, Radio, Waves } from 'lucide-react';
import type { AmbientSoundType } from '../../../types/chrono';

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
      icon: <CloudRain className="w-5 h-5 text-cyan-400" />,
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
    <div className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none font-sans">
      <div className="w-full max-w-md bg-[#090A0F] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col space-y-5 text-neutral-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-lg text-white font-bold">Ambient Soundscape</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-xs text-neutral-400">
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
            className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          {sounds.map((sound) => {
            const isSelected = activeSound === sound.id;
            return (
              <button
                key={sound.id}
                onClick={() => onSelectSound(sound.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-black border border-white/10">
                    {sound.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{sound.name}</span>
                    <span className="text-[10px] text-neutral-500">{sound.desc}</span>
                  </div>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-amber-500 text-black font-bold hover:bg-amber-400 rounded-xl font-mono text-xs transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};

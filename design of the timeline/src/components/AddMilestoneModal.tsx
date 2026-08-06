import React, { useState } from 'react';
import { X, Sparkles, Calendar, MapPin, Tag } from 'lucide-react';
import { LifeMilestone, MilestoneCategory } from '../types';

interface AddMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMilestone: (milestone: Omit<LifeMilestone, 'id'>) => void;
}

const CATEGORY_OPTIONS: { label: string; value: MilestoneCategory; icon: string }[] = [
  { label: 'Birth', value: 'birth', icon: 'Baby' },
  { label: 'Education', value: 'education', icon: 'GraduationCap' },
  { label: 'Career', value: 'career', icon: 'Briefcase' },
  { label: 'Travel', value: 'travel', icon: 'Plane' },
  { label: 'Relationship', value: 'relationship', icon: 'Heart' },
  { label: 'Achievement', value: 'achievement', icon: 'Rocket' },
  { label: 'Decision', value: 'decision', icon: 'Sparkles' },
  { label: 'Personal', value: 'personal', icon: 'Star' },
];

export const AddMilestoneModal: React.FC<AddMilestoneModalProps> = ({
  isOpen,
  onClose,
  onAddMilestone,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2023-01-12');
  const [time, setTime] = useState('14:30:00');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MilestoneCategory>('decision');
  const [icon, setIcon] = useState('Sparkles');
  const [location, setLocation] = useState('');
  const [impact, setImpact] = useState<'minor' | 'moderate' | 'major' | 'transformative'>('major');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dateObj = new Date(date);
    const year = dateObj.getFullYear() || 2023;

    // Formatted timestamp string like "JAN 12, 2023 - 14:30:00"
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthStr = monthNames[dateObj.getMonth()] || 'JAN';
    const dayStr = String(dateObj.getDate()).padStart(2, '0');
    const timestampDisplay = `${monthStr} ${dayStr}, ${year} - ${time}`;

    // Random placement within central sky quadrant (20% to 80%)
    const x = Math.floor(Math.random() * 60) + 20;
    const y = Math.floor(Math.random() * 60) + 20;

    onAddMilestone({
      title: title.trim(),
      date,
      timestampDisplay,
      description: description.trim() || 'A luminous moment in life history.',
      category,
      icon,
      x,
      y,
      year,
      impact,
      location: location.trim() || undefined,
    });

    setTitle('');
    setDescription('');
    setLocation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-white/20 rounded-2xl p-6 shadow-2xl text-zinc-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h2 className="text-xl font-serif tracking-wide text-white">Add Life Milestone Star</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
              Milestone Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Launched Startup, World Trip, Moving Abroad"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400/80"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                Time (HH:MM:SS)
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400/80"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    setCategory(cat.value);
                    setIcon(cat.icon);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    category === cat.value
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span className="text-base mb-1">✦</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
              Memory / Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe what occurred and how it impacted your journey..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Location (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Kyoto, Japan or San Francisco"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/80"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] cursor-pointer"
            >
              Illuminate Star
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

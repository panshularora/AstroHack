import React, { useState } from 'react';
import { getDayProgress, getMonthProgress, getYearProgress, getRemainingDayTime } from '../utils/time';
import { Sparkles, Target, Plus } from 'lucide-react';
import type { ReflectionEntry } from '../types';

interface PresentViewProps {
  currentDate: Date;
  reflections: ReflectionEntry[];
  onAddIntention: (content: string) => void;
}

const QUOTES = [
  { text: "In quiet motion, time unfolds present clarity.", author: "Marcus Aurelius" },
  { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
  { text: "Time is a created thing. To say 'I don't have time' is like saying 'I don't want to'.", author: "Lao Tzu" },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
];

export const PresentView: React.FC<PresentViewProps> = ({
  currentDate,
  reflections,
  onAddIntention,
}) => {
  const [newIntention, setNewIntention] = useState('');
  const dayProg = getDayProgress(currentDate);
  const monthProg = getMonthProgress(currentDate);
  const yearProg = getYearProgress(currentDate);
  const remaining = getRemainingDayTime(currentDate);

  // Select quote deterministically based on day of year
  const quoteIndex = (currentDate.getDate() + currentDate.getMonth()) % QUOTES.length;
  const quote = QUOTES[quoteIndex];

  // Present intentions
  const presentIntentions = reflections.filter((r) => r.tab === 'present');

  const handleSubmitIntention = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIntention.trim()) {
      onAddIntention(newIntention.trim());
      setNewIntention('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-4 flex flex-col space-y-8 animate-fadeIn text-neutral-300">
      {/* Temporal Meter Progress */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 select-none">
        <div className="p-3.5 rounded-2xl bg-neutral-900/50 border border-neutral-800/60 flex flex-col items-center text-center">
          <span className="text-[11px] font-sans-clean uppercase tracking-wider text-neutral-500 font-medium">
            Day Elapsed
          </span>
          <span className="text-xl sm:text-2xl font-serif-display text-white font-semibold mt-1">
            {dayProg.toFixed(1)}%
          </span>
          <div className="w-full h-1 bg-neutral-800 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full bg-white/80 rounded-full transition-all duration-500"
              style={{ width: `${dayProg}%` }}
            />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-900/50 border border-neutral-800/60 flex flex-col items-center text-center">
          <span className="text-[11px] font-sans-clean uppercase tracking-wider text-neutral-500 font-medium">
            Month Progress
          </span>
          <span className="text-xl sm:text-2xl font-serif-display text-white font-semibold mt-1">
            {monthProg.toFixed(1)}%
          </span>
          <div className="w-full h-1 bg-neutral-800 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full bg-neutral-300/80 rounded-full transition-all duration-500"
              style={{ width: `${monthProg}%` }}
            />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-900/50 border border-neutral-800/60 flex flex-col items-center text-center">
          <span className="text-[11px] font-sans-clean uppercase tracking-wider text-neutral-500 font-medium">
            Year Progress
          </span>
          <span className="text-xl sm:text-2xl font-serif-display text-white font-semibold mt-1">
            {yearProg.toFixed(1)}%
          </span>
          <div className="w-full h-1 bg-neutral-800 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full bg-neutral-400/80 rounded-full transition-all duration-500"
              style={{ width: `${yearProg}%` }}
            />
          </div>
        </div>
      </div>

      {/* Daily Intention / Focus card */}
      <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-sans-clean font-medium text-sm">
            <Target className="w-4 h-4 text-amber-400" />
            <span>Today's Anchor & Intentions</span>
          </div>
          <span className="text-xs text-neutral-500">
            {remaining.hours}h {remaining.minutes}m remaining today
          </span>
        </div>

        {/* Form to add present intention */}
        <form onSubmit={handleSubmitIntention} className="flex items-center gap-2">
          <input
            type="text"
            value={newIntention}
            onChange={(e) => setNewIntention(e.target.value)}
            placeholder="Set an anchor or focus for right now..."
            className="flex-1 bg-neutral-950/70 border border-neutral-800/80 rounded-xl px-3.5 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-all font-sans-clean"
          />
          <button
            type="submit"
            disabled={!newIntention.trim()}
            className="p-2 bg-neutral-100 hover:bg-white text-neutral-900 rounded-xl disabled:opacity-30 disabled:hover:bg-neutral-100 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>

        {/* Active intentions list */}
        {presentIntentions.length > 0 && (
          <div className="space-y-2 pt-1">
            {presentIntentions.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/40 border border-neutral-800/40 text-xs text-neutral-200"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{entry.content}</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-sans-clean">{entry.timeLabel}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quote Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-neutral-900/30 to-neutral-900/10 border border-neutral-800/40 flex flex-col items-center text-center space-y-2">
        <Sparkles className="w-4 h-4 text-neutral-500 mb-1" />
        <p className="font-serif-display text-lg sm:text-xl text-neutral-200 italic font-normal leading-relaxed">
          "{quote.text}"
        </p>
        <span className="text-xs font-sans-clean text-neutral-500 tracking-wider uppercase font-medium mt-1">
          — {quote.author}
        </span>
      </div>
    </div>
  );
};

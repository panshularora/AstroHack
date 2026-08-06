import React, { useState } from 'react';
import { History, BookOpen, Plus, Sparkles } from 'lucide-react';
import type { ReflectionEntry } from '../types';

interface PastViewProps {
  currentDate: Date;
  reflections: ReflectionEntry[];
  onAddReflection: (entry: Omit<ReflectionEntry, 'id' | 'createdAt'>) => void;
}

export const PastView: React.FC<PastViewProps> = ({
  currentDate,
  reflections,
  onAddReflection,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'reflection' | 'memory' | 'milestone'>('reflection');

  // Filter past entries
  const pastEntries = reflections.filter(
    (r) => r.tab === 'past' || r.category === 'memory' || r.category === 'reflection'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      const timeLabel = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      onAddReflection({
        title: title.trim() || 'Past Memory',
        content: content.trim(),
        category,
        tab: 'past',
        timeLabel,
        timestamp: currentDate.getTime(),
      });
      setTitle('');
      setContent('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-4 flex flex-col space-y-6 animate-fadeIn text-neutral-300 select-none">
      {/* Past Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-sans-clean font-medium text-sm">
          <History className="w-4 h-4 text-neutral-400" />
          <span>Timeline Reflections & Past Logs</span>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 text-xs font-sans-clean text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-3 py-1.5 rounded-full border border-neutral-800 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Past Memory</span>
        </button>
      </div>

      {/* Form to log a past reflection */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col space-y-3 animate-fadeIn"
        >
          <div className="text-xs font-sans-clean text-neutral-400 font-medium">
            Log a memory or milestone for {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title / Moment name (optional)"
            className="bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500 font-sans-clean"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What happened or what did you learn at this time?"
            rows={3}
            className="bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500 font-sans-clean resize-none"
          />
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500">Category:</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'reflection' | 'memory' | 'milestone')}
                className="bg-neutral-950 text-xs text-neutral-300 border border-neutral-800 rounded-lg px-2.5 py-1 focus:outline-none"
              >
                <option value="reflection">Reflection</option>
                <option value="memory">Memory</option>
                <option value="milestone">Milestone</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-neutral-400 hover:text-white px-3 py-1 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content.trim()}
                className="text-xs bg-white text-neutral-900 hover:bg-neutral-200 font-medium px-4 py-1.5 rounded-xl cursor-pointer disabled:opacity-40"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Past Timeline Log entries */}
      {pastEntries.length > 0 ? (
        <div className="space-y-3">
          {pastEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex flex-col space-y-2 hover:border-neutral-700/60 transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-sans-clean font-medium text-neutral-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  {entry.title || 'Past Reflection'}
                </span>
                <span className="text-neutral-500 font-sans-clean">{entry.timeLabel}</span>
              </div>
              <p className="text-sm font-sans-clean text-neutral-300 leading-relaxed pl-3 border-l border-neutral-800">
                {entry.content}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 bg-neutral-950/60 px-2 py-0.5 rounded-md border border-neutral-800/40">
                  {entry.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800/40 flex flex-col items-center text-center space-y-3">
          <BookOpen className="w-6 h-6 text-neutral-600" />
          <div className="flex flex-col space-y-1">
            <span className="font-serif-display text-base text-neutral-300">No past logs for this timestamp</span>
            <span className="text-xs font-sans-clean text-neutral-500 max-w-sm">
              Use the timeline slider to navigate backward through today or add a past reflection above.
            </span>
          </div>
        </div>
      )}

      {/* Historic Temporal Fact */}
      <div className="p-4 rounded-2xl bg-neutral-900/20 border border-neutral-800/30 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
        <div className="text-xs text-neutral-400 font-sans-clean leading-relaxed">
          <span className="text-neutral-200 font-medium">Temporal Wisdom: </span>
          Looking back allows us to measure growth. Every minute spent reflecting turns experience into wisdom.
        </div>
      </div>
    </div>
  );
};

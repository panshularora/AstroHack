import React, { useState } from 'react';
import { Edit3, X } from 'lucide-react';
import type { NavTab, ReflectionEntry } from '../../../types/chrono';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavTab;
  timeLabel: string;
  onSave: (entry: Omit<ReflectionEntry, 'id' | 'createdAt'>) => void;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  timeLabel,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'reflection' | 'intention' | 'memory' | 'milestone'>('reflection');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSave({
        title: title.trim() || 'Reflection',
        content: content.trim(),
        category,
        tab: activeTab,
        timeLabel,
        timestamp: Date.now(),
      });
      setTitle('');
      setContent('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none font-sans">
      <div className="w-full max-w-md bg-[#090A0F] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col space-y-4 text-neutral-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-lg text-white font-bold">
              Log Celestial Note ({timeLabel})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 font-mono text-xs">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-400"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your cosmic reflection or note here..."
            rows={4}
            required
            className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-400 resize-none"
          />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500">Type:</span>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as 'reflection' | 'intention' | 'memory' | 'milestone')
                }
                className="bg-black text-xs text-neutral-300 border border-white/10 rounded-lg px-2.5 py-1 focus:outline-none font-mono"
              >
                <option value="reflection">Reflection</option>
                <option value="intention">Intention</option>
                <option value="memory">Memory</option>
                <option value="milestone">Milestone</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-neutral-400 hover:text-white px-3 py-1 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content.trim()}
                className="text-xs bg-amber-500 text-black font-bold hover:bg-amber-400 px-4 py-2 rounded-xl cursor-pointer disabled:opacity-40 transition-colors"
              >
                Save Entry
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

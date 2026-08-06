import React, { useState } from 'react';
import { X, Trash2, Edit3, Calendar, MapPin, Sparkles, Link as LinkIcon } from 'lucide-react';
import { LifeMilestone, ConstellationLine } from '../types';
import { IconRenderer } from './IconRenderer';

interface MilestoneDetailDrawerProps {
  milestone: LifeMilestone | null;
  allMilestones: LifeMilestone[];
  lines: ConstellationLine[];
  onClose: () => void;
  onUpdateMilestone: (updated: LifeMilestone) => void;
  onDeleteMilestone: (id: string) => void;
  onConnectStars: (fromId: string, toId: string) => void;
  onRemoveLine: (lineId: string) => void;
}

export const MilestoneDetailDrawer: React.FC<MilestoneDetailDrawerProps> = ({
  milestone,
  allMilestones,
  lines,
  onClose,
  onUpdateMilestone,
  onDeleteMilestone,
  onConnectStars,
  onRemoveLine,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  if (!milestone) return null;

  // Connected lines for this milestone
  const connectedLines = lines.filter((l) => l.fromId === milestone.id || l.toId === milestone.id);

  const startEdit = () => {
    setEditTitle(milestone.title);
    setEditDescription(milestone.description);
    setIsEditing(true);
  };

  const saveEdit = () => {
    onUpdateMilestone({
      ...milestone,
      title: editTitle.trim() || milestone.title,
      description: editDescription.trim() || milestone.description,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-zinc-950/95 border-l border-white/15 p-6 shadow-2xl z-40 backdrop-blur-xl flex flex-col text-zinc-100 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-white/10 text-amber-300 border border-white/15">
            <IconRenderer name={milestone.icon} className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200/80">
              {milestone.category} Star
            </span>
            <h3 className="text-lg font-serif text-white">{milestone.title}</h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        {/* Timestamp & Location */}
        <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>{milestone.timestampDisplay || milestone.date}</span>
          </div>
          {milestone.location && (
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>{milestone.location}</span>
            </div>
          )}
        </div>

        {/* Description / Memory */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Celestial Memory
            </h4>
            {!isEditing && (
              <button
                onClick={startEdit}
                className="text-xs font-mono text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-zinc-900 border border-white/20 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
              <textarea
                rows={4}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full bg-zinc-900 border border-white/20 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 text-zinc-950 font-mono text-xs font-bold"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm font-sans font-light text-zinc-200 leading-relaxed bg-zinc-900/40 border border-white/5 p-4 rounded-xl">
              {milestone.description}
            </p>
          )}
        </div>

        {/* Constellation Connections */}
        <div>
          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <LinkIcon className="w-3.5 h-3.5 text-amber-300" /> Connected Stars ({connectedLines.length})
          </h4>

          {connectedLines.length === 0 ? (
            <p className="text-xs text-zinc-500 italic">No constellation lines connected yet.</p>
          ) : (
            <div className="space-y-2">
              {connectedLines.map((line) => {
                const targetId = line.fromId === milestone.id ? line.toId : line.fromId;
                const targetNode = allMilestones.find((m) => m.id === targetId);

                return (
                  <div
                    key={line.id}
                    className="flex items-center justify-between bg-zinc-900/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono"
                  >
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <span>✦</span> {targetNode?.title || targetId}
                    </span>
                    <button
                      onClick={() => onRemoveLine(line.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                      title="Remove Connection"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <button
          onClick={() => {
            if (confirm(`Delete star "${milestone.title}" from your constellation?`)) {
              onDeleteMilestone(milestone.id);
            }
          }}
          className="flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Delete Star
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Compass, Lock, Unlock, Plus } from 'lucide-react';
import type { TimeCapsule, FutureGoal } from '../types';

interface FutureViewProps {
  currentDate?: Date;
  timeCapsules: TimeCapsule[];
  futureGoals: FutureGoal[];
  onAddCapsule: (title: string, message: string, unlockTimestamp: number) => void;
  onAddGoal: (title: string, timeLabel: string) => void;
  onToggleGoal: (id: string) => void;
}

export const FutureView: React.FC<FutureViewProps> = ({
  timeCapsules,
  futureGoals,
  onAddCapsule,
  onAddGoal,
  onToggleGoal,
}) => {
  const [goalText, setGoalText] = useState('');
  const [goalTime, setGoalTime] = useState('06:00 PM');
  const [showCapsuleForm, setShowCapsuleForm] = useState(false);
  const [capsuleTitle, setCapsuleTitle] = useState('');
  const [capsuleMessage, setCapsuleMessage] = useState('');
  const [capsuleDays, setCapsuleDays] = useState(1);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (goalText.trim()) {
      onAddGoal(goalText.trim(), goalTime);
      setGoalText('');
    }
  };

  const handleAddCapsule = (e: React.FormEvent) => {
    e.preventDefault();
    if (capsuleMessage.trim()) {
      const unlockTime = Date.now() + capsuleDays * 86400 * 1000;
      onAddCapsule(capsuleTitle.trim() || 'Letter to Future Self', capsuleMessage.trim(), unlockTime);
      setCapsuleTitle('');
      setCapsuleMessage('');
      setShowCapsuleForm(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-4 flex flex-col space-y-6 animate-fadeIn text-neutral-300 select-none">
      {/* Future Goals / Schedule */}
      <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-sans-clean font-medium text-sm">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Future Goals & Evening Intentions</span>
          </div>
          <span className="text-xs text-neutral-500">Upcoming Timeblocks</span>
        </div>

        {/* Add Goal form */}
        <form onSubmit={handleAddGoal} className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder="Plan an upcoming goal or intention..."
            className="flex-1 w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-500 font-sans-clean"
          />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={goalTime}
              onChange={(e) => setGoalTime(e.target.value)}
              placeholder="e.g. 6:00 PM"
              className="w-24 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none text-center font-sans-clean"
            />
            <button
              type="submit"
              disabled={!goalText.trim()}
              className="px-4 py-2 bg-white text-neutral-900 hover:bg-neutral-200 font-medium rounded-xl text-xs cursor-pointer disabled:opacity-40 transition-all"
            >
              Add
            </button>
          </div>
        </form>

        {/* List of goals */}
        {futureGoals.length > 0 ? (
          <div className="space-y-2 pt-1">
            {futureGoals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => onToggleGoal(goal.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  goal.completed
                    ? 'bg-neutral-950/20 border-neutral-800/40 text-neutral-500 line-through'
                    : 'bg-neutral-950/60 border-neutral-800/80 text-neutral-200 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                      goal.completed
                        ? 'bg-emerald-500 border-emerald-500 text-neutral-950'
                        : 'border-neutral-700 bg-neutral-900'
                    }`}
                  >
                    {goal.completed && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className="text-xs font-sans-clean">{goal.title}</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-sans-clean">{goal.timeLabel}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-neutral-500 text-center py-2 font-sans-clean">
            No future goals set yet for today.
          </div>
        )}
      </div>

      {/* Time Capsule Section */}
      <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-sans-clean font-medium text-sm">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Time Capsule (Letter to Future Self)</span>
          </div>
          <button
            onClick={() => setShowCapsuleForm(!showCapsuleForm)}
            className="flex items-center gap-1.5 text-xs font-sans-clean text-neutral-300 hover:text-white bg-neutral-950 hover:bg-neutral-800 px-3 py-1.5 rounded-full border border-neutral-800 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Seal Capsule</span>
          </button>
        </div>

        {/* Seal capsule form */}
        {showCapsuleForm && (
          <form
            onSubmit={handleAddCapsule}
            className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-col space-y-3 animate-fadeIn"
          >
            <input
              type="text"
              value={capsuleTitle}
              onChange={(e) => setCapsuleTitle(e.target.value)}
              placeholder="Capsule Title (e.g. Words for Tomorrow)"
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none"
            />
            <textarea
              value={capsuleMessage}
              onChange={(e) => setCapsuleMessage(e.target.value)}
              placeholder="Write a message to unlock in the future..."
              rows={3}
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none resize-none"
            />
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Unlock in:</span>
                <select
                  value={capsuleDays}
                  onChange={(e) => setCapsuleDays(Number(e.target.value))}
                  className="bg-neutral-900 text-xs text-neutral-300 border border-neutral-800 rounded-lg px-2.5 py-1 focus:outline-none"
                >
                  <option value={1}>1 Day</option>
                  <option value={7}>7 Days</option>
                  <option value={30}>30 Days</option>
                  <option value={365}>1 Year</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCapsuleForm(false)}
                  className="text-xs text-neutral-400 hover:text-white px-3 py-1 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!capsuleMessage.trim()}
                  className="text-xs bg-amber-400 text-neutral-950 font-medium px-4 py-1.5 rounded-xl cursor-pointer hover:bg-amber-300 disabled:opacity-40"
                >
                  Seal Letter
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Sealed & Unlocked Capsules list */}
        {timeCapsules.length > 0 ? (
          <div className="space-y-2">
            {timeCapsules.map((capsule) => {
              const now = Date.now();
              const isUnlocked = now >= capsule.unlockTimestamp;
              const daysLeft = Math.max(0, Math.ceil((capsule.unlockTimestamp - now) / (86400 * 1000)));

              return (
                <div
                  key={capsule.id}
                  className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60 flex flex-col space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-medium text-neutral-200">
                      {isUnlocked ? (
                        <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span>{capsule.title}</span>
                    </div>
                    <span className="text-[10px] text-neutral-500">
                      {isUnlocked ? 'Unlocked Now' : `Unlocks in ${daysLeft} days`}
                    </span>
                  </div>

                  {isUnlocked ? (
                    <p className="text-xs text-neutral-300 bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800 font-sans-clean leading-relaxed">
                      "{capsule.message}"
                    </p>
                  ) : (
                    <div className="text-[11px] text-neutral-500 italic">
                      Locked sealed message until target date...
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-neutral-500 text-center py-2 font-sans-clean">
            No time capsules created yet.
          </div>
        )}
      </div>
    </div>
  );
};

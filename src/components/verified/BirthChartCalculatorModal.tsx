import React, { useState, useEffect } from 'react';
import { X, Compass, RefreshCw } from 'lucide-react';
import type { UserBirthDetails } from '@/types/verified';
import { calculateZodiac } from '@/context/UserContext';

interface BirthChartCalculatorModalProps {
  userBirthDetails: UserBirthDetails;
  onUpdateBirthDetails: (details: UserBirthDetails) => void;
  onClose: () => void;
}

export const BirthChartCalculatorModal: React.FC<BirthChartCalculatorModalProps> = ({
  userBirthDetails,
  onUpdateBirthDetails,
  onClose,
}) => {
  const [form, setForm] = useState<UserBirthDetails>(userBirthDetails);
  const [loading, setLoading] = useState(false);
  const [zodiacInfo, setZodiacInfo] = useState(() => calculateZodiac(userBirthDetails.dob));

  const calculateChart = (details: UserBirthDetails) => {
    setLoading(true);
    setTimeout(() => {
      setZodiacInfo(calculateZodiac(details.dob));
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    calculateChart(userBirthDetails);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBirthDetails(form);
    calculateChart(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-3xl bg-[#141518] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-neutral-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium text-amber-100">
                Natal Birth Chart Engine
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                Calculate your precise planetary placements & Vimshottari Dasha
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-3 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 text-xs">
          <div>
            <label className="block text-neutral-400 font-mono mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-neutral-400 font-mono mb-1">Date of Birth</label>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500 [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-neutral-400 font-mono mb-1">Time of Birth</label>
            <input
              type="time"
              value={form.timeOfBirth}
              onChange={(e) => setForm({ ...form, timeOfBirth: e.target.value })}
              className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500 [color-scheme:dark]"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[34px] bg-amber-500 hover:bg-amber-400 text-black font-bold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Calculate Chart"}
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">Sun Sign</span>
              <span className="text-amber-300 font-bold text-sm">{zodiacInfo.sunSign}</span>
            </div>
            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">Ascendant</span>
              <span className="text-amber-300 font-bold text-sm">{zodiacInfo.ascendant}</span>
            </div>
            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">Active Dasha</span>
              <span className="text-amber-300 font-bold text-sm">{zodiacInfo.activeDasha}</span>
            </div>
            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">Key Transit</span>
              <span className="text-amber-300 font-bold text-sm">{zodiacInfo.transitPlanet} in {zodiacInfo.transitHouse}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

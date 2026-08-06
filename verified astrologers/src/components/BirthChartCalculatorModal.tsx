import React, { useState, useEffect } from 'react';
import { X, Sparkles, Compass, CheckCircle2, RefreshCw } from 'lucide-react';
import { UserBirthDetails, BirthChartData } from '../types';

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
  const [chartData, setChartData] = useState<BirthChartData | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateChart = async (details: UserBirthDetails) => {
    setLoading(true);
    try {
      const res = await fetch('/api/birthchart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      setChartData(data);
    } catch (err) {
      console.error("Failed to calculate birth chart:", err);
    } finally {
      setLoading(false);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#141518] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-neutral-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
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
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
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
              className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-neutral-400 font-mono mb-1">Exact Time</label>
            <input
              type="time"
              value={form.timeOfBirth}
              onChange={(e) => setForm({ ...form, timeOfBirth: e.target.value })}
              className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-neutral-400 font-mono mb-1">City, Country</label>
            <div className="flex gap-1">
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded text-neutral-200 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-3 bg-amber-500 hover:bg-amber-400 text-black rounded font-mono font-bold shrink-0 transition-colors"
                title="Calculate"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-amber-300 space-y-2">
            <Sparkles className="w-6 h-6 animate-spin mx-auto text-amber-400" />
            <p>Processing ephemeris data & planetary degrees...</p>
          </div>
        ) : chartData ? (
          <div className="mt-6 space-y-5">
            
            {/* Chart Summary */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs sm:text-sm text-amber-100 font-light leading-relaxed">
              <strong className="font-serif text-amber-300 block mb-1">Ascendant & Chart Overview:</strong>
              {chartData.chartSummary}
            </div>

            {/* Current Dasha */}
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-amber-200 flex items-center justify-between">
              <span>Current Vimshottari Period:</span>
              <strong className="text-amber-400">{chartData.currentDasha}</strong>
            </div>

            {/* Planetary Table */}
            <div>
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Planetary Degrees & Houses
              </h3>
              <div className="overflow-x-auto rounded-xl border border-neutral-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900 text-neutral-400 border-b border-neutral-800">
                    <tr>
                      <th className="p-2.5">Graha (Planet)</th>
                      <th className="p-2.5">Rasi (Sign)</th>
                      <th className="p-2.5">Bhava (House)</th>
                      <th className="p-2.5">Degree</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                    {chartData.planetaryPositions?.map((p, idx) => (
                      <tr key={idx} className="hover:bg-neutral-900/40">
                        <td className="p-2.5 font-serif text-neutral-100 font-medium">{p.planet}</td>
                        <td className="p-2.5 text-amber-200/90">{p.sign}</td>
                        <td className="p-2.5 text-neutral-400">{p.house}</td>
                        <td className="p-2.5 text-neutral-400">{p.degree}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Takeaway */}
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 font-light">
              <strong className="text-amber-300 font-serif block mb-0.5">Key Predictive Insight:</strong>
              {chartData.keyTakeaway}
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
};

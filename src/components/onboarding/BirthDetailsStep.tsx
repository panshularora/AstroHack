import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Calendar, Clock, MapPin, Search } from 'lucide-react'

export function BirthDetailsStep({
  onNext,
  onBack,
  updateData
}: {
  onNext: () => void
  onBack: () => void
  updateData?: (d: any) => void
}) {
  const [dob, setDob] = useState('1994-08-15')
  const [birthTime, setBirthTime] = useState('14:30')
  const [birthPlace, setBirthPlace] = useState('New Delhi, India')
  const [system, setSystem] = useState('vedic')
  const [gender, setGender] = useState('male')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (updateData) {
      updateData({ dob, birthTime, birthPlace, system, gender })
    }
    onNext()
  }

  return (
    <div className="flex-1 flex flex-col p-6 max-w-xl mx-auto w-full relative min-h-screen justify-center">
      <div className="bg-card border border-white/10 rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-primary/10 pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Birth Details</h2>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              Astrology requires precise data. We use this to calculate your exact Lagna, Moon sign, and planetary transits.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> Date of Birth
                </label>
                <input 
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm [&::-webkit-calendar-picker-indicator]:invert" 
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gold" /> Exact Birth Time
                </label>
                <input 
                  type="time" 
                  value={birthTime}
                  onChange={e => setBirthTime(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm [&::-webkit-calendar-picker-indicator]:invert" 
                  required
                />
                <p className="text-[10px] text-[#9CA3AF] mt-1">If unsure, estimate as close as possible.</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400" /> Place of Birth
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input 
                  type="text" 
                  value={birthPlace}
                  onChange={e => setBirthPlace(e.target.value)}
                  placeholder="Search city, e.g. New Delhi, India"
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" 
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 block">Astrological System</label>
                <select
                  value={system}
                  onChange={e => setSystem(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm appearance-none"
                >
                  <option value="vedic">Vedic (Lahiri)</option>
                  <option value="western">Western</option>
                  <option value="tropical">Tropical</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 block">Gender (Optional)</label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm appearance-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not">Prefer not to say</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4 flex justify-between items-center">
              <button type="button" onClick={onBack} className="text-[#9CA3AF] hover:text-white transition-colors text-sm font-medium">
                Back
              </button>
              <Button type="submit" className="px-8 font-bold">
                Generate Chart
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

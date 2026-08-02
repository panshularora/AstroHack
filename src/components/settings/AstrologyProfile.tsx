import { mockUserSettings } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"
import { MapPin, Clock, Calendar, Star } from "lucide-react"

export function AstrologyProfile() {
  const { birthDetails } = mockUserSettings

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Astrology Profile</h2>
        <p className="text-[#9CA3AF]">The foundational data that powers your personalized insights.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-primary" /> Birth Details
          </h3>
          
          <div>
            <label className="text-xs text-[#9CA3AF] flex items-center gap-2 mb-2"><Calendar className="w-3 h-3" /> Date of Birth</label>
            <input type="date" defaultValue={birthDetails.date} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:invert" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#9CA3AF] flex items-center gap-2 mb-2"><Clock className="w-3 h-3" /> Time of Birth</label>
              <input type="time" defaultValue={birthDetails.time} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
            <div>
              <label className="text-xs text-[#9CA3AF] flex items-center gap-2 mb-2"><Star className="w-3 h-3" /> System</label>
              <select defaultValue={birthDetails.system} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                <option value="Vedic (Lahiri)">Vedic (Lahiri)</option>
                <option value="Western">Western</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-[#9CA3AF] flex items-center gap-2 mb-2"><MapPin className="w-3 h-3" /> Place of Birth</label>
            <input type="text" defaultValue={birthDetails.location} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
          </div>
          
          <Button className="w-full">Update Chart</Button>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-black pointer-events-none"></div>
          <h3 className="text-lg font-bold text-white mb-8 z-10 relative">Chart Preview</h3>
          
          {/* Static SVG representation of a premium birth chart */}
          <div className="w-64 h-64 relative z-10 group-hover:scale-105 transition-transform duration-700">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Fake House Lines */}
              {[...Array(12)].map((_, i) => (
                <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(i * 30 * Math.PI / 180)} y2={50 + 48 * Math.sin(i * 30 * Math.PI / 180)} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              ))}
              {/* Planet dots */}
              <circle cx="20" cy="40" r="2" fill="#3B82F6" className="animate-pulse" />
              <circle cx="70" cy="20" r="2" fill="#F59E0B" className="animate-pulse" />
              <circle cx="80" cy="60" r="2" fill="#8B5CF6" className="animate-pulse" />
              <circle cx="40" cy="80" r="2" fill="#10B981" className="animate-pulse" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none" />
          </div>
          
          <p className="text-xs text-[#9CA3AF] text-center mt-6 z-10 relative">
            Leo Ascendant • Moon in Capricorn • Sun in Leo
          </p>
        </div>
      </div>
    </div>
  )
}

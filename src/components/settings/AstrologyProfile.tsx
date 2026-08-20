import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Clock, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useNatalChart, useUser } from "@/context/UserContext"
import { NorthIndianChart } from "@/components/kundli/NorthIndianChart"

export function AstrologyProfile() {
  const { user, updateProfile } = useUser()
  const natal = useNatalChart()
  const navigate = useNavigate()
  const [dob, setDob] = useState(user.dob)
  const [time, setTime] = useState(user.timeOfBirth)
  const [place, setPlace] = useState(user.placeOfBirth)
  const [saved, setSaved] = useState(false)

  const save = () => {
    updateProfile({ dob, timeOfBirth: time, placeOfBirth: place })
    setSaved(true)
    setTimeout(() => setSaved(false), 1600)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Astrology Profile</h2>
        <p className="text-[#9CA3AF]">These three fields redraw your Kundli, Sade Sati, and transits.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-surface border border-line p-6 md:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-brand" /> Birth Details
          </h3>
          <div>
            <label className="text-xs text-[#9CA3AF] flex items-center gap-2 mb-2"><Calendar className="w-3 h-3" /> Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-surface-2 border border-line px-4 py-3 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#9CA3AF] flex items-center gap-2 mb-2"><Clock className="w-3 h-3" /> Time of Birth</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-surface-2 border border-line px-4 py-3 text-white" />
            </div>
            <div>
              <label className="text-xs text-[#9CA3AF] flex items-center gap-2 mb-2"><Star className="w-3 h-3" /> System</label>
              <select className="w-full bg-surface-2 border border-line px-4 py-3 text-white" defaultValue="lahiri">
                <option value="lahiri">Vedic (Lahiri)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-[#9CA3AF] flex items-center gap-2 mb-2"><MapPin className="w-3 h-3" /> Place of Birth</label>
            <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} className="w-full bg-surface-2 border border-line px-4 py-3 text-white" />
          </div>
          <Button className="w-full" onClick={save}>{saved ? "Chart updated" : "Recalculate chart"}</Button>
        </div>

        <div className="bg-zinc-950 border border-line p-6 flex flex-col items-center">
          <NorthIndianChart natal={natal} size={280} />
          <p className="text-xs text-zinc-400 text-center mt-4">
            {natal.sunSign} Sun · {natal.moonSign} Moon · {natal.lagnaSign} Lagna
          </p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => navigate("/app/kundli")}>
            Open Kundli + PDF
          </Button>
        </div>
      </div>
    </div>
  )
}

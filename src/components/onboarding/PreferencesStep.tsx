import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { MessageSquare, Phone, Video, Languages, Bell } from 'lucide-react'

export function PreferencesStep({
  onNext,
  onBack,
  updateData
}: {
  onNext: () => void
  onBack: () => void
  updateData?: (d: any) => void
}) {
  const [lang, setLang] = useState('english')
  const [mode, setMode] = useState('chat')
  const [notifications, setNotifications] = useState({
    dailyBrief: true,
    predictions: true,
    remedies: true,
    transits: true,
  })

  const handleNext = () => {
    if (updateData) {
      updateData({ lang, consultationMode: mode, notifications })
    }
    onNext()
  }

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full relative min-h-screen justify-center py-12">
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Consultation & Notification Preferences</h2>
        <p className="text-[#9CA3AF] text-sm">Customize how AstroLive guides and alerts you every day.</p>
      </div>

      <div className="space-y-8 relative z-10 flex-1">
        {/* Preferred Language */}
        <div>
          <h3 className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
            <Languages className="w-4 h-4 text-brand" /> Preferred Language
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {['English', 'Hindi', 'Spanish', 'French', 'Mandarin'].map(l => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l.toLowerCase())}
                className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  lang === l.toLowerCase()
                    ? 'bg-brand/20 border-brand text-white shadow-[0_0_15px_rgba(107,33,168,0.3)]'
                    : 'bg-white/5 border-line/60 text-[#9CA3AF] hover:bg-surface-3 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Consultation Mode */}
        <div>
          <h3 className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-400" /> Default Consultation Mode
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'chat', label: 'Chat', icon: MessageSquare, color: 'text-blue-400', activeBorder: 'border-blue-500 bg-blue-500/15' },
              { id: 'voice', label: 'Voice Call', icon: Phone, color: 'text-gold', activeBorder: 'border-gold bg-gold/15' },
              { id: 'video', label: 'Video Call', icon: Video, color: 'text-green-400', activeBorder: 'border-green-500 bg-green-500/15' },
            ].map(item => {
              const Icon = item.icon
              const isActive = mode === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={`p-4 rounded-lg border text-center transition-all ${
                    isActive
                      ? `${item.activeBorder} text-white`
                      : 'bg-white/5 border-line/60 text-[#9CA3AF] hover:bg-surface-3 hover:text-white'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${isActive ? item.color : 'text-[#9CA3AF]'}`} />
                  <span className="font-bold text-xs block">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <h3 className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-gold" /> Notification Alerts
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'dailyBrief', title: 'Daily Cosmic Brief', desc: 'Every morning at 6:00 AM' },
              { key: 'predictions', title: 'Prediction Windows', desc: 'Alerts when target windows open' },
              { key: 'remedies', title: 'Remedy Streaks', desc: 'Daily mantra & meditation reminders' },
              { key: 'transits', title: 'Major Planetary Transits', desc: 'Alerts for Retrogrades & Shifts' },
            ].map(n => {
              const isChecked = notifications[n.key as keyof typeof notifications]
              return (
                <div
                  key={n.key}
                  onClick={() => toggleNotif(n.key as keyof typeof notifications)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                    isChecked
                      ? 'bg-brand-light border-brand/30 text-white'
                      : 'bg-surface-2 border-line/60 text-[#9CA3AF]'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-white">{n.title}</p>
                    <p className="text-[10px] text-[#9CA3AF]">{n.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-0.5 rounded accent-primary cursor-pointer"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="pt-8 pb-4 flex justify-between items-center relative z-10">
        <button onClick={onBack} className="text-[#9CA3AF] hover:text-white transition-colors text-sm font-medium">
          Back
        </button>
        <Button onClick={handleNext} className="px-8 font-bold">
          Meet Your AI Companion
        </Button>
      </div>
    </div>
  )
}

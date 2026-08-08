import { useState, useEffect } from "react"
import { Sun, Moon, Star, Flame, Share2, CheckCircle2, Calendar, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"

export function DailyToday() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [streak, setStreak] = useState(0)
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false)
  
  useEffect(() => {
    const today = new Date().toDateString()
    const storedStreak = parseInt(localStorage.getItem(`astrolive_checkin_streak_${user.id}`) || "0", 10)
    const lastCheckIn = localStorage.getItem(`astrolive_last_checkin_${user.id}`)
    
    setStreak(storedStreak)
    if (lastCheckIn === today) {
      setHasCheckedInToday(true)
    }
  }, [user.id])

  const handleCheckIn = () => {
    const today = new Date().toDateString()
    const newStreak = streak + 1
    localStorage.setItem(`astrolive_checkin_streak_${user.id}`, newStreak.toString())
    localStorage.setItem(`astrolive_last_checkin_${user.id}`, today)
    setStreak(newStreak)
    setHasCheckedInToday(true)
  }

  const handleShare = async () => {
    const shareText = "My Vedic transit today: Rohini Nakshatra, Chaturdashi Tithi. Checked in on AstroLive!"
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AstroLive Daily Transit",
          text: shareText
        })
      } catch (err) {
        console.error("Share failed", err)
      }
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Copied to clipboard!")
    }
  }

  return (
    <div className="page-container max-w-5xl pb-28 font-sans">
      <div className="space-y-10">
        
        {/* Header */}
        <div className="border-b border-line/60 pb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-mono text-[11px] text-ink-tertiary hover:text-ink transition-colors mb-5 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand">
              <Calendar className="w-4 h-4 text-brand" />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <h1 className="text-h1 font-display text-ink tracking-tight">Daily Panchang</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Your daily astrological alignment and spiritual check-in.
          </p>
        </div>

        {/* Check-in Section */}
        <div className="p-6 rounded-lg bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${hasCheckedInToday ? "bg-success/10 border-success text-success" : "bg-surface-2 border-line text-ink-tertiary"}`}>
              {hasCheckedInToday ? <CheckCircle2 className="w-6 h-6" /> : <Flame className="w-6 h-6" />}
            </div>
            <div>
              <p className="text-body font-bold text-ink">Daily Spiritual Check-in</p>
              <p className="text-xs font-mono text-ink-secondary mt-1">
                Current Streak: <span className="text-ink font-bold">{streak} Days</span>
              </p>
            </div>
          </div>
          <Button 
            onClick={hasCheckedInToday ? undefined : handleCheckIn} 
            variant={hasCheckedInToday ? "secondary" : "primary"}
            disabled={hasCheckedInToday}
            className="w-full sm:w-auto"
          >
            {hasCheckedInToday ? "Checked In" : "Mark Today Complete"}
          </Button>
        </div>

        {/* Panchang Details */}
        <div>
          <h2 className="text-h2 font-display text-ink mb-4">Today's Panchang</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono">
            {[
              { label: "Tithi (Moon Phase)", value: "Chaturdashi", icon: Moon },
              { label: "Nakshatra (Mansion)", value: "Rohini", icon: Star },
              { label: "Yoga (Alignment)", value: "Shiva", icon: Sun },
              { label: "Karana (Half-Tithi)", value: "Bava", icon: Sun },
              { label: "Rahu Kaal", value: "9:00 AM – 10:30 AM", icon: Flame },
              { label: "Abhijit Muhurta", value: "12:04 PM – 12:52 PM", icon: Star },
            ].map(item => (
              <div key={item.label} className="p-4 rounded-lg bg-surface border border-line flex flex-col gap-2">
                <div className="flex items-center gap-2 text-ink-tertiary">
                  <item.icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold">{item.label}</span>
                </div>
                <p className="text-sm font-bold text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mantra & Share */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
            <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Daily Mantra Suggestion</h3>
            <div className="bg-surface-2 p-4 rounded-md border border-line/60 text-center space-y-2">
              <p className="font-display text-2xl text-gold-bright tracking-wide">Om Namah Shivaya</p>
              <p className="text-xs text-ink-secondary font-sans">Recite 108 times for inner peace and spiritual grounding.</p>
            </div>
          </div>
          <div className="p-6 rounded-lg bg-surface border border-line space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3">Share Alignment</h3>
              <p className="text-xs text-ink-secondary mt-3 font-sans">
                Share today's Panchang alignment with your friends and spiritual circle.
              </p>
            </div>
            <Button onClick={handleShare} variant="outline" className="w-full flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Today's Transit
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

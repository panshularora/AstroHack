import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Moon, Sun, Heart, Flame, BookOpen, ShieldCheck, ArrowRight } from "lucide-react"

interface CelestialToolsProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: "panchang" | "kundli" | "match" | "pooja"
}

export function CelestialToolsModal({ isOpen, onClose, initialTab = "panchang" }: CelestialToolsProps) {
  const [activeTab, setActiveTab] = useState<"panchang" | "kundli" | "match" | "pooja">(initialTab)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-surface border border-line rounded-lg p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line/60 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand/20 border border-brand/30 flex items-center justify-center text-brand">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">AstroLive Celestial Tools</h2>
                <p className="text-xs text-[#9CA3AF]">Panchang, Kundli, Synastry Matching & Remedial Poojas</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-surface-3 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-line/60 pb-4 mb-6 overflow-x-auto">
            {[
              { id: "panchang", label: "Today's Panchang", icon: Sun, color: "text-amber-400" },
              { id: "kundli", label: "Free Kundli & Chart", icon: BookOpen, color: "text-brand" },
              { id: "match", label: "Kundli Match (36 Guna)", icon: Heart, color: "text-pink-400" },
              { id: "pooja", label: "Book a Remedial Pooja", icon: Flame, color: "text-gold" },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? "bg-white/10 text-white border border-line-strong shadow-md"
                      : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${tab.color}`} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-6">
            {activeTab === "panchang" && <PanchangView />}
            {activeTab === "kundli" && <KundliView />}
            {activeTab === "match" && <KundliMatchView />}
            {activeTab === "pooja" && <PoojaBookingView onClose={onClose} />}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function PanchangView() {
  const panchangData = [
    { label: "Tithi", val: "Shukla Paksha Dashami (until 4:18 PM)", icon: Moon, color: "text-blue-400" },
    { label: "Nakshatra", val: "Rohini (until 8:42 PM)", icon: Sparkles, color: "text-gold" },
    { label: "Yoga", val: "Shukla Yoga (all day)", icon: Sun, color: "text-amber-400" },
    { label: "Karana", val: "Taitila (until 4:18 PM)", icon: ShieldCheck, color: "text-green-400" },
    { label: "Rahu Kalam", val: "1:45 PM – 3:20 PM (Avoid new beginnings)", icon: Moon, color: "text-red-400" },
    { label: "Abhijit Muhurat", val: "11:54 AM – 12:46 PM (Highly auspicious)", icon: Sun, color: "text-emerald-400" },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500/10 via-primary/10 to-surface p-5 rounded-lg border border-amber-500/20">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-white">Daily Vedic Panchang</h3>
            <p className="text-xs text-[#9CA3AF]">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} · New Delhi, India
            </p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-400/15 border border-amber-400/30 text-amber-400 rounded-full">
            Auspicious Energy
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {panchangData.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="p-4 bg-surface-2 border border-line/60 rounded-lg flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-xs text-[#9CA3AF] font-medium">{item.label}</p>
                <p className="text-sm font-bold text-white mt-0.5">{item.val}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function KundliView() {
  const { user } = useUser()
  return (
    <div className="space-y-6">
      <div className="p-5 bg-brand-light border border-brand/20 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">{user.name}'s Kundli & Birth Chart</h3>
          <p className="text-xs text-[#9CA3AF]">Vedic (Lahiri) · {user.dob} · {user.timeOfBirth} · {user.placeOfBirth}</p>
        </div>
        <button className="px-4 py-2 bg-brand/20 hover:bg-brand/30 text-ink-secondary border border-brand/30 rounded-xl text-xs font-bold transition-colors">
          Download PDF Chart
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-surface-2 border border-line/60 rounded-lg">
          <p className="text-xs text-[#9CA3AF] font-bold uppercase mb-2">Lagna (Ascendant)</p>
          <p className="text-xl font-bold text-white">{user.ascendant}</p>
          <p className="text-xs text-brand mt-1">Natal Ascendant · Strong Determination</p>
        </div>
        <div className="p-4 bg-surface-2 border border-line/60 rounded-lg">
          <p className="text-xs text-[#9CA3AF] font-bold uppercase mb-2">Rashi (Sun/Moon Sign)</p>
          <p className="text-xl font-bold text-gold">{user.sunSign}</p>
          <p className="text-xs text-gold mt-1">Natal Sun · Core Power</p>
        </div>
        <div className="p-4 bg-surface-2 border border-line/60 rounded-lg">
          <p className="text-xs text-[#9CA3AF] font-bold uppercase mb-2">Current Mahadasha</p>
          <p className="text-xl font-bold text-emerald-400">{user.activeDasha}</p>
          <p className="text-xs text-emerald-400 mt-1">Active Epoch · High Alignment</p>
        </div>
      </div>
    </div>
  )
}

function KundliMatchView() {
  return (
    <div className="space-y-6">
      <div className="p-5 bg-pink-500/10 border border-pink-500/20 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-white">Ashta Koota 36-Guna Compatibility</h3>
          <span className="text-xs font-bold text-pink-400 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-500/30">
            31 / 36 Gunas Matched
          </span>
        </div>
        <p className="text-xs text-[#9CA3AF]">Arjun Sharma (Leo) + Meera V. (Aries) · Excellent Synastry</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ["Varna", "1 / 1", "Work Alignment"],
          ["Vashya", "2 / 2", "Mutual Attraction"],
          ["Tara", "3 / 3", "Destiny Harmony"],
          ["Yoni", "4 / 4", "Intimacy Score"],
          ["Maitri", "5 / 5", "Friendship Level"],
          ["Gana", "6 / 6", "Temperament"],
          ["Bhakoot", "7 / 7", "Financial Prosperity"],
          ["Nadi", "3 / 8", "Genetic Compatibility"],
        ].map(([title, val, desc]) => (
          <div key={title} className="p-3 bg-surface-2 border border-line/60 rounded-xl">
            <p className="text-[10px] text-[#9CA3AF] font-bold uppercase">{title}</p>
            <p className="text-base font-bold text-white mt-0.5">{val}</p>
            <p className="text-[10px] text-[#6B7280]">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PoojaBookingView({ onClose }: { onClose: () => void }) {
  const poojas = [
    { name: "Venus Beej Mantra Mahapooja", price: "$65", desc: "Enhances relationship harmony and social magnetism.", duration: "2 Hours" },
    { name: "Jupiter Career Growth Abhishek", price: "$85", desc: "Removes professional obstacles during Jupiter transits.", duration: "3 Hours" },
    { name: "Rahu Shanti Havan", price: "$95", desc: "Auspicious peace ritual for Rahu Mahadasha transition.", duration: "3.5 Hours" },
  ]

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#9CA3AF]">
        Book authentic Vedic Poojas conducted live from ancient temples with personalized sankalp in your name.
      </p>

      {poojas.map((p) => (
        <div key={p.name} className="p-4 bg-surface-2 border border-line rounded-lg flex items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-gold" /> {p.name}
            </h4>
            <p className="text-xs text-[#9CA3AF] mt-1">{p.desc}</p>
            <span className="text-[10px] text-[#6B7280] mt-1 block">Duration: {p.duration} · Live Video Access Included</span>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-white mb-2">{p.price}</p>
            <button
              onClick={() => { alert(`Booking initiated for ${p.name}`); onClose(); }}
              className="px-4 py-2 bg-gold text-navy hover:bg-gold/90 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
            >
              Book Pooja <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

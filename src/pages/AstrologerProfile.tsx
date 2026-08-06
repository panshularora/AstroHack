import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PRACTITIONERS } from "@/data/practitioners"
import type { Practitioner, SessionMode, UserBirthDetails } from "@/types/verified"
import { LiveSessionModal } from "@/components/verified/LiveSessionModal"
import { ArrowLeft, ShieldCheck, Star, Clock, Sparkles, Mic, Video, MessageSquare, Award, CheckCircle2, BookOpen } from "lucide-react"
import { useUser } from "@/context/UserContext"

const EXPERTISE_DESCRIPTIONS: Record<string, { title: string; desc: string }> = {
  "Vedic Astrology": {
    title: "Classical Vedic Parashara & Nakshatra Systems",
    desc: "Decodes natal degree positions, lunar mansions (Nakshatras), Vimshottari Dasha planetary periods, and prescribed remedial mantras/yantras to neutralize challenging transits.",
  },
  "Financial Transits": {
    title: "Monetary Yogas & Wealth Transits",
    desc: "Specializes in 2nd/11th house Dhana Yogas, corporate venture expansion timings, stock market planetary degree alignment, and high-value decision windows.",
  },
  "Relationship Sync": {
    title: "Synastry & Ashtakoota 36-Guna Milan",
    desc: "Evaluates partner planetary compatibility, Venus-Mars natal aspecting, 7th house lord strength, and auspicious dates for engagements and marital harmony.",
  },
  "Cosmic Counseling": {
    title: "Evolutionary & Somatic Spiritual Guidance",
    desc: "Combines outer-planet transits (Uranus, Neptune, Pluto) with soul-path readings, aura diagnostics, and emotional chakra realignment for spiritual awakenings.",
  },
  "Career Projections": {
    title: "10th House Karma Bhava & Dashamsha D10",
    desc: "Analyzes professional status, leadership promotions, 10th house lord placement, Saturn returns, and optimal timing for career transitions.",
  },
}

export function AstrologerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useUser()

  const practitioner: Practitioner = PRACTITIONERS.find((p) => p.id === id) || PRACTITIONERS[0]

  const [activeSession, setActiveSession] = useState<{ practitioner: Practitioner; mode: SessionMode } | null>(null)

  const [userBirthDetails, setUserBirthDetails] = useState<UserBirthDetails>({
    name: user.name || "Alexandra Vance",
    dob: user.dob || "1995-08-15",
    timeOfBirth: user.timeOfBirth || "10:30",
    location: user.placeOfBirth || "New Delhi, India",
  })

  const expertiseDetail = EXPERTISE_DESCRIPTIONS[practitioner.specialty] || {
    title: `${practitioner.specialty} Mastery`,
    desc: "Precision predictive calculations, real-time planetary transit monitoring, and customized natal chart remedies.",
  }

  return (
    <div className="min-h-screen bg-[#0d0e11] text-neutral-100 font-sans pb-28 pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/app/verified")}
          className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-200 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Verified Network Directory</span>
        </button>

        {/* Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#141518] border border-neutral-800 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 border-b border-neutral-800/80 pb-6">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-700 shrink-0 shadow-2xl">
                <img
                  src={practitioner.imageUrl}
                  alt={practitioner.name}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  {practitioner.isOnline && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="Live Online" />
                  )}
                  <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                    {practitioner.name}
                  </h1>
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 font-light flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span>{practitioner.title}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-bold">
                    {practitioner.specialty}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/60 text-amber-300 border border-neutral-700 text-[10px] font-mono font-bold uppercase">
                    {practitioner.tag}
                  </span>
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 font-mono text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">{practitioner.accuracy}</span>
                    <span className="text-neutral-500 text-[10px] uppercase">Accuracy</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-white">{practitioner.rating}</span>
                    <span className="text-neutral-500 text-[10px]">({practitioner.totalSessions} consultations)</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="font-bold text-white">{practitioner.experienceYears} Yrs Exp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rate & Quick Trigger */}
            <div className="text-center md:text-right font-mono shrink-0 space-y-1">
              <p className="text-3xl font-bold text-amber-400">₹{practitioner.ratePerMin}</p>
              <p className="text-xs text-neutral-400">per minute consultation</p>
            </div>
          </div>

          {practitioner.featuredQuote && (
            <blockquote className="p-4 rounded-2xl bg-amber-950/20 border-l-3 border-amber-400 italic text-xs sm:text-sm text-amber-100 font-serif leading-relaxed">
              "{practitioner.featuredQuote}"
            </blockquote>
          )}

          {/* Action Trigger Buttons */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setActiveSession({ practitioner, mode: 'audio' })}
              className="py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Mic className="w-4 h-4 text-amber-400" />
              <span>Start Audio (₹{practitioner.ratePerMin}/m)</span>
            </button>

            <button
              onClick={() => setActiveSession({ practitioner, mode: 'video' })}
              className="py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Video className="w-4 h-4 text-amber-400" />
              <span>Start Video (₹{practitioner.ratePerMin}/m)</span>
            </button>

            <button
              onClick={() => setActiveSession({ practitioner, mode: 'chat' })}
              className="py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Live Chat (₹{practitioner.ratePerMin}/m)</span>
            </button>
          </div>
        </div>

        {/* Detailed Areas of Expertise & Techniques */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl text-white font-normal flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>Detailed Areas of Expertise</span>
          </h2>

          <div className="p-6 rounded-2xl bg-[#141518] border border-neutral-800 space-y-6">
            
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-sm font-bold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{expertiseDetail.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {expertiseDetail.desc}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold mb-3">
                Practitioner Biography & Systems
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {practitioner.bio}
              </p>
            </div>

            {practitioner.techniques && practitioner.techniques.length > 0 && (
              <div>
                <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold mb-3">
                  Verified System Techniques & Methods
                </h3>
                <div className="flex flex-wrap gap-2">
                  {practitioner.techniques.map((tech) => (
                    <div
                      key={tech}
                      className="px-3.5 py-1.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 rounded-xl flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Verified Client Outcome Reviews */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl text-white font-normal flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>Verified Client Outcomes & Reviews</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#141518] border border-neutral-800 space-y-3 font-sans">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">100% Verified Consultation</span>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                "Consulted for career transition during my Sade Sati period. The D10 Dashamsha analysis was spot on and gave exact dates for my offer letter."
              </p>
              <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-400">
                — Rohit S. (Mumbai, Maharashtra)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#141518] border border-neutral-800 space-y-3 font-sans">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">100% Verified Consultation</span>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                "Accurate Nakshatra compatibility reading before our marriage. The remedies suggested brought immense clarity and peace."
              </p>
              <div className="pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-400">
                — Pooja V. (New Delhi)
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Live Interactive Session Modal */}
      {activeSession && (
        <LiveSessionModal
          practitioner={activeSession.practitioner}
          mode={activeSession.mode}
          userBirthDetails={userBirthDetails}
          onUpdateBirthDetails={setUserBirthDetails}
          onClose={() => setActiveSession(null)}
        />
      )}
    </div>
  )
}
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Star, Shield, Clock, Globe, Award, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockVerifiedAstrologers, mockExpertiseTimeline, mockDeepReviews } from "@/lib/mock-data"

export function AstrologerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const astrologer = mockVerifiedAstrologers.find(a => a.id === id) || mockVerifiedAstrologers[0]

  return (
    <div className="page-container max-w-4xl pb-28">
      <div className="space-y-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-mono text-ink-secondary hover:text-ink transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Astrologer Network
        </button>

        {/* Profile Header */}
        <div className="p-6 rounded-lg bg-surface border border-line space-y-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-5 border-b border-line/60 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-md bg-surface-2 border border-brand/30 text-brand flex items-center justify-center font-mono font-bold text-lg shrink-0">
                {astrologer.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-h2 font-display text-ink">{astrologer.name}</h1>
                  <div className={`w-2.5 h-2.5 rounded-full ${astrologer.status === "online" ? "bg-success" : astrologer.status === "busy" ? "bg-warning" : "bg-ink-quaternary"}`} />
                </div>
                <p className="text-xs text-ink-secondary mt-1 font-mono">{astrologer.specialization.join(" · ")}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge variant="gold" size="sm">{astrologer.badge}</Badge>
                  <div className="flex items-center gap-1 font-mono text-xs text-gold-bright font-bold">
                    <Star className="w-3.5 h-3.5 fill-gold-bright text-gold-bright" />
                    <span>{astrologer.trustScore} Trust Score</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right font-mono shrink-0">
              <p className="text-2xl font-bold text-ink">₹{astrologer.pricing}</p>
              <p className="text-caption text-ink-tertiary">per minute</p>
            </div>
          </div>

          {astrologer.about && (
            <p className="text-xs text-ink-secondary leading-relaxed font-sans">
              {astrologer.about}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-ink-secondary border-t border-line/60 pt-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand" /> {astrologer.responseTime}
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-brand" /> {astrologer.languages.join(", ")}
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-success" /> {astrologer.accuracy}% Verified Accuracy
            </div>
          </div>

          <Button className="w-full rounded-md font-mono font-bold" size="lg" onClick={() => navigate(`/app/room/${astrologer.id}`)}>
            Connect Live Call & Chat (₹{astrologer.pricing}/min)
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 font-mono text-center">
          {[
            { label: "Experience", value: `${astrologer.experienceYears}y` },
            { label: "Sessions", value: astrologer.consultationCount },
            { label: "Repeat Customer", value: `${astrologer.repeatCustomerRate}%` },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-lg bg-surface border border-line space-y-1">
              <p className="text-2xl font-bold text-ink tabular-nums">{s.value}</p>
              <p className="text-[10px] text-ink-tertiary uppercase font-bold">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Expertise Timeline */}
        <div className="space-y-4">
          <h2 className="text-h2 font-display text-ink">Credentials & Expertise</h2>
          <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
            {mockExpertiseTimeline.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-md bg-surface-2/50 border border-line/50">
                <div className="w-7 h-7 rounded-md bg-surface-2 border border-brand/30 flex items-center justify-center text-brand shrink-0">
                  <Award className="w-3.5 h-3.5 text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-ink">{item.title}</p>
                    <span className="text-[10px] font-mono text-ink-tertiary">{item.year}</span>
                  </div>
                  <p className="text-xs text-ink-secondary mt-0.5 font-sans">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          <h2 className="text-h2 font-display text-ink">Verified Client Outcomes</h2>
          <div className="space-y-4">
            {mockDeepReviews.map((review, i) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="p-5 rounded-lg bg-surface border border-line space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-gold-bright">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-gold-bright text-gold-bright" />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-ink-tertiary">{review.userType}</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-mono text-[10px] text-ink-tertiary uppercase">Concern</p>
                      <p className="text-ink-secondary mt-0.5">{review.concern}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-ink-tertiary uppercase">Outcome</p>
                      <p className="text-ink font-bold mt-0.5">{review.outcome}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-line/60">
                    {review.badges.map(b => (
                      <Badge key={b} variant="success" size="sm">
                        <CheckCircle2 className="w-3 h-3" /> {b}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
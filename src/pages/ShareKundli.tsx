import { useState } from "react"
import { Copy, Share2, ExternalLink, Users, Gift, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { useUser } from "@/context/UserContext"

export function ShareKundli() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [copied, setCopied] = useState(false)
  
  const referralLink = `https://astrolive.app/ref/${user.id}`
  const moonSign = "Scorpio" // Default as per requirements

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    const text = `I use AstroLive for my daily Kundli & Vedic astrology. Join me: ${referralLink}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
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
              <Share2 className="w-4 h-4 text-brand" />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand">
              Kundli Share & Referral
            </p>
          </div>
          <h1 className="text-h1 font-display text-ink tracking-tight">Share Your Kundli</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Invite friends and earn free consultation credits.
          </p>
        </div>

        {/* Preview Card */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md bg-surface-2 border-2 border-gold-bright/50 rounded-xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-bright/20 via-gold-bright to-gold-bright/20" />
            <div className="text-center space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-bright">AstroLive Premium</p>
              <h2 className="font-display text-3xl text-ink">{user.name}'s Kundli</h2>
              <div className="grid grid-cols-2 gap-4 mt-6 text-left font-mono">
                <div className="p-3 bg-surface rounded-lg border border-line/60">
                  <p className="text-[10px] text-ink-tertiary uppercase mb-1">Sun Sign</p>
                  <p className="text-sm font-bold text-ink">{user.sunSign}</p>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-line/60">
                  <p className="text-[10px] text-ink-tertiary uppercase mb-1">Moon Sign</p>
                  <p className="text-sm font-bold text-ink">{moonSign}</p>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-line/60">
                  <p className="text-[10px] text-ink-tertiary uppercase mb-1">Ascendant</p>
                  <p className="text-sm font-bold text-ink">{user.ascendant}</p>
                </div>
                <div className="p-3 bg-surface rounded-lg border border-line/60">
                  <p className="text-[10px] text-ink-tertiary uppercase mb-1">Active Dasha</p>
                  <p className="text-sm font-bold text-ink">{user.activeDasha}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="max-w-2xl mx-auto w-full p-6 rounded-lg bg-surface border border-line space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-bold text-ink">Your Unique Referral Link</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={referralLink} 
                className="flex-1 bg-surface-2 border border-line rounded-md px-4 py-2 text-sm font-mono text-ink-secondary focus:outline-none"
              />
              <Button onClick={handleCopy} variant="primary" className="flex items-center gap-2 whitespace-nowrap">
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          </div>
          <Button onClick={handleWhatsAppShare} variant="outline" className="w-full flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Share to WhatsApp
          </Button>
        </div>

        {/* How it Works & Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
            <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3 flex items-center gap-2">
              <Gift className="w-4 h-4 text-brand" />
              How Referrals Work
            </h3>
            <ol className="space-y-4 text-sm text-ink-secondary font-sans list-decimal list-inside marker:text-ink-tertiary marker:font-mono">
              <li>Share your unique referral link with a friend.</li>
              <li>Your friend signs up for an AstroLive account.</li>
              <li>Both you and your friend get 5 free consultation minutes!</li>
            </ol>
          </div>
          
          <div className="p-6 rounded-lg bg-surface border border-line space-y-4">
            <h3 className="text-body font-bold text-ink border-b border-line/60 pb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-brand" />
              Your Stats
            </h3>
            <div className="space-y-3 font-mono">
              <div className="flex justify-between items-center py-2 border-b border-line/30">
                <span className="text-xs text-ink-tertiary uppercase">Friends Invited</span>
                <span className="text-sm font-bold text-ink">0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-line/30">
                <span className="text-xs text-ink-tertiary uppercase">Credits Earned</span>
                <span className="text-sm font-bold text-success">₹0</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-ink-tertiary uppercase">Credits Available</span>
                <span className="text-sm font-bold text-ink">₹0</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

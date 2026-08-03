import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { 
  Sparkles, 
  ArrowRight, 
  Target, 
  Bot, 
  Cpu, 
  ShieldCheck, 
  ChevronDown, 
  CheckCircle2, 
  Compass, 
  Calendar,
  Lock,
  Zap,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

const FEATURES = [
  {
    icon: Target,
    title: "Immutable Prediction Proof Ledger",
    subtitle: "Every Prediction Is a Trackable Receipt",
    description: "No more vague promises. Every consultation automatically extracts dated prediction windows and tracks outcome accuracy against real life documents (PDFs, Visas, Offer Letters).",
    badge: "Proof Engine",
    color: "from-amber-500/20 to-amber-700/20 border-amber-500/40 text-amber-300"
  },
  {
    icon: Bot,
    title: "AI Cosmic Twin & Memory Vault",
    subtitle: "Your Entire Life Decision Graph",
    description: "Deep RAG memory engine that indexes every past astrologer transcript, natal planetary transit, and remedy streak to give you instant, personalized life guidance.",
    badge: "AI Intelligence",
    color: "from-cyan-500/20 to-blue-600/20 border-cyan-400/40 text-cyan-300"
  },
  {
    icon: Cpu,
    title: "Spatial Lifestrand Canvas",
    subtitle: "4 Synchronized Layers of Life",
    description: "Experience your life decisions spatially across 4 synchronized timelines: Reality (Documents), Decisions (Choices), Time (Transits), and AI Learning.",
    badge: "Spatial OS",
    color: "from-emerald-500/20 to-teal-600/20 border-emerald-400/40 text-emerald-300"
  },
  {
    icon: ShieldCheck,
    title: "AstroVerified Expert Match",
    subtitle: "36 Gunas Ashtakoot Matchmaking",
    description: "Connect with top 1% verified Vedic astrologers with transparent pricing per minute, verified track records, and real-time encrypted video consultations.",
    badge: "Verified Experts",
    color: "from-purple-500/20 to-amber-600/20 border-amber-400/40 text-amber-300"
  }
]

const TIMELINE_STEPS = [
  {
    stage: "01 — Discovery",
    title: "Instant Birth Brief",
    desc: "Enter your birth date & time to unlock your natal planetary alignment and active 10th House transit window instantly.",
    highlight: "Zero Signup Friction"
  },
  {
    stage: "02 — Cosmic Identity",
    title: "Natal Kundli Architecture",
    desc: "Generate your complete Dasha timeline, planetary strength radar, and key aperture dates across career, wealth, and health.",
    highlight: "Precision Astrology"
  },
  {
    stage: "03 — Daily Companion",
    title: "Proactive AI Intelligence",
    desc: "Your AI Twin alerts you to upcoming transits, tracks remedy streaks, and answers questions using past session notes.",
    highlight: "Autonomous Guidance"
  },
  {
    stage: "04 — Consultation",
    title: "Encrypted HD Live Sessions",
    desc: "Book top-rated astrologers with live HD video, real-time AI transcript sync, and automatic claim extraction.",
    highlight: "100% Verified"
  },
  {
    stage: "05 — Growth Loop",
    title: "Evolving Decision Ledger",
    desc: "Every prediction is stored as a verifiable receipt. Upload outcome proofs (PDFs, Visas) to continuously improve future predictions.",
    highlight: "Immutable Proof"
  }
]

const FAQS = [
  {
    q: "Why AstroLive 2.0 instead of generic astrology apps like AstroTalk?",
    a: "Generic apps sell pay-per-minute calls that are forgotten immediately. AstroLive is the 'GitHub of your life decisions'. Every consultation creates data, every prediction is tracked as an immutable receipt, and your AI Cosmic Twin continuously learns to guide your future choices."
  },
  {
    q: "How does the Prediction Proof Ledger work?",
    a: "When a consultation ends, our AI engine automatically parses the transcript to extract exact dates and claims. A prediction receipt is created with a target window (e.g. Aug 20-25). When the date arrives, you can upload evidence (offer letter, visa stamp) to verify accuracy."
  },
  {
    q: "What is the Cosmic Document Vault?",
    a: "The vault allows you to securely attach real-life verification documents (PDF offer letters, marriage certificates, visa approvals) to your prediction receipts. All documents encrypt with 256-bit security."
  },
  {
    q: "Is my personal birth data and transcript private?",
    a: "Yes. All consultation audio, video feeds, and transcripts are end-to-end encrypted. Your natal Kundli data is never sold or shared with third parties."
  }
]

export function Landing() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-[#030508] text-[#F3F4F6] overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200 font-sans">
      
      {/* Background Ambient Spotlights */}
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-1/3 left-10 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ── Glass Navbar ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#090A0F]/80 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-all shadow-md shadow-amber-500/10">
              <Compass className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight">AstroLive</span>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[9px] font-mono">v2.0 OS</Badge>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#9CA3AF]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#timeline" className="hover:text-white transition-colors">Product Flow</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-mono text-[#9CA3AF] hover:text-white"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-amber-500 text-black font-bold hover:bg-amber-400 text-xs px-4 rounded-xl shadow-lg shadow-amber-500/20"
              onClick={() => navigate("/app/dashboard")}
            >
              Launch OS <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10">

        {/* ── Kokonut Style Hero Section ───────────────────────────── */}
        <section className="pt-20 pb-24 px-6 max-w-6xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-mono shadow-xl backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>The Temporal Operating System for Life Decisions</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              The GitHub of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Life Decisions</span>.
            </h1>

            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto">
              Every consultation creates data. Every prediction evolves. Every outcome is remembered. Every decision improves future guidance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-amber-500 text-black font-bold hover:bg-amber-400 text-sm px-8 rounded-xl shadow-xl shadow-amber-500/20"
                onClick={() => navigate("/app/dashboard")}
              >
                Launch Temporal OS <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-sm px-6 rounded-xl border-white/20 text-white"
                onClick={() => navigate("/app/predictions")}
              >
                Explore Prediction Ledger
              </Button>
            </div>
          </motion.div>

          {/* Interactive Hero Widget Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-8 max-w-4xl mx-auto"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090A0F]/90 border border-white/10 shadow-2xl backdrop-blur-2xl text-left space-y-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Live Natal Kundli Telemetry</h3>
                    <p className="text-[11px] font-mono text-[#9CA3AF]">Leo Sun · Scorpio Ascendant · Rahu Mahadasha</p>
                  </div>
                </div>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] uppercase font-mono">
                  Jupiter 10th House Trine Active
                </Badge>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-[#9CA3AF] uppercase block">Active Aperture</span>
                  <p className="text-sm font-bold text-amber-300">Aug 20–25, 2026</p>
                  <span className="text-[9px] text-emerald-400 block">88% Verified Confidence</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-[#9CA3AF] uppercase block">Current Remedy Streak</span>
                  <p className="text-sm font-bold text-white">Venus Beej Mantra</p>
                  <span className="text-[9px] text-amber-400 block">Day 11 / 21 Active</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-[#9CA3AF] uppercase block">Document Proof Status</span>
                  <p className="text-sm font-bold text-cyan-300">Cosmic Vault Synced</p>
                  <span className="text-[9px] text-[#9CA3AF] block">256-bit Encrypted PDF</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Kokonut Feature Cards Grid ───────────────────────────── */}
        <section id="features" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">System Architecture</p>
            <h2 className="text-3xl font-bold text-white">Built Like an Instrument, Not a SaaS Dashboard</h2>
            <p className="text-sm text-[#9CA3AF]">
              Designed around four core layers of life intelligence to replace generic AI chat screens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="p-8 rounded-3xl bg-[#090A0F]/90 border border-white/10 shadow-xl backdrop-blur-2xl hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-mono text-[10px]">
                    {f.badge}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-xs font-mono text-amber-400 mb-3">{f.subtitle}</p>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Product Flow Timeline ─────────────────────────────────── */}
        <section id="timeline" className="py-20 px-6 max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">Continuous Journey</p>
            <h2 className="text-3xl font-bold text-white">The Product Flow</h2>
            <p className="text-sm text-[#9CA3AF]">One seamless story from initial discovery to immutable proof.</p>
          </div>

          <div className="space-y-6 relative before:absolute before:left-4 sm:before:left-1/2 before:top-0 before:bottom-0 before:w-[1px] before:bg-white/10">
            {TIMELINE_STEPS.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative flex flex-col sm:flex-row items-start gap-6 sm:gap-12"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-bold font-mono text-xs flex items-center justify-center shrink-0 z-10 shadow-lg">
                  {idx + 1}
                </div>

                <div className="flex-1 p-6 rounded-2xl bg-[#090A0F]/90 border border-white/10 shadow-xl backdrop-blur-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">{s.stage}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {s.highlight}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Kokonut Interactive FAQ ───────────────────────────────── */}
        <section id="faq" className="py-20 px-6 max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">Clear Answers</p>
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#090A0F]/90 border border-white/10 overflow-hidden transition-all shadow-lg"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-6 text-xs text-[#9CA3AF] leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ── Kokonut Final CTA Banner ───────────────────────────────── */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-amber-500/10 via-[#090A0F] to-black border border-amber-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mx-auto shadow-xl">
              <Compass className="w-8 h-8" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to Upgrade Your Life Decisions?
            </h2>
            <p className="text-sm text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
              Experience the first Temporal Operating System built around verified prediction receipts and proactive AI intelligence.
            </p>

            <Button
              size="lg"
              className="bg-amber-500 text-black font-bold hover:bg-amber-400 text-sm px-8 rounded-xl shadow-xl shadow-amber-500/20"
              onClick={() => navigate("/app/dashboard")}
            >
              Launch AstroLive 2.0 Free <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </section>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.08] bg-[#090A0F] py-12 px-6 text-xs text-[#9CA3AF]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold">
              <Compass className="w-4 h-4 text-amber-400" /> AstroLive 2.0
            </div>
            <p className="text-[11px] leading-relaxed">
              The Temporal Operating System for verified life decisions & planetary intelligence.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase font-bold text-white mb-3 tracking-widest">Operating Suite</h4>
            <ul className="space-y-2">
              <li><Link to="/app/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/app/companion" className="hover:text-white transition-colors">AI Cosmic Twin</Link></li>
              <li><Link to="/app/predictions" className="hover:text-white transition-colors">Prediction Proof Ledger</Link></li>
              <li><Link to="/app/match" className="hover:text-white transition-colors">Smart Match</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase font-bold text-white mb-3 tracking-widest">Intelligence</h4>
            <ul className="space-y-2">
              <li><Link to="/app/memory" className="hover:text-white transition-colors">Cosmic Memory</Link></li>
              <li><Link to="/app/brief" className="hover:text-white transition-colors">Daily Brief</Link></li>
              <li><Link to="/app/verified" className="hover:text-white transition-colors">AstroVerified</Link></li>
              <li><Link to="/app/journey" className="hover:text-white transition-colors">Life Journey</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase font-bold text-white mb-3 tracking-widest">Security & Proof</h4>
            <div className="space-y-2 text-[11px]">
              <p className="flex items-center gap-1.5 text-emerald-400"><Lock className="w-3.5 h-3.5" /> 256-bit Document Vault</p>
              <p className="flex items-center gap-1.5 text-amber-400"><Zap className="w-3.5 h-3.5" /> Immutable Claim Receipts</p>
              <p className="flex items-center gap-1.5 text-cyan-400"><Globe className="w-3.5 h-3.5" /> Encrypted Live Telehealth</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px]">
          <span>© 2026 AstroLive Inc. All rights reserved.</span>
          <span>System Status: 100% Operational · 120° Trine Sync</span>
        </div>
      </footer>

    </div>
  )
}

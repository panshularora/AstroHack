import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { CosmicRing } from "@/components/ui/CosmicRing"
import { Card, CardContent } from "@/components/ui/Card"
import { ArrowRight, Star, Bell } from "lucide-react"

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-light rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-6 mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-line text-sm font-medium text-ink-secondary">
            <Star className="w-4 h-4" />
            <span>The Future of Astrology</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-brand/50 to-secondary">
            Your Cosmic Journey Doesn't End After One Consultation.
          </h1>
          <p className="text-lg text-secondary-text max-w-xl leading-relaxed">
            AstroLive 2.0 transforms astrology from one-time readings into continuous personalized guidance, powered by AI memory, prediction tracking, and trusted astrologers.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base" onClick={() => navigate('/signup')}>
              Start Your Journey <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base text-white border-line-strong hover:bg-surface-3" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center items-center relative"
        >
          <CosmicRing intensity="high" className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]" />

          {/* Floating Brief Card inside/over the ring */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute z-20 w-80 shadow-2xl"
          >
            <Card className="bg-surface/70 backdrop-blur-xl border-line-strong">
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-line/60 pb-3">
                  <span className="text-sm font-semibold text-ink-secondary">Daily Cosmic Brief</span>
                  <span className="text-xs text-secondary-text">Today</span>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">
                  Jupiter transits your 10th house. A powerful alignment favors bold career moves.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
                    <Star className="w-4 h-4 text-gold" />
                    <span className="text-xs font-medium">1 Active Prediction</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
                    <Bell className="w-4 h-4 text-brand" />
                    <span className="text-xs font-medium">Check-in needed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

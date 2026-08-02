import { LandingNavbar } from "@/components/landing/LandingNavbar"
import { AnimatedHero } from "@/components/landing/AnimatedHero"
import { CoreFeatures } from "@/components/landing/CoreFeatures"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/landing/Footer"

export function Landing() {
  return (
    <div className="min-h-screen bg-canvas text-ink overflow-x-hidden">
      <LandingNavbar />
      <main>
        <AnimatedHero />
        <CoreFeatures />
        <TestimonialsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
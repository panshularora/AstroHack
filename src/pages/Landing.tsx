import { LandingNavbar } from "@/components/landing/LandingNavbar"
import { AnimatedHero } from "@/components/landing/AnimatedHero"
import { DemoStorySection } from "@/components/landing/DemoStorySection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/landing/Footer"

export function Landing() {
  return (
    <div className="min-h-screen bg-canvas text-ink overflow-x-hidden">
      <LandingNavbar />
      <main>
        <AnimatedHero />
        <DemoStorySection />
        <TestimonialsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

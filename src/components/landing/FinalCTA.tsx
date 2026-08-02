import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function FinalCTA() {
  const navigate = useNavigate()

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="cosmic-hero py-20 px-6 text-center"
        >
          {/* Subtle background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-brand/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink mb-4 text-balance">
              Begin your cosmic journey today.
            </h2>
            <p className="text-lg text-ink-secondary leading-relaxed max-w-xl mx-auto mb-8">
              Join thousands who've turned astrology into a continuous, intelligent practice. Free to start, premium when you're ready.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="bg-brand hover:bg-brand-hover text-white rounded-md" onClick={() => navigate("/signup")}>
                Get started free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-md" onClick={() => navigate("/login")}>
                Sign in
              </Button>
            </div>
            <p className="mt-6 text-[13px] text-ink-tertiary">
              No credit card required · Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
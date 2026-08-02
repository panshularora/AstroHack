import { Link } from "react-router-dom"

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Astrologers", href: "#astrologers" },
    { label: "AI Companion", href: "#" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
    { label: "Cookies", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <span className="text-[15px] font-semibold tracking-tight">AstroLive</span>
            </Link>
            <p className="text-sm text-ink-secondary leading-relaxed max-w-xs">
              Astrology, reimagined as a continuous, intelligent life companion.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-[13px] font-semibold text-ink mb-3">{category}</p>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-ink-secondary hover:text-ink transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-ink-tertiary">
            © 2026 AstroLive. All rights reserved.
          </p>
          <p className="text-[13px] text-ink-tertiary">
            Made with care for the cosmos.
          </p>
        </div>
      </div>
    </footer>
  )
}
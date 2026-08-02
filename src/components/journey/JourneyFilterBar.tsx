import { motion } from 'framer-motion'

export function JourneyFilterBar({ categories, active, onChange }: { categories: string[], active: string, onChange: (c: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-white/5 relative z-20 bg-background/80 backdrop-blur-md px-6 -mx-6 pt-4 sticky top-0">
      {categories.map(c => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap relative ${
            active === c ? 'text-white' : 'text-[#9CA3AF] hover:text-white bg-white/5 hover:bg-white/10'
          }`}
        >
          {active === c && (
            <motion.div
              layoutId="filter-pill"
              className="absolute inset-0 bg-primary/20 border border-primary/50 rounded-full"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{c}</span>
        </button>
      ))}
    </div>
  )
}

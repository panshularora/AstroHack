import { Filter, Search, ChevronDown } from "lucide-react"

export function DirectoryFilters() {
  return (
    <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-white/10 py-4 mb-10 -mx-4 px-4 md:mx-0 md:px-0 md:rounded-2xl md:border-x">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search by name or specialization..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-[#9CA3AF]/70 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filters
          </div>
          
          {['Specialization', 'Accuracy (90%+)', 'Price', 'Availability', 'Trust Score'].map(filter => (
            <button 
              key={filter}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-colors shrink-0 whitespace-nowrap cursor-pointer"
            >
              {filter} <ChevronDown className="w-3 h-3 text-[#9CA3AF]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

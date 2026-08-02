import { Palette, Type, Monitor, Sun, Moon } from "lucide-react"

export function AppearanceSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Appearance & Accessibility</h2>
        <p className="text-[#9CA3AF]">Customize how AstroLive looks and feels.</p>
      </div>

      <div className="bg-surface border border-line rounded-lg p-6 md:p-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-brand" /> Theme
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center gap-3 p-4 bg-surface-2 border border-line rounded-lg hover:border-brand transition-colors">
              <div className="w-full h-16 rounded-xl bg-background border border-line flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-bold text-white">Dark</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-4 bg-surface-2 border border-line rounded-lg opacity-50 cursor-not-allowed">
              <div className="w-full h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                <Sun className="w-6 h-6 text-black" />
              </div>
              <span className="text-sm font-bold text-white">Light (Soon)</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-4 bg-white/10 border border-brand rounded-lg">
              <div className="w-full h-16 rounded-xl bg-gradient-to-r from-background to-white border border-line-strong flex items-center justify-center shadow-inner">
                <Monitor className="w-6 h-6 text-brand" />
              </div>
              <span className="text-sm font-bold text-brand">System</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-brand" /> Accessibility
          </h3>
          
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-line-subtle hover:bg-surface-3 transition-colors">
            <div>
              <div className="font-bold text-white mb-1">Dyslexia-friendly Font</div>
              <div className="text-xs text-[#9CA3AF]">Switch to a highly legible typeface.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-line-subtle hover:bg-surface-3 transition-colors">
            <div>
              <div className="font-bold text-white mb-1">Reduced Motion</div>
              <div className="text-xs text-[#9CA3AF]">Disable non-essential animations.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

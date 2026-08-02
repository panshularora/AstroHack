import { Download, FileJson, FileText, AlertTriangle, UserX } from "lucide-react"

export function DataManagement() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Data Management</h2>
        <p className="text-[#9CA3AF]">Export your history or manage your account status.</p>
      </div>

      <div className="bg-surface border border-line rounded-lg p-6 md:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-brand" /> Export Cosmic Memory
        </h3>
        
        <p className="text-sm text-[#9CA3AF] mb-6 leading-relaxed">
          Download a complete archive of your AstroLive journey, including consultations, predictions, remedies, and journal entries.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <button className="flex items-center gap-4 p-4 bg-surface-2 border border-line rounded-lg hover:bg-surface-3 transition-colors text-left group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="font-bold text-white mb-1">Export as PDF</div>
              <div className="text-xs text-[#9CA3AF]">Formatted for reading</div>
            </div>
          </button>
          <button className="flex items-center gap-4 p-4 bg-surface-2 border border-line rounded-lg hover:bg-surface-3 transition-colors text-left group">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileJson className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="font-bold text-white mb-1">Export as JSON</div>
              <div className="text-xs text-[#9CA3AF]">Raw data format</div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-6 md:p-8 space-y-6">
        <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5" /> Danger Zone
        </h3>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-black/20 rounded-lg border border-red-500/10 gap-4">
          <div>
            <div className="font-bold text-white mb-1">Suspend Account</div>
            <div className="text-xs text-[#9CA3AF]">Temporarily disable your profile and notifications.</div>
          </div>
          <button className="px-4 py-2 bg-white/5 text-white text-sm font-bold rounded-xl border border-line hover:bg-surface-3 whitespace-nowrap transition-colors">
            Suspend Account
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20 gap-4 hover:bg-red-500/20 transition-colors">
          <div>
            <div className="font-bold text-white mb-1">Delete Account</div>
            <div className="text-xs text-red-200/70 max-w-sm">Permanently delete your account, Cosmic Memory, and all associated data. This action cannot be undone.</div>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 whitespace-nowrap flex items-center gap-2 transition-colors">
            <UserX className="w-4 h-4" /> Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

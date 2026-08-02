import { mockUserSettings } from "@/lib/mock-data"
import { Database, Target, Book, MessageSquare, Trash2, ShieldAlert } from "lucide-react"

export function MemoryManagement() {
  const { memoryUsage } = mockUserSettings

  const categories = [
    { name: "Consultation History", count: memoryUsage.consultations, icon: <Database className="w-5 h-5 text-blue-400" /> },
    { name: "Prediction Records", count: memoryUsage.predictions, icon: <Target className="w-5 h-5 text-primary" /> },
    { name: "Remedy Logs", count: memoryUsage.remedies, icon: <ShieldAlert className="w-5 h-5 text-green-400" /> },
    { name: "Journal & Mood", count: memoryUsage.journalEntries, icon: <Book className="w-5 h-5 text-gold" /> },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">AI Memory Management</h2>
        <p className="text-[#9CA3AF]">You are in complete control of what the AI Companion remembers.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-white">Total Cosmic Memory</h3>
            <p className="text-sm text-[#9CA3AF]">Used: {memoryUsage.totalStorage}</p>
          </div>
          <button className="px-4 py-2 bg-red-500/10 text-red-400 text-sm font-bold rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Clear All Memory
          </button>
        </div>

        <div className="space-y-4">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/5">
                  {cat.icon}
                </div>
                <div>
                  <div className="font-bold text-white">{cat.name}</div>
                  <div className="text-xs text-[#9CA3AF]">{cat.count} records stored</div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-3 py-1.5 text-xs font-bold text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors">Review</button>
                <button className="px-3 py-1.5 text-xs font-bold text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 border border-red-500/20 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-xl flex gap-3">
          <MessageSquare className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-white/90 leading-relaxed">
            <strong>How memory works:</strong> The AI Companion uses these records to provide highly personalized daily briefs and context-aware advice during chats. Deleting records will permanently remove them from the AI's awareness.
          </p>
        </div>
      </div>
    </div>
  )
}

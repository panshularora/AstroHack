import { mockSuccessStories } from "@/lib/mock-data"
import { Quote } from "lucide-react"

export function SuccessStories() {
  return (
    <div className="mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Journeys Transformed</h2>
        <p className="text-[#9CA3AF]">Real stories of long-term growth powered by AstroLive+.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {mockSuccessStories.map(story => (
          <div key={story.id} className="bg-white/5 border border-white/10 rounded-3xl p-8 relative hover:bg-white/10 transition-colors">
            <Quote className="absolute top-8 right-8 w-8 h-8 text-white/10" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {story.image}
              </div>
              <div>
                <div className="font-bold text-white">{story.name}</div>
                <div className="text-xs text-[#9CA3AF]">{story.role}</div>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed italic mb-6">"{story.quote}"</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20 text-xs font-bold text-green-400">
              {story.milestone}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

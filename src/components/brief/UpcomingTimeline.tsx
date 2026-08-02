import { Clock, Star, Users } from "lucide-react"

export function UpcomingTimeline() {
  const events = [
    { day: "Today", time: "2:00 PM", title: "Jupiter Enters 10th House", type: "transit", icon: <Star className="w-4 h-4 text-gold" /> },
    { day: "Aug 15", time: "Prediction", title: "Tech Job Offer Window Opens", type: "prediction", icon: <Clock className="w-4 h-4 text-brand" /> },
    { day: "Aug 22", time: "11:00 AM", title: "Follow-up with Dr. Sarah", type: "consultation", icon: <Users className="w-4 h-4 text-blue-400" /> },
  ]

  return (
    <div className="bg-surface border border-line rounded-lg p-6 md:p-8 h-full">
      <h3 className="text-lg font-bold text-white mb-8">Upcoming Events</h3>
      
      <div className="relative pl-6 border-l-2 border-line/60 space-y-8">
        {events.map((event, i) => (
          <div key={i} className="relative group cursor-pointer">
            <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-[#1a1b26] border border-line flex items-center justify-center group-hover:border-brand/50 transition-colors">
              {event.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">
                {event.day} • {event.time}
              </span>
              <span className="text-sm font-medium text-white group-hover:text-brand transition-colors">
                {event.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

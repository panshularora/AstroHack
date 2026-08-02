import { mockUserSettings } from "@/lib/mock-data"
import { Button } from "@/components/ui/Button"
import { Camera, Mail, Phone, Calendar, CreditCard } from "lucide-react"

export function AccountManagement() {
  const { profile } = mockUserSettings

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Account Management</h2>
        <p className="text-[#9CA3AF]">Manage your personal information and subscription status.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-3xl p-8 flex items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {profile.avatar}
          </div>
          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">{profile.name}</h3>
          <div className="inline-flex px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/30">
            {profile.plan}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-white/10 rounded-3xl p-6">
          <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Contact Details</h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#9CA3AF] flex items-center gap-2 mb-2"><Mail className="w-3 h-3" /> Email Address</label>
              <input type="email" defaultValue={profile.email} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="text-xs text-[#9CA3AF] flex items-center gap-2 mb-2"><Phone className="w-3 h-3" /> Phone Number</label>
              <input type="tel" defaultValue={profile.phone} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
            </div>
            <Button className="w-full">Save Changes</Button>
          </div>
        </div>

        <div className="bg-card border border-white/10 rounded-3xl p-6">
          <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Subscription & Billing</h4>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-sm font-bold text-white">Member Since</div>
                  <div className="text-xs text-[#9CA3AF]">{profile.memberSince}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gold" />
                <div>
                  <div className="text-sm font-bold text-white">Current Plan</div>
                  <div className="text-xs text-[#9CA3AF]">{profile.plan}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

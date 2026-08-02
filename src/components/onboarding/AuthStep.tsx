import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Mail, ArrowRight, User, Phone } from 'lucide-react'

export function AuthStep({ onNext, onBack, updateData }: { onNext: () => void, onBack: () => void, updateData: (d: any) => void }) {
  const [name, setName] = useState('Arjun Sharma')
  const [email, setEmail] = useState('arjun.sharma@example.com')
  const [phone, setPhone] = useState('+1 (555) 382-9102')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      updateData({ name, email, phone })
      onNext()
    }
  }

  return (
    <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full relative min-h-screen justify-center">
      <div className="bg-card border border-white/10 rounded-[32px] p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
            <p className="text-[#9CA3AF] text-sm">Begin your lifelong cosmic journey with AstroLive.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-primary" /> Full Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Arjun Sharma"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" 
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" /> Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="arjun.sharma@example.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" 
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-green-400" /> Phone Number
              </label>
              <input 
                type="tel" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 (555) 382-9102"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm" 
                required
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full group font-bold shadow-[0_0_20px_rgba(107,33,168,0.4)]">
                Continue to Birth Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-[#9CA3AF] text-[10px] uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={onNext} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white font-medium text-sm">
              Google
            </button>
            <button type="button" onClick={onNext} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white font-medium text-sm">
              Apple
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button onClick={onBack} className="text-[#9CA3AF] hover:text-white transition-colors text-sm font-medium">
          ← Back to Features
        </button>
      </div>
    </div>
  )
}

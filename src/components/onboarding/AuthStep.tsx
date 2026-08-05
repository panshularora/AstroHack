import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Mail, ArrowRight, User, Phone } from 'lucide-react'

export function AuthStep({ onNext, onBack, updateData }: { onNext: () => void, onBack: () => void, updateData: (d: any) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      updateData({ 
        name: name.trim(), 
        email: email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, '.')}@astrolive.io`, 
        phone: phone.trim() || "+1 (555) 019-2831" 
      })
      onNext()
    }
  }

  return (
    <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full relative min-h-screen justify-center font-sans">
      <div className="bg-[#090A0F] border border-white/10 rounded-[32px] p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-cyan-500/10 pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Your Account</h2>
            <p className="text-[#9CA3AF] text-xs font-mono">Enter your details to calculate your real astrological birth chart.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-amber-400" /> Full Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your full name..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors text-xs" 
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors text-xs" 
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> Phone Number
              </label>
              <input 
                type="tel" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-colors text-xs" 
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full group font-bold bg-amber-500 text-black hover:bg-amber-400 rounded-xl text-xs py-3">
                Continue to Birth Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button onClick={onBack} className="text-[#9CA3AF] hover:text-white transition-colors text-xs font-mono">
          ← Back to Features
        </button>
      </div>
    </div>
  )
}

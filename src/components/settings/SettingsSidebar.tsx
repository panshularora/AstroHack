import { User, Moon, Brain, Shield, Lock, Bell, Palette, Database, Link, Info } from "lucide-react"

export type SettingsCategory = 'account' | 'astrology' | 'memory' | 'privacy' | 'security' | 'notifications' | 'appearance' | 'data' | 'connected' | 'about'

interface SettingsSidebarProps {
  activeCategory: SettingsCategory
  onSelectCategory: (category: SettingsCategory) => void
}

export function SettingsSidebar({ activeCategory, onSelectCategory }: SettingsSidebarProps) {
  const categories: { id: SettingsCategory, label: string, icon: React.ReactNode }[] = [
    { id: 'account', label: 'Account Management', icon: <User className="w-4 h-4" /> },
    { id: 'astrology', label: 'Astrology Profile', icon: <Moon className="w-4 h-4" /> },
    { id: 'memory', label: 'AI Memory Management', icon: <Brain className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy & Permissions', icon: <Shield className="w-4 h-4" /> },
    { id: 'security', label: 'Security Center', icon: <Lock className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notification Settings', icon: <Bell className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'data', label: 'Data Management', icon: <Database className="w-4 h-4" /> },
    { id: 'connected', label: 'Connected Services', icon: <Link className="w-4 h-4" /> },
    { id: 'about', label: 'About AstroLive', icon: <Info className="w-4 h-4" /> },
  ]

  return (
    <div className="bg-surface border border-line rounded-lg p-4 flex flex-col gap-1 sticky top-24">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left w-full ${
            activeCategory === cat.id 
              ? 'bg-white/10 text-white border border-line-subtle shadow-inner' 
              : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white border border-transparent'
          }`}
        >
          {cat.icon}
          {cat.label}
        </button>
      ))}
    </div>
  )
}

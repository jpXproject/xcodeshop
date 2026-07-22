import { Bell, ShieldCheck, SlidersHorizontal, Sparkles } from 'lucide-react'

const settings = [
  { title: 'Notifications', state: 'Enabled', icon: Bell },
  { title: 'Security', state: '2FA active', icon: ShieldCheck },
  { title: 'Integration', state: 'Connected', icon: Sparkles },
  { title: 'Preferences', state: 'Dark mode', icon: SlidersHorizontal },
]

export default function QuickSettings() {
  return (
    <div className="rounded-xl border border-white/6 bg-slate-900/60 p-4 shadow-sm">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Quick settings</p>
        <h2 className="text-xl font-semibold text-white">Admin shortcuts</h2>
      </div>
      <div className="space-y-3">
        {settings.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 transition duration-300 hover:border-slate-400/20 hover:bg-slate-900/80">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800/70 text-sky-300">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-slate-400">{item.state}</p>
                </div>
              </div>
              <span className="text-slate-400">›</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { Clock4, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const activities = [
  { title: 'New order', value: '+18%', time: '2m ago', positive: true },
  { title: 'Stock alert', value: '-2%', time: '12m ago', positive: false },
  { title: 'New user signup', value: '+8%', time: '35m ago', positive: true },
]

export default function ActivityPanel() {
  return (
    <div className="rounded-xl border border-white/6 bg-slate-900/60 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Activity</p>
          <h2 className="text-xl font-semibold text-white">Latest updates</h2>
        </div>
        <Clock4 size={18} className="text-sky-300" />
      </div>
      <div className="space-y-3">
        {activities.map((item) => (
          <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 transition duration-300 hover:border-slate-400/20 hover:bg-slate-900/80">
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs text-slate-400">{item.time}</p>
            </div>
            <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${item.positive ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}>
              {item.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

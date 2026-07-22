import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
  { name: 'Mon', revenue: 80 },
  { name: 'Tue', revenue: 95 },
  { name: 'Wed', revenue: 70 },
  { name: 'Thu', revenue: 105 },
  { name: 'Fri', revenue: 110 },
  { name: 'Sat', revenue: 98 },
  { name: 'Sun', revenue: 120 },
]

export default function SalesChart() {
  return (
    <div className="rounded-xl border border-white/6 bg-slate-900/60 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Sales</p>
          <h2 className="text-xl font-semibold text-white">Weekly revenue</h2>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.12)' }} />
            <Line type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

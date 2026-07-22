import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Electronics', value: 40 },
  { name: 'Apparel', value: 25 },
  { name: 'Home', value: 20 },
  { name: 'Other', value: 15 },
]
const colors = ['#38bdf8', '#818cf8', '#a78bfa', '#f472b6']

export default function CategoryChart() {
  return (
    <div className="rounded-xl border border-white/6 bg-slate-900/60 p-4 shadow-sm">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Categories</p>
        <h2 className="text-xl font-semibold text-white">Product share</h2>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={48} outerRadius={84} paddingAngle={4}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.12)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

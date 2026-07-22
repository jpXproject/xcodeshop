"use client"

import { ReactNode } from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

type SeriesPoint = { x: number | string; y: number }

type Props = {
  icon: ReactNode
  title: string
  subtitle?: string
  value: string | number
  growth?: number
  data: SeriesPoint[]
  className?: string
}

export default function StatCard({ icon, title, subtitle, value, growth = 0, data, className = '' }: Props) {
  const growthPositive = growth >= 0

  return (
    <div className={`rounded-xl border border-white/6 bg-slate-900/60 p-4 shadow-sm transition-transform duration-300 hover:scale-[1.02] ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-800/60 p-2 text-sky-300">{icon}</div>
          <div>
            <div className="text-sm text-slate-400">{subtitle}</div>
            <div className="text-lg font-semibold text-white">{title}</div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className={`mt-1 text-sm ${growthPositive ? 'text-emerald-300' : 'text-rose-300'}`}> {growthPositive ? '▲' : '▼'} {Math.abs(growth)}%</div>
        </div>
      </div>

      <div className="mt-3 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Line type="monotone" dataKey="y" stroke="#06b6d4" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

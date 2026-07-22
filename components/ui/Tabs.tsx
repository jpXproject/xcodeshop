"use client"

import { useState } from 'react'

type Tab = { key: string; label: string }
type Props = {
  tabs: Tab[]
  defaultKey?: string
  onChange?: (key: string) => void
}

export default function Tabs({ tabs, defaultKey, onChange }: Props) {
  const [active, setActive] = useState(defaultKey || tabs[0]?.key)
  return (
    <div>
      <div className="flex items-center gap-2 border-b border-white/6 pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => { setActive(t.key); onChange?.(t.key) }}
            className={`rounded-xl px-3 py-1 text-sm transition duration-300 ${active === t.key ? 'bg-slate-800/60 text-white' : 'text-slate-400 hover:bg-slate-800/30'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

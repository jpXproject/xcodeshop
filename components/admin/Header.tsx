"use client"

import { Menu, Search, Bell, User } from 'lucide-react'

type Props = {
  collapsed: boolean
  onToggle: () => void
}

export default function Header({ collapsed, onToggle }: Props) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/6 bg-transparent p-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          aria-label="Toggle sidebar"
          className="rounded-lg p-2 text-slate-200 hover:bg-slate-800/40"
        >
          <Menu size={18} />
        </button>
        <div className="hidden sm:block">
          <h3 className="text-lg font-semibold text-white">Admin</h3>
          <p className="text-xs text-slate-400">Ringkasan & Manajemen</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <input className="w-72 rounded-full bg-slate-800/50 px-3 py-2 text-sm text-slate-200 outline-none" placeholder="Search..." />
          </label>
        </div>
        <button className="rounded-full p-2 text-slate-200 hover:bg-slate-800/40"><Bell size={16} /></button>
        <button className="rounded-full p-2 text-slate-200 hover:bg-slate-800/40"><User size={16} /></button>
      </div>
    </header>
  )
}

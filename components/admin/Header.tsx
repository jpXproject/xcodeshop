"use client"

import { useEffect, useState } from 'react'
import { Menu, Bell, User, SunMoon } from 'lucide-react'
import { Dropdown, Switch, Avatar, SearchBox } from '@/components/ui'

type Props = {
  collapsed: boolean
  onToggle: () => void
}

export default function Header({ collapsed, onToggle }: Props) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const theme = globalThis.localStorage?.getItem('theme')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }, [])

  const toggleDark = (v?: boolean) => {
    const next = typeof v === 'boolean' ? v : !darkMode
    setDarkMode(next)
    try {
      if (next) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      globalThis.localStorage?.setItem('theme', next ? 'dark' : 'light')
    } catch {}
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-slate-900/60 border-b border-white/6">
      <div className="flex items-center justify-between gap-4 p-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            aria-label="Toggle sidebar"
            className="rounded-lg p-2 text-slate-200 hover:bg-slate-800/40 transition duration-300"
          >
            <Menu size={18} />
          </button>

          <div className="hidden sm:block">
            <h3 className="text-lg font-semibold text-white">Admin</h3>
            <p className="text-xs text-slate-400">Ringkasan & Manajemen</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search - visible on md+ */}
          <div className="hidden md:block">
            <SearchBox placeholder="Search products, orders..." />
          </div>

          {/* Mobile search toggle */}
          <button
            onClick={() => setMobileSearchOpen((s) => !s)}
            className="md:hidden rounded-full p-2 text-slate-200 hover:bg-slate-800/40 transition duration-300"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </button>

          {/* Notifications */}
          <Dropdown
            trigger={<button className="rounded-full p-2 text-slate-200 hover:bg-slate-800/40 transition duration-300"><Bell size={16} /></button>}
            align="right"
          >
            <div className="p-3">
              <p className="text-sm font-medium text-white">Notifications</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li className="rounded-md px-2 py-2 hover:bg-slate-800/40">New order received</li>
                <li className="rounded-md px-2 py-2 hover:bg-slate-800/40">Product stock low</li>
                <li className="rounded-md px-2 py-2 hover:bg-slate-800/40">New user signed up</li>
              </ul>
            </div>
          </Dropdown>

          {/* Dark mode */}
          <div className="hidden sm:flex items-center gap-2">
            <SunMoon className="text-slate-300" />
            <Switch checked={darkMode} onChange={toggleDark} />
          </div>

          {/* Profile dropdown */}
          <Dropdown
            trigger={<button className="rounded-full p-1 hover:bg-slate-800/40 transition duration-300"><Avatar name="Admin User" size={36} /></button>}
            align="right"
          >
            <div className="p-3 w-48">
              <div className="mb-2">
                <p className="text-sm font-semibold text-white">Admin User</p>
                <p className="text-xs text-slate-400">darryl@admin.com</p>
              </div>
              <div className="flex flex-col gap-2">
                <a className="rounded-md px-2 py-2 text-sm hover:bg-slate-800/40">Profile</a>
                <a className="rounded-md px-2 py-2 text-sm hover:bg-slate-800/40">Settings</a>
                <a className="rounded-md px-2 py-2 text-sm text-rose-400 hover:bg-slate-800/40">Log out</a>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <SearchBox placeholder="Search products, orders..." />
        </div>
      )}
    </header>
  )
}

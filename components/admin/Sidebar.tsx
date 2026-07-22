"use client"

import Link from 'next/link'
import { LayoutDashboard, Package, Settings, CreditCard, Users, LogOut } from 'lucide-react'

type Props = {
  collapsed: boolean
}

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Produk', href: '/admin/products', icon: Package },
  { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
  { name: 'Payment', href: '/admin/settings/payment', icon: CreditCard },
]

export default function Sidebar({ collapsed }: Props) {
  return (
    <aside
      className={`flex flex-col h-full transition-all duration-200 ease-in-out ${
        collapsed ? 'w-20' : 'w-72'
      } bg-slate-900/70 border-r border-white/6 p-3 shadow-[10px_10px_30px_rgba(2,6,23,0.45)]`}
      aria-label="Sidebar"
    >
      <div className="mb-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl bg-slate-800/60 flex items-center justify-center text-sky-300`}>S</div>
          {!collapsed && <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">XShop</p>
            <h2 className="text-sm font-semibold text-white">Admin Panel</h2>
          </div>}
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-1" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition-colors ${
                collapsed ? 'justify-center' : ''
              } hover:bg-slate-800/50`}
            >
              <Icon size={18} className="text-sky-300" />
              {!collapsed && <span className="text-slate-200">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="mt-4 px-2">
        <button className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/50`}>
          <LogOut size={16} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  )
}

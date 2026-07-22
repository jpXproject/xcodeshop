"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  Settings,
  CreditCard,
  Users,
  LogOut,
  Layers,
  ShoppingBag,
  FileText,
  BarChart3,
  FilePieChart,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

type Props = {
  collapsed: boolean
}

type NavItem = {
  name: string
  href?: string
  icon: typeof LayoutDashboard
  children?: Array<{ name: string; href: string; icon: typeof LayoutDashboard }>
}

const menuSections: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  {
    name: 'Catalog',
    icon: ShoppingBag,
    children: [
      { name: 'Products', href: '/admin/products', icon: Package },
      { name: 'Categories', href: '/admin/categories', icon: Layers },
    ],
  },
  { name: 'Orders', href: '/admin/orders', icon: CreditCard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'Payment', href: '/admin/settings/payment', icon: CreditCard },
  {
    name: 'Analytics',
    icon: BarChart3,
    children: [{ name: 'Reports', href: '/admin/reports', icon: FilePieChart }],
  },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function Sidebar({ collapsed }: Props) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Catalog: true,
    Analytics: false,
  })

  const toggleSection = (key: string) => {
    setOpenSections((current) => ({ ...current, [key]: !current[key] }))
  }

  const isActiveItem = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href)
  }

  return (
    <aside
      className={`flex flex-col h-full transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-72'} bg-slate-950/95 border-r border-white/10 shadow-[10px_10px_30px_rgba(0,0,0,0.40)]`}
      aria-label="Sidebar"
    >
      <div className="mb-6 flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-lg">
            <Sparkles size={20} />
          </div>
          {!collapsed && (
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Premium</p>
              <h1 className="text-base font-semibold text-white">XShop Admin</h1>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2" aria-label="Main navigation">
        <div className="space-y-2">
          {menuSections.map((section) => {
            const Icon = section.icon
            const hasChildren = Array.isArray(section.children) && section.children.length > 0
            const active = section.href ? isActiveItem(section.href) : section.children?.some((child) => isActiveItem(child.href))

            return (
              <div key={section.name} className="rounded-2xl">
                <div
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition duration-300 ${
                    active ? 'bg-slate-800/80 text-white shadow-[0_0_0_1px_rgba(56,189,248,0.25)]' : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${active ? 'bg-sky-500/15 text-sky-300' : 'bg-slate-800/60 text-slate-300'}`}>
                    <Icon size={18} />
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-1">{section.name}</span>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleSection(section.name)}
                          className="rounded-full p-1 text-slate-400 transition duration-300 hover:text-slate-200"
                          aria-label={`Toggle ${section.name}`}
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openSections[section.name] ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </>
                  )}
                </div>

                {hasChildren && openSections[section.name] && !collapsed ? (
                  <div className="overflow-hidden transition-all duration-300">
                    <div className="mt-2 space-y-2 rounded-2xl border border-white/6 bg-slate-950/80 p-2">
                      {section.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition duration-300 ${
                            isActiveItem(child.href) ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                          }`}
                        >
                          <child.icon size={16} className="text-slate-400" />
                          <span>{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </nav>

      <div className="mt-auto px-4 pb-4">
        <button className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-300 transition duration-300 hover:bg-slate-800/40 ${collapsed ? 'justify-center' : ''}`}>
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

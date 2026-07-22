import Link from 'next/link'
import {
  LayoutDashboard,
  Package,
  Settings,
  CreditCard,
  Home,
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Produk', href: '/admin/products', icon: Package },
    { name: 'Pengaturan Umum', href: '/admin/settings', icon: Settings },
    { name: 'Payment', href: '/admin/settings/payment', icon: CreditCard },
  ]

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_#1f2937,_#0f172a_60%)] text-slate-100">
      <aside className="flex w-72 flex-col border-r border-white/10 bg-slate-900/70 p-4 shadow-[10px_10px_30px_rgba(2,6,23,0.45)] backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-4 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.05),inset_-2px_-2px_6px_rgba(15,23,42,0.6)]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">XShop</p>
            <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-sky-400 hover:text-sky-300">
            <Home size={18} />
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-sky-400/50 hover:bg-slate-700/80 hover:text-white"
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-xs text-slate-400 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_6px_rgba(15,23,42,0.5)]">
          Admin Panel • v1.0
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-transparent p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-6">{children}</div>
      </main>
    </div>
  )
}
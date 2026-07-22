import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { LayoutDashboard, Package, Settings } from 'lucide-react'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  const [{ count: productsCount }, { count: categoriesCount }, { count: settingsCount }] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact' }),
    supabase.from('categories').select('id', { count: 'exact' }),
    supabase.from('settings').select('id', { count: 'exact' }),
  ])

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-[12px_12px_40px_rgba(0,0,0,0.45)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Admin dashboard</p>
            <h1 className="text-3xl font-bold text-white">Ringkasan Toko</h1>
          </div>
          <div className="flex items-center gap-4">
            <img src="/assets/admin-dashboard.png" alt="Ilustrasi dashboard" className="hidden lg:block h-28 w-auto rounded-lg object-cover shadow-lg" />
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/products" className="rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                Produk
              </Link>
              <Link href="/admin/settings" className="rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                Pengaturan Umum
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {[
          { label: 'Produk', value: productsCount ?? 0, icon: Package },
          { label: 'Kategori', value: categoriesCount ?? 0, icon: LayoutDashboard },
          { label: 'Pengaturan', value: settingsCount ?? 0, icon: Settings },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[inset_2px_2px_10px_rgba(255,255,255,0.04)]">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-slate-800/80 p-3 text-sky-300">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Link href="/admin/settings" className="rounded-[28px] border border-sky-500/20 bg-slate-900/70 p-6 text-white transition hover:bg-slate-800">
          <h2 className="text-xl font-semibold">Pengaturan Umum</h2>
          <p className="mt-3 text-slate-400">Kelola judul, header sumber, dan aset visual untuk homepage.</p>
        </Link>
        <Link href="/admin/settings/payment" className="rounded-[28px] border border-violet-500/20 bg-slate-900/70 p-6 text-white transition hover:bg-slate-800">
          <h2 className="text-xl font-semibold">Pengaturan Payment</h2>
          <p className="mt-3 text-slate-400">Atur gateway dan API key untuk pembayaran.</p>
        </Link>
      </div>
    </div>
  )
}

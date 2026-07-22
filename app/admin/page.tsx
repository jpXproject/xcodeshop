import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import DashboardStats from '@/components/dashboard/DashboardStats'
import RecentOrders from '@/components/dashboard/RecentOrders'
import SalesChart from '@/components/dashboard/SalesChart'
import CategoryChart from '@/components/dashboard/CategoryChart'
import ActivityPanel from '@/components/dashboard/ActivityPanel'
import PaymentOverview from '@/components/dashboard/PaymentOverview'
import QuickSettings from '@/components/dashboard/QuickSettings'

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
  
  // load some recent products to show in the dashboard table
  const { data: productsData } = await supabase
    .from('products')
    .select('id, name, category, price, stock, status, image_url')
    .order('created_at', { ascending: false })
    .limit(10)

  // (no dashboard illustration image required — design uses gradients and cards)

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-[12px_12px_40px_rgba(0,0,0,0.45)] relative overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Admin dashboard</p>
            <h1 className="text-3xl font-bold text-white">Ringkasan Toko</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block h-28 w-40 rounded-lg bg-gradient-to-tr from-sky-600/10 to-violet-500/6 shadow-[0_10px_30px_rgba(34,211,238,0.04)]" aria-hidden />
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/products" className="rounded-full bg-gradient-to-br from-slate-800/80 to-slate-700/70 px-4 py-2 text-sm font-semibold text-white transition hover:from-sky-500/80">
                Produk
              </Link>
              <Link href="/admin/settings" className="rounded-full bg-gradient-to-br from-slate-800/80 to-slate-700/70 px-4 py-2 text-sm font-semibold text-white transition hover:from-sky-500/80">
                Pengaturan Umum
              </Link>
            </div>
          </div>
        </div>
      </div>

      <DashboardStats revenue="Rp 236.227.750" products={productsCount ?? 0} categories={categoriesCount ?? 0} orders={98} />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 grid gap-6 grid-cols-1 md:grid-cols-2">
          <RecentOrders />
          <SalesChart />
          <CategoryChart />
          <ActivityPanel />
        </div>

        <div className="lg:col-span-4 grid gap-6">
          <PaymentOverview />
          <QuickSettings />
        </div>
      </div>
    </div>
  )
}

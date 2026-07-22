import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { LayoutDashboard, Package, Settings, ShoppingCart, Users } from 'lucide-react'

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

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="col-span-12 xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Total Sales', value: 'Rp 236.227.750,00', meta: '+18% this month' },
              { title: 'Active Products', value: productsCount ?? 0, meta: 'Added 12 new items' },
              { title: 'New Categories', value: categoriesCount ?? 0, meta: '5 active subcategories' },
              { title: 'Recent Orders', value: 98, meta: '+5% last week' },
            ].map((card) => (
              <div key={card.title} className="rounded-[22px] border border-white/6 bg-gradient-to-b from-slate-900/70 to-slate-800/60 p-4 shadow-[0_10px_30px_rgba(2,6,23,0.6)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-400">{card.title}</p>
                    <p className="mt-2 text-2xl font-bold text-white">{card.value}</p>
                    <p className="mt-1 text-sm text-slate-400">{card.meta}</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-tr from-sky-500/20 to-violet-400/10 p-2 text-sky-300">
                    <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="36" height="24" rx="6" fill="url(#g)" />
                      <defs>
                        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#06b6d4" stopOpacity="0.18" />
                          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.12" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[20px] border border-white/8 bg-slate-900/60 p-4 shadow-[inset_2px_2px_12px_rgba(255,255,255,0.02)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Manajemen Produk & Kategori</h2>
              <div className="flex gap-2">
                <Link href="/admin/products" className="px-3 py-2 rounded bg-slate-800/70 text-sm text-white">Add Product</Link>
                <Link href="/admin/settings" className="px-3 py-2 rounded bg-slate-800/70 text-sm text-white">Add Category</Link>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[900px] table-auto text-left">
                <thead>
                  <tr className="text-slate-400 text-sm">
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Product Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {Array.isArray(productsData) && productsData.length > 0 ? (
                    productsData.map((p: any) => (
                      <tr key={p.id} className="border-t border-white/6">
                        <td className="px-4 py-3 text-slate-300">{p.id}</td>
                        <td className="px-4 py-3 text-slate-300">{p.name}</td>
                        <td className="px-4 py-3 text-slate-300">{p.category}</td>
                        <td className="px-4 py-3 text-slate-300">{p.price}</td>
                        <td className="px-4 py-3 text-slate-300">{p.stock}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block rounded-full px-2 py-1 text-xs ${p.stock > 0 ? 'bg-emerald-600/20 text-emerald-300' : 'bg-rose-600/20 text-rose-300'}`}>
                            {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-300">•••</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-slate-400">Belum ada produk</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="col-span-12 xl:col-span-4 space-y-6">
          <div className="rounded-[20px] border border-white/8 bg-slate-900/60 p-4">
            <h3 className="text-white font-semibold">Common Setting Overview</h3>
            <div className="mt-3 text-sm text-slate-400">Website Status</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-slate-300">Payment Gateways</div>
              <div className="text-sm text-slate-300">Enabled</div>
            </div>
          </div>

          <div className="rounded-[20px] border border-white/8 bg-slate-900/60 p-4">
            <h3 className="text-white font-semibold">Payment Gateways Quick View</h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-300">
              <li className="flex items-center justify-between">
                <div>Midtrans Gateway (IDR)</div>
                <div className="text-emerald-400">Enabled</div>
              </li>
              <li className="flex items-center justify-between">
                <div>QRIS Payment</div>
                <div className="text-emerald-400">Enabled</div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

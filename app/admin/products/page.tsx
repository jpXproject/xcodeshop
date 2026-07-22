import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import ProductList from './ProductList'
import AddProductForm from './AddProductForm'

export default async function ProductsPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  // Ambil semua produk + kategori untuk dropdown
  const { data: products } = await supabase
    .from('products')
    .select(`*, categories(name)`)
    .order('created_at', { ascending: false })

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-[12px_12px_40px_rgba(0,0,0,0.45)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Admin Produk</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Manajemen Produk</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Kelola produk, kategori, stok, status, dan impor/ekspor dalam satu dashboard yang cepat dan modern.</p>
          </div>
          <AddProductForm categories={categories || []} />
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <ProductList products={products || []} categories={categories || []} />
      </div>
    </div>
  )
}
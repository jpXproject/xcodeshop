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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Produk</h1>
        <AddProductForm categories={categories || []} />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ProductList products={products || []} categories={categories || []} />
      </div>
    </div>
  )
}
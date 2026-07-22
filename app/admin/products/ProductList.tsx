'use client'
import { createClient } from '@/lib/supabase/client'

export default function ProductList({ products, categories }: { products: any[], categories: any[] }) {
  const supabase = createClient()

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus produk ini?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) alert('Gagal hapus: ' + error.message)
    else window.location.reload()
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/70 shadow-[12px_12px_30px_rgba(2,6,23,0.45)]">
      <table className="w-full text-sm text-slate-200">
        <thead className="bg-slate-800/80 text-slate-300">
          <tr>
            <th className="px-4 py-3 text-left">Gambar</th>
            <th className="px-4 py-3 text-left">Nama</th>
            <th className="px-4 py-3 text-left">Kategori</th>
            <th className="px-4 py-3 text-right">Harga</th>
            <th className="px-4 py-3 text-center">Stok</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-slate-700/70 bg-slate-900/60">
              <td className="px-4 py-3">
                <img src={product.image_url || '/placeholder.png'} alt={product.name} className="h-12 w-12 rounded-xl object-cover" />
              </td>
              <td className="px-4 py-3 font-medium text-white">{product.name}</td>
              <td className="px-4 py-3">{product.categories?.name || '-'}</td>
              <td className="px-4 py-3 text-right">Rp {product.price.toLocaleString()}</td>
              <td className="px-4 py-3 text-center">{product.stock}</td>
              <td className="px-4 py-3 text-center">
                <button className="mr-2 text-sky-300 hover:text-sky-200">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="text-rose-300 hover:text-rose-200">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
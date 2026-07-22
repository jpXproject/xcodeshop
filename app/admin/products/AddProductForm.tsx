'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/components/ImageUpload'

export default function AddProductForm({ categories }: { categories: any[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      category_id: formData.get('category_id'),
      price: parseInt(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string),
      description: formData.get('description'),
      image_url: imageUrl,
      is_active: formData.get('is_active') === 'on'
    }

    const { error } = await supabase.from('products').insert([data])
    if (error) alert('Error: ' + error.message)
    else {
      alert('Produk berhasil ditambahkan!')
      setOpen(false)
      window.location.reload()
    }
    setLoading(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:opacity-90"
      >
        + Tambah Produk
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-[12px_12px_32px_rgba(2,6,23,0.45)] backdrop-blur-xl">
            <h2 className="mb-4 text-xl font-bold text-white">Tambah Produk Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Nama Produk</label>
                <input name="name" required className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Slug (URL friendly)</label>
                <input name="slug" required className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none" placeholder="contoh: ability-spins-x10" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Kategori</label>
                <select name="category_id" className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none">
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Harga (Rp)</label>
                  <input name="price" type="number" required className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Stok</label>
                  <input name="stock" type="number" defaultValue={999} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Deskripsi</label>
                <textarea name="description" rows={3} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Gambar Produk</label>
                <ImageUpload onUpload={setImageUrl} existingUrl={imageUrl} />
              </div>
              <div className="flex items-center gap-2">
                <input name="is_active" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-600 bg-slate-900" />
                <label className="text-sm text-slate-300">Aktif</label>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-700/70 pt-4">
                <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800">
                  Batal
                </button>
                <button type="submit" disabled={loading} className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
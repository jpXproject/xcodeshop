'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function CheckoutClient() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    roblox_username: '',
    delivery_email: '',
    quantity: 1,
  })
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    if (productId) {
      supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()
        .then(({ data }) => setProduct(data))
    }
  }, [productId, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const total = product.price * form.quantity
    const orderNumber = 'XSP-' + Date.now().toString(36).toUpperCase()

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        total_price: total,
        status: 'pending',
        roblox_username: form.roblox_username,
        delivery_email: form.delivery_email,
      })
      .select()
      .single()

    if (error) {
      alert('Gagal membuat order: ' + error.message)
      setLoading(false)
      return
    }

    const { error: itemError } = await supabase
      .from('order_items')
      .insert({
        order_id: order.id,
        product_id: product.id,
        product_name: product.name,
        quantity: form.quantity,
        price_per_unit: product.price,
        subtotal: total,
      })

    if (itemError) {
      alert('Gagal menyimpan detail: ' + itemError.message)
      setLoading(false)
      return
    }

    alert(`Order berhasil! Kode order: ${orderNumber}\nSilakan lakukan pembayaran sesuai instruksi.`)
    router.push('/')
  }

  if (!product) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-8 text-center">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 px-8 py-10 text-slate-300 shadow-[12px_12px_30px_rgba(2,6,23,0.45),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_8px_rgba(15,23,42,0.7)]">
          Memuat produk...
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center p-4 sm:p-8">
      <div className="w-full rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[16px_16px_40px_rgba(2,6,23,0.45),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_10px_rgba(15,23,42,0.75)] backdrop-blur-xl sm:p-8">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Checkout</p>
          <h1 className="text-3xl font-bold text-white">Selesaikan pesanan Anda</h1>
          <p className="text-sm text-slate-400">Isi detail Anda dan lanjutkan pembayaran dengan cepat.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[24px] border border-slate-700/70 bg-slate-800/70 p-5 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_6px_rgba(15,23,42,0.6)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">Item dipilih</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{product.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Produk ini akan diproses setelah pembayaran dikonfirmasi.</p>
            <div className="mt-5 rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Harga satuan</span>
                <span>Rp {product.price.toLocaleString()}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                <span>Jumlah</span>
                <span>{form.quantity}</span>
              </div>
              <div className="mt-3 border-t border-slate-700/70 pt-3">
                <div className="flex items-center justify-between text-base font-semibold text-white">
                  <span>Total</span>
                  <span>Rp {(product.price * form.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-[24px] border border-slate-700/70 bg-slate-800/70 p-5 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_6px_rgba(15,23,42,0.6)]">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Username Roblox</label>
              <input
                type="text"
                required
                value={form.roblox_username}
                onChange={(e) => setForm({ ...form, roblox_username: e.target.value })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email untuk kirim kode</label>
              <input
                type="email"
                required
                value={form.delivery_email}
                onChange={(e) => setForm({ ...form, delivery_email: e.target.value })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Jumlah</label>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value, 10) || 1 })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Bayar Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

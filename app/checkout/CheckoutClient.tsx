'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useCart } from '../../components/CartProvider'

type CheckoutItem = {
  id: string
  name: string
  price: number
  quantity: number
  image_url?: string | null
}

export default function CheckoutClient() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')
  const { items: cartItems, clear } = useCart()
  const [product, setProduct] = useState<CheckoutItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [form, setForm] = useState({
    roblox_username: '',
    delivery_email: '',
    quantity: 1,
  })
  const supabase = createClient()
  const router = useRouter()

  const isCartCheckout = !productId && cartItems.length > 0

  useEffect(() => {
    if (productId) {
      supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()
        .then(({ data }) => {
          if (data) {
            setProduct({
              id: data.id,
              name: data.name,
              price: data.price,
              quantity: 1,
              image_url: data.image_url ?? null,
            })
          }
        })
    }
  }, [productId, supabase])

  const checkoutItems = useMemo<CheckoutItem[]>(() => {
    if (productId) {
      return product ? [{ ...product, quantity: form.quantity }] : []
    }
    return cartItems
  }, [cartItems, form.quantity, product, productId])

  const totalPrice = useMemo(
    () => checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [checkoutItems]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (checkoutItems.length === 0) {
      return
    }

    setLoading(true)

    const orderCode = 'XSP-' + Date.now().toString(36).toUpperCase()
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderCode,
        total_price: totalPrice,
        status: 'pending',
        roblox_username: form.roblox_username,
        delivery_email: form.delivery_email,
      })
      .select()
      .single()

    if (error || !order) {
      alert('Gagal membuat order: ' + (error?.message ?? 'Terjadi kesalahan'))
      setLoading(false)
      return
    }

    const orderItems = checkoutItems.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price_per_unit: item.price,
      subtotal: item.price * item.quantity,
    }))

    const { error: itemError } = await supabase.from('order_items').insert(orderItems)

    if (itemError) {
      alert('Gagal menyimpan detail: ' + itemError.message)
      setLoading(false)
      return
    }

    if (isCartCheckout) {
      clear()
    }

    setOrderNumber(orderCode)
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center p-8 text-center">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-10 shadow-[16px_16px_40px_rgba(2,6,23,0.45),inset_2px_2px_8px_rgba(255,255,255,0.04)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Pesanan sukses</p>
          <h1 className="mt-4 text-4xl font-bold text-white">Pesanan Anda telah dibuat</h1>
          <p className="mt-4 text-slate-300">Kode pesanan Anda:</p>
          <p className="mt-2 rounded-3xl bg-slate-950/70 px-4 py-3 text-xl font-semibold text-white">{orderNumber}</p>
          <p className="mt-6 text-slate-400">Silakan lanjutkan pembayaran dan kirim bukti ke WhatsApp / kontak penjual untuk konfirmasi.</p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="mt-8 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Kembali ke toko
          </button>
        </div>
      </div>
    )
  }

  if (!productId && cartItems.length === 0) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center p-8 text-center">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-10 shadow-[16px_16px_40px_rgba(2,6,23,0.45),inset_2px_2px_8px_rgba(255,255,255,0.04)]">
          <h1 className="text-3xl font-bold text-white">Tidak ada item untuk checkout</h1>
          <p className="mt-4 text-slate-400">Tambahkan produk ke keranjang atau buka halaman produk terlebih dahulu.</p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="mt-8 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Kembali ke toko
          </button>
        </div>
      </div>
    )
  }

  if (productId && !product) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-8 text-center">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 px-8 py-10 text-slate-300 shadow-[12px_12px_30px_rgba(2,6,23,0.45),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_8px_rgba(15,23,42,0.7)]">
          Memuat produk...
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl p-4 sm:p-8">
      <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-[16px_16px_40px_rgba(2,6,23,0.45),inset_2px_2px_8px_rgba(255,255,255,0.04)] sm:p-8">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Checkout</p>
          <h1 className="text-4xl font-bold text-white">Selesaikan pesananmu dengan mudah</h1>
          <p className="text-sm text-slate-400">Periksa ringkasan pesanan, isi detail kontak, lalu lanjutkan pembayaran.</p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_0.55fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-violet-300">Ringkasan pesanan</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{isCartCheckout ? 'Keranjang belanja' : 'Item tunggal'}</h2>
                </div>
                <div className="rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200">
                  {checkoutItems.length} {checkoutItems.length > 1 ? 'item' : 'item'}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-white">{item.name}</p>
                        <p className="mt-2 text-sm text-slate-400">Rp {item.price.toLocaleString()} x {item.quantity}</p>
                      </div>
                      <p className="text-right text-sm font-semibold text-white">Rp {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-300">
                <p className="font-medium text-white">Total pesanan</p>
                <p className="mt-2 text-lg font-semibold text-white">Rp {totalPrice.toLocaleString()}</p>
                <p className="mt-3 leading-6">Setelah mengirim pesanan, Anda akan menerima instruksi pembayaran. Pastikan email terisi dengan benar untuk menerima konfirmasi dan detail.</p>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Langkah pembayaran</p>
              <ol className="mt-5 space-y-4 text-slate-300">
                <li className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-4">
                  <span className="font-semibold text-white">1. Kirim detail</span>
                  <p className="mt-2 text-sm">Isi username Roblox dan email dengan benar.</p>
                </li>
                <li className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-4">
                  <span className="font-semibold text-white">2. Lakukan pembayaran</span>
                  <p className="mt-2 text-sm">Gunakan rekening atau e-wallet yang tersedia di instruksi.</p>
                </li>
                <li className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-4">
                  <span className="font-semibold text-white">3. Konfirmasi</span>
                  <p className="mt-2 text-sm">Kirim bukti bayar ke kontak penjual untuk mempercepat proses.</p>
                </li>
              </ol>
            </section>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Username Roblox</label>
                <input
                  type="text"
                  required
                  value={form.roblox_username}
                  onChange={(e) => setForm({ ...form, roblox_username: e.target.value })}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Email untuk kirim kode</label>
                <input
                  type="email"
                  required
                  value={form.delivery_email}
                  onChange={(e) => setForm({ ...form, delivery_email: e.target.value })}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none"
                />
              </div>
              {!isCartCheckout && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Jumlah</label>
                  <input
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value, 10) || 1 })}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none"
                  />
                </div>
              )}
            </div>

            <div className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span>Rp {totalPrice.toLocaleString()}</span>
              </div>
              <div className="mt-4 rounded-2xl bg-slate-950/70 p-4 text-sm text-slate-300">
                Bayar sesuai total di atas lalu konfirmasi ke penjual setelah transfer.
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Memproses pesanan...' : 'Lanjutkan ke pembayaran'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

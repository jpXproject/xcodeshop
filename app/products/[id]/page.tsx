import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ArrowLeft, ArrowRight, ShieldCheck, Star } from 'lucide-react'
import Link from 'next/link'
import AddToCartButton from '../../../components/AddToCartButton'
import ShopHeader from '../../../components/ShopHeader'
import Footer from '../../../components/Footer'
import { notFound } from 'next/navigation'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: product } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('id', params.id)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0b1220,_#020617_65%)] text-slate-100">
      <ShopHeader />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition">
            <ArrowLeft className="inline h-4 w-4" /> Kembali
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.45fr]">
          <section className="rounded-[32px] border border-white/10 bg-slate-950/85 p-6 shadow-[24px_24px_80px_rgba(0,0,0,0.35),inset_2px_2px_10px_rgba(255,255,255,0.04)]">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_0.55fr]">
              <div>
                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-96 items-center justify-center bg-slate-800 text-slate-400">Tidak ada gambar</div>
                  )}
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.25em] text-sky-300">{product.categories?.name || 'Kategori'}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-400">{product.is_active ? 'Ready' : 'Tidak tersedia'}</span>
                  </div>
                  <h1 className="text-5xl font-black text-white sm:text-6xl">{product.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>4.8</span>
                    <span>•</span>
                    <span>120+ review</span>
                  </div>
                  <p className="text-lg leading-8 text-slate-300">{product.description || 'Deskripsi lengkap produk Roblox akan muncul di sini. Jelaskan keuntungan, fitur, dan keunggulan produk dengan jelas.'}</p>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6 shadow-[inset_2px_2px_8px_rgba(255,255,255,0.03)]">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Harga</span>
                    <span className="text-2xl font-semibold text-white">Rp {product.price?.toLocaleString()}</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-[24px] border border-white/10 bg-slate-950/80 p-4">
                      <p className="text-sm text-slate-400">Ketersediaan</p>
                      <p className="mt-2 text-lg font-semibold text-white">{product.is_active ? 'Ready stok' : 'Habis'}</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-slate-950/80 p-4">
                      <p className="text-sm text-slate-400">Pengiriman</p>
                      <p className="mt-2 text-lg font-semibold text-white">Instan setelah pembayaran</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Link href={`/checkout?product=${product.id}`} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90">
                      Beli Sekarang
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <AddToCartButton product={product} />
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6 shadow-[inset_2px_2px_8px_rgba(255,255,255,0.03)]">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Keunggulan</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    <li className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">Kualitas item dijamin</li>
                    <li className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">Proses delivery cepat</li>
                    <li className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">Dukungan 24/7</li>
                  </ul>
                </div>
              </aside>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6 shadow-[inset_2px_2px_8px_rgba(255,255,255,0.03)]">
              <h2 className="text-xl font-semibold text-white">Review pelanggan</h2>
              <div className="mt-6 space-y-5">
                {['Fast delivery', 'Recommended seller', 'Trusted item quality'].map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/10 bg-slate-950/80 p-4">
                    <p className="text-sm font-semibold text-white">{item}</p>
                    <p className="mt-2 text-sm text-slate-400">Pembeli mengatakan pengalaman sangat memuaskan.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}

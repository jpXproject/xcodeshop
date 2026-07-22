import { createServerClient } from '@supabase/ssr'
import { Clock3, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function HomePage() {
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

  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-wrap items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">XShop Roblox</p>
            <h1 className="text-xl font-bold text-slate-900">Marketplace item Roblox yang cepat dan aman</h1>
          </div>
          <Link
            href="/admin"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
          >
            Masuk ke Admin
          </Link>
        </header>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-slate-200">
              <Sparkles className="h-4 w-4" />
              <span>Promo item terbaru</span>
            </div>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Beli item favorit Roblox tanpa ribet.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Temukan katalog terbaik untuk kebutuhan Roblox Anda, dari aksesori sampai item premium yang siap dikirim.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#products" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Lihat katalog
              </Link>
              <Link href="/admin" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
                Kelola produk
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 inline-flex rounded-full bg-blue-50 p-2 text-blue-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900">Transaksi aman</h3>
              <p className="mt-1 text-sm text-slate-600">Proses checkout yang simpel dan aman untuk pengguna.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 inline-flex rounded-full bg-emerald-50 p-2 text-emerald-600">
                <Clock3 className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900">Pengiriman cepat</h3>
              <p className="mt-1 text-sm text-slate-600">Pesanan diproses dengan cepat agar Anda tidak menunggu lama.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 inline-flex rounded-full bg-violet-50 p-2 text-violet-600">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900">Katalog lengkap</h3>
              <p className="mt-1 text-sm text-slate-600">Tersedia item dengan kategori dan stok yang jelas.</p>
            </div>
          </div>
        </section>

        <section id="products">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Produk unggulan</p>
              <h2 className="text-2xl font-bold text-slate-900">Pilih item yang Anda suka</h2>
            </div>
            <Link href="/admin" className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
              Buka panel admin →
            </Link>
          </div>

          {products && products.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product: any) => (
                <article key={product.id} className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="h-48 w-full object-cover" />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-slate-100 text-sm text-slate-500">
                      Belum ada gambar
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-sm font-medium text-blue-600">{product.categories?.name || 'Kategori'}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{product.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{product.description || 'Produk siap dipilih untuk kebutuhan Roblox Anda.'}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-bold text-slate-900">Rp {product.price?.toLocaleString()}</p>
                      <Link
                        href={`/checkout?product=${product.id}`}
                        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                      >
                        Beli sekarang
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-600">
              Belum ada produk aktif yang tersedia saat ini.
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
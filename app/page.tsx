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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#111827,_#020617_70%)] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[24px] border border-white/10 bg-slate-900/70 px-5 py-4 shadow-[12px_12px_30px_rgba(2,6,23,0.45),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_8px_rgba(15,23,42,0.7)] backdrop-blur-xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">XShop Roblox</p>
            <h1 className="text-xl font-bold text-white">Marketplace item Roblox yang cepat dan aman</h1>
          </div>
        </header>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-8 text-white shadow-[16px_16px_40px_rgba(2,6,23,0.45),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_10px_rgba(15,23,42,0.75)]">
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
            <div className="mt-6">
              <Link href="#products" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Lihat katalog
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4 shadow-[8px_8px_20px_rgba(2,6,23,0.4),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_6px_rgba(15,23,42,0.6)]">
              <div className="mb-3 inline-flex rounded-full bg-sky-500/15 p-2 text-sky-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white">Transaksi aman</h3>
              <p className="mt-1 text-sm text-slate-400">Proses checkout yang simpel dan aman untuk pengguna.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4 shadow-[8px_8px_20px_rgba(2,6,23,0.4),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_6px_rgba(15,23,42,0.6)]">
              <div className="mb-3 inline-flex rounded-full bg-emerald-500/15 p-2 text-emerald-300">
                <Clock3 className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white">Pengiriman cepat</h3>
              <p className="mt-1 text-sm text-slate-400">Pesanan diproses dengan cepat agar Anda tidak menunggu lama.</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4 shadow-[8px_8px_20px_rgba(2,6,23,0.4),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_6px_rgba(15,23,42,0.6)]">
              <div className="mb-3 inline-flex rounded-full bg-violet-500/15 p-2 text-violet-300">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white">Katalog lengkap</h3>
              <p className="mt-1 text-sm text-slate-400">Tersedia item dengan kategori dan stok yang jelas.</p>
            </div>
          </div>
        </section>

        <section id="products">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Produk unggulan</p>
            <h2 className="text-2xl font-bold text-white">Pilih item yang Anda suka</h2>
          </div>

          {products && products.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product: any) => (
                <article key={product.id} className="group overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/75 shadow-[10px_10px_24px_rgba(2,6,23,0.45),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_8px_rgba(15,23,42,0.6)] transition hover:-translate-y-1 hover:shadow-[12px_12px_30px_rgba(2,6,23,0.5)]">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="h-48 w-full object-cover" />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-slate-800/80 text-sm text-slate-400">
                      Belum ada gambar
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-sm font-medium text-sky-300">{product.categories?.name || 'Kategori'}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{product.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{product.description || 'Produk siap dipilih untuk kebutuhan Roblox Anda.'}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-bold text-white">Rp {product.price?.toLocaleString()}</p>
                      <Link
                        href={`/checkout?product=${product.id}`}
                        className="rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        Beli sekarang
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-900/60 p-10 text-center text-slate-400">
              Belum ada produk aktif yang tersedia saat ini.
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
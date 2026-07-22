import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import HeroSection from '../components/HeroSection'
import TrustPanel from '../components/TrustPanel'
import ProductGrid from '../components/ProductGrid'
import ShopHeader from '../components/ShopHeader'
import Footer from '../components/Footer'

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

  const { data: settings } = await supabase
    .from('settings')
    .select('store_name, source_header, logo_url, hero_image_url, store_contact')
    .single()

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0b1220,_#020617_65%)] text-slate-100">
      <ShopHeader
        logoUrl={settings?.logo_url}
        storeName={settings?.store_name}
        sourceHeader={settings?.source_header}
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <HeroSection
          sourceHeader={settings?.source_header}
          heroImageUrl={settings?.hero_image_url}
          storeName={settings?.store_name}
        />
        <TrustPanel />

        <section id="products" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">Produk unggulan</p>
              <h2 className="text-3xl font-bold text-white">Pilih item Roblox yang cocok untukmu</h2>
            </div>
            <a href="#products" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Lihat semua
            </a>
          </div>

          {products && products.length > 0 ? (
            <ProductGrid
              initialProducts={products}
              categories={[
                'All',
                ...Array.from(
                  new Set(
                    products
                      .map((product: any) => product.categories?.name)
                      .filter(Boolean)
                  )
                ),
              ]}
            />
          ) : (
            <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-900/60 p-10 text-center text-slate-400">
              Belum ada produk aktif yang tersedia saat ini.
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  )
}

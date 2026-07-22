import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function HeroSection({
  sourceHeader,
  heroImageUrl,
  storeName,
}: {
  sourceHeader?: string
  heroImageUrl?: string
  storeName?: string
}) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[24px_24px_80px_rgba(0,0,0,0.35),inset_2px_2px_10px_rgba(255,255,255,0.04)] backdrop-blur-xl">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm uppercase tracking-[0.35em] text-sky-300">
            <Sparkles className="h-4 w-4" /> Trusted Roblox Shop
          </span>
          {sourceHeader ? (
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">{sourceHeader}</p>
          ) : null}
          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            {storeName ? `Selamat datang di ${storeName}` : 'Beli item Roblox dengan percaya diri di tampilan toko modern.'}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Marketplace yang dirancang untuk pengalaman belanja cepat dan aman. Produk kurasi premium, proses checkout sederhana, serta tampilan dark mode yang nyaman.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#products" className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              Jelajahi produk
            </Link>
            <Link href="#trust" className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
              Kenapa pilih kami
            </Link>
          </div>
        </div>
        <div className="grid gap-4 rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[inset_2px_2px_10px_rgba(255,255,255,0.03),inset_-2px_-2px_10px_rgba(0,0,0,0.4)]">
          {heroImageUrl ? (
            <div className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950/70">
              <img src={heroImageUrl} alt="Hero image" className="h-full w-full object-cover" />
            </div>
          ) : null}
          <div className="rounded-[28px] bg-gradient-to-br from-sky-500/25 via-transparent to-violet-500/20 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-200">Kinerja toko</p>
            <p className="mt-4 text-4xl font-black">99.9%</p>
            <p className="mt-2 text-sm text-slate-300">Tingkat kepuasan dan keamanan transaksi terbaik untuk pembeli Roblox.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/80 p-4">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Item aktif</p>
              <p className="mt-3 text-3xl font-semibold text-white">Terus diperbarui</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-950/80 p-4">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Dukungan</p>
              <p className="mt-3 text-3xl font-semibold text-white">24/7</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

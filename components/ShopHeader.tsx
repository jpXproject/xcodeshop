"use client"

import { ShoppingCart, Sparkles } from "lucide-react"
import { useCart } from "./CartProvider"
import Link from "next/link"

export default function ShopHeader({
  logoUrl,
  storeName,
  sourceHeader,
}: {
  logoUrl?: string
  storeName?: string
  sourceHeader?: string
}) {
  const { items, setOpen } = useCart()
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900/90 text-sky-300 shadow-[inset_2px_2px_8px_rgba(255,255,255,0.03)]">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo toko" className="h-10 w-10 rounded-2xl object-contain" />
            ) : (
              <Sparkles className="h-6 w-6" />
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{sourceHeader || 'XShop Roblox'}</p>
            <p className="text-lg font-semibold text-white">{storeName || 'Marketplace'}</p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-800 bg-slate-900/80 p-1 text-sm text-slate-200 sm:flex">
          <Link href="#products" className="rounded-full px-4 py-2 transition hover:bg-slate-800">
            Produk
          </Link>
          <Link href="#trust" className="rounded-full px-4 py-2 transition hover:bg-slate-800">
            Kepercayaan
          </Link>
          <Link href="#about" className="rounded-full px-4 py-2 transition hover:bg-slate-800">
            Tentang
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ShoppingCart className="h-5 w-5" />
            Keranjang
            {quantity > 0 ? (
              <span className="rounded-full bg-emerald-400 px-2 py-0.5 text-xs font-semibold text-slate-950">{quantity}</span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  )
}

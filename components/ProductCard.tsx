"use client"

import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import AddToCartButton from "./AddToCartButton"

export default function ProductCard({ product }: { product: any }) {
  return (
    <article className="group overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/75 shadow-[12px_12px_30px_rgba(0,0,0,0.35),inset_2px_2px_8px_rgba(255,255,255,0.02)] transition duration-200 hover:-translate-y-1 hover:shadow-[16px_16px_40px_rgba(0,0,0,0.45)]">
      <div className="relative overflow-hidden rounded-t-[28px] bg-slate-950/80">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="h-56 w-full object-cover transition duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-56 items-center justify-center bg-slate-800/90 text-sm text-slate-400">Gambar belum tersedia</div>
        )}
        <div className="absolute right-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">{product.categories?.name || "Item"}</div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3 text-slate-400">
          <span className="text-xs uppercase tracking-[0.2em]">{product.is_active ? "Ready" : "Off"}</span>
          <span className="font-semibold text-white">Rp {product.price?.toLocaleString()}</span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">{product.name}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">{product.description || "Deskripsi singkat produk Roblox terbaik."}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Star className="h-4 w-4 text-amber-400" />
          <span>4.8</span>
          <span>•</span>
          <span>120+ review</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/products/${product.id}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
            Detail
            <ArrowRight className="h-4 w-4" />
          </Link>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  )
}

"use client"

import { useMemo, useState } from "react"
import ProductCard from "./ProductCard"

type Product = {
  id: string
  name: string
  description?: string
  price?: number
  image_url?: string | null
  is_active?: boolean
  categories?: { name?: string }
}

export default function ProductGrid({
  initialProducts,
  categories,
}: {
  initialProducts: Product[]
  categories: string[]
}) {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return initialProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(normalizedQuery)
      const categoryName = product.categories?.name ?? ""
      const categoryMatch = activeCategory === "All" || categoryName === activeCategory
      const descriptionMatch = product.description?.toLowerCase().includes(normalizedQuery) ?? false
      return categoryMatch && (nameMatch || descriptionMatch)
    })
  }, [activeCategory, initialProducts, query])

  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-950/85 p-6 shadow-[24px_24px_80px_rgba(0,0,0,0.35),inset_2px_2px_12px_rgba(255,255,255,0.04)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Filter</p>
          <h2 className="text-2xl font-bold text-white">Cari item kamu</h2>
        </div>
        <div className="relative w-full sm:w-80">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau deskripsi..."
            className="w-full rounded-full border border-slate-800 bg-slate-900/80 px-5 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeCategory === category
                ? "bg-sky-500 text-slate-950"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-900/60 p-10 text-center text-slate-400">
            Tidak ada produk yang cocok. Coba kata kunci atau kategori lain.
          </div>
        )}
      </div>
    </section>
  )
}

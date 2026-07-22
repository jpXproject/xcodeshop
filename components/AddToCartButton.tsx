"use client"

import React from "react"
import { useCart } from "./CartProvider"

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart()

  function handleAdd() {
    addItem({ id: String(product.id), name: product.name, price: Number(product.price || 0), quantity: 1, image_url: product.image_url })
  }

  return (
    <button onClick={handleAdd} className="inline-flex items-center gap-2 rounded-full bg-slate-700/60 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700">
      Tambah
    </button>
  )
}

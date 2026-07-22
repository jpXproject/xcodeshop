"use client"

import React from "react"
import { useCart } from "./CartProvider"
import Link from "next/link"

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, clear } = useCart()

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-full max-w-md transform bg-gradient-to-b from-slate-900/95 to-slate-800/95 p-6 shadow-2xl transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Keranjang</h3>
        <button className="text-slate-400" onClick={() => setOpen(false)}>
          Tutup
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {items.length === 0 ? (
          <div className="text-slate-400">Keranjang kosong.</div>
        ) : (
          items.map((it) => (
            <div key={it.id} className="flex items-center gap-3">
              <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-slate-800">
                {it.image_url ? <img src={it.image_url} alt={it.name} className="h-14 w-14 object-cover" /> : null}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white">{it.name}</div>
                  <div className="text-sm text-slate-300">Rp {it.price.toLocaleString()}</div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                  <button onClick={() => updateQty(it.id, Math.max(1, it.quantity - 1))} className="px-2 py-1 rounded bg-slate-800">-</button>
                  <div className="w-8 text-center">{it.quantity}</div>
                  <button onClick={() => updateQty(it.id, it.quantity + 1)} className="px-2 py-1 rounded bg-slate-800">+</button>
                  <button onClick={() => removeItem(it.id)} className="ml-auto text-xs text-rose-400">Hapus</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 border-t border-slate-800 pt-4">
        <div className="flex items-center justify-between text-lg font-semibold text-white">Total
          <span>Rp {total.toLocaleString()}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <Link href={items.length ? `/checkout?product=${items[0].id}` : `/`} className="flex-1 rounded-full bg-emerald-500 px-4 py-3 text-center font-semibold text-black">
            Checkout
          </Link>
          <button onClick={() => clear()} className="rounded-full border border-white/10 px-4 py-3 text-sm text-slate-300">
            Kosongkan
          </button>
        </div>
      </div>
    </div>
  )
}

"use client"

import React, { createContext, useContext, useState } from "react"
import CartDrawer from "./CartDrawer"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image_url?: string | null
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  open: boolean
  setOpen: (v: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)

  function addItem(item: CartItem) {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx].quantity += item.quantity
        return copy
      }
      return [item, ...prev]
    })
    setOpen(true)
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }

  function updateQty(id: string, qty: number) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)))
  }

  function clear() {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, open, setOpen }}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}

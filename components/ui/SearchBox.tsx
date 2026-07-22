"use client"

import { Search } from 'lucide-react'
import Input from './Input'

export default function SearchBox({ placeholder = 'Search...' }: { placeholder?: string }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
        <Search size={16} />
      </div>
      <Input aria-label="search" placeholder={placeholder} className="pl-10" />
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from 'react'

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right'
}

export default function Dropdown({ trigger, children, align = 'left' }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((s) => !s)} className="cursor-pointer">{trigger}</div>
      {open && (
        <div className={`absolute z-40 mt-2 w-48 rounded-xl border border-white/6 bg-slate-900/60 shadow-sm ${align === 'right' ? 'right-0' : 'left-0'} transition duration-300`}>
          {children}
        </div>
      )}
    </div>
  )
}

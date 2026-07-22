"use client"

import { useState } from 'react'

export default function Tooltip({ content, children }: { content: React.ReactNode; children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute z-50 mt-2 rounded-md bg-slate-800/90 px-2 py-1 text-xs text-slate-100 shadow-sm">{content}</div>
      )}
    </div>
  )
}

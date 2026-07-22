"use client"

import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...props }: Props) {
  return (
    <label className="block">
      {label && <div className="mb-2 text-sm text-slate-300">{label}</div>}
      <input
        {...props}
        className={`w-full rounded-xl border border-white/6 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none transition duration-300 focus:ring-2 focus:ring-sky-500 ${className}`}
      />
      {error && <div className="mt-1 text-xs text-rose-400">{error}</div>}
    </label>
  )
}

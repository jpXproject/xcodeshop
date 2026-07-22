"use client"

import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-xl font-semibold transition duration-300'
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }
  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm hover:opacity-95',
    ghost: 'bg-transparent text-slate-100 border border-white/6 hover:bg-slate-800/40',
    danger: 'bg-rose-600 text-white hover:opacity-95',
  }

  return (
    <button {...props} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()} />
  )
}

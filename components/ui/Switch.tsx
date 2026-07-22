"use client"

import { useState } from 'react'

export default function Switch({ checked = false, onChange }: { checked?: boolean; onChange?: (v: boolean) => void }) {
  const [on, setOn] = useState(checked)
  return (
    <button
      onClick={() => { setOn((s) => { const n = !s; onChange?.(n); return n }) }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition duration-300 ${on ? 'bg-emerald-500' : 'bg-slate-700'}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-300 ${on ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
  )
}

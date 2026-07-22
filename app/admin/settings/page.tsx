'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function GeneralSettings() {
  const [storeName, setStoreName] = useState('')
  const [contact, setContact] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data } = await supabase.from('settings').select('*').single()
    if (data) {
      setStoreName(data.store_name || '')
      setContact(data.store_contact || '')
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase
      .from('settings')
      .update({ store_name: storeName, store_contact: contact })
      .eq('id', (await supabase.from('settings').select('id').single()).data?.id)
    if (error) alert('Gagal simpan: ' + error.message)
    else alert('Berhasil disimpan!')
    setLoading(false)
  }

  return (
    <div className="max-w-3xl rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[12px_12px_30px_rgba(2,6,23,0.45),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_8px_rgba(15,23,42,0.7)] backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Settings</p>
        <h1 className="text-2xl font-bold text-white">Pengaturan Toko</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-4 rounded-[24px] border border-slate-700/70 bg-slate-800/60 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Nama Toko</label>
          <input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Kontak (Email/WA)</label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </form>
    </div>
  )
}
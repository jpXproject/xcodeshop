'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type SettingsPayload = {
  store_name?: string
  store_contact?: string
  source_header?: string
  logo_url?: string
  hero_image_url?: string
  dashboard_illustration_url?: string
}

export default function GeneralSettings() {
  const [storeName, setStoreName] = useState('')
  const [contact, setContact] = useState('')
  const [sourceHeader, setSourceHeader] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [heroImageUrl, setHeroImageUrl] = useState('')
  const [dashboardImageUrl, setDashboardImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [settingsId, setSettingsId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data } = await supabase.from('settings').select('*').single()
    if (data) {
      setSettingsId(data.id)
      setStoreName(data.store_name || '')
      setContact(data.store_contact || '')
      setSourceHeader(data.source_header || '')
      setLogoUrl(data.logo_url || '')
      setHeroImageUrl(data.hero_image_url || '')
      setDashboardImageUrl(data.dashboard_illustration_url || '')
    }
  }

  const handleDashboardUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setLoading(true)
      const filePath = `dashboard-illustration-${Date.now()}-${file.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage.from('assets').upload(filePath, file, { upsert: true })
      if (uploadError) throw uploadError
      const { data: publicData } = await supabase.storage.from('assets').getPublicUrl(uploadData.path)
      const publicUrl = publicData?.publicUrl || ''
      setDashboardImageUrl(publicUrl)
    } catch (err: any) {
      console.error(err)
      alert('Gagal upload gambar: ' + (err?.message || err))
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload: SettingsPayload = {
      store_name: storeName,
      store_contact: contact,
      source_header: sourceHeader,
      logo_url: logoUrl,
      hero_image_url: heroImageUrl,
      dashboard_illustration_url: dashboardImageUrl,
    }

    const response = settingsId
      ? await supabase.from('settings').update(payload).eq('id', settingsId)
      : await supabase.from('settings').insert(payload).select()

    if (response.error) {
      alert('Gagal simpan: ' + response.error.message)
    } else {
      alert('Berhasil disimpan!')
      if (!settingsId && response.data && Array.isArray(response.data) && response.data[0]?.id) {
        setSettingsId(response.data[0].id)
      }
    }

    setLoading(false)
  }

  return (
    <div className="max-w-3xl rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[12px_12px_30px_rgba(2,6,23,0.45),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_8px_rgba(15,23,42,0.7)] backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Pengaturan Umum</p>
        <h1 className="text-2xl font-bold text-white">Header & Aset Usaha</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6 rounded-[24px] border border-slate-700/70 bg-slate-800/60 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Nama Toko</label>
          <input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Kontak (Email / WA)</label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Source Header</label>
          <input
            value={sourceHeader}
            onChange={(e) => setSourceHeader(e.target.value)}
            placeholder="Contoh: Sumber: XShop Roblox Official"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
          />
          <p className="mt-2 text-xs text-slate-500">Teks ini akan muncul pada header publik sebagai tagline atau sumber.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Logo URL</label>
            <input
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://.../logo.png"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
            />
            {logoUrl && <img src={logoUrl} alt="Logo preview" className="mt-3 h-20 rounded-2xl object-contain" />}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Hero Image URL</label>
            <input
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              placeholder="https://.../hero.jpg"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
            />
            {heroImageUrl && <img src={heroImageUrl} alt="Hero preview" className="mt-3 h-36 w-full rounded-2xl object-cover" />}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Dashboard Illustration</label>
            <input type="file" accept="image/*" onChange={handleDashboardUpload} className="w-full rounded-2xl" />
            {dashboardImageUrl ? (
              <img src={dashboardImageUrl} alt="Dashboard preview" className="mt-3 h-36 w-full rounded-2xl object-cover" />
            ) : (
              <p className="mt-3 text-sm text-slate-400">Belum ada ilustrasi dashboard. Unggah untuk menampilkannya di dashboard admin.</p>
            )}
          </div>
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

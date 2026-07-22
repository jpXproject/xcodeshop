'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function PaymentSettings() {
  const [gateway, setGateway] = useState('midtrans')
  const [config, setConfig] = useState({ merchant_id: '', client_key: '', server_key: '' })
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchPaymentConfig()
  }, [])

  const fetchPaymentConfig = async () => {
    const { data } = await supabase.from('settings').select('payment_gateway, payment_config').single()
    if (data) {
      setGateway(data.payment_gateway || 'midtrans')
      setConfig(data.payment_config || { merchant_id: '', client_key: '', server_key: '' })
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase
      .from('settings')
      .update({ 
        payment_gateway: gateway, 
        payment_config: config 
      })
      .eq('id', (await supabase.from('settings').select('id').single()).data?.id)
    if (error) alert('Gagal simpan: ' + error.message)
    else alert('Pengaturan payment berhasil disimpan!')
    setLoading(false)
  }

  return (
    <div className="max-w-3xl rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-[12px_12px_30px_rgba(2,6,23,0.45),inset_2px_2px_6px_rgba(255,255,255,0.04),inset_-2px_-2px_8px_rgba(15,23,42,0.7)] backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Payment</p>
        <h1 className="text-2xl font-bold text-white">Pengaturan Payment Gateway</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-4 rounded-[24px] border border-slate-700/70 bg-slate-800/60 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Gateway</label>
          <select
            value={gateway}
            onChange={(e) => setGateway(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-slate-100 outline-none ring-0"
          >
            <option value="midtrans">Midtrans</option>
            <option value="xendit">Xendit</option>
            <option value="manual">Manual (Transfer Bank)</option>
          </select>
        </div>

        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4">
          <h3 className="mb-3 font-semibold text-slate-200">Konfigurasi API Key</h3>
          <div className="space-y-3">
            <input
              placeholder="Merchant ID"
              value={config.merchant_id}
              onChange={(e) => setConfig({ ...config, merchant_id: e.target.value })}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
            />
            <input
              placeholder="Client Key"
              value={config.client_key}
              onChange={(e) => setConfig({ ...config, client_key: e.target.value })}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
            />
            <input
              placeholder="Server Key"
              type="password"
              value={config.server_key}
              onChange={(e) => setConfig({ ...config, server_key: e.target.value })}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-slate-100 outline-none"
            />
          </div>
          <p className="mt-3 text-xs text-slate-400">* Untuk keamanan, server key disimpan di database. Pastikan RLS aktif.</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-6 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Payment'}
        </button>
      </form>
    </div>
  )
}
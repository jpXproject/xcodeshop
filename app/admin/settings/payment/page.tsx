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
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Pengaturan Payment Gateway</h1>
      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium">Gateway</label>
          <select value={gateway} onChange={(e) => setGateway(e.target.value)} className="w-full border rounded-lg px-3 py-2">
            <option value="midtrans">Midtrans</option>
            <option value="xendit">Xendit</option>
            <option value="manual">Manual (Transfer Bank)</option>
          </select>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Konfigurasi API Key</h3>
          <div className="space-y-2">
            <input 
              placeholder="Merchant ID" 
              value={config.merchant_id} 
              onChange={(e) => setConfig({ ...config, merchant_id: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
            <input 
              placeholder="Client Key" 
              value={config.client_key} 
              onChange={(e) => setConfig({ ...config, client_key: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
            <input 
              placeholder="Server Key" 
              type="password"
              value={config.server_key} 
              onChange={(e) => setConfig({ ...config, server_key: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">* Untuk keamanan, server key disimpan di database. Pastikan RLS aktif.</p>
        </div>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          {loading ? 'Menyimpan...' : 'Simpan Payment'}
        </button>
      </form>
    </div>
  )
}
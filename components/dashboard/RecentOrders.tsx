import { ChevronRight, Package, ShoppingCart } from 'lucide-react'

type Order = {
  id: string
  customer: string
  total: string
  status: string
  date: string
}

const orders: Order[] = [
  { id: '#8521', customer: 'Nadia', total: 'Rp 1.250.000', status: 'Delivered', date: 'Today' },
  { id: '#8518', customer: 'Rafi', total: 'Rp 560.000', status: 'Pending', date: 'Yesterday' },
  { id: '#8511', customer: 'Dewi', total: 'Rp 893.000', status: 'Delivered', date: 'Yesterday' },
  { id: '#8502', customer: 'Aris', total: 'Rp 460.000', status: 'Processing', date: '2 days ago' },
]

const statusClasses: Record<string, string> = {
  Delivered: 'bg-emerald-600/10 text-emerald-300',
  Pending: 'bg-amber-500/10 text-amber-300',
  Processing: 'bg-sky-500/10 text-sky-300',
}

export default function RecentOrders() {
  return (
    <div className="rounded-xl border border-white/6 bg-slate-900/60 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recent orders</p>
          <h2 className="text-xl font-semibold text-white">Latest activity</h2>
        </div>
        <Package size={18} className="text-sky-300" />
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 transition duration-300 hover:border-slate-400/20 hover:bg-slate-900/80">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{order.customer}</p>
                <p className="text-xs text-slate-400">{order.date}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses[order.status]}`}>{order.status}</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-300">
              <span>{order.id}</span>
              <span>{order.total}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/70 px-4 py-2 text-sm text-slate-100 transition duration-300 hover:border-sky-400/40 hover:bg-slate-800/90">
        View all orders <ChevronRight size={16} />
      </button>
    </div>
  )
}

import { Wallet, CreditCard, DollarSign } from 'lucide-react'

const overview = [
  { title: 'Transactions', value: '1,234', icon: Wallet },
  { title: 'Revenue', value: 'Rp 236.2M', icon: DollarSign },
  { title: 'Cards', value: '4', icon: CreditCard },
]

export default function PaymentOverview() {
  return (
    <div className="rounded-xl border border-white/6 bg-slate-900/60 p-4 shadow-sm">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Payment overview</p>
        <h2 className="text-xl font-semibold text-white">Billing summary</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {overview.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800/70 text-sky-300">
                <Icon size={20} />
              </div>
              <p className="text-sm text-slate-400">{item.title}</p>
              <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

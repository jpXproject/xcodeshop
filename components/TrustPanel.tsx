import { ShieldCheck, Package, CreditCard, MessageCircle } from "lucide-react"

const trustItems = [
  { icon: ShieldCheck, title: "Transaksi Aman", description: "Dukungan penuh dan proses pembayaran terpercaya." },
  { icon: Package, title: "Pengiriman Cepat", description: "Order diproses segera sehingga tidak perlu menunggu lebih lama." },
  { icon: CreditCard, title: "Metode Pembayaran", description: "Terima berbagai metode pembayaran Roblox-compatible." },
  { icon: MessageCircle, title: "Dukungan Premium", description: "Bantuan cepat untuk semua pertanyaan dan pesanan." },
]

export default function TrustPanel() {
  return (
    <section id="trust" className="rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[24px_24px_80px_rgba(0,0,0,0.35),inset_2px_2px_10px_rgba(255,255,255,0.03)]">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Kepercayaan</p>
          <h2 className="text-3xl font-bold text-white">Bayar dengan tenang, terima item dengan cepat.</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-400">
          Semua item kami diperiksa, didukung oleh dukungan cepat, dan ditampilkan dengan transparansi penuh.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {trustItems.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-[inset_2px_2px_8px_rgba(255,255,255,0.03)]">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-sky-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

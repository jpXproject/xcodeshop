import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">XShop Roblox</p>
            <p className="max-w-sm text-sm leading-7 text-slate-400">
              Marketplace Roblox gelap yang fokus pada pengalaman pengguna, keamanan, serta proses checkout mudah dan cepat.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Produk</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="#products" className="transition hover:text-white">Semua Produk</Link>
              </li>
              <li>
                <Link href="#trust" className="transition hover:text-white">Kepercayaan</Link>
              </li>
              <li>
                <Link href="#about" className="transition hover:text-white">Tentang</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Bantuan</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="transition hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link href="/" className="transition hover:text-white">Kebijakan Privasi</Link>
              </li>
              <li>
                <Link href="/" className="transition hover:text-white">Syarat & Ketentuan</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Hubungi kami</h3>
            <p className="text-sm leading-7 text-slate-400">support@xshoproblox.com</p>
            <p className="text-sm leading-7 text-slate-400">+62 812-3456-7890</p>
            <p className="text-sm leading-7 text-slate-400">Jakarta, Indonesia</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © 2026 XShop Roblox. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  )
}

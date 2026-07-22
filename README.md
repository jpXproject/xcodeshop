# XShop Roblox

XShop Roblox adalah toko online untuk item Roblox yang dirancang dengan tema gelap modern, UX belanja yang fokus, dan checkout sederhana. Situs ini menampilkan katalog produk, trust panel, quick add-to-cart, sticky cart drawer, dan footer profesional.

## Fitur Utama

- Hero section dengan ajakan beli yang jelas
- Trust panel untuk meningkatkan kepercayaan pembeli
- Pencarian produk dan filter kategori untuk menemukan item lebih cepat
- Kartu produk dengan detail singkat, badge kategori, dan quick buy
- Halaman detail produk individual untuk setiap item
- Checkout UX lengkap dengan ringkasan pesanan dan konfirmasi pesanan
- Cart drawer persistent untuk pengalaman belanja yang lancar
- Sticky header dengan ikon keranjang dan jumlah item
- Footer profesional dengan tautan bantuan dan kontak

## Struktur Proyek

- `app/page.tsx` - halaman beranda toko publik
- `app/layout.tsx` - layout root termasuk `CartProvider`
- `components/ShopHeader.tsx` - sticky header toko
- `components/HeroSection.tsx` - hero section utama
- `components/TrustPanel.tsx` - panel kepercayaan
- `components/ProductCard.tsx` - kartu produk modern
- `components/CartProvider.tsx` - context keranjang belanja
- `components/CartDrawer.tsx` - drawer keranjang slide-out
- `components/Footer.tsx` - footer profesional

## Menjalankan Proyek

1. Install dependencies:

```bash
npm install
```

2. Jalankan server development:

```bash
npm run dev
```

3. Buka aplikasi di browser:

```bash
http://localhost:3000
```

## Build Production

```bash
npm run build
npm start
```

## Deploy

Proyek ini cocok untuk deploy di Vercel. Pastikan environment variable Supabase diatur di dashboard Vercel sebelum deploy.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Catatan

Situs toko sudah disederhanakan dengan fokus pada pengalaman pembeli dan antarmuka yang ramping. Halaman admin masih tersedia secara terpisah, sementara homepage publik tetap menampilkan branding, produk, dan fitur checkout inti.

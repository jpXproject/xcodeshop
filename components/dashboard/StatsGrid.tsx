import StatCard from './StatCard'
import { Coin, Package, Layers, ShoppingCart } from 'lucide-react'

type SeriesPoint = { x: number | string; y: number }

const sample = (seed: number): SeriesPoint[] =>
  Array.from({ length: 12 }).map((_, i) => ({ x: i, y: Math.round((Math.sin((i + seed) / 3) + 1) * 50 + Math.random() * 20) }))

export default function StatsGrid() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={<Coin size={20} />}
        title="Rp 236.227.750"
        subtitle="Revenue"
        value="Rp 236.2M"
        growth={18}
        data={sample(1)}
      />

      <StatCard
        icon={<Package size={20} />}
        title="324"
        subtitle="Products"
        value={324}
        growth={4}
        data={sample(2)}
      />

      <StatCard
        icon={<Layers size={20} />}
        title="15"
        subtitle="Categories"
        value={15}
        growth={2}
        data={sample(3)}
      />

      <StatCard
        icon={<ShoppingCart size={20} />}
        title="98"
        subtitle="Orders"
        value={98}
        growth={5}
        data={sample(4)}
      />
    </div>
  )
}

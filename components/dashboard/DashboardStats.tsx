import { Coin, Package, Layers, ShoppingCart } from 'lucide-react'
import StatCard from './StatCard'

type Props = {
  revenue: string
  products: number
  categories: number
  orders: number
}

export default function DashboardStats({ revenue, products, categories, orders }: Props) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={<Coin size={20} />}
        title={revenue}
        subtitle="Revenue"
        value={revenue}
        growth={18}
        data={[{ x: 0, y: 60 }, { x: 1, y: 80 }, { x: 2, y: 70 }, { x: 3, y: 90 }, { x: 4, y: 100 }, { x: 5, y: 115 }]}
      />
      <StatCard
        icon={<Package size={20} />}
        title={String(products)}
        subtitle="Products"
        value={products}
        growth={4}
        data={[{ x: 0, y: 48 }, { x: 1, y: 62 }, { x: 2, y: 55 }, { x: 3, y: 67 }, { x: 4, y: 72 }, { x: 5, y: 78 }]}
      />
      <StatCard
        icon={<Layers size={20} />}
        title={String(categories)}
        subtitle="Categories"
        value={categories}
        growth={2}
        data={[{ x: 0, y: 22 }, { x: 1, y: 28 }, { x: 2, y: 24 }, { x: 3, y: 30 }, { x: 4, y: 33 }, { x: 5, y: 35 }]}
      />
      <StatCard
        icon={<ShoppingCart size={20} />}
        title={String(orders)}
        subtitle="Orders"
        value={orders}
        growth={5}
        data={[{ x: 0, y: 72 }, { x: 1, y: 82 }, { x: 2, y: 77 }, { x: 3, y: 85 }, { x: 4, y: 88 }, { x: 5, y: 96 }]}
      />
    </div>
  )
}

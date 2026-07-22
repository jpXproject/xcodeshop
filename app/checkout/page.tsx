import { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Memuat checkout...</div>}>
      <CheckoutClient />
    </Suspense>
  )
}
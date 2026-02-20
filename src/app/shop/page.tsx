import { ProductGrid } from '@/components/product/ProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getAllProducts } from '@/lib/shopify'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop All — Bucks of Nebraska',
  description: 'Browse all Nebraska hunting apparel. Hats, tees, hoodies, decals, and more.',
}

export default async function ShopPage() {
  const products = await getAllProducts(50)

  return (
    <div className="py-20 px-10 max-w-[1300px] mx-auto">
      <SectionHeader
        title="Shop"
        highlight="All"
        subtitle="Everything in the Bucks of Nebraska lineup"
      />
      <ProductGrid products={products} />
    </div>
  )
}

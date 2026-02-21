import { FilterableProductGrid } from '@/components/product/FilterableProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getAllProducts } from '@/lib/shopify'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop All',
  description: 'Browse all Nebraska hunting apparel. Hats, tees, hoodies, decals, and more.',
  openGraph: {
    title: 'Shop All — Bucks of Nebraska',
    description: 'Browse all Nebraska hunting apparel. Hats, tees, hoodies, decals, and more.',
    images: [{ url: '/api/og?title=Shop%20All&subtitle=Nebraska%20Hunting%20Apparel', width: 1200, height: 630 }],
  },
}

export default async function ShopPage() {
  const products = await getAllProducts(250)

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[1300px] mx-auto">
      <SectionHeader
        title="Shop"
        highlight="All"
        subtitle="Everything in the Bucks of Nebraska lineup"
      />
      <FilterableProductGrid products={products} />
    </div>
  )
}

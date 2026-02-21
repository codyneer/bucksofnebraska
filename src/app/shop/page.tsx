import { FilterableProductGrid } from '@/components/product/FilterableProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getAllProducts } from '@/lib/shopify'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop All Nebraska Hunting Apparel | Shirts, Hoodies & Hats',
  description: 'Browse all Nebraska deer hunting apparel. Hunting shirts, hoodies, hats, decals, and accessories. Premium whitetail gear built for the field. Free shipping over $75.',
  keywords: ['hunting shirts', 'deer hunting clothing', 'hunting apparel', 'nebraska hunting gear', 'whitetail clothing', 'hunting graphic tees'],
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop All Nebraska Hunting Apparel | Bucks of Nebraska',
    description: 'Browse all Nebraska deer hunting apparel. Hunting shirts, hoodies, hats, decals, and accessories. Free shipping over $75.',
    images: [{ url: '/api/og?title=Shop%20All&subtitle=Nebraska%20Deer%20Hunting%20Apparel', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop All Nebraska Hunting Apparel | Bucks of Nebraska',
    description: 'Browse all Nebraska deer hunting apparel. Hunting shirts, hoodies, hats, decals, and accessories. Free shipping over $75.',
    images: ['/api/og?title=Shop%20All&subtitle=Nebraska%20Deer%20Hunting%20Apparel'],
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

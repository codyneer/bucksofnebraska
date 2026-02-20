import { ProductCard } from './ProductCard'
import type { ShopifyProduct } from '@/lib/shopify'

type ProductGridProps = {
  products: ShopifyProduct[]
  compact?: boolean
}

export function ProductGrid({ products, compact }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-text-light font-body py-12">
        No products found.
      </p>
    )
  }

  return (
    <div
      className={`grid gap-3 sm:gap-5 ${
        compact
          ? 'grid-cols-2 xl:grid-cols-3'
          : 'grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

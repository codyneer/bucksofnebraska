import { ProductCard } from './ProductCard'
import type { ShopifyProduct } from '@/lib/shopify'

type ProductGridProps = {
  products: ShopifyProduct[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-text-light font-body py-12">
        No products found.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

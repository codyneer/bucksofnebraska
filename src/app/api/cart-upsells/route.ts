import { NextResponse } from 'next/server'
import { getCollectionProducts, getAllProducts } from '@/lib/shopify'
import type { ShopifyProduct } from '@/lib/shopify'

// The cart can only quick-add a product with exactly one variant — anything with
// sizes or colours would need a picker the drawer doesn't have. Most of the
// catalogue is multi-variant, so the curated collection alone is not enough to
// keep the carousel populated; top it up from the wider catalogue.
function isQuickAddable(product: ShopifyProduct): boolean {
  const variants = product.variants.edges
  return variants.length === 1 && variants[0].node.availableForSale
}

export async function GET() {
  try {
    const pool: ShopifyProduct[] = []
    const seen = new Set<string>()

    const push = (products: ShopifyProduct[]) => {
      for (const product of products) {
        if (seen.has(product.handle) || !isQuickAddable(product)) continue
        seen.add(product.handle)
        pool.push(product)
      }
    }

    // Merchant-curated picks lead
    try {
      const collection = await getCollectionProducts('cart-upsells', 30)
      if (collection) push(collection.products.edges.map((edge) => edge.node))
    } catch {
      // Collection is optional — fall through to the catalogue
    }

    // Then fill from the catalogue, cheapest first: low-friction impulse adds
    const rest = await getAllProducts(250)
    push(
      [...rest].sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      )
    )

    return NextResponse.json({ products: pool.slice(0, 12) })
  } catch {
    return NextResponse.json({ products: [] })
  }
}

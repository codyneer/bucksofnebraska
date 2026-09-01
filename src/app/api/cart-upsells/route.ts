import { NextResponse } from 'next/server'
import { getCollectionProducts, getAllProducts } from '@/lib/shopify'
import type { ShopifyProduct } from '@/lib/shopify'

// The carousel picks a size inline, so multi-variant products are fair game —
// they just need something in stock to sell.
function isSellable(product: ShopifyProduct): boolean {
  return product.variants.edges.some((edge) => edge.node.availableForSale)
}

// Accessories convert best as cart add-ons, apparel least — but the curated
// cart-upsells collection always outranks this, so ordering stays merchant-led.
const TYPE_PRIORITY = ['Decal', 'Mug', 'Tumbler', 'SnapBack', 'Hats', 'T-Shirt', 'Hoodie']

function typeRank(product: ShopifyProduct): number {
  const index = TYPE_PRIORITY.indexOf(product.productType ?? '')
  return index === -1 ? TYPE_PRIORITY.length : index
}

export async function GET() {
  try {
    const pool: ShopifyProduct[] = []
    const seen = new Set<string>()

    const push = (products: ShopifyProduct[]) => {
      for (const product of products) {
        if (seen.has(product.handle) || !isSellable(product)) continue
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

    // Then fill from the catalogue. Take one product per category in rotation
    // rather than all of a category at once — the store has 17 hats and 3
    // decals, so sorting by category alone would show nothing but hats.
    const rest = await getAllProducts(250)
    const byCategory = new Map<number, ShopifyProduct[]>()
    for (const product of rest) {
      if (seen.has(product.handle) || !isSellable(product)) continue
      const rank = typeRank(product)
      const bucket = byCategory.get(rank) ?? []
      bucket.push(product)
      byCategory.set(rank, bucket)
    }

    const ranks = [...byCategory.keys()].sort((a, b) => a - b)
    for (const bucket of byCategory.values()) {
      bucket.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      )
    }

    const interleaved: ShopifyProduct[] = []
    for (let round = 0; interleaved.length < 40; round += 1) {
      const before = interleaved.length
      for (const rank of ranks) {
        const next = byCategory.get(rank)?.[round]
        if (next) interleaved.push(next)
      }
      if (interleaved.length === before) break
    }
    push(interleaved)

    return NextResponse.json({ products: pool.slice(0, 16) })
  } catch {
    return NextResponse.json({ products: [] })
  }
}

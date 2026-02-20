import { NextResponse } from 'next/server'
import { getCollectionProducts, getAllProducts } from '@/lib/shopify'

export async function GET() {
  try {
    // Try to fetch from cart-upsells collection, fall back to general products
    const collection = await getCollectionProducts('cart-upsells', 4)

    if (collection && collection.products.edges.length > 0) {
      return NextResponse.json({
        products: collection.products.edges.map((e) => e.node),
      })
    }

    // Fallback: grab a few products for upselling
    const allProducts = await getAllProducts(4)
    return NextResponse.json({ products: allProducts.slice(0, 2) })
  } catch {
    return NextResponse.json({ products: [] })
  }
}

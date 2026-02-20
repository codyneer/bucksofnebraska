import { NextResponse } from 'next/server'
import { getAllProducts } from '@/lib/shopify'

export async function GET() {
  try {
    const products = await getAllProducts(50)
    return NextResponse.json({
      products: products.map((p) => ({ handle: p.handle, title: p.title })),
    })
  } catch {
    return NextResponse.json({ products: [] })
  }
}

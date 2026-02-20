import { NextRequest, NextResponse } from 'next/server'
import { addReview } from '@/lib/reviews'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product_handle, stars, text, author, location, photo_url, verified_purchase } = body

    if (!product_handle || !stars || !text || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const success = await addReview(product_handle, {
      stars,
      text,
      author,
      location: location || '',
      photo_url: photo_url || null,
      product_handle,
      verified_purchase: verified_purchase || false,
    })

    if (success) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

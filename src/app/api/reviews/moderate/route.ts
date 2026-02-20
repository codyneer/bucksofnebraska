import { NextRequest, NextResponse } from 'next/server'
import { updateReviewStatus } from '@/lib/reviews'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product_handle, review_id, status } = body

    if (!product_handle || !review_id || !['approved', 'denied'].includes(status)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const success = await updateReviewStatus(product_handle, review_id, status)

    if (success) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

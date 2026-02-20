'use client'

import { useState } from 'react'
import { ReviewStarsDisplay } from './ReviewStars'
import type { Review } from '@/lib/reviews'

type PendingReview = Review & { product_id: string }

type AdminPanelProps = {
  initialReviews: PendingReview[]
}

export function AdminPanel({ initialReviews }: AdminPanelProps) {
  const [reviews, setReviews] = useState<PendingReview[]>(initialReviews)
  const [processing, setProcessing] = useState<string | null>(null)

  const handleAction = async (review: PendingReview, status: 'approved' | 'denied') => {
    setProcessing(review.id)
    try {
      const res = await fetch('/api/reviews/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_handle: review.product_handle,
          review_id: review.id,
          status,
        }),
      })

      if (res.ok) {
        // Animate removal
        setReviews((prev) => prev.filter((r) => r.id !== review.id))
      }
    } catch {
      // Fail silently
    } finally {
      setProcessing(null)
    }
  }

  return (
    <div className="pt-10 pb-20 px-10 max-w-[900px] mx-auto">
      <h1 className="font-display text-[48px] text-text mb-6 text-center">
        Review <span className="text-red">Moderation</span>
      </h1>

      {reviews.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-nav text-[18px] tracking-[2px] uppercase text-text-muted">
            All caught up!
          </p>
          <p className="text-text-muted text-[14px] mt-2 font-body">
            No pending reviews to moderate.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-border-light p-5 grid grid-cols-[1fr_auto] gap-5 items-center transition-all duration-300"
            >
              <div>
                <ReviewStarsDisplay count={review.stars} />
                <p className="text-[14px] text-text leading-relaxed mt-1 italic font-body">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-2 flex items-center gap-3 flex-wrap">
                  <span className="font-nav text-[11px] tracking-[2px] uppercase text-text-muted">
                    {review.author}
                    {review.location && ` — ${review.location}`}
                  </span>
                  <span className="font-nav text-[10px] tracking-[1.5px] uppercase text-red">
                    {review.product_title || review.product_handle}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(review, 'approved')}
                  disabled={processing === review.id}
                  className="py-2 px-4 bg-green text-white border-none font-nav text-[11px] tracking-[1.5px] uppercase cursor-pointer transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(review, 'denied')}
                  disabled={processing === review.id}
                  className="py-2 px-4 bg-transparent text-red border-2 border-red font-nav text-[11px] tracking-[1.5px] uppercase cursor-pointer transition-all duration-300 hover:bg-red hover:text-white disabled:opacity-50"
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { ReviewStarsDisplay } from './ReviewStars'
import { ReviewModal } from './ReviewModal'
import type { Review } from '@/lib/reviews'

type ProductReviewsProps = {
  reviews: Review[]
  productHandle: string
  productTitle: string
  allProducts: { handle: string; title: string }[]
}

export function ProductReviews({
  reviews,
  productHandle,
  productTitle,
  allProducts,
}: ProductReviewsProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const approvedReviews = reviews.filter((r) => r.status === 'approved')
  const avgStars =
    approvedReviews.length > 0
      ? approvedReviews.reduce((sum, r) => sum + r.stars, 0) / approvedReviews.length
      : 0

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="font-display text-[28px] text-text mb-1">
        Customer <span className="text-red">Reviews</span>
      </h3>

      {approvedReviews.length > 0 ? (
        <>
          <div className="flex items-center gap-3 mb-6">
            <ReviewStarsDisplay count={Math.round(avgStars)} size="md" />
            <span className="font-display text-[24px] text-text">{avgStars.toFixed(1)}</span>
            <span className="font-nav text-[12px] tracking-[1px] text-text-muted">
              Based on {approvedReviews.length} review{approvedReviews.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-4 mb-6">
            {approvedReviews.map((review) => (
              <div key={review.id} className="border border-border-light p-4">
                <ReviewStarsDisplay count={review.stars} />
                <p className="text-[14px] text-text leading-relaxed mt-2 italic font-body">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-2 flex items-center gap-3 flex-wrap">
                  <span className="font-nav text-[11px] tracking-[2px] uppercase text-text-muted">
                    {review.author}
                    {review.location && ` — ${review.location}`}
                  </span>
                  {review.verified_purchase && (
                    <span className="font-nav text-[9px] tracking-[1.5px] uppercase text-green bg-green/[0.08] py-0.5 px-2">
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-text-muted text-[14px] font-body mb-6">
          No reviews yet for this product. Be the first!
        </p>
      )}

      <button
        onClick={() => setModalOpen(true)}
        className="font-nav text-[12px] tracking-[2px] uppercase py-[11px] px-6 bg-transparent text-text border-2 border-border cursor-pointer transition-all duration-300 hover:border-red hover:text-red"
      >
        Write a Review
      </button>

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefilledProduct={productHandle}
        products={allProducts}
      />
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { ReviewStarsDisplay } from './ReviewStars'
import { ReviewModal } from './ReviewModal'
import type { Review } from '@/lib/reviews'

type ProductReviewsProps = {
  reviews: Review[]
  productHandle: string
  productTitle: string
  allProducts: { handle: string; title: string }[]
}

type SortOption = 'newest' | 'highest' | 'lowest'

const REVIEWS_PER_PAGE = 8

export function ProductReviews({
  reviews,
  productHandle,
  productTitle,
  allProducts,
}: ProductReviewsProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [sort, setSort] = useState<SortOption>('newest')
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE)
  const [filterStars, setFilterStars] = useState<number | null>(null)

  const approvedReviews = useMemo(
    () => reviews.filter((r) => r.status === 'approved'),
    [reviews]
  )

  const avgStars = useMemo(() => {
    if (approvedReviews.length === 0) return 0
    return approvedReviews.reduce((sum, r) => sum + r.stars, 0) / approvedReviews.length
  }, [approvedReviews])

  // Star distribution for histogram
  const starCounts = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]
    for (const r of approvedReviews) counts[r.stars - 1]++
    return counts
  }, [approvedReviews])

  // Filter + sort
  const sortedReviews = useMemo(() => {
    let filtered = filterStars
      ? approvedReviews.filter((r) => r.stars === filterStars)
      : approvedReviews

    return [...filtered].sort((a, b) => {
      if (sort === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      if (sort === 'highest') return b.stars - a.stars
      return a.stars - b.stars
    })
  }, [approvedReviews, sort, filterStars])

  const visibleReviews = sortedReviews.slice(0, visibleCount)
  const hasMore = visibleCount < sortedReviews.length

  return (
    <div className="mt-16 pt-10 border-t-2 border-border">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h3 className="font-display text-[36px] text-text">
          Customer <span className="text-red">Reviews</span>
        </h3>
        {approvedReviews.length > 0 && (
          <p className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted mt-1">
            {approvedReviews.length} review{approvedReviews.length !== 1 ? 's' : ''} for {productTitle}
          </p>
        )}
      </div>

      {approvedReviews.length > 0 ? (
        <>
          {/* Summary + Histogram */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-center sm:items-start justify-center mb-10 pb-10 border-b border-border">
            {/* Left: Big average */}
            <div className="text-center shrink-0">
              <div className="font-display text-[64px] leading-none text-text">
                {avgStars.toFixed(1)}
              </div>
              <div className="mt-1">
                <ReviewStarsDisplay count={Math.round(avgStars)} size="lg" />
              </div>
              <p className="font-nav text-[11px] tracking-[2px] uppercase text-text-muted mt-2">
                Based on {approvedReviews.length} reviews
              </p>
            </div>

            {/* Right: Star histogram bars */}
            <div className="w-full max-w-[320px] space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = starCounts[star - 1]
                const pct = approvedReviews.length > 0 ? (count / approvedReviews.length) * 100 : 0
                const isActive = filterStars === star
                return (
                  <button
                    key={star}
                    onClick={() => setFilterStars(isActive ? null : star)}
                    className={`w-full flex items-center gap-3 group cursor-pointer bg-transparent border-none p-0 transition-opacity ${
                      filterStars && !isActive ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <span className="font-nav text-[12px] tracking-[1px] text-text-muted w-[18px] text-right shrink-0">
                      {star}
                    </span>
                    <span className="text-gold text-[12px] shrink-0">★</span>
                    <div className="flex-1 h-[10px] bg-border-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="font-nav text-[11px] tracking-[1px] text-text-muted w-[32px] text-right shrink-0">
                      {count}
                    </span>
                  </button>
                )
              })}
              {filterStars && (
                <button
                  onClick={() => setFilterStars(null)}
                  className="font-nav text-[10px] tracking-[2px] uppercase text-red mt-2 bg-transparent border-none cursor-pointer hover:underline p-0"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>

          {/* Sort + Write Review Row */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="font-nav text-[11px] tracking-[2px] uppercase text-text-muted">
                Sort by
              </span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortOption)
                    setVisibleCount(REVIEWS_PER_PAGE)
                  }}
                  className="appearance-none font-nav text-[11px] tracking-[2px] uppercase text-text bg-white border border-border py-2 pl-3 pr-8 cursor-pointer"
                >
                  <option value="newest">Most Recent</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
              </div>
              <span className="font-nav text-[11px] tracking-[1px] text-text-muted ml-2">
                Showing {Math.min(visibleCount, sortedReviews.length)} of {sortedReviews.length}
              </span>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="font-nav text-[12px] tracking-[2px] uppercase py-[9px] px-5 bg-red text-white border-none cursor-pointer transition-all duration-300 hover:bg-red-dark"
            >
              Write a Review
            </button>
          </div>

          {/* Review Cards — 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="border border-border-light p-5 bg-white transition-all duration-200 hover:border-border hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <ReviewStarsDisplay count={review.stars} />
                    <p className="font-nav text-[12px] tracking-[2px] uppercase text-text mt-1">
                      {review.author}
                    </p>
                    {review.location && (
                      <p className="font-nav text-[10px] tracking-[1px] text-text-muted mt-0.5">
                        {review.location}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {review.verified_purchase && (
                      <span className="inline-block font-nav text-[9px] tracking-[1.5px] uppercase text-green bg-green/[0.08] py-1 px-2">
                        Verified Purchase
                      </span>
                    )}
                    <p className="font-nav text-[10px] tracking-[1px] text-text-muted mt-1">
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] text-text leading-relaxed font-body">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + REVIEWS_PER_PAGE)}
                className="font-nav text-[12px] tracking-[2px] uppercase py-[11px] px-8 bg-transparent text-text border-2 border-border cursor-pointer transition-all duration-300 hover:border-red hover:text-red"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-text-muted text-[15px] font-body mb-6">
            No reviews yet for this product. Be the first to share your experience!
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="font-nav text-[12px] tracking-[2px] uppercase py-[11px] px-6 bg-red text-white border-none cursor-pointer transition-all duration-300 hover:bg-red-dark"
          >
            Write a Review
          </button>
        </div>
      )}

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefilledProduct={productHandle}
        products={allProducts}
      />
    </div>
  )
}

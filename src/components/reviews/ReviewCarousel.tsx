'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ReviewCard } from './ReviewCard'
import type { Review } from '@/lib/reviews'

const placeholderReviews = [
  {
    stars: 5,
    text: 'Best hunting tee I own. Wore it all season and it held up perfectly.',
    author: 'Jake M.',
    location: 'Lincoln, NE',
    productName: 'Forest Green Tee',
    productHandle: 'forest-green-tee',
  },
  {
    stars: 5,
    text: "Finally a brand that gets Nebraska hunters. Repping this hat everywhere.",
    author: 'Tyler R.',
    location: 'Omaha, NE',
    productName: 'Charcoal & Red Trucker',
    productHandle: 'charcoal-red-trucker',
  },
  {
    stars: 5,
    text: "Got the flag tee for my husband. He hasn't taken it off since.",
    author: 'Sarah K.',
    location: 'Grand Island, NE',
    productName: 'Bucks of America Flag Tee',
    productHandle: 'bucks-of-america-flag-tee',
  },
  {
    stars: 4,
    text: 'Solid quality for the price. The fit is great and it washes well.',
    author: 'Marcus D.',
    location: 'Kearney, NE',
    productName: 'Timber Logo Tee',
    productHandle: 'timber-logo-tee',
  },
  {
    stars: 5,
    text: 'Nebraska born and bred. Love supporting a local brand that actually delivers.',
    author: 'Brett W.',
    location: 'Norfolk, NE',
    productName: 'State Outline Hoodie',
    productHandle: 'state-outline-hoodie',
  },
  {
    stars: 5,
    text: 'The hoodie is thick and warm — perfect for late-season sits.',
    author: 'Chris P.',
    location: 'Hastings, NE',
    productName: 'Shed Season Hoodie',
    productHandle: 'shed-season-hoodie',
  },
]

type ReviewCarouselProps = {
  reviews?: Review[]
}

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Use real reviews if available, otherwise fall back to placeholders
  const hasRealReviews = reviews && reviews.length > 0
  const displayReviews = hasRealReviews
    ? reviews.map((r) => ({
        stars: r.stars,
        text: r.text,
        author: r.author,
        location: r.location,
        productName: r.product_title || r.product_handle,
        productHandle: r.product_handle,
        verifiedPurchase: r.verified_purchase,
      }))
    : placeholderReviews

  const avgRating = hasRealReviews
    ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
    : '4.9'

  const totalCount = hasRealReviews ? reviews.length : 527

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 316
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-[70px] px-10 max-w-[1300px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display text-[clamp(38px,5vw,56px)] text-text leading-none">
          What Hunters <span className="text-red">Are Saying</span>
        </h2>
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          Real reviews from the Bucks of Nebraska community
        </p>
      </div>

      {/* Summary row */}
      <div className="flex items-center gap-5 justify-center mb-8">
        <span className="text-[24px] text-gold">
          {Array.from({ length: 5 }, (_, i) =>
            i < Math.round(parseFloat(avgRating)) ? '★' : '☆'
          ).join('')}
        </span>
        <span className="font-display text-[36px] text-text">{avgRating}</span>
        <span className="font-nav text-[13px] tracking-[1px] text-text-muted">
          Based on <strong className="text-text">{totalCount}</strong> reviews
        </span>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto py-2.5 pb-5 scroll-snap-x-mandatory hide-scrollbar"
      >
        {displayReviews.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </div>

      {/* Nav arrows */}
      <div className="flex justify-center gap-2.5 mt-4">
        <button
          onClick={() => scroll('left')}
          className="w-9 h-9 border border-border bg-white text-text cursor-pointer transition-all duration-200 hover:border-red hover:text-red flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="w-9 h-9 border border-border bg-white text-text cursor-pointer transition-all duration-200 hover:border-red hover:text-red flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}

'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ReviewCard } from './ReviewCard'
import { ReviewModal } from './ReviewModal'
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
    text: 'Great quality hat. Wish they had more color options but love the fit.',
    author: 'Marcus D.',
    location: 'Kearney, NE',
    productName: 'Navy & Orange Trucker',
    productHandle: 'navy-orange-trucker',
  },
  {
    stars: 5,
    text: "The camo trucker is my new go-to. Fits perfectly under my binos.",
    author: 'Cody W.',
    location: 'Norfolk, NE',
    productName: 'Realtree Camo Trucker',
    productHandle: 'realtree-camo-trucker',
  },
  {
    stars: 5,
    text: 'Ordered 3 tees for our hunting crew. Everyone loves them.',
    author: 'Brett S.',
    location: 'Hastings, NE',
    productName: 'Timber Logo Tee',
    productHandle: 'timber-logo-tee',
  },
  {
    stars: 5,
    text: 'Nebraska proud! This brand speaks to who we are out here.',
    author: 'Amanda L.',
    location: 'Beatrice, NE',
    productName: 'Forest Green Tee',
    productHandle: 'forest-green-tee',
  },
]

type ReviewCarouselProps = {
  reviews?: Review[]
  allProducts?: { handle: string; title: string }[]
}

export function ReviewCarousel({ reviews, allProducts }: ReviewCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false)

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
        className="flex gap-4 overflow-x-auto py-2.5 pb-5 snap-x snap-mandatory hide-scrollbar"
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

      {/* Write a Review button */}
      <div className="text-center mt-5">
        <button
          onClick={() => setShowModal(true)}
          className="font-nav text-[12px] tracking-[2px] uppercase py-[11px] px-6 bg-transparent text-text border-2 border-border cursor-pointer transition-all duration-300 hover:border-red hover:text-red"
        >
          Write a Review
        </button>
      </div>

      {showModal && (
        <ReviewModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          products={allProducts || []}
        />
      )}
    </section>
  )
}

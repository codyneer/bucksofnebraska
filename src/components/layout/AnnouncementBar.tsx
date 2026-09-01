'use client'

import { Truck, Flame, Star, Layers } from 'lucide-react'
import type { ReviewStats } from '@/lib/reviews'

type AnnouncementBarProps = {
  reviewStats?: ReviewStats
}

export function AnnouncementBar({ reviewStats }: AnnouncementBarProps) {
  const rating = reviewStats?.avgRating || '4.7'
  const count = reviewStats && reviewStats.totalCount > 0 ? `${reviewStats.totalCount}+` : '500+'

  return (
    <div className="w-full bg-brand-black text-white text-center py-2.5 px-5 font-nav text-[12px] tracking-[2.5px] uppercase relative overflow-hidden marquee-container">
      <div className="inline-flex gap-[60px] animate-marquee whitespace-nowrap marquee-content">
        {[1, 2].map((dup) => (
          <div key={dup} className="inline-flex gap-[60px]">
            <span className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-red-light fill-red-light" />
              <span className="text-red-light font-semibold">FREE SHIPPING</span> on orders over $75
            </span>
            <span className="flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-red-light" />
              New Leviticus 11:3 Hats Just Dropped
            </span>
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-red-light" />
              Mix &amp; Match —{' '}
              <span className="text-red-light font-semibold">Any 2 Save 10%</span>, Any 3+ Save 15%
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              {rating}/5 Stars — {count} Happy Customers
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

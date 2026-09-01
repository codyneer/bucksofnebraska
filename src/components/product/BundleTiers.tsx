'use client'

import { useState } from 'react'
import { Flame } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { tierUnitDiscount } from '@/lib/cart-promos'

type Tier = {
  quantity: number
  priceEach: number
  label: string
  subtitle: string
  savingsPercent?: number
  badge?: string
}

type BundleTiersProps = {
  basePrice: number
  onTierChange: (quantity: number, priceEach: number) => void
}

export function BundleTiers({ basePrice, onTierChange }: BundleTiersProps) {
  const tiers: Tier[] = [
    {
      quantity: 1,
      priceEach: basePrice,
      label: '1 Item',
      subtitle: 'Standard price',
    },
    {
      quantity: 2,
      priceEach: basePrice - tierUnitDiscount(basePrice, 10),
      label: 'Any 2 Items',
      subtitle: 'Most popular — mix & match anything',
      savingsPercent: 10,
      badge: 'Save 10%',
    },
    {
      quantity: 3,
      priceEach: basePrice - tierUnitDiscount(basePrice, 15),
      label: 'Any 3+ Items',
      subtitle: 'Best value — stack it across your whole cart',
      savingsPercent: 15,
      badge: 'Save 15%',
    },
  ]

  const [selectedIndex, setSelectedIndex] = useState(1) // Pre-select Buy 2

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    onTierChange(tiers[index].quantity, tiers[index].priceEach)
  }

  return (
    <div className="mb-7 border-2 border-red overflow-hidden">
      {/* Header */}
      <div className="bg-red text-white px-3 sm:px-4 py-2.5 font-nav text-[11px] sm:text-[13px] tracking-[1.5px] sm:tracking-[2px] uppercase flex justify-between items-center">
        <span className="flex items-center gap-1.5">
          <Flame className="w-4 h-4" /> Bundle & Save
        </span>
        <span>Most Popular ↓</span>
      </div>

      {/* Tiers */}
      {tiers.map((tier, i) => (
        <div
          key={tier.quantity}
          onClick={() => handleSelect(i)}
          className={`px-3 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-2 border-b border-border-light last:border-b-0 cursor-pointer transition-colors duration-200 hover:bg-red/[0.03] ${
            selectedIndex === i ? 'bg-red/[0.06] border-l-[3px] border-l-red' : ''
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {/* Radio */}
            <div
              className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedIndex === i ? 'border-red' : 'border-border'
              }`}
            >
              {selectedIndex === i && (
                <div className="w-2.5 h-2.5 rounded-full bg-red" />
              )}
            </div>

            <div className="min-w-0">
              <div className="font-nav text-[13px] sm:text-[14px] tracking-[1px] uppercase text-text">
                {tier.label}
              </div>
              <div className="font-body text-[11px] sm:text-[12px] text-text-muted mt-0.5 truncate">
                {tier.subtitle}
              </div>
            </div>

            {tier.badge && (
              <span className="bg-green text-white font-nav text-[9px] sm:text-[10px] tracking-[1px] sm:tracking-[1.5px] uppercase py-0.5 px-1.5 sm:px-2 whitespace-nowrap">
                {tier.badge}
              </span>
            )}
          </div>

          <div className="text-right flex-shrink-0">
            <div className="font-display text-[18px] sm:text-[22px] text-red">
              {formatPrice(tier.priceEach)}{tier.quantity > 1 ? '/ea' : ''}
            </div>
            {tier.quantity > 1 && (
              <div className="text-[12px] text-text-muted line-through">
                {formatPrice(basePrice)}/ea
              </div>
            )}
          </div>
        </div>
      ))}

      {/* The discount keys off the whole cart, not this product's quantity */}
      <div className="bg-offWhite px-3 sm:px-4 py-2.5 border-t border-border-light">
        <p className="font-body text-[11px] sm:text-[12px] text-text-muted leading-snug">
          Mix &amp; match — the discount applies to any 2+ items in your cart, not
          just this one. Add it now or keep shopping and it still counts.
        </p>
      </div>
    </div>
  )
}

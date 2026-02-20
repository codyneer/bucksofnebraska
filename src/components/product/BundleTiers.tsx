'use client'

import { useState } from 'react'
import { Flame } from 'lucide-react'

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
      label: 'Buy 1',
      subtitle: 'Standard price',
    },
    {
      quantity: 2,
      priceEach: Math.round(basePrice * 0.86),
      label: 'Buy 2',
      subtitle: 'Most popular — mix & match',
      savingsPercent: 14,
      badge: 'Save 14%',
    },
    {
      quantity: 3,
      priceEach: Math.round(basePrice * 0.71),
      label: 'Buy 3+',
      subtitle: 'Best value — for you & the crew',
      savingsPercent: 29,
      badge: 'Save 29%',
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
      <div className="bg-red text-white px-4 py-2.5 font-nav text-[13px] tracking-[2px] uppercase flex justify-between items-center">
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
          className={`px-4 py-3.5 flex items-center justify-between border-b border-border-light last:border-b-0 cursor-pointer transition-colors duration-200 hover:bg-red/[0.03] ${
            selectedIndex === i ? 'bg-red/[0.06] border-l-[3px] border-l-red' : ''
          }`}
        >
          <div className="flex items-center gap-3">
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

            <div>
              <div className="font-nav text-[14px] tracking-[1px] uppercase text-text">
                {tier.label}
              </div>
              <div className="font-body text-[12px] text-text-muted mt-0.5">
                {tier.subtitle}
              </div>
            </div>

            {tier.badge && (
              <span className="bg-green text-white font-nav text-[10px] tracking-[1.5px] uppercase py-0.5 px-2 ml-2">
                {tier.badge}
              </span>
            )}
          </div>

          <div className="text-right">
            <div className="font-display text-[22px] text-red">
              ${tier.priceEach}{tier.quantity > 1 ? '/ea' : ''}
            </div>
            {tier.quantity > 1 && (
              <div className="text-[12px] text-text-muted line-through">
                ${basePrice}/ea
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

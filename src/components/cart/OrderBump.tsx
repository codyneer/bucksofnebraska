'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { Check } from 'lucide-react'

type OrderBumpProps = {
  productTitle: string
  variantId: string
  quantity: number
  price: number
  compareAtPrice: number
  description?: string
  imageUrl?: string
}

export function OrderBump({ productTitle, variantId, quantity, price, compareAtPrice, description, imageUrl }: OrderBumpProps) {
  const [checked, setChecked] = useState(false)
  const { addItem } = useCart()

  const savings = compareAtPrice - price
  const savingsPercent = Math.round((savings / compareAtPrice) * 100)

  const handleToggle = async () => {
    if (!checked) {
      setChecked(true)
      await addItem(variantId, quantity)
    }
  }

  return (
    <div className="mx-6 mb-4 border-2 border-dashed border-red p-4 bg-red/[0.02]">
      <div
        className="flex items-start gap-3 cursor-pointer"
        onClick={handleToggle}
      >
        <div
          className={`w-5 h-5 border-2 border-red flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
            checked ? 'bg-red' : ''
          }`}
        >
          {checked && <Check className="w-3 h-3 text-white" />}
        </div>
        {imageUrl && (
          <div className="relative w-[60px] h-[60px] flex-shrink-0 border border-border overflow-hidden">
            <Image
              src={imageUrl}
              alt={productTitle}
              fill
              className="object-cover"
              sizes="60px"
            />
          </div>
        )}
        <div className="flex-1">
          <h5 className="font-nav text-[13px] tracking-[1px] uppercase text-red mb-0.5">
            Add {productTitle} &amp; Save {savingsPercent}%?
          </h5>
          <p className="text-[12px] text-text-light leading-relaxed">
            {description || 'Exclusive cart-only deal! Add this to your order.'}
          </p>
          <div className="mt-1">
            <span className="text-text-muted line-through text-[14px] mr-1.5">
              ${compareAtPrice.toFixed(2)}
            </span>
            <span className="font-display text-[18px] text-red">${price.toFixed(2)}</span>
            <span className="ml-2 text-[11px] font-nav tracking-[1px] uppercase text-green bg-green/10 px-1.5 py-0.5">
              Save ${savings.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

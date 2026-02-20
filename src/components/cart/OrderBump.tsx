'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { Check } from 'lucide-react'

type OrderBumpProps = {
  productTitle: string
  variantId: string
  price: number
  compareAtPrice: number
}

export function OrderBump({ productTitle, variantId, price, compareAtPrice }: OrderBumpProps) {
  const [checked, setChecked] = useState(false)
  const { addItem } = useCart()

  const handleToggle = async () => {
    if (!checked) {
      setChecked(true)
      await addItem(variantId, 1)
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
        <div>
          <h5 className="font-nav text-[13px] tracking-[1px] uppercase text-red mb-0.5">
            Add {productTitle}?
          </h5>
          <p className="text-[12px] text-text-light leading-relaxed">
            Exclusive cart-only price! Add a premium decal to your order.
          </p>
          <div className="mt-1">
            <span className="text-text-muted line-through text-[14px] mr-1.5">
              ${compareAtPrice.toFixed(2)}
            </span>
            <span className="font-display text-[18px] text-red">${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

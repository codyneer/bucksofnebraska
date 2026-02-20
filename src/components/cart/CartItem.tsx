'use client'

import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import type { CartLine } from '@/lib/shopify'

type CartItemProps = {
  line: CartLine
}

export function CartItem({ line }: CartItemProps) {
  const { removeItem, updateItemQuantity } = useCart()
  const { merchandise, quantity } = line
  const price = parseFloat(merchandise.price.amount)

  return (
    <div className="grid grid-cols-[80px_1fr] gap-3.5 py-[18px] px-6 border-b border-border-light">
      {/* Thumbnail */}
      {merchandise.image ? (
        <Image
          src={merchandise.image.url}
          alt={merchandise.image.altText || merchandise.product.title}
          width={80}
          height={80}
          className="w-[80px] h-[80px] object-cover border border-border-light"
        />
      ) : (
        <div className="w-[80px] h-[80px] bg-offWhite flex items-center justify-center border border-border-light">
          <span className="font-display text-[20px] text-red">BN</span>
        </div>
      )}

      {/* Info */}
      <div>
        <h4 className="font-nav text-[14px] tracking-[1px] uppercase text-text">
          {merchandise.product.title}
        </h4>
        {merchandise.title !== 'Default Title' && (
          <p className="text-[12px] text-text-muted mt-0.5">{merchandise.title}</p>
        )}

        <div className="flex items-center gap-3 mt-1.5">
          {/* Quantity controls */}
          <div className="flex items-center border border-border">
            <button
              onClick={() => updateItemQuantity(line.id, quantity - 1)}
              className="w-7 h-7 bg-offWhite border-none text-text text-[14px] cursor-pointer transition-colors hover:bg-red/[0.08] flex items-center justify-center"
            >
              −
            </button>
            <span className="w-8 text-center font-nav text-[13px] h-7 leading-7 bg-white">
              {quantity}
            </span>
            <button
              onClick={() => updateItemQuantity(line.id, quantity + 1)}
              className="w-7 h-7 bg-offWhite border-none text-text text-[14px] cursor-pointer transition-colors hover:bg-red/[0.08] flex items-center justify-center"
            >
              +
            </button>
          </div>

          <span className="font-display text-[20px] text-red">
            {formatPrice(price * quantity)}
          </span>
        </div>

        <button
          onClick={() => removeItem(line.id)}
          className="bg-transparent border-none text-text-muted font-nav text-[11px] tracking-[1px] uppercase cursor-pointer transition-colors hover:text-red p-0 mt-1.5"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

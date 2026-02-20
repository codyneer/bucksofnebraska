'use client'

import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import type { ShopifyProduct } from '@/lib/shopify'

type CartUpsellsProps = {
  products: ShopifyProduct[]
}

export function CartUpsells({ products }: CartUpsellsProps) {
  const { addItem } = useCart()

  if (products.length === 0) return null

  return (
    <div className="px-6 pb-5 border-t border-border-light">
      <div className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted py-4 pb-3 flex items-center gap-2">
        Complete Your Kit
        <span className="flex-1 h-px bg-border-light" />
      </div>
      {products.slice(0, 2).map((product) => {
        const firstVariant = product.variants.edges[0]?.node
        const firstImage = product.images.edges[0]?.node
        const price = product.priceRange.minVariantPrice.amount
        const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount

        if (!firstVariant) return null

        return (
          <div
            key={product.id}
            className="flex items-center gap-3 p-3 bg-offWhite border border-border-light mb-2 transition-all duration-300 hover:border-red"
          >
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.altText || product.title}
                width={50}
                height={50}
                className="w-[50px] h-[50px] object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-[50px] h-[50px] bg-offWhite flex items-center justify-center border border-border-light flex-shrink-0">
                <span className="font-display text-[14px] text-red">BN</span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h5 className="font-nav text-[12px] tracking-[1px] uppercase text-text truncate">
                {product.title}
              </h5>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-[16px] text-red">
                  {formatPrice(price)}
                </span>
                {compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price) && (
                  <span className="text-[12px] text-text-muted line-through">
                    {formatPrice(compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => addItem(firstVariant.id)}
              className="py-2 px-3.5 bg-brand-black text-white border-none font-nav text-[11px] tracking-[1.5px] uppercase cursor-pointer transition-colors duration-300 hover:bg-red whitespace-nowrap"
            >
              Add
            </button>
          </div>
        )
      })}
    </div>
  )
}

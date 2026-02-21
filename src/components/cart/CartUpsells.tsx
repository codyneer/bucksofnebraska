'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import type { ShopifyProduct } from '@/lib/shopify'

type CartUpsellsProps = {
  products: ShopifyProduct[]
}

export function CartUpsells({ products }: CartUpsellsProps) {
  const { addItem, lines } = useCart()

  // Only show products with a single variant (quick-add eligible)
  const quickAddProducts = useMemo(
    () => products.filter((p) => p.variants.edges.length === 1),
    [products]
  )

  // Filter out products already in the cart
  const cartProductHandles = useMemo(
    () => new Set(lines.map((l) => l.merchandise.product.handle)),
    [lines]
  )

  const available = useMemo(
    () => quickAddProducts.filter((p) => !cartProductHandles.has(p.handle)),
    [quickAddProducts, cartProductHandles]
  )

  // Rotate which 2 products show based on cart item count (changes as cart changes)
  const displayed = useMemo(() => {
    if (available.length <= 2) return available
    const offset = lines.length % available.length
    const rotated = [...available.slice(offset), ...available.slice(0, offset)]
    return rotated.slice(0, 2)
  }, [available, lines.length])

  if (displayed.length === 0) return null

  return (
    <div className="px-4 sm:px-6 pb-5 border-t border-border-light">
      <div className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted py-4 pb-3 flex items-center gap-2">
        Add &amp; Save
        <span className="flex-1 h-px bg-border-light" />
      </div>
      {displayed.map((product) => {
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
              className="py-2.5 px-4 min-h-[44px] bg-brand-black text-white border-none font-nav text-[11px] tracking-[1.5px] uppercase cursor-pointer transition-colors duration-300 hover:bg-red whitespace-nowrap flex items-center"
            >
              Add
            </button>
          </div>
        )
      })}
    </div>
  )
}

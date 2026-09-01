'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Plus, Check } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/components/ui/Toast'
import { formatPrice } from '@/lib/utils'
import { trackAddToCart } from '@/lib/fb-events'
import type { ShopifyProduct } from '@/lib/shopify'

type CartUpsellsProps = {
  products: ShopifyProduct[]
  excludeVariantIds?: string[]
}

export function CartUpsells({ products, excludeVariantIds = [] }: CartUpsellsProps) {
  const { addItem, lines } = useCart()
  const { showToast } = useToast()
  const [addingHandle, setAddingHandle] = useState<string | null>(null)

  // Anything already in the cart drops out, so the rail only ever suggests
  // things they don't have — and it re-filters itself as they add.
  const cartProductHandles = useMemo(
    () => new Set(lines.map((line) => line.merchandise.product.handle)),
    [lines]
  )

  const available = useMemo(
    () =>
      products.filter((product) => {
        if (product.variants.edges.length !== 1) return false
        if (cartProductHandles.has(product.handle)) return false
        const variantId = product.variants.edges[0]?.node.id
        return !excludeVariantIds.includes(variantId)
      }),
    [products, cartProductHandles, excludeVariantIds]
  )

  if (available.length === 0) return null

  return (
    <div className="pb-5 border-t border-border-light">
      <div className="px-4 sm:px-6 font-nav text-[12px] tracking-[2px] uppercase text-text-muted py-4 pb-3 flex items-center gap-2">
        Add &amp; Save
        <span className="flex-1 h-px bg-border-light" />
        <span className="hidden sm:inline font-body text-[10px] tracking-normal normal-case text-text-muted/70 whitespace-nowrap">
          counts toward your bundle
        </span>
      </div>

      {/* Horizontal rail — more suggestions without eating the drawer's height */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 sm:px-6 snap-x snap-mandatory">
        {available.map((product) => {
          const variant = product.variants.edges[0]?.node
          const image = product.images.edges[0]?.node
          const price = product.priceRange.minVariantPrice.amount
          const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
          const isAdding = addingHandle === product.handle

          if (!variant) return null

          return (
            <div
              key={product.id}
              className="w-[132px] shrink-0 snap-start border border-border-light bg-white flex flex-col"
            >
              <div className="relative w-full aspect-square bg-offWhite">
                {image ? (
                  <Image
                    src={image.url}
                    alt={image.altText || product.title}
                    fill
                    sizes="132px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-[18px] text-red">BN</span>
                  </div>
                )}
              </div>

              <div className="p-2 flex flex-col flex-1">
                <h5 className="font-nav text-[10px] tracking-[0.5px] uppercase text-text leading-tight line-clamp-2 min-h-[24px]">
                  {product.title}
                </h5>

                <div className="flex items-baseline gap-1 mt-1 mb-2">
                  <span className="font-display text-[15px] text-red">{formatPrice(price)}</span>
                  {compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price) && (
                    <span className="text-[10px] text-text-muted line-through">
                      {formatPrice(compareAtPrice)}
                    </span>
                  )}
                </div>

                <button
                  disabled={isAdding}
                  onClick={async () => {
                    setAddingHandle(product.handle)
                    try {
                      await addItem(variant.id, 1, { suppressDrawer: true })
                      trackAddToCart({
                        contentName: product.title,
                        contentId: product.handle,
                        contentType: 'product',
                        value: parseFloat(price),
                      })
                      showToast('Added to cart', 'cart')
                    } finally {
                      setAddingHandle(null)
                    }
                  }}
                  className="mt-auto w-full py-2 min-h-[36px] bg-brand-black text-white border-none font-nav text-[10px] tracking-[1.5px] uppercase cursor-pointer transition-colors duration-300 hover:bg-red disabled:opacity-60 flex items-center justify-center gap-1"
                >
                  {isAdding ? (
                    <>
                      <Check className="w-3 h-3" /> Adding
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" /> Add
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

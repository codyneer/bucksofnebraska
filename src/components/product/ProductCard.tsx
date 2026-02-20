'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { formatPrice, calculateSavings } from '@/lib/utils'
import type { ShopifyProduct } from '@/lib/shopify'

type ProductCardProps = {
  product: ShopifyProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const firstImage = product.images.edges[0]?.node
  const firstVariant = product.variants.edges[0]?.node
  const price = product.priceRange.minVariantPrice.amount
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price)
  const savings = hasDiscount ? calculateSavings(price, compareAtPrice) : 0

  const lowestQuantity = product.variants.edges.reduce((min, { node }) => {
    if (node.quantityAvailable === null) return min
    return Math.min(min, node.quantityAvailable)
  }, Infinity)
  const showUrgency = lowestQuantity < 15 && lowestQuantity > 0

  const tag = product.tags.includes('best-seller')
    ? 'Best Seller'
    : product.tags.includes('new')
      ? 'New'
      : hasDiscount
        ? `Save ${savings > 0 ? `$${savings}` : ''}`
        : null

  const tagClass = product.tags.includes('best-seller')
    ? 'bg-red'
    : product.tags.includes('new')
      ? 'bg-brand-black'
      : 'bg-green'

  const hasOptions = product.variants.edges.length > 1

  const handleQuickAdd = (e: React.MouseEvent) => {
    if (hasOptions) return // let the Link navigate to PDP
    e.preventDefault()
    e.stopPropagation()
    if (firstVariant) {
      addItem(firstVariant.id)
    }
  }

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex flex-col bg-white border border-border-light overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-border hover:-translate-y-[3px] relative h-full"
    >
      {/* Tag badge */}
      {tag && (
        <span
          className={`absolute top-3 left-3 ${tagClass} text-white font-nav text-[10px] tracking-[2px] uppercase py-[5px] px-3 z-[2]`}
        >
          {tag}
        </span>
      )}

      {/* Product image */}
      {firstImage ? (
        <div className="relative overflow-hidden bg-offWhite" style={{ aspectRatio: '1 / 1' }}>
          <Image
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div
          className="bg-offWhite flex items-center justify-center"
          style={{ aspectRatio: '1 / 1' }}
        >
          <span className="font-display text-[40px] text-red">BN</span>
        </div>
      )}

      {/* Card body */}
      <div className="px-[18px] pt-4 pb-5 flex-1">
        <h3 className="font-nav text-[15px] tracking-[1px] uppercase text-text mb-1 line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-2.5">
          <span className="font-display text-[22px] text-red">{formatPrice(price)}</span>
          {hasDiscount && (
            <>
              <span className="font-display text-[16px] text-text-muted line-through">
                {formatPrice(compareAtPrice)}
              </span>
              <span className="font-nav text-[11px] text-green tracking-[1px] uppercase bg-green/[0.08] py-0.5 px-2 rounded-sm">
                Save ${savings}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Urgency badge */}
      {showUrgency && (
        <div className="px-[18px] py-1.5 bg-red/[0.04] border-t border-border-light font-nav text-[11px] text-red tracking-[1px] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse-dot" />
          Only {lowestQuantity} left in stock
        </div>
      )}

      {/* Quick Add button */}
      <div className="px-[18px] pb-[18px]">
        <button
          onClick={handleQuickAdd}
          className="w-full py-3 bg-brand-black text-white border-none font-nav text-[12px] tracking-[2px] uppercase cursor-pointer transition-all duration-300 hover:bg-red"
        >
          {hasOptions ? 'Choose Options' : 'Quick Add'}
        </button>
      </div>
    </Link>
  )
}

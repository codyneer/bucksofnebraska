'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Lock, Truck, RefreshCw, Eye } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import { BundleTiers } from './BundleTiers'
import { SizeSelector } from './SizeSelector'
import { ProductReviews } from '@/components/reviews/ProductReviews'
import type { ShopifyProduct, ProductVariant } from '@/lib/shopify'
import type { Review } from '@/lib/reviews'

type ProductDetailProps = {
  product: ShopifyProduct
  reviews?: Review[]
  allProducts?: { handle: string; title: string }[]
}

export function ProductDetail({ product, reviews = [], allProducts = [] }: ProductDetailProps) {
  const { addItem } = useCart()
  const images = product.images.edges.map((e) => e.node)
  const variants = product.variants.edges.map((e) => e.node)
  const basePrice = parseFloat(product.priceRange.minVariantPrice.amount)

  // Extract unique sizes from variants
  const sizes = useMemo(() => {
    const sizeSet = new Set<string>()
    variants.forEach((v) => {
      const sizeOption = v.selectedOptions.find(
        (o) => o.name.toLowerCase() === 'size'
      )
      if (sizeOption) sizeSet.add(sizeOption.value)
    })
    return Array.from(sizeSet)
  }, [variants])

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(sizes[1] || sizes[0] || '')
  const [tierQuantity, setTierQuantity] = useState(2)
  const [tierPrice, setTierPrice] = useState(Math.round(basePrice * 0.86))
  const [quantity, setQuantity] = useState(1)

  // Find the matching variant
  const selectedVariant: ProductVariant | undefined = useMemo(() => {
    if (sizes.length === 0) return variants[0]
    return variants.find((v) =>
      v.selectedOptions.some(
        (o) => o.name.toLowerCase() === 'size' && o.value === selectedSize
      )
    )
  }, [variants, selectedSize, sizes])

  const totalPrice = tierPrice * tierQuantity * quantity
  const viewerCount = 23 + Math.floor(Math.random() * 30)

  const handleAddToCart = () => {
    if (!selectedVariant) return
    addItem(selectedVariant.id, tierQuantity * quantity)
  }

  const handleTierChange = (qty: number, price: number) => {
    setTierQuantity(qty)
    setTierPrice(price)
  }

  return (
    <div className="pt-[40px] pb-20 px-4 sm:px-8 lg:px-10 max-w-[1060px] mx-auto">
      {/* Breadcrumb */}
      <p className="font-nav text-[11px] tracking-[2px] uppercase text-text-muted mb-3">
        <Link href="/" className="text-text-muted hover:text-red transition-colors">
          Home
        </Link>
        {' / '}
        <Link href="/shop" className="text-text-muted hover:text-red transition-colors">
          Shop
        </Link>
        {' / '}
        {product.title}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Image Gallery */}
        <div>
          {/* Main image */}
          {images[selectedImageIndex] ? (
            <Image
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].altText || product.title}
              width={600}
              height={690}
              className="w-full border border-border-light object-cover"
              style={{ aspectRatio: '1 / 1.15' }}
              priority
            />
          ) : (
            <div
              className="w-full bg-offWhite flex items-center justify-center border border-border-light"
              style={{ aspectRatio: '1 / 1.15' }}
            >
              <span className="font-display text-[60px] text-red">BN</span>
            </div>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`flex-shrink-0 w-[70px] h-[70px] border overflow-hidden cursor-pointer transition-all ${
                    selectedImageIndex === i
                      ? 'border-red'
                      : 'border-border-light hover:border-border'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.altText || `${product.title} ${i + 1}`}
                    width={70}
                    height={70}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="font-display text-[clamp(28px,6vw,38px)] text-text mb-1">{product.title}</h1>

          {/* Star rating */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gold text-[14px]">
                {Array.from({ length: 5 }, (_, i) => {
                  const avg = reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
                  return i < Math.round(avg) ? '★' : '☆'
                }).join('')}
              </span>
              <span className="text-[13px] text-text-muted">
                {(reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-5">
            <span className="font-display text-[32px] text-red">
              {formatPrice(basePrice)}
            </span>
          </div>

          {/* Description */}
          {product.descriptionHtml ? (
            <div
              className="text-text-light leading-relaxed mb-6 text-[15px] font-body"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : (
            <p className="text-text-light leading-relaxed mb-6 text-[15px] font-body">
              {product.description}
            </p>
          )}

          {/* Bundle Tiers */}
          <BundleTiers basePrice={basePrice} onTierChange={handleTierChange} />

          {/* Size Selector */}
          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-offWhite border-none text-text text-[18px] cursor-pointer transition-colors hover:bg-red/[0.08] flex items-center justify-center"
              >
                −
              </button>
              <span className="w-[50px] text-center font-nav text-[16px] h-10 leading-10 bg-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-offWhite border-none text-text text-[18px] cursor-pointer transition-colors hover:bg-red/[0.08] flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale}
            className="w-full py-[18px] bg-red text-white border-none font-nav text-[16px] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-red-dark hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            Add to Cart — {formatPrice(totalPrice)}
          </button>

          {/* Urgency */}
          <div className="flex items-center gap-2 mt-3.5 py-3 px-4 bg-red/[0.04] border border-red/10">
            <span className="w-2 h-2 rounded-full bg-red animate-pulse-dot" />
            <Eye className="w-3.5 h-3.5 text-red" />
            <span className="font-nav text-[12px] tracking-[1px] text-red">
              {viewerCount} people are viewing this right now
            </span>
          </div>

          {/* Trust icons */}
          <div className="flex gap-5 mt-5 flex-wrap">
            <span className="font-nav text-[11px] tracking-[1px] uppercase text-text-muted flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Secure Checkout
            </span>
            <span className="font-nav text-[11px] tracking-[1px] uppercase text-text-muted flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" /> Free Ship $75+
            </span>
            <span className="font-nav text-[11px] tracking-[1px] uppercase text-text-muted flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> 30-Day Returns
            </span>
          </div>

          {/* Product Reviews */}
          <ProductReviews
            reviews={reviews}
            productHandle={product.handle}
            productTitle={product.title}
            allProducts={allProducts}
          />
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Lock, Truck, RefreshCw, Eye } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/components/ui/Toast'
import { formatPrice } from '@/lib/utils'
import { BundleTiers } from './BundleTiers'
import { ProductReviews } from '@/components/reviews/ProductReviews'
import { trackAddToCart, trackViewContent } from '@/lib/fb-events'
import type { ShopifyProduct, ProductVariant } from '@/lib/shopify'
import type { Review } from '@/lib/reviews'

type ProductDetailProps = {
  product: ShopifyProduct
  reviews?: Review[]
  allProducts?: { handle: string; title: string }[]
}

export function ProductDetail({ product, reviews = [], allProducts = [] }: ProductDetailProps) {
  const { addItem } = useCart()
  const { showToast } = useToast()
  const images = product.images.edges.map((e) => e.node)
  const variants = product.variants.edges.map((e) => e.node)
  const basePrice = parseFloat(product.priceRange.minVariantPrice.amount)

  // Use Shopify product-level options (guaranteed complete, not limited by variant pagination)
  const productOptions = useMemo(() => {
    if (product.options && product.options.length > 0) {
      return product.options.map((o) => ({ name: o.name, values: o.values }))
    }
    // Fallback: extract from variants (for older cached data)
    const optionsMap = new Map<string, string[]>()
    variants.forEach((v) => {
      v.selectedOptions.forEach((o) => {
        if (!optionsMap.has(o.name)) {
          optionsMap.set(o.name, [])
        }
        const values = optionsMap.get(o.name)!
        if (!values.includes(o.value)) {
          values.push(o.value)
        }
      })
    })
    return Array.from(optionsMap.entries()).map(([name, values]) => ({ name, values }))
  }, [product.options, variants])

  // Initialize selected options — pick sensible defaults
  const initialOptions = useMemo(() => {
    const opts: Record<string, string> = {}
    productOptions.forEach((opt) => {
      if (opt.name.toLowerCase() === 'size' && opt.values.length > 1) {
        // Default to second size (usually M)
        opts[opt.name] = opt.values[1] || opt.values[0]
      } else {
        opts[opt.name] = opt.values[0]
      }
    })
    return opts
  }, [productOptions])

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialOptions)
  const [tierQuantity, setTierQuantity] = useState(2)
  const [tierPrice, setTierPrice] = useState(Math.round(basePrice * 0.86))
  const [quantity, setQuantity] = useState(1)

  // Find the matching variant based on ALL selected options
  const selectedVariant: ProductVariant | undefined = useMemo(() => {
    if (productOptions.length === 0) return variants[0]
    return variants.find((v) =>
      v.selectedOptions.every(
        (o) => selectedOptions[o.name] === o.value
      )
    )
  }, [variants, selectedOptions, productOptions])

  // When an option changes, update selection and swap image if variant has one
  const handleOptionChange = useCallback((optionName: string, value: string) => {
    setSelectedOptions((prev) => {
      const next = { ...prev, [optionName]: value }

      // Find the variant matching the new selection to swap image
      const matchingVariant = variants.find((v) =>
        v.selectedOptions.every((o) => next[o.name] === o.value)
      )

      if (matchingVariant?.image?.url) {
        // Find this image in the product images array
        const imgIndex = images.findIndex((img) => img.url === matchingVariant.image?.url)
        if (imgIndex >= 0) {
          setSelectedImageIndex(imgIndex)
        }
      }

      return next
    })
  }, [variants, images])

  const totalPrice = tierPrice * tierQuantity * quantity
  const viewerCount = 23 + Math.floor(Math.random() * 30)

  // Track ViewContent on product page load
  useEffect(() => {
    trackViewContent({
      contentName: product.title,
      contentId: product.handle,
      contentType: 'product',
      value: basePrice,
    })
  }, [product.handle, product.title, basePrice])

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    await addItem(selectedVariant.id, tierQuantity * quantity)
    trackAddToCart({
      contentName: product.title,
      contentId: product.handle,
      contentType: 'product',
      value: totalPrice,
      quantity: tierQuantity * quantity,
    })
    showToast('Added to cart', 'cart')
  }

  const handleTierChange = (qty: number, price: number) => {
    setTierQuantity(qty)
    setTierPrice(price)
  }

  // Determine which options are "color-like" for swatch rendering
  const isColorOption = (name: string) =>
    ['color', 'colour'].includes(name.toLowerCase())

  // Color name → hex mapping for swatches (covers Shopify common names)
  const colorMap: Record<string, string> = {
    'black': '#1A1A1A', 'white': '#FFFFFF', 'red': '#C41E3A', 'blue': '#2563EB',
    'navy': '#1E3A5F', 'navy blue': '#1E3A5F', 'green': '#2D7A3A', 'forest green': '#228B22',
    'olive': '#556B2F', 'gray': '#6B7280', 'grey': '#6B7280', 'charcoal': '#36454F',
    'brown': '#8B4513', 'tan': '#D2B48C', 'khaki': '#C3B091', 'cream': '#FFFDD0',
    'pink': '#EC4899', 'orange': '#F97316', 'yellow': '#EAB308', 'purple': '#7C3AED',
    'camo': '#4B5320', 'camouflage': '#4B5320', 'heather gray': '#9CA3AF',
    'heather grey': '#9CA3AF', 'light blue': '#93C5FD', 'dark green': '#064E3B',
    'sand': '#C2B280', 'sandstone': '#786D5F', 'natural': '#F5F0E8', 'slate': '#708090',
    'burgundy': '#800020', 'maroon': '#800000', 'teal': '#0D9488', 'coral': '#F87171',
    'moss': '#4A5D23', 'stone': '#928E85', 'sage': '#9CAF88', 'rust': '#B7410E',
    'wine': '#722F37', 'midnight': '#191970', 'sky blue': '#87CEEB', 'royal blue': '#4169E1',
    'hunter green': '#355E3B', 'evergreen': '#1B4D3E', 'pine': '#2A5F2A', 'cedar': '#6D4C33',
    'driftwood': '#A89078', 'timber': '#5D432C', 'wheat': '#D4B896', 'oatmeal': '#D3C5B0',
    'bone': '#E3DAC9', 'ivory': '#FFFFF0', 'ash': '#B2BEB5', 'silver': '#C0C0C0',
    'steel': '#71797E', 'graphite': '#41424C', 'onyx': '#353839', 'obsidian': '#1C1C1C',
    'espresso': '#3C2415', 'chocolate': '#5C3317', 'coffee': '#6F4E37', 'walnut': '#5D432C',
    'camel': '#C19A6B', 'clay': '#B66A50', 'copper': '#B87333', 'bronze': '#CD7F32',
    'gold': '#B8860B', 'mustard': '#E1AD01', 'amber': '#FFBF00', 'peach': '#FFCBA4',
    'blush': '#DE5D83', 'mauve': '#E0B0FF', 'lavender': '#B57EDC', 'plum': '#8E4585',
    'indigo': '#4B0082', 'cobalt': '#0047AB', 'denim': '#1560BD', 'powder blue': '#B0E0E6',
    'mint': '#98FB98', 'seafoam': '#93E9BE', 'jade': '#00A86B', 'emerald': '#50C878',
    'lime': '#32CD32', 'army green': '#4B5320', 'military green': '#4B5320',
    'dusty rose': '#DCAE96', 'rose': '#FF007F', 'magenta': '#FF00FF', 'berry': '#8E4585',
    'cranberry': '#9B1B30', 'cardinal': '#C41E3A', 'scarlet': '#FF2400',
    'heather black': '#3B3B3B', 'heather navy': '#3B4D6B', 'heather blue': '#6B8EB5',
    'vintage black': '#3B3B3B', 'washed black': '#4A4A4A',
  }

  // Always return a hex — fall back to a neutral tone for unknown colors
  const getColorHex = (colorName: string): string => {
    return colorMap[colorName.toLowerCase()] || '#A89078'
  }

  return (
    <div className="pt-6 sm:pt-[40px] pb-12 sm:pb-20 px-4 sm:px-8 lg:px-10 max-w-[1060px] mx-auto">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
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

          {/* Star rating — clicks to scroll to reviews */}
          {reviews.length > 0 && (
            <a
              href="#reviews"
              className="flex items-center gap-2 mb-3 no-underline cursor-pointer group"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="text-gold text-[14px]">
                {Array.from({ length: 5 }, (_, i) => {
                  const avg = reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
                  return i < Math.round(avg) ? '★' : '☆'
                }).join('')}
              </span>
              <span className="text-[13px] text-text-muted group-hover:text-red transition-colors">
                {(reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </a>
          )}

          {/* Price */}
          <div className="mb-5">
            <span className="font-display text-[32px] text-red">
              {selectedVariant ? formatPrice(selectedVariant.price.amount) : formatPrice(basePrice)}
            </span>
            {selectedVariant?.compareAtPrice && parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount) && (
              <span className="ml-2 text-[16px] text-text-muted line-through">
                {formatPrice(selectedVariant.compareAtPrice.amount)}
              </span>
            )}
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

          {/* All Option Selectors (Color, Size, Style, etc.) */}
          {productOptions.map((option) => {
            if (option.values.length <= 1 && option.name.toLowerCase() === 'title') return null

            const isColor = isColorOption(option.name)

            return (
              <div key={option.name} className="mb-5">
                <label className="block font-nav text-[12px] tracking-[2.5px] uppercase text-text-muted mb-2.5">
                  {option.name}
                  {selectedOptions[option.name] && (
                    <span className="ml-2 text-text normal-case tracking-normal">
                      — {selectedOptions[option.name]}
                    </span>
                  )}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {option.values.map((value) => {
                    const isSelected = selectedOptions[option.name] === value
                    const hex = isColor ? getColorHex(value) : undefined

                    // Check if this option value leads to an available variant
                    const testOptions = { ...selectedOptions, [option.name]: value }
                    const matchingVariant = variants.find((v) =>
                      v.selectedOptions.every((o) => testOptions[o.name] === o.value)
                    )
                    const isAvailable = matchingVariant?.availableForSale !== false

                    if (isColor) {
                      // Color swatch
                      return (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          title={value}
                          className={`relative w-10 h-10 rounded-full cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'ring-2 ring-red ring-offset-2'
                              : 'ring-1 ring-border hover:ring-red'
                          } ${!isAvailable ? 'opacity-30' : ''}`}
                          style={{ backgroundColor: hex }}
                        >
                          {!isAvailable && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="block w-[1px] h-full bg-text-muted rotate-45 absolute" />
                            </span>
                          )}
                        </button>
                      )
                    }

                    // Default button (Size, Style, etc.)
                    return (
                      <button
                        key={value}
                        onClick={() => handleOptionChange(option.name, value)}
                        className={`min-h-[44px] py-2.5 px-[18px] bg-white border font-nav text-[14px] tracking-[1px] cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-red text-red bg-red/[0.04]'
                            : 'border-border text-text hover:border-red hover:text-red hover:bg-red/[0.04]'
                        } ${!isAvailable ? 'opacity-40 line-through' : ''}`}
                        disabled={!isAvailable}
                      >
                        {value}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Out of stock notice */}
          {selectedVariant && !selectedVariant.availableForSale && (
            <p className="font-nav text-[13px] tracking-[1px] uppercase text-red mb-4">
              This combination is sold out
            </p>
          )}

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
        </div>
      </div>

      {/* Product Reviews — full width, outside the 2-col grid */}
      <ProductReviews
        reviews={reviews}
        productHandle={product.handle}
        productTitle={product.title}
        allProducts={allProducts}
      />
    </div>
  )
}

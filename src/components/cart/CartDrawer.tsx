'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { X, Lock, ChevronUp, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice, calculateShipping, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'
import { FreeShippingBar } from './FreeShippingBar'
import { CartItem } from './CartItem'
import { OrderBump } from './OrderBump'
import { CartUpsells } from './CartUpsells'
import { trackInitiateCheckout } from '@/lib/fb-events'
import { ORDER_BUMP_VARIANT_ID, ORDER_BUMP_DISCOUNT_CODE } from '@/lib/cart-promos'
import type { ShopifyProduct } from '@/lib/shopify'

export function CartDrawer() {
  const { cart, isOpen, closeCart, lines, itemCount, discountCodes, discountTotal } = useCart()
  const [upsellProducts, setUpsellProducts] = useState<ShopifyProduct[]>([])
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0
  // subtotalAmount is already net of product-scoped discounts; show the
  // pre-discount figure so Subtotal − Discount = Total reads correctly.
  const subtotalBeforeDiscount = subtotal + discountTotal
  const appliedCodes = discountCodes.filter((c) => c.applicable).map((c) => c.code)
  // The bump code is applied automatically, so it never needs an "unlock" hint
  const pendingReferralCode = discountCodes.find(
    (c) => !c.applicable && c.code.toUpperCase() !== ORDER_BUMP_DISCOUNT_CODE.toUpperCase()
  )?.code
  const totalAfterDiscount = cart ? parseFloat(cart.cost.totalAmount.amount) : subtotal
  const shipping = calculateShipping(subtotal)
  const total = totalAfterDiscount + shipping

  // Check scroll position to show/hide arrows
  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollUp(el.scrollTop > 5)
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 5)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => el.removeEventListener('scroll', checkScroll)
  }, [checkScroll, lines.length, isOpen])

  // Re-check after render when items change
  useEffect(() => {
    const timer = setTimeout(checkScroll, 100)
    return () => clearTimeout(timer)
  }, [lines.length, isOpen, checkScroll])

  // Fetch upsell products from cart-upsells collection (or fallback)
  useEffect(() => {
    if (!isOpen || upsellProducts.length > 0) return

    const fetchUpsells = async () => {
      try {
        const res = await fetch('/api/cart-upsells')
        if (res.ok) {
          const data = await res.json()
          setUpsellProducts(data.products || [])
        }
      } catch {
        // Upsells are optional, fail silently
      }
    }

    fetchUpsells()
  }, [isOpen, upsellProducts.length])

  // Order bump: Nebraska Outdoorsman Sticker Bundle — 20% off in cart only
  const bumpVariantId = ORDER_BUMP_VARIANT_ID
  const bumpQuantity = 1
  const bumpPrice = 23.98
  const bumpComparePrice = 29.97
  const bumpImageUrl = 'https://cdn.shopify.com/s/files/1/0398/3185/files/il_fullxfull.5523672868_s110.jpg?v=1706644705'

  const scrollItems = (direction: 'up' | 'down') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ top: direction === 'down' ? 180 : -180, behavior: 'smooth' })
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-200 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-[420px] max-w-[92vw] cart-drawer-height bg-white z-201 flex flex-col border-l-2 border-red transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-5 flex justify-between items-center border-b border-border shrink-0">
          <h2 className="font-display text-[24px] sm:text-[26px] text-text">Your Cart</h2>
          <button
            onClick={closeCart}
            className="bg-transparent border-none text-text text-[24px] cursor-pointer transition-colors hover:text-red"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {lines.length === 0 ? (
          /* Empty cart */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-16 px-5">
              <p className="font-nav text-[15px] tracking-[2px] uppercase text-text-muted mb-5">
                Your cart is empty
              </p>
              <button
                onClick={closeCart}
                className="font-nav text-[12px] tracking-[2px] uppercase py-[11px] px-6 bg-red text-white border-none cursor-pointer transition-all duration-300 hover:bg-red-dark"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Sticky: Free Shipping Bar */}
            <div className="shrink-0 border-b border-border">
              <FreeShippingBar subtotal={subtotal} />
            </div>

            {/* Scrollable cart items with arrows */}
            <div className="flex-1 min-h-0 relative">
              {/* Scroll up arrow */}
              {canScrollUp && (
                <button
                  onClick={() => scrollItems('up')}
                  className="absolute top-0 left-0 right-0 z-10 flex justify-center py-1 bg-gradient-to-b from-white via-white/90 to-transparent cursor-pointer border-none"
                >
                  <ChevronUp className="w-5 h-5 text-text-muted" />
                </button>
              )}

              <div ref={scrollRef} className="h-full overflow-y-auto overscroll-contain hide-scrollbar">
                {lines.map((line) => (
                  <CartItem key={line.id} line={line} />
                ))}

                {/* Order Bump */}
                <div className="border-t border-border pt-4">
                  <OrderBump
                    productTitle="Sticker Bundle"
                    variantId={bumpVariantId}
                    quantity={bumpQuantity}
                    price={bumpPrice}
                    compareAtPrice={bumpComparePrice}
                    description="Nebraska Outdoorsman Sticker Bundle — cart-only exclusive, 20% off!"
                    imageUrl={bumpImageUrl}
                    discountCode={ORDER_BUMP_DISCOUNT_CODE}
                  />
                </div>

                {/* Upsells */}
                {upsellProducts.length > 0 && (
                  <CartUpsells products={upsellProducts} excludeVariantIds={[bumpVariantId]} />
                )}
              </div>

              {/* Scroll down arrow */}
              {canScrollDown && (
                <button
                  onClick={() => scrollItems('down')}
                  className="absolute bottom-0 left-0 right-0 z-10 flex justify-center py-1 bg-gradient-to-t from-white via-white/90 to-transparent cursor-pointer border-none"
                >
                  <ChevronDown className="w-5 h-5 text-text-muted" />
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-[calc(1.25rem+env(safe-area-inset-bottom))] border-t border-border bg-offWhite shrink-0">
              {/* Savings banner */}
              {subtotal >= 50 && (
                <div className="text-center bg-green/[0.06] py-2 mb-3 font-nav text-[12px] text-green tracking-[1px] uppercase">
                  You&apos;re saving on this order!
                </div>
              )}

              {/* Subtotal */}
              <div className="flex justify-between mb-1.5">
                <span className="font-nav text-[13px] tracking-[2px] uppercase text-text-light">
                  Subtotal
                </span>
                <span className="font-display text-[18px] text-text">
                  {formatPrice(subtotalBeforeDiscount)}
                </span>
              </div>

              {/* Discount */}
              {discountTotal > 0 && (
                <div className="flex justify-between mb-1.5">
                  <span className="font-nav text-[13px] tracking-[2px] uppercase text-green">
                    Discount
                    {appliedCodes.length > 0 && (
                      <span className="text-text-muted ml-1 normal-case tracking-normal text-[11px]">
                        ({appliedCodes.join(', ')})
                      </span>
                    )}
                  </span>
                  <span className="font-display text-[18px] text-green">
                    -{formatPrice(discountTotal)}
                  </span>
                </div>
              )}

              {/* Referral code in cart but threshold not yet met */}
              {pendingReferralCode && discountTotal === 0 && (
                <div className="mb-1.5 py-1.5 px-2 bg-gold/10 border border-gold/20">
                  <p className="font-nav text-[11px] tracking-[1px] uppercase text-gold">
                    {pendingReferralCode} — Add $40+ to unlock $10 off
                  </p>
                </div>
              )}

              {/* Shipping */}
              <div className="flex justify-between mb-1.5">
                <span className="font-nav text-[13px] tracking-[2px] uppercase text-text-light">
                  Shipping
                </span>
                <span className="font-display text-[18px] text-text">
                  {shipping === 0 ? (
                    <span className="text-green">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-2 mt-2 border-t border-border mb-4">
                <span className="font-nav text-[14px] tracking-[2px] uppercase text-text">
                  Total
                </span>
                <span className="font-display text-[24px] sm:text-[28px] text-red">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Checkout button */}
              <a
                href={cart?.checkoutUrl || '#'}
                onClick={() => {
                  trackInitiateCheckout({
                    contentIds: lines.map((l) => l.merchandise.product.handle),
                    value: total,
                    numItems: itemCount,
                  })
                }}
                className="block w-full py-4 bg-red text-white text-center border-none font-nav text-[15px] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-red-dark"
              >
                Checkout
              </a>

              <p className="text-center mt-2.5 text-[11px] text-text-muted font-nav tracking-[1px] flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Secure checkout powered by Shopify
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

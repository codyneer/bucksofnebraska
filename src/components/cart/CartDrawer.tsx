'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { X, Lock, ChevronUp, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice, calculateShipping, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'
import { FreeShippingBar } from './FreeShippingBar'
import { CartItem } from './CartItem'
import { OrderBump } from './OrderBump'
import { CartUpsells } from './CartUpsells'
import type { ShopifyProduct } from '@/lib/shopify'

export function CartDrawer() {
  const { cart, isOpen, closeCart, lines, itemCount, discountCodes, discountTotal, applyDiscount } = useCart()
  const [upsellProducts, setUpsellProducts] = useState<ShopifyProduct[]>([])
  const [applyingDiscount, setApplyingDiscount] = useState(false)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0
  const totalAfterDiscount = cart ? parseFloat(cart.cost.totalAmount.amount) : subtotal
  const shipping = calculateShipping(totalAfterDiscount)
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
  const bumpVariantId = 'gid://shopify/ProductVariant/40760868896833'
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
        className={`fixed top-0 right-0 w-[420px] max-w-[92vw] h-screen bg-white z-201 flex flex-col border-l-2 border-red transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center border-b border-border shrink-0">
          <h2 className="font-display text-[26px] text-text">Your Cart</h2>
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
            {/* Sticky: Free Shipping Bar + Discount Code */}
            <div className="shrink-0 border-b border-border">
              <FreeShippingBar subtotal={subtotal} />

              {/* Discount Code Banner */}
              {discountCodes.length === 0 && (
                <div className="mx-5 mb-3 mt-1">
                  <button
                    onClick={async () => {
                      setApplyingDiscount(true)
                      await applyDiscount('SHEDSEASON')
                      setApplyingDiscount(false)
                    }}
                    disabled={applyingDiscount}
                    className="w-full flex items-center justify-between py-3 px-4 border-2 border-dashed border-red/40 bg-red/[0.04] cursor-pointer transition-all hover:border-red hover:bg-red/[0.08] disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-nav text-[11px] tracking-[2px] uppercase text-red">
                        SHEDSEASON
                      </span>
                      <span className="font-body text-[13px] text-text-light">
                        — 10% off your order
                      </span>
                    </div>
                    <span className="font-nav text-[10px] tracking-[1.5px] uppercase text-red bg-red/10 px-2 py-1">
                      {applyingDiscount ? 'Applying...' : 'Apply'}
                    </span>
                  </button>
                </div>
              )}
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

              <div ref={scrollRef} className="h-full overflow-y-auto hide-scrollbar">
                {lines.map((line) => (
                  <CartItem key={line.id} line={line} />
                ))}

                {/* Upsells */}
                {upsellProducts.length > 0 && (
                  <CartUpsells products={upsellProducts} />
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

            {/* Sticky: Order Bump */}
            <div className="shrink-0 border-t border-border">
              <OrderBump
                productTitle="Sticker Bundle"
                variantId={bumpVariantId}
                quantity={bumpQuantity}
                price={bumpPrice}
                compareAtPrice={bumpComparePrice}
                description="Nebraska Outdoorsman Sticker Bundle — cart-only exclusive, 20% off!"
                imageUrl={bumpImageUrl}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-border bg-offWhite shrink-0">
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
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* Discount */}
              {discountTotal > 0 && (
                <div className="flex justify-between mb-1.5">
                  <span className="font-nav text-[13px] tracking-[2px] uppercase text-green">
                    Discount
                    {discountCodes.length > 0 && discountCodes[0].applicable && (
                      <span className="text-text-muted ml-1 normal-case tracking-normal text-[11px]">
                        ({discountCodes[0].code})
                      </span>
                    )}
                  </span>
                  <span className="font-display text-[18px] text-green">
                    -{formatPrice(discountTotal)}
                  </span>
                </div>
              )}

              {/* Discount not yet applicable */}
              {discountCodes.length > 0 && !discountCodes[0].applicable && discountTotal === 0 && (
                <div className="mb-1.5 py-1.5 px-2 bg-gold/10 border border-gold/20">
                  <p className="font-nav text-[11px] tracking-[1px] uppercase text-gold">
                    {discountCodes[0].code} — Add $40+ to unlock $10 off
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
                <span className="font-display text-[28px] text-red">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Checkout button */}
              <a
                href={cart?.checkoutUrl || '#'}
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

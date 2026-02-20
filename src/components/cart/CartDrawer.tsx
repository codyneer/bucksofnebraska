'use client'

import { useEffect, useState } from 'react'
import { X, Lock } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice, calculateShipping, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'
import { FreeShippingBar } from './FreeShippingBar'
import { CartItem } from './CartItem'
import { OrderBump } from './OrderBump'
import { CartUpsells } from './CartUpsells'
import type { ShopifyProduct } from '@/lib/shopify'

export function CartDrawer() {
  const { cart, isOpen, closeCart, lines, itemCount } = useCart()
  const [upsellProducts, setUpsellProducts] = useState<ShopifyProduct[]>([])

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0
  const shipping = calculateShipping(subtotal)
  const total = subtotal + shipping

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

  // Order bump: 3x decals bundle deal
  const bumpVariantId = 'gid://shopify/ProductVariant/32297181708353' // Red Decal 4"
  const bumpQuantity = 3
  const bumpPrice = 18
  const bumpComparePrice = 24

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
        <div className="px-6 py-5 flex justify-between items-center border-b border-border">
          <h2 className="font-display text-[26px] text-text">Your Cart</h2>
          <button
            onClick={closeCart}
            className="bg-transparent border-none text-text text-[24px] cursor-pointer transition-colors hover:text-red"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {/* Free Shipping Bar */}
          <FreeShippingBar subtotal={subtotal} />

          {/* Cart Items */}
          {lines.length === 0 ? (
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
          ) : (
            <>
              {lines.map((line) => (
                <CartItem key={line.id} line={line} />
              ))}

              {/* Order Bump */}
              <div className="mt-4">
                <OrderBump
                  productTitle="3 BN Decals (4&quot;)"
                  variantId={bumpVariantId}
                  quantity={bumpQuantity}
                  price={bumpPrice}
                  compareAtPrice={bumpComparePrice}
                />
              </div>

              {/* Upsells */}
              {upsellProducts.length > 0 && (
                <CartUpsells products={upsellProducts} />
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="px-6 py-5 border-t border-border bg-offWhite">
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
        )}
      </div>
    </>
  )
}

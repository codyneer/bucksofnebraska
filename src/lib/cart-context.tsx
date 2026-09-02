'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import {
  createCart,
  getCart,
  addToCart as shopifyAddToCart,
  removeFromCart as shopifyRemoveFromCart,
  updateCart as shopifyUpdateCart,
  applyDiscountCode as shopifyApplyDiscount,
  type ShopifyCart,
  type CartLine,
  type DiscountCode,
} from './shopify'
import {
  ORDER_BUMP_VARIANT_ID,
  ORDER_BUMP_DISCOUNT_CODE,
  RETIRED_DISCOUNT_CODES,
} from './cart-promos'

type CartContextType = {
  cart: ShopifyCart | null
  isOpen: boolean
  isLoading: boolean
  itemCount: number
  discountCodes: DiscountCode[]
  discountTotal: number
  openCart: () => void
  closeCart: () => void
  addItem: (merchandiseId: string, quantity?: number, options?: { suppressDrawer?: boolean }) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateItemQuantity: (lineId: string, quantity: number) => Promise<void>
  applyDiscount: (code: string) => Promise<void>
  lines: CartLine[]
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const lines = cart?.lines.edges.map((e) => e.node) ?? []
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
  const discountCodes = cart?.discountCodes ?? []
  // Order-level codes allocate on the cart; product-scoped codes (e.g. the
  // order bump) allocate on each line instead — count both.
  const cartDiscountTotal = (cart?.discountAllocations ?? []).reduce(
    (sum, alloc) => sum + parseFloat(alloc.discountedAmount.amount),
    0
  )
  const lineDiscountTotal = lines.reduce(
    (sum, line) =>
      sum +
      (line.discountAllocations ?? []).reduce(
        (lineSum, alloc) => lineSum + parseFloat(alloc.discountedAmount.amount),
        0
      ),
    0
  )
  const discountTotal = cartDiscountTotal + lineDiscountTotal

  const stripRetiredDiscounts = useCallback(async (targetCart: ShopifyCart): Promise<ShopifyCart> => {
    const codes = targetCart.discountCodes ?? []
    if (codes.length === 0) return targetCart

    const remaining = codes
      .filter((c) => !RETIRED_DISCOUNT_CODES.includes(c.code.toUpperCase()))
      .map((c) => c.code)
    if (remaining.length === codes.length) return targetCart

    try {
      const result = await shopifyApplyDiscount(targetCart.id, remaining)
      if (result.cart) return result.cart
    } catch (error) {
      console.error('Failed to strip retired discount code:', error)
    }

    return targetCart
  }, [])

  const tryAutoApplyReferral = useCallback(async (targetCart: ShopifyCart): Promise<ShopifyCart> => {
    if (typeof window === 'undefined') return targetCart

    const referralCode = localStorage.getItem('referral_discount_code')
    if (!referralCode) return targetCart

    // Don't re-apply if already has discount codes
    if (targetCart.discountCodes && targetCart.discountCodes.length > 0) return targetCart

    try {
      const result = await shopifyApplyDiscount(targetCart.id, [referralCode])
      if (result.cart) {
        return result.cart
      }
    } catch (error) {
      console.error('Failed to auto-apply referral code:', error)
    }

    return targetCart
  }, [])

  const ensureCart = useCallback(async () => {
    if (cart) return cart

    const storedCartId = typeof window !== 'undefined' ? localStorage.getItem('shopify_cart_id') : null

    if (storedCartId) {
      try {
        const existingCart = await getCart(storedCartId)
        if (existingCart) {
          const cleanedCart = await stripRetiredDiscounts(existingCart)
          const cartWithDiscount = await tryAutoApplyReferral(cleanedCart)
          setCart(cartWithDiscount)
          return cartWithDiscount
        }
      } catch {
        // Cart expired or invalid, create a new one
      }
    }

    const newCart = await createCart()
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopify_cart_id', newCart.id)
    }
    const cartWithDiscount = await tryAutoApplyReferral(newCart)
    setCart(cartWithDiscount)
    return cartWithDiscount
  }, [cart, stripRetiredDiscounts, tryAutoApplyReferral])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1, options?: { suppressDrawer?: boolean }) => {
      setIsLoading(true)
      try {
        const currentCart = await ensureCart()
        const updatedCart = await shopifyAddToCart(currentCart.id, [{ merchandiseId, quantity }])
        setCart(updatedCart)
        if (!options?.suppressDrawer) {
          setIsOpen(true)
        }
      } catch (error) {
        console.error('Failed to add item to cart:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [ensureCart]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return
      setIsLoading(true)
      try {
        const updatedCart = await shopifyRemoveFromCart(cart.id, [lineId])
        setCart(updatedCart)
      } catch (error) {
        console.error('Failed to remove item from cart:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart]
  )

  const updateItemQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return
      setIsLoading(true)
      try {
        if (quantity <= 0) {
          const updatedCart = await shopifyRemoveFromCart(cart.id, [lineId])
          setCart(updatedCart)
        } else {
          const updatedCart = await shopifyUpdateCart(cart.id, [{ id: lineId, quantity }])
          setCart(updatedCart)
        }
      } catch (error) {
        console.error('Failed to update cart:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart]
  )

  const applyDiscount = useCallback(
    async (code: string) => {
      const currentCart = await ensureCart()
      const existing = (currentCart.discountCodes ?? []).map((c) => c.code)
      if (existing.some((c) => c.toUpperCase() === code.toUpperCase())) return
      try {
        const result = await shopifyApplyDiscount(currentCart.id, [...existing, code])
        if (result.cart) {
          setCart(result.cart)
        }
        if (result.userErrors?.length > 0) {
          console.error('Discount code error:', result.userErrors)
        }
      } catch (error) {
        console.error('Failed to apply discount:', error)
      }
    },
    [ensureCart]
  )

  // Restore the saved cart on load. The id has always survived in
  // localStorage, but nothing read it until the shopper added something — so
  // returning from checkout, or just reloading, looked like an empty cart.
  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedCartId = localStorage.getItem('shopify_cart_id')
    if (!storedCartId) return

    let cancelled = false

    const restore = async () => {
      try {
        const existingCart = await getCart(storedCartId)
        if (cancelled) return

        // Null means the cart expired or was completed at checkout
        if (!existingCart) {
          localStorage.removeItem('shopify_cart_id')
          return
        }

        const cleanedCart = await stripRetiredDiscounts(existingCart)
        const cartWithDiscount = await tryAutoApplyReferral(cleanedCart)
        if (!cancelled) setCart(cartWithDiscount)
      } catch {
        // A cart we can't fetch is a cart we shouldn't keep pointing at
        localStorage.removeItem('shopify_cart_id')
      }
    }

    restore()

    return () => {
      cancelled = true
    }
  }, [stripRetiredDiscounts, tryAutoApplyReferral])

  // The order-bump code is earned by clicking the bump, not by owning the
  // product — drop it if the bump product has left the cart. Also drop it when
  // Shopify marks it inapplicable (an automatic discount it can't combine with
  // has taken precedence), so checkout never shows an invalid code.
  useEffect(() => {
    if (!cart) return

    const codes = cart.discountCodes ?? []
    const bumpCode = codes.find(
      (c) => c.code.toUpperCase() === ORDER_BUMP_DISCOUNT_CODE.toUpperCase()
    )
    if (!bumpCode) return

    const hasBumpProduct = cart.lines.edges.some(
      (e) => e.node.merchandise.id === ORDER_BUMP_VARIANT_ID
    )
    if (hasBumpProduct && bumpCode.applicable) return

    const remaining = codes
      .filter((c) => c.code.toUpperCase() !== ORDER_BUMP_DISCOUNT_CODE.toUpperCase())
      .map((c) => c.code)

    let cancelled = false
    shopifyApplyDiscount(cart.id, remaining)
      .then((result) => {
        if (!cancelled && result.cart) setCart(result.cart)
      })
      .catch((error) => console.error('Failed to remove order bump discount:', error))

    return () => {
      cancelled = true
    }
  }, [cart])

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        itemCount,
        discountCodes,
        discountTotal,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateItemQuantity,
        applyDiscount,
        lines,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

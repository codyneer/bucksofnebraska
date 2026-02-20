'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import {
  createCart,
  getCart,
  addToCart as shopifyAddToCart,
  removeFromCart as shopifyRemoveFromCart,
  updateCart as shopifyUpdateCart,
  type ShopifyCart,
  type CartLine,
} from './shopify'

type CartContextType = {
  cart: ShopifyCart | null
  isOpen: boolean
  isLoading: boolean
  itemCount: number
  openCart: () => void
  closeCart: () => void
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateItemQuantity: (lineId: string, quantity: number) => Promise<void>
  lines: CartLine[]
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const lines = cart?.lines.edges.map((e) => e.node) ?? []
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)

  const ensureCart = useCallback(async () => {
    if (cart) return cart

    const storedCartId = typeof window !== 'undefined' ? localStorage.getItem('shopify_cart_id') : null

    if (storedCartId) {
      try {
        const existingCart = await getCart(storedCartId)
        if (existingCart) {
          setCart(existingCart)
          return existingCart
        }
      } catch {
        // Cart expired or invalid, create a new one
      }
    }

    const newCart = await createCart()
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopify_cart_id', newCart.id)
    }
    setCart(newCart)
    return newCart
  }, [cart])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setIsLoading(true)
      try {
        const currentCart = await ensureCart()
        const updatedCart = await shopifyAddToCart(currentCart.id, [{ merchandiseId, quantity }])
        setCart(updatedCart)
        setIsOpen(true)
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
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateItemQuantity,
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

'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useCart } from './cart-context'
import { UPSELL_TIERS } from './cart-promos'

type UpsellStage = 'idle' | 'offer-10' | 'offer-15'

type PendingUpsell = {
  merchandiseId: string
  productTitle: string
  productImage: string | null
  variantPrice: number
  variantTitle: string
}

type ProductMeta = {
  title: string
  image: string | null
  price: number
  variantTitle: string
}

type UpsellContextType = {
  upsellStage: UpsellStage
  pendingUpsell: PendingUpsell | null
  addItemWithUpsell: (merchandiseId: string, quantity: number, productMeta?: ProductMeta) => Promise<void>
  acceptUpsell: () => Promise<void>
  declineUpsell: () => Promise<void>
}

const UpsellContext = createContext<UpsellContextType | undefined>(undefined)

export function UpsellProvider({ children }: { children: ReactNode }) {
  const { addItem, openCart } = useCart()
  const [upsellStage, setUpsellStage] = useState<UpsellStage>('idle')
  const [pendingUpsell, setPendingUpsell] = useState<PendingUpsell | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const addItemWithUpsell = useCallback(
    async (merchandiseId: string, quantity: number, productMeta?: ProductMeta) => {
      // Only trigger upsell for qty 1 with product metadata, and not already showing
      if (quantity === 1 && productMeta && upsellStage === 'idle' && !isProcessing) {
        setPendingUpsell({
          merchandiseId,
          productTitle: productMeta.title,
          productImage: productMeta.image,
          variantPrice: productMeta.price,
          variantTitle: productMeta.variantTitle,
        })
        setUpsellStage('offer-10')
        return
      }

      // Fallback: normal add (qty > 1, no metadata, or upsell already active)
      await addItem(merchandiseId, quantity)
    },
    [addItem, upsellStage, isProcessing]
  )

  const acceptUpsell = useCallback(async () => {
    if (!pendingUpsell || isProcessing) return
    setIsProcessing(true)
    try {
      // Quantity comes from the tier so it matches the automatic Shopify
      // discount the offer promised.
      const tier = upsellStage === 'offer-15' ? UPSELL_TIERS['offer-15'] : UPSELL_TIERS['offer-10']
      await addItem(pendingUpsell.merchandiseId, tier.quantity, { suppressDrawer: true })
      setUpsellStage('idle')
      setPendingUpsell(null)
      openCart()
    } finally {
      setIsProcessing(false)
    }
  }, [pendingUpsell, upsellStage, addItem, openCart, isProcessing])

  const declineUpsell = useCallback(async () => {
    if (!pendingUpsell || isProcessing) return

    if (upsellStage === 'offer-10') {
      // Move to second offer
      setUpsellStage('offer-15')
      return
    }

    // Final decline: add just 1 and open cart
    setIsProcessing(true)
    try {
      await addItem(pendingUpsell.merchandiseId, 1, { suppressDrawer: true })
      setUpsellStage('idle')
      setPendingUpsell(null)
      openCart()
    } finally {
      setIsProcessing(false)
    }
  }, [pendingUpsell, upsellStage, addItem, openCart, isProcessing])

  return (
    <UpsellContext.Provider
      value={{
        upsellStage,
        pendingUpsell,
        addItemWithUpsell,
        acceptUpsell,
        declineUpsell,
      }}
    >
      {children}
    </UpsellContext.Provider>
  )
}

export function useUpsell() {
  const context = useContext(UpsellContext)
  if (!context) {
    throw new Error('useUpsell must be used within an UpsellProvider')
  }
  return context
}

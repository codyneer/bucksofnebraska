'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useUpsell } from '@/lib/upsell-context'
import { formatPrice } from '@/lib/utils'

export function UpsellModal() {
  const { upsellStage, pendingUpsell, acceptUpsell, declineUpsell } = useUpsell()

  const isOpen = upsellStage !== 'idle' && pendingUpsell !== null

  // Lock body scroll when modal is open
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

  // Escape key to decline
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') declineUpsell()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, declineUpsell])

  if (!isOpen || !pendingUpsell) return null

  const { productTitle, productImage, variantPrice } = pendingUpsell
  const isFirstOffer = upsellStage === 'offer-10'
  const discountPercent = isFirstOffer ? 10 : 12
  const multiplier = isFirstOffer ? 0.90 : 0.88
  const discountedPrice = variantPrice * multiplier
  const totalForTwo = discountedPrice * 2
  const savingsPerItem = variantPrice - discountedPrice
  const totalSavings = savingsPerItem * 2

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[300] transition-opacity duration-300"
        onClick={declineUpsell}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-[440px] relative animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={declineUpsell}
            className="absolute top-3 right-3 text-text-muted hover:text-text transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Red header bar */}
          <div className="bg-red px-6 py-4 text-center">
            {isFirstOffer ? (
              <h2 className="font-display text-[28px] sm:text-[32px] text-white leading-none">
                BUY 2 & SAVE {discountPercent}%
              </h2>
            ) : (
              <>
                <p className="font-nav text-[11px] tracking-[2px] uppercase text-white/80 mb-1">
                  Wait — one more chance!
                </p>
                <h2 className="font-display text-[28px] sm:text-[32px] text-white leading-none">
                  {discountPercent}% OFF IF YOU BUY 2
                </h2>
              </>
            )}
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            {/* Product info */}
            <div className="flex items-center gap-4 mb-5">
              {productImage && (
                <div className="w-[70px] h-[70px] shrink-0 border border-border-light overflow-hidden">
                  <Image
                    src={productImage}
                    alt={productTitle}
                    width={70}
                    height={70}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-nav text-[13px] tracking-[1.5px] uppercase text-text truncate">
                  {productTitle}
                </p>
                <p className="font-body text-[13px] text-text-muted mt-0.5">
                  {isFirstOffer
                    ? 'Grab another and save on each!'
                    : "Okay, we'll sweeten the deal."}
                </p>
              </div>
            </div>

            {/* Price comparison */}
            <div className="border border-border-light divide-y divide-border-light mb-5">
              {/* 1x row */}
              <div className="flex items-center justify-between px-4 py-3 bg-white">
                <div className="flex items-center gap-2">
                  <span className="font-nav text-[12px] tracking-[1.5px] uppercase text-text-muted">
                    1x
                  </span>
                  <span className="font-body text-[13px] text-text-light">Standard</span>
                </div>
                <span className="font-display text-[18px] text-text">
                  {formatPrice(variantPrice)}
                </span>
              </div>

              {/* 2x row (highlighted) */}
              <div className="flex items-center justify-between px-4 py-3 bg-red/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="font-nav text-[12px] tracking-[1.5px] uppercase text-red font-bold">
                    2x
                  </span>
                  <span className="font-body text-[13px] text-text">
                    {formatPrice(discountedPrice)}/ea
                  </span>
                  <span className="font-nav text-[10px] tracking-[1px] uppercase bg-green/10 text-green px-1.5 py-0.5">
                    Save {discountPercent}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display text-[18px] text-red">
                    {formatPrice(totalForTwo)}
                  </span>
                </div>
              </div>
            </div>

            {/* Savings callout */}
            <div className="text-center mb-5">
              <span className="font-nav text-[11px] tracking-[1.5px] uppercase text-green">
                You save {formatPrice(totalSavings)} on 2!
              </span>
            </div>

            {/* Accept CTA */}
            <button
              onClick={acceptUpsell}
              className="w-full py-4 bg-red text-white font-nav text-[14px] tracking-[3px] uppercase cursor-pointer border-none transition-all duration-300 hover:bg-red-dark"
            >
              {isFirstOffer ? "Yes, I'll take two!" : 'Grab the deal!'}
            </button>

            {/* Decline link */}
            <button
              onClick={declineUpsell}
              className="w-full mt-3 py-2 bg-transparent border-none cursor-pointer font-body text-[13px] text-text-muted underline-offset-2 hover:underline hover:text-text transition-colors"
            >
              {isFirstOffer ? 'No thanks, just one' : 'No thanks'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

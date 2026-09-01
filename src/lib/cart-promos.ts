// Cart-only promotions. The order bump adds a product AND applies its discount
// code — the code is never applied any other way, so a shopper who adds the
// same product from a product page pays full price.

export const ORDER_BUMP_VARIANT_ID = 'gid://shopify/ProductVariant/40760868896833'
export const ORDER_BUMP_DISCOUNT_CODE = 'StickerBundle'

// Promo codes that have ended — stripped from any cart that still carries them
export const RETIRED_DISCOUNT_CODES = ['SHEDSEASON']

// Post-add upsell ladder. These mirror the store's automatic quantity
// discounts — "Buy 2 Save 10%" and "BUY 3+ SAVE 15%" — which Shopify applies
// on its own once the cart hits the quantity. No discount code is involved, so
// the offer quantities below MUST stay in sync with those two discounts.
export const UPSELL_TIERS = {
  'offer-10': { quantity: 2, percentOff: 10 },
  'offer-15': { quantity: 3, percentOff: 15 },
} as const

export type UpsellOfferStage = keyof typeof UPSELL_TIERS

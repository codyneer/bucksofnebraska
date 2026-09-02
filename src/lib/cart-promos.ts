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

// The automatic "Buy 2 Save 10%" and "BUY 3+ SAVE 15%" discounts are scoped to
// these collections in Shopify. Products outside them get NO quantity discount,
// so the bundle tiers and the post-add upsell must not be offered there.
export const QUANTITY_DISCOUNT_COLLECTIONS = [
  'shirts',
  'hoodies',
  'new-arrivals',
  'hats',
  'decals',
]

export function hasQuantityDiscount(
  collections?: { edges: { node: { handle: string } }[] }
): boolean {
  if (!collections) return false
  return collections.edges.some((e) =>
    QUANTITY_DISCOUNT_COLLECTIONS.includes(e.node.handle)
  )
}

// Shopify truncates each unit's discount to whole cents rather than rounding,
// so $29.97 at 15% is $4.49 off (not $4.50) — matching it exactly keeps the
// advertised price identical to what checkout charges.
export function quantityTierFor(eligibleQuantity: number): number {
  if (eligibleQuantity >= 3) return 15
  if (eligibleQuantity >= 2) return 10
  return 0
}

export function tierUnitDiscount(unitPrice: number, percentOff: number): number {
  return Math.floor(unitPrice * (percentOff / 100) * 100) / 100
}

export type ShippingProfileRate = {
  name: string
  isDefault: boolean
  handles: string[]
  rate: number
}

/**
 * What free shipping is worth on this cart.
 *
 * Shopify charges shipping per delivery profile, not per item, and bills every
 * profile represented in the cart — so a hat plus a sticker bundle is charged
 * the hats rate AND the general rate. Sum one rate per distinct profile, never
 * per unit.
 */
export function avoidedShippingCost(
  productHandles: string[],
  profiles: ShippingProfileRate[]
): number {
  if (profiles.length === 0 || productHandles.length === 0) return 0

  const fallback = profiles.find((profile) => profile.isDefault)
  const representedProfiles = new Set<string>()

  for (const handle of productHandles) {
    const match = profiles.find(
      (profile) => !profile.isDefault && profile.handles.includes(handle)
    )
    // Anything not claimed by a specific profile falls to the default one
    const owner = match ?? fallback
    if (owner) representedProfiles.add(owner.name)
  }

  return profiles
    .filter((profile) => representedProfiles.has(profile.name))
    .reduce((sum, profile) => sum + profile.rate, 0)
}

/**
 * A line Shopify will refuse at checkout — the variant sold out, or the product
 * was unpublished after it was added. Absent flags mean an older cached shape,
 * which we treat as available rather than blocking a valid cart.
 */
export function isLineUnavailable(line: {
  merchandise: { availableForSale?: boolean; product: { availableForSale?: boolean } }
}): boolean {
  return line.merchandise.availableForSale === false ||
    line.merchandise.product.availableForSale === false
}

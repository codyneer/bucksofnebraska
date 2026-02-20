import {
  shopifyAdminFetch,
  GET_SHOP_ID,
  GET_SHOP_METAFIELD,
  UPDATE_PRODUCT_METAFIELD,
  CREATE_DISCOUNT_CODE,
} from './shopify-admin'

// --------------- Types ---------------

export type Referral = {
  code: string
  email: string
  discount_code_id: string
  discount_code: string
  created_at: string
  friends_purchased: number
  credit_earned: number
}

// --------------- Code Generation ---------------

export function generateReferralCode(email: string, existingCodes: string[]): string {
  const localPart = email.split('@')[0] || 'FRIEND'
  const cleaned = localPart.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6)
  const prefix = cleaned || 'FRIEND'

  // Try up to 10 times to generate a unique code
  for (let i = 0; i < 10; i++) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const suffix = chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)]
    const code = `BUDDY-${prefix}${suffix}`

    if (!existingCodes.includes(code)) {
      return code
    }
  }

  // Fallback: use timestamp-based suffix
  const ts = Date.now().toString(36).toUpperCase().slice(-4)
  return `BUDDY-${prefix}${ts}`
}

// --------------- Shop ID ---------------

let cachedShopId: string | null = null

async function getShopId(): Promise<string> {
  if (cachedShopId) return cachedShopId

  const data = await shopifyAdminFetch<{ shop: { id: string } }>({
    query: GET_SHOP_ID,
  })

  cachedShopId = data.shop.id
  return data.shop.id
}

// --------------- Referral CRUD ---------------

export async function getReferrals(): Promise<Referral[]> {
  try {
    const data = await shopifyAdminFetch<{
      shop: {
        id: string
        metafield: { id: string; value: string } | null
      }
    }>({
      query: GET_SHOP_METAFIELD,
      variables: { namespace: 'custom', key: 'referrals' },
    })

    if (!data.shop.metafield?.value) return []

    const parsed = JSON.parse(data.shop.metafield.value)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to get referrals:', error)
    return []
  }
}

export async function saveReferrals(referrals: Referral[]): Promise<boolean> {
  try {
    const shopId = await getShopId()

    const data = await shopifyAdminFetch<{
      metafieldsSet: {
        metafields: { id: string }[]
        userErrors: { field: string; message: string }[]
      }
    }>({
      query: UPDATE_PRODUCT_METAFIELD,
      variables: {
        metafields: [
          {
            ownerId: shopId,
            namespace: 'custom',
            key: 'referrals',
            type: 'json',
            value: JSON.stringify(referrals),
          },
        ],
      },
    })

    if (data.metafieldsSet.userErrors.length > 0) {
      console.error('Metafield save errors:', data.metafieldsSet.userErrors)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to save referrals:', error)
    return false
  }
}

export async function findReferralByCode(code: string): Promise<Referral | null> {
  const referrals = await getReferrals()
  return referrals.find((r) => r.code.toUpperCase() === code.toUpperCase()) ?? null
}

export async function findReferralByEmail(email: string): Promise<Referral | null> {
  const referrals = await getReferrals()
  return referrals.find((r) => r.email.toLowerCase() === email.toLowerCase()) ?? null
}

export async function addReferral(referral: Referral): Promise<boolean> {
  const referrals = await getReferrals()
  referrals.push(referral)
  return saveReferrals(referrals)
}

// --------------- Shopify Discount Creation ---------------

export async function createReferralDiscount(code: string): Promise<{
  id: string
  code: string
} | null> {
  try {
    const data = await shopifyAdminFetch<{
      discountCodeBasicCreate: {
        codeDiscountNode: {
          id: string
          codeDiscount: {
            title: string
            codes: { edges: { node: { code: string } }[] }
          }
        } | null
        userErrors: { field: string; message: string }[]
      }
    }>({
      query: CREATE_DISCOUNT_CODE,
      variables: {
        basicCodeDiscount: {
          title: `Referral - ${code}`,
          code,
          startsAt: new Date().toISOString(),
          usageLimit: 1,
          customerGets: {
            value: {
              discountAmount: {
                amount: '10.00',
                appliesOnEachItem: false,
              },
            },
            items: {
              all: true,
            },
          },
          customerSelection: {
            all: true,
          },
          minimumRequirement: {
            subtotal: {
              greaterThanOrEqualToSubtotal: '40.00',
            },
          },
          combinesWith: {
            orderDiscounts: false,
            productDiscounts: false,
            shippingDiscounts: true,
          },
        },
      },
    })

    if (data.discountCodeBasicCreate.userErrors.length > 0) {
      console.error('Discount creation errors:', data.discountCodeBasicCreate.userErrors)
      return null
    }

    const node = data.discountCodeBasicCreate.codeDiscountNode
    if (!node) return null

    return {
      id: node.id,
      code: node.codeDiscount.codes.edges[0]?.node.code ?? code,
    }
  } catch (error) {
    console.error('Failed to create discount code:', error)
    return null
  }
}

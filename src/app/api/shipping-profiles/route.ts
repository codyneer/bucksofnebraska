import { NextResponse } from 'next/server'
import { shopifyAdminFetch } from '@/lib/shopify-admin'

// Rates are read from Shopify rather than hardcoded, so editing a shipping rate
// in the admin changes what the cart reports with no code change.
export const revalidate = 3600

const DELIVERY_PROFILES_QUERY = `
  {
    deliveryProfiles(first: 20) {
      nodes {
        name
        default
        profileItems(first: 250) { nodes { product { handle } } }
        profileLocationGroups {
          locationGroupZones(first: 10) {
            nodes {
              methodDefinitions(first: 20) {
                nodes {
                  active
                  rateProvider {
                    __typename
                    ... on DeliveryRateDefinition { price { amount } }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

type ProfilesResponse = {
  deliveryProfiles: {
    nodes: {
      name: string
      default: boolean
      profileItems: { nodes: { product: { handle: string } | null }[] }
      profileLocationGroups: {
        locationGroupZones: {
          nodes: {
            methodDefinitions: {
              nodes: {
                active: boolean
                rateProvider: { __typename: string; price?: { amount: string } }
              }[]
            }
          }[]
        }
      }[]
    }[]
  }
}

export type ShippingProfile = {
  name: string
  isDefault: boolean
  handles: string[]
  /**
   * The highest paid rate in the profile — what an order in it would be charged
   * just below the free-shipping threshold, i.e. the amount free shipping saves.
   */
  rate: number
}

export async function GET() {
  try {
    const data = await shopifyAdminFetch<ProfilesResponse>({ query: DELIVERY_PROFILES_QUERY })

    const profiles: ShippingProfile[] = data.deliveryProfiles.nodes.map((profile) => {
      const paidRates = profile.profileLocationGroups
        .flatMap((group) => group.locationGroupZones.nodes)
        .flatMap((zone) => zone.methodDefinitions.nodes)
        .filter((method) => method.active && method.rateProvider.price)
        .map((method) => parseFloat(method.rateProvider.price!.amount))
        .filter((amount) => amount > 0)

      return {
        name: profile.name,
        isDefault: profile.default,
        handles: profile.profileItems.nodes
          .map((item) => item.product?.handle)
          .filter((handle): handle is string => Boolean(handle)),
        rate: paidRates.length > 0 ? Math.max(...paidRates) : 0,
      }
    })

    return NextResponse.json({ profiles })
  } catch {
    // Shipping credit is a bonus line — never block the cart on it
    return NextResponse.json({ profiles: [] })
  }
}

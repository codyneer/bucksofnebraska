const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!

const endpoint = `https://${domain}/admin/api/2024-01/graphql.json`

export async function shopifyAdminFetch<T>({
  query,
  variables,
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`Shopify Admin API error: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join('\n'))
  }

  return json.data
}

// Get product metafield (reviews JSON)
export const GET_PRODUCT_METAFIELD = `
  query GetProductMetafield($handle: String!) {
    productByHandle(handle: $handle) {
      id
      metafield(namespace: "custom", key: "reviews") {
        id
        value
      }
    }
  }
`

// Update product metafield
export const UPDATE_PRODUCT_METAFIELD = `
  mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        id
        key
        value
      }
      userErrors {
        field
        message
      }
    }
  }
`

// Get all products with reviews metafield (for admin panel)
export const GET_ALL_PRODUCTS_WITH_REVIEWS = `
  query AllProductsReviews($first: Int = 50) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          metafield(namespace: "custom", key: "reviews") {
            id
            value
          }
        }
      }
    }
  }
`

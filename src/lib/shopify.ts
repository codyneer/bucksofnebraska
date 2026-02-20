const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!

const endpoint = `https://${domain}/api/2024-01/graphql.json`

export async function shopifyFetch<T>({
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
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join('\n'))
  }

  return json.data
}

// --------------- Types ---------------

export type Money = {
  amount: string
  currencyCode: string
}

export type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type ProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable: number | null
  price: Money
  compareAtPrice: Money | null
  selectedOptions: { name: string; value: string }[]
}

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml?: string
  priceRange: { minVariantPrice: Money }
  compareAtPriceRange: { minVariantPrice: Money | null }
  images: { edges: { node: ShopifyImage }[] }
  variants: { edges: { node: ProductVariant }[] }
  tags: string[]
  metafield: { value: string } | null
}

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: Money
    product: { title: string; handle: string }
    image: ShopifyImage | null
  }
}

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  cost: {
    totalAmount: Money
    subtotalAmount: Money
  }
  lines: { edges: { node: CartLine }[] }
}

// --------------- Fragments ---------------

const CART_FIELDS = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
    }
    lines(first: 20) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product { title handle }
              image { url altText width height }
            }
          }
        }
      }
    }
  }
`

// --------------- Queries ---------------

export const GET_COLLECTION_PRODUCTS = `
  query CollectionProducts($handle: String!, $first: Int = 20) {
    collectionByHandle(handle: $handle) {
      title
      description
      products(first: $first) {
        edges {
          node {
            id handle title description
            priceRange { minVariantPrice { amount currencyCode } }
            compareAtPriceRange { minVariantPrice { amount currencyCode } }
            images(first: 5) { edges { node { url altText width height } } }
            variants(first: 10) {
              edges {
                node {
                  id title availableForSale quantityAvailable
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  selectedOptions { name value }
                }
              }
            }
            tags
            metafield(namespace: "custom", key: "reviews") { value }
          }
        }
      }
    }
  }
`

export const GET_PRODUCT = `
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      id handle title descriptionHtml
      images(first: 10) { edges { node { url altText width height } } }
      variants(first: 20) {
        edges {
          node {
            id title availableForSale quantityAvailable
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
      tags
      metafield(namespace: "custom", key: "reviews") { value }
    }
  }
`

export const GET_ALL_PRODUCTS = `
  query AllProducts($first: Int = 50) {
    products(first: $first) {
      edges {
        node {
          id handle title description
          priceRange { minVariantPrice { amount currencyCode } }
          compareAtPriceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText width height } } }
          variants(first: 10) {
            edges {
              node {
                id title availableForSale quantityAvailable
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                selectedOptions { name value }
              }
            }
          }
          tags
          metafield(namespace: "custom", key: "reviews") { value }
        }
      }
    }
  }
`

// --------------- Cart Mutations ---------------

export const CREATE_CART = `
  ${CART_FIELDS}
  mutation CartCreate {
    cartCreate {
      cart { ...CartFields }
    }
  }
`

export const ADD_TO_CART = `
  ${CART_FIELDS}
  mutation CartAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
    }
  }
`

export const REMOVE_FROM_CART = `
  ${CART_FIELDS}
  mutation CartRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
    }
  }
`

export const UPDATE_CART = `
  ${CART_FIELDS}
  mutation CartUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
    }
  }
`

// --------------- Fetch Helpers ---------------

export async function getCollectionProducts(handle: string, first = 20) {
  const data = await shopifyFetch<{
    collectionByHandle: {
      title: string
      description: string
      products: { edges: { node: ShopifyProduct }[] }
    } | null
  }>({
    query: GET_COLLECTION_PRODUCTS,
    variables: { handle, first },
  })

  return data.collectionByHandle
}

export async function getProduct(handle: string) {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null
  }>({
    query: GET_PRODUCT,
    variables: { handle },
  })

  return data.productByHandle
}

export async function getAllProducts(first = 50) {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] }
  }>({
    query: GET_ALL_PRODUCTS,
    variables: { first },
  })

  return data.products.edges.map((e) => e.node)
}

export async function createCart() {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart }
  }>({ query: CREATE_CART })

  return data.cartCreate.cart
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart }
  }>({
    query: ADD_TO_CART,
    variables: { cartId, lines },
  })

  return data.cartLinesAdd.cart
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart }
  }>({
    query: REMOVE_FROM_CART,
    variables: { cartId, lineIds },
  })

  return data.cartLinesRemove.cart
}

export async function updateCart(cartId: string, lines: { id: string; quantity: number }[]) {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart }
  }>({
    query: UPDATE_CART,
    variables: { cartId, lines },
  })

  return data.cartLinesUpdate.cart
}

import {
  shopifyAdminFetch,
  GET_PRODUCT_METAFIELD,
  UPDATE_PRODUCT_METAFIELD,
  GET_ALL_PRODUCTS_WITH_REVIEWS,
} from './shopify-admin'

export type Review = {
  id: string
  stars: number
  text: string
  author: string
  location: string
  photo_url: string | null
  product_handle: string
  product_title?: string
  status: 'pending' | 'approved' | 'denied'
  created_at: string
  verified_purchase: boolean
}

export type ReviewStats = {
  avgRating: string
  totalCount: number
}

// Compute global review stats from a list of reviews
export function computeReviewStats(reviews: Review[]): ReviewStats {
  if (reviews.length === 0) {
    return { avgRating: '0', totalCount: 0 }
  }
  const avg = reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
  return {
    avgRating: avg.toFixed(1),
    totalCount: reviews.length,
  }
}

// Get reviews for a specific product
export async function getProductReviews(handle: string): Promise<Review[]> {
  try {
    const data = await shopifyAdminFetch<{
      productByHandle: {
        id: string
        metafield: { id: string; value: string } | null
      } | null
    }>({
      query: GET_PRODUCT_METAFIELD,
      variables: { handle },
    })

    if (!data.productByHandle?.metafield?.value) return []

    const reviews: Review[] = JSON.parse(data.productByHandle.metafield.value)
    return reviews
  } catch {
    return []
  }
}

// Get approved reviews for a product (for PDP display)
export async function getApprovedProductReviews(handle: string): Promise<Review[]> {
  const reviews = await getProductReviews(handle)
  return reviews.filter((r) => r.status === 'approved')
}

// Get all approved reviews across all products (for homepage carousel)
export async function getAllApprovedReviews(): Promise<Review[]> {
  try {
    const data = await shopifyAdminFetch<{
      products: {
        edges: {
          node: {
            id: string
            handle: string
            title: string
            metafield: { id: string; value: string } | null
          }
        }[]
      }
    }>({
      query: GET_ALL_PRODUCTS_WITH_REVIEWS,
    })

    const allReviews: Review[] = []

    for (const { node } of data.products.edges) {
      if (!node.metafield?.value) continue
      try {
        const reviews: Review[] = JSON.parse(node.metafield.value)
        reviews
          .filter((r) => r.status === 'approved')
          .forEach((r) => {
            allReviews.push({
              ...r,
              product_handle: node.handle,
              product_title: node.title,
            })
          })
      } catch {
        // Skip malformed JSON
      }
    }

    return allReviews
  } catch {
    return []
  }
}

// Get all pending reviews across all products (for admin panel)
export async function getAllPendingReviews(): Promise<(Review & { product_id: string })[]> {
  try {
    const data = await shopifyAdminFetch<{
      products: {
        edges: {
          node: {
            id: string
            handle: string
            title: string
            metafield: { id: string; value: string } | null
          }
        }[]
      }
    }>({
      query: GET_ALL_PRODUCTS_WITH_REVIEWS,
    })

    const pending: (Review & { product_id: string })[] = []

    for (const { node } of data.products.edges) {
      if (!node.metafield?.value) continue
      try {
        const reviews: Review[] = JSON.parse(node.metafield.value)
        reviews
          .filter((r) => r.status === 'pending')
          .forEach((r) => {
            pending.push({
              ...r,
              product_handle: node.handle,
              product_title: node.title,
              product_id: node.id,
            })
          })
      } catch {
        // Skip
      }
    }

    return pending
  } catch {
    return []
  }
}

// Add a new review to a product (as pending)
export async function addReview(
  productHandle: string,
  review: Omit<Review, 'id' | 'status' | 'created_at'>
): Promise<boolean> {
  try {
    // First get the product ID and existing reviews
    const data = await shopifyAdminFetch<{
      productByHandle: {
        id: string
        metafield: { id: string; value: string } | null
      } | null
    }>({
      query: GET_PRODUCT_METAFIELD,
      variables: { handle: productHandle },
    })

    if (!data.productByHandle) return false

    const existingReviews: Review[] = data.productByHandle.metafield?.value
      ? JSON.parse(data.productByHandle.metafield.value)
      : []

    const newReview: Review = {
      ...review,
      id: `rev_${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    }

    existingReviews.push(newReview)

    await shopifyAdminFetch({
      query: UPDATE_PRODUCT_METAFIELD,
      variables: {
        metafields: [
          {
            ownerId: data.productByHandle.id,
            namespace: 'custom',
            key: 'reviews',
            type: 'json',
            value: JSON.stringify(existingReviews),
          },
        ],
      },
    })

    return true
  } catch (error) {
    console.error('Failed to add review:', error)
    return false
  }
}

// Update review status (approve/deny)
export async function updateReviewStatus(
  productHandle: string,
  reviewId: string,
  status: 'approved' | 'denied'
): Promise<boolean> {
  try {
    const data = await shopifyAdminFetch<{
      productByHandle: {
        id: string
        metafield: { id: string; value: string } | null
      } | null
    }>({
      query: GET_PRODUCT_METAFIELD,
      variables: { handle: productHandle },
    })

    if (!data.productByHandle?.metafield?.value) return false

    const reviews: Review[] = JSON.parse(data.productByHandle.metafield.value)
    const review = reviews.find((r) => r.id === reviewId)
    if (!review) return false

    review.status = status

    await shopifyAdminFetch({
      query: UPDATE_PRODUCT_METAFIELD,
      variables: {
        metafields: [
          {
            ownerId: data.productByHandle.id,
            namespace: 'custom',
            key: 'reviews',
            type: 'json',
            value: JSON.stringify(reviews),
          },
        ],
      },
    })

    return true
  } catch (error) {
    console.error('Failed to update review status:', error)
    return false
  }
}

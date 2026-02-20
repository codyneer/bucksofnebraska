import type { ShopifyProduct } from './shopify'
import type { Review } from './reviews'
import type { BlogPost } from './blog-data'
import type { RecipePost } from './recipe-data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bucksofnebraska.vercel.app'

// ─── Generic JSON-LD component ───────────────────────────────────────────────

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Organization (sitewide) ─────────────────────────────────────────────────

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Bucks of Nebraska',
        url: siteUrl,
        logo: `${siteUrl}/logos/bn-deer-logo.png`,
        description: 'Nebraska hunting apparel built for the field. Premium tees, hoodies, and hats designed by hunters, for hunters.',
        foundingDate: '2013',
        founder: {
          '@type': 'Person',
          name: 'Cody Neer',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Auburn',
          addressRegion: 'NE',
          addressCountry: 'US',
        },
        sameAs: [
          'https://www.instagram.com/bucksofnebraska/',
          'https://www.youtube.com/@BucksofNebraska',
          'https://www.facebook.com/BucksofNebraska',
        ],
      }}
    />
  )
}

// ─── Website search (sitewide) ───────────────────────────────────────────────

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Bucks of Nebraska',
        url: siteUrl,
      }}
    />
  )
}

// ─── Product (PDP) ───────────────────────────────────────────────────────────

export function ProductSchema({
  product,
  reviews,
}: {
  product: ShopifyProduct
  reviews: Review[]
}) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const currency = product.priceRange.minVariantPrice.currencyCode || 'USD'
  const image = product.images.edges[0]?.node.url
  const approvedReviews = reviews.filter((r) => r.status === 'approved')
  const avgRating =
    approvedReviews.length > 0
      ? approvedReviews.reduce((sum, r) => sum + r.stars, 0) / approvedReviews.length
      : undefined

  const variant = product.variants.edges[0]?.node

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    url: `${siteUrl}/products/${product.handle}`,
    brand: {
      '@type': 'Brand',
      name: 'Bucks of Nebraska',
    },
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: variant?.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${siteUrl}/products/${product.handle}`,
      seller: {
        '@type': 'Organization',
        name: 'Bucks of Nebraska',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: price >= 75 ? '0' : '5.99',
          currency,
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
      },
    },
  }

  if (image) {
    data.image = image
  }

  if (avgRating && approvedReviews.length > 0) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: approvedReviews.length,
      bestRating: '5',
      worstRating: '1',
    }
    data.review = approvedReviews.slice(0, 5).map((r) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.stars.toString(),
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: r.author,
      },
      reviewBody: r.text,
      datePublished: r.created_at,
    }))
  }

  return <JsonLd data={data} />
}

// ─── BreadcrumbList ──────────────────────────────────────────────────────────

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url?: string }[]
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          ...(item.url ? { item: item.url } : {}),
        })),
      }}
    />
  )
}

// ─── Article / BlogPosting ───────────────────────────────────────────────────

export function BlogPostSchema({ post }: { post: BlogPost }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url: `${siteUrl}/blog/${post.slug}`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Organization',
          name: 'Bucks of Nebraska',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Bucks of Nebraska',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logos/bn-deer-logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/blog/${post.slug}`,
        },
        image: `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category + ' — Bucks of Nebraska Blog')}`,
      }}
    />
  )
}

// ─── Recipe ──────────────────────────────────────────────────────────────────

export function RecipeSchema({ recipe }: { recipe: RecipePost }) {
  // Parse cook time to ISO 8601 duration (e.g., "2 hrs" → "PT2H", "45 min" → "PT45M")
  const parseCookTime = (time: string): string => {
    const hoursMatch = time.match(/(\d+)\s*hr/)
    const minsMatch = time.match(/(\d+)\s*min/)
    let iso = 'PT'
    if (hoursMatch) iso += `${hoursMatch[1]}H`
    if (minsMatch) iso += `${minsMatch[1]}M`
    return iso === 'PT' ? 'PT1H' : iso
  }

  // Extract ingredients from content (lines starting with -)
  const ingredients: string[] = []
  const instructions: string[] = []
  let inIngredients = false
  let inInstructions = false
  let stepNum = 0

  recipe.content.split('\n').forEach((line) => {
    const trimmed = line.trim()
    if (trimmed.includes('Ingredient')) inIngredients = true
    if (trimmed.includes('Instruction') || trimmed.includes('Method') || trimmed.includes('Steps')) {
      inIngredients = false
      inInstructions = true
    }
    if (inIngredients && trimmed.startsWith('-')) {
      ingredients.push(trimmed.replace(/^-\s*/, '').replace(/\*\*/g, ''))
    }
    if (inInstructions && /^\d+\./.test(trimmed)) {
      stepNum++
      instructions.push(trimmed.replace(/^\d+\.\s*/, '').replace(/\*\*/g, ''))
    }
  })

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: recipe.title,
        description: recipe.description,
        url: `${siteUrl}/recipes/${recipe.slug}`,
        datePublished: recipe.date,
        author: {
          '@type': 'Organization',
          name: 'Bucks of Nebraska',
        },
        cookTime: parseCookTime(recipe.cookTime),
        recipeYield: `${recipe.servings} servings`,
        recipeCategory: recipe.category,
        recipeCuisine: 'American',
        keywords: `${recipe.category}, wild game, Nebraska, hunting, field to table, ${recipe.title.toLowerCase()}`,
        image: `${siteUrl}/api/og?title=${encodeURIComponent(recipe.title)}&subtitle=${encodeURIComponent(recipe.category + ' Recipe')}`,
        ...(ingredients.length > 0 ? { recipeIngredient: ingredients } : {}),
        ...(instructions.length > 0
          ? {
              recipeInstructions: instructions.map((text, i) => ({
                '@type': 'HowToStep',
                position: i + 1,
                text,
              })),
            }
          : {}),
      }}
    />
  )
}

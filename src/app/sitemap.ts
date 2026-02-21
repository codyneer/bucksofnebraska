import type { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/shopify'
import { blogPosts } from '@/lib/blog-data'
import { recipes } from '@/lib/recipe-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bucksofnebraska.com'
  const now = new Date().toISOString()
  const staticDate = '2026-02-21T00:00:00.000Z'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/shop`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: staticDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/recipes`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/podcast`, lastModified: staticDate, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified: staticDate, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteUrl}/referral`, lastModified: staticDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/terms`, lastModified: staticDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/privacy`, lastModified: staticDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/returns`, lastModified: staticDate, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Known collections
  const collections = [
    'best-sellers', 'new-arrivals', 'hats', 'shirts', 'hoodies',
    'decals', 'accessories', 'deer', 'duck', 'pheasant-hats', 'bass-hats',
  ]
  const collectionPages: MetadataRoute.Sitemap = collections.map((handle) => ({
    url: `${siteUrl}/collections/${handle}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Product pages from Shopify
  let productPages: MetadataRoute.Sitemap = []
  try {
    const products = await getAllProducts(250)
    productPages = products.map((product) => ({
      url: `${siteUrl}/products/${product.handle}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }))
  } catch {
    // Products will be empty if Shopify is unreachable
  }

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Recipe pages
  const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${siteUrl}/recipes/${recipe.slug}`,
    lastModified: recipe.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...collectionPages,
    ...productPages,
    ...blogPages,
    ...recipePages,
  ]
}

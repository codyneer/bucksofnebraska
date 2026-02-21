import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bucksofnebraska.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/review', '/account', '/api/', '/ref/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

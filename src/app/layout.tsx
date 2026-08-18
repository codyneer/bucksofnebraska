import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Oswald, Bitter, Caveat } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { BrandBar } from '@/components/layout/BrandBar'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { UpsellProvider } from '@/lib/upsell-context'
import { UpsellModal } from '@/components/cart/UpsellModal'
import { ToastProvider } from '@/components/ui/Toast'
import { OrganizationSchema, WebSiteSchema, SiteNavigationSchema } from '@/lib/structured-data'
import { OmnisendScript } from '@/components/OmnisendScript'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { FacebookPixel } from '@/components/FacebookPixel'
import { getAllApprovedReviews, computeReviewStats } from '@/lib/reviews'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

const bitter = Bitter({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-bitter',
  display: 'swap',
})

const caveat = Caveat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bucksofnebraska.com'

// Site-wide default social share image (1731×909, ~1.91:1). Product/blog pages
// still generate their own page-specific OG images via /api/og.
const OG_IMAGE = 'https://cdn.shopify.com/s/files/1/0398/3185/files/Bucks_of_Nebraska_Logo.png?v=1787081234'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bucks of Nebraska | Nebraska Deer Hunting Apparel & Gear',
    template: '%s | Bucks of Nebraska',
  },
  description:
    'Nebraska hunting apparel built for the field. Premium deer hunting shirts, hoodies, hats, and gear designed by hunters, for hunters. Free shipping over $75.',
  keywords: ['nebraska hunting apparel', 'deer hunting shirts', 'hunting hoodies', 'nebraska deer hunting', 'whitetail clothing', 'hunting hats', 'bucks of nebraska'],
  openGraph: {
    type: 'website',
    siteName: 'Bucks of Nebraska',
    locale: 'en_US',
    title: 'Bucks of Nebraska | Nebraska Deer Hunting Apparel & Gear',
    description: 'Nebraska hunting apparel built for the field. Premium deer hunting shirts, hoodies, hats, and gear designed by hunters, for hunters. Free shipping over $75.',
    images: [
      {
        url: OG_IMAGE,
        width: 1731,
        height: 909,
        alt: 'Bucks of Nebraska — Nebraska Deer Hunting Apparel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bucks of Nebraska | Nebraska Deer Hunting Apparel & Gear',
    description: 'Nebraska hunting apparel built for the field. Premium deer hunting shirts, hoodies, hats, and gear. Free shipping over $75.',
    images: [OG_IMAGE],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let reviewStats = { avgRating: '4.7', totalCount: 0 }
  try {
    const reviews = await getAllApprovedReviews()
    reviewStats = computeReviewStats(reviews)
  } catch {
    // Fall back to defaults
  }

  return (
    <html lang="en" className={`${bebasNeue.variable} ${oswald.variable} ${bitter.variable} ${caveat.variable}`}>
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <SiteNavigationSchema />
      </head>
      <body className="font-body antialiased">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <UpsellProvider>
                <BrandBar />
                <AnnouncementBar reviewStats={reviewStats} />
                <Navbar />
                <main>{children}</main>
                <Footer />
                <UpsellModal />
                <CartDrawer />
              </UpsellProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
        <OmnisendScript />
        <GoogleAnalytics />
        <FacebookPixel />
      </body>
    </html>
  )
}

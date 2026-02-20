import type { Metadata } from 'next'
import { Bebas_Neue, Oswald, Bitter, Caveat } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { BrandBar } from '@/components/layout/BrandBar'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bucksofnebraska.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bucks of Nebraska — Nebraska Hunting Apparel',
    template: '%s — Bucks of Nebraska',
  },
  description:
    'Nebraska hunting apparel built for the field. Premium tees, hoodies, and hats designed by hunters, for hunters. Free shipping over $75.',
  openGraph: {
    type: 'website',
    siteName: 'Bucks of Nebraska',
    locale: 'en_US',
    title: 'Bucks of Nebraska — Nebraska Hunting Apparel',
    description: 'Premium hunting apparel for Nebraska hunters. Built for the field. Free shipping over $75.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Bucks of Nebraska — Nebraska Hunting Apparel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bucks of Nebraska — Nebraska Hunting Apparel',
    description: 'Premium hunting apparel for Nebraska hunters. Built for the field.',
    images: ['/api/og'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${oswald.variable} ${bitter.variable} ${caveat.variable}`}>
      <body className="font-body antialiased">
        <AuthProvider>
          <CartProvider>
            <BrandBar />
            <AnnouncementBar />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

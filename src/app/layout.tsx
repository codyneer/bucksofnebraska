import type { Metadata } from 'next'
import { Bebas_Neue, Oswald, Bitter } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { BrandBar } from '@/components/layout/BrandBar'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
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

export const metadata: Metadata = {
  title: 'Bucks of Nebraska — Field-Ready Apparel',
  description:
    'Nebraska hunting apparel built for the field. Premium tees, hoodies, and hats designed by hunters, for hunters. Free shipping over $75.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${oswald.variable} ${bitter.variable}`}>
      <body className="font-body antialiased">
        <CartProvider>
          <BrandBar />
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, ChevronDown, Menu, X } from 'lucide-react'
import { MegaMenu } from './MegaMenu'
import type { MegaMenuColumn, MegaMenuFeatured } from './MegaMenu'
import { useCart } from '@/lib/cart-context'

const shopColumns: MegaMenuColumn[] = [
  {
    title: 'Apparel',
    links: [
      { label: 'All Products', href: '/shop' },
      {
        label: 'T-Shirts',
        href: '/collections/shirts',
        image:
          'https://cdn.shopify.com/s/files/1/0398/3185/files/8638886459268636935_2048.jpg?v=1724945504',
      },
      {
        label: 'Hoodies',
        href: '/collections/hoodies',
        image:
          'https://cdn.shopify.com/s/files/1/0398/3185/files/9348584849652313341_2048.jpg?v=1768615322',
      },
    ],
  },
  {
    title: 'Accessories',
    links: [
      {
        label: 'Hats & Caps',
        href: '/collections/hats',
        image:
          'https://cdn.shopify.com/s/files/1/0398/3185/files/il_794xN.5658579381_kxus.jpg?v=1764082416',
      },
      {
        label: 'Decals & Stickers',
        href: '/collections/decals',
        image:
          'https://cdn.shopify.com/s/files/1/0398/3185/products/rednlogo.png?v=1610402409',
      },
    ],
  },
  {
    title: 'Collections',
    links: [
      { label: 'Deer', href: '/collections/deer' },
      { label: 'Ducks', href: '/collections/duck' },
      { label: 'Pheasants', href: '/collections/pheasant-hats' },
      { label: 'Fish', href: '/collections/bass-hats' },
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
    ],
  },
]

const shopFeatured: MegaMenuFeatured = {
  title: 'New Arrivals',
  subtitle: 'Just Dropped',
  image:
    'https://cdn.shopify.com/s/files/1/0398/3185/collections/header_deer.jpg?v=1732444809',
  href: '/collections/new-arrivals',
  ctaLabel: 'Shop New',
}

const communityColumns: MegaMenuColumn[] = [
  {
    title: 'Content',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Podcast', href: '/podcast' },
      { label: 'NE Recipes', href: '/recipes' },
    ],
  },
  {
    title: 'Join',
    links: [
      { label: 'Refer a Friend — $10', href: '/referral' },
      { label: 'Our Story', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-100 bg-white border-b border-border transition-shadow duration-300 ${
        scrolled ? 'shadow' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-[1fr_auto_1fr] items-center py-2.5 px-10 gap-5">
        {/* Left nav */}
        <div className="hidden lg:flex gap-6 items-center">
          {/* Shop dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-text font-nav text-[13px] tracking-[2px] uppercase py-2 bg-transparent border-none cursor-pointer transition-colors hover:text-red">
              Shop
              <ChevronDown className="w-2.5 h-2.5 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <MegaMenu
              columns={shopColumns}
              variant="shop"
              featured={shopFeatured}
            />
          </div>

          {/* Community dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-text font-nav text-[13px] tracking-[2px] uppercase py-2 bg-transparent border-none cursor-pointer transition-colors hover:text-red">
              Community
              <ChevronDown className="w-2.5 h-2.5 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <MegaMenu columns={communityColumns} variant="community" />
          </div>

          <Link
            href="/podcast"
            className="text-text font-nav text-[13px] tracking-[2px] uppercase py-2 transition-colors hover:text-red"
          >
            Podcast
          </Link>
          <Link
            href="/about"
            className="text-text font-nav text-[13px] tracking-[2px] uppercase py-2 transition-colors hover:text-red"
          >
            Our Story
          </Link>
        </div>

        {/* Center logo */}
        <Link href="/" className="flex justify-center">
          <Image
            src="/logos/bn-deer-logo.png"
            alt="Bucks of Nebraska"
            width={200}
            height={126}
            className={`transition-all duration-300 ${
              scrolled ? 'h-11 w-auto' : 'h-[58px] w-auto'
            }`}
            priority
          />
        </Link>

        {/* Right nav */}
        <div className="hidden lg:flex gap-6 items-center justify-end">
          <Link
            href="/blog"
            className="text-text font-nav text-[13px] tracking-[2px] uppercase py-2 transition-colors hover:text-red"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-text font-nav text-[13px] tracking-[2px] uppercase py-2 transition-colors hover:text-red"
          >
            Contact
          </Link>
          <Link
            href="#"
            className="text-text font-nav text-[13px] tracking-[2px] uppercase py-2 transition-colors hover:text-red"
          >
            Account
          </Link>
          <button
            onClick={openCart}
            className="relative bg-transparent border-none cursor-pointer text-text p-2 transition-colors hover:text-red"
          >
            <ShoppingBag className="w-[22px] h-[22px]" />
            {itemCount > 0 && (
              <span className="absolute top-0 -right-0.5 bg-red text-white font-nav text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile hamburger + cart */}
        <div className="flex lg:hidden items-center gap-4 justify-end">
          <button
            onClick={openCart}
            className="relative bg-transparent border-none cursor-pointer text-text p-2 transition-colors hover:text-red"
          >
            <ShoppingBag className="w-[22px] h-[22px]" />
            {itemCount > 0 && (
              <span className="absolute top-0 -right-0.5 bg-red text-white font-nav text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="bg-transparent border-none cursor-pointer text-text p-2"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white py-4 px-10">
          <div className="flex flex-col gap-1">
            {/* Apparel */}
            <p className="font-nav text-[10px] tracking-[2px] uppercase text-red mt-1 mb-1">
              Apparel
            </p>
            <Link
              href="/shop"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Shop All
            </Link>
            <Link
              href="/collections/shirts"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              T-Shirts
            </Link>
            <Link
              href="/collections/hoodies"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Hoodies
            </Link>

            {/* Accessories */}
            <p className="font-nav text-[10px] tracking-[2px] uppercase text-red mt-3 mb-1">
              Accessories
            </p>
            <Link
              href="/collections/hats"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Hats & Caps
            </Link>
            <Link
              href="/collections/decals"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Decals & Stickers
            </Link>

            {/* Collections */}
            <p className="font-nav text-[10px] tracking-[2px] uppercase text-red mt-3 mb-1">
              Collections
            </p>
            <Link
              href="/collections/deer"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Deer
            </Link>
            <Link
              href="/collections/duck"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Ducks
            </Link>
            <Link
              href="/collections/pheasant-hats"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Pheasants
            </Link>
            <Link
              href="/collections/bass-hats"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Fish
            </Link>

            <div className="h-px bg-border my-3" />

            {/* Community */}
            <p className="font-nav text-[10px] tracking-[2px] uppercase text-red mb-1">
              Community
            </p>
            <Link
              href="/blog"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/recipes"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              NE Recipes
            </Link>
            <Link
              href="/podcast"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Podcast
            </Link>
            <Link
              href="/about"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/referral"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-1"
              onClick={() => setMobileOpen(false)}
            >
              Refer a Friend
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

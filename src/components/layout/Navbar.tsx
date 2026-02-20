'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, ChevronDown, Menu, X } from 'lucide-react'
import { MegaMenu } from './MegaMenu'
import { useCart } from '@/lib/cart-context'

const shopColumns = [
  {
    title: 'Categories',
    links: [
      { label: 'Shop All', href: '/shop' },
      { label: 'Tees', href: '/collections/tees' },
      { label: 'Hoodies', href: '/collections/hoodies' },
      { label: 'Hats', href: '/collections/hats' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { label: 'Best Sellers', href: '/collections/best-sellers' },
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
      { label: 'Bundles', href: '/collections/bundles' },
    ],
  },
  {
    title: 'Featured',
    links: [
      { label: 'Gift Guide', href: '/collections/gift-guide' },
      { label: 'Sale', href: '/collections/sale' },
    ],
  },
]

const communityColumns = [
  {
    title: 'Connect',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Recipes', href: '/recipes' },
      { label: 'About Us', href: '/about' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { label: 'Referral Program', href: '/referral' },
      { label: 'Contact Us', href: '/contact' },
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
            <MegaMenu columns={shopColumns} variant="shop" />
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
        </div>

        {/* Center logo */}
        <Link href="/" className="flex justify-center">
          <div
            className={`transition-all duration-300 font-display text-brand-black ${
              scrolled ? 'text-[28px]' : 'text-[36px]'
            }`}
          >
            BUCKS OF NEBRASKA
          </div>
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
            href="/about"
            className="text-text font-nav text-[13px] tracking-[2px] uppercase py-2 transition-colors hover:text-red"
          >
            About
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
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white py-4 px-10">
          <div className="flex flex-col gap-3">
            <Link href="/shop" className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red" onClick={() => setMobileOpen(false)}>Shop All</Link>
            <Link href="/collections/tees" className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red" onClick={() => setMobileOpen(false)}>Tees</Link>
            <Link href="/collections/hoodies" className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red" onClick={() => setMobileOpen(false)}>Hoodies</Link>
            <Link href="/collections/hats" className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red" onClick={() => setMobileOpen(false)}>Hats</Link>
            <div className="h-px bg-border my-2" />
            <Link href="/blog" className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/recipes" className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red" onClick={() => setMobileOpen(false)}>Recipes</Link>
            <Link href="/podcast" className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red" onClick={() => setMobileOpen(false)}>Podcast</Link>
            <Link href="/about" className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red" onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/contact" className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red" onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link href="/referral" className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red" onClick={() => setMobileOpen(false)}>Referral Program</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

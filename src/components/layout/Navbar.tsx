'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, ChevronDown, Menu, X, User } from 'lucide-react'
import type { MegaMenuFeatured } from './MegaMenu'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'

// ——— Social icons (inline SVGs for brand-specific icons) ———

type IconProps = { className?: string; style?: React.CSSProperties }

function FacebookIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function TikTokIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.13a8.16 8.16 0 005.58 2.2V11.3a4.85 4.85 0 01-3.77-1.85V6.69h3.77z" />
    </svg>
  )
}

function XIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// ——— Social links data ———

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/bucksofnebraska',
    icon: FacebookIcon,
    color: '#1877F2',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/bucksofnebraska',
    icon: InstagramIcon,
    color: '#E4405F',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@bucksofnebraska',
    icon: TikTokIcon,
    color: '#000000',
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/bucksofnebraska',
    icon: XIcon,
    color: '#000000',
  },
]

// ——— Menu data ———

type MenuLink = {
  label: string
  href: string
  image?: string
}

type MenuColumn = {
  title: string
  links: MenuLink[]
}

const shopColumns: MenuColumn[] = [
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

const communityColumns: MenuColumn[] = [
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
  const [shopOpen, setShopOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const { openCart, itemCount } = useCart()
  const { isAuthenticated } = useAuth()
  const navRef = useRef<HTMLElement>(null)
  const shopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const communityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openShopMenu = useCallback(() => {
    if (shopTimerRef.current) clearTimeout(shopTimerRef.current)
    setCommunityOpen(false)
    setShopOpen(true)
  }, [])

  const closeShopMenu = useCallback(() => {
    shopTimerRef.current = setTimeout(() => setShopOpen(false), 150)
  }, [])

  const openCommunityMenu = useCallback(() => {
    if (communityTimerRef.current) clearTimeout(communityTimerRef.current)
    setShopOpen(false)
    setCommunityOpen(true)
  }, [])

  const closeCommunityMenu = useCallback(() => {
    communityTimerRef.current = setTimeout(() => setCommunityOpen(false), 150)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-100 bg-white border-b border-border transition-shadow duration-300 ${
        scrolled ? 'shadow' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-[1fr_auto_1fr] items-center py-2.5 px-4 sm:px-10 gap-3 sm:gap-5">
        {/* Left nav */}
        <div className="hidden lg:flex gap-6 items-center">
          {/* Shop dropdown */}
          <div onMouseEnter={openShopMenu} onMouseLeave={closeShopMenu}>
            <button
              className={`flex items-center gap-1.5 font-nav text-[13px] tracking-[2px] uppercase py-2 bg-transparent border-none cursor-pointer transition-colors ${
                shopOpen ? 'text-red' : 'text-text hover:text-red'
              }`}
            >
              Shop
              <ChevronDown
                className={`w-2.5 h-2.5 transition-transform duration-300 ${
                  shopOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Community dropdown */}
          <div
            onMouseEnter={openCommunityMenu}
            onMouseLeave={closeCommunityMenu}
          >
            <button
              className={`flex items-center gap-1.5 font-nav text-[13px] tracking-[2px] uppercase py-2 bg-transparent border-none cursor-pointer transition-colors ${
                communityOpen ? 'text-red' : 'text-text hover:text-red'
              }`}
            >
              Community
              <ChevronDown
                className={`w-2.5 h-2.5 transition-transform duration-300 ${
                  communityOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
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
            href={isAuthenticated ? '/account' : '/account/login'}
            className="text-text font-nav text-[13px] tracking-[2px] uppercase py-2 transition-colors hover:text-red flex items-center gap-1.5"
          >
            <User className="w-4 h-4" />
            {isAuthenticated ? 'Account' : 'Sign In'}
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

      {/* ——— Shop Mega Menu (full-width) ——— */}
      <div
        onMouseEnter={openShopMenu}
        onMouseLeave={closeShopMenu}
        className={`absolute left-0 right-0 top-full bg-white border-b border-border shadow-lg transition-all duration-[250ms] ${
          shopOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-10">
          <div
            className="grid gap-0 py-2"
            style={{
              gridTemplateColumns: `repeat(${shopColumns.length}, 1fr) 1.4fr`,
            }}
          >
            {shopColumns.map((col) => (
              <div key={col.title} className="py-5 px-4 first:pl-0">
                <h4 className="font-nav text-[11px] tracking-[3px] uppercase text-red mb-4 pb-2 border-b border-border">
                  {col.title}
                </h4>
                <div className="flex flex-col">
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 py-[7px] transition-all duration-200 hover:pl-1 group/link"
                    >
                      {link.image && (
                        <div className="w-9 h-9 rounded overflow-hidden shrink-0 border border-border-light">
                          <Image
                            src={link.image}
                            alt=""
                            width={36}
                            height={36}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <span className="text-text-light font-body text-[14px] transition-colors duration-200 group-hover/link:text-red">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Featured promo card */}
            <div className="py-5 pl-4">
              <Link
                href={shopFeatured.href}
                className="block relative overflow-hidden rounded h-full min-h-[220px] group/featured"
              >
                <Image
                  src={shopFeatured.image}
                  alt={shopFeatured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/featured:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-nav text-[10px] tracking-[2px] uppercase text-red-light mb-1">
                    {shopFeatured.subtitle}
                  </p>
                  <h4 className="font-display text-[26px] text-white leading-none mb-3">
                    {shopFeatured.title}
                  </h4>
                  <span className="inline-block bg-red text-white font-nav text-[10px] tracking-[2px] uppercase py-2 px-4 transition-colors hover:bg-red-dark">
                    {shopFeatured.ctaLabel}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ——— Community Mega Menu (full-width) ——— */}
      <div
        onMouseEnter={openCommunityMenu}
        onMouseLeave={closeCommunityMenu}
        className={`absolute left-0 right-0 top-full bg-white border-b border-border shadow-lg transition-all duration-[250ms] ${
          communityOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-10">
          <div className="grid grid-cols-3 gap-0 py-2">
            {/* Social column — first */}
            <div className="py-5 pr-4">
              <h4 className="font-nav text-[11px] tracking-[3px] uppercase text-red mb-4 pb-2 border-b border-border">
                Social
              </h4>
              <div className="flex flex-col">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 py-[7px] transition-all duration-200 hover:pl-1 group/link"
                    >
                      <Icon
                        className="w-[18px] h-[18px] transition-opacity duration-200 group-hover/link:opacity-80"
                        style={{ color: social.color }}
                      />
                      <span className="text-text-light font-body text-[14px] transition-colors duration-200 group-hover/link:text-red">
                        {social.label}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Content + Join columns */}
            {communityColumns.map((col) => (
              <div key={col.title} className="py-5 px-4">
                <h4 className="font-nav text-[11px] tracking-[3px] uppercase text-red mb-4 pb-2 border-b border-border">
                  {col.title}
                </h4>
                <div className="flex flex-col">
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 py-[7px] transition-all duration-200 hover:pl-1 group/link"
                    >
                      <span className="text-text-light font-body text-[14px] transition-colors duration-200 group-hover/link:text-red">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white py-4 px-5 sm:px-10 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-0.5">
            {/* Apparel */}
            <p className="font-nav text-[10px] tracking-[2px] uppercase text-red mt-1 mb-1">
              Apparel
            </p>
            <Link
              href="/shop"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Shop All
            </Link>
            <Link
              href="/collections/shirts"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              T-Shirts
            </Link>
            <Link
              href="/collections/hoodies"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
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
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Hats & Caps
            </Link>
            <Link
              href="/collections/decals"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
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
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Deer
            </Link>
            <Link
              href="/collections/duck"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Ducks
            </Link>
            <Link
              href="/collections/pheasant-hats"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Pheasants
            </Link>
            <Link
              href="/collections/bass-hats"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
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
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/recipes"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              NE Recipes
            </Link>
            <Link
              href="/podcast"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Podcast
            </Link>
            <Link
              href="/about"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/referral"
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Refer a Friend
            </Link>
            <Link
              href={isAuthenticated ? '/account' : '/account/login'}
              className="font-nav text-[13px] tracking-[2px] uppercase text-text hover:text-red py-2.5 flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <User className="w-4 h-4" />
              {isAuthenticated ? 'Account' : 'Sign In'}
            </Link>

            <div className="h-px bg-border my-3" />

            {/* Social */}
            <p className="font-nav text-[10px] tracking-[2px] uppercase text-red mb-1">
              Social
            </p>
            <div className="flex gap-2 py-1">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 transition-opacity hover:opacity-70"
                  >
                    <Icon className="w-5 h-5" style={{ color: social.color }} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

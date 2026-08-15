import Image from 'next/image'
import Link from 'next/link'

// ─── Promo Banner ────────────────────────────────────────────────────────────
// Full-width campaign banner that sits directly under the hero.
// Art is hosted in Shopify Files (cdn.shopify.com is whitelisted in next.config).
// To swap the campaign, upload a new file in Shopify → Content → Files and
// replace `desktopSrc` + `href` below.
//
// Two crops so the banner reads well on every screen:
//   mobile  → lev1 (taller 16:9) so phones get a larger, legible banner
//   desktop → lev2 (wide panoramic) that fills the full-width slot
// Both are hosted in Shopify Files (cdn.shopify.com whitelisted in next.config).
// ─────────────────────────────────────────────────────────────────────────────

const CONFIG = {
  href: '/products/lev-11-3-performance-snap-back-hat',
  alt: 'Leviticus 11:3 performance snapback hats — Bucks of Nebraska. Faith. Family. Hunt.',
  desktop: {
    src: 'https://cdn.shopify.com/s/files/1/0398/3185/files/bannerlev2.png?v=1786755493',
    width: 2114,
    height: 744,
  },
  mobile: {
    src: 'https://cdn.shopify.com/s/files/1/0398/3185/files/bannerlev1.png?v=1786755493',
    width: 1670,
    height: 942,
  },
}

export function PromoBanner() {
  return (
    <Link
      href={CONFIG.href}
      aria-label={CONFIG.alt}
      className="group relative block w-full overflow-hidden bg-brand-black"
    >
      {/* Mobile crop (taller) */}
      <div
        className="relative w-full sm:hidden"
        style={{ aspectRatio: `${CONFIG.mobile.width} / ${CONFIG.mobile.height}` }}
      >
        <Image
          src={CONFIG.mobile.src}
          alt={CONFIG.alt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* Desktop crop (wide) */}
      <div
        className="relative hidden w-full sm:block"
        style={{ aspectRatio: `${CONFIG.desktop.width} / ${CONFIG.desktop.height}` }}
      >
        <Image
          src={CONFIG.desktop.src}
          alt={CONFIG.alt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* Scrim to keep the CTA legible over the artwork */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      {/* CTA overlay — visual only; the whole banner links to the PDP */}
      <div className="absolute inset-0 flex flex-col items-start justify-end p-5 sm:p-8 lg:p-10">
        <span className="inline-flex items-center font-nav text-[13px] sm:text-[15px] lg:text-[16px] tracking-[2px] sm:tracking-[3px] uppercase bg-red text-white px-5 sm:px-8 py-2.5 sm:py-3.5 shadow-[0_6px_20px_rgba(196,30,58,0.35)] transition-colors duration-300 group-hover:bg-red-dark">
          Buy Now
        </span>
        <span className="mt-2 font-nav text-[10px] sm:text-[12px] tracking-[2px] sm:tracking-[3px] uppercase text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.85)]">
          Limited Edition Drop
        </span>
      </div>
    </Link>
  )
}

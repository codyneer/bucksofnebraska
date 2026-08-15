import Image from 'next/image'
import Link from 'next/link'

// ─── Promo Banner ────────────────────────────────────────────────────────────
// Full-width campaign banner that sits directly under the hero.
// Art is hosted in Shopify Files (cdn.shopify.com is whitelisted in next.config).
// To swap the campaign, upload a new file in Shopify → Content → Files and
// replace `desktopSrc` + `href` below.
//
// NOTE: the art has baked-in text spread across the full width. On phones the
// wide crop gets small. When a phone-optimized (stacked) version exists, upload
// it and add a `mobileSrc` + a separate square <Image> slot.
// ─────────────────────────────────────────────────────────────────────────────

const CONFIG = {
  href: '/products/lev-11-3-performance-snap-back-hat',
  desktopSrc:
    'https://cdn.shopify.com/s/files/1/0398/3185/files/bannerlev2.png?v=1786755493',
  alt: 'Leviticus 11:3 performance snapback hats — Bucks of Nebraska. Faith. Family. Hunt.',
  // Native art dimensions — keeps the aspect ratio exact so nothing is cropped.
  width: 2114,
  height: 744,
}

export function PromoBanner() {
  return (
    <Link
      href={CONFIG.href}
      aria-label={CONFIG.alt}
      className="group block w-full overflow-hidden bg-brand-black"
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: `${CONFIG.width} / ${CONFIG.height}` }}
      >
        <Image
          src={CONFIG.desktopSrc}
          alt={CONFIG.alt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    </Link>
  )
}

import Link from 'next/link'
import Image from 'next/image'

const footerColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Tees', href: '/collections/shirts' },
      { label: 'Hats', href: '/collections/hats' },
      { label: 'Hoodies', href: '/collections/hoodies' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Wholesale', href: '/contact' },
      { label: 'Blog', href: '/blog' },
      { label: 'Recipes', href: '/recipes' },
      { label: 'Refer a Friend', href: '/referral' },
    ],
  },
  {
    title: 'Follow',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/bucksofnebraska' },
      { label: 'Facebook', href: 'https://facebook.com/bucksofnebraska' },
      { label: 'TikTok', href: 'https://tiktok.com/@bucksofnebraska' },
      { label: 'X (Twitter)', href: 'https://x.com/bucksofnebraska' },
      { label: 'Podcast', href: '/podcast' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-8 px-5 sm:px-10">
      {/* Top: 4-column grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-white/10">
        {/* Brand column */}
        <div>
          <Image
            src="/logos/nlogo.png"
            alt="Bucks of Nebraska"
            width={60}
            height={60}
            className="h-14 w-auto mb-3.5"
          />
          <p className="text-white/50 text-[14px] leading-[1.7] max-w-[280px] font-body">
            Nebraska&apos;s #1 source for deer hunting. From the Missouri River Bottoms to the Sandhills, we&apos;ve got you covered.
          </p>
        </div>

        {/* Link columns */}
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="font-nav text-[12px] font-semibold tracking-[3px] uppercase text-red mb-3.5">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="block font-body text-[14px] text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {col.title === 'Company' && (
                <li>
                  <Link
                    href="/admin"
                    className="block font-body text-[14px] text-white/[0.3] hover:text-white/50 transition-colors"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-white/30 tracking-[1px] font-body">
          &copy; {new Date().getFullYear()} Bucks of Nebraska. All Rights Reserved. Nebraska Proud.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="text-[11px] text-white/30 hover:text-white/60 tracking-[1px] font-body transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-[11px] text-white/30 hover:text-white/60 tracking-[1px] font-body transition-colors">
            Privacy
          </Link>
          <Link href="/returns" className="text-[11px] text-white/30 hover:text-white/60 tracking-[1px] font-body transition-colors">
            Returns
          </Link>
        </div>
      </div>
    </footer>
  )
}

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
      { label: 'Podcast', href: '/podcast' },
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
      { label: 'Instagram', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'TikTok', href: '#' },
      { label: 'YouTube', href: '#' },
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
            src="/logos/bn-footer-logo.png"
            alt="Bucks of Nebraska"
            width={180}
            height={48}
            className="h-12 w-auto mb-3.5"
          />
          <p className="text-white/50 text-[14px] leading-[1.7] max-w-[280px] font-body">
            Field-ready apparel rooted in the Nebraska outdoors. Born from the hunt. Built for the life around it.
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
      <div className="max-w-[1200px] mx-auto text-center pt-7">
        <p className="text-[11px] text-white/30 tracking-[1px] font-body">
          &copy; {new Date().getFullYear()} Bucks of Nebraska. All Rights Reserved. Nebraska Proud.
        </p>
      </div>
    </footer>
  )
}

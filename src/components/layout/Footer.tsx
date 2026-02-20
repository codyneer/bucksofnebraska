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
    <footer className="bg-brand-black text-white">
      <div className="max-w-[1400px] mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-nav text-[12px] tracking-[3px] uppercase text-red mb-4 pb-2 border-b border-white/10">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-[14px] text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <Image src="/logos/bn-footer-logo.png" alt="Bucks of Nebraska" width={180} height={48} className="h-12 w-auto" />
          <p className="font-body text-[11px] text-white/30 tracking-[1px]">
            &copy; {new Date().getFullYear()} Bucks of Nebraska. All Rights Reserved. Nebraska Proud.
          </p>
          <Link
            href="/admin"
            className="font-nav text-[9px] tracking-[2px] uppercase text-white/10 hover:text-white/30 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'

const footerColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Tees', href: '/collections/tees' },
      { label: 'Hoodies', href: '/collections/hoodies' },
      { label: 'Hats', href: '/collections/hats' },
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
      { label: 'Podcast', href: '/podcast' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Recipes', href: '/recipes' },
      { label: 'Referral Program', href: '/referral' },
      { label: 'Write a Review', href: '/review' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping Policy', href: '#' },
      { label: 'Returns & Exchanges', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="max-w-[1400px] mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
          <div className="font-display text-[24px] text-white/80">BUCKS OF NEBRASKA</div>
          <p className="font-body text-[13px] text-white/30">
            &copy; {new Date().getFullYear()} Bucks of Nebraska. All rights reserved.
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

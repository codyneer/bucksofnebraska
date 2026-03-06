import Link from 'next/link'
import Image from 'next/image'
import { FooterSignup } from './FooterSignup'

const shopLinks = [
  { label: 'All Products', href: '/shop' },
  { label: 'Tees', href: '/collections/shirts' },
  { label: 'Hats', href: '/collections/hats' },
  { label: 'Hoodies', href: '/collections/hoodies' },
]

const companyLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Wholesale', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Refer a Friend', href: '/referral' },
]

const FOOTER_UTM = '?utm_source=bucksofnebraska&utm_medium=footer&utm_campaign=social_follow'

const followLinks = [
  { label: 'Instagram', href: `https://instagram.com/bucksofnebraska${FOOTER_UTM}` },
  { label: 'Facebook', href: `https://facebook.com/bucksofnebraska${FOOTER_UTM}` },
  { label: 'TikTok', href: `https://tiktok.com/@bucksofnebraska${FOOTER_UTM}` },
  { label: 'X (Twitter)', href: `https://x.com/bucksofnebraska${FOOTER_UTM}` },
  { label: 'Podcast', href: '/podcast' },
]

const socialIcons = [
  {
    label: 'Instagram',
    href: `https://instagram.com/bucksofnebraska${FOOTER_UTM}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: `https://facebook.com/bucksofnebraska${FOOTER_UTM}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: `https://tiktok.com/@bucksofnebraska${FOOTER_UTM}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13.4a8.16 8.16 0 004.77 1.53V11.5a4.82 4.82 0 01-.8.07 4.83 4.83 0 01-2.83-.92v-3.96h4.44z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: `https://x.com/bucksofnebraska${FOOTER_UTM}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '/podcast',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

function FooterLinkColumn({ title, links, showAdmin }: { title: string; links: { label: string; href: string }[]; showAdmin?: boolean }) {
  return (
    <div>
      <h4 className="font-nav text-[12px] font-semibold tracking-[3px] uppercase text-red mb-3.5">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="block font-body text-[14px] text-white/50 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
        {showAdmin && (
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
  )
}

export function Footer() {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-8 px-5 sm:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Top: 4-column link grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-white/10">
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

          <FooterLinkColumn title="Shop" links={shopLinks} />
          <FooterLinkColumn title="Company" links={companyLinks} showAdmin />

          {/* Follow column with social icons */}
          <div>
            <h4 className="font-nav text-[12px] font-semibold tracking-[3px] uppercase text-red mb-3.5">
              Follow
            </h4>
            <ul className="space-y-2 mb-5">
              {followLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="block font-body text-[14px] text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social icons row */}
            <div className="flex items-center gap-3">
              {socialIcons.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Full-width Buck Alerts signup */}
        <div className="py-10 border-b border-white/10">
          <FooterSignup />
        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
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
      </div>
    </footer>
  )
}

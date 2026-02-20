import Link from 'next/link'

export type MegaMenuLink = {
  label: string
  href: string
  image?: string
}

export type MegaMenuColumn = {
  title: string
  links: MegaMenuLink[]
}

export type MegaMenuFeatured = {
  title: string
  subtitle: string
  image: string
  href: string
  ctaLabel: string
}

type MegaMenuProps = {
  columns: MegaMenuColumn[]
  variant: 'shop' | 'community'
}

// Community dropdown — positioned left-aligned so it doesn't overflow
export function MegaMenu({ columns }: MegaMenuProps) {
  return (
    <div className="absolute top-full left-0 bg-white border border-border shadow-lg z-50 min-w-[440px] opacity-0 invisible pointer-events-none transition-all duration-[250ms] group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto">
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        }}
      >
        {columns.map((col) => (
          <div key={col.title} className="p-6 px-7">
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
  )
}

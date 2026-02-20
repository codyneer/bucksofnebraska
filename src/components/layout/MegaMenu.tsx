import Link from 'next/link'
import Image from 'next/image'

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
  featured?: MegaMenuFeatured
}

export function MegaMenu({ columns, variant, featured }: MegaMenuProps) {
  const isShop = variant === 'shop'
  const colCount = columns.length + (featured ? 1 : 0)

  return (
    <div
      className={`absolute top-full bg-white border border-border shadow-lg z-50 opacity-0 invisible pointer-events-none transition-all duration-[250ms] group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto ${
        isShop
          ? 'left-0 min-w-[760px] max-w-[calc(100vw-40px)]'
          : 'left-1/2 -translate-x-1/2 min-w-[520px]'
      }`}
    >
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: isShop
            ? `repeat(${columns.length}, 1fr) ${featured ? '1.3fr' : ''}`
            : `repeat(${columns.length}, 1fr) ${featured ? '1.2fr' : ''}`,
        }}
      >
        {/* Text columns */}
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
        {featured && (
          <div className="bg-offWhite p-3">
            <Link
              href={featured.href}
              className="block relative overflow-hidden rounded h-full min-h-[220px] group/featured"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover/featured:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-nav text-[10px] tracking-[2px] uppercase text-red-light mb-1">
                  {featured.subtitle}
                </p>
                <h4 className="font-display text-[26px] text-white leading-none mb-3">
                  {featured.title}
                </h4>
                <span className="inline-block bg-red text-white font-nav text-[10px] tracking-[2px] uppercase py-2 px-4 transition-colors hover:bg-red-dark">
                  {featured.ctaLabel}
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

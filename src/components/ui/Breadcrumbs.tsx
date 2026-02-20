import Link from 'next/link'
import { JsonLd } from '@/lib/structured-data'

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bucksofnebraska.vercel.app'

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
          })),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 mb-6 font-nav text-[11px] tracking-[2px] uppercase text-text-muted"
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-border">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="text-text-muted hover:text-red transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}

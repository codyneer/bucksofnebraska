import Link from 'next/link'

type MegaColumn = {
  title: string
  links: { label: string; href: string }[]
}

type MegaMenuProps = {
  columns: MegaColumn[]
  variant: 'shop' | 'community'
}

export function MegaMenu({ columns, variant }: MegaMenuProps) {
  const gridCols = variant === 'shop' ? 'grid-cols-3 min-w-[620px]' : 'grid-cols-2 min-w-[440px]'

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 bg-white border border-border p-8 px-10 grid ${gridCols} gap-8 opacity-0 invisible pointer-events-none transition-all duration-[250ms] shadow-lg z-50 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto`}
    >
      {columns.map((col) => (
        <div key={col.title}>
          <h4 className="font-nav text-[12px] tracking-[3px] uppercase text-red mb-3.5 pb-2 border-b border-border">
            {col.title}
          </h4>
          {col.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-text-light font-body text-[14px] py-1.5 transition-all duration-200 hover:text-red hover:pl-1.5"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

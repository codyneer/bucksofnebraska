'use client'

import Image from 'next/image'

const UTM = '?utm_source=bucksofnebraska&utm_medium=brand_bar&utm_campaign=family_nav'

const brands = [
  { name: 'Outdoor Brand Co.', href: `https://outdoorbrandcompany.com${UTM}`, active: false },
  { name: 'Bucks of Nebraska', href: '/', active: true },
  { name: 'GB2 Outdoors', href: `https://outdoorbrandcompany.com/nutrition/gb2-outdoors${UTM}`, active: false },
  { name: 'On Point Land Mgmt', href: `https://outdoorbrandcompany.com/land/management${UTM}`, active: false },
  { name: 'BN Properties', href: `https://bucksofnebraskaproperties.com${UTM}`, active: false },
]

export function BrandBar() {
  return (
    <div className="w-full bg-brand-black py-[5px] px-3 sm:px-5 hidden sm:block">
      <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
        <span className="font-nav text-[9px] tracking-[2px] uppercase text-white/[0.35]">
          An Outdoor Brand Co. Family
        </span>
        {brands.map((brand, i) => (
          <div key={brand.name} className="flex items-center gap-5">
            {i > 0 && <div className="w-px h-3.5 bg-white/10" />}
            <a
              href={brand.href}
              target={brand.active ? undefined : '_blank'}
              rel={brand.active ? undefined : 'noopener noreferrer'}
              className={`font-nav text-[10px] tracking-[1.5px] uppercase transition-colors ${
                brand.active
                  ? 'text-red-light flex items-center gap-1.5'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {brand.active && (
                <Image src="/logos/bn-antler-n.png" alt="" width={28} height={28} className="opacity-90" />
              )}
              {brand.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

export function AnnouncementBar() {
  return (
    <div className="w-full bg-brand-black text-white text-center py-2.5 px-5 font-nav text-[12px] tracking-[2.5px] uppercase relative overflow-hidden marquee-container">
      <div className="inline-flex gap-[60px] animate-marquee whitespace-nowrap marquee-content">
        {[1, 2].map((dup) => (
          <div key={dup} className="inline-flex gap-[60px]">
            <span className="flex items-center gap-2">
              <span className="text-red-light font-semibold">FREE SHIPPING</span> on orders over $75
            </span>
            <span className="flex items-center gap-2">
              New Pride Collection Just Dropped
            </span>
            <span className="flex items-center gap-2">
              ★ 4.9/5 Stars — 500+ Happy Hunters
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

import Link from 'next/link'

export function RedBanner() {
  return (
    <section className="py-16 px-10 text-center bg-red text-white relative">
      <h2 className="font-display text-[clamp(32px,4vw,52px)]">
        Wear Your State. Hunt Your Land.
      </h2>
      <p className="font-body text-[16px] mt-3 mb-6 max-w-[550px] mx-auto leading-relaxed opacity-90">
        Every piece carries the spirit of Nebraska&apos;s wide-open plains, dense timber, and the
        hunters who call it home.
      </p>
      <Link
        href="/shop"
        className="font-nav text-[14px] tracking-[3px] uppercase py-[15px] px-9 bg-transparent text-white border-2 border-white/70 transition-all duration-300 hover:bg-white hover:text-red inline-block"
      >
        View Full Collection
      </Link>
    </section>
  )
}

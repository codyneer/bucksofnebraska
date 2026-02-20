import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-[92vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background — dark placeholder until a real hero image is added */}
      <div className="absolute inset-0 bg-brand-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/20 via-brand-black/5 via-40% via-brand-black/60 to-cream" />

      <div className="relative z-[2] text-center max-w-[900px] px-5 text-white">
        <p className="font-nav text-[14px] tracking-[6px] uppercase text-red-light mb-5 opacity-0 animate-fade-up [animation-delay:300ms]">
          Nebraska&apos;s Hunting Apparel
        </p>
        <h1 className="font-display text-[clamp(56px,10vw,110px)] leading-[0.9] tracking-[3px] mb-4 opacity-0 animate-fade-up [animation-delay:500ms]">
          WEAR YOUR STATE.
          <br />
          <span className="text-red-light">HUNT YOUR LAND.</span>
        </h1>
        <p className="font-body text-[clamp(15px,2vw,19px)] text-white/85 max-w-[560px] mx-auto mb-9 leading-relaxed opacity-0 animate-fade-up [animation-delay:700ms]">
          Field-ready apparel designed in Nebraska, built for hunters who live and breathe the
          outdoors.
        </p>
        <div className="flex gap-4 justify-center flex-wrap opacity-0 animate-fade-up [animation-delay:900ms]">
          <Link
            href="/shop"
            className="font-nav text-[14px] tracking-[3px] uppercase py-[15px] px-9 bg-red text-white transition-all duration-300 hover:bg-red-dark hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(196,30,58,0.25)]"
          >
            Shop the Collection
          </Link>
          <Link
            href="/about"
            className="font-nav text-[14px] tracking-[3px] uppercase py-[15px] px-9 bg-transparent text-white border-2 border-white/70 transition-all duration-300 hover:bg-white hover:text-brand-black"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  )
}

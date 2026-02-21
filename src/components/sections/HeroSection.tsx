import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-[92vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Bowhunter with a trophy whitetail buck in the Nebraska river bottoms"
        fill
        priority
        className="object-cover object-[center_40%] brightness-[0.35] contrast-[1.1]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/20 via-transparent via-40% via-brand-black/60 to-cream" />

      {/* -mt-16 on mobile nudges text block slightly above center; sm:mt-0 resets for desktop */}
      <div className="relative z-[2] text-center max-w-[900px] px-5 text-white -mt-28 sm:-mt-16">
        <p className="font-nav text-[14px] tracking-[6px] uppercase text-red-light mb-5 opacity-0 animate-fade-up [animation-delay:300ms]">
          Est. 2013
        </p>
        <h1 className="font-display text-[clamp(42px,10vw,110px)] leading-[0.9] tracking-[3px] mb-4 opacity-0 animate-fade-up [animation-delay:500ms]">
          BUCKS OF <span className="text-red-light">NEBRASKA</span>
        </h1>
        <p className="font-body text-[clamp(15px,2vw,19px)] text-white/85 max-w-[560px] mx-auto mb-9 leading-relaxed opacity-0 animate-fade-up [animation-delay:700ms]">
          Nebraska&apos;s #1 source for deer hunting. From the Missouri River Bottoms to the Sandhills, we&apos;ve got you covered.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center opacity-0 animate-fade-up [animation-delay:900ms]">
          <Link
            href="/shop"
            className="font-nav text-[13px] sm:text-[14px] tracking-[2px] sm:tracking-[3px] uppercase py-3.5 sm:py-[15px] px-7 sm:px-9 bg-red text-white transition-all duration-300 hover:bg-red-dark hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(196,30,58,0.25)] w-full sm:w-auto text-center"
          >
            Shop the Collection
          </Link>
          <Link
            href="/about"
            className="font-nav text-[13px] sm:text-[14px] tracking-[2px] sm:tracking-[3px] uppercase py-3.5 sm:py-[15px] px-7 sm:px-9 bg-transparent text-white border-2 border-white/70 transition-all duration-300 hover:bg-white hover:text-brand-black w-full sm:w-auto text-center"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  )
}

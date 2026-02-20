export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero placeholder — will be built in Prompt 2 */}
      <section className="relative h-[92vh] min-h-[650px] flex items-center justify-center bg-brand-black overflow-hidden">
        <div className="relative z-10 text-center max-w-[900px] px-5 text-white">
          <p className="font-nav text-[14px] tracking-[6px] uppercase text-red-light mb-5">
            Nebraska&apos;s Hunting Apparel
          </p>
          <h1 className="font-display text-[clamp(56px,10vw,110px)] leading-[0.9] tracking-[3px] mb-4">
            WEAR YOUR STATE.<br />
            <span className="text-red-light">HUNT YOUR LAND.</span>
          </h1>
          <p className="font-body text-[clamp(15px,2vw,19px)] text-white/85 max-w-[560px] mx-auto mb-9 leading-relaxed">
            Field-ready apparel designed in Nebraska, built for hunters who live and breathe the outdoors.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/shop"
              className="font-nav text-[14px] tracking-[3px] uppercase py-[15px] px-9 bg-red text-white border-none cursor-pointer transition-all duration-300 hover:bg-red-dark hover:-translate-y-0.5"
            >
              Shop the Collection
            </a>
            <a
              href="/about"
              className="font-nav text-[14px] tracking-[3px] uppercase py-[15px] px-9 bg-transparent text-white border-2 border-white/70 cursor-pointer transition-all duration-300 hover:bg-white hover:text-brand-black"
            >
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-10 px-10 text-center bg-offWhite border-t border-b border-border-light">
        <div className="flex justify-center gap-12 flex-wrap items-center">
          <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light flex items-center gap-2">
            <span className="text-gold">★★★★★</span>
            <strong className="text-text text-[15px]">4.9/5</strong> From 500+ Reviews
          </div>
          <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light">
            <strong className="text-text text-[15px]">2,500+</strong> Happy Hunters
          </div>
          <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light">
            <strong className="text-text text-[15px]">Nebraska</strong> Born & Built
          </div>
        </div>
      </section>

      {/* Products section placeholder — will be wired to Shopify in Prompt 2 */}
      <section className="py-20 px-10 max-w-[1300px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-[clamp(38px,5vw,56px)] text-text leading-none">
            SHOP <span className="text-red">BEST SELLERS</span>
          </h2>
          <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
            What the community is wearing
          </p>
        </div>
        <p className="text-center text-text-light font-body">
          Products will load from Shopify once your API credentials are configured in .env.local
        </p>
      </section>

      {/* Trust Badges */}
      <section className="flex justify-center gap-10 py-12 px-5 flex-wrap">
        {[
          { title: 'Free Shipping', desc: 'On orders over $75' },
          { title: 'Easy Returns', desc: '30-day hassle free' },
          { title: 'Nebraska Made', desc: 'Designed in the heartland' },
          { title: '500+ Reviews', desc: 'From real hunters' },
        ].map((item) => (
          <div key={item.title} className="text-center max-w-[160px]">
            <h4 className="font-nav text-[12px] tracking-[2px] uppercase text-text mb-1">
              {item.title}
            </h4>
            <p className="text-[12px] text-text-muted leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Red Banner */}
      <section className="py-16 px-10 text-center bg-red text-white">
        <h2 className="font-display text-[clamp(32px,4vw,52px)]">
          Wear Your State. Hunt Your Land.
        </h2>
        <p className="font-body text-[16px] mt-3 mb-6 max-w-[550px] mx-auto leading-relaxed opacity-90">
          Join thousands of Nebraska hunters who wear their pride in the field.
        </p>
        <a
          href="/shop"
          className="font-nav text-[14px] tracking-[3px] uppercase py-[15px] px-9 bg-transparent text-white border-2 border-white/70 cursor-pointer transition-all duration-300 hover:bg-white hover:text-red inline-block"
        >
          Shop Now
        </a>
      </section>

      {/* State Pride Cards */}
      <section className="py-20 px-10 max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { num: '01', title: 'Nebraska Born', desc: 'Founded in the heart of the Cornhusker state by hunters who know the land.' },
          { num: '02', title: 'Hunter Built', desc: 'Every piece of gear is designed and tested in real hunting conditions.' },
          { num: '03', title: 'Community Driven', desc: 'Built by the community, for the community. Your feedback shapes everything.' },
        ].map((card) => (
          <div
            key={card.num}
            className="text-center py-9 px-6 border border-border bg-white transition-all duration-[400ms] hover:border-red hover:-translate-y-[3px] hover:shadow"
          >
            <div className="font-display text-[48px] text-red leading-none">{card.num}</div>
            <h3 className="font-nav text-[15px] tracking-[3px] uppercase text-text mt-2.5 mb-2">
              {card.title}
            </h3>
            <p className="text-text-light text-[13px] leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

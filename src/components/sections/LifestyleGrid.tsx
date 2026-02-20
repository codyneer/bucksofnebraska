export function LifestyleGrid() {
  return (
    <section className="py-20 px-10 max-w-[1400px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display text-[clamp(38px,5vw,56px)] text-text leading-none">
          In the <span className="text-red">Field</span>
        </h2>
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          Real people. Real gear. Nebraska proud.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2 gap-1.5">
        {/* Placeholder lifestyle images — will be replaced with real photos */}
        <div className="lg:row-span-2 bg-charcoal/10 min-h-[300px] lg:min-h-0 flex items-center justify-center">
          <span className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted">
            Lifestyle Photo 1
          </span>
        </div>
        <div className="bg-charcoal/10 min-h-[200px] flex items-center justify-center">
          <span className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted">
            Lifestyle Photo 2
          </span>
        </div>
        <div className="bg-charcoal/10 min-h-[200px] flex items-center justify-center">
          <span className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted">
            Lifestyle Photo 3
          </span>
        </div>
        <div className="bg-charcoal/10 min-h-[200px] flex items-center justify-center">
          <span className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted">
            Lifestyle Photo 4
          </span>
        </div>
        <div className="bg-charcoal/10 min-h-[200px] flex items-center justify-center">
          <span className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted">
            Lifestyle Photo 5
          </span>
        </div>
      </div>
    </section>
  )
}

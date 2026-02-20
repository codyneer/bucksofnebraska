import Image from 'next/image'

export function LifestyleGrid() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-10 max-w-[1400px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display text-[clamp(38px,5vw,56px)] text-text leading-none">
          In the <span className="text-red">Field</span>
        </h2>
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          Real people. Real gear. Nebraska proud.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2 gap-1.5">
        <div className="relative col-span-2 sm:col-span-1 lg:row-span-2 min-h-[200px] sm:min-h-[300px] lg:min-h-0 overflow-hidden">
          <Image
            src="/images/lifestyle-1.jpg"
            alt="Cody Neer with a trophy Nebraska whitetail buck wearing Bucks of Nebraska hoodie"
            fill
            className="object-cover object-[center_30%] brightness-90 hover:brightness-100 transition-all duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="relative min-h-[200px] overflow-hidden">
          <Image
            src="/images/lifestyle-2.jpg"
            alt="Hunter in blaze orange with a whitetail buck in Nebraska grasslands"
            fill
            className="object-cover object-[60%_15%] brightness-90 hover:brightness-100 transition-all duration-500"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="relative min-h-[200px] overflow-hidden">
          <Image
            src="/images/lifestyle-3.jpg"
            alt="Hunter in blaze orange with a whitetail buck at sunset in Nebraska"
            fill
            className="object-cover object-[40%_25%] brightness-90 hover:brightness-100 transition-all duration-500"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="relative min-h-[200px] overflow-hidden">
          <Image
            src="/images/lifestyle-4.jpg"
            alt="Hunter with a massive Nebraska whitetail buck"
            fill
            className="object-cover object-[center_20%] brightness-90 hover:brightness-100 transition-all duration-500"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="relative min-h-[200px] overflow-hidden">
          <Image
            src="/images/lifestyle-5.jpg"
            alt="Hunter with a trophy whitetail buck mount in the lodge"
            fill
            className="object-cover object-[40%_15%] brightness-90 hover:brightness-100 transition-all duration-500"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </div>
    </section>
  )
}

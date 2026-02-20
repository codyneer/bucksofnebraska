import { Truck, Star, MapPin } from 'lucide-react'

export function SocialProofBar() {
  return (
    <section className="py-10 px-10 text-center bg-offWhite border-t border-b border-border-light">
      <div className="flex justify-center gap-12 flex-wrap items-center">
        <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light flex items-center gap-2">
          <Star className="w-4 h-4 text-gold fill-gold" />
          <span className="text-gold">★★★★★</span>
          <strong className="text-text text-[15px]">4.9/5</strong> — 500+ Reviews
        </div>
        <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light flex items-center gap-2">
          <MapPin className="w-4 h-4 text-text-muted" />
          <strong className="text-text text-[15px]">10,000+</strong> Hunters Trust Us
        </div>
        <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light flex items-center gap-2">
          <strong className="text-text text-[15px]">Nebraska</strong> Designed & Owned
        </div>
        <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light flex items-center gap-2">
          <Truck className="w-4 h-4 text-text-muted" />
          <strong className="text-text text-[15px]">Free Ship</strong> Over $75
        </div>
      </div>
    </section>
  )
}

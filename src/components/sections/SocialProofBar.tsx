import { Star, Users, Flag, Truck } from 'lucide-react'

export function SocialProofBar() {
  return (
    <section className="py-8 sm:py-10 px-5 sm:px-10 text-center bg-offWhite border-t border-b border-border-light">
      <div className="grid grid-cols-2 gap-4 sm:flex sm:justify-center sm:gap-[50px] sm:flex-wrap items-center">
        <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light flex items-center gap-2">
          <Star className="w-4 h-4 text-gold fill-gold" />
          <strong className="text-text text-[15px]">4.9/5</strong> — 500+ Reviews
        </div>
        <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light flex items-center gap-2">
          <Users className="w-4 h-4 text-red" />
          <strong className="text-text text-[15px]">10,000+</strong> Hunters Trust Us
        </div>
        <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light flex items-center gap-2">
          <Flag className="w-4 h-4 text-red" />
          <strong className="text-text text-[15px]">Nebraska</strong> Designed &amp; Owned
        </div>
        <div className="font-nav text-[13px] tracking-[2px] uppercase text-text-light flex items-center gap-2">
          <Truck className="w-4 h-4 text-red" />
          <strong className="text-text text-[15px]">Free Ship</strong> Over $75
        </div>
      </div>
    </section>
  )
}

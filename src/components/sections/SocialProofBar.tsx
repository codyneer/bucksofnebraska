import { Star, Users, Flag, Truck } from 'lucide-react'

export function SocialProofBar() {
  return (
    <section className="py-6 sm:py-10 px-4 sm:px-10 text-center bg-offWhite border-t border-b border-border-light">
      <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-[50px] sm:flex-wrap items-center">
        <div className="font-nav text-[10px] sm:text-[13px] tracking-[1.5px] sm:tracking-[2px] uppercase text-text-light flex items-center gap-1.5 sm:gap-2 justify-center">
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold fill-gold flex-shrink-0" />
          <span><strong className="text-text text-[12px] sm:text-[15px]">4.9/5</strong> 500+ Reviews</span>
        </div>
        <div className="font-nav text-[10px] sm:text-[13px] tracking-[1.5px] sm:tracking-[2px] uppercase text-text-light flex items-center gap-1.5 sm:gap-2 justify-center">
          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red flex-shrink-0" />
          <span><strong className="text-text text-[12px] sm:text-[15px]">10K+</strong> Hunters</span>
        </div>
        <div className="font-nav text-[10px] sm:text-[13px] tracking-[1.5px] sm:tracking-[2px] uppercase text-text-light flex items-center gap-1.5 sm:gap-2 justify-center">
          <Flag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red flex-shrink-0" />
          <span><strong className="text-text text-[12px] sm:text-[15px]">NE</strong> Designed</span>
        </div>
        <div className="font-nav text-[10px] sm:text-[13px] tracking-[1.5px] sm:tracking-[2px] uppercase text-text-light flex items-center gap-1.5 sm:gap-2 justify-center">
          <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red flex-shrink-0" />
          <span><strong className="text-text text-[12px] sm:text-[15px]">Free</strong> Over $75</span>
        </div>
      </div>
    </section>
  )
}

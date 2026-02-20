import { Truck, RefreshCw, Flag, Star } from 'lucide-react'

const badges = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $75', color: 'text-red' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day hassle-free', color: 'text-red' },
  { icon: Flag, title: 'Nebraska Made', desc: 'Designed in the heartland', color: 'text-red' },
  { icon: Star, title: '500+ Reviews', desc: '4.9/5 star average', color: 'text-gold' },
]

export function TrustBadges() {
  return (
    <section className="flex justify-center gap-10 py-[50px] px-5 flex-wrap">
      {badges.map(({ icon: Icon, title, desc, color }) => (
        <div key={title} className="text-center max-w-[160px]">
          <div className="mb-2 flex justify-center">
            <Icon className={`w-7 h-7 ${color}`} />
          </div>
          <h4 className="font-nav text-[12px] tracking-[2px] uppercase text-text mb-1">
            {title}
          </h4>
          <p className="text-[12px] text-text-muted leading-relaxed font-body">{desc}</p>
        </div>
      ))}
    </section>
  )
}

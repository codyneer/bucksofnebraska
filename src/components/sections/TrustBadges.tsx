const badges = [
  { emoji: '\u{1F69A}', title: 'Free Shipping', desc: 'On orders over $75' },
  { emoji: '\u{1F504}', title: 'Easy Returns', desc: '30-day hassle-free' },
  { emoji: '\u{1F1FA}\u{1F1F8}', title: 'Nebraska Made', desc: 'Designed in the heartland' },
  { emoji: '\u{2B50}', title: '500+ Reviews', desc: '4.9/5 star average' },
]

export function TrustBadges() {
  return (
    <section className="flex justify-center gap-10 py-[50px] px-5 flex-wrap">
      {badges.map(({ emoji, title, desc }) => (
        <div key={title} className="text-center max-w-[160px]">
          <div className="mb-2 flex justify-center text-[36px] leading-none">
            {emoji}
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

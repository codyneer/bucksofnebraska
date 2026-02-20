const cards = [
  {
    num: '01',
    title: 'Nebraska Born',
    desc: 'Designed right here in the Cornhusker State. Our roots run deep.',
  },
  {
    num: '02',
    title: 'Hunter Built',
    desc: 'Every design from real time in the stand and real whitetail country.',
  },
  {
    num: '03',
    title: 'Community Driven',
    desc: "More than a brand — a family of hunters who love this land.",
  },
]

export function StatePrideCards() {
  return (
    <section className="py-20 px-10 max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[30px]">
      {cards.map((card) => (
        <div
          key={card.num}
          className="text-center py-9 px-6 border border-border bg-white transition-all duration-[400ms] hover:border-red hover:-translate-y-[3px] hover:shadow"
        >
          <div className="font-display text-[48px] text-red leading-none">{card.num}</div>
          <h3 className="font-nav text-[15px] tracking-[3px] uppercase text-text mt-2.5 mb-2">
            {card.title}
          </h3>
          <p className="text-text-light text-[13px] leading-relaxed font-body">{card.desc}</p>
        </div>
      ))}
    </section>
  )
}

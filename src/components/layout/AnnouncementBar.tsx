'use client'

const messages = [
  { text: 'FREE SHIPPING ON ORDERS OVER $75', highlight: false },
  { text: 'NEW: Spring Collection Just Dropped', highlight: true },
  { text: '★★★★★ 4.9/5 FROM 500+ HUNTERS', highlight: false },
  { text: 'LISTEN: The Bucks Podcast Ep. 47 is Live', highlight: true },
]

export function AnnouncementBar() {
  return (
    <div className="w-full bg-red text-white text-center py-2.5 px-5 font-nav text-[12px] tracking-[2.5px] uppercase relative overflow-hidden marquee-container">
      <div className="inline-flex gap-[60px] animate-marquee whitespace-nowrap marquee-content">
        {/* Duplicate content for seamless loop */}
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="flex items-center gap-2">
            {msg.highlight ? (
              <span className="text-white font-semibold">{msg.text}</span>
            ) : (
              msg.text
            )}
            <span className="text-white/40">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

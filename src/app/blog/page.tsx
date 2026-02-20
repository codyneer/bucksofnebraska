'use client'

import { useState } from 'react'

const categories = ['All', 'Hunting', 'Gear', 'Nebraska', 'News'] as const
type Category = (typeof categories)[number]

const posts = [
  {
    slug: 'top-5-public-land-spots-nebraska',
    title: 'Top 5 Public Land Spots in Nebraska',
    description: 'Our favorite walk-in areas and WMAs for whitetail, turkey, and upland birds across the state.',
    category: 'Hunting' as Category,
    date: '2026-02-10',
    readTime: '6 min read',
    image: '/logos/bn-antler.png',
  },
  {
    slug: 'layering-guide-late-season',
    title: 'The Complete Layering Guide for Late Season',
    description: 'How to stay warm in the stand when Nebraska wind chills drop below zero.',
    category: 'Gear' as Category,
    date: '2026-01-28',
    readTime: '5 min read',
    image: '/logos/bn-antler.png',
  },
  {
    slug: 'why-nebraska-is-best-kept-secret',
    title: 'Why Nebraska Is Hunting\'s Best-Kept Secret',
    description: 'From OTC tags to low pressure, here\'s why the Good Life state deserves more credit.',
    category: 'Nebraska' as Category,
    date: '2026-01-15',
    readTime: '7 min read',
    image: '/logos/bn-antler.png',
  },
  {
    slug: 'new-spring-collection-2026',
    title: 'Spring 2026 Collection Drop',
    description: 'Introducing 6 new styles built for warm-weather hunting and everyday wear.',
    category: 'News' as Category,
    date: '2026-02-01',
    readTime: '3 min read',
    image: '/logos/bn-antler.png',
  },
  {
    slug: 'setting-up-trail-cams',
    title: 'Trail Cam Strategy: Where, When, and How',
    description: 'Maximize your intel without spooking deer. Placement tips from our team.',
    category: 'Hunting' as Category,
    date: '2026-01-05',
    readTime: '8 min read',
    image: '/logos/bn-antler.png',
  },
  {
    slug: 'bn-decal-giveaway-results',
    title: 'February Decal Giveaway — Winners Announced',
    description: 'Congrats to the 10 hunters who won free BN decal packs this month.',
    category: 'News' as Category,
    date: '2026-02-15',
    readTime: '2 min read',
    image: '/logos/bn-antler.png',
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory)

  return (
    <div className="py-20 px-10 max-w-[1300px] mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display text-[clamp(44px,7vw,64px)] text-text leading-none">
          The <span className="text-red">Blog</span>
        </h1>
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          Hunting stories, gear reviews, and Nebraska life
        </p>
      </div>

      {/* Filter buttons */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-nav text-[12px] tracking-[2px] uppercase py-2 px-5 border cursor-pointer transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-red text-white border-red'
                : 'bg-white text-text border-border hover:border-red hover:text-red'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <article
            key={post.slug}
            className="bg-white border border-border-light overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-[3px] group"
          >
            <div className="relative h-[200px] bg-gradient-to-br from-charcoal to-brand-black flex items-center justify-center overflow-hidden">
              <span className="font-display text-[60px] text-white/10 group-hover:scale-110 transition-transform duration-500">
                BN
              </span>
              <span className="absolute top-3 left-3 font-nav text-[10px] tracking-[1.5px] uppercase bg-red text-white py-0.5 px-2">
                {post.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-nav text-[15px] tracking-[1px] uppercase text-text mb-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-text-light text-[14px] leading-relaxed font-body mb-3 line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center gap-3 font-nav text-[11px] tracking-[1px] text-text-muted">
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

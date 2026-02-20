'use client'

import { useState } from 'react'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog-data'

const categories = ['All', 'Hunting', 'Gear', 'Nebraska', 'News'] as const
type Category = (typeof categories)[number]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[1300px] mx-auto">
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
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-white border border-border-light overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-[3px] group"
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
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, Users, BarChart3 } from 'lucide-react'
import { recipes, categoryColors } from '@/lib/recipe-data'

const categories = ['All', 'Venison', 'Waterfowl', 'Upland', 'Rabbit', 'Squirrel'] as const
type Category = (typeof categories)[number]

export default function RecipesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered =
    activeCategory === 'All'
      ? recipes
      : recipes.filter((r) => r.category === activeCategory)

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[1300px] mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display text-[clamp(44px,7vw,64px)] text-text leading-none">
          Wild Game <span className="text-red">Recipes</span>
        </h1>
        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          Field to table. The way it should be.
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

      {/* Recipe grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="block bg-white border border-border-light overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-[3px] group"
          >
            <div className="relative h-[180px] bg-gradient-to-br from-charcoal to-brand-black flex items-center justify-center overflow-hidden">
              <span className="font-display text-[48px] text-white/10 group-hover:scale-110 transition-transform duration-500">
                BN
              </span>
              <span className={`absolute top-3 left-3 font-nav text-[10px] tracking-[1.5px] uppercase text-white py-0.5 px-2 ${categoryColors[recipe.category] || 'bg-red'}`}>
                {recipe.category}
              </span>
            </div>
            <div className="p-5">
              <h2 className="font-nav text-[15px] tracking-[1px] uppercase text-text mb-2 leading-snug">
                {recipe.title}
              </h2>
              <p className="text-text-light text-[14px] leading-relaxed font-body mb-4 line-clamp-2">
                {recipe.description}
              </p>
              <div className="flex items-center gap-3 sm:gap-4 pt-3 border-t border-border-light flex-wrap">
                <span className="flex items-center gap-1.5 font-nav text-[11px] tracking-[1px] text-text-muted">
                  <Clock className="w-3.5 h-3.5" /> {recipe.cookTime}
                </span>
                <span className="flex items-center gap-1.5 font-nav text-[11px] tracking-[1px] text-text-muted">
                  <Users className="w-3.5 h-3.5" /> {recipe.servings} servings
                </span>
                <span className="flex items-center gap-1.5 font-nav text-[11px] tracking-[1px] text-text-muted">
                  <BarChart3 className="w-3.5 h-3.5" /> {recipe.difficulty}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

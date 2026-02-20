import { Clock, Users, BarChart3 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wild Game Recipes — Bucks of Nebraska',
  description: 'Field-to-table recipes for venison, waterfowl, upland birds, and more.',
}

const recipes = [
  {
    title: 'Smoked Venison Backstrap',
    description: 'Low and slow smoked backstrap with a coffee-chili rub. The best cut, treated right.',
    category: 'Venison',
    cookTime: '2 hrs',
    servings: 4,
    difficulty: 'Medium',
  },
  {
    title: 'Venison Chili',
    description: 'Hearty ground venison chili with beans, peppers, and a touch of dark beer.',
    category: 'Venison',
    cookTime: '1.5 hrs',
    servings: 6,
    difficulty: 'Easy',
  },
  {
    title: 'Pan-Seared Duck Breast',
    description: 'Crispy skin, medium-rare center. Served with a cherry reduction and roasted root vegetables.',
    category: 'Waterfowl',
    cookTime: '30 min',
    servings: 2,
    difficulty: 'Medium',
  },
  {
    title: 'Pheasant Pot Pie',
    description: 'Classic comfort food with wild pheasant, seasonal vegetables, and a flaky butter crust.',
    category: 'Upland',
    cookTime: '1 hr',
    servings: 4,
    difficulty: 'Medium',
  },
  {
    title: 'Venison Jerky',
    description: 'Soy, Worcestershire, and black pepper marinade. Dehydrated to perfection for the blind.',
    category: 'Venison',
    cookTime: '8 hrs',
    servings: 8,
    difficulty: 'Easy',
  },
  {
    title: 'Goose Tacos',
    description: 'Slow-cooked goose with chipotle, pickled onions, and fresh cilantro on corn tortillas.',
    category: 'Waterfowl',
    cookTime: '3 hrs',
    servings: 4,
    difficulty: 'Easy',
  },
]

const categoryColors: Record<string, string> = {
  Venison: 'bg-red',
  Waterfowl: 'bg-charcoal',
  Upland: 'bg-green',
}

export default function RecipesPage() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <article
            key={recipe.title}
            className="bg-white border border-border-light overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-[3px] group"
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
              <h3 className="font-nav text-[15px] tracking-[1px] uppercase text-text mb-2">
                {recipe.title}
              </h3>
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
          </article>
        ))}
      </div>
    </div>
  )
}

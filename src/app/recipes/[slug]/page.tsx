import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, BarChart3 } from 'lucide-react'
import { recipes, getRecipeBySlug, categoryColors } from '@/lib/recipe-data'
import { RecipeSchema, BreadcrumbSchema } from '@/lib/structured-data'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)

  if (!recipe) {
    return { title: 'Recipe Not Found' }
  }

  const ogImage = `/api/og?title=${encodeURIComponent(recipe.title)}&subtitle=${encodeURIComponent(recipe.category + ' Recipe — ' + recipe.cookTime)}`

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: `${recipe.title} — Bucks of Nebraska`,
      description: recipe.description,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: recipe.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${recipe.title} — Bucks of Nebraska`,
      description: recipe.description,
      images: [ogImage],
    },
  }
}

export default async function RecipeDetailPage({ params }: Props) {
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)

  if (!recipe) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bucksofnebraska.vercel.app'

  return (
    <article className="py-12 sm:py-20 px-4 sm:px-10 max-w-[760px] mx-auto">
      <RecipeSchema recipe={recipe} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Recipes', url: `${siteUrl}/recipes` },
          { name: recipe.title },
        ]}
      />

      {/* Back link */}
      <Link
        href="/recipes"
        className="inline-flex items-center gap-2 font-nav text-[12px] tracking-[2px] uppercase text-text-muted hover:text-red transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Recipes
      </Link>

      {/* Category + metadata */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className={`font-nav text-[10px] tracking-[1.5px] uppercase text-white py-0.5 px-2.5 ${categoryColors[recipe.category] || 'bg-red'}`}>
          {recipe.category}
        </span>
        <span className="flex items-center gap-1.5 font-nav text-[11px] tracking-[1px] text-text-muted">
          <Clock className="w-3.5 h-3.5" /> {recipe.cookTime}
        </span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span className="flex items-center gap-1.5 font-nav text-[11px] tracking-[1px] text-text-muted">
          <Users className="w-3.5 h-3.5" /> {recipe.servings} servings
        </span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span className="flex items-center gap-1.5 font-nav text-[11px] tracking-[1px] text-text-muted">
          <BarChart3 className="w-3.5 h-3.5" /> {recipe.difficulty}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-display text-[clamp(36px,6vw,52px)] text-text leading-[1.05] mb-6">
        {recipe.title}
      </h1>

      {/* Subtitle */}
      <p className="font-body text-[18px] text-text-light leading-relaxed mb-10 border-l-[3px] border-red pl-5">
        {recipe.description}
      </p>

      {/* Article content — rendered from markdown-style content */}
      <div className="prose-bn">
        {recipe.content.split('\n\n').map((block, i) => {
          // H2 headings
          if (block.startsWith('## ')) {
            return (
              <h2
                key={i}
                className="font-display text-[28px] text-text mt-10 mb-4 leading-tight"
              >
                {block.replace('## ', '')}
              </h2>
            )
          }

          // Bold paragraph starts (like **The River Bottom Tee**)
          if (block.startsWith('**') && block.includes('**')) {
            const parts = block.split(/\*\*(.*?)\*\*/g)
            return (
              <p
                key={i}
                className="font-body text-[16px] text-text leading-[1.8] mb-4"
              >
                {parts.map((part, j) =>
                  j % 2 === 1 ? (
                    <strong key={j} className="font-semibold text-text">
                      {part}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </p>
            )
          }

          // List items (lines starting with numbers or dashes)
          if (
            block.split('\n').every((line) => /^(\d+\.|-)/.test(line.trim()))
          ) {
            const items = block.split('\n').filter(Boolean)
            return (
              <ul key={i} className="mb-4 ml-1">
                {items.map((item, j) => (
                  <li
                    key={j}
                    className="font-body text-[16px] text-text leading-[1.8] mb-1 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[12px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-red"
                  >
                    {item.replace(/^(\d+\.\s*|-\s*)/, '').split(/\*\*(.*?)\*\*/g).map((part, k) =>
                      k % 2 === 1 ? (
                        <strong key={k} className="font-semibold">
                          {part}
                        </strong>
                      ) : (
                        <span key={k}>{part}</span>
                      )
                    )}
                  </li>
                ))}
              </ul>
            )
          }

          // Regular paragraphs with bold support
          return (
            <p
              key={i}
              className="font-body text-[16px] text-text leading-[1.8] mb-4"
            >
              {block.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                j % 2 === 1 ? (
                  <strong key={j} className="font-semibold text-text">
                    {part}
                  </strong>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 pt-8 border-t border-border text-center">
        <p className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted mb-3">
          Like what you read?
        </p>
        <Link
          href="/shop"
          className="inline-block bg-red text-white font-nav text-[12px] tracking-[2px] uppercase py-3 px-8 transition-colors hover:bg-red-dark"
        >
          Shop the Collection
        </Link>
      </div>
    </article>
  )
}

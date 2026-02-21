import { FilterableProductGrid } from '@/components/product/FilterableProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { getCollectionProducts } from '@/lib/shopify'
import { BreadcrumbSchema, ItemListSchema } from '@/lib/structured-data'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ handle: string }>
}

// SEO-rich descriptions for known collections
const collectionSeoMap: Record<string, { title?: string; description: string; keywords: string }> = {
  'best-sellers': {
    title: 'Best Selling Nebraska Hunting Apparel',
    description: 'Shop our most popular Nebraska deer hunting apparel. Best-selling hunting shirts, hoodies, and hats loved by hunters across the state.',
    keywords: 'best selling hunting shirts, popular deer hunting apparel, nebraska hunting gear',
  },
  'new-arrivals': {
    title: 'New Hunting Apparel & Gear',
    description: 'The latest Nebraska hunting apparel drops. New deer hunting shirts, hoodies, hats, and accessories fresh for the season.',
    keywords: 'new hunting shirts, new hunting apparel 2026, latest deer hunting gear',
  },
  hats: {
    title: 'Hunting Hats & Caps',
    description: 'Nebraska deer hunting hats and caps. Snapbacks, trucker hats, and fitted caps with whitetail and state pride designs.',
    keywords: 'hunting hats, deer hunting hat, nebraska hunting hat, camo hunting hat, whitetail hat',
  },
  shirts: {
    title: 'Deer Hunting T-Shirts',
    description: 'Nebraska deer hunting t-shirts and graphic tees. Premium whitetail designs built for the field and everyday wear.',
    keywords: 'deer hunting shirts, hunting t-shirts, hunting graphic tees, nebraska hunting shirts, whitetail t-shirt',
  },
  hoodies: {
    title: 'Hunting Hoodies & Sweatshirts',
    description: 'Nebraska deer hunting hoodies and sweatshirts. Heavyweight, warm layers with whitetail designs for cold weather hunts.',
    keywords: 'hunting hoodie, deer hunting hoodie, hunting sweatshirt, whitetail hoodie, cold weather hunting hoodie',
  },
  decals: {
    title: 'Hunting Decals & Stickers',
    description: 'Nebraska hunting decals and stickers. The iconic red N with antlers and whitetail designs for your truck, cooler, or gear.',
    keywords: 'hunting decals, deer hunting stickers, nebraska hunting decal, truck decal',
  },
  accessories: {
    title: 'Hunting Accessories & Gear',
    description: 'Nebraska hunting accessories. Drinkware, koozies, decals, and gear essentials for hunters.',
    keywords: 'hunting accessories, hunting gifts, deer hunting gear, hunting drinkware',
  },
  deer: {
    title: 'Whitetail Deer Hunting Collection',
    description: 'Shop our whitetail deer hunting collection. T-shirts, hoodies, hats, and gear featuring Nebraska whitetail designs.',
    keywords: 'whitetail deer clothing, deer hunting apparel, whitetail hunting gear',
  },
  duck: {
    title: 'Duck Hunting Collection',
    description: 'Nebraska duck hunting apparel. Hats, shirts, and gear for waterfowl hunters.',
    keywords: 'duck hunting apparel, waterfowl hunting gear, duck hunting hat',
  },
  'pheasant-hats': {
    title: 'Pheasant Hunting Hats',
    description: 'Nebraska pheasant hunting hats and caps. Upland bird designs for the field.',
    keywords: 'pheasant hunting hat, upland bird hat, nebraska pheasant hunting',
  },
  'bass-hats': {
    title: 'Bass Fishing Hats',
    description: 'Nebraska bass fishing hats and caps. Largemouth and smallmouth designs for anglers.',
    keywords: 'bass fishing hat, fishing hat, nebraska fishing',
  },
}

export async function generateStaticParams() {
  return [
    'best-sellers', 'new-arrivals', 'hats', 'shirts', 'hoodies',
    'decals', 'accessories', 'deer', 'duck', 'pheasant-hats', 'bass-hats',
  ].map((handle) => ({ handle }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const collection = await getCollectionProducts(handle, 1)

  const fallbackTitle = handle
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const seo = collectionSeoMap[handle]
  const title = seo?.title || collection?.title || fallbackTitle
  const description = seo?.description || collection?.description || `Shop the ${fallbackTitle} collection. Nebraska hunting apparel built for the field.`
  const ogImage = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Nebraska Hunting Apparel')}`

  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: { canonical: `/collections/${handle}` },
    openGraph: {
      title: `${title} | Bucks of Nebraska`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} — Bucks of Nebraska` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Bucks of Nebraska`,
      description,
      images: [ogImage],
    },
  }
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params
  const collection = await getCollectionProducts(handle, 50)

  if (!collection) {
    notFound()
  }

  const products = collection.products.edges.map((e) => e.node)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bucksofnebraska.com'

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[1300px] mx-auto">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Shop', url: `${siteUrl}/shop` },
          { name: collection.title },
        ]}
      />
      <ItemListSchema
        products={products}
        listName={collection.title}
        url={`${siteUrl}/collections/${handle}`}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: collection.title },
        ]}
      />
      <SectionHeader
        title={collection.title}
        subtitle={collection.description || undefined}
      />
      <FilterableProductGrid products={products} collectionHandle={handle} />
    </div>
  )
}

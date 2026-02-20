import { FilterableProductGrid } from '@/components/product/FilterableProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { getCollectionProducts } from '@/lib/shopify'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const title = handle
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const description = `Shop the ${title} collection from Bucks of Nebraska.`
  const ogImage = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Shop the Collection')}`

  return {
    title,
    description,
    openGraph: {
      title: `${title} — Bucks of Nebraska`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} Collection` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Bucks of Nebraska`,
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

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[1300px] mx-auto">
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

import { ProductGrid } from '@/components/product/ProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
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

  return {
    title: `${title} — Bucks of Nebraska`,
    description: `Shop the ${title} collection from Bucks of Nebraska.`,
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
    <div className="py-20 px-10 max-w-[1300px] mx-auto">
      <SectionHeader
        title={collection.title}
        subtitle={collection.description || undefined}
      />
      <ProductGrid products={products} />
    </div>
  )
}

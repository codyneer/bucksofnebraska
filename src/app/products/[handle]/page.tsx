import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/shopify'
import { ProductDetail } from '@/components/product/ProductDetail'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    return { title: 'Product Not Found — Bucks of Nebraska' }
  }

  return {
    title: `${product.title} — Bucks of Nebraska`,
    description: product.description || `Shop ${product.title} from Bucks of Nebraska.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

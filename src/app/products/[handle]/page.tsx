import { notFound } from 'next/navigation'
import { getProduct, getAllProducts } from '@/lib/shopify'
import { ProductDetail } from '@/components/product/ProductDetail'
import { getProductReviews } from '@/lib/reviews'
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

  const [product, reviews, allProducts] = await Promise.all([
    getProduct(handle),
    getProductReviews(handle),
    getAllProducts(50),
  ])

  if (!product) {
    notFound()
  }

  const productsList = allProducts.map((p) => ({ handle: p.handle, title: p.title }))

  return (
    <ProductDetail
      product={product}
      reviews={reviews}
      allProducts={productsList}
    />
  )
}

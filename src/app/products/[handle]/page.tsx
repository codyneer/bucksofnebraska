import { notFound } from 'next/navigation'
import { getProduct, getAllProducts } from '@/lib/shopify'
import { ProductDetail } from '@/components/product/ProductDetail'
import { getProductReviews } from '@/lib/reviews'
import { ProductSchema, BreadcrumbSchema } from '@/lib/structured-data'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  const price = `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`
  const description = product.description || `Shop ${product.title} from Bucks of Nebraska.`
  const productImage = product.images.edges[0]?.node.url
  const ogImage = productImage
    ? `/api/og/product?title=${encodeURIComponent(product.title)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(productImage)}`
    : `/api/og?title=${encodeURIComponent(product.title)}&subtitle=${encodeURIComponent(price + ' — Free shipping over $75')}`

  return {
    title: product.title,
    description,
    openGraph: {
      title: `${product.title} — Bucks of Nebraska`,
      description,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: product.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} — Bucks of Nebraska`,
      description,
      images: [ogImage],
    },
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bucksofnebraska.vercel.app'

  return (
    <>
      <ProductSchema product={product} reviews={reviews} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Shop', url: `${siteUrl}/shop` },
          { name: product.title },
        ]}
      />
      <ProductDetail
        product={product}
        reviews={reviews}
        allProducts={productsList}
      />
    </>
  )
}

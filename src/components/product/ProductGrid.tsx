import { ProductCard } from './ProductCard'
import type { ShopifyProduct, ProductVariant } from '@/lib/shopify'

type ProductGridProps = {
  products: ShopifyProduct[]
  compact?: boolean
  /**
   * Give each colour its own card. A shopper browsing a collection sees the
   * cream hat as well as the camo one instead of only whichever came first.
   */
  splitByColor?: boolean
}

type Entry = { key: string; product: ShopifyProduct; colorVariant?: ProductVariant }

const COLOR_OPTION_NAMES = ['color', 'colour']

function expandByColor(products: ShopifyProduct[]): Entry[] {
  return products.flatMap((product) => {
    const colorOption = product.options?.find(
      (option) =>
        COLOR_OPTION_NAMES.includes(option.name.toLowerCase()) && option.values.length > 1
    )
    if (!colorOption) return [{ key: product.id, product }]

    const cards: Entry[] = []
    for (const value of colorOption.values) {
      const variant = product.variants.edges
        .map((edge) => edge.node)
        .find(
          (node) =>
            node.availableForSale &&
            node.selectedOptions.some(
              (option) =>
                COLOR_OPTION_NAMES.includes(option.name.toLowerCase()) && option.value === value
            )
        )
      if (variant) cards.push({ key: `${product.id}:${value}`, product, colorVariant: variant })
    }
    return cards.length > 0 ? cards : [{ key: product.id, product }]
  })
}

export function ProductGrid({ products, compact, splitByColor }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-text-light font-body py-12">
        No products found.
      </p>
    )
  }

  return (
    <div
      className={`grid gap-4 sm:gap-6 ${
        compact
          ? 'grid-cols-2'
          : 'grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {(splitByColor
        ? expandByColor(products)
        : products.map((product) => ({ key: product.id, product }) as Entry)
      ).map((entry) => (
        <ProductCard
          key={entry.key}
          product={entry.product}
          colorVariant={entry.colorVariant}
        />
      ))}
    </div>
  )
}

import type { ShopifyProduct } from './shopify'

export type SortOption = 'best-sellers' | 'newest' | 'price-asc' | 'price-desc'

export type FilterState = {
  sizes: string[]
  priceRanges: string[]
  sort: SortOption
}

export const PRICE_RANGES = [
  { label: 'Under $15', key: 'under-15', min: 0, max: 15 },
  { label: '$15 - $30', key: '15-30', min: 15, max: 30 },
  { label: '$30 - $50', key: '30-50', min: 30, max: 50 },
  { label: '$50+', key: '50-plus', min: 50, max: Infinity },
] as const

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Best Sellers', value: 'best-sellers' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
]

export const CATEGORY_FILTERS = [
  { label: 'T-Shirts', handle: 'shirts' },
  { label: 'Hoodies', handle: 'hoodies' },
  { label: 'Hats & Caps', handle: 'hats' },
  { label: 'Decals & Stickers', handle: 'decals' },
  { label: 'Accessories', handle: 'accessories' },
]

// Apparel sizes in display order
const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']

export function extractSizes(products: ShopifyProduct[]): string[] {
  const sizes = new Set<string>()

  for (const product of products) {
    for (const { node: variant } of product.variants.edges) {
      for (const opt of variant.selectedOptions) {
        if (opt.name === 'Size' && SIZE_ORDER.includes(opt.value)) {
          sizes.add(opt.value)
        }
      }
    }
  }

  return SIZE_ORDER.filter((s) => sizes.has(s))
}

export function applyFilters(
  products: ShopifyProduct[],
  filters: FilterState
): ShopifyProduct[] {
  let result = [...products]

  // Filter by size
  if (filters.sizes.length > 0) {
    result = result.filter((product) =>
      product.variants.edges.some(({ node: variant }) =>
        variant.selectedOptions.some(
          (opt) => opt.name === 'Size' && filters.sizes.includes(opt.value)
        )
      )
    )
  }

  // Filter by price range
  if (filters.priceRanges.length > 0) {
    const activeRanges = PRICE_RANGES.filter((r) =>
      filters.priceRanges.includes(r.key)
    )
    result = result.filter((product) => {
      const price = parseFloat(product.priceRange.minVariantPrice.amount)
      return activeRanges.some((r) => price >= r.min && price < r.max)
    })
  }

  // Sort
  switch (filters.sort) {
    case 'best-sellers':
      result.sort((a, b) => {
        const aBS = a.tags.some((t) => t.toLowerCase() === 'best-seller') ? 0 : 1
        const bBS = b.tags.some((t) => t.toLowerCase() === 'best-seller') ? 0 : 1
        return aBS - bBS
      })
      break
    case 'newest':
      result.sort((a, b) => {
        const aNew = a.tags.some((t) => t.toLowerCase() === 'new') ? 0 : 1
        const bNew = b.tags.some((t) => t.toLowerCase() === 'new') ? 0 : 1
        return aNew - bNew
      })
      break
    case 'price-asc':
      result.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      )
      break
    case 'price-desc':
      result.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      )
      break
  }

  return result
}

export function parseFiltersFromParams(params: URLSearchParams): FilterState {
  const sizeParam = params.get('size')
  const priceParam = params.get('price')
  const sortParam = params.get('sort')

  return {
    sizes: sizeParam ? sizeParam.split(',').filter(Boolean) : [],
    priceRanges: priceParam ? priceParam.split(',').filter(Boolean) : [],
    sort: (SORT_OPTIONS.some((o) => o.value === sortParam)
      ? sortParam
      : 'best-sellers') as SortOption,
  }
}

export function filtersToParams(filters: FilterState): string {
  const params = new URLSearchParams()

  if (filters.sizes.length > 0) {
    params.set('size', filters.sizes.join(','))
  }
  if (filters.priceRanges.length > 0) {
    params.set('price', filters.priceRanges.join(','))
  }
  if (filters.sort !== 'best-sellers') {
    params.set('sort', filters.sort)
  }

  return params.toString()
}

export function countActiveFilters(filters: FilterState): number {
  return filters.sizes.length + filters.priceRanges.length
}

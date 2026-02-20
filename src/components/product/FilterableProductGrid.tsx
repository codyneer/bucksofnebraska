'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import { ProductGrid } from './ProductGrid'
import { FilterSidebar } from './FilterSidebar'
import { MobileFilterDrawer } from './MobileFilterDrawer'
import {
  extractSizes,
  applyFilters,
  parseFiltersFromParams,
  countActiveFilters,
} from '@/lib/filter-utils'
import type { ShopifyProduct } from '@/lib/shopify'

type FilterableProductGridProps = {
  products: ShopifyProduct[]
  collectionHandle?: string
}

function FilterableProductGridInner({
  products,
  collectionHandle,
}: FilterableProductGridProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const searchParams = useSearchParams()
  const filters = parseFiltersFromParams(searchParams)
  const activeCount = countActiveFilters(filters)
  const availableSizes = extractSizes(products)
  const filteredProducts = applyFilters(products, filters)

  return (
    <>
      {/* Mobile filter bar */}
      <div className="lg:hidden flex items-center justify-between mb-5">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-white border border-border py-2.5 px-4 cursor-pointer font-nav text-[12px] tracking-[2px] uppercase text-text transition-colors hover:border-red hover:text-red"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="bg-red text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center ml-0.5">
              {activeCount}
            </span>
          )}
        </button>
        <span className="font-nav text-[11px] tracking-[1px] uppercase text-text-muted">
          {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
        </span>
      </div>

      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        availableSizes={availableSizes}
        collectionHandle={collectionHandle}
        totalResults={filteredProducts.length}
      />

      {/* Desktop layout: sidebar + grid */}
      <div className="flex gap-8">
        <FilterSidebar
          availableSizes={availableSizes}
          collectionHandle={collectionHandle}
          totalResults={filteredProducts.length}
        />
        <div className="flex-1 min-w-0">
          <ProductGrid products={filteredProducts} compact />
        </div>
      </div>
    </>
  )
}

export function FilterableProductGrid(props: FilterableProductGridProps) {
  return (
    <Suspense
      fallback={
        <div className="flex gap-8">
          {/* Sidebar skeleton */}
          <div className="w-[240px] shrink-0 hidden lg:block">
            <div className="h-4 bg-border-light rounded w-24 mb-5" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-6">
                <div className="h-3 bg-border-light rounded w-16 mb-3" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-3 bg-border-light rounded w-28" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Grid skeleton */}
          <div className="flex-1 grid grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border border-border-light animate-pulse"
              >
                <div className="bg-border-light" style={{ aspectRatio: '1 / 1.15' }} />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-border-light rounded w-3/4" />
                  <div className="h-4 bg-border-light rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <FilterableProductGridInner {...props} />
    </Suspense>
  )
}

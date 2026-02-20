'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ChevronDown, X } from 'lucide-react'
import {
  PRICE_RANGES,
  SORT_OPTIONS,
  CATEGORY_FILTERS,
  countActiveFilters,
  parseFiltersFromParams,
  filtersToParams,
} from '@/lib/filter-utils'
import type { SortOption } from '@/lib/filter-utils'

type FilterSidebarProps = {
  availableSizes: string[]
  collectionHandle?: string
  totalResults: number
}

export function FilterSidebar({
  availableSizes,
  collectionHandle,
  totalResults,
}: FilterSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filters = parseFiltersFromParams(searchParams)
  const activeCount = countActiveFilters(filters)

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    size: true,
    price: true,
    sort: true,
  })

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const updateFilters = (newFilters: typeof filters) => {
    const paramString = filtersToParams(newFilters)
    router.replace(pathname + (paramString ? `?${paramString}` : ''), {
      scroll: false,
    })
  }

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    updateFilters({ ...filters, sizes: newSizes })
  }

  const togglePriceRange = (key: string) => {
    const newRanges = filters.priceRanges.includes(key)
      ? filters.priceRanges.filter((r) => r !== key)
      : [...filters.priceRanges, key]
    updateFilters({ ...filters, priceRanges: newRanges })
  }

  const setSort = (sort: SortOption) => {
    updateFilters({ ...filters, sort })
  }

  const clearAll = () => {
    router.replace(pathname, { scroll: false })
  }

  return (
    <aside className="w-[240px] shrink-0 hidden lg:block">
      {/* Result count + clear */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted">
          {totalResults} Product{totalResults !== 1 ? 's' : ''}
        </span>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="font-nav text-[11px] tracking-[1px] uppercase text-red bg-transparent border-none cursor-pointer hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {filters.sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className="flex items-center gap-1 bg-offWhite border border-border text-text-light font-nav text-[10px] tracking-[1px] uppercase py-1 px-2.5 cursor-pointer hover:border-red hover:text-red transition-colors"
            >
              {size}
              <X className="w-2.5 h-2.5" />
            </button>
          ))}
          {filters.priceRanges.map((key) => {
            const range = PRICE_RANGES.find((r) => r.key === key)
            return range ? (
              <button
                key={key}
                onClick={() => togglePriceRange(key)}
                className="flex items-center gap-1 bg-offWhite border border-border text-text-light font-nav text-[10px] tracking-[1px] uppercase py-1 px-2.5 cursor-pointer hover:border-red hover:text-red transition-colors"
              >
                {range.label}
                <X className="w-2.5 h-2.5" />
              </button>
            ) : null
          })}
        </div>
      )}

      {/* Category filter (only on /shop page) */}
      {!collectionHandle && (
        <FilterSection
          title="Category"
          isOpen={openSections.category}
          onToggle={() => toggleSection('category')}
        >
          <div className="flex flex-col gap-0.5">
            {CATEGORY_FILTERS.map((cat) => (
              <Link
                key={cat.handle}
                href={`/collections/${cat.handle}`}
                className="font-body text-[14px] text-text-light py-1.5 transition-all duration-200 hover:text-red hover:pl-1.5"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Size filter */}
      {availableSizes.length > 0 && (
        <FilterSection
          title="Size"
          isOpen={openSections.size}
          onToggle={() => toggleSection('size')}
        >
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const active = filters.sizes.includes(size)
              return (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`min-w-[40px] py-1.5 px-2.5 text-center font-nav text-[11px] tracking-[1px] uppercase border cursor-pointer transition-all duration-200 ${
                    active
                      ? 'bg-red text-white border-red'
                      : 'bg-white text-text-light border-border hover:border-charcoal hover:text-text'
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </FilterSection>
      )}

      {/* Price Range filter */}
      <FilterSection
        title="Price"
        isOpen={openSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="flex flex-col gap-1">
          {PRICE_RANGES.map((range) => {
            const active = filters.priceRanges.includes(range.key)
            return (
              <label
                key={range.key}
                className="flex items-center gap-2.5 py-1 cursor-pointer group"
              >
                <span
                  className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                    active
                      ? 'bg-red border-red'
                      : 'border-border group-hover:border-charcoal'
                  }`}
                >
                  {active && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => togglePriceRange(range.key)}
                  className="sr-only"
                />
                <span className="font-body text-[13px] text-text-light group-hover:text-text transition-colors">
                  {range.label}
                </span>
              </label>
            )
          })}
        </div>
      </FilterSection>

      {/* Sort */}
      <FilterSection
        title="Sort By"
        isOpen={openSections.sort}
        onToggle={() => toggleSection('sort')}
      >
        <select
          value={filters.sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="w-full py-2 px-3 font-body text-[13px] text-text border border-border bg-white cursor-pointer focus:outline-none focus:border-red transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FilterSection>
    </aside>
  )
}

// Collapsible filter section
function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer py-1 mb-2"
      >
        <span className="font-nav text-[12px] tracking-[2px] uppercase text-text">
          {title}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  )
}

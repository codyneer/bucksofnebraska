'use client'

import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import {
  PRICE_RANGES,
  SORT_OPTIONS,
  CATEGORY_FILTERS,
  parseFiltersFromParams,
  filtersToParams,
} from '@/lib/filter-utils'
import type { SortOption } from '@/lib/filter-utils'

type MobileFilterDrawerProps = {
  isOpen: boolean
  onClose: () => void
  availableSizes: string[]
  collectionHandle?: string
  totalResults: number
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  availableSizes,
  collectionHandle,
  totalResults,
}: MobileFilterDrawerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filters = parseFiltersFromParams(searchParams)

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

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
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-200 transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-[320px] bg-white z-201 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-nav text-[14px] tracking-[2px] uppercase text-text">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-text-muted hover:text-text transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Category (only on /shop) */}
          {!collectionHandle && (
            <MobileFilterSection title="Category">
              <div className="flex flex-col gap-0.5">
                {CATEGORY_FILTERS.map((cat) => (
                  <Link
                    key={cat.handle}
                    href={`/collections/${cat.handle}`}
                    onClick={onClose}
                    className="font-body text-[14px] text-text-light py-1.5 transition-colors hover:text-red"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </MobileFilterSection>
          )}

          {/* Size */}
          {availableSizes.length > 0 && (
            <MobileFilterSection title="Size">
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => {
                  const active = filters.sizes.includes(size)
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`min-w-[42px] py-2 px-3 text-center font-nav text-[11px] tracking-[1px] uppercase border cursor-pointer transition-all ${
                        active
                          ? 'bg-red text-white border-red'
                          : 'bg-white text-text-light border-border'
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </MobileFilterSection>
          )}

          {/* Price */}
          <MobileFilterSection title="Price">
            <div className="flex flex-col gap-1.5">
              {PRICE_RANGES.map((range) => {
                const active = filters.priceRanges.includes(range.key)
                return (
                  <label
                    key={range.key}
                    className="flex items-center gap-2.5 py-1.5 cursor-pointer"
                  >
                    <span
                      className={`w-[18px] h-[18px] border flex items-center justify-center shrink-0 transition-colors ${
                        active ? 'bg-red border-red' : 'border-border'
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
                    <span className="font-body text-[14px] text-text-light">
                      {range.label}
                    </span>
                  </label>
                )
              })}
            </div>
          </MobileFilterSection>

          {/* Sort */}
          <MobileFilterSection title="Sort By">
            <select
              value={filters.sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="w-full py-2.5 px-3 font-body text-[14px] text-text border border-border bg-white cursor-pointer focus:outline-none focus:border-red"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </MobileFilterSection>
        </div>

        {/* Footer buttons */}
        <div className="px-5 py-4 border-t border-border flex flex-col gap-2.5">
          <button
            onClick={onClose}
            className="w-full py-3 bg-red text-white font-nav text-[12px] tracking-[2px] uppercase border-none cursor-pointer transition-colors hover:bg-red-dark"
          >
            View {totalResults} Product{totalResults !== 1 ? 's' : ''}
          </button>
          <button
            onClick={clearAll}
            className="w-full py-2.5 bg-transparent text-text-muted font-nav text-[11px] tracking-[2px] uppercase border border-border cursor-pointer transition-colors hover:text-red hover:border-red"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  )
}

function MobileFilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-border-light pb-4 mb-4">
      <h3 className="font-nav text-[12px] tracking-[2px] uppercase text-text mb-3">
        {title}
      </h3>
      {children}
    </div>
  )
}

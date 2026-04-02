'use client'

import { useState, useEffect } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, TrendingUp, Users, Calendar, ExternalLink } from 'lucide-react'
import type { AnalyticsData } from '@/lib/google-analytics'

type SortDir = 'desc' | 'asc'

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [productSort, setProductSort] = useState<SortDir>('desc')
  const [pageSort, setPageSort] = useState<SortDir>('desc')

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/admin/analytics')
        if (res.status === 503) {
          setError('not_configured')
          return
        }
        if (!res.ok) throw new Error('fetch_failed')
        const json = await res.json()
        setData(json)
      } catch {
        setError('fetch_failed')
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="pt-10 pb-20 px-10 max-w-[1100px] mx-auto">
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-red border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (error === 'not_configured') {
    return (
      <div className="pt-10 pb-20 px-10 max-w-[900px] mx-auto">
        <h1 className="font-display text-[48px] text-text mb-2 text-center">
          Site <span className="text-red">Analytics</span>
        </h1>
        <div className="mt-10 bg-white border border-border-light p-8 text-center">
          <TrendingUp className="w-10 h-10 text-text-muted mx-auto mb-4" />
          <p className="font-nav text-[14px] tracking-[2px] uppercase text-text mb-2">
            Google Analytics Not Connected
          </p>
          <p className="font-body text-[14px] text-text-muted mb-6 max-w-[480px] mx-auto">
            Add these 3 environment variables in Vercel to enable analytics:
          </p>
          <div className="text-left max-w-[560px] mx-auto space-y-2">
            {[
              { key: 'GA_PROPERTY_ID', hint: 'Numeric ID from GA4 Admin → Property Settings' },
              { key: 'GA_SERVICE_ACCOUNT_EMAIL', hint: 'Service account email (xxxx@xxxx.iam.gserviceaccount.com)' },
              { key: 'GA_SERVICE_ACCOUNT_PRIVATE_KEY', hint: 'Private key from service account JSON (paste full -----BEGIN PRIVATE KEY----- block)' },
            ].map(({ key, hint }) => (
              <div key={key} className="bg-offWhite p-3">
                <code className="font-nav text-[12px] text-red tracking-[1px]">{key}</code>
                <p className="font-body text-[12px] text-text-muted mt-0.5">{hint}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="pt-10 pb-20 px-10 max-w-[900px] mx-auto text-center">
        <p className="font-nav text-[13px] tracking-[2px] uppercase text-red">
          Failed to load analytics. Check that your service account has access to the GA4 property.
        </p>
      </div>
    )
  }

  const sortedProducts = [...data.products].sort((a, b) =>
    productSort === 'desc' ? b.views - a.views : a.views - b.views
  )

  const sortedPages = [...data.pages].sort((a, b) =>
    pageSort === 'desc' ? b.views - a.views : a.views - b.views
  )

  return (
    <div className="pt-10 pb-20 px-6 sm:px-10 max-w-[1100px] mx-auto">
      <h1 className="font-display text-[48px] text-text mb-1 text-center">
        Site <span className="text-red">Analytics</span>
      </h1>
      <p className="text-center font-nav text-[11px] tracking-[2px] uppercase text-text-muted mb-10">
        Last 30 days · Google Analytics
      </p>

      {/* ── Visitor summary cards ── */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Today', value: data.summary.daily, icon: Users },
          { label: 'This Week', value: data.summary.weekly, icon: Calendar },
          { label: 'This Month', value: data.summary.monthly, icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white border border-border-light p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-nav text-[11px] tracking-[2px] uppercase text-text-muted">
                {label}
              </span>
              <Icon className="w-4 h-4 text-text-muted" />
            </div>
            <p className="font-display text-[42px] leading-none text-text">
              {value.toLocaleString()}
            </p>
            <p className="font-nav text-[10px] tracking-[1.5px] uppercase text-text-muted mt-1">
              Active Visitors
            </p>
          </div>
        ))}
      </div>

      {/* ── Product page views ── */}
      <div className="bg-white border border-border-light mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
          <div>
            <h2 className="font-nav text-[14px] tracking-[2px] uppercase text-text">
              Product Page Views
            </h2>
            <p className="font-body text-[12px] text-text-muted mt-0.5">Last 30 days</p>
          </div>
          <button
            onClick={() => setProductSort((s) => (s === 'desc' ? 'asc' : 'desc'))}
            className="flex items-center gap-1.5 font-nav text-[11px] tracking-[1.5px] uppercase text-text-muted hover:text-red transition-colors border border-border py-1.5 px-3"
          >
            {productSort === 'desc' ? (
              <>
                <ArrowDown className="w-3 h-3" /> High to Low
              </>
            ) : (
              <>
                <ArrowUp className="w-3 h-3" /> Low to High
              </>
            )}
          </button>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="py-10 text-center font-nav text-[12px] tracking-[2px] uppercase text-text-muted">
            No product views recorded yet
          </div>
        ) : (
          <div className="divide-y divide-border-light">
            {sortedProducts.map((product, i) => (
              <div
                key={product.handle}
                className="flex items-center justify-between px-5 py-3 hover:bg-offWhite transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-nav text-[11px] tracking-[1px] text-text-muted w-6 shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-nav text-[13px] tracking-[1px] uppercase text-text truncate">
                      {product.title}
                    </p>
                    <a
                      href={`/products/${product.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[11px] text-text-muted hover:text-red transition-colors flex items-center gap-1"
                    >
                      /products/{product.handle}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className="font-display text-[22px] text-red">
                    {product.views.toLocaleString()}
                  </span>
                  <p className="font-nav text-[9px] tracking-[1px] uppercase text-text-muted">
                    views
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── All page views ── */}
      <div className="bg-white border border-border-light">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
          <div>
            <h2 className="font-nav text-[14px] tracking-[2px] uppercase text-text">
              All Page Views
            </h2>
            <p className="font-body text-[12px] text-text-muted mt-0.5">Last 30 days · Top 100</p>
          </div>
          <button
            onClick={() => setPageSort((s) => (s === 'desc' ? 'asc' : 'desc'))}
            className="flex items-center gap-1.5 font-nav text-[11px] tracking-[1.5px] uppercase text-text-muted hover:text-red transition-colors border border-border py-1.5 px-3"
          >
            <ArrowUpDown className="w-3 h-3" />
            {pageSort === 'desc' ? 'High to Low' : 'Low to High'}
          </button>
        </div>

        <div className="divide-y divide-border-light">
          {sortedPages.map((page, i) => (
            <div
              key={page.path}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-offWhite transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-nav text-[11px] tracking-[1px] text-text-muted w-6 shrink-0">
                  {i + 1}
                </span>
                <span className="font-body text-[13px] text-text truncate">{page.path}</span>
              </div>
              <span className="font-display text-[20px] text-text shrink-0 ml-4">
                {page.views.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

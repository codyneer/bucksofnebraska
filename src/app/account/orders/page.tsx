'use client'

import Link from 'next/link'
import { ArrowLeft, Package, ChevronRight } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ProtectedRoute } from '@/components/account/ProtectedRoute'

function formatPrice(amount: string) {
  return `$${parseFloat(amount).toFixed(2)}`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const statusColors: Record<string, string> = {
  FULFILLED: 'bg-green text-white',
  UNFULFILLED: 'bg-gold text-white',
  PARTIALLY_FULFILLED: 'bg-[#E67E22] text-white',
  IN_PROGRESS: 'bg-[#3498DB] text-white',
}

const statusLabels: Record<string, string> = {
  FULFILLED: 'Fulfilled',
  UNFULFILLED: 'Processing',
  PARTIALLY_FULFILLED: 'Partial',
  IN_PROGRESS: 'In Progress',
}

function OrderHistoryContent() {
  const { customer } = useAuth()

  if (!customer) return null

  const orders = customer.orders.edges.map((e) => e.node)

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[800px] mx-auto">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 font-nav text-[12px] tracking-[2px] uppercase text-text-muted hover:text-red transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Account
      </Link>

      <div className="mb-10">
        <h1 className="font-display text-[clamp(36px,6vw,52px)] text-text leading-none">
          Order <span className="text-red">History</span>
        </h1>
        <p className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted mt-2">
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-border-light p-8 text-center">
          <Package className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <h3 className="font-nav text-[14px] tracking-[2px] uppercase text-text mb-2">
            No Orders Yet
          </h3>
          <p className="font-body text-[14px] text-text-light mb-4">
            Your order history will appear here once you place your first order.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-red text-white font-nav text-[12px] tracking-[2px] uppercase py-3 px-6 transition-colors hover:bg-red-dark"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const itemCount = order.lineItems.edges.reduce((sum, e) => sum + e.node.quantity, 0)
            const hasTracking = order.successfulFulfillments.length > 0

            return (
              <Link
                key={order.id}
                href={`/account/orders/${encodeURIComponent(order.id)}`}
                className="block bg-white border border-border-light p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:border-red group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-nav text-[14px] tracking-[1px] uppercase text-text">
                        {order.name}
                      </span>
                      <span className={`font-nav text-[10px] tracking-[1.5px] uppercase py-0.5 px-2.5 ${statusColors[order.fulfillmentStatus] || 'bg-text-muted text-white'}`}>
                        {statusLabels[order.fulfillmentStatus] || order.fulfillmentStatus}
                      </span>
                      {hasTracking && (
                        <span className="font-nav text-[10px] tracking-[1px] text-green">
                          Tracking Available
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-nav text-[11px] tracking-[1px] text-text-muted">
                        {formatDate(order.processedAt)}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="font-nav text-[11px] tracking-[1px] text-text-muted">
                        {itemCount} item{itemCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[20px] text-red">
                      {formatPrice(order.currentTotalPrice.amount)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-red transition-colors" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function OrderHistoryPage() {
  return (
    <ProtectedRoute>
      <OrderHistoryContent />
    </ProtectedRoute>
  )
}

'use client'

import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Truck, MapPin, ExternalLink } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ProtectedRoute } from '@/components/account/ProtectedRoute'

type Props = {
  params: Promise<{ id: string }>
}

function formatPrice(amount: string) {
  return `$${parseFloat(amount).toFixed(2)}`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
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
  PARTIALLY_FULFILLED: 'Partially Fulfilled',
  IN_PROGRESS: 'In Progress',
}

function OrderDetailContent({ orderId }: { orderId: string }) {
  const { customer } = useAuth()

  if (!customer) return null

  const decodedId = decodeURIComponent(orderId)
  const order = customer.orders.edges.find((e) => e.node.id === decodedId)?.node

  if (!order) {
    return (
      <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[800px] mx-auto text-center">
        <h1 className="font-display text-[36px] text-text mb-4">Order Not Found</h1>
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 font-nav text-[12px] tracking-[2px] uppercase text-red hover:text-red-dark transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Orders
        </Link>
      </div>
    )
  }

  const lineItems = order.lineItems.edges.map((e) => e.node)
  const fulfillments = order.successfulFulfillments
  const shippingAddress = order.shippingAddress

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[800px] mx-auto">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-2 font-nav text-[12px] tracking-[2px] uppercase text-text-muted hover:text-red transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Orders
      </Link>

      {/* Order header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="font-display text-[clamp(32px,5vw,44px)] text-text leading-none">
            {order.name}
          </h1>
          <p className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted mt-1">
            {formatDate(order.processedAt)}
          </p>
        </div>
        <span className={`font-nav text-[11px] tracking-[1.5px] uppercase py-1 px-3 self-start ${statusColors[order.fulfillmentStatus] || 'bg-text-muted text-white'}`}>
          {statusLabels[order.fulfillmentStatus] || order.fulfillmentStatus}
        </span>
      </div>

      {/* Tracking info */}
      {fulfillments.length > 0 && (
        <div className="bg-white border border-border-light p-5 sm:p-6 mb-6">
          <h2 className="font-nav text-[13px] tracking-[2px] uppercase text-text mb-4 flex items-center gap-2">
            <Truck className="w-4 h-4 text-red" />
            Tracking Information
          </h2>
          {fulfillments.map((fulfillment, i) => (
            <div key={i} className="space-y-2">
              {fulfillment.trackingInfo.map((tracking, j) => (
                <div key={j} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  {fulfillment.trackingCompany && (
                    <span className="font-nav text-[12px] tracking-[1px] text-text-muted">
                      {fulfillment.trackingCompany}
                    </span>
                  )}
                  {tracking.number && (
                    <span className="font-body text-[14px] text-text font-semibold">
                      {tracking.number}
                    </span>
                  )}
                  {tracking.url && (
                    <a
                      href={tracking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-nav text-[11px] tracking-[2px] uppercase text-red hover:text-red-dark transition-colors"
                    >
                      Track Package
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Line items */}
      <div className="bg-white border border-border-light mb-6">
        <h2 className="font-nav text-[13px] tracking-[2px] uppercase text-text p-5 sm:p-6 pb-0">
          Items
        </h2>
        <div className="divide-y divide-border-light">
          {lineItems.map((item, i) => (
            <div key={i} className="p-5 sm:p-6 flex gap-4">
              {item.variant?.image ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-offWhite shrink-0 relative overflow-hidden">
                  <Image
                    src={item.variant.image.url}
                    alt={item.variant.image.altText || item.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-offWhite shrink-0 flex items-center justify-center">
                  <span className="font-display text-[20px] text-text-muted/20">BN</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-nav text-[13px] tracking-[0.5px] uppercase text-text leading-snug">
                  {item.title}
                </h3>
                {item.variant?.title && item.variant.title !== 'Default Title' && (
                  <p className="font-nav text-[11px] tracking-[1px] text-text-muted mt-0.5">
                    {item.variant.title}
                  </p>
                )}
                <p className="font-nav text-[11px] tracking-[1px] text-text-muted mt-1">
                  Qty: {item.quantity}
                </p>
              </div>
              <div className="shrink-0">
                <span className="font-display text-[18px] text-text">
                  {item.variant ? formatPrice(item.variant.price.amount) : '—'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order summary + shipping address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Order totals */}
        <div className="bg-white border border-border-light p-5 sm:p-6">
          <h2 className="font-nav text-[13px] tracking-[2px] uppercase text-text mb-4">
            Order Summary
          </h2>
          <div className="space-y-2">
            {order.subtotalPrice && (
              <div className="flex justify-between">
                <span className="font-body text-[14px] text-text-light">Subtotal</span>
                <span className="font-body text-[14px] text-text">{formatPrice(order.subtotalPrice.amount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-body text-[14px] text-text-light">Shipping</span>
              <span className="font-body text-[14px] text-text">{formatPrice(order.totalShippingPrice.amount)}</span>
            </div>
            {order.totalTax && (
              <div className="flex justify-between">
                <span className="font-body text-[14px] text-text-light">Tax</span>
                <span className="font-body text-[14px] text-text">{formatPrice(order.totalTax.amount)}</span>
              </div>
            )}
            <div className="pt-2 mt-2 border-t border-border-light flex justify-between">
              <span className="font-nav text-[13px] tracking-[1px] uppercase text-text">Total</span>
              <span className="font-display text-[22px] text-red">{formatPrice(order.currentTotalPrice.amount)}</span>
            </div>
          </div>
        </div>

        {/* Shipping address */}
        {shippingAddress && (
          <div className="bg-white border border-border-light p-5 sm:p-6">
            <h2 className="font-nav text-[13px] tracking-[2px] uppercase text-text mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red" />
              Shipping Address
            </h2>
            <div className="font-body text-[14px] text-text-light leading-relaxed">
              <p className="text-text font-semibold">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              {shippingAddress.company && <p>{shippingAddress.company}</p>}
              <p>{shippingAddress.address1}</p>
              {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
              <p>
                {shippingAddress.city}, {shippingAddress.province} {shippingAddress.zip}
              </p>
              <p>{shippingAddress.country}</p>
              {shippingAddress.phone && <p className="mt-1">{shippingAddress.phone}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function OrderDetailPage({ params }: Props) {
  const { id } = use(params)

  return (
    <ProtectedRoute>
      <OrderDetailContent orderId={id} />
    </ProtectedRoute>
  )
}

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Package, User, CreditCard, LogOut, ChevronRight, ExternalLink } from 'lucide-react'
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

function AccountDashboard() {
  const { customer, logout } = useAuth()
  const router = useRouter()

  if (!customer) return null

  const orders = customer.orders.edges.map((e) => e.node)
  const recentOrders = orders.slice(0, 3)
  const memberSince = new Date(customer.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[800px] mx-auto">
      {/* Welcome header */}
      <div className="mb-10">
        <h1 className="font-display text-[clamp(36px,6vw,52px)] text-text leading-none">
          Welcome back, <span className="text-red">{customer.firstName || 'Hunter'}</span>
        </h1>
        <p className="font-nav text-[12px] tracking-[2px] uppercase text-text-muted mt-2">
          Member since {memberSince} &bull; {customer.numberOfOrders} order{customer.numberOfOrders !== '1' ? 's' : ''}
        </p>
      </div>

      {/* Navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <Link
          href="/account/orders"
          className="bg-white border border-border-light p-5 sm:p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:border-red group"
        >
          <div className="w-12 h-12 bg-red/[0.06] border border-red/20 flex items-center justify-center shrink-0 group-hover:bg-red group-hover:border-red transition-all">
            <Package className="w-5 h-5 text-red group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-nav text-[14px] tracking-[1.5px] uppercase text-text">
              Order History
            </h3>
            <p className="font-body text-[13px] text-text-muted mt-0.5">
              View orders, tracking, and details
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-red transition-colors shrink-0" />
        </Link>

        <Link
          href="/account/profile"
          className="bg-white border border-border-light p-5 sm:p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:border-red group"
        >
          <div className="w-12 h-12 bg-red/[0.06] border border-red/20 flex items-center justify-center shrink-0 group-hover:bg-red group-hover:border-red transition-all">
            <User className="w-5 h-5 text-red group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-nav text-[14px] tracking-[1.5px] uppercase text-text">
              Profile & Addresses
            </h3>
            <p className="font-body text-[13px] text-text-muted mt-0.5">
              Update your info and shipping addresses
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-red transition-colors shrink-0" />
        </Link>

        <a
          href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-border-light p-5 sm:p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:border-red group"
        >
          <div className="w-12 h-12 bg-red/[0.06] border border-red/20 flex items-center justify-center shrink-0 group-hover:bg-red group-hover:border-red transition-all">
            <CreditCard className="w-5 h-5 text-red group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-nav text-[14px] tracking-[1.5px] uppercase text-text">
              Subscriptions
            </h3>
            <p className="font-body text-[13px] text-text-muted mt-0.5">
              Manage active subscriptions
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-red transition-colors shrink-0" />
        </a>

        <button
          onClick={handleLogout}
          className="bg-white border border-border-light p-5 sm:p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:border-red group text-left cursor-pointer"
        >
          <div className="w-12 h-12 bg-red/[0.06] border border-red/20 flex items-center justify-center shrink-0 group-hover:bg-red group-hover:border-red transition-all">
            <LogOut className="w-5 h-5 text-red group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-nav text-[14px] tracking-[1.5px] uppercase text-text">
              Sign Out
            </h3>
            <p className="font-body text-[13px] text-text-muted mt-0.5">
              Log out of your account
            </p>
          </div>
        </button>
      </div>

      {/* Recent orders */}
      {recentOrders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-[24px] text-text">Recent Orders</h2>
            <Link
              href="/account/orders"
              className="font-nav text-[11px] tracking-[2px] uppercase text-red hover:text-red-dark transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${encodeURIComponent(order.id)}`}
                className="block bg-white border border-border-light p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:border-red group"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-nav text-[14px] tracking-[1px] uppercase text-text">
                      {order.name}
                    </span>
                    <span className={`font-nav text-[10px] tracking-[1.5px] uppercase py-0.5 px-2.5 ${statusColors[order.fulfillmentStatus] || 'bg-text-muted text-white'}`}>
                      {statusLabels[order.fulfillmentStatus] || order.fulfillmentStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-nav text-[11px] tracking-[1px] text-text-muted">
                      {formatDate(order.processedAt)}
                    </span>
                    <span className="font-display text-[18px] text-red">
                      {formatPrice(order.currentTotalPrice.amount)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-red transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {orders.length === 0 && (
        <div className="bg-white border border-border-light p-8 text-center">
          <Package className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <h3 className="font-nav text-[14px] tracking-[2px] uppercase text-text mb-2">
            No Orders Yet
          </h3>
          <p className="font-body text-[14px] text-text-light mb-4">
            Time to gear up. Check out what we&apos;ve got.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-red text-white font-nav text-[12px] tracking-[2px] uppercase py-3 px-6 transition-colors hover:bg-red-dark"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  )
}

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <AccountDashboard />
    </ProtectedRoute>
  )
}

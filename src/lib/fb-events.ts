'use client'

// ─── Client-side FB Pixel event helpers ─────────────────────────────────────
// These fire the browser-side pixel AND send to our CAPI endpoint for
// server-side deduplication. Both use the same event_id so Meta deduplicates.

function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

function getFbp(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/_fbp=([^;]+)/)
  return match ? match[1] : null
}

function getFbc(): string | null {
  if (typeof document === 'undefined') return null
  // Check URL for fbclid first
  const url = new URL(window.location.href)
  const fbclid = url.searchParams.get('fbclid')
  if (fbclid) {
    return `fb.1.${Date.now()}.${fbclid}`
  }
  // Fall back to cookie
  const match = document.cookie.match(/_fbc=([^;]+)/)
  return match ? match[1] : null
}

async function sendServerEvent(
  eventName: string,
  eventId: string,
  customData?: Record<string, unknown>
) {
  try {
    await fetch('/api/fb-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventId,
        sourceUrl: window.location.href,
        fbp: getFbp(),
        fbc: getFbc(),
        ...customData,
      }),
    })
  } catch {
    // Silently fail — don't break the user experience
  }
}

// ─── Public event functions ─────────────────────────────────────────────────

export function trackViewContent(params: {
  contentName: string
  contentId: string
  contentType: string
  value: number
  currency?: string
}) {
  const eventId = generateEventId()
  const { contentName, contentId, contentType, value, currency = 'USD' } = params

  // Client-side pixel
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_ids: [contentId],
      content_type: contentType,
      value,
      currency,
    }, { eventID: eventId })
  }

  // Server-side CAPI
  sendServerEvent('ViewContent', eventId, {
    contentName,
    contentIds: [contentId],
    contentType,
    value,
    currency,
  })
}

export function trackAddToCart(params: {
  contentName: string
  contentId: string
  contentType: string
  value: number
  currency?: string
  quantity?: number
}) {
  const eventId = generateEventId()
  const { contentName, contentId, contentType, value, currency = 'USD', quantity = 1 } = params

  // Client-side pixel
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'AddToCart', {
      content_name: contentName,
      content_ids: [contentId],
      content_type: contentType,
      value,
      currency,
      num_items: quantity,
    }, { eventID: eventId })
  }

  // Server-side CAPI
  sendServerEvent('AddToCart', eventId, {
    contentName,
    contentIds: [contentId],
    contentType,
    value,
    currency,
    quantity,
  })
}

export function trackInitiateCheckout(params: {
  contentIds: string[]
  value: number
  numItems: number
  currency?: string
}) {
  const eventId = generateEventId()
  const { contentIds, value, numItems, currency = 'USD' } = params

  // Client-side pixel
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: contentIds,
      value,
      currency,
      num_items: numItems,
    }, { eventID: eventId })
  }

  // Server-side CAPI
  sendServerEvent('InitiateCheckout', eventId, {
    contentIds,
    value,
    currency,
    numItems,
  })
}

export function trackSearch(searchString: string) {
  const eventId = generateEventId()

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Search', {
      search_string: searchString,
    }, { eventID: eventId })
  }

  sendServerEvent('Search', eventId, { searchString })
}

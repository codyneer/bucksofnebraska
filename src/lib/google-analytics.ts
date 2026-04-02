import { createSign, createPrivateKey } from 'crypto'

// --------------- JWT Auth ---------------

function base64url(input: Buffer): string {
  return input.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

/**
 * Decode the private key from base64 (stored in Vercel as a single clean string).
 * Falls back to raw PEM normalization for backwards compatibility.
 */
function normalizePrivateKey(raw: string): string {
  const trimmed = raw.trim()
  // If it doesn't start with -----BEGIN, assume it's base64-encoded PEM
  if (!trimmed.startsWith('-----')) {
    return Buffer.from(trimmed, 'base64').toString('utf-8')
  }
  // Legacy: raw PEM with escaped or actual newlines
  let key = trimmed.includes('\\n') ? trimmed.replace(/\\n/g, '\n') : trimmed
  key = key.replace(/\r/g, '')
  const lines = key.split('\n').filter((l) => l.trim().length > 0)
  return lines.join('\n') + '\n'
}

function createJWT(email: string, rawKey: string): string {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })))
  const payload = base64url(
    Buffer.from(
      JSON.stringify({
        iss: email,
        sub: email,
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
      })
    )
  )
  const message = `${header}.${payload}`
  const sign = createSign('RSA-SHA256')
  sign.update(message)
  // Use createPrivateKey for robust PEM parsing
  const keyObject = createPrivateKey({ key: normalizePrivateKey(rawKey), format: 'pem' })
  const sig = sign.sign(keyObject)
  return `${message}.${base64url(sig)}`
}

async function getAccessToken(): Promise<string> {
  const email = process.env.GA_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GA_SERVICE_ACCOUNT_PRIVATE_KEY
  if (!email || !rawKey) throw new Error('GA credentials not configured')

  const jwt = createJWT(email, rawKey)

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth2:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GA token error: ${err}`)
  }

  const data = await res.json()
  return data.access_token
}

// --------------- Types ---------------

export type AnalyticsSummary = {
  daily: number
  weekly: number
  monthly: number
}

export type PageView = {
  path: string
  views: number
}

export type ProductView = {
  handle: string
  title: string
  views: number
}

export type AnalyticsData = {
  summary: AnalyticsSummary
  pages: PageView[]
  products: ProductView[]
}

// --------------- API calls ---------------

export async function getAnalyticsData(): Promise<AnalyticsData> {
  const propertyId = process.env.GA_PROPERTY_ID
  if (!propertyId) throw new Error('GA_PROPERTY_ID not configured')

  const token = await getAccessToken()
  const base = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  // Fetch both reports in parallel
  const [summaryRes, pagesRes] = await Promise.all([
    fetch(base, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dateRanges: [
          { startDate: 'today', endDate: 'today', name: 'daily' },
          { startDate: '7daysAgo', endDate: 'today', name: 'weekly' },
          { startDate: '30daysAgo', endDate: 'today', name: 'monthly' },
        ],
        dimensions: [{ name: 'dateRange' }],
        metrics: [{ name: 'activeUsers' }],
      }),
    }),
    fetch(base, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 100,
      }),
    }),
  ])

  if (!summaryRes.ok || !pagesRes.ok) {
    throw new Error('GA API request failed')
  }

  const [summaryData, pagesData] = await Promise.all([summaryRes.json(), pagesRes.json()])

  // Parse summary — rows keyed by dateRange name
  const summaryMap: Record<string, number> = {}
  for (const row of summaryData.rows ?? []) {
    const name: string = row.dimensionValues[0].value
    summaryMap[name] = parseInt(row.metricValues[0].value ?? '0', 10)
  }

  // Parse pages
  const pages: PageView[] = (pagesData.rows ?? []).map(
    (row: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => ({
      path: row.dimensionValues[0].value,
      views: parseInt(row.metricValues[0].value ?? '0', 10),
    })
  )

  // Extract product pages and format title from handle
  const products: ProductView[] = pages
    .filter((p) => p.path.startsWith('/products/'))
    .map((p) => {
      const handle = p.path.replace('/products/', '').replace(/[?#].*/, '').replace(/\/$/, '')
      const title = handle
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      return { handle, title, views: p.views }
    })
    .filter((p) => p.handle.length > 0)

  return {
    summary: {
      daily: summaryMap['daily'] ?? 0,
      weekly: summaryMap['weekly'] ?? 0,
      monthly: summaryMap['monthly'] ?? 0,
    },
    pages,
    products,
  }
}

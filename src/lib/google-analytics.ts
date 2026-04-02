import { JWT } from 'google-auth-library'

// --------------- Auth ---------------

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

async function getAccessToken(): Promise<string> {
  const email = process.env.GA_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GA_SERVICE_ACCOUNT_PRIVATE_KEY
  if (!email || !rawKey) throw new Error('GA credentials not configured')

  const auth = new JWT({
    email,
    key: normalizePrivateKey(rawKey),
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  })

  const tokenResponse = await auth.getAccessToken()
  if (!tokenResponse.token) throw new Error('Failed to obtain GA access token')
  return tokenResponse.token
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
    const errText = await (summaryRes.ok ? pagesRes : summaryRes).text()
    throw new Error(`GA API request failed: ${errText}`)
  }

  const [summaryData, pagesData] = await Promise.all([summaryRes.json(), pagesRes.json()])

  // Parse summary — rows keyed by dateRange name
  const summaryMap: Record<string, number> = {}
  for (const row of summaryData.rows ?? []) {
    const name: string = row.dimensionValues[0].value
    summaryMap[name] = parseInt(row.metricValues[0].value ?? '0', 10)
  }

  // Parse pages — filter out Next.js internal paths and .js artifacts
  const pages: PageView[] = (pagesData.rows ?? [])
    .map((row: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => ({
      path: row.dimensionValues[0].value,
      views: parseInt(row.metricValues[0].value ?? '0', 10),
    }))
    .filter(
      (p: PageView) =>
        !p.path.endsWith('.js') &&
        !p.path.endsWith('.json') &&
        !p.path.startsWith('/_next') &&
        !p.path.startsWith('/api/')
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

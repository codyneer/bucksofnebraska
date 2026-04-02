import { NextResponse } from 'next/server'
import { getAnalyticsData } from '@/lib/google-analytics'

export const runtime = 'nodejs'

export async function GET() {
  const gaConfigured =
    process.env.GA_PROPERTY_ID &&
    process.env.GA_SERVICE_ACCOUNT_EMAIL &&
    process.env.GA_SERVICE_ACCOUNT_PRIVATE_KEY

  if (!gaConfigured) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  try {
    const data = await getAnalyticsData()
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'private, max-age=300' }, // cache 5min
    })
  } catch (err) {
    console.error('GA analytics error:', err)
    return NextResponse.json({ error: 'fetch_failed', message: String(err) }, { status: 500 })
  }
}

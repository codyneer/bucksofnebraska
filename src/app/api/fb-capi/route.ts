import { NextRequest, NextResponse } from 'next/server'

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID
const FB_CAPI_TOKEN = process.env.FB_CAPI_ACCESS_TOKEN
const FB_API_VERSION = 'v21.0'

export async function POST(request: NextRequest) {
  if (!FB_PIXEL_ID || !FB_CAPI_TOKEN) {
    // Return 200 silently so client doesn't log errors
    return NextResponse.json({ success: false, reason: 'not configured' })
  }

  try {
    const body = await request.json()
    const {
      eventName,
      eventId,
      sourceUrl,
      fbp,
      fbc,
      contentName,
      contentIds,
      contentType,
      value,
      currency = 'USD',
      quantity,
      numItems,
      searchString,
    } = body

    // Get user IP and user agent for better matching
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || ''
    const userAgent = request.headers.get('user-agent') || ''

    // Build user_data for matching
    const userData: Record<string, unknown> = {
      client_ip_address: ip,
      client_user_agent: userAgent,
    }
    if (fbp) userData.fbp = fbp
    if (fbc) userData.fbc = fbc

    // Build custom_data based on event type
    const customData: Record<string, unknown> = {}
    if (contentIds) customData.content_ids = contentIds
    if (contentType) customData.content_type = contentType
    if (contentName) customData.content_name = contentName
    if (value !== undefined) customData.value = value
    if (currency) customData.currency = currency
    if (quantity) customData.num_items = quantity
    if (numItems) customData.num_items = numItems
    if (searchString) customData.search_string = searchString

    const eventData = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: sourceUrl,
          action_source: 'website',
          user_data: userData,
          custom_data: customData,
        },
      ],
    }

    // Send to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${FB_PIXEL_ID}/events?access_token=${FB_CAPI_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('FB CAPI error:', result)
      return NextResponse.json({ error: 'CAPI request failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true, events_received: result.events_received })
  } catch (error) {
    console.error('FB CAPI error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

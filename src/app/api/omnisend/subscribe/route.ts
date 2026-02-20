import { NextRequest, NextResponse } from 'next/server'

const OMNISEND_API_KEY = process.env.OMNISEND_API_KEY

export async function POST(request: NextRequest) {
  if (!OMNISEND_API_KEY) {
    return NextResponse.json(
      { error: 'Omnisend API key not configured' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { email, firstName, lastName, tags } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Build Omnisend contact payload
    const contactPayload: Record<string, unknown> = {
      identifiers: [
        {
          type: 'email',
          id: email.toLowerCase().trim(),
          channels: {
            email: {
              status: 'subscribed',
              statusDate: new Date().toISOString(),
            },
          },
        },
      ],
      tags: tags || ['website-signup'],
    }

    if (firstName) contactPayload.firstName = firstName
    if (lastName) contactPayload.lastName = lastName

    // Send to Omnisend Contacts API
    const response = await fetch('https://api.omnisend.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': OMNISEND_API_KEY,
      },
      body: JSON.stringify(contactPayload),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Omnisend API error:', response.status, errorData)

      // If contact already exists, try to update instead
      if (response.status === 409) {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed',
        })
      }

      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed',
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

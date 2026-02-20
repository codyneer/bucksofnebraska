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
    const { firstName, lastName, email, subject, message } = body

    if (!email || !firstName || !message || !subject) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Create/update contact in Omnisend with contact form tags
    const contactPayload = {
      identifiers: [
        {
          type: 'email',
          id: email.toLowerCase().trim(),
          channels: {
            email: {
              status: 'nonSubscribed',
              statusDate: new Date().toISOString(),
            },
          },
        },
      ],
      firstName,
      lastName: lastName || '',
      tags: ['contact-form', `contact-${subject}`],
      customProperties: {
        contact_subject: subject,
        contact_message: message,
        contact_date: new Date().toISOString(),
      },
    }

    const contactRes = await fetch('https://api.omnisend.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': OMNISEND_API_KEY,
      },
      body: JSON.stringify(contactPayload),
    })

    // 409 = contact already exists, that's fine
    if (!contactRes.ok && contactRes.status !== 409) {
      const errorData = await contactRes.text()
      console.error('Omnisend contact error:', contactRes.status, errorData)
    }

    // Also fire a custom event so you can trigger an automation in Omnisend
    const eventPayload = {
      email: email.toLowerCase().trim(),
      eventID: 'contact_form_submitted',
      fields: {
        firstName,
        lastName: lastName || '',
        subject,
        message,
        submittedAt: new Date().toISOString(),
      },
    }

    const eventRes = await fetch('https://api.omnisend.com/v3/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': OMNISEND_API_KEY,
      },
      body: JSON.stringify(eventPayload),
    })

    if (!eventRes.ok) {
      const errorData = await eventRes.text()
      console.error('Omnisend event error:', eventRes.status, errorData)
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

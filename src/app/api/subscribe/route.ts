import { NextRequest, NextResponse } from 'next/server'
import { shopifyAdminFetch } from '@/lib/shopify-admin'

const OMNISEND_API_KEY = process.env.OMNISEND_API_KEY

const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const data = await shopifyAdminFetch<{
      customerCreate: {
        customer: { id: string; email: string } | null
        userErrors: { field: string[]; message: string }[]
      }
    }>({
      query: CUSTOMER_CREATE,
      variables: {
        input: {
          email: email.toLowerCase().trim(),
          emailMarketingConsent: {
            marketingOptInLevel: 'SINGLE_OPT_IN',
            marketingState: 'SUBSCRIBED',
            consentUpdatedAt: new Date().toISOString(),
          },
          tags: ['buck-alerts', 'website-signup'],
        },
      },
    })

    const { customerCreate } = data

    // If email already exists, that's fine — still a success
    if (customerCreate.userErrors.length > 0) {
      const alreadyExists = customerCreate.userErrors.some(
        (e) => e.message.toLowerCase().includes('has already been taken')
      )
      if (alreadyExists) {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed',
        })
      }
      console.error('Shopify customer create errors:', customerCreate.userErrors)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    // Also subscribe to Omnisend (fire and forget — don't block on failure)
    if (OMNISEND_API_KEY) {
      fetch('https://api.omnisend.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': OMNISEND_API_KEY,
        },
        body: JSON.stringify({
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
          tags: ['buck-alerts', 'website-signup'],
        }),
      }).catch((err) => console.error('Omnisend subscribe error:', err))
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

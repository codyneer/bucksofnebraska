import { NextRequest, NextResponse } from 'next/server'
import {
  getReferrals,
  findReferralByEmail,
  generateReferralCode,
  createReferralDiscount,
  addReferral,
} from '@/lib/referrals'

const OMNISEND_API_KEY = process.env.OMNISEND_API_KEY
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bucksofnebraska.vercel.app'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Idempotent: if this email already has a code, return it
    const existing = await findReferralByEmail(normalizedEmail)
    if (existing) {
      const link = `${SITE_URL}/ref/${existing.code}`
      return NextResponse.json({
        success: true,
        code: existing.code,
        link,
        existing: true,
      })
    }

    // Generate unique code
    const allReferrals = await getReferrals()
    const existingCodes = allReferrals.map((r) => r.code)
    const code = generateReferralCode(normalizedEmail, existingCodes)

    // Create Shopify discount code
    const discount = await createReferralDiscount(code)
    if (!discount) {
      return NextResponse.json(
        { error: 'Failed to create discount code. Please try again.' },
        { status: 500 }
      )
    }

    // Store referral mapping
    const referral = {
      code,
      email: normalizedEmail,
      discount_code_id: discount.id,
      discount_code: discount.code,
      created_at: new Date().toISOString(),
      friends_purchased: 0,
      credit_earned: 0,
    }

    const saved = await addReferral(referral)
    if (!saved) {
      console.error('Failed to save referral mapping, but discount was created')
    }

    // Fire Omnisend event (best-effort, don't block on failure)
    if (OMNISEND_API_KEY) {
      try {
        // Create/update contact with referral tags
        await fetch('https://api.omnisend.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': OMNISEND_API_KEY,
          },
          body: JSON.stringify({
            identifiers: [
              {
                type: 'email',
                id: normalizedEmail,
                channels: {
                  email: {
                    status: 'subscribed',
                    statusDate: new Date().toISOString(),
                  },
                },
              },
            ],
            tags: ['referral-signup', 'website-signup'],
            customProperties: {
              referral_code: code,
              referral_link: `${SITE_URL}/ref/${code}`,
            },
          }),
        })

        // Fire custom event for Omnisend automation
        await fetch('https://api.omnisend.com/v3/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': OMNISEND_API_KEY,
          },
          body: JSON.stringify({
            email: normalizedEmail,
            eventID: 'referral_signup',
            fields: {
              referralCode: code,
              referralLink: `${SITE_URL}/ref/${code}`,
              discountAmount: '$10',
              minimumPurchase: '$40',
              submittedAt: new Date().toISOString(),
            },
          }),
        })
      } catch (omnisendError) {
        console.error('Omnisend event failed (non-critical):', omnisendError)
      }
    }

    const link = `${SITE_URL}/ref/${code}`
    return NextResponse.json({ success: true, code, link })
  } catch (error) {
    console.error('Referral signup error:', error)
    return NextResponse.json(
      { error: 'Failed to process referral signup' },
      { status: 500 }
    )
  }
}

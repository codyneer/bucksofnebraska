import { NextRequest, NextResponse } from 'next/server'
import { findReferralByCode } from '@/lib/referrals'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.json({ valid: false, error: 'Code required' }, { status: 400 })
  }

  try {
    const referral = await findReferralByCode(code)

    if (!referral) {
      return NextResponse.json({ valid: false })
    }

    return NextResponse.json({
      valid: true,
      code: referral.code,
      discount_code: referral.discount_code,
    })
  } catch (error) {
    console.error('Referral lookup error:', error)
    return NextResponse.json({ valid: false, error: 'Lookup failed' }, { status: 500 })
  }
}

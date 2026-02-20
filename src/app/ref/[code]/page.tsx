import { findReferralByCode } from '@/lib/referrals'
import { ReferralRedirect } from './ReferralRedirect'
import Link from 'next/link'

type Props = {
  params: Promise<{ code: string }>
}

export default async function ReferralLandingPage({ params }: Props) {
  const { code } = await params

  const referral = await findReferralByCode(code)

  if (!referral) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <h1 className="font-display text-[48px] text-text mb-2">Invalid Link</h1>
          <p className="font-body text-text-light text-[15px] mb-6">
            This referral link is invalid or has expired.
          </p>
          <Link
            href="/shop"
            className="inline-block py-3 px-8 bg-red text-white font-nav text-[13px] tracking-[2px] uppercase transition-all duration-300 hover:bg-red-dark"
          >
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  return <ReferralRedirect discountCode={referral.discount_code} />
}

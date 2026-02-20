'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function ReferralRedirect({ discountCode }: { discountCode: string }) {
  const router = useRouter()

  useEffect(() => {
    localStorage.setItem('referral_discount_code', discountCode)
    router.push('/')
  }, [discountCode, router])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-nav text-[14px] tracking-[2px] uppercase text-text-muted">
          Applying your $10 discount...
        </p>
      </div>
    </div>
  )
}

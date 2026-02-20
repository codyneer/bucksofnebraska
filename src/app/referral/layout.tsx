import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referral Program — Bucks of Nebraska',
  description: 'Give $10, Get $10. Share Bucks of Nebraska with friends and earn rewards.',
}

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return children
}

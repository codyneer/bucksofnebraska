import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referral Program',
  description: 'Give $10, Get $10. Share Bucks of Nebraska with friends and earn rewards.',
  openGraph: {
    title: 'Give $10, Get $10 — Bucks of Nebraska',
    description: 'Share Bucks of Nebraska with friends and earn rewards.',
    images: [{ url: '/api/og?title=Give%20%2410%2C%20Get%20%2410&subtitle=Share%20the%20Brand.%20Earn%20Rewards.', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Give $10, Get $10 — Bucks of Nebraska',
    description: 'Share Bucks of Nebraska with friends and earn rewards.',
    images: ['/api/og?title=Give%20%2410%2C%20Get%20%2410&subtitle=Share%20the%20Brand.%20Earn%20Rewards.'],
  },
}

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return children
}

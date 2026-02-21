import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Give $10, Get $10 | Referral Program',
  description: 'Share Bucks of Nebraska with friends and earn $10 store credit. Refer a hunting buddy, they save $10 on their first order, and you earn $10 too.',
  alternates: { canonical: '/referral' },
  openGraph: {
    title: 'Give $10, Get $10 | Bucks of Nebraska Referral Program',
    description: 'Share Bucks of Nebraska with friends and earn $10 store credit. They save, you earn.',
    images: [{ url: '/api/og?title=Give%20%2410%2C%20Get%20%2410&subtitle=Refer%20a%20Friend.%20Earn%20Rewards.', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Give $10, Get $10 | Bucks of Nebraska Referral Program',
    description: 'Share Bucks of Nebraska with friends and earn $10 store credit. They save, you earn.',
    images: ['/api/og?title=Give%20%2410%2C%20Get%20%2410&subtitle=Refer%20a%20Friend.%20Earn%20Rewards.'],
  },
}

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return children
}

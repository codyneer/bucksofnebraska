import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referral — Bucks of Nebraska',
  robots: { index: false, follow: false },
}

export default function RefLayout({ children }: { children: React.ReactNode }) {
  return children
}

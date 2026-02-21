import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Write a Review',
  description: 'Share your experience with Bucks of Nebraska gear.',
  robots: { index: false, follow: false },
}

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return children
}

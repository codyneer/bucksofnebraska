import { AdminPanel } from '@/components/reviews/AdminPanel'
import { getAllPendingReviews } from '@/lib/reviews'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Review Moderation — Bucks of Nebraska',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const pendingReviews = await getAllPendingReviews()

  return <AdminPanel initialReviews={pendingReviews} />
}

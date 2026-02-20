import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Bucks of Nebraska',
  description: 'Hunting stories, gear reviews, and Nebraska outdoor life from the Bucks of Nebraska team.',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}

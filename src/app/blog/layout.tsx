import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '%s — Bucks of Nebraska',
  },
  description: 'Hunting stories, gear reviews, and Nebraska outdoor life from the Bucks of Nebraska team.',
  openGraph: {
    title: 'Blog — Bucks of Nebraska',
    description: 'Hunting stories, gear reviews, and Nebraska outdoor life.',
    images: [{ url: '/api/og?title=The%20Blog&subtitle=Hunting%20Stories%2C%20Gear%20Reviews%2C%20Nebraska%20Life', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Bucks of Nebraska',
    description: 'Hunting stories, gear reviews, and Nebraska outdoor life.',
    images: ['/api/og?title=The%20Blog&subtitle=Hunting%20Stories%2C%20Gear%20Reviews%2C%20Nebraska%20Life'],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}

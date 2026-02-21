import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Hunting Blog | Nebraska Deer Hunting Tips, Gear & Stories',
    template: '%s | Bucks of Nebraska',
  },
  description: 'Nebraska deer hunting blog. Tips, gear reviews, hunting stories, public land guides, and outdoor life from the Bucks of Nebraska team.',
  keywords: ['nebraska deer hunting', 'hunting tips', 'deer hunting gear reviews', 'nebraska hunting blog', 'whitetail hunting tips'],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Hunting Blog | Bucks of Nebraska',
    description: 'Nebraska deer hunting tips, gear reviews, hunting stories, and outdoor life.',
    images: [{ url: '/api/og?title=The%20Blog&subtitle=Nebraska%20Deer%20Hunting%20Tips%2C%20Gear%20%26%20Stories', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hunting Blog | Bucks of Nebraska',
    description: 'Nebraska deer hunting tips, gear reviews, hunting stories, and outdoor life.',
    images: ['/api/og?title=The%20Blog&subtitle=Nebraska%20Deer%20Hunting%20Tips%2C%20Gear%20%26%20Stories'],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Wild Game Recipes',
    template: '%s — Bucks of Nebraska',
  },
  description: 'Field to table wild game recipes. Venison, waterfowl, upland, and more from Bucks of Nebraska.',
  openGraph: {
    title: 'Wild Game Recipes — Bucks of Nebraska',
    description: 'Field to table wild game recipes. Venison, waterfowl, upland, and more.',
    images: [{ url: '/api/og?title=Wild%20Game%20Recipes&subtitle=Field%20to%20Table.%20The%20Way%20It%20Should%20Be.', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wild Game Recipes — Bucks of Nebraska',
    description: 'Field to table wild game recipes. Venison, waterfowl, upland, and more.',
    images: ['/api/og?title=Wild%20Game%20Recipes&subtitle=Field%20to%20Table.%20The%20Way%20It%20Should%20Be.'],
  },
}

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  return children
}

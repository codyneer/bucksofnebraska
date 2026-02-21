import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Wild Game Recipes | Venison, Waterfowl & Upland',
    template: '%s | Bucks of Nebraska',
  },
  description: 'Field to table wild game recipes from Nebraska hunters. Venison backstrap, smoked duck, pheasant, elk, and more. Easy hunting camp recipes.',
  keywords: ['wild game recipes', 'venison recipes', 'deer meat recipes', 'field to table', 'hunting recipes', 'duck recipes', 'pheasant recipes'],
  alternates: { canonical: '/recipes' },
  openGraph: {
    title: 'Wild Game Recipes | Bucks of Nebraska',
    description: 'Field to table wild game recipes. Venison, waterfowl, upland, and more from Nebraska hunters.',
    images: [{ url: '/api/og?title=Wild%20Game%20Recipes&subtitle=Field%20to%20Table.%20Venison%2C%20Waterfowl%20%26%20More.', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wild Game Recipes | Bucks of Nebraska',
    description: 'Field to table wild game recipes. Venison, waterfowl, upland, and more from Nebraska hunters.',
    images: ['/api/og?title=Wild%20Game%20Recipes&subtitle=Field%20to%20Table.%20Venison%2C%20Waterfowl%20%26%20More.'],
  },
}

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  return children
}

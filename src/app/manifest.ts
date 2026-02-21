import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bucks of Nebraska',
    short_name: 'Bucks of NE',
    description: 'Nebraska deer hunting apparel built for the field. Premium hunting shirts, hoodies, hats, and gear.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#C41E3A',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  }
}

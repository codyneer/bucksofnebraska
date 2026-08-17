import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { DeerGallery } from '@/components/sections/DeerGallery'
import { getAlbumPhotos, GALLERY_REVALIDATE_SECONDS } from '@/lib/facebook'

export const revalidate = GALLERY_REVALIDATE_SECONDS

export const metadata: Metadata = {
  title: 'The Herd | Bucks of Nebraska Deer Gallery',
  description:
    'Nebraska bucks from our community. Real deer shared by real hunters across the Cornhusker State.',
  alternates: { canonical: '/gallery' },
}

export default async function GalleryPage() {
  const photos = await getAlbumPhotos(60)

  return (
    <div className="min-h-screen bg-cream">
      <section className="py-12 sm:py-20 px-4 sm:px-10 max-w-[1300px] mx-auto">
        <SectionHeader
          title="The"
          highlight="Herd"
          subtitle="Nebraska bucks from our community — shared straight from our Facebook page"
        />

        {photos.length > 0 ? (
          <RevealOnScroll>
            <DeerGallery photos={photos} />
          </RevealOnScroll>
        ) : (
          <div className="text-center py-16">
            <p className="font-body text-text-light mb-6">
              Our deer gallery is loading up. In the meantime, see the latest bucks on our Facebook page.
            </p>
            <a
              href="https://facebook.com/bucksofnebraska"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-nav text-[14px] tracking-[3px] uppercase py-3.5 px-9 bg-red text-white transition-all duration-300 hover:bg-red-dark"
            >
              Visit Our Facebook
            </a>
          </div>
        )}
      </section>
    </div>
  )
}

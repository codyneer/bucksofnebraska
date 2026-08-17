import Image from 'next/image'
import type { GalleryPhoto } from '@/lib/facebook'

type DeerGalleryProps = {
  photos: GalleryPhoto[]
}

// Masonry gallery of deer photos pulled from the Facebook page album.
// Each photo links to its original post on Facebook (opens in a new tab).
export function DeerGallery({ photos }: DeerGalleryProps) {
  if (photos.length === 0) return null

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:_balance]">
      {photos.map((photo) => (
        <a
          key={photo.id}
          href={photo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-3 sm:mb-4 block break-inside-avoid overflow-hidden border border-border-light bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <div className="relative overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.caption || 'Bucks of Nebraska community deer photo'}
              width={photo.width}
              height={photo.height}
              unoptimized
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          {photo.caption && (
            <p className="font-body text-[12px] leading-snug text-text-light px-3 py-2.5 line-clamp-2">
              {photo.caption}
            </p>
          )}
        </a>
      ))}
    </div>
  )
}

// ─── Facebook Graph API — Page album photos ──────────────────────────────────
// Pulls photos from a Facebook Page album (the deer gallery) server-side.
// Reuses the existing Meta app (same one behind the Pixel / CAPI).
//
// Required env vars (add in .env.local + Vercel):
//   FB_ALBUM_ID            — the album to pull from (e.g. 1234567890)
//   FB_PAGE_ACCESS_TOKEN   — Page access token with `pages_read_engagement`
//                            (use a System User token so it doesn't expire)
//
// Facebook photo URLs (fbcdn) are signed and expire, so we refetch on a schedule
// via ISR (see REVALIDATE_SECONDS) and render them with next/image `unoptimized`
// so the browser hits the current signed URL directly.
// ─────────────────────────────────────────────────────────────────────────────

const FB_API_VERSION = 'v21.0'
// Defaults to the "deer" page album; override with FB_ALBUM_ID if it ever changes.
const FB_ALBUM_ID = process.env.FB_ALBUM_ID || '1160412546276308'
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN

// Refresh the album (and its expiring image URLs) every 6 hours.
export const GALLERY_REVALIDATE_SECONDS = 60 * 60 * 6

export type GalleryPhoto = {
  id: string
  src: string
  width: number
  height: number
  caption: string
  link: string // permalink to the photo on Facebook
  createdTime: string
}

type FbImage = { source: string; width: number; height: number }
type FbPhoto = {
  id: string
  name?: string
  created_time: string
  link: string
  images: FbImage[]
}

// Pick a display-sized variant (~800px wide) rather than the full-res original.
function pickImage(images: FbImage[]): FbImage | null {
  if (!images || images.length === 0) return null
  const sorted = [...images].sort((a, b) => a.width - b.width)
  return sorted.find((img) => img.width >= 720) ?? sorted[sorted.length - 1]
}

export async function getAlbumPhotos(limit = 60): Promise<GalleryPhoto[]> {
  if (!FB_ALBUM_ID || !FB_PAGE_ACCESS_TOKEN) return []

  const params = new URLSearchParams({
    fields: 'id,name,created_time,link,images',
    limit: String(limit),
    access_token: FB_PAGE_ACCESS_TOKEN,
  })
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${FB_ALBUM_ID}/photos?${params}`

  try {
    const res = await fetch(url, {
      next: { revalidate: GALLERY_REVALIDATE_SECONDS },
    })
    if (!res.ok) return []

    const json: { data?: FbPhoto[] } = await res.json()
    if (!json.data) return []

    return json.data
      .map((photo): GalleryPhoto | null => {
        const image = pickImage(photo.images)
        if (!image) return null
        return {
          id: photo.id,
          src: image.source,
          width: image.width,
          height: image.height,
          caption: photo.name ?? '',
          link: photo.link,
          createdTime: photo.created_time,
        }
      })
      .filter((p): p is GalleryPhoto => p !== null)
  } catch {
    return []
  }
}

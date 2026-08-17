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

function normalize(photo: FbPhoto): GalleryPhoto | null {
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
}

// Fetches up to `limit` photos, following Facebook's pagination cursors since a
// single request caps at ~100. The album can hold hundreds; we only pull a
// browsable slice for the page and link out to Facebook for the full archive.
export async function getAlbumPhotos(limit = 60): Promise<GalleryPhoto[]> {
  if (!FB_ALBUM_ID || !FB_PAGE_ACCESS_TOKEN) return []

  const params = new URLSearchParams({
    fields: 'id,name,created_time,link,images',
    limit: String(Math.min(limit, 100)),
    access_token: FB_PAGE_ACCESS_TOKEN,
  })
  let url: string | undefined = `https://graph.facebook.com/${FB_API_VERSION}/${FB_ALBUM_ID}/photos?${params}`

  const photos: GalleryPhoto[] = []
  try {
    while (url && photos.length < limit) {
      const res = await fetch(url, { next: { revalidate: GALLERY_REVALIDATE_SECONDS } })
      if (!res.ok) break
      const json: { data?: FbPhoto[]; paging?: { next?: string } } = await res.json()
      for (const photo of json.data ?? []) {
        const p = normalize(photo)
        if (p) photos.push(p)
      }
      url = json.paging?.next
    }
  } catch {
    // Return whatever we gathered before the error (possibly empty)
  }
  return photos.slice(0, limit)
}

// Total photo count in the album (for "see all NNN on Facebook" copy).
export async function getAlbumInfo(): Promise<{ count: number; url: string } | null> {
  if (!FB_ALBUM_ID || !FB_PAGE_ACCESS_TOKEN) return null
  try {
    const params = new URLSearchParams({ fields: 'count,link', access_token: FB_PAGE_ACCESS_TOKEN })
    const res = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${FB_ALBUM_ID}?${params}`,
      { next: { revalidate: GALLERY_REVALIDATE_SECONDS } },
    )
    if (!res.ok) return null
    const json: { count?: number; link?: string } = await res.json()
    return {
      count: json.count ?? 0,
      url: json.link ?? `https://www.facebook.com/media/set/?set=a.${FB_ALBUM_ID}`,
    }
  } catch {
    return null
  }
}

const RSS_URL = 'https://feeds.buzzsprout.com/2597239.rss'
const BUZZSPROUT_ID = '2597239'

export interface PodcastEpisode {
  id: string
  episodeNumber: number
  title: string
  summary: string
  description: string
  audioUrl: string
  artworkUrl: string
  pubDate: string
  duration: number
  buzzsproutEpisodeId: string
  playerUrl: string
}

function extractTag(xml: string, tag: string): string {
  // Handle both <tag>value</tag> and <tag><![CDATA[value]]></tag>
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`)
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`)
  const match = xml.match(regex)
  return match ? match[1] : ''
}

function parseDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  return `${m}:${s.toString().padStart(2, '0')}`
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim()
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
}

function cleanTitle(title: string): string {
  // Remove "Bucks of Nebraska Podcast Episode #X" suffix with any preceding separator
  return decodeEntities(title)
    .replace(/\s*[-–—]*\s*Bucks of Nebraska Podcast\s*(Episode\s*)?#?\d*/i, '')
    .trim()
}

function getFirstSentences(text: string, count: number = 2): string {
  const stripped = stripHtml(text)
  // Remove "Send us Fan Mail" prefix that Buzzsprout adds
  const cleaned = stripped.replace(/^Send us Fan Mail\s*/i, '')
  const sentences = cleaned.match(/[^.!?]+[.!?]+/g)
  if (!sentences) return cleaned.slice(0, 200)
  return sentences.slice(0, count).join(' ').trim()
}

export async function fetchPodcastEpisodes(): Promise<PodcastEpisode[]> {
  const res = await fetch(RSS_URL, {
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!res.ok) {
    console.error('Failed to fetch podcast RSS feed:', res.status)
    return []
  }

  const xml = await res.text()

  // Split into items
  const items = xml.split('<item>').slice(1)

  const episodes: PodcastEpisode[] = items.map((item) => {
    const titleRaw = extractTag(item, 'title')
    const epNum = parseInt(extractTag(item, 'itunes:episode') || '0', 10)
    const summaryRaw = extractTag(item, 'itunes:summary')
    const descriptionRaw = extractTag(item, 'description')
    const audioUrl = extractAttr(item, 'enclosure', 'url')
    const artworkUrl = extractAttr(item, 'itunes:image', 'href')
    const pubDate = extractTag(item, 'pubDate')
    const duration = parseInt(extractTag(item, 'itunes:duration') || '0', 10)
    const guid = extractTag(item, 'guid')

    // Extract Buzzsprout episode ID from guid like "Buzzsprout-18914814"
    const buzzsproutEpisodeId = guid.replace('Buzzsprout-', '')

    return {
      id: guid,
      episodeNumber: epNum,
      title: cleanTitle(titleRaw),
      summary: getFirstSentences(summaryRaw || descriptionRaw),
      description: descriptionRaw,
      audioUrl,
      artworkUrl,
      pubDate,
      duration,
      buzzsproutEpisodeId,
      playerUrl: `https://www.buzzsprout.com/${BUZZSPROUT_ID}/${buzzsproutEpisodeId}?client_source=small_player&iframe=true`,
    }
  })

  // Sort by episode number descending (newest first)
  return episodes.sort((a, b) => b.episodeNumber - a.episodeNumber)
}

export function formatDuration(seconds: number): string {
  return parseDuration(seconds)
}

export function formatPubDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

import Image from 'next/image'
import { Headphones, ExternalLink, Clock, Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import { fetchPodcastEpisodes, formatDuration, formatPubDate } from '@/lib/podcast'

export const metadata: Metadata = {
  title: 'Podcast | Nebraska Deer Hunting Stories & Gear Talk',
  description: 'Listen to the Bucks of Nebraska podcast. Nebraska deer hunting stories, gear reviews, whitetail strategies, and state pride from the field.',
  keywords: ['hunting podcast', 'deer hunting podcast', 'nebraska hunting podcast', 'whitetail hunting stories'],
  alternates: { canonical: '/podcast' },
  openGraph: {
    title: 'Podcast | Bucks of Nebraska',
    description: 'Nebraska deer hunting stories, gear reviews, whitetail strategies, and state pride from the field.',
    images: [{ url: '/api/og?title=The%20Podcast&subtitle=Nebraska%20Deer%20Hunting%20Stories%20%26%20Gear%20Talk', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcast | Bucks of Nebraska',
    description: 'Nebraska deer hunting stories, gear reviews, whitetail strategies, and state pride from the field.',
    images: ['/api/og?title=The%20Podcast&subtitle=Nebraska%20Deer%20Hunting%20Stories%20%26%20Gear%20Talk'],
  },
}

const PODCAST_UTM = '?utm_source=bucksofnebraska&utm_medium=podcast_page&utm_campaign=listen'

const platforms = [
  { name: 'Spotify', url: `https://open.spotify.com/search/bucks%20of%20nebraska%20podcast${PODCAST_UTM}`, color: 'bg-[#1DB954]' },
  { name: 'Apple Podcasts', url: `https://podcasts.apple.com/us/search?term=bucks+of+nebraska+podcast&utm_source=bucksofnebraska&utm_medium=podcast_page&utm_campaign=listen`, color: 'bg-[#9933CC]' },
  { name: 'YouTube', url: `https://www.youtube.com/@BucksofNebraska${PODCAST_UTM}`, color: 'bg-[#FF0000]' },
  { name: 'Amazon Music', url: `https://music.amazon.com/podcasts/00db4019-fe71-4898-b759-aa99a4af5cca/bucks-of-nebraska-podcast${PODCAST_UTM}`, color: 'bg-[#00A8E1]' },
]

export default async function PodcastPage() {
  const episodes = await fetchPodcastEpisodes()

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-10 max-w-[800px] mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-display text-[clamp(44px,7vw,64px)] text-text leading-none">
          The <span className="text-red">Podcast</span>
        </h1>

        {/* Podcast logo */}
        <div className="mt-6 mb-4 flex justify-center">
          <Image
            src="/logos/bn-podcast-logo.png"
            alt="Bucks of Nebraska Podcast"
            width={400}
            height={242}
            className="w-full max-w-[400px] h-auto"
            priority
          />
        </div>

        <p className="font-nav text-[13px] tracking-[3px] uppercase text-text-muted mt-2">
          Hunting stories, gear talk, and Nebraska pride
        </p>
      </div>

      {/* Subscribe platform buttons */}
      <div className="flex justify-center gap-3 mb-14 flex-wrap">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${p.color} text-white font-nav text-[12px] tracking-[2px] uppercase py-3 px-6 flex items-center gap-2 transition-all duration-200 hover:opacity-90 hover:-translate-y-px`}
          >
            <Headphones className="w-4 h-4" />
            {p.name}
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        ))}
      </div>

      {/* Episodes */}
      <div className="space-y-4">
        {episodes.map((ep) => (
          <div
            key={ep.id}
            className="bg-white border border-border-light overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-red group"
          >
            {/* Episode header */}
            <div className="p-4 sm:p-6 flex gap-3 sm:gap-5 items-start">
              {/* Episode artwork */}
              {ep.artworkUrl ? (
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border border-border-light">
                  <Image
                    src={ep.artworkUrl}
                    alt={ep.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-red/[0.06] border border-red/20 flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-red" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                {/* Episode number + date + duration */}
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="font-nav text-[11px] tracking-[1.5px] uppercase text-red">
                    EP {ep.episodeNumber}
                  </span>
                  <span className="flex items-center gap-1 text-text-muted text-[11px] font-nav tracking-[1px] uppercase">
                    <Calendar className="w-3 h-3" />
                    {formatPubDate(ep.pubDate)}
                  </span>
                  {ep.duration > 0 && (
                    <span className="flex items-center gap-1 text-text-muted text-[11px] font-nav tracking-[1px] uppercase">
                      <Clock className="w-3 h-3" />
                      {formatDuration(ep.duration)}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-nav text-[14px] tracking-[0.5px] uppercase text-text mb-1.5 leading-snug">
                  {ep.title}
                </h3>

                {/* Summary */}
                <p className="text-text-light text-[14px] leading-relaxed font-body">
                  {ep.summary}
                </p>

                {/* Listen on platforms hint */}
                <p className="text-text-muted text-[11px] font-nav tracking-[1.5px] uppercase mt-3">
                  Listen below or find us on Spotify, Apple, YouTube &amp; Amazon
                </p>
              </div>
            </div>

            {/* Embedded Buzzsprout player */}
            <div className="border-t border-border-light">
              <iframe
                src={ep.playerUrl}
                loading="lazy"
                width="100%"
                height="200"
                frameBorder="0"
                scrolling="no"
                title={`Play: ${ep.title}`}
              />
            </div>
          </div>
        ))}

        {episodes.length === 0 && (
          <div className="text-center py-16">
            <Headphones className="w-10 h-10 text-text-muted mx-auto mb-4" />
            <p className="font-nav text-[13px] tracking-[2px] uppercase text-text-muted">
              Episodes coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

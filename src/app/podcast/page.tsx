import Image from 'next/image'
import { Play, Headphones, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Podcast',
  description: 'The Bucks of Nebraska podcast. Hunting stories, gear talk, and Nebraska pride.',
  openGraph: {
    title: 'Podcast — Bucks of Nebraska',
    description: 'The Bucks of Nebraska podcast. Hunting stories, gear talk, and Nebraska pride.',
    images: [{ url: '/api/og?title=The%20Podcast&subtitle=Hunting%20Stories%2C%20Gear%20Talk%2C%20Nebraska%20Pride', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcast — Bucks of Nebraska',
    description: 'The Bucks of Nebraska podcast. Hunting stories, gear talk, and Nebraska pride.',
    images: ['/api/og?title=The%20Podcast&subtitle=Hunting%20Stories%2C%20Gear%20Talk%2C%20Nebraska%20Pride'],
  },
}

const platforms = [
  { name: 'Spotify', url: 'https://open.spotify.com/search/bucks%20of%20nebraska%20podcast', color: 'bg-[#1DB954]' },
  { name: 'Apple Podcasts', url: 'https://podcasts.apple.com/us/search?term=bucks+of+nebraska+podcast', color: 'bg-[#9933CC]' },
  { name: 'YouTube', url: 'https://www.youtube.com/@BucksofNebraska', color: 'bg-[#FF0000]' },
  { name: 'Amazon Music', url: 'https://music.amazon.com/podcasts/00db4019-fe71-4898-b759-aa99a4af5cca/bucks-of-nebraska-podcast', color: 'bg-[#00A8E1]' },
]

export default function PodcastPage() {
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

      {/* Platform buttons */}
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

      {/* Episode 1 */}
      <div className="space-y-4">
        <a href="https://www.youtube.com/@BucksofNebraska" target="_blank" rel="noopener noreferrer" className="bg-white border border-border-light p-4 sm:p-6 flex gap-3 sm:gap-5 items-start cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-red group block">
          <div className="flex-shrink-0 w-12 h-12 bg-red/[0.06] border border-red/20 flex items-center justify-center group-hover:bg-red group-hover:border-red transition-all duration-300">
            <Play className="w-4 h-4 text-red group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-nav text-[11px] tracking-[1.5px] uppercase text-red">
                EP 1
              </span>
            </div>
            <h3 className="font-nav text-[14px] tracking-[0.5px] uppercase text-text mb-1.5 leading-snug">
              We&apos;re Just Getting Started
            </h3>
            <p className="text-text-light text-[14px] leading-relaxed font-body">
              The very first episode of the Bucks of Nebraska podcast. Who we are, why we started this, and what&apos;s coming next.
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}

import { Play, Headphones, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Podcast — Bucks of Nebraska',
  description: 'The Bucks of Nebraska podcast. Hunting stories, gear talk, and Nebraska pride.',
}

const platforms = [
  { name: 'Spotify', url: '#', color: 'bg-[#1DB954]' },
  { name: 'Apple Podcasts', url: '#', color: 'bg-[#9933CC]' },
  { name: 'YouTube', url: '#', color: 'bg-[#FF0000]' },
]

const episodes = [
  {
    number: 12,
    title: 'Late Season Lessons — What We Learned This Year',
    description: 'We break down the biggest takeaways from the 2025-26 deer season. Trail cam mistakes, wind strategies, and the one sit that changed everything.',
    duration: '47 min',
    date: '2026-02-12',
  },
  {
    number: 11,
    title: 'Public Land Pressure — How to Find Unpressured Deer',
    description: 'Tips for scouting overlooked WMAs, reading topo maps, and getting away from the parking lot hunters.',
    duration: '38 min',
    date: '2026-01-29',
  },
  {
    number: 10,
    title: 'Gear Review: Best Cold-Weather Hunting Layers',
    description: 'We test base layers, mid layers, and outer shells in real Nebraska conditions. What works, what doesn\'t.',
    duration: '42 min',
    date: '2026-01-15',
  },
  {
    number: 9,
    title: 'Building a Brand From a Campfire',
    description: 'The story of how Bucks of Nebraska started, the early mistakes, and what we\'d do differently.',
    duration: '51 min',
    date: '2026-01-01',
  },
  {
    number: 8,
    title: 'Turkey Season Preview — Nebraska 2026',
    description: 'Tag allocation, public land hotspots, and our go-to setups for Nebraska Merriam\'s and Rio Grandes.',
    duration: '35 min',
    date: '2025-12-18',
  },
  {
    number: 7,
    title: 'Waterfowl Wrap-Up: Ducks, Geese, and Frozen Hands',
    description: 'Recapping the Platte River migration, decoy spreads that worked, and the coldest morning hunt of the year.',
    duration: '44 min',
    date: '2025-12-04',
  },
]

export default function PodcastPage() {
  return (
    <div className="py-20 px-10 max-w-[800px] mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display text-[clamp(44px,7vw,64px)] text-text leading-none">
          The <span className="text-red">Podcast</span>
        </h1>
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

      {/* Episode list */}
      <div className="space-y-4">
        {episodes.map((ep) => (
          <article
            key={ep.number}
            className="bg-white border border-border-light p-6 flex gap-5 items-start cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-red group"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-red/[0.06] border border-red/20 flex items-center justify-center group-hover:bg-red group-hover:border-red transition-all duration-300">
              <Play className="w-4 h-4 text-red group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-nav text-[11px] tracking-[1.5px] uppercase text-red">
                  EP {ep.number}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="font-nav text-[11px] tracking-[1px] text-text-muted">
                  {ep.duration}
                </span>
              </div>
              <h3 className="font-nav text-[14px] tracking-[0.5px] uppercase text-text mb-1.5 leading-snug">
                {ep.title}
              </h3>
              <p className="text-text-light text-[14px] leading-relaxed font-body line-clamp-2">
                {ep.description}
              </p>
              <span className="font-nav text-[11px] tracking-[1px] text-text-muted mt-2 block">
                {new Date(ep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
